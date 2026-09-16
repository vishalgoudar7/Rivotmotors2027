import { prisma } from "@/lib/db";
import { getAdminSession } from "./session";

export async function getCurrentAdmin() {
  const session = await getAdminSession();
  if (!session) return null;
  const rows = (await prisma.$queryRawUnsafe("SELECT id,name,email,notification_email,created_at,updated_at FROM users WHERE id = ? LIMIT 1", session.userId)) as Array<{ id: number; name: string; email: string; notification_email: string | null }>;
  return rows[0] || null;
}

export async function getAdminUsers() {
  return (await prisma.$queryRawUnsafe("SELECT id,name,email,created_at,updated_at FROM users ORDER BY created_at ASC")) as Array<{ id: number; name: string; email: string; created_at: Date | null; updated_at: Date | null }>;
}
