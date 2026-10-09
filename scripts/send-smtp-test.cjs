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
  const recipient = String(process.argv[2] || "").trim();
  const host = value("SMTP_HOST");
  const user = value("SMTP_USER");
  const password = process.env.SMTP_PASSWORD || "";
  const from = value("SMTP_FROM");
  const fromName = value("SMTP_FROM_NAME") || "RIVOT Motors";
  const port = Number(value("SMTP_PORT"));

  if (!recipient || !/^\S+@\S+\.\S+$/.test(recipient)) throw new Error("A valid recipient email is required.");
  if (!host || !user || !password || !from) throw new Error("Required SMTP environment variables are missing.");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("SMTP_PORT must be a valid integer from 1 to 65535.");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  const info = await transporter.sendMail({
    from: { address: from, name: fromName },
    to: recipient,
    subject: "RIVOT Motors SMTP Test",
    text: "This is a test email confirming that the RIVOT Motors SMTP configuration is working correctly.",
    html: "<p>This is a test email confirming that the <strong>RIVOT Motors SMTP configuration</strong> is working correctly.</p>",
  });

  console.log("SMTP test email sent successfully:", {
    to: maskEmail(recipient),
    messageId: info.messageId,
    accepted: Array.isArray(info.accepted) ? info.accepted.map(maskEmail) : [],
  });
}

main().catch((error) => {
  console.error("SMTP test email failed:", safeFailure(error));
  process.exitCode = 1;
});
