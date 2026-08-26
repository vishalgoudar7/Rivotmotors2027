"use server";

import { redirect } from "next/navigation";
import { deleteOrder } from "./_lib/orders";
import { requireAdmin, setAdminSession } from "./_lib/session";

function isValidLogin(username: string, password: string) {
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  return username === adminUsername && password === adminPassword;
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!isValidLogin(username, password)) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession();
  redirect("/admin/dashboard");
}

export async function deleteOrderAction(formData: FormData) {
  const isAdmin = await requireAdmin();
  if (!isAdmin) {
    redirect("/admin/login");
  }

  const id = String(formData.get("id") || "");
  if (id) {
    await deleteOrder(id);
  }

  redirect("/admin/dashboard?message=deleted");
}
