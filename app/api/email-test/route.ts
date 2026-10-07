import { NextResponse } from "next/server";
import { requireAdmin } from "@/app/admin/_lib/session";
import { safeSmtpError, verifySmtpConnection } from "@/lib/email";

export async function POST() {
  if (!await requireAdmin()) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  try {
    const connection = await verifySmtpConnection();

    return NextResponse.json({
      success: true,
      message: "SMTP connection verified successfully. No email was sent.",
      connection,
    });
  } catch (error) {
    console.error("SMTP verification failed", safeSmtpError(error));

    return NextResponse.json(
      {
        success: false,
        message: "SMTP connection verification failed. Check the server logs.",
      },
      { status: 500 }
    );
  }
}
