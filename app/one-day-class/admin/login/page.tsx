import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ONE_DAY_ADMIN_COOKIE, verifyOneDayAdminSession } from "@/lib/one-day-admin-auth";
import "../admin.css";

export const metadata: Metadata = {
  title: "원데이 클래스 관리자 로그인",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function OneDayAdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const cookieStore = await cookies();
  if (verifyOneDayAdminSession(cookieStore.get(ONE_DAY_ADMIN_COOKIE)?.value)) {
    redirect("/one-day-class/admin");
  }

  const { error } = await searchParams;
  const errorMessage = error === "config"
    ? "관리자 로그인 환경변수가 설정되지 않았습니다."
    : error === "invalid"
      ? "비밀번호가 올바르지 않습니다."
      : "";

  return (
    <main className="oneday-admin-page oneday-admin-login-page">
      <section className="oneday-admin-login-card">
        <p className="oneday-admin-eyebrow">PRIVATE DASHBOARD</p>
        <h1>원데이 클래스 관리자</h1>
        <p>신청자 개인정보가 포함된 조회 전용 화면입니다.</p>
        <form action="/api/one-day-class/admin/login" method="post">
          <label htmlFor="admin-password">관리자 비밀번호</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" required autoFocus />
          {errorMessage && <p className="oneday-admin-error" role="alert">{errorMessage}</p>}
          <button type="submit">로그인</button>
        </form>
      </section>
    </main>
  );
}
