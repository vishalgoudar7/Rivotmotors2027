import { NextResponse } from "next/server";
import { sendSmtpTestEmail } from "@/lib/email";

export async function POST() {
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