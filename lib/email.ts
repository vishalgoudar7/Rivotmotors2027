import "server-only";
import nodemailer from "nodemailer";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { prisma } from "@/lib/db";

const accent = "#CE6723";

type EmailData = Record<string, unknown>;
type Attachment = { filename: string; content: Buffer; contentType?: string; cid?: string };

const emailLogoCid = "rivot-logo";

const formTitles: Record<string, string> = {
  vendor: "Vendor Partnership",
  dealer: "Dealership Opportunity",
  media: "Media Inquiry",
  investor: "Investment Opportunity",
  careers: "Career Opportunities",
  overseas: "Overseas Partnership",
  support: "Customer Support Request",
  contact: "Contact Us Inquiry",
};

const customLabels: Record<string, string> = {
  name: "Name", email: "Email", phone: "Phone", company: "Company", contact: "Contact Person",
  owner: "Owner/Partner Name", location: "Preferred Location", category: "Category", outlet: "Media Outlet",
  type: "Type", deadline: "Deadline", range: "Investment Range", position: "Position", experience: "Experience",
  investment: "Investment Capacity", country: "Country", business: "Business Type", message: "Message", cv: "CV",
};

function text(value: unknown) {
  return value === null || value === undefined ? "" : String(value).trim();
}

function smtpConfig() {
  const host = text(process.env.SMTP_HOST);
  const user = text(process.env.SMTP_USER);
  const password = process.env.SMTP_PASSWORD || "";
  const from = text(process.env.SMTP_FROM);
  const port = Number(process.env.SMTP_PORT);

  if (!host || !user || !password || !from) throw new Error("SMTP is not configured.");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("SMTP port is invalid.");
  if (from.toLowerCase() !== user.toLowerCase()) throw new Error("SMTP sender must match the authenticated account.");

  return { host, port, secure: port === 465, user, password, from };
}

function createSmtpTransporter() {
  const config = smtpConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export function safeSmtpError(error: unknown) {
  const mailError = error as Error & { code?: string; command?: string; responseCode?: number };
  return {
    name: mailError?.name || "Error",
    code: mailError?.code || "UNKNOWN",
    command: mailError?.command || "unknown",
    responseCode: mailError?.responseCode,
  };
}

function escapeHtml(value: unknown) {
  return text(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character);
}

function labelFor(key: string) {
  return customLabels[key] || key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function emailLogoAttachment(): Attachment {
  return {
    filename: "rivot-logo.png",
    content: readFileSync(join(process.cwd(), "asset", "images", "Newlogo.png")),
    contentType: "image/png",
    cid: emailLogoCid,
  };
}

function formatCurrency(value: unknown) {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)
    : text(value);
}

function formatBookingDate(value: unknown) {
  const date = value ? new Date(text(value)) : new Date();
  return Number.isNaN(date.getTime())
    ? text(value)
    : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(date);
}

export function buildSubmissionDetails(data: EmailData) {
  return Object.entries(data)
    .filter(([, value]) => value !== null && value !== undefined && text(value) !== "")
    .map(([key, value]) => ({ label: labelFor(key), value: text(value) }));
}

export async function getAdminEmail() {
  try {
    const rows = (await prisma.$queryRawUnsafe("SELECT setting_value FROM `settings` WHERE setting_key = ? LIMIT 1", "admin_email")) as Array<{ setting_value?: string }>;
    const configured = text(rows[0]?.setting_value);
    if (configured && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configured)) return configured;
  } catch (error) {
    console.error("Admin email setting lookup failed:", error instanceof Error ? error.message : error);
  }

  const fallback = text(process.env.ADMIN_EMAIL);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fallback)) throw new Error("Admin email is not configured.");
  return fallback;
}

function layout(title: string, sections: Array<{ heading: string; rows: Array<{ label: string; value: string }> }>, footer = "This email was sent from the RIVOT Motors website.", introductionOverride?: string, introductionHtml?: string) {
  const isBookingEmail = /booking|payment/i.test(title);
  const eyebrow = isBookingEmail ? "Booking confirmation" : "RIVOT Motors";
  const introduction = introductionOverride || (isBookingEmail
    ? "Thank you for choosing RIVOT Motors. Your booking information is confirmed and summarized below."
    : "The information submitted to RIVOT Motors is summarized below.");
  const htmlSections = sections.map((section) => `
    <tr><td style="padding:0 28px 20px;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e7e7e7;border-radius:12px;background:#ffffff;">
        <tr><td colspan="2" style="padding:18px 20px 12px;font-size:16px;font-weight:700;color:#151515;border-bottom:2px solid ${accent};">${escapeHtml(section.heading)}</td></tr>
        ${section.rows.map((row, index) => `<tr><td class="detail-label" width="35%" style="padding:11px 12px 11px 20px;color:#737373;font-size:13px;font-weight:600;vertical-align:top;${index ? "border-top:1px solid #eeeeee;" : ""}">${escapeHtml(row.label)}</td><td class="detail-value" style="padding:11px 20px 11px 12px;color:#202020;font-size:14px;font-weight:600;line-height:1.45;word-break:break-word;white-space:pre-wrap;${index ? "border-top:1px solid #eeeeee;" : ""}">${escapeHtml(row.value)}</td></tr>`).join("")}
      </table>
    </td></tr>
  `).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>@media only screen and (max-width:620px){.email-shell{width:100%!important}.email-padding{padding-left:16px!important;padding-right:16px!important}.detail-label,.detail-value{display:block!important;width:auto!important;padding-left:16px!important;padding-right:16px!important}.detail-label{padding-bottom:3px!important}.detail-value{padding-top:3px!important}}</style></head><body style="margin:0;padding:0;background:#f2f3f5;font-family:Arial,Helvetica,sans-serif;color:#202020;"><div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(title)} — details from RIVOT Motors.</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f3f5;"><tr><td align="center" style="padding:32px 12px;"><table role="presentation" class="email-shell" width="640" cellspacing="0" cellpadding="0" style="width:640px;max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.08);"><tr><td align="center" style="padding:30px 28px 26px;background:#111111;border-bottom:4px solid ${accent};"><img src="cid:${emailLogoCid}" width="154" alt="RIVOT Motors" style="display:block;width:154px;max-width:100%;height:auto;border:0;margin:0 auto 20px;"><div style="font-size:11px;line-height:1;letter-spacing:2.6px;font-weight:700;color:#f47721;text-transform:uppercase;">${escapeHtml(eyebrow)}</div><h1 style="margin:12px 0 0;color:#ffffff;font-size:25px;line-height:1.3;font-weight:700;">${escapeHtml(title)}</h1></td></tr><tr><td class="email-padding" style="padding:24px 28px 18px;background:#fafafa;color:#555555;font-size:14px;line-height:1.6;">${introductionHtml ?? escapeHtml(introduction)}</td></tr>${htmlSections}<tr><td align="center" class="email-padding" style="padding:22px 28px;background:#111111;color:#a8a8a8;font-size:11px;line-height:1.6;"><strong style="color:#ffffff;">RIVOT Motors</strong><br>${escapeHtml(footer)}</td></tr></table></td></tr></table></body></html>`;
}

function plain(title: string, sections: Array<{ heading: string; rows: Array<{ label: string; value: string }> }>, footer: string, introduction?: string) {
  return [`RIVOT MOTORS`, ``, title, ``, ...(introduction ? [introduction, ""] : []), ...sections.flatMap((section) => [section.heading, "-".repeat(section.heading.length), ...section.rows.map((row) => `${row.label}: ${row.value}`), ""]), footer].join("\n");
}

async function sendEmail(subject: string, to: string, title: string, sections: Array<{ heading: string; rows: Array<{ label: string; value: string }> }>, replyTo?: string, attachments?: Attachment[], footer?: string, introduction?: string, introductionHtml?: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error("Invalid email recipient.");
  if (replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) throw new Error("Invalid reply-to email.");
  const config = smtpConfig();
  const bodyFooter = footer || "This email was sent from the RIVOT Motors website.";
  try {
    await createSmtpTransporter().sendMail({
      from: { address: config.from, name: process.env.SMTP_FROM_NAME || "RIVOT Motors" },
      to, ...(replyTo ? { replyTo } : {}), subject, html: layout(title, sections, bodyFooter, introduction, introductionHtml), text: plain(title, sections, bodyFooter, introduction), attachments: [emailLogoAttachment(), ...(attachments || [])],
    });
    console.info("Email sent successfully", { subject });
  } catch (error) {
    console.error("SMTP send failed", { subject, ...safeSmtpError(error) });
    throw error;
  }
}

export async function verifySmtpConnection() {
  const config = smtpConfig();
  await createSmtpTransporter().verify();
  return { host: config.host, port: config.port, secure: config.secure };
}

export async function sendTestRideEmail(data: EmailData) {
  const admin = await getAdminEmail();
  const rows = buildSubmissionDetails(data);
  await sendEmail("New Test Ride Booking Request - RIVOT Motors", admin, "New Test Ride Booking", [{ heading: "Customer Details", rows }], text(data.email), undefined, "This email was sent from the RIVOT Motors website contact form.");
}

export async function sendTestRideConfirmationEmail(data: EmailData) {
  const message = [
    "Dear Customer,",
    "Thank you for choosing RIVOT Motors.",
    "We have successfully received your test ride request. Our team will review your details and assist you with the next steps.",
    "You are also welcome to visit your nearest RIVOT showroom to explore our vehicles and experience a test ride at your convenience. Our showroom team will be happy to assist you and provide all the required information.",
    "For any questions or assistance, simply reply to this email or contact our support team.",
    "We look forward to welcoming you to the RIVOT experience.",
    "Warm regards,\nRIVOT Motors Team\nRide a Cleaner, Brighter Tomorrow",
  ].join("\n\n");
  const messageHtml = [
    '<p style="margin:0 0 18px;">Dear Customer,</p>',
    '<p style="margin:0 0 18px;">Thank you for choosing <strong>RIVOT Motors</strong>.</p>',
    '<p style="margin:0 0 18px;">We have successfully received your test ride request. Our team will review your details and assist you with the next steps.</p>',
    '<p style="margin:0 0 18px;">You are also welcome to visit your <strong>nearest RIVOT showroom</strong> to explore our vehicles and experience a test ride at your convenience. Our showroom team will be happy to assist you and provide all the required information.</p>',
    '<p style="margin:0 0 18px;">For any questions or assistance, simply reply to this email or contact our support team.</p>',
    '<p style="margin:0 0 18px;">We look forward to welcoming you to the RIVOT experience.</p>',
    '<p style="margin:0;">Warm regards,<br><strong>RIVOT Motors Team</strong><br><strong>Ride a Cleaner, Brighter Tomorrow</strong></p>',
  ].join("");
  await sendEmail(
    "Test Ride Request Received – RIVOT Motors",
    text(data.email),
    "Test Ride Request Received",
    [],
    undefined,
    undefined,
    "This email acknowledges your request; your test ride appointment is not yet confirmed.",
    message,
    messageHtml,
  );
}

export async function sendContactSubmissionEmail(formType: string, data: EmailData, attachment?: Attachment) {
  const title = formTitles[formType];
  if (!title) throw new Error("Invalid form type.");
  const admin = await getAdminEmail();
  const configuredHrEmail = text(process.env.HR_EMAIL);
  const recipient = formType === "careers" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredHrEmail)
    ? configuredHrEmail
    : admin;
  const rows = buildSubmissionDetails(data);
  if (attachment) rows.push({ label: "Attachment", value: `${attachment.filename} (attached to this email)` });
  rows.push({ label: "Submitted", value: new Date().toISOString() });
  rows.push({ label: "IP Address", value: text(data.ipAddress) || "Unknown" });
  await sendEmail(`New ${title} Submission - RIVOT Motors`, recipient, `New ${title}`, [{ heading: "Submission Details", rows }], text(data.email), attachment ? [attachment] : undefined, "This email was sent from the RIVOT Motors website connect form.");
}

function bookingSections(order: EmailData, payment: boolean) {
  const bookingRows = (payment ? [
    ["Order ID", order.orderId || order.order_id || order.trackId], ["Track ID", order.trackId], ["Payment ID", order.transaction_id || order.paymentId], ["Payment Status", "Payment successful"], ["Amount Paid", formatCurrency(order.amount || order.price)], ["Payment Date", formatBookingDate(order.paymentDate || order.payment_date || order.updatedAt || order.createdAt)],
  ] : [["Order/Track ID", order.trackId || order.orderId], ["Product", order.product_name], ["Model", order.model], ["Color", order.color], ["Price", order.price || order.amount]]).filter(([, value]) => text(value)).map(([label, value]) => ({ label: String(label), value: text(value) }));
  const customer = [["Name", `${text(order.name)} ${text(order.lastName)}`.trim()], ["Email", order.email], ["Mobile", order.mobile], ["Address", order.address], ["City", order.city], ["State", order.state], ["Country", order.country], ["Pincode", order.pincode], ["Source", order.source], ["Referral Code", order.referralCode]].filter(([, value]) => text(value)).map(([label, value]) => ({ label: String(label), value: text(value) }));
  return [{ heading: "Booking Details", rows: bookingRows }, ...(payment ? [{ heading: "Vehicle Details", rows: [["Product", order.product_name], ["Model", order.model], ["Color", order.color]].filter(([, value]) => text(value)).map(([label, value]) => ({ label: String(label), value: text(value) })) }] : []), { heading: "Customer Details", rows: customer }];
}

export async function sendBookingAdminEmail(order: EmailData) {
  await sendEmail("New Booking Request - RIVOT Motors", await getAdminEmail(), "New Booking Request", bookingSections(order, false), text(order.email));
}

export async function sendPaymentSuccessEmails(order: EmailData) {
  const orderId = text(order.orderId || order.order_id || order.trackId);
  const subject = `New Booking Confirmation - Order #${orderId} - RIVOT Motors`;
  const sections = bookingSections(order, true);
  const admin = await getAdminEmail();
  const results = await Promise.allSettled([
    sendEmail(subject, admin, "New Booking Confirmed", sections, text(order.email)),
    sendEmail(subject, text(order.email), "Your RIVOT Motors Booking is Confirmed", sections),
  ]);
  results.forEach((result, index) => { if (result.status === "rejected") console.error(`Payment confirmation email ${index === 0 ? "admin" : "customer"} failed for order ${orderId}:`, result.reason instanceof Error ? result.reason.message : result.reason); });
  console.info(`Payment success email processing finished for order ${orderId}`);
}

export async function sendPaymentFailureEmails(order: EmailData, reason?: string) {
  const orderId = text(order.orderId || order.order_id || order.trackId);
  const siteUrl = text(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "");
  const retryUrl = siteUrl && orderId
    ? `${siteUrl}/booking/payment?order_id=${encodeURIComponent(orderId)}`
    : "";
  const failureRows = [
    { label: "Order ID", value: orderId },
    { label: "Payment Status", value: "Payment Failed" },
    { label: "Reason", value: text(reason) || "The payment was declined or could not be completed." },
  ].filter((row) => row.value);
  const adminSections = [...bookingSections(order, false), { heading: "Payment Failure", rows: failureRows }];
  const customerSections = [{
    heading: "Payment Update",
    rows: [
      ...failureRows,
      ...(retryUrl ? [{ label: "Retry Payment", value: retryUrl }] : []),
    ],
  }];
  const admin = await getAdminEmail();
  const results = await Promise.allSettled([
    sendEmail(`Payment Failed - Order #${orderId} - RIVOT Motors`, admin, "Booking Payment Failed", adminSections, text(order.email)),
    sendEmail(`Payment update for order #${orderId} - RIVOT Motors`, text(order.email), "Your RIVOT Motors Payment Was Not Completed", customerSections),
  ]);
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Payment failure email ${index === 0 ? "admin" : "customer"} failed for order ${orderId}:`, result.reason instanceof Error ? result.reason.message : result.reason);
    }
  });
  console.info(`Payment failure email processing finished for order ${orderId}`);
}

export async function sendSmtpTestEmail() {
  await sendEmail("RIVOT Motors SMTP Test", await getAdminEmail(), "SMTP Configuration Test", [{ heading: "Status", rows: [{ label: "Message", value: "SMTP configuration is working correctly." }] }]);
}
