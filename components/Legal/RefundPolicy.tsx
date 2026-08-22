import { getLegalHtml } from "@/lib/legal";
import { LegalDocument } from "./LegalDocument";

export async function RefundPolicy() {
  const html = await getLegalHtml("refund-policy");

  return <LegalDocument html={html} />;
}
