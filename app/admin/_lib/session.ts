import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const sessionCookie = "rivot_admin_session";

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.DATABASE_URL || "rivot-admin-local-secret";
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createAdminSessionValue() {
  const value = `admin:${Date.now()}`;
  return `${value}.${sign(value)}`;
}

export function isValidAdminSession(value?: string) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    return false;
  }

  const expected = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  return signatureBuffer.length === expectedBuffer.length && timingSafeEqual(signatureBuffer, expectedBuffer);
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(sessionCookie)?.value);
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, createAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}
