import type { Metadata } from "next";
import { CareersShowcase } from "@/components/CareersShowcase";

export const metadata: Metadata = {
  title: "Careers at RIVOT Motors | Build What Moves Next",
  description: "Join RIVOT Motors in Belagavi and help build the future of electric mobility.",
};

export default function CareersPage() {
  return <CareersShowcase />;
}
