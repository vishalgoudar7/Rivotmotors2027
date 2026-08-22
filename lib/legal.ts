import { readFile } from "fs/promises";
import path from "path";

export const legalPages = {
  "terms-and-conditions": {
    title: "Terms and Conditions",
    file: "termsAndConditions.html",
  },
  "refund-policy": {
    title: "Refund Policy",
    file: "refundpolicy.html",
  },
  subscriptions: {
    title: "Subscriptions",
    file: "subscriptions.html",
  },
  license: {
    title: "License Agreement",
    file: "license.html",
  },
  "privacy-policy": {
    title: "Privacy Policy",
    file: "privacypolicy.html",
  },
  "cancellation-refund": {
    title: "Cancellation/Refund",
    file: "cancellation.html",
  },
} as const;

export type LegalSlug = keyof typeof legalPages;

const legalLinkMap: Record<string, string> = {
  "termsAndConditions.html": "/legal/terms-and-conditions",
  "refundpolicy.html": "/legal/refund-policy",
  "subscriptions.html": "/legal/subscriptions",
  "license.html": "/legal/license",
  "privacypolicy.html": "/legal/privacy-policy",
  "cancellation.html": "/legal/cancellation-refund",
  "faqs.html": "/#rivot-faqs",
  "index.html": "/",
};

export function isLegalSlug(slug: string): slug is LegalSlug {
  return slug in legalPages;
}

export async function getLegalHtml(slug: LegalSlug) {
  const sourcePath = path.join(process.cwd(), "components", "Legal", legalPages[slug].file);
  const source = await readFile(sourcePath, "utf8");
  const contentMatch = source.match(/<div class="(?:terms-content|subscriptions-content)">([\s\S]*?)<\/div>\s*<footer>/);
  const content = contentMatch?.[1] ?? "";

  return Object.entries(legalLinkMap).reduce((html, [from, to]) => {
    return html.replaceAll(`href="${from}"`, `href="${to}"`);
  }, content);
}
