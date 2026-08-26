import { notFound } from "next/navigation";
import { ProModel } from "@/components/ProModel";
import { SportModel } from "@/components/SportModel";

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "nx100-pro") {
    return <ProModel />;
  }

  if (slug === "nx100-sport") {
    return <SportModel />;
  }

  notFound();
}
