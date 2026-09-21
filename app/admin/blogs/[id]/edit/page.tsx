import { redirect } from "next/navigation";
import { EditBlog } from "@/components/Blog/EditBlog";
import { requireAdmin } from "../../../_lib/session";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: Promise<{id:string}> }) {
  if (!await requireAdmin()) redirect("/admin/login");
  const { id } = await params;
  return <EditBlog id={id} />;
}
