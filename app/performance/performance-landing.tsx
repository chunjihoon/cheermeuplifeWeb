"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";
import { track } from "@/lib/analytics";
import "./performance.css";

const eventCategories = [
  { icon: "🎓", title: "학교축제", description: "대학축제, 학교 행사, 동아리 행사 등 현장의 분위기를 빠르게 끌어올리는 공연" },
  { icon: "🏆", title: "체육대회", description: "기업·학교·기관 체육대회의 오프닝, 응원전, 이벤트 공연" },
  { icon: "🏢", title: "기업·기관 행사", description: "사내행사, 프로모션, 기념행사 등 행사 목적에 맞춘 응원 퍼포먼스" },
  { icon: "🎉", title: "지역축제·이벤트", description: "지역 행사, 야외무대, 문화행사 등 다양한 관객을 위한 치어리딩 공연" },
] as const;

const performances = [
  {
    title: "신해철 「그대에게」 치어리딩 공연",
    organization: "수원대학교 응원단 적토마",
    videoId: "FxtV1yXn_UE",
  },
  {
    title: "결혼식 축하공연 · 신해철 「그대에게」",
    organization: "수원대학교 응원단 적토마",
    videoId: "uPlCSt3_qZg",
  },
] as const;

const processSteps = [
  ["01", "문의 접수", "행사 일정, 장소, 행사 성격과 원하는 공연 형태를 알려주세요."],
  ["02", "내용 확인 및 협의", "행사 규모와 요청사항을 확인하고 가능한 구성과 진행 방법을 안내합니다."],
  ["03", "공연 준비", "확정된 행사에 맞춰 공연 구성과 필요한 사항을 준비합니다."],
  ["04", "행사 진행", "현장에서 치어리딩 공연과 응원 퍼포먼스를 진행합니다."],
] as const;

type InquiryForm = {
  contactName: string;
  organization: string;
  email: string;
  eventDate: string;
  dateUndecided: boolean;
  location: string;
  eventType: string;
  message: string;
};

const initialForm: InquiryForm = {
  contactName: "",
  organization: "",
  email: "",
  eventDate: "",
  dateUndecided: false,
  location: "",
  eventType: "",
  message: "",
};

export function PerformanceLanding() {
  const [form, setForm] = useState<InquiryForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const trackCta = (location: string) => {
    track("performance_inquiry_cta_click", { location });
  };

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);
    track("performance_inquiry_submit", { event_type: form.eventType });

    try {
      const response = await fetch("/api/performance-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json() as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) throw new Error(result.error || "문의 전송에 실패했습니다.");

      setForm(initialForm);
      setStatus({ type: "success", message: "문의가 정상적으로 접수되었습니다. 확인 후 연락드리겠습니다." });
      track("performance_inquiry_submit_success", { event_type: form.eventType });
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "문의 전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." });
      track("performance_inquiry_submit_fail", { event_type: form.eventType });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="performance-page">
      <section className="performance-hero">
        <div className="performance-container performance-hero-grid">
          <div className="performance-hero-copy">
            <p className="performance-eyebrow">CHEERLEADING PERFORMANCE</p>
            <h1>행사에 에너지가 필요하다면<br />치어리딩으로 분위기를 바꿔보세요</h1>
            <p>학교축제 · 체육대회 · 기업행사 · 지역축제 등<br />행사 성격과 규모에 맞는 치어리딩 공연과 응원 퍼포먼스를 준비합니다.</p>
            <div className="performance-actions">
              <a className="performance-button performance-button-primary" href="#inquiry" onClick={() => trackCta("hero")}>공연·행사 문의하기</a>
              <a className="performance-button performance-button-secondary" href="#portfolio" onClick={() => track("performance_portfolio_click", { location: "hero" })}>공연 영상 보기</a>
            </div>
          </div>
          <div className="performance-hero-image">
            <Image src="/goyangCheerFestival2022.png" alt="여러 명이 무대에서 함께 선보이는 치어리딩 공연" fill priority sizes="(max-width: 760px) calc(100vw - 28px), 48vw" />
          </div>
        </div>
      </section>

      <section className="performance-section performance-white performance-events-section" aria-labelledby="event-types-title">
        <div className="performance-container">
          <div className="performance-heading"><p className="performance-eyebrow">FOR YOUR EVENT</p><h2 id="event-types-title">어떤 행사에 적합한가요?</h2></div>
          <div className="performance-event-grid">
            {eventCategories.map((category) => <article className="performance-card" key={category.title}><span aria-hidden="true">{category.icon}</span><h3>{category.title}</h3><p>{category.description}</p></article>)}
          </div>
        </div>
      </section>

      <section id="portfolio" className="performance-section performance-soft" aria-labelledby="portfolio-title">
        <div className="performance-container">
          <div className="performance-heading"><p className="performance-eyebrow">PERFORMANCE PORTFOLIO</p><h2 id="portfolio-title">영상으로 확인하는 공연</h2><p>실제 안무와 퍼포먼스의 분위기를 영상으로 확인해보세요.</p></div>
          <div className="performance-portfolio-grid">
            {performances.map((performance) => <article className="performance-portfolio-card" key={performance.videoId}><div className="performance-video"><iframe src={`https://www.youtube-nocookie.com/embed/${performance.videoId}?rel=0`} title={performance.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div><div><span>{performance.organization}</span><h3>{performance.title}</h3></div></article>)}
          </div>
        </div>
      </section>

      <section className="performance-section performance-white" aria-labelledby="process-title">
        <div className="performance-container">
          <div className="performance-heading"><p className="performance-eyebrow">HOW IT WORKS</p><h2 id="process-title">이런 방식으로 진행됩니다</h2><p>행사마다 조건이 다르므로 내용을 확인한 뒤 가능한 구성과 진행 방법을 협의합니다.</p></div>
          <ol className="performance-process">
            {processSteps.map(([number, title, description]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="performance-cta" aria-labelledby="performance-cta-title">
        <div className="performance-container"><div><p className="performance-eyebrow">BRING THE ENERGY</p><h2 id="performance-cta-title">우리 행사에도 이런 에너지를 더하고 싶다면</h2><p>지금 공연 가능 여부를 문의해보세요.</p></div><a className="performance-button performance-button-light" href="#inquiry" onClick={() => trackCta("bottom_cta")}>공연·행사 문의하기</a></div>
      </section>

      <section id="inquiry" className="performance-section performance-inquiry" aria-labelledby="inquiry-title">
        <div className="performance-container performance-inquiry-grid">
          <div className="performance-inquiry-copy"><p className="performance-eyebrow">CONTACT</p><h2 id="inquiry-title">공연·행사 섭외 문의</h2><p>행사 일정이나 구성이 아직 완전히 정해지지 않았어도 괜찮습니다. 현재 알고 계신 내용만 남겨주시면 확인 후 연락드리겠습니다.</p><ul><li>행사 성격과 규모에 맞는 공연 구성 협의</li><li>가격은 일정·지역·구성 확인 후 안내</li><li>접수 내용 확인 후 이메일로 회신</li></ul></div>
          <form className="performance-form" onSubmit={submitInquiry}>
            <div className="performance-form-row">
              <label><span>담당자 이름 <b>*</b></span><input name="contactName" value={form.contactName} onChange={(event) => setForm((current) => ({ ...current, contactName: event.target.value }))} autoComplete="name" required /></label>
              <label><span>소속 / 기관명 <b>*</b></span><input name="organization" value={form.organization} onChange={(event) => setForm((current) => ({ ...current, organization: event.target.value }))} placeholder="OO대학교 / OO기업 / OO문화재단" autoComplete="organization" required /></label>
            </div>
            <label><span>연락 가능한 이메일 <b>*</b></span><input type="email" name="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} placeholder="example@email.com" autoComplete="email" required /></label>
            <div className="performance-form-row performance-date-row">
              <label><span>행사 예정일 <b>*</b></span><input type="date" name="eventDate" value={form.eventDate} onChange={(event) => setForm((current) => ({ ...current, eventDate: event.target.value }))} disabled={form.dateUndecided} required={!form.dateUndecided} /></label>
              <label className="performance-checkbox"><input type="checkbox" checked={form.dateUndecided} onChange={(event) => setForm((current) => ({ ...current, dateUndecided: event.target.checked, eventDate: event.target.checked ? "" : current.eventDate }))} /><span>아직 일정이 정해지지 않았어요</span></label>
            </div>
            <div className="performance-form-row">
              <label><span>행사 지역 / 장소 <b>*</b></span><input name="location" value={form.location} onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))} placeholder="서울 / 수원 / OO대학교 대운동장" required /></label>
              <label><span>행사 종류 <b>*</b></span><select name="eventType" value={form.eventType} onChange={(event) => setForm((current) => ({ ...current, eventType: event.target.value }))} required><option value="">선택해주세요</option><option>학교축제</option><option>체육대회</option><option>기업·기관 행사</option><option>지역축제</option><option>기타</option></select></label>
            </div>
            <label><span>문의 내용 <b>*</b></span><textarea name="message" value={form.message} onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))} placeholder="예상 공연 시간, 원하는 분위기, 예상 인원, 행사 규모 등 알고 계신 내용을 자유롭게 작성해주세요." rows={6} required /></label>
            {status && <p className={`performance-form-status performance-form-status-${status.type}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
            <button className="performance-button performance-button-primary performance-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "전송 중..." : "공연 문의 보내기"}</button>
          </form>
        </div>
      </section>
    </main>
  );
}
