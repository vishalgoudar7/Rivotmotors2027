import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/Admin/AdminDashboard";
import { getOrders } from "../_lib/orders";
import { requireAdmin } from "../_lib/session";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; status?: string; page?: string; message?: string }>;
}) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const search = params?.search || "";
  const status = params?.status || "";
  const page = Number(params?.page || 1);
  const result = await getOrders(search, status, page);
  const statsResult = await getOrders(search, status, 1, Math.max(1, result.totalRecords));

  return <AdminDashboard result={result} statsOrders={statsResult.orders} search={search} status={status} message={params?.message} />;
}
