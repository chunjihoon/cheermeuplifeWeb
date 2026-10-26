import { NextRequest, NextResponse } from "next/server";
import {
  createOneDayAdminSession,
  isOneDayAdminConfigured,
  ONE_DAY_ADMIN_COOKIE,
  ONE_DAY_ADMIN_SESSION_MAX_AGE,
  verifyOneDayAdminPassword,
} from "@/lib/one-day-admin-auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const loginUrl = new URL("/one-day-class/admin/login", request.url);

  if (!isOneDayAdminConfigured()) {
    loginUrl.searchParams.set("error", "config");
    return NextResponse.redirect(loginUrl, 303);
  }

  if (!verifyOneDayAdminPassword(password)) {
    loginUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(loginUrl, 303);
  }

  const response = NextResponse.redirect(new URL("/one-day-class/admin", request.url), 303);
  response.cookies.set(ONE_DAY_ADMIN_COOKIE, createOneDayAdminSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/one-day-class/admin",
    maxAge: ONE_DAY_ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
