import { prisma } from "@/lib/db";
import { sendPaymentFailureEmails, sendPaymentSuccessEmails } from "@/lib/email";
import {
  checkZaakpayTransactionStatus,
  classifyZaakpayStatus,
  getZaakpayConfig,
  inspectZaakpayCallbackChecksum,
  type ZaakpayCallbackFields,
  type ZaakpayStatusResult,
} from "@/lib/zaakpay";

function quote(name: string) {
  return `\`${name.replace(/`/g, "``")}\``;
}

function databaseAmountToPaise(value: unknown) {
  const normalized = String(value ?? "").trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;
  const parsed = Number(normalized);
  if (!Number.isFinite(parsed) || parsed <= 0) return null;
  return Math.round(parsed * 100);
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
  const logOrderId = body.orderId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40) || "unknown";

  let config: ReturnType<typeof getZaakpayConfig>;
  try {
    config = getZaakpayConfig(new URL(request.url).origin);
  } catch {
    return Response.json({ success: false, redirect: "/booking/payment-failed", message: "Payment verification is not configured." }, { status: 503 });
  }

  const checksumVerification = inspectZaakpayCallbackChecksum(body, config.secret);
  if (config.isTest && process.env.ZAAKPAY_DEBUG_CHECKSUM === "true") {
    console.log("[ZAAKPAY] response keys:", Object.keys(body));
    console.log("[ZAAKPAY] orderId:", body.orderId);
    console.log("[ZAAKPAY] responseCode:", body.responseCode);
    console.log("[ZAAKPAY] checksum source:", checksumVerification.checksumSource);
    console.log("[ZAAKPAY] calculated checksum:", checksumVerification.calculatedChecksum);
    console.log("[ZAAKPAY] received checksum:", checksumVerification.receivedChecksum);
  }

  if (!checksumVerification.valid) {
    console.warn(`Zaakpay checksum mismatch for order ${logOrderId}`);
    const reason = "Zaakpay response checksum verification failed.";
    return Response.json({
      success: false,
      redirect: `/booking/payment-failed?order_id=${encodeURIComponent(body.orderId)}&reason=${encodeURIComponent(reason)}`,
      message: reason,
    }, { status: 400 });
  }
  console.info(`${config.isTest ? "[ZAAKPAY TEST] " : "[ZAAKPAY] "}Checksum verified for order ${logOrderId}`);

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

    const bookingAmountPaise = databaseAmountToPaise(booking.price || booking.amount);
    if (bookingAmountPaise === null) {
      console.error(`Invalid database payment amount for order ${logOrderId}`);
      return Response.json({
        success: false,
        redirect: `/booking/payment-failed?order_id=${encodeURIComponent(body.orderId)}&reason=${encodeURIComponent("The stored booking amount is invalid.")}`,
        message: "The stored booking amount is invalid.",
      }, { status: 500 });
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
      console.info(`${config.isTest ? "[ZAAKPAY TEST] " : "[ZAAKPAY] "}Transaction status: ${verifiedStatus.status.toUpperCase()} for order ${logOrderId}`);
      console.info(`Zaakpay status API result for order ${logOrderId}: verified=${verifiedStatus.verified}, status=${verifiedStatus.status}, responseCode=${verifiedStatus.responseCode || "none"}`);
    } catch (statusError) {
      console.error(`Zaakpay status check failed for order ${logOrderId}:`, statusError instanceof Error ? statusError.message : statusError);
    }

    const verifiedAmountPaise = verifiedStatus.amount
      ? Number.parseInt(verifiedStatus.amount, 10)
      : null;
    const amountMatches = verifiedAmountPaise !== null
      && Number.isSafeInteger(verifiedAmountPaise)
      && verifiedAmountPaise === bookingAmountPaise;
    const finalStatus = !verifiedStatus.verified
      ? "pending"
      : verifiedStatus.status === "paid" && !amountMatches
        ? "failed"
        : verifiedStatus.status;
    const paymentStatus = finalStatus === "paid"
      ? "payment_completed"
      : finalStatus === "failed"
        ? "payment_failed"
        : "payment_pending";

    const updates: Record<string, unknown> = {
      orderId: body.orderId,
      transaction_id: verifiedStatus.transactionId || body.pgTransId || body.paymentMethod || "",
      amount: (bookingAmountPaise / 100).toFixed(2),
      statid: finalStatus === "paid" ? "1" : "0",
      payment_status: paymentStatus,
    };
    const updateColumns = ["orderId", "transaction_id", "amount", "statid", "payment_status"].filter((column) => columnNames.has(column));

    if (updateColumns.length) {
      const statusGuard = columnNames.has("payment_status")
        ? ` AND ${quote("payment_status")} <> 'payment_completed' AND ${quote("payment_status")} <> ?`
        : columnNames.has("statid")
          ? ` AND ${quote("statid")} <> '1'`
          : "";
      const updated = await prisma.$executeRawUnsafe(
        `UPDATE \`orders\` SET ${updateColumns.map((column) => `${quote(column)} = ?`).join(", ")} WHERE (${where})${statusGuard} LIMIT 1`,
        ...updateColumns.map((column) => updates[column]),
        ...matchColumns.map(() => body.orderId),
        ...(columnNames.has("payment_status") ? [paymentStatus] : []),
      );

      if ((finalStatus === "paid" || finalStatus === "failed") && Number(updated) > 0) {
        const updatedRows = (await prisma.$queryRawUnsafe(
          `SELECT * FROM \`orders\` WHERE ${where} LIMIT 1`,
          ...matchColumns.map(() => body.orderId),
        )) as Array<Record<string, unknown>>;

        const updatedBooking = updatedRows[0] || { ...booking, ...updates };
        try {
          if (finalStatus === "paid") {
            await sendPaymentSuccessEmails(updatedBooking);
          } else {
            const failureReason = !amountMatches && verifiedStatus.status === "paid"
              ? "The confirmed payment amount did not match the booking amount."
              : verifiedStatus.responseDescription || callbackStatus.responseDescription || "Payment failed";
            await sendPaymentFailureEmails(updatedBooking, failureReason);
          }
        } catch (emailError) {
          console.error(`Payment ${finalStatus} email processing failed for order ${logOrderId}:`, emailError instanceof Error ? emailError.message : emailError);
        }
      }
    }

    console.info(`Zaakpay callback processed for order ${logOrderId}: ${paymentStatus}`);

    if (finalStatus === "paid") {
      return Response.json({ success: true, redirect: `/booking/success?order_id=${encodeURIComponent(body.orderId)}`, order_id: body.orderId });
    }

    if (finalStatus === "failed") {
      const reason = !amountMatches && verifiedStatus.status === "paid"
        ? "The confirmed payment amount did not match the booking amount."
        : verifiedStatus.responseDescription || callbackStatus.responseDescription || "Payment failed";
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
