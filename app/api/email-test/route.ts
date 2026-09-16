import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/admin/_lib/session";
import { sendSmtpTestEmail } from "@/lib/email";

export async function POST() {
  if (!await requireAdmin()) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    await sendSmtpTestEmail();

    return NextResponse.json({
      success: true,
      message: "SMTP test email sent successfully.",
    });
  } catch (error) {
    console.error("SMTP TEST ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "SMTP test failed.",
      },
      { status: 500 }
    );
  }
}
