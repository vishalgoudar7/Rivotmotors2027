import { getLegalHtml } from "@/lib/legal";
import { LegalDocument } from "./LegalDocument";

export async function TermsAndConditions() {
  const html = await getLegalHtml("terms-and-conditions");

  return <LegalDocument html={html} />;
}
