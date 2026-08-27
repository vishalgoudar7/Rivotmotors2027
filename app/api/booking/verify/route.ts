import crypto from "node:crypto";
import { prisma } from "@/lib/db";

function quote(name: string) {
  return `\`${name.replace(/`/g, "``")}\``;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    responseCode?: string;
    orderId?: string;
    paymentId?: string;
    pgTransId?: string;
    product1Description?: string;
    amount?: string;
    checksum?: string;
    bookingData?: unknown;
  } | null;

  if (!body?.responseCode || !body.orderId || !body.checksum || !body.product1Description) {
    return Response.json({ success: false, redirect: "/booking/payment-failed" }, { status: 400 });
  }

  const secret = process.env.ZAAKPAY_SECRET;
  if (!secret) {
    return Response.json({ success: false, message: "Zaakpay verification is not configured." }, { status: 503 });
  }

  const responseFields = body as unknown as Record<string, unknown>;
  const responseOrder = [
    "amount", "bank", "bankid", "cardId", "cardScheme", "cardToken", "cardhashid", "doRedirect",
    "orderId", "paymentMethod", "paymentMode", "responseCode", "responseDescription", "productDescription",
    "product1Description", "product2Description", "product3Description", "product4Description", "pgTransId", "pgTransTime",
  ];
  const checksumInput = responseOrder
    .filter((key) => responseFields[key] !== undefined && responseFields[key] !== "")
    .map((key) => `${key}=${String(responseFields[key])}&`)
    .join("");
  const calculatedChecksum = crypto.createHmac("sha256", secret).update(checksumInput).digest("hex");
  const validChecksum = body.checksum.length === calculatedChecksum.length &&
    crypto.timingSafeEqual(Buffer.from(body.checksum), Buffer.from(calculatedChecksum));

  if (!validChecksum) {
    return Response.json({ success: false, redirect: "/booking/payment-failed", message: "Payment verification failed." }, { status: 400 });
  }

  try {
    const columns = (await prisma.$queryRawUnsafe("SHOW COLUMNS FROM `orders`")) as Array<{ Field: string }>;
    const names = new Set(columns.map((column) => column.Field));
    if (!names.has("trackId")) return Response.json({ success: false, message: "Order table has no trackId column." }, { status: 500 });

    const gatewayAmount = Number(body.amount || 0);
    const amountInRupees = Number.isFinite(gatewayAmount) && gatewayAmount > 0
      ? (gatewayAmount >= 100 ? gatewayAmount / 100 : gatewayAmount).toFixed(2)
      : "";
    const paymentId = body.pgTransId || body.paymentId || "";
    const isSuccess = body.responseCode === "100";

    const updates: Record<string, unknown> = {
      orderId: body.orderId,
      transaction_id: paymentId,
      amount: amountInRupees,
      statid: isSuccess ? "1" : "0",
      payment_status: isSuccess ? "payment_completed" : "payment_failed",
    };
    const availableUpdates = ["orderId", "transaction_id", "amount", "statid", "payment_status"].filter((name) => names.has(name));
    if (availableUpdates.length) {
      const setSql = availableUpdates.map((name) => `${quote(name)} = ?`).join(", ");
      await prisma.$executeRawUnsafe(
        `UPDATE \`orders\` SET ${setSql} WHERE ${quote("trackId")} = ? LIMIT 1`,
        ...availableUpdates.map((name) => updates[name]),
        body.product1Description,
      );
    }

    const redirect = isSuccess ? "/booking/thank-you" : "/booking/payment-failed";
    return Response.json({ success: isSuccess, redirect: `${redirect}?order_id=${encodeURIComponent(body.orderId)}`, order_id: body.orderId });
  } catch (error) {
    console.error("Payment verification database update failed:", error);
    return Response.json({ success: false, redirect: "/booking/payment-failed", message: "Could not confirm booking." }, { status: 500 });
  }
}
