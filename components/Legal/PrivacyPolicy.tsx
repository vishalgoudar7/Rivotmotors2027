import { getLegalHtml } from "@/lib/legal";
import { LegalDocument } from "./LegalDocument";

export async function PrivacyPolicy() {
  const html = await getLegalHtml("privacy-policy");

  return <LegalDocument html={html} />;
}
