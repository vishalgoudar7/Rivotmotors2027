"use server";

import { redirect } from "next/navigation";
import { compare, hash } from "bcryptjs";
import { prisma } from "@/lib/db";
import { deleteOrder } from "./_lib/orders";
import { clearAdminSession, getAdminSession, requireAdmin, setAdminSession } from "./_lib/session";

type UserRow = { id: number; name: string; email: string; password_hash: string; notification_email?: string | null };

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function currentAdmin() {
  const session = await getAdminSession();
  if (!session) return null;
  const rows = (await prisma.$queryRawUnsafe("SELECT id,name,email,password_hash,notification_email FROM users WHERE id = ? LIMIT 1", session.userId)) as UserRow[];
  return rows[0] || null;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const rows = (await prisma.$queryRawUnsafe("SELECT id,name,email,password_hash FROM users WHERE LOWER(email) = ? LIMIT 1", email)) as UserRow[];
  const user = rows[0];
  const storedHash = user?.password_hash?.replace(/^\$2y\$/, "$2b$") || "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvalidinv";
  const valid = Boolean(user) && await compare(password, storedHash).catch(() => false);

  if (!valid || !user) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession(user.id);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createAdminUserAction(formData: FormData) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (name.length < 2 || !validEmail(email)) redirect("/admin/settings?section=users&error=user-invalid#users");
  if (password.length < 8) redirect("/admin/settings?section=users&error=user-password#users");
  const existing = (await prisma.$queryRawUnsafe("SELECT id FROM users WHERE LOWER(email) = ? LIMIT 1", email)) as Array<{ id: number }>;
  if (existing.length) redirect("/admin/settings?section=users&error=user-duplicate#users");
  const passwordHash = await hash(password, 12);
  await prisma.$executeRawUnsafe("INSERT INTO users (name,email,password_hash,notification_email,created_at,updated_at) VALUES (?,?,?, ?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)", name, email, passwordHash, email);
  redirect("/admin/settings?section=users&success=user-created#users");
}

export async function deleteAdminUserAction(formData: FormData) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  const userId = Number(formData.get("userId"));
  if (!Number.isInteger(userId) || userId <= 0) redirect("/admin/settings?section=users&error=user-invalid#users");
  if (userId === admin.id) redirect("/admin/settings?section=users&error=user-self-delete#users");
  const countRows = (await prisma.$queryRawUnsafe("SELECT COUNT(*) total FROM users")) as Array<{ total: bigint | number }>;
  if (Number(countRows[0]?.total || 0) <= 1) redirect("/admin/settings?section=users&error=user-last#users");
  await prisma.$executeRawUnsafe("DELETE FROM users WHERE id = ?", userId);
  redirect("/admin/settings?section=users&success=user-deleted#users");
}

export async function changeUserPasswordAction(formData: FormData) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  const userId = Number(formData.get("userId"));
  const password = String(formData.get("password") || "");
  if (!Number.isInteger(userId) || userId <= 0) redirect("/admin/settings?section=users&error=user-invalid#users");
  if (password.length < 8) redirect("/admin/settings?section=users&error=user-password#users");
  const passwordHash = await hash(password, 12);
  const updated = await prisma.$executeRawUnsafe("UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", passwordHash, userId);
  if (!updated) redirect("/admin/settings?section=users&error=user-missing#users");
  redirect("/admin/settings?section=users&success=user-password#users");
}

export async function updateAdminAccountAction(formData: FormData) {
  const user = await currentAdmin();
  if (!user) redirect("/admin/login");
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (name.length < 2 || !validEmail(email)) redirect("/admin/settings?section=account&error=invalid#account");
  const existing = (await prisma.$queryRawUnsafe("SELECT id FROM users WHERE LOWER(email) = ? AND id <> ? LIMIT 1", email, user.id)) as Array<{ id: number }>;
  if (existing.length) redirect("/admin/settings?section=account&error=duplicate#account");
  await prisma.$executeRawUnsafe("UPDATE users SET name = ?, email = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", name, email, user.id);
  redirect("/admin/settings?section=account&success=1#account");
}

export async function changeAdminPasswordAction(formData: FormData) {
  const user = await currentAdmin();
  if (!user) redirect("/admin/login");
  const currentPassword = String(formData.get("currentPassword") || "");
  const newPassword = String(formData.get("newPassword") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");
  if (newPassword.length < 8) redirect("/admin/settings?section=password&error=length#password");
  if (newPassword !== confirmPassword) redirect("/admin/settings?section=password&error=mismatch#password");
  const valid = await compare(currentPassword, user.password_hash.replace(/^\$2y\$/, "$2b$")).catch(() => false);
  if (!valid) redirect("/admin/settings?section=password&error=current#password");
  const nextHash = await hash(newPassword, 12);
  await prisma.$executeRawUnsafe("UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", nextHash, user.id);
  redirect("/admin/settings?section=password&success=1#password");
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
