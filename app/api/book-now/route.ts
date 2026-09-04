import { prisma } from "@/lib/db";
import { sendBookingAdminEmail } from "@/lib/email";
import { makeBookingOrderId, sanitizeZaakpayText } from "@/lib/zaakpay";

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
    const model = toStringValue(payload.model as FormDataEntryValue | string | null | undefined) || "sport";
    const rawColor = toStringValue(payload.color as FormDataEntryValue | string | null | undefined) || "Gray";
    const color = ({
      "#FCFCFC": "White",
      "#fcfcfc": "White",
      "#757180": "Grey",
      "#CD2E30": "Red",
      "#cd2e30": "Red",
      "#050505": "Black",
      "#C3CADB": "Silver",
      "#c3cadb": "Silver",
      "#f26f2f": "Orange",
      "#ffffff": "White",
      "#111111": "Black",
    } as Record<string, string>)[rawColor] || sanitizeZaakpayText(rawColor, 30) || "Selected";
    const productName = "nx100";
    const price = "499.00";
    const source = toStringValue(payload.source as FormDataEntryValue | string | null | undefined);
    const referralCode = toStringValue(payload.referralCode as FormDataEntryValue | string | null | undefined);

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

    const trackId = makeBookingOrderId();
    const insertData: Record<string, unknown> = {
      price,
      model,
      color,
      product_name: productName,
      trackId,
      orderId: trackId,
      productDescription: `${productName}-${color}-${model}`,
      transaction_id: "",
      amount: price,
      statid: "0",
      payment_status: "payment_pending",
      name: firstName,
      lastName,
      email,
      mobile,
      address,
      city,
      state,
      country,
      pincode,
      source,
      referralCode,
      terms: toStringValue(payload.terms as FormDataEntryValue | string | null | undefined) ? "1" : "0",
    };

    const requiredColumns = [
      "price", "model", "color", "product_name", "trackId", "orderId", "productDescription",
      "transaction_id", "amount", "statid", "payment_status", "name", "lastName", "mobile", "email",
      "address", "country", "pincode", "state", "city", "source", "referralCode", "terms",
    ];
    const columnsToInsert = requiredColumns.filter((key) => availableColumns.has(key));

    if (columnsToInsert.length !== requiredColumns.length) {
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

    try {
      await sendBookingAdminEmail(insertData);
    } catch (error) {
      console.error(`Booking email failed for ${trackId}:`, error instanceof Error ? error.message : error);
    }

    return Response.json({
      success: true,
      orderId: trackId,
      trackId,
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
