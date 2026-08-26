import crypto from "node:crypto";
import { prisma } from "@/lib/db";

function quote(name: string) {
  return `\`${name.replace(/`/g, "``")}\``;
}

function checksum(values: Record<string, string>, secret: string) {
  const input = Object.keys(values)
    .filter((key) => key !== "checksum" && values[key] !== "")
    .sort()
    .map((key) => `${key}=${values[key]}&`)
    .join("");
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

export async function POST(request: Request) {
  const { orderId } = (await request.json().catch(() => ({}))) as { orderId?: string };

  if (!orderId) {
    return Response.json({ success: false, message: "Order ID is required." }, { status: 400 });
  }

  const merchantIdentifier = process.env.ZAAKPAY_MERCHANT_IDENTIFIER;
  const secret = process.env.ZAAKPAY_SECRET;
  if (!merchantIdentifier || !secret) {
    return Response.json(
      { success: false, message: "Zaakpay sandbox is not configured. Add ZAAKPAY_MERCHANT_IDENTIFIER and ZAAKPAY_SECRET to the server environment." },
      { status: 503 },
    );
  }

  try {
    const columns = (await prisma.$queryRawUnsafe("SHOW COLUMNS FROM `orders`")) as Array<{ Field: string }>;
    const names = new Set(columns.map((column) => column.Field));
    const identifier = ["orderId", "order_id", "trackId"].find((name) => names.has(name));
    if (!identifier) return Response.json({ success: false, message: "Order table has no order identifier." }, { status: 500 });

    const rows = (await prisma.$queryRawUnsafe(
      `SELECT * FROM \`orders\` WHERE ${quote(identifier)} = ? LIMIT 1`,
      orderId,
    )) as Array<Record<string, unknown>>;
    const booking = rows[0];
    if (!booking) return Response.json({ success: false, message: "Booking not found." }, { status: 404 });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const values: Record<string, string> = {
      merchantIdentifier,
      orderId,
      amount: "49900",
      currency: "INR",
      buyerEmail: String(booking.email || booking.buyer_email || ""),
      buyerFirstName: String(booking.name || booking.buyer_first_name || ""),
      buyerLastName: String(booking.lastName || booking.buyer_last_name || ""),
      buyerPhoneNumber: String(booking.mobile || booking.phone || ""),
      buyerAddress: String(booking.address || ""),
      buyerCity: String(booking.city || ""),
      buyerState: String(booking.state || ""),
      buyerCountry: String(booking.country || "India"),
      buyerPincode: String(booking.pincode || ""),
      productDescription: String(booking.product_name || booking.model || "RIVOT NX100 Booking"),
      product1Description: `Model: ${String(booking.model || "NX100")}, Color: ${String(booking.color || "Selected")}`,
      returnUrl: process.env.ZAAKPAY_RETURN_URL || `${siteUrl}/api/booking/callback`,
      txnType: "1",
      mode: "0",
      purpose: "0",
    };

    return Response.json({
      success: true,
      action: process.env.ZAAKPAY_PAYMENT_URL || "https://zaakstaging.zaakpay.com/api/paymentTransact/V13",
      fields: { ...values, checksum: checksum(values, secret) },
    });
  } catch (error) {
    console.error("Payment handoff failed:", error);
    return Response.json({ success: false, message: "Could not prepare payment." }, { status: 500 });
  }
}
