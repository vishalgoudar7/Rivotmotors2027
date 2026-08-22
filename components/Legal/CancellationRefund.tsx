import { getLegalHtml } from "@/lib/legal";
import { LegalDocument } from "./LegalDocument";

export async function CancellationRefund() {
  const html = await getLegalHtml("cancellation-refund");

  return <LegalDocument html={html} />;
}
