import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const values = Object.fromEntries(formData.entries());
  const callbackPayload = {
    ...values,
    paymentId: String(values.paymentId || values.pgTransId || ""),
    responseCode: String(values.responseCode || ""),
    orderId: String(values.orderId || ""),
    checksum: String(values.checksum || ""),
  };

  const verification = await fetch(new URL("/api/booking/verify", request.url), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(callbackPayload),
  });
  const result = (await verification.json()) as { redirect?: string; message?: string };
  const redirectPath = result.redirect || "/booking/payment-failed";
  const redirectUrl = new URL(redirectPath, request.url);
  if (callbackPayload.orderId && !redirectUrl.searchParams.has("order_id")) {
    redirectUrl.searchParams.set("order_id", callbackPayload.orderId);
  }
  return NextResponse.redirect(redirectUrl, { status: 303 });
}