"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { oneDayClassDates, type OneDayClassDate } from "@/lib/one-day-class";

type FormState = {
  name: string;
  email: string;
  availableDates: OneDayClassDate[];
  privacyConsent: boolean;
  marketingConsent: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  availableDates: [],
  privacyConsent: false,
  marketingConsent: false,
};

export function OneDayClassReservationForm({ reservationOpen }: { reservationOpen: boolean }) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedDates, setSubmittedDates] = useState<OneDayClassDate[] | null>(null);

  const toggleDate = (date: OneDayClassDate) => {
    setForm((current) => ({
      ...current,
      availableDates: current.availableDates.includes(date)
        ? current.availableDates.filter((item) => item !== date)
        : [...current.availableDates, date],
    }));
  };

  const submitReservation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (form.availableDates.length === 0) {
      setError("참여 가능한 날짜를 한 개 이상 선택해주세요.");
      return;
    }
    if (!form.privacyConsent) {
      setError("필수 개인정보 수집·이용 동의가 필요합니다.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/one-day-class-reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "사전예약을 접수하지 못했습니다.");
      setSubmittedDates(form.availableDates);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!reservationOpen) {
    return <div className="oneday-form-card oneday-closed"><span aria-hidden="true">✓</span><h3>무료 사전예약이 마감되었습니다.</h3><p>신청 결과와 후속 안내는 접수 시 입력한 이메일로 전달됩니다.</p></div>;
  }

  if (submittedDates) {
    return (
      <div className="oneday-form-card oneday-success" role="status">
        <span className="oneday-success-icon" aria-hidden="true">✓</span>
        <p className="oneday-eyebrow">RESERVATION COMPLETE</p>
        <h3>무료 사전예약이 완료되었습니다!</h3>
        <p>참여 가능한 날짜가 정상적으로 접수되었습니다.</p>
        <div className="oneday-success-dates">
          <strong>선택한 날짜</strong>
          <ul>{submittedDates.map((date) => {
            const item = oneDayClassDates.find((candidate) => candidate.value === date);
            return item ? <li key={date}>{item.label} · {item.time}</li> : null;
          })}</ul>
        </div>
        <p>사전예약 종료 후 클래스 진행 날짜가 선정되면 입력하신 이메일로 결과와 결제 안내를 보내드립니다.</p>
        <p className="oneday-success-note">사전예약은 참가 확정이 아니며, 실제 참가 신청은 추후 결제를 통해 완료됩니다.</p>
      </div>
    );
  }

  return (
    <form className="oneday-form-card oneday-form" onSubmit={submitReservation} noValidate>
      <label className="oneday-field">
        <span>이름 <b>*</b></span>
        <input name="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} autoComplete="name" maxLength={50} required />
      </label>
      <label className="oneday-field">
        <span>이메일 주소 <b>*</b></span>
        <input type="email" name="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} autoComplete="email" maxLength={120} placeholder="example@email.com" required />
      </label>

      <fieldset className="oneday-fieldset">
        <legend>참여 가능한 날짜 <b>*</b></legend>
        <p>참여할 수 있는 날짜를 모두 선택해주세요.</p>
        <div className="oneday-choice-list">
          {oneDayClassDates.map((item) => (
            <label className="oneday-choice" key={item.value}>
              <input type="checkbox" checked={form.availableDates.includes(item.value)} onChange={() => toggleDate(item.value)} />
              <span><strong>{item.label}</strong><small>{item.time}</small></span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="oneday-consents">
        <label className="oneday-consent">
          <input type="checkbox" checked={form.privacyConsent} onChange={(event) => setForm((current) => ({ ...current, privacyConsent: event.target.checked }))} required />
          <span><strong>[필수] 개인정보 수집·이용에 동의합니다.</strong><small>이름, 이메일, 선택한 날짜를 사전예약 접수 및 해당 클래스의 결과·결제 안내에 사용합니다. <Link href="/privacy" target="_blank">개인정보처리방침 보기</Link></small></span>
        </label>
        <label className="oneday-consent">
          <input type="checkbox" checked={form.marketingConsent} onChange={(event) => setForm((current) => ({ ...current, marketingConsent: event.target.checked }))} />
          <span><strong>[선택] 앞으로 원데이 클래스 관련 업데이트 및 개설 정보를 이메일로 받아보는 데 동의합니다.</strong><small>선택하지 않아도 이번 사전예약과 결과·결제 안내를 받을 수 있습니다.</small></span>
        </label>
      </div>

      {error && <p className="oneday-form-error" role="alert">{error}</p>}
      <button className="oneday-button oneday-button-primary oneday-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "접수 중…" : "무료 사전예약 완료하기"}</button>
      <p className="oneday-form-footnote">신청 데이터가 정상적으로 저장된 경우에만 접수가 완료됩니다.</p>
    </form>
  );
}
