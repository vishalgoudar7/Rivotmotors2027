import { redirect } from "next/navigation";
import { BlogManagement } from "@/components/Blog/BlogManagement";
import { requireAdmin } from "../_lib/session";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  if (!await requireAdmin()) redirect("/admin/login");
  return <BlogManagement />;
}
