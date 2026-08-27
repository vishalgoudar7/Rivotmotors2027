import { sendContactSubmissionEmail } from "@/lib/email";

const requiredFields: Record<string, string[]> = {
  vendor: ["company", "contact", "email", "phone", "category"], dealer: ["company", "owner", "email", "phone", "location"],
  media: ["name", "outlet", "email", "type", "message"], investor: ["name", "company", "email", "phone", "type", "range"],
  careers: ["name", "email", "phone", "position", "cv"], overseas: ["company", "contact", "email", "phone", "country", "business"],
  support: ["name", "email", "message"], contact: ["name", "email", "message"],
};

export async function POST(request: Request) {
  let attachment: { filename: string; content: Buffer; contentType?: string } | undefined;
  try {
    const form = await request.formData();
    const formType = String(form.get("formType") || "");
    if (!requiredFields[formType]) return Response.json({ success: false, message: "Invalid form type." }, { status: 400 });
    const data: Record<string, unknown> = {};
    for (const [key, value] of form.entries()) {
      if (key === "formType" || key === "cv") continue;
      data[key] = typeof value === "string" ? value.trim() : String(value);
    }
    const missing = requiredFields[formType].filter((field) => field === "cv" ? !(form.get("cv") instanceof File) : !String(data[field] || "").trim());
    if (missing.length) return Response.json({ success: false, message: `Please fill the required fields: ${missing.join(", ")}` }, { status: 400 });
    const email = String(data.email || "");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ success: false, message: "Please provide a valid email address." }, { status: 400 });
    if (formType === "careers") {
      const file = form.get("cv");
      if (!(file instanceof File) || file.size <= 0 || file.size > 10 * 1024 * 1024 || !/\.(pdf|docx?)$/i.test(file.name)) return Response.json({ success: false, message: "CV must be a non-empty PDF, DOC, or DOCX file up to 10MB." }, { status: 400 });
      attachment = { filename: file.name.replace(/[^A-Za-z0-9._-]/g, "_"), content: Buffer.from(await file.arrayBuffer()), contentType: file.type || undefined };
    }
    data.ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "Unknown";
    await sendContactSubmissionEmail(formType, data, attachment);
    return Response.json({ success: true, message: "Form submitted successfully." });
  } catch (error) {
    console.error("Contact email failed:", error instanceof Error ? error.message : error);
    return Response.json({ success: false, message: "Failed to send email. Please try again later." }, { status: 500 });
  }
}