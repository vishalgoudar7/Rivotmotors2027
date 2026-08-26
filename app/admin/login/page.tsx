import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/Admin/AdminLogin";
import { requireAdmin } from "../_lib/session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const isAdmin = await requireAdmin();
  if (isAdmin) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  return <AdminLogin error={params?.error} />;
}
