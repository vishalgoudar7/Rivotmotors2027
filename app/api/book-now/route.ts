import { prisma } from "@/lib/db";

function toStringValue(value: FormDataEntryValue | string | null | undefined) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  return String(value).trim();
}

function safeSqlIdentifier(name: string) {
  return `\`${name.replace(/`/g, "``")}\``;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const formData = contentType.includes("application/json")
      ? null
      : await request.formData();

    const payload = formData
      ? Object.fromEntries(formData.entries())
      : (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const firstName = toStringValue(payload.name as FormDataEntryValue | string | null | undefined);
    const lastName = toStringValue(payload.lastName as FormDataEntryValue | string | null | undefined);
    const mobile = toStringValue(payload.mobile as FormDataEntryValue | string | null | undefined);
    const email = toStringValue(payload.email as FormDataEntryValue | string | null | undefined);
    const address = toStringValue(payload.address as FormDataEntryValue | string | null | undefined);
    const city = toStringValue(payload.city as FormDataEntryValue | string | null | undefined);
    const state = toStringValue(payload.state as FormDataEntryValue | string | null | undefined);
    const country = toStringValue(payload.country as FormDataEntryValue | string | null | undefined) || "India";
    const pincode = toStringValue(payload.pincode as FormDataEntryValue | string | null | undefined);
    const model = toStringValue(payload.model as FormDataEntryValue | string | null | undefined) || "NX100";
    const color = toStringValue(payload.color as FormDataEntryValue | string | null | undefined) || "Gray";
    const productName = toStringValue(payload.product_name as FormDataEntryValue | string | null | undefined) || model;
    const amount = toStringValue(payload.amount as FormDataEntryValue | string | null | undefined) || "499";
    const source = toStringValue(payload.source as FormDataEntryValue | string | null | undefined);
    const referralCode = toStringValue(payload.referralCode as FormDataEntryValue | string | null | undefined);
    const orderId = toStringValue(payload.orderId as FormDataEntryValue | string | null | undefined) ||
      toStringValue(payload.order_id as FormDataEntryValue | string | null | undefined) ||
      `RIVOT-${Date.now()}`;

    if (!firstName || !mobile || !email || !pincode) {
      return Response.json(
        { success: false, message: "Please fill all required booking details." },
        { status: 400 },
      );
    }

    const orderColumns = (await prisma.$queryRawUnsafe("SHOW COLUMNS FROM `orders`")) as Array<{ Field: string }>;
    const availableColumns = new Set(orderColumns.map((column) => column.Field));

    if (!availableColumns.size) {
      return Response.json(
        { success: false, message: "The orders table is not available in the configured database." },
        { status: 500 },
      );
    }

    const insertData: Record<string, unknown> = {
      orderId,
      order_id: orderId,
      trackId: orderId,
      name: firstName,
      buyer_first_name: firstName,
      first_name: firstName,
      buyer_last_name: lastName,
      lastName,
      last_name: lastName,
      buyer_email: email,
      email,
      mobile,
      phone: mobile,
      product_name: productName,
      model,
      color,
      amount,
      price: amount,
      payment_status: "PENDING",
      status: "PENDING",
      statid: "0",
      address,
      city,
      state,
      country,
      pincode,
      source,
      referralCode,
      transaction_id: `TXN-${Date.now()}`,
      payment_id: `TXN-${Date.now()}`,
      created_at: new Date(),
      createdAt: new Date(),
      updated_at: new Date(),
      updatedAt: new Date(),
    };

    const columnsToInsert = Object.keys(insertData).filter((key) => availableColumns.has(key));

    if (!columnsToInsert.length) {
      return Response.json(
        { success: false, message: "No compatible booking columns were found in the orders table." },
        { status: 500 },
      );
    }

    const columnsSql = columnsToInsert.map((key) => safeSqlIdentifier(key)).join(", ");
    const valuesSql = columnsToInsert.map(() => "?").join(", ");

    await prisma.$executeRawUnsafe(
      `INSERT INTO \`orders\` (${columnsSql}) VALUES (${valuesSql})`,
      ...columnsToInsert.map((key) => insertData[key]),
    );

    return Response.json({
      success: true,
      orderId,
      message: "Booking saved successfully.",
    });
  } catch (error) {
    console.error("Booking save failed:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to save booking. Please try again.",
      },
      { status: 500 },
    );
  }
}
