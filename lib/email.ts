import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";

const accent = "#CE6723";
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
});

type EmailData = Record<string, unknown>;
type Attachment = { filename: string; content: Buffer; contentType?: string };

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

function escapeHtml(value: unknown) {
  return text(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] || character);
}

function labelFor(key: string) {
  return customLabels[key] || key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
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

function layout(title: string, sections: Array<{ heading: string; rows: Array<{ label: string; value: string }> }>, footer = "This email was sent from the RIVOT Motors website.") {
  const htmlSections = sections.map((section) => `
    <h2 style="margin:24px 0 10px;color:#333;font-size:18px;border-bottom:2px solid ${accent};padding-bottom:8px;">${escapeHtml(section.heading)}</h2>
    ${section.rows.map((row) => `<div style="padding:7px 0;line-height:1.55;"><strong style="display:inline-block;min-width:150px;color:${accent};vertical-align:top;">${escapeHtml(row.label)}:</strong><span style="color:#333;white-space:pre-wrap;">${escapeHtml(row.value)}</span></div>`).join("")}
  `).join("");
  return `<!doctype html><html><body style="margin:0;padding:20px;background:#111;font-family:Arial,sans-serif;color:#333;"><div style="max-width:820px;margin:0 auto;background:#fff;border:1px solid #ddd;"><header style="padding:24px;background:#000;color:#fff;text-align:center;"><div style="font-size:13px;letter-spacing:2px;color:${accent};">RIVOT MOTORS</div><h1 style="margin:10px 0 0;font-size:24px;">${escapeHtml(title)}</h1></header><main style="padding:24px;background:#f9f9f9;">${htmlSections}</main><footer style="padding:18px;text-align:center;background:#e7e7e7;color:#666;font-size:12px;">${escapeHtml(footer)}</footer></div></body></html>`;
}

function plain(title: string, sections: Array<{ heading: string; rows: Array<{ label: string; value: string }> }>, footer: string) {
  return [`RIVOT MOTORS`, ``, title, ``, ...sections.flatMap((section) => [section.heading, "-".repeat(section.heading.length), ...section.rows.map((row) => `${row.label}: ${row.value}`), ""]), footer].join("\n");
}

async function sendEmail(subject: string, to: string, title: string, sections: Array<{ heading: string; rows: Array<{ label: string; value: string }> }>, replyTo?: string, attachments?: Attachment[], footer?: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error("Invalid email recipient.");
  if (replyTo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyTo)) throw new Error("Invalid reply-to email.");
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.SMTP_FROM) throw new Error("SMTP is not configured.");
  const bodyFooter = footer || "This email was sent from the RIVOT Motors website.";
  await transporter.sendMail({
    from: { address: process.env.SMTP_FROM, name: process.env.SMTP_FROM_NAME || "RIVOT Motors" },
    to, ...(replyTo ? { replyTo } : {}), subject, html: layout(title, sections, bodyFooter), text: plain(title, sections, bodyFooter), attachments,
  });
  console.info(`Email sent: ${subject} to ${to}`);
}

export async function sendTestRideEmail(data: EmailData) {
  const admin = await getAdminEmail();
  const rows = buildSubmissionDetails(data);
  await sendEmail("New Test Ride Booking Request - RIVOT Motors", admin, "New Test Ride Booking", [{ heading: "Customer Details", rows }], text(data.email), undefined, "This email was sent from the RIVOT Motors website contact form.");
}

export async function sendContactSubmissionEmail(formType: string, data: EmailData, attachment?: Attachment) {
  const title = formTitles[formType];
  if (!title) throw new Error("Invalid form type.");
  const admin = await getAdminEmail();
  const rows = buildSubmissionDetails(data);
  if (attachment) rows.push({ label: "Attachment", value: `${attachment.filename} (attached to this email)` });
  rows.push({ label: "Submitted", value: new Date().toISOString() });
  rows.push({ label: "IP Address", value: text(data.ipAddress) || "Unknown" });
  await sendEmail(`New ${title} Submission - RIVOT Motors`, admin, `New ${title}`, [{ heading: "Submission Details", rows }], text(data.email), attachment ? [attachment] : undefined, "This email was sent from the RIVOT Motors website connect form.");
}

function bookingSections(order: EmailData, payment: boolean) {
  const bookingRows = (payment ? [
    ["Order ID", order.orderId || order.order_id || order.trackId], ["Track ID", order.trackId], ["Payment ID", order.transaction_id || order.paymentId], ["Payment Status", "Payment Successful"], ["Amount", order.amount || order.price], ["Payment Date", new Date().toISOString()],
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
}

export async function sendSmtpTestEmail() {
  await sendEmail("RIVOT Motors SMTP Test", await getAdminEmail(), "SMTP Configuration Test", [{ heading: "Status", rows: [{ label: "Message", value: "SMTP configuration is working correctly." }] }]);
}