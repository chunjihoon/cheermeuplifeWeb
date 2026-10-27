import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { isOneDayClassReservationOpen } from "@/lib/one-day-class";
import { OneDayClassReservationForm } from "./reservation-form";
import "./one-day-class.css";

const title = "2026년 11월 치어리딩 원데이 클래스";
const description = "치어리딩이 처음이어도 참여할 수 있는 2시간 입문 클래스의 무료 사전예약을 신청하세요.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: "/one-day-class",
  keywords: ["치어리딩 원데이 클래스", "사당 치어리딩", "치어리딩 입문", "취미 치어리딩"],
});

export const dynamic = "force-dynamic";

const classDetails = [
  ["일정", "11월 6일(금) · 7일(토) · 8일(일) 중 하루 · 19:00–21:00"],
  ["장소", "서울 사당역 인근"],
  ["참가비", "35,000원"],
  ["개설 기준", "날짜별 사전예약 7명 이상일 때 개설 확정"],
] as const;

const introduction = [
  "치어리딩 경험이 없어도 응원곡에 맞춰 기본 동작과 안무를 배우는 2시간 입문 클래스입니다.",
  "혼자 신청해도 함께 참여할 수 있습니다.",
] as const;

export default function OneDayClassPage() {
  const reservationOpen = isOneDayClassReservationOpen();

  return (
    <main className="oneday-page">
      <section className="oneday-hero" aria-labelledby="oneday-title">
        <div className="oneday-container">
          <Breadcrumbs items={[{ label: "원데이 클래스" }]} />
          <div className="oneday-hero-grid">
            <div className="oneday-hero-copy">
              <p className="oneday-eyebrow">NOVEMBER 2026 · ONE DAY CLASS</p>
              <h1 id="oneday-title">취미로운 응원생활<br /><span>원데이 클래스</span></h1>
              <p className="oneday-hero-lead"><strong>처음이어도 괜찮아요.</strong><br />좋아하는 응원곡에 맞춰, 함께 배우고 함께 움직이는 2시간!</p>
              {reservationOpen
                ? <a className="oneday-button oneday-button-primary" href="#reservation">무료 사전예약 신청하기</a>
                : <span className="oneday-button oneday-button-disabled">무료 사전예약 마감</span>}
            </div>
            <dl className="oneday-summary">
              {classDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="oneday-section oneday-intro" aria-labelledby="oneday-intro-title">
        <div className="oneday-container oneday-intro-grid">
          <div className="oneday-photo">
            <Image src="/beginner-1/beginner-hero.png" alt="치어리딩 기본 동작을 함께 연습하는 모습" fill sizes="(max-width: 760px) calc(100vw - 28px), 48vw" />
          </div>
          <div>
            <p className="oneday-eyebrow">ABOUT THE CLASS</p>
            <h2 id="oneday-intro-title">한 번쯤 치어리딩을<br />배워보고 싶었다면</h2>
            <p className="oneday-intro-copy">처음 시작하는 사람도 부담 없이 기본 동작부터 경험할 수 있도록 준비한 오프라인 입문 클래스입니다.</p>
            <ul className="oneday-feature-list">{introduction.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="reservation" className="oneday-section oneday-reservation" aria-labelledby="oneday-form-title">
        <div className="oneday-container oneday-form-layout">
          <div className="oneday-form-copy">
            <p className="oneday-eyebrow">FREE PRE-RESERVATION</p>
            <h2 id="oneday-form-title">참여 가능한 날짜를 알려주세요</h2>
            <p>가능한 날짜를 모두 선택해주세요. 사전예약은 무료이며 참가 확정이 아닙니다. 11월 1일에 클래스 개설 공지를 이메일로 안내합니다.</p>
          </div>
          <OneDayClassReservationForm reservationOpen={reservationOpen} />
        </div>
      </section>
    </main>
  );
}
