import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { ONE_DAY_ADMIN_COOKIE, verifyOneDayAdminSession } from "@/lib/one-day-admin-auth";
import { ONE_DAY_CLASS_COLLECTION, ONE_DAY_CLASS_ID, oneDayClassDates, type OneDayClassDate } from "@/lib/one-day-class";
import "./admin.css";

export const metadata: Metadata = {
  title: "원데이 클래스 신청 현황",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Reservation = {
  id: string;
  name: string;
  email: string;
  availableDates: OneDayClassDate[];
  marketingConsent: boolean;
  createdAt: Date | null;
};

function formatKoreanDate(date: Date | null) {
  if (!date) return "저장 중";
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

async function getReservations() {
  const snapshot = await getAdminFirestore()
    .collection(ONE_DAY_CLASS_COLLECTION)
    .where("classId", "==", ONE_DAY_CLASS_ID)
    .get();

  return snapshot.docs.map((document): Reservation => {
    const data = document.data();
    return {
      id: document.id,
      name: typeof data.name === "string" ? data.name : "",
      email: typeof data.email === "string" ? data.email : "",
      availableDates: Array.isArray(data.availableDates) ? data.availableDates : [],
      marketingConsent: data.marketingConsent === true,
      createdAt: data.createdAt && typeof data.createdAt.toDate === "function" ? data.createdAt.toDate() : null,
    };
  }).sort((left, right) => (right.createdAt?.getTime() ?? 0) - (left.createdAt?.getTime() ?? 0));
}

export default async function OneDayAdminPage() {
  const cookieStore = await cookies();
  if (!verifyOneDayAdminSession(cookieStore.get(ONE_DAY_ADMIN_COOKIE)?.value)) {
    redirect("/one-day-class/admin/login");
  }

  let reservations: Reservation[] = [];
  let loadError = "";
  try {
    reservations = await getReservations();
  } catch (error) {
    console.error("One-day class admin dashboard failed", error);
    loadError = "신청 데이터를 불러오지 못했습니다. Firebase Admin 환경변수와 접근 권한을 확인해주세요.";
  }

  const dateCounts = Object.fromEntries(oneDayClassDates.map((item) => [item.value, 0])) as Record<OneDayClassDate, number>;
  for (const reservation of reservations) {
    for (const date of reservation.availableDates) {
      if (date in dateCounts) dateCounts[date] += 1;
    }
  }

  return (
    <main className="oneday-admin-page">
      <div className="oneday-admin-container">
        <header className="oneday-admin-header">
          <div><p className="oneday-admin-eyebrow">PRIVATE DASHBOARD</p><h1>원데이 클래스 신청 현황</h1><p>2026년 11월 무료 사전예약 · 조회 전용</p></div>
          <form action="/api/one-day-class/admin/logout" method="post"><button className="oneday-admin-secondary" type="submit">로그아웃</button></form>
        </header>

        {loadError ? <p className="oneday-admin-error" role="alert">{loadError}</p> : (
          <>
            <section className="oneday-admin-stats" aria-label="사전예약 집계">
              <article className="oneday-admin-total"><span>전체 고유 신청자</span><strong>{reservations.length}명</strong><small>이메일 기준 중복 제외</small></article>
              {oneDayClassDates.map((item) => {
                const count = dateCounts[item.value];
                const qualified = count >= 7;
                return <article key={item.value}><span>{item.label}</span><strong>{count}명</strong><small className={qualified ? "is-qualified" : "is-pending"}>{qualified ? "7명 기준 충족" : `기준까지 ${7 - count}명`}</small></article>;
              })}
            </section>

            <section className="oneday-admin-list" aria-labelledby="oneday-admin-list-title">
              <div className="oneday-admin-list-heading"><div><h2 id="oneday-admin-list-title">신청자 목록</h2><p>이름, 이메일과 선택 날짜는 사전예약 운영 목적으로만 사용해주세요.</p></div><span>{reservations.length}건</span></div>
              {reservations.length === 0 ? <p className="oneday-admin-empty">접수된 사전예약이 없습니다.</p> : (
                <div className="oneday-admin-table-wrap">
                  <table>
                    <thead><tr><th>신청자</th><th>이메일</th><th>참여 가능 날짜</th><th>소식 수신</th><th>접수 일시</th></tr></thead>
                    <tbody>{reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td><strong>{reservation.name}</strong></td>
                        <td><a href={`mailto:${reservation.email}`}>{reservation.email}</a></td>
                        <td><ul>{reservation.availableDates.map((date) => {
                          const item = oneDayClassDates.find((candidate) => candidate.value === date);
                          return <li key={date}>{item?.label ?? date}</li>;
                        })}</ul></td>
                        <td>{reservation.marketingConsent ? <span className="oneday-admin-yes">동의</span> : "미동의"}</td>
                        <td>{formatKoreanDate(reservation.createdAt)}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
