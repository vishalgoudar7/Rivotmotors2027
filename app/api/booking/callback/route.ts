import { NextResponse } from "next/server";

function siteBaseUrl(requestUrl: string) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = new URL(configured || requestUrl);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must use http or https");
  }
  return url;
}

async function handleCallback(request: Request, values: Record<string, FormDataEntryValue | string>) {
  const callbackPayload = {
    ...values,
    paymentId: String(values.paymentId || values.pgTransId || ""),
    responseCode: String(values.responseCode || ""),
    orderId: String(values.orderId || ""),
    checksum: String(values.checksum || ""),
    cardhashid: String(values.cardhashid || values.cardhashId || ""),
  };

  const logOrderId = callbackPayload.orderId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40) || "unknown";
  console.info(`Zaakpay callback received for order ${logOrderId}`);
  const siteUrl = siteBaseUrl(request.url);

  const verification = await fetch(new URL("/api/booking/verify", siteUrl), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(callbackPayload),
  });
  const result = (await verification.json()) as { redirect?: string; message?: string };
  const redirectPath = result.redirect || "/booking/payment-failed";
  const redirectUrl = new URL(redirectPath, siteUrl);
  if (callbackPayload.orderId && !redirectUrl.searchParams.has("order_id")) {
    redirectUrl.searchParams.set("order_id", callbackPayload.orderId);
  }
  const callbackReason = [callbackPayload.responseCode, values.responseDescription]
    .filter(Boolean)
    .map(String)
    .join(" - ");
  if (redirectUrl.pathname.includes("payment-failed") && !redirectUrl.searchParams.has("reason")) {
    redirectUrl.searchParams.set("reason", result.message || callbackReason || "Payment could not be verified.");
  }
  return NextResponse.redirect(redirectUrl, { status: 303 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  return handleCallback(request, Object.fromEntries(formData.entries()));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  return handleCallback(request, Object.fromEntries(searchParams.entries()));
}
