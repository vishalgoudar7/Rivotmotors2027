import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CancellationRefund,
  License,
  PrivacyPolicy,
  RefundPolicy,
  Subscriptions,
  TermsAndConditions,
} from "@/components/Legal";
import { isLegalSlug, legalPages } from "@/lib/legal";

type LegalPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const legalComponents = {
  "terms-and-conditions": TermsAndConditions,
  "refund-policy": RefundPolicy,
  subscriptions: Subscriptions,
  license: License,
  "privacy-policy": PrivacyPolicy,
  "cancellation-refund": CancellationRefund,
};

export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isLegalSlug(slug)) {
    return {
      title: "Legal | RIVOT Motors",
    };
  }

  return {
    title: `${legalPages[slug].title} | RIVOT Motors`,
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;

  if (!isLegalSlug(slug)) {
    notFound();
  }

  const LegalComponent = legalComponents[slug];

  return <LegalComponent />;
}
