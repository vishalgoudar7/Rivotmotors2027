import { redirect } from "next/navigation";
import { AdminOrders } from "@/components/Admin/AdminOrders";
import { getOrders } from "../_lib/orders";
import { requireAdmin } from "../_lib/session";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
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
  const result = await getOrders(search, status, page, 500);

  return (
    <AdminOrders
      result={result}
      search={search}
      status={status}
      message={params?.message}
    />
  );
}
