import { prisma } from "@/lib/db";
import { sendTestRideConfirmationEmail, sendTestRideEmail } from "@/lib/email";

function value(input: unknown) {
  return typeof input === "string" ? input.trim() : "";
}

function todayInIndia() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((item) => item.type === type)?.value || "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function parseRideDate(input: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return null;
  const date = new Date(`${input}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === input ? date : null;
}

export async function POST(request: Request) {
  let values: Record<string, unknown>;
  try {
    const contentType = request.headers.get("content-type") || "";
    const parsed: unknown = contentType.includes("application/json")
      ? await request.json()
      : Object.fromEntries((await request.formData()).entries());
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid form body.");
    values = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ success: false, message: "Invalid test ride form data." }, { status: 400 });
  }

  const data = {
    name: value(values.name),
    email: value(values.email),
    mobile: value(values.mobile),
    state: value(values.state),
    city: value(values.city),
    date: value(values.date),
    message: value(values.message),
  };

  if (!data.name || !data.email || !data.mobile || !data.state || !data.city || !data.date) {
    return Response.json({ success: false, message: "Please fill all required test ride details." }, { status: 400 });
  }
  if (data.name.length < 2 || data.name.length > 100 || data.state.length > 100 || data.city.length > 100 || data.message.length > 5000) {
    return Response.json({ success: false, message: "Please check the length of your test ride details." }, { status: 400 });
  }
  if (data.email.length > 150 || !/^\S+@\S+\.\S+$/.test(data.email)) {
    return Response.json({ success: false, message: "Please provide a valid email address." }, { status: 400 });
  }
  if (!/^\d{10}$/.test(data.mobile)) {
    return Response.json({ success: false, message: "Please provide a valid 10-digit mobile number." }, { status: 400 });
  }
  const rideDate = parseRideDate(data.date);
  if (!rideDate || data.date < todayInIndia()) {
    return Response.json({ success: false, message: "Please choose a valid test ride date from today onward." }, { status: 400 });
  }

  let requestId: number;
  try {
    requestId = await prisma.$transaction(async (transaction) => {
      await transaction.$executeRaw`
        INSERT INTO test_drive_requests (name, email, phone, state, city, test_ride_date, message)
        VALUES (${data.name}, ${data.email}, ${data.mobile}, ${data.state}, ${data.city}, ${data.date}, ${data.message || null})
      `;
      const rows = await transaction.$queryRaw<Array<{ id: bigint | number }>>`SELECT LAST_INSERT_ID() AS id`;
      return Number(rows[0].id);
    });
  } catch (error) {
    console.error("Test ride request could not be saved:", error instanceof Error ? error.message : error);
    return Response.json({ success: false, message: "Could not save your test ride request. Please try again." }, { status: 500 });
  }

  let emailSent = false;
  try {
    await sendTestRideEmail({ ...data, requestId });
    emailSent = true;
  } catch (error) {
    console.error(`Test ride notification failed for request ${requestId}:`, error instanceof Error ? error.message : error);
  }

  let confirmationEmailSent = false;
  if (emailSent) {
    try {
      await prisma.$executeRaw`UPDATE test_drive_requests SET email_sent = 1 WHERE id = ${requestId}`;
    } catch (error) {
      console.error(`Test ride email_sent update failed for request ${requestId}:`, error instanceof Error ? error.message : error);
    }

    try {
      await sendTestRideConfirmationEmail({ ...data, requestId });
      confirmationEmailSent = true;
    } catch (error) {
      console.error(`Test ride customer confirmation failed for request ${requestId}:`, error instanceof Error ? error.message : error);
    }
  }

  return Response.json({
    success: true,
    requestId,
    emailSent,
    confirmationEmailSent,
    message: !emailSent
      ? "Test ride request saved, but email notification is delayed."
      : confirmationEmailSent
        ? "Test ride request saved and confirmation email sent."
        : "Test ride request saved, but the customer confirmation email could not be sent.",
  }, { status: 201 });
}
