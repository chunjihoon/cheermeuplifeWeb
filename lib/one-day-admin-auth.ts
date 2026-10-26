import "server-only";

import { createHmac, timingSafeEqual } from "crypto";

export const ONE_DAY_ADMIN_COOKIE = "one_day_class_admin";
export const ONE_DAY_ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getAdminPassword() {
  return process.env.ONE_DAY_CLASS_ADMIN_PASSWORD ?? "";
}

function getSessionSecret() {
  return process.env.ONE_DAY_CLASS_ADMIN_SESSION_SECRET ?? "";
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(expiresAt: string) {
  return createHmac("sha256", getSessionSecret()).update(expiresAt).digest("hex");
}

export function isOneDayAdminConfigured() {
  return Boolean(getAdminPassword() && getSessionSecret());
}

export function verifyOneDayAdminPassword(password: string) {
  const expected = createHmac("sha256", getSessionSecret()).update(getAdminPassword()).digest("hex");
  const actual = createHmac("sha256", getSessionSecret()).update(password).digest("hex");
  return isOneDayAdminConfigured() && safeEqual(actual, expected);
}

export function createOneDayAdminSession() {
  const expiresAt = String(Math.floor(Date.now() / 1000) + ONE_DAY_ADMIN_SESSION_MAX_AGE);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function verifyOneDayAdminSession(token: string | undefined) {
  if (!token || !isOneDayAdminConfigured()) return false;
  const [expiresAt, signature, extra] = token.split(".");
  if (!expiresAt || !signature || extra) return false;
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, sign(expiresAt));
}
