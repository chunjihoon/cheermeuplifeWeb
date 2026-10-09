"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { track } from "@/lib/analytics";
import { beginnerCurriculum, beginnerProgramConfig as program, beginnerStaff } from "@/lib/beginner-program";

const confirmations = [
  "프로그램의 일정, 장소, 참가비 및 운영방식을 확인했습니다.",
  "고정 기수제로 운영되며 개인 결석 시 해당 회차가 별도로 환불되지 않는다는 점을 확인했습니다.",
  "환불 및 중도해지 규정을 확인하고 동의합니다.",
] as const;

export function BeginnerProgram() {
  const [checked, setChecked] = useState<boolean[]>(() => confirmations.map(() => false));
  const [paymentMessage, setPaymentMessage] = useState("");
  const allConfirmed = useMemo(() => checked.every(Boolean), [checked]);
  const remaining = checked.filter((item) => !item).length;
  const remainingSeats = Math.max(program.recruitment.capacity - program.recruitment.confirmedParticipants, 0);
  const recruitmentIsFull = remainingSeats === 0;
  const recruitmentProgress = Math.min((program.recruitment.confirmedParticipants / program.recruitment.capacity) * 100, 100);

  const toggleAll = (value: boolean) => {
    setChecked(confirmations.map(() => value));
    setPaymentMessage("");
  };

  const handlePayment = () => {
    if (!allConfirmed) return;

    void track("beginner_payment_click", {
      program: "beginner_1",
      payment_configured: Boolean(program.paymentUrl),
    });

    if (!program.paymentUrl) {
      setPaymentMessage("결제 페이지를 준비하고 있습니다. 결제 URL이 확정되는 대로 버튼이 연결됩니다.");
      return;
    }

    window.location.assign(program.paymentUrl);
  };

  return (
    <main className="beginner-page">
      <section className="beginner-hero" aria-labelledby="beginner-title">
        <div className="beginner-container beginner-hero-grid">
          <div className="beginner-hero-copy">
            <p className="beginner-eyebrow">취미로운 응원크루 · BEGINNER 1기</p>
            <h1 id="beginner-title">첫 응원, <br />같이 시작해봐요.</h1>
            <div className="beginner-hero-description">
              <p>치어리딩을 한번 해보고 싶었지만 어디서부터 시작해야 할지 몰랐던 분들을 위한 <strong>취미로운 응원크루 Beginner 1기</strong>입니다.</p>
              <p>기본 자세와 응원동작부터 스텝, 실제 응원 안무까지 8주 동안 하나씩 함께 익혀갑니다.</p>
            </div>
            {/* <a className="beginner-button beginner-button-primary" href="#program-info">프로그램 자세히 보기</a> */}
          </div>
          {/* <aside className="beginner-hero-card" aria-label="Beginner 1기 요약">
            <span>BEGINNER 1기</span>
            <strong>{program.priceLabel}</strong>
            <dl>
              <div><dt>첫 연습</dt><dd>{program.startDate}</dd></div>
              <div><dt>과정</dt><dd>주 1회 · 총 8회</dd></div>
              <div><dt>장소</dt><dd>서울 사당역 근처 연습실 (추후 안내 예정)</dd></div>
            </dl>
          </aside> */}
        </div>
      </section>

      <section className="beginner-section beginner-section-white" id="program-info" aria-labelledby="program-info-title">
        <div className="beginner-container">
          <div className="beginner-heading"><p className="beginner-eyebrow">PROGRAM INFO</p><h2 id="program-info-title">Beginner 1기 프로그램</h2><p>참여 전 일정과 운영 조건을 확인해주세요.</p></div>
          <dl className="beginner-info-grid">
            <div><dt>사전 OT</dt><dd>2026년 10월 11일 (일)</dd></div>
            <div><dt>첫 연습</dt><dd>{program.startDate}</dd></div>
            <div><dt>수업 일정</dt><dd>{program.schedule}</dd><small>{program.scheduleNote}</small></div>
            <div><dt>기간</dt><dd>{program.duration}</dd></div>
            <div><dt>장소</dt><dd>{program.venue}</dd><small>{program.venueNote}</small></div>
            <div className="beginner-info-price"><dt>참가비</dt><dd>{program.priceLabel}</dd><small>연습실 대관비 포함</small></div>
            <div className={`beginner-info-recruitment ${recruitmentIsFull ? "is-full" : ""}`}><dt>모집 현황</dt><dd>현재 {program.recruitment.confirmedParticipants}명 참여 확정</dd><small>{recruitmentIsFull ? `정원 ${program.recruitment.capacity}명 · 모집 완료` : `정원 ${program.recruitment.capacity}명 · 잔여 ${remainingSeats}자리`}</small><div className="beginner-recruitment-progress" role="img" aria-label={`정원 ${program.recruitment.capacity}명 중 ${program.recruitment.confirmedParticipants}명 참여 확정`}><span style={{ width: `${recruitmentProgress}%` }} /></div></div>
          </dl>
        </div>
      </section>

      <section className="beginner-section beginner-section-soft beginner-section-curriculum" aria-labelledby="curriculum-detail-title">
        <div className="beginner-container">
          <div className="beginner-curriculum-detail" aria-labelledby="curriculum-detail-title">
            <div className="beginner-curriculum-detail-heading">
              <p className="beginner-eyebrow">WEEK BY WEEK</p>
              <h2 id="curriculum-detail-title">8주 상세 커리큘럼</h2>
              <strong>기본기부터 실제 응원곡까지, 8주 동안 단계적으로 완성합니다.</strong>
              <p>첫 4주 동안 기본동작과 기초 연습곡을 통해 움직임에 익숙해지고, 이후 4주 동안 실제 응원곡 「그대에게」의 안무를 배우며 한 곡을 완성합니다.</p>
            </div>

            <div className="beginner-curriculum-table-wrap">
              <table className="beginner-curriculum-table">
                <caption className="sr-only">Beginner 1기 사전 오리엔테이션 및 1회차부터 8회차까지의 상세 커리큘럼</caption>
                <colgroup><col className="beginner-curriculum-date-column" /><col className="beginner-curriculum-session-column" /><col className="beginner-curriculum-title-column" /><col className="beginner-curriculum-description-column" /></colgroup>
                <thead><tr><th scope="col">일정</th><th scope="col">회차</th><th scope="col">수업 주제</th><th scope="col">주요 내용</th></tr></thead>
                <tbody>
                  {beginnerCurriculum.map((item) => <tr className={item.type === "orientation" ? "is-orientation" : undefined} key={item.session}><td>{item.date}</td><td><span className="beginner-session-badge">{item.session}</span></td><td><strong>{item.title}</strong><small>{item.phase}</small></td><td>{item.description}</td></tr>)}
                </tbody>
              </table>
            </div>

            <ol className="beginner-curriculum-mobile">
              {beginnerCurriculum.map((item) => <li className={item.type === "orientation" ? "is-orientation" : undefined} key={item.session}><div className="beginner-curriculum-mobile-meta"><span>{item.date}</span><b>{item.session}</b><small>{item.phase}</small></div><h4>{item.title}</h4><p>{item.description}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="beginner-section beginner-section-white beginner-section-staff" aria-labelledby="staff-title">
        <div className="beginner-container">
          <div className="beginner-heading"><p className="beginner-eyebrow">WHO RUNS THE PROGRAM</p><h2 id="staff-title">프로그램을 함께 운영하는 사람들</h2><p>8주 과정 전체를 기획/관리하는 프로그램 총괄과 매주 오프라인 수업을 진행하는 현장 강사가 역할을 나누어 함께 운영합니다.</p></div>
          <div className="beginner-staff-grid">
            {beginnerStaff.map((person) => <article className="beginner-staff-card" key={person.role}>
              <div className="beginner-staff-photo">
                {person.image ? <Image src={person.image} alt={person.imageAlt} fill sizes="(max-width: 760px) calc(100vw - 68px), 180px" /> : <div className="beginner-staff-photo-placeholder" role="img" aria-label={`${person.name} ${person.role} 프로필 사진 준비 중`}><span aria-hidden="true">{person.role === "프로그램 총괄" ? "PROGRAM" : "CLASS"}</span><strong>프로필 사진 예정</strong></div>}
              </div>
              <div className="beginner-staff-copy"><span>{person.role}</span><h3>{person.name}</h3><p>{person.description}</p></div>
            </article>)}
          </div>
          {/* <p className="beginner-staff-note"><strong>프로그램 총괄</strong>은 8주 과정 전체를 기획·관리하고, <strong>현장 강사</strong>는 매주 오프라인 수업과 동작·안무 지도를 담당합니다.</p> */}
        </div>
      </section>

      <section className="beginner-section beginner-section-attendance" aria-labelledby="attendance-title">
        <div className="beginner-container">
          <div className="beginner-heading"><p className="beginner-eyebrow">ATTENDANCE</p><h2 id="attendance-title">출석 및 결석 안내</h2><p>본 과정은 동일한 멤버가 함께 진도를 맞추는 <strong>고정 기수제 그룹 수업</strong>입니다. 참가자 개인 사정으로 특정 회차에 참석하지 못하더라도 전체 수업은 예정된 일정에 따라 정상적으로 진행됩니다.</p></div>
          <div className="beginner-policy-grid">
            <article><span>01</span><h3>개인 사정으로 결석하는 경우</h3><p>참가자의 개인 사정으로 결석한 회차는 <strong>별도 환불되지 않습니다.</strong></p></article>
            <article><span>02</span><h3>결석자를 위한 온라인 보충</h3><p>개인 사정으로 결석하여 다음 수업 참여에 어려움이 있는 경우, 참가자의 요청에 따라 <strong>온라인 화상 미팅을 통한 보충을 과정 중 최대 2회까지 제공할 수 있습니다.</strong></p><p>온라인 보충은 결석 회차 자체를 대체하는 별도의 정규수업이나 1:1 개인레슨이 아니며, 참가자의 진도 복귀를 지원하기 위한 보충 프로그램입니다.</p></article>
            <article><span>03</span><h3>운영자 사정으로 수업이 진행되지 못하는 경우</h3><p>취미로운 응원생활 측의 사정으로 예정된 오프라인 수업을 진행할 수 없는 경우에는 일정 조정 또는 별도 보강을 통해 <strong>총 8회의 오프라인 수업이 제공되도록 운영하는 것을 원칙</strong>으로 합니다.</p></article>
          </div>
        </div>
      </section>

      <section className="beginner-section beginner-section-white" aria-labelledby="filming-title">
        <div className="beginner-container beginner-copy-layout">
          <div className="beginner-heading"><p className="beginner-eyebrow">PHOTO & VIDEO</p><h2 id="filming-title">연습 기록 촬영 안내</h2><p><strong>촬영 및 공개 범위는 참가자의 의사를 존중하여 운영합니다.</strong></p></div>
          <div className="beginner-prose">
            <p>취미로운 응원생활은 Beginner 과정의 활동과 성장 과정을 기록하기 위해 연습 중 촬영을 할 수 있습니다.</p>
            <p>촬영된 사진은 참가자의 동의 범위에 따라 취미로운 응원생활 YouTube 채널 또는 공식 홈페이지에서 활용될 수 있습니다.</p>
          </div>
        </div>
      </section>

      <section className="beginner-section beginner-section-refund" aria-labelledby="refund-title">
        <div className="beginner-container">
          <div className="beginner-heading"><p className="beginner-eyebrow">CANCELLATION & REFUND</p><h2 id="refund-title">취소 및 환불 안내</h2><p>결제 전 아래 기준을 반드시 확인해주세요.</p></div>
          <div className="beginner-refund-grid">
            <article><span>과정 시작 전</span><h3>첫 수업 전 취소</h3><p><strong>첫 오프라인 수업 시작 전까지 참가를 취소하는 경우 결제한 참가비 전액을 환불합니다.</strong></p></article>
            <article><span>과정 시작 후</span><h3>중도해지</h3><p>본 과정은 8주 동안 동일한 멤버가 함께하는 고정 기수제 프로그램으로, <strong>과정 시작 후 단순 변심에 의한 중도해지는 어려울 수 있습니다.</strong></p><p>부득이한 사유로 지속적인 참여가 어려운 경우에는 천지훈 총괄에게 별도로 문의해주세요.</p><p>중도해지 및 환불이 필요한 경우 관련 기준에 따라 안내드립니다.</p></article>
          </div>
        </div>
      </section>

      <section className="beginner-section beginner-section-confirm" aria-labelledby="confirm-title">
        <div className="beginner-container beginner-confirm-grid">
          <div className="beginner-confirm-copy"><p className="beginner-eyebrow">FINAL CHECK</p><h2 id="confirm-title">최종 확인</h2><p>결제 전 아래 내용을 확인해주세요. 문구 전체를 눌러 선택할 수 있습니다.</p><div className="beginner-confirm-progress" aria-live="polite"><strong>{confirmations.length - remaining}/{confirmations.length}</strong><span>{remaining === 0 ? "필수 확인 완료" : `${remaining}개 항목이 남았습니다.`}</span></div></div>
          <div>
            <label className="beginner-check beginner-check-all"><input type="checkbox" checked={allConfirmed} onChange={(event) => toggleAll(event.target.checked)} /><span>필수 안내사항 전체 확인</span></label>
            <div className="beginner-check-list">
              {confirmations.map((confirmation, index) => <label className="beginner-check" key={confirmation}><input type="checkbox" checked={checked[index]} onChange={(event) => { const next = [...checked]; next[index] = event.target.checked; setChecked(next); setPaymentMessage(""); }} /><span>{confirmation}</span></label>)}
            </div>
          </div>
        </div>
      </section>

      <section className="beginner-payment" aria-labelledby="payment-title">
        <div className="beginner-container beginner-payment-card">
          <div><p className="beginner-eyebrow">JOIN BEGINNER 01</p><h2 id="payment-title">Beginner 1기 참가비</h2><strong>{program.priceLabel}</strong><p>8주 오프라인 트레이닝 / 총 {program.totalHours}시간<br />(연습실 대관비 포함)</p></div>
          <div className="beginner-payment-action">
            <div
              style={{
                marginBottom: "20px",
                padding: "14px 16px",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.10)",
                color: "#fff",
                fontSize: "14px",
                lineHeight: 1.65,
              }}
            >
              <p style={{ margin: "0 0 6px", fontWeight: 700 }}>
                결제 완료 후 안내
              </p>

              <p style={{ margin: 0, opacity: 0.9 }}>
                결제 후 성함과 결제 완료 사실을 문자로 알려주세요.
                확인 후 단체 채팅방 참여를 안내드립니다.
              </p>

              <p style={{ margin: "8px 0 0", fontWeight: 700 }}>
                010-3343-7576
              </p>
            </div>
            <button className="beginner-button beginner-button-payment" type="button" disabled={!allConfirmed} onClick={handlePayment}>안내사항을 확인하고 {program.priceLabel} 결제하기</button><p className="beginner-payment-status" aria-live="polite">{!allConfirmed ? `필수 확인사항 ${remaining}개를 확인하면 결제 버튼이 활성화됩니다.` : paymentMessage || (program.paymentUrl ? "필수 확인이 완료되었습니다. 결제를 진행할 수 있습니다." : "필수 확인이 완료되었습니다. 현재 결제 페이지 연결을 준비하고 있습니다.")}</p>
          </div>
        </div>
      </section>

      <section className="beginner-closing" aria-labelledby="closing-title">
        <div className="beginner-container"><p>2026년 10월 11일,</p><h2 id="closing-title">온라인 오리엔테이션에서 만나요!</h2><p>처음이어도 괜찮습니다.</p><p>8주 동안 하나씩 배우고, 함께 맞춰가면서<br />처음에는 낯설었던 동작이 한 곡의 응원으로 완성되는 경험을 만들어보겠습니다.</p><strong>취미로운 응원크루 Beginner 1기에서 만나요.</strong></div>
      </section>
    </main>
  );
}
