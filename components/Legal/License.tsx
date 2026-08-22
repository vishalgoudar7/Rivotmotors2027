import { getLegalHtml } from "@/lib/legal";
import { LegalDocument } from "./LegalDocument";

export async function License() {
  const html = await getLegalHtml("license");

  return <LegalDocument html={html} />;
}
