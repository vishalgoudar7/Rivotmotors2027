import { sendSmtpTestEmail } from "@/lib/email";

export async function POST() {
  if (process.env.NODE_ENV !== "development") return Response.json({ success: false, message: "Not found." }, { status: 404 });
  try {
    await sendSmtpTestEmail();
    return Response.json({ success: true, message: "SMTP test email sent." });
  } catch (error) {
    console.error("SMTP test failed:", error instanceof Error ? error.message : error);
    return Response.json({ success: false, message: "SMTP test failed." }, { status: 500 });
  }
}