import { redirect } from "next/navigation";
import { requireAdmin } from "./_lib/session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAdmin = await requireAdmin();
  redirect(isAdmin ? "/admin/dashboard" : "/admin/login");
}
