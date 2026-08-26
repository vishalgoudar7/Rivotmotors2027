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
    checksum?: string;
    bookingData?: unknown;
  } | null;

  if (!body?.responseCode || !body.orderId || !body.paymentId || !body.checksum) {
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

  if (body.responseCode !== "100" || !validChecksum) {
    return Response.json({ success: false, redirect: "/booking/payment-failed", message: "Payment verification failed." }, { status: 400 });
  }

  try {
    const columns = (await prisma.$queryRawUnsafe("SHOW COLUMNS FROM `orders`")) as Array<{ Field: string }>;
    const names = new Set(columns.map((column) => column.Field));
    const matchColumn = ["orderId", "order_id", "trackId"].find((name) => names.has(name));
    if (!matchColumn) return Response.json({ success: false, message: "Order table has no order identifier." }, { status: 500 });

    const updates: Record<string, unknown> = {
      payment_status: "SUCCESS",
      status: "Confirmed",
      statid: "1",
      transaction_id: body.paymentId,
      payment_id: body.paymentId,
      updated_at: new Date(),
      updatedAt: new Date(),
    };
    const availableUpdates = Object.keys(updates).filter((name) => names.has(name));
    if (availableUpdates.length) {
      const setSql = availableUpdates.map((name) => `${quote(name)} = ?`).join(", ");
      await prisma.$executeRawUnsafe(
        `UPDATE \`orders\` SET ${setSql} WHERE ${quote(matchColumn)} = ?`,
        ...availableUpdates.map((name) => updates[name]),
        body.orderId,
      );
    }

    return Response.json({ success: true, redirect: `/booking/thank-you?order_id=${encodeURIComponent(body.orderId)}`, order_id: body.orderId });
  } catch (error) {
    console.error("Payment verification database update failed:", error);
    return Response.json({ success: false, redirect: "/booking/payment-failed", message: "Could not confirm booking." }, { status: 500 });
  }
}
