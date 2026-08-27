import { sendTestRideEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const values = contentType.includes("application/json")
      ? await request.json() as Record<string, unknown>
      : Object.fromEntries((await request.formData()).entries());
    const data = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value || "").trim()]));
    const required = ["name", "email", "mobile", "state", "city", "date"];
    if (required.some((field) => !data[field])) return Response.json({ success: false, message: "Please fill all required test ride details." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return Response.json({ success: false, message: "Please provide a valid email address." }, { status: 400 });
    if (!/^\d{10}$/.test(data.mobile)) return Response.json({ success: false, message: "Please provide a valid 10-digit mobile number." }, { status: 400 });
    await sendTestRideEmail(data);
    return Response.json({ success: true, message: "Test ride request submitted successfully." });
  } catch (error) {
    console.error("Test ride email failed:", error instanceof Error ? error.message : error);
    return Response.json({ success: false, message: "Failed to send request. Please try again later." }, { status: 500 });
  }
}