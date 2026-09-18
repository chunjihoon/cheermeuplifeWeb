"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { track } from "@/lib/analytics";

const genderOptions = ["여성", "남성", "기타", "응답하지 않음"] as const;
const activityStatusOptions = ["졸업생", "휴학생", "재학생", "기타"] as const;
const availableTimeOptions = [
  "평일 오전",
  "평일 오후",
  "평일 저녁",
  "토요일",
  "일요일",
  "고정적으로 말하기 어렵지만 사전 안내 시 일정 조정 가능",
  "기타",
] as const;
const seoulMetroOptions = ["참여 가능합니다.", "일정이나 지역에 따라 가능합니다.", "참여가 어렵습니다."] as const;
const oct21Options = ["참여 가능합니다.", "아직 일정을 확인해야 합니다.", "이번 공연은 어렵습니다."] as const;
const preparationOptions = ["가능합니다.", "세부 일정 협의가 필요합니다.", "어렵습니다."] as const;

type CrewApplication = {
  name: string;
  birthYear: string;
  gender: string;
  phone: string;
  email: string;
  location: string;
  cheerleadingExperience: string;
  activityStatus: string;
  activityStatusOther: string;
  availableTimes: string[];
  availableTimeOther: string;
  seoulMetroAvailable: string;
  activityLink: string;
  motivation: string;
  oct21Availability: string;
  oct21PreparationAvailability: string;
  questions: string;
  privacyAccepted: boolean;
};

const initialForm: CrewApplication = {
  name: "",
  birthYear: "",
  gender: "",
  phone: "",
  email: "",
  location: "",
  cheerleadingExperience: "",
  activityStatus: "",
  activityStatusOther: "",
  availableTimes: [],
  availableTimeOther: "",
  seoulMetroAvailable: "",
  activityLink: "",
  motivation: "",
  oct21Availability: "",
  oct21PreparationAvailability: "",
  questions: "",
  privacyAccepted: false,
};

function RequiredMark() {
  return <span className="crew-apply-required" aria-label="필수 입력">*</span>;
}

export function CrewApplicationForm({ showFirstPerformance }: { showFirstPerformance: boolean }) {
  const [form, setForm] = useState<CrewApplication>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const [showAvailableTimesError, setShowAvailableTimesError] = useState(false);
  const invalidFocusHandledRef = useRef(false);
  const showPreparation = showFirstPerformance && (form.oct21Availability === "참여 가능합니다." || form.oct21Availability === "아직 일정을 확인해야 합니다.");

  const updateText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const updateRadio = (name: keyof CrewApplication, value: string) => {
    setForm((current) => {
      const next = { ...current, [name]: value };
      if (name === "activityStatus" && value !== "기타") next.activityStatusOther = "";
      if (name === "oct21Availability" && value === "이번 공연은 어렵습니다.") next.oct21PreparationAvailability = "";
      return next;
    });
  };

  const updateAvailableTime = (value: string, checked: boolean) => {
    if (checked) setShowAvailableTimesError(false);
    setForm((current) => ({
      ...current,
      availableTimes: checked
        ? [...current.availableTimes, value]
        : current.availableTimes.filter((item) => item !== value),
      availableTimeOther: value === "기타" && !checked ? "" : current.availableTimeOther,
    }));
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (form.availableTimes.length === 0) {
      setShowAvailableTimesError(true);
      const availableTimesField = document.getElementById("crew-available-times");
      availableTimesField?.focus({ preventScroll: true });
      availableTimesField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);
    setError("");
    track("crew_application_submit", { oct21_availability: form.oct21Availability });

    try {
      const response = await fetch("/api/crew-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "지원서를 전송하지 못했습니다.");

      setIsComplete(true);
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: "smooth" });
      track("crew_application_submit_success", { oct21_availability: form.oct21Availability });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "지원서 전송 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      track("crew_application_submit_fail", { oct21_availability: form.oct21Availability });
    } finally {
      setIsSubmitting(false);
    }
  };

  const focusFirstInvalid = (event: FormEvent<HTMLFormElement>) => {
    if (invalidFocusHandledRef.current) return;
    invalidFocusHandledRef.current = true;

    const invalidControl = event.target as HTMLElement;
    const questionGroup = invalidControl.closest("fieldset");
    const focusTarget = questionGroup instanceof HTMLElement ? questionGroup : invalidControl;

    if (questionGroup instanceof HTMLElement) questionGroup.tabIndex = -1;
    window.requestAnimationFrame(() => {
      focusTarget.focus({ preventScroll: true });
      focusTarget.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    window.setTimeout(() => {
      invalidFocusHandledRef.current = false;
    }, 300);
  };

  if (isComplete) {
    return (
      <main className="crew-apply-page crew-apply-complete-page">
        <section className="crew-apply-complete" aria-labelledby="crew-complete-title">
          <span aria-hidden="true">📣</span>
          <p className="crew-apply-eyebrow">APPLICATION COMPLETE</p>
          <h1 id="crew-complete-title">지원이 완료되었습니다! 📣</h1>
          <p>취미로운 응원 크루에 관심을 가져주셔서 감사합니다.</p>
          <p>보내주신 내용을 확인한 뒤 입력해주신 연락처를 통해 개별적으로 연락드리겠습니다.</p>
          <p>다시 좋은 무대에서 만날 수 있기를 기대할게요!</p>
          <Link className="crew-apply-button" href="/">취미로운 응원생활 홈으로 돌아가기</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="crew-apply-page">
      <header className="crew-apply-hero">
        <div className="crew-apply-hero-media" aria-hidden="true">
          <Image src="/crew/crew-apply-hero.png" alt="" fill priority sizes="100vw" />
        </div>
        <div className="crew-apply-hero-overlay" />
        <div className="crew-apply-container">
          <Link className="crew-apply-back" href="/crew">← 모집 안내로 돌아가기</Link>
          <p className="crew-apply-eyebrow">HOBBY CHEER CREW · APPLICATION</p>
          <h1>취미로운 응원 크루 지원하기 📣</h1>
          <div className="crew-apply-intro">
            <strong>지원해주셔서 감사합니다! 📣<br />아래 질문에 편하게 답변해주세요.</strong>
            <p>지원서를 제출한다고 바로 크루 활동이 확정되는 것은 아니며, 내용을 확인한 뒤 개별 연락을 통해 간단한 1:1 온라인 미팅을 진행할 예정입니다.</p>
            <p>궁금한 내용이나 세부 일정은 미팅에서 편하게 이야기하셔도 되니 부담 없이 지원해주세요.</p>
          </div>
        </div>
      </header>

      <form className="crew-apply-form crew-apply-container" onSubmit={submitApplication} onInvalid={focusFirstInvalid}>
        <section className="crew-form-section" aria-labelledby="basic-info-title">
          <div className="crew-form-section-heading"><span>01</span><div><p>BASIC INFORMATION</p><h2 id="basic-info-title">기본정보</h2></div></div>
          <div className="crew-form-grid">
            <label className="crew-field"><span>이름을 알려주세요. <RequiredMark /></span><input name="name" value={form.name} onChange={updateText} placeholder="홍길동" autoComplete="name" maxLength={50} required /></label>
            <label className="crew-field"><span>출생연도를 알려주세요. <RequiredMark /></span><input name="birthYear" value={form.birthYear} onChange={updateText} placeholder="1998" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} title="4자리 연도로 입력해주세요." required /></label>
          </div>

          <fieldset className="crew-fieldset">
            <legend>성별을 알려주세요. <RequiredMark /></legend>
            <div className="crew-choice-grid crew-choice-grid-four">{genderOptions.map((option) => <label className="crew-choice" key={option}><input type="radio" name="gender" value={option} checked={form.gender === option} onChange={() => updateRadio("gender", option)} required /><span>{option}</span></label>)}</div>
          </fieldset>

          <div className="crew-form-grid">
            <label className="crew-field"><span>연락 가능한 휴대전화 번호를 알려주세요. <RequiredMark /></span><input type="tel" name="phone" value={form.phone} onChange={updateText} placeholder="010-0000-0000" autoComplete="tel" inputMode="tel" minLength={10} maxLength={20} required /></label>
            <label className="crew-field"><span>이메일 주소를 알려주세요. <RequiredMark /></span><input type="email" name="email" value={form.email} onChange={updateText} placeholder="example@email.com" autoComplete="email" maxLength={120} required /></label>
          </div>

          <label className="crew-field"><span>현재 거주 지역을 알려주세요. <RequiredMark /></span><input name="location" value={form.location} onChange={updateText} placeholder="서울 마포구 / 경기 수원시" autoComplete="address-level2" maxLength={100} required /><small>정확한 주소는 입력하지 않으셔도 됩니다.</small></label>
        </section>

        <section className="crew-form-section" aria-labelledby="experience-title">
          <div className="crew-form-section-heading"><span>02</span><div><p>CHEERLEADING EXPERIENCE</p><h2 id="experience-title">응원단 활동경력</h2></div></div>
          <label className="crew-field"><span>액션 치어리딩 활동 경력을 알려주세요. <RequiredMark /></span><small>활동했던 학교/응원단, 활동기간, 당시 역할 등을 자유롭게 작성해주세요.</small><textarea name="cheerleadingExperience" value={form.cheerleadingExperience} onChange={updateText} placeholder="예) ○○대학교 ○○응원단 / 2019~2022 / 단원 및 부단장" rows={6} maxLength={3000} required /><em>본 모집은 스턴트 치어리딩이 아닌 액션 치어리딩 경험자를 대상으로 합니다.</em></label>

          <fieldset className="crew-fieldset">
            <legend>현재 활동 상태를 알려주세요. <RequiredMark /></legend>
            <div className="crew-choice-grid crew-choice-grid-four">{activityStatusOptions.map((option) => <label className="crew-choice" key={option}><input type="radio" name="activityStatus" value={option} checked={form.activityStatus === option} onChange={() => updateRadio("activityStatus", option)} required /><span>{option}</span></label>)}</div>
            {form.activityStatus === "기타" && <label className="crew-field crew-other-field"><span>현재 활동 상태를 직접 입력해주세요.</span><input name="activityStatusOther" value={form.activityStatusOther} onChange={updateText} maxLength={100} required /></label>}
          </fieldset>

          <label className="crew-field"><span>본인의 액션 치어리딩 활동을 확인할 수 있는 영상이나 SNS가 있다면 알려주세요.</span><small>YouTube, Instagram 등의 영상이나 링크가 있다면 남겨주세요. 필수사항은 아닙니다.</small><input name="activityLink" value={form.activityLink} onChange={updateText} placeholder="https:// 또는 계정명을 입력해주세요." maxLength={500} /></label>

          <label className="crew-field"><span>취미로운 응원 크루에 관심을 갖게 된 이유를 편하게 들려주세요. <RequiredMark /></span><small>다시 응원을 해보고 싶은 이유, 기대하는 활동, 참여하고 싶은 계기 등 어떤 내용이든 괜찮습니다.</small><textarea name="motivation" value={form.motivation} onChange={updateText} rows={6} maxLength={3000} required /></label>
        </section>

        <section className="crew-form-section" aria-labelledby="availability-title">
          <div className="crew-form-section-heading"><span>03</span><div><p>AVAILABILITY</p><h2 id="availability-title">활동 가능 일정</h2></div></div>
          <fieldset className="crew-fieldset" id="crew-available-times" tabIndex={-1} aria-describedby={showAvailableTimesError ? "crew-available-times-error" : undefined}>
            <legend>평소 공연 참여가 비교적 가능한 시간대를 모두 선택해주세요. <RequiredMark /></legend>
            <div className="crew-check-list">{availableTimeOptions.map((option) => <label className="crew-check" key={option}><input type="checkbox" name="availableTimes" value={option} checked={form.availableTimes.includes(option)} onChange={(event) => updateAvailableTime(option, event.target.checked)} /><span>{option}</span></label>)}</div>
            {form.availableTimes.includes("기타") && <label className="crew-field crew-other-field"><span>가능한 시간대를 직접 입력해주세요.</span><input name="availableTimeOther" value={form.availableTimeOther} onChange={updateText} maxLength={200} required /></label>}
            {showAvailableTimesError && form.availableTimes.length === 0 && <p className="crew-field-error" id="crew-available-times-error" role="alert">활동 가능 시간대를 한 개 이상 선택해주세요.</p>}
          </fieldset>

          <fieldset className="crew-fieldset">
            <legend>서울·수도권에서 진행되는 공연에 참여할 수 있나요? <RequiredMark /></legend>
            <div className="crew-choice-stack">{seoulMetroOptions.map((option) => <label className="crew-choice" key={option}><input type="radio" name="seoulMetroAvailable" value={option} checked={form.seoulMetroAvailable === option} onChange={() => updateRadio("seoulMetroAvailable", option)} required /><span>{option}</span></label>)}</div>
          </fieldset>
        </section>

        {showFirstPerformance && <section className="crew-form-section crew-first-performance" aria-labelledby="first-performance-title">
          <div className="crew-form-section-heading"><span>04</span><div><p>FIRST PERFORMANCE</p><h2 id="first-performance-title">첫 공연</h2></div></div>
          <fieldset className="crew-fieldset">
            <legend>2026년 10월 21일(수) 서울에서 진행되는 첫 공연에 참여할 수 있나요? <RequiredMark /></legend>
            <p className="crew-field-description">이번 모집은 10월 21일 공연만을 위한 모집이 아닙니다.<br />해당 날짜에 참여할 수 없어도 향후 취미로운 응원 크루 활동을 위해 지원할 수 있습니다.</p>
            <div className="crew-choice-stack">{oct21Options.map((option) => <label className="crew-choice" key={option}><input type="radio" name="oct21Availability" value={option} checked={form.oct21Availability === option} onChange={() => updateRadio("oct21Availability", option)} required /><span>{option}</span></label>)}</div>
          </fieldset>

          {showPreparation && <fieldset className="crew-fieldset crew-conditional-field">
            <legend>첫 공연 준비 일정에 참여할 수 있나요? <RequiredMark /></legend>
            <p className="crew-field-description">첫 공연에 참여하게 될 경우 약 2~3주 동안 공연 레퍼토리 약 3곡을 개별적으로 익힌 뒤, 공연 전 주에 서울에서 참여 멤버들과 합주를 진행할 예정입니다.</p>
            <div className="crew-choice-stack">{preparationOptions.map((option) => <label className="crew-choice" key={option}><input type="radio" name="oct21PreparationAvailability" value={option} checked={form.oct21PreparationAvailability === option} onChange={() => updateRadio("oct21PreparationAvailability", option)} required /><span>{option}</span></label>)}</div>
          </fieldset>}
        </section>}

        <section className="crew-form-section" aria-labelledby="final-info-title">
          <div className="crew-form-section-heading"><span>05</span><div><p>ONE LAST THING</p><h2 id="final-info-title">기타 및 제출</h2></div></div>
          <label className="crew-field"><span>크루 운영이나 활동에 대해 궁금한 점이 있다면 자유롭게 남겨주세요.</span><textarea name="questions" value={form.questions} onChange={updateText} placeholder="궁금한 점이나 미리 이야기하고 싶은 내용이 있다면 편하게 작성해주세요." rows={5} maxLength={3000} /></label>

          <div className="crew-privacy-card">
            <h3>개인정보 수집 및 이용 동의 <RequiredMark /></h3>
            <p>지원서 검토와 개별 연락을 위해 이름, 출생연도, 성별, 연락처, 이메일, 거주지역, 활동경력, 가용시간 및 지원자가 직접 입력한 지원 관련 정보를 수집·이용합니다.</p>
            <p>개인정보는 수집 목적을 달성한 후 지체 없이 삭제하는 것을 원칙으로 하며, 자세한 내용은 <Link href="/privacy" target="_blank">개인정보처리방침</Link>에서 확인할 수 있습니다.</p>
            <label className="crew-privacy-check"><input type="checkbox" checked={form.privacyAccepted} onChange={(event) => setForm((current) => ({ ...current, privacyAccepted: event.target.checked }))} required /><span>개인정보 수집 및 이용에 동의합니다.</span></label>
          </div>

          {error && <p className="crew-form-error" role="alert">{error}</p>}
          <button className="crew-apply-button crew-submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "지원서 제출 중..." : "취미로운 응원 크루 지원하기 📣"}</button>
          <p className="crew-submit-note">제출 후 내용을 확인해 개별적으로 연락드리겠습니다.</p>
        </section>
      </form>
    </main>
  );
}
