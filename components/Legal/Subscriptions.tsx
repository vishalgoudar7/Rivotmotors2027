import { getLegalHtml } from "@/lib/legal";
import { LegalDocument } from "./LegalDocument";

export async function Subscriptions() {
  const html = await getLegalHtml("subscriptions");

  return <LegalDocument html={html} />;
}
