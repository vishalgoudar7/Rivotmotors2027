import { getLegalHtml } from "@/lib/legal";
import { LegalDocument } from "./LegalDocument";

export async function Warranty() {
  const html = await getLegalHtml("warranty");
  return <LegalDocument html={html} />;
}
