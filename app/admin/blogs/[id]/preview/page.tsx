import { redirect } from "next/navigation";
import { BlogPreview } from "@/components/Blog/BlogPreview";
import { requireAdmin } from "../../../_lib/session";

export const dynamic = "force-dynamic";

export default async function BlogPreviewPage({params}:{params:Promise<{id:string}>}) {
  if (!await requireAdmin()) redirect("/admin/login");
  const {id}=await params;
  return <BlogPreview id={id}/>;
}
