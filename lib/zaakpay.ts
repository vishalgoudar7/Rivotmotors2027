import crypto from "node:crypto";

export type ZaakpayPaymentFields = Record<string, string>;

export type ZaakpayCallbackFields = {
  amount?: string;
  bank?: string;
  bankid?: string;
  cardId?: string;
  cardScheme?: string;
  cardToken?: string;
  cardhashid?: string;
  cardhashId?: string;
  doRedirect?: string;
  orderId?: string;
  paymentMethod?: string;
  paymentMode?: string;
  responseCode?: string;
  responseDescription?: string;
  productDescription?: string;
  product1Description?: string;
  product2Description?: string;
  product3Description?: string;
  product4Description?: string;
  pgTransId?: string;
  pgTransTime?: string;
  checksum?: string;
};

export type ZaakpayStatusResult = {
  verified: boolean;
  status: "paid" | "failed" | "pending" | "unknown";
  responseCode?: string;
  responseDescription?: string;
  transactionId?: string;
  amount?: string;
};

const requestFieldOrder = [
  "amount",
  "bankid",
  "buyerAddress",
  "buyerCity",
  "buyerCountry",
  "buyerEmail",
  "buyerFirstName",
  "buyerLastName",
  "buyerPhoneNumber",
  "buyerPincode",
  "buyerState",
  "currency",
  "debitorcredit",
  "merchantIdentifier",
  "merchantIpAddress",
  "mode",
  "orderId",
  "product1Description",
  "product2Description",
  "product3Description",
  "product4Description",
  "productDescription",
  "purpose",
  "returnUrl",
  "shipToAddress",
  "shipToCity",
  "shipToCountry",
  "shipToFirstname",
  "shipToLastname",
  "shipToPhoneNumber",
  "shipToPincode",
  "shipToState",
  "showMobile",
  "txnDate",
  "txnType",
  "paymentOptionTypes",
  "zpPayOption",
];

const responseFieldOrder = [
  "amount",
  "bank",
  "bankid",
  "cardId",
  "cardScheme",
  "cardToken",
  "cardhashid",
  "doRedirect",
  "orderId",
  "paymentMethod",
  "paymentMode",
  "responseCode",
  "responseDescription",
  "productDescription",
  "product1Description",
  "product2Description",
  "product3Description",
  "product4Description",
  "pgTransId",
  "pgTransTime",
];

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

function hmacSha256(input: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

function timingSafeEqualText(left: string, right: string) {
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(Buffer.from(left), Buffer.from(right));
}

function checksumString(fields: Record<string, string>, order: string[]) {
  return order
    .filter((key) => key !== "checksum" && fields[key] !== undefined && fields[key] !== "")
    .map((key) => `${key}=${fields[key]}&`)
    .join("");
}

function withoutEmptyFields(fields: ZaakpayPaymentFields) {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== ""),
  ) as ZaakpayPaymentFields;
}

export function sanitizeZaakpayText(value: unknown, maxLength = 100) {
  return String(value ?? "")
    .replace(/[^\w\s.@,+/-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function makeBookingOrderId() {
  const random = crypto.randomInt(100000, 999999);
  return `RIVOT${Date.now()}${random}`.slice(0, 40);
}

export function getZaakpayConfig(origin: string) {
  const paymentUrl = process.env.ZAAKPAY_PAYMENT_URL || "https://zaakstaging.zaakpay.com/api/paymentTransact/V13";
  const paymentOrigin = new URL(paymentUrl).origin;
  return {
    merchantIdentifier: requireEnv("ZAAKPAY_MERCHANT_IDENTIFIER"),
    secret: requireEnv("ZAAKPAY_SECRET"),
    paymentUrl,
    statusUrl: process.env.ZAAKPAY_STATUS_URL || `${paymentOrigin}/api/payments/v1/status`,
    returnUrl: process.env.ZAAKPAY_RETURN_URL || `${process.env.NEXT_PUBLIC_SITE_URL || origin}/api/booking/callback`,
  };
}

export function createZaakpayPaymentFields(args: {
  merchantIdentifier: string;
  secret: string;
  returnUrl: string;
  orderId: string;
  amountPaise: number;
  buyerEmail: string;
  buyerFirstName: string;
  buyerLastName?: string;
  buyerPhoneNumber: string;
  buyerAddress?: string;
  buyerCity?: string;
  buyerState?: string;
  buyerCountry?: string;
  buyerPincode?: string;
  productDescription: string;
}) {
  const fields: ZaakpayPaymentFields = {
    amount: String(args.amountPaise),
    buyerEmail: sanitizeZaakpayText(args.buyerEmail, 100),
    buyerFirstName: sanitizeZaakpayText(args.buyerFirstName, 30),
    buyerPhoneNumber: sanitizeZaakpayText(args.buyerPhoneNumber, 20).replace(/\D/g, ""),
    currency: "INR",
    merchantIdentifier: args.merchantIdentifier,
    mode: "0",
    orderId: args.orderId,
    productDescription: sanitizeZaakpayText(args.productDescription, 100) || "RIVOT NX100 Booking",
    purpose: "0",
    returnUrl: args.returnUrl,
    txnType: "1",
  };

  const optionalFields = withoutEmptyFields({
    buyerAddress: sanitizeZaakpayText(args.buyerAddress, 100),
    buyerCity: sanitizeZaakpayText(args.buyerCity, 30),
    buyerCountry: sanitizeZaakpayText(args.buyerCountry || "India", 30),
    buyerLastName: sanitizeZaakpayText(args.buyerLastName, 30),
    buyerPincode: sanitizeZaakpayText(args.buyerPincode, 12),
    buyerState: sanitizeZaakpayText(args.buyerState, 30),
  });
  const paymentFields = withoutEmptyFields({ ...fields, ...optionalFields });
  paymentFields.checksum = hmacSha256(checksumString(paymentFields, requestFieldOrder), args.secret);
  return paymentFields;
}

export function verifyZaakpayCallback(fields: ZaakpayCallbackFields, secret: string) {
  const checksum = String(fields.checksum || "");
  const normalized: Record<string, string> = {};
  responseFieldOrder.forEach((key) => {
    const value = fields[key as keyof ZaakpayCallbackFields];
    if (value !== undefined && value !== null && value !== "") {
      normalized[key] = String(value);
    }
  });

  const calculated = hmacSha256(checksumString(normalized, responseFieldOrder), secret);
  return Boolean(checksum) && timingSafeEqualText(checksum, calculated);
}

export function classifyZaakpayStatus(responseCode?: string, txnStatus?: string): ZaakpayStatusResult["status"] {
  if (responseCode === "100" || responseCode === "402" || txnStatus === "0") return "paid";
  if (txnStatus === "2") return "pending";
  if (!responseCode && !txnStatus) return "unknown";
  return "failed";
}

export async function checkZaakpayTransactionStatus(args: {
  merchantIdentifier: string;
  secret: string;
  statusUrl: string;
  orderId: string;
}): Promise<ZaakpayStatusResult> {
  const requestBody = {
    merchantIdentifier: args.merchantIdentifier,
    orderId: args.orderId,
    version: 13,
  };
  const bodyText = JSON.stringify(requestBody);
  const response = await fetch(args.statusUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      checksum: hmacSha256(bodyText, args.secret),
    },
    body: bodyText,
    cache: "no-store",
  });

  if (!response.ok) {
    return { verified: false, status: "unknown", responseDescription: `Status API returned ${response.status}` };
  }

  const payload = await response.json().catch(() => null) as {
    status?: boolean;
    data?: { orders?: Array<{
      orderDetail?: { txnId?: string; amount?: string };
      txnStatus?: string;
      responseCode?: string;
      responseDescription?: string;
    }> };
    message?: { text?: string; code?: number | string };
  } | null;

  const order = payload?.data?.orders?.[0];
  const status = classifyZaakpayStatus(order?.responseCode || String(payload?.message?.code || ""), order?.txnStatus);
  return {
    verified: Boolean(payload?.status || order),
    status,
    responseCode: order?.responseCode || String(payload?.message?.code || ""),
    responseDescription: order?.responseDescription || payload?.message?.text,
    transactionId: order?.orderDetail?.txnId,
    amount: order?.orderDetail?.amount,
  };
}
