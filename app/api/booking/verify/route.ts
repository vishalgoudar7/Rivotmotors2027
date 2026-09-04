import { prisma } from "@/lib/db";
import { sendPaymentSuccessEmails } from "@/lib/email";
import {
  checkZaakpayTransactionStatus,
  classifyZaakpayStatus,
  getZaakpayConfig,
  verifyZaakpayCallback,
  type ZaakpayCallbackFields,
  type ZaakpayStatusResult,
} from "@/lib/zaakpay";

function quote(name: string) {
  return `\`${name.replace(/`/g, "``")}\``;
}

function gatewayAmountToRupees(amount?: string) {
  const parsed = Number(amount || 0);
  if (!Number.isFinite(parsed) || parsed <= 0) return "";
  return (parsed / 100).toFixed(2);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ZaakpayCallbackFields | null;

  if (!body?.orderId || !body.checksum) {
    const orderId = body?.orderId ? `?order_id=${encodeURIComponent(body.orderId)}` : "";
    const separator = orderId ? "&" : "?";
    return Response.json({
      success: false,
      redirect: `/booking/payment-failed${orderId}${separator}reason=${encodeURIComponent("Zaakpay callback was missing required verification fields.")}`,
      message: "Zaakpay callback was missing required verification fields.",
    }, { status: 400 });
  }

  let config: ReturnType<typeof getZaakpayConfig>;
  try {
    config = getZaakpayConfig(new URL(request.url).origin);
  } catch {
    return Response.json({ success: false, redirect: "/booking/payment-failed", message: "Payment verification is not configured." }, { status: 503 });
  }

  if (!verifyZaakpayCallback(body, config.secret)) {
    console.warn(`Zaakpay checksum mismatch for order ${body.orderId}`);
    const reason = "Zaakpay response checksum verification failed.";
    return Response.json({
      success: false,
      redirect: `/booking/payment-failed?order_id=${encodeURIComponent(body.orderId)}&reason=${encodeURIComponent(reason)}`,
      message: reason,
    }, { status: 400 });
  }

  try {
    const columns = (await prisma.$queryRawUnsafe("SHOW COLUMNS FROM `orders`")) as Array<{ Field: string }>;
    const columnNames = new Set(columns.map((column) => column.Field));
    const matchColumns = ["orderId", "trackId", "order_id"].filter((column) => columnNames.has(column));

    if (matchColumns.length === 0) {
      return Response.json({ success: false, redirect: "/booking/payment-failed", message: "Order table has no supported order ID column." }, { status: 500 });
    }

    const where = matchColumns.map((column) => `${quote(column)} = ?`).join(" OR ");
    const rows = (await prisma.$queryRawUnsafe(
      `SELECT * FROM \`orders\` WHERE ${where} LIMIT 1`,
      ...matchColumns.map(() => body.orderId),
    )) as Array<Record<string, unknown>>;
    const booking = rows[0];

    if (!booking) {
      return Response.json({ success: false, redirect: `/booking/payment-failed?order_id=${encodeURIComponent(body.orderId)}`, message: "Booking not found." }, { status: 404 });
    }

    if (String(booking.payment_status || "") === "payment_completed" || String(booking.statid || "") === "1") {
      return Response.json({ success: true, redirect: `/booking/success?order_id=${encodeURIComponent(body.orderId)}`, order_id: body.orderId });
    }

    const callbackStatus: ZaakpayStatusResult = {
      verified: false,
      status: classifyZaakpayStatus(body.responseCode),
      responseCode: body.responseCode,
      responseDescription: body.responseDescription,
      transactionId: body.pgTransId,
      amount: body.amount,
    };
    let verifiedStatus: ZaakpayStatusResult = callbackStatus;

    try {
      verifiedStatus = await checkZaakpayTransactionStatus({
        merchantIdentifier: config.merchantIdentifier,
        secret: config.secret,
        statusUrl: config.statusUrl,
        orderId: body.orderId,
      });
    } catch (statusError) {
      console.error(`Zaakpay status check failed for order ${body.orderId}:`, statusError instanceof Error ? statusError.message : statusError);
    }

    const finalStatus = verifiedStatus.verified
      ? verifiedStatus.status
      : callbackStatus.status === "unknown"
        ? "pending"
        : callbackStatus.status;
    const paymentStatus = finalStatus === "paid"
      ? "payment_completed"
      : finalStatus === "failed"
        ? "payment_failed"
        : "payment_pending";

    const updates: Record<string, unknown> = {
      orderId: body.orderId,
      transaction_id: verifiedStatus.transactionId || body.pgTransId || body.paymentMethod || "",
      amount: gatewayAmountToRupees(verifiedStatus.amount || body.amount),
      statid: finalStatus === "paid" ? "1" : "0",
      payment_status: paymentStatus,
    };
    const updateColumns = ["orderId", "transaction_id", "amount", "statid", "payment_status"].filter((column) => columnNames.has(column));

    if (updateColumns.length) {
      const updated = await prisma.$executeRawUnsafe(
        `UPDATE \`orders\` SET ${updateColumns.map((column) => `${quote(column)} = ?`).join(", ")} WHERE ${where}${finalStatus === "paid" && columnNames.has("payment_status") ? ` AND ${quote("payment_status")} <> 'payment_completed'` : ""} LIMIT 1`,
        ...updateColumns.map((column) => updates[column]),
        ...matchColumns.map(() => body.orderId),
      );

      if (finalStatus === "paid" && Number(updated) > 0) {
        const updatedRows = (await prisma.$queryRawUnsafe(
          `SELECT * FROM \`orders\` WHERE ${where} LIMIT 1`,
          ...matchColumns.map(() => body.orderId),
        )) as Array<Record<string, unknown>>;

        try {
          await sendPaymentSuccessEmails(updatedRows[0] || { ...booking, ...updates });
        } catch (emailError) {
          console.error(`Payment confirmation email failed for order ${body.orderId}:`, emailError instanceof Error ? emailError.message : emailError);
        }
      }
    }

    console.info(`Zaakpay callback processed for order ${body.orderId}: ${paymentStatus}`);

    if (finalStatus === "paid") {
      return Response.json({ success: true, redirect: `/booking/success?order_id=${encodeURIComponent(body.orderId)}`, order_id: body.orderId });
    }

    if (finalStatus === "failed") {
      const reason = verifiedStatus.responseDescription || callbackStatus.responseDescription || "Payment failed";
      return Response.json({ success: false, redirect: `/booking/payment-failed?order_id=${encodeURIComponent(body.orderId)}&reason=${encodeURIComponent(reason)}`, order_id: body.orderId });
    }

    return Response.json({ success: false, redirect: `/booking/thank-you?order_id=${encodeURIComponent(body.orderId)}`, order_id: body.orderId, pending: true });
  } catch (error) {
    console.error("Payment verification database update failed:", error instanceof Error ? error.message : error);
    return Response.json({
      success: false,
      redirect: `/booking/payment-failed?order_id=${encodeURIComponent(body.orderId)}&reason=${encodeURIComponent("Could not confirm booking in database.")}`,
      message: "Could not confirm booking.",
    }, { status: 500 });
  }
}
