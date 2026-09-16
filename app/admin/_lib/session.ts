import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

const sessionCookie = "rivot_admin_session";
const sessionMaxAge = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is required.");
  }
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createAdminSessionValue(userId: number) {
  const value = `${userId}:${Date.now() + sessionMaxAge * 1000}`;
  return `${value}.${sign(value)}`;
}

export function readAdminSession(value?: string) {
  if (!value) {
    return null;
  }

  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expected = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (signatureBuffer.length !== expectedBuffer.length || !timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  const [id, expiresAt] = payload.split(":");
  const userId = Number(id);
  const expiry = Number(expiresAt);
  return Number.isInteger(userId) && userId > 0 && expiry > Date.now() ? { userId, expiresAt: expiry } : null;
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = readAdminSession(cookieStore.get(sessionCookie)?.value);
  if (!session) return false;
  const rows = (await prisma.$queryRawUnsafe("SELECT id FROM users WHERE id = ? LIMIT 1", session.userId)) as Array<{ id: number }>;
  return rows.length === 1;
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return readAdminSession(cookieStore.get(sessionCookie)?.value);
}

export async function setAdminSession(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, createAdminSessionValue(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}
