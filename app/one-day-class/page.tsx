import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createMetadata } from "@/lib/seo";
import { isOneDayClassReservationOpen, oneDayClassDates } from "@/lib/one-day-class";
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
  ["후보 일정", "11월 6일(금) / 7일(토) / 8일(일) 중 하루"],
  ["수업 시간", "19:00–21:00 · 총 2시간"],
  ["장소", "서울 사당역 인근"],
  ["참가비", "35,000원 · 추후 선정 날짜 유료 모집"],
  ["정원", "최대 10명"],
] as const;

const introduction = [
  "치어리딩 경험이 없어도 참여할 수 있는 입문 클래스",
  "응원곡에 맞춰 기본 동작과 안무를 배우는 시간",
  "혼자 신청해도 참여할 수 있는 클래스",
  "2시간 동안 함께 움직이며 치어리딩을 경험하는 프로그램",
] as const;

const reservationNotes = [
  "아래 세 날짜 중 참여 가능한 날짜를 모두 선택할 수 있습니다.",
  "날짜별 사전예약자가 7명 이상인 경우, 그중 하루를 선정해 결제 모집을 진행합니다.",
  "실제 클래스는 최대 하루만 개최됩니다.",
  "사전예약은 무료이며, 참가비 결제나 참가 확정을 의미하지 않습니다.",
  "선정 결과와 결제 안내는 사전예약 시 입력한 이메일로 전달됩니다.",
  "모든 후보 날짜가 기준 인원에 미달하면 클래스가 개설되지 않습니다.",
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

      <section className="oneday-section oneday-process" aria-labelledby="oneday-process-title">
        <div className="oneday-container">
          <div className="oneday-heading">
            <p className="oneday-eyebrow">HOW PRE-RESERVATION WORKS</p>
            <h2 id="oneday-process-title">무료 사전예약 안내</h2>
            <p><strong>이번 클래스는 먼저 참여 가능한 날짜를 조사한 뒤, 신청자가 충분한 날짜를 선정해 결제 모집을 진행합니다.</strong></p>
          </div>
          <ol className="oneday-steps">
            <li><span>01</span><div><strong>무료 사전예약</strong><p>참여 가능한 날짜를 복수로 선택합니다.</p></div></li>
            <li><span>02</span><div><strong>11월 1일 날짜 선정</strong><p>7명 이상인 후보 중 최대 하루를 선정합니다.</p></div></li>
            <li><span>03</span><div><strong>별도 유료 모집</strong><p>선정 결과와 결제 안내를 이메일로 전달합니다.</p></div></li>
          </ol>
          <div className="oneday-date-grid" aria-label="원데이 클래스 후보 일정">
            {oneDayClassDates.map((item, index) => <article key={item.value}><span>후보 {index + 1}</span><h3>{item.label}</h3><p>{item.time}</p></article>)}
          </div>
          <ul className="oneday-notice-list">{reservationNotes.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section id="reservation" className="oneday-section oneday-reservation" aria-labelledby="oneday-form-title">
        <div className="oneday-container oneday-form-layout">
          <div className="oneday-form-copy">
            <p className="oneday-eyebrow">FREE PRE-RESERVATION</p>
            <h2 id="oneday-form-title">참여 가능한 날짜를 알려주세요</h2>
            <p>무료 사전예약은 참가 확정이나 결제가 아닙니다. 접수된 가능 날짜를 바탕으로 실제 모집을 진행할 하루를 결정합니다.</p>
            <dl>
              <div><dt>사전예약 비용</dt><dd>무료</dd></div>
              <div><dt>사전예약 마감</dt><dd>10월 31일 23:59</dd></div>
              <div><dt>결과 안내</dt><dd>11월 1일 이메일 안내</dd></div>
            </dl>
          </div>
          <OneDayClassReservationForm reservationOpen={reservationOpen} />
        </div>
      </section>
    </main>
  );
}
