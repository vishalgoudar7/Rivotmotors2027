import { prisma } from "@/lib/db";
import { createZaakpayPaymentFields, getZaakpayConfig } from "@/lib/zaakpay";

const bookingAmountRupees = 499;

function quote(name: string) {
  return `\`${name.replace(/`/g, "``")}\``;
}

function orderIdFromPayload(payload: { orderId?: unknown; trackId?: unknown }) {
  return String(payload.orderId || payload.trackId || "").trim();
}

function rupeesToPaise(value: unknown) {
  const parsed = Number(String(value || bookingAmountRupees).replace(/[^\d.]/g, ""));
  if (!Number.isFinite(parsed) || parsed <= 0) return bookingAmountRupees * 100;
  return Math.round(parsed * 100);
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as { orderId?: unknown; trackId?: unknown };
  const orderId = orderIdFromPayload(payload);

  if (!orderId) {
    return Response.json({ success: false, message: "Order ID is required." }, { status: 400 });
  }

  let config: ReturnType<typeof getZaakpayConfig>;
  try {
    config = getZaakpayConfig(new URL(request.url).origin);
  } catch {
    return Response.json(
      { success: false, message: "Zaakpay is not configured. Check server environment variables." },
      { status: 503 },
    );
  }

  try {
    const columns = (await prisma.$queryRawUnsafe("SHOW COLUMNS FROM `orders`")) as Array<{ Field: string }>;
    const columnNames = new Set(columns.map((column) => column.Field));
    const matchColumns = ["orderId", "trackId", "order_id"].filter((column) => columnNames.has(column));

    if (matchColumns.length === 0) {
      return Response.json({ success: false, message: "Order table has no supported order ID column." }, { status: 500 });
    }

    const where = matchColumns.map((column) => `${quote(column)} = ?`).join(" OR ");
    const rows = (await prisma.$queryRawUnsafe(
      `SELECT * FROM \`orders\` WHERE ${where} LIMIT 1`,
      ...matchColumns.map(() => orderId),
    )) as Array<Record<string, unknown>>;

    const booking = rows[0];
    if (!booking) {
      return Response.json({ success: false, message: "Booking not found." }, { status: 404 });
    }

    const currentStatus = String(booking.payment_status || "");
    if (currentStatus === "payment_completed" || String(booking.statid || "") === "1") {
      return Response.json({ success: false, message: "This booking is already paid." }, { status: 409 });
    }

    const gatewayOrderId = String(booking.orderId || booking.trackId || orderId).replace(/[^a-zA-Z0-9]/g, "").slice(0, 40);
    const amountPaise = rupeesToPaise(booking.price);

    if (amountPaise < 100 || amountPaise > 10000000) {
      return Response.json({ success: false, message: "Invalid booking amount." }, { status: 400 });
    }

    const fields = createZaakpayPaymentFields({
      merchantIdentifier: config.merchantIdentifier,
      secret: config.secret,
      returnUrl: config.returnUrl,
      orderId: gatewayOrderId,
      amountPaise,
      buyerEmail: String(booking.email || ""),
      buyerFirstName: String(booking.name || ""),
      buyerLastName: String(booking.lastName || ""),
      buyerPhoneNumber: String(booking.mobile || ""),
      buyerAddress: String(booking.address || ""),
      buyerCity: String(booking.city || ""),
      buyerState: String(booking.state || ""),
      buyerCountry: String(booking.country || "India"),
      buyerPincode: String(booking.pincode || ""),
      productDescription: `${booking.product_name || "nx100"} ${booking.model || ""} booking`,
    });

    const updates: Record<string, unknown> = {
      orderId: gatewayOrderId,
      amount: (amountPaise / 100).toFixed(2),
      payment_status: "payment_pending",
      statid: "0",
    };
    const updateColumns = ["orderId", "amount", "payment_status", "statid"].filter((column) => columnNames.has(column));
    if (updateColumns.length) {
      await prisma.$executeRawUnsafe(
        `UPDATE \`orders\` SET ${updateColumns.map((column) => `${quote(column)} = ?`).join(", ")} WHERE ${where} LIMIT 1`,
        ...updateColumns.map((column) => updates[column]),
        ...matchColumns.map(() => orderId),
      );
    }

    console.info(`Zaakpay payment prepared for order ${gatewayOrderId} at ${new Date().toISOString()}`);
    return Response.json({
      success: true,
      orderId: gatewayOrderId,
      amount: (amountPaise / 100).toFixed(2),
      action: config.paymentUrl,
      fields,
    });
  } catch (error) {
    console.error("Payment handoff failed:", error instanceof Error ? error.message : error);
    return Response.json({ success: false, message: "Could not prepare payment." }, { status: 500 });
  }
}
