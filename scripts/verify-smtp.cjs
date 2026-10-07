const { loadEnvConfig } = require("@next/env");
const nodemailer = require("nodemailer");

loadEnvConfig(process.cwd());

function value(name) {
  return String(process.env[name] || "").trim();
}

function maskEmail(email) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "configured";
  return `${local.slice(0, 2)}***@${domain}`;
}

function safeFailure(error) {
  return {
    code: error && error.code ? error.code : "UNKNOWN",
    command: error && error.command ? error.command : "unknown",
    responseCode: error && error.responseCode ? error.responseCode : undefined,
  };
}

async function main() {
  const host = value("SMTP_HOST");
  const user = value("SMTP_USER");
  const password = process.env.SMTP_PASSWORD || "";
  const from = value("SMTP_FROM");
  const port = Number(value("SMTP_PORT"));

  if (!host || !user || !password || !from) throw new Error("Required SMTP environment variables are missing.");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("SMTP_PORT must be a valid integer from 1 to 65535.");
  if (from.toLowerCase() !== user.toLowerCase()) throw new Error("SMTP_FROM must match SMTP_USER.");

  const secure = port === 465;
  console.log("Verifying SMTP connection (no email will be sent):", {
    host,
    port,
    secure,
    user: maskEmail(user),
    senderMatchesUser: true,
  });

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  await transporter.verify();
  console.log("SMTP connection verified successfully.");
}

main().catch((error) => {
  console.error("SMTP connection verification failed:", safeFailure(error));
  process.exitCode = 1;
});
