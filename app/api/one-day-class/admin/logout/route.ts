import { NextRequest, NextResponse } from "next/server";
import { ONE_DAY_ADMIN_COOKIE } from "@/lib/one-day-admin-auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/one-day-class/admin/login", request.url), 303);
  response.cookies.set(ONE_DAY_ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/one-day-class/admin",
    maxAge: 0,
  });
  return response;
}
