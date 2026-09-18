import type { Metadata } from "next";
import Image from "next/image";
import { isFirstPerformanceOpen } from "@/lib/crew";
import { createMetadata } from "@/lib/seo";
import "./crew.css";

const title = "취미로운 응원 크루 모집";
const description = "액션 치어리딩 경험자들이 부담 없이 다시 만나고 무대에 설 수 있는 프로젝트형 크루, 취미로운 응원 크루의 멤버를 모집합니다.";
const applicationFormUrl = "/crew/apply";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: "/crew",
  image: "/crew/crew-stage.png",
  keywords: ["액션 치어리딩", "응원단 모집", "치어리딩 크루", "공연 크루", "취미로운 응원 크루"],
});

export default function CrewRecruitmentPage() {
  const showFirstPerformance = isFirstPerformanceOpen();

  return (
    <main id="main" className="crew-page">
      <section className="crew-hero" aria-labelledby="crew-hero-title">
        <div className="crew-hero-media" aria-hidden="true">
          <Image src="/crew/crew-stage.png" alt="" fill priority sizes="100vw" />
        </div>
        <div className="crew-hero-overlay" />
        <div className="crew-hero-content">
          <p className="crew-eyebrow">HOBBY CHEER CREW · NEW MEMBERS</p>
          <h1 id="crew-hero-title">응원단 활동,<br /><span>그대로 끝내기 아쉬웠다면.</span></h1>
          <p className="crew-hero-lead">예전에 함께했던 열정은 그대로 두고, 부담은 가볍게.<br />액션 치어리딩 경험자들과 다시 무대에 서보세요.</p>
          <div className="crew-hero-actions">
            <a className="crew-button crew-button-primary" href={applicationFormUrl}>크루 지원하기 <span aria-hidden="true">→</span></a>
            <a className="crew-text-link" href="#about">어떤 크루인지 먼저 보기</a>
          </div>
          <ul className="crew-hero-points" aria-label="크루 주요 특징">
            <li>정기연습 없음</li>
            <li>가능한 공연만 참여</li>
            <li>액션 치어리딩 경험자</li>
          </ul>
        </div>
      </section>

      <section className="crew-intro crew-section" id="about">
        <div className="crew-section-background" aria-hidden="true">
          <Image src="/crew/crew-how-it-works.png" alt="" fill sizes="100vw" />
        </div>
        <div className="crew-section-background-overlay" />
        <div className="crew-section-kicker">ABOUT THE CREW</div>
        <div className="crew-intro-grid">
          <h2>다시 시작하되,<br />예전과 똑같을 필요는 없으니까.</h2>
          <div className="crew-prose crew-prose-large">
            <p>대학 시절 열심히 응원단 활동을 했지만, 졸업하거나 활동을 마친 뒤에는 다시 무대에 설 기회가 거의 없어 아쉬웠던 분들이 있을 거라고 생각합니다.</p>
            <p>다시 응원하고 무대에도 서보고 싶지만, 예전처럼 매주 정기적으로 연습하고 많은 시간을 투자하며 응원단 활동을 처음부터 다시 시작하기는 현실적으로 쉽지 않습니다.</p>
            <p>그래서 <strong>취미로운 응원생활에서 ‘취미로운 응원 크루’를 시작합니다.</strong></p>
          </div>
        </div>
      </section>

      <section className="crew-definition crew-section crew-section-navy">
        <div className="crew-section-background" aria-hidden="true">
          <Image src="/crew/crew-what-we-are.png" alt="" fill sizes="100vw" />
        </div>
        <div className="crew-section-background-overlay" />
        <div className="crew-definition-layout">
          <div>
            <div className="crew-section-kicker crew-section-kicker-light">WHAT WE ARE</div>
            <h2>새로운 대학 응원단이 아닌,<br /><span>프로젝트형 응원 크루</span>입니다.</h2>
          </div>
          <div className="crew-definition-copy">
            <p>취미로운 응원 크루는 대학 응원단 등에서 <strong>액션 치어리딩을 경험했던 사람들이 다시 모여 함께 연습하고, 새로운 사람들을 만나고, 공연 기회가 생기면 다시 무대에 설 수 있는 크루</strong>입니다.</p>
            <p>매주 정해진 요일에 연습하지 않습니다. 모든 공연에 반드시 참여할 의무도 없습니다. 평소에는 각자의 일상을 보내다가 공연 기회가 생기면 일정이 가능한 멤버들이 모입니다.</p>
            <p className="crew-highlight-line">응원단 활동은 끝났지만,<br />응원까지 끝내고 싶지는 않은 사람들을 위한 새로운 무대.</p>
          </div>
        </div>
      </section>

      <section className="crew-fit crew-section" id="eligibility">
        <div className="crew-section-heading">
          <div>
            <div className="crew-section-kicker">WHO WE&apos;RE LOOKING FOR</div>
            <h2>이런 분을 찾습니다.</h2>
          </div>
          <p><strong>대학 응원단 등에서 액션 치어리딩 활동 경험이 있는 분</strong>을 모집합니다. 졸업생, 휴학생, 현역 모두 지원할 수 있습니다.</p>
        </div>

        <div className="crew-eligibility-note">
          <span className="crew-note-icon" aria-hidden="true">!</span>
          <p>스턴트 치어리딩이 아닌 <strong>액션 치어리딩 경험자</strong>를 대상으로 합니다.</p>
        </div>

        <ul className="crew-fit-list">
          <li><span>01</span><p>대학 응원단 활동이 끝난 뒤<br /><strong>다시 무대에 서고 싶었던 분</strong></p></li>
          <li><span>02</span><p>응원단 활동은 그립지만<br /><strong>정기적인 조직 활동은 부담스러웠던 분</strong></p></li>
          <li><span>03</span><p>새로운 사람들과 함께<br /><strong>다시 응원하고 공연해보고 싶은 분</strong></p></li>
          <li><span>04</span><p>새로운 공연 안무를 개별적으로 익히고<br /><strong>필요한 합주에 참여할 수 있는 분</strong></p></li>
          <li><span>05</span><p>서울·수도권에서 진행되는 공연에<br /><strong>참여할 수 있는 분</strong></p></li>
          <li><span>06</span><p>평일 낮을 포함해<br /><strong>비교적 일정 조정이 자유로운 분</strong></p></li>
        </ul>
        <p className="crew-fine-print">※ 평일 낮 일정 조정 가능 여부는 필수조건이 아닙니다. 공연 참여는 매번 각자의 일정에 따라 자유롭게 결정할 수 있습니다.</p>
      </section>

      <section className="crew-process crew-section crew-section-sky" id="process">
        <div className="crew-section-kicker">HOW IT WORKS</div>
        <h2>평소에는 각자의 자리에서,<br />공연이 생기면 함께.</h2>
        <p className="crew-section-intro">멤버들은 공연 영상을 통해 기본 레퍼토리를 개별적으로 익힙니다. 실제 공연이 결정되면 참여 가능한 멤버들이 모여 필요한 합주를 진행한 뒤 함께 무대에 섭니다.</p>
        <ol className="crew-process-list">
          <li><span className="crew-process-number">01</span><strong>개별 레퍼토리 습득</strong><p>공연 영상을 보고 각자 안무를 익힙니다.</p></li>
          <li><span className="crew-process-number">02</span><strong>공연 기회 안내</strong><p>날짜·지역·공연 조건을 공유합니다.</p></li>
          <li><span className="crew-process-number">03</span><strong>참여 여부 결정</strong><p>가능하고 원하는 공연에만 지원합니다.</p></li>
          <li><span className="crew-process-number">04</span><strong>참여 멤버 구성</strong><p>일정이 맞는 멤버들로 팀을 만듭니다.</p></li>
          <li><span className="crew-process-number">05</span><strong>공연 전 합주</strong><p>필요한 만큼 함께 맞춰봅니다.</p></li>
          <li><span className="crew-process-number">06</span><strong>공연</strong><p>관객 앞에서 다시 응원합니다.</p></li>
        </ol>
      </section>

      {showFirstPerformance && <section className="crew-first-stage crew-section" id="first-stage">
        <article className="crew-stage-card">
          <div className="crew-stage-photo">
            <Image src="/crew/crew-festival.png" alt="야외 축제 무대에서 공연 중인 액션 치어리딩 팀" width={479} height={665} sizes="(max-width: 820px) 100vw, 45vw" />
          </div>
          <div className="crew-stage-copy">
            <p className="crew-stage-badge">FIRST STAGE</p>
            <h2>때마침,<br />첫 번째 무대가<br />준비되어 있습니다.</h2>
            <dl className="crew-event-facts">
              <div><dt>일정</dt><dd>2026. 10. 21. 수요일</dd></div>
              <div><dt>장소</dt><dd>서울 · 기관행사</dd></div>
              <div><dt>준비</dt><dd>약 3곡 · 2~3주 개별 연습 · 공연 전 주 1회 합주 예정</dd></div>
            </dl>
            <p>초기 크루 멤버 중 해당 날짜에 일정이 가능한 분들과 취미로운 응원 크루의 첫 실제 공연을 준비합니다. 세부 일정과 진행방식은 지원 후 참여자들과 협의해 조정할 예정입니다.</p>
            <p className="crew-stage-emphasis">10월 21일에 참여할 수 없어도 괜찮습니다.</p>
            <p>이번 모집은 이 공연만을 위한 단기 모집이 아닙니다. 향후 기업·기관·축제·체육대회 등의 공연에 함께할 크루 멤버를 모집합니다.</p>
          </div>
        </article>
      </section>}

      <section className="crew-opportunities crew-section">
        <div className="crew-opportunity-grid">
          <div>
            <div className="crew-section-kicker">PERFORMANCE OPPORTUNITIES</div>
            <h2>공연 섭외는<br />취미로운 응원생활이<br />담당합니다.</h2>
          </div>
          <div className="crew-prose">
            <p>기업이나 기관 등에 직접 공연을 알아보거나 영업할 필요는 없습니다. <strong>취미로운 응원생활에서 공연 문의를 받고, 공연 기회를 만들어 크루 멤버들에게 안내합니다.</strong></p>
            <p>공연이 들어오면 날짜, 장소, 공연 구성 등의 조건을 정리해 공유하고 참여 가능한 사람들로 팀을 구성합니다. 외부 유료 공연은 공연 조건에 따라 참여 멤버에게 개인별 출연료가 지급됩니다.</p>
            <p>다만 출연료만을 목적으로 단기 공연자를 모집하기보다, 액션 치어리딩을 다시 즐기고 싶은 사람들이 함께하면서 좋은 기회가 있을 때 무대에도 설 수 있는 크루를 지향합니다.</p>
          </div>
        </div>
      </section>

      <section className="crew-application crew-section crew-section-ink" id="application">
        <div className="crew-application-heading">
          <div className="crew-section-kicker crew-section-kicker-light">APPLICATION</div>
          <h2>지원하면<br />이렇게 진행됩니다.</h2>
          <p>거창한 면접이나 오디션이 아닙니다. 서로의 활동 경험과 크루 운영방식을 편하게 확인하는 과정입니다.</p>
        </div>
        <ol className="crew-application-steps">
          <li><span>1</span><div><strong>홈페이지 지원서 작성</strong><p>지원하기 버튼을 통해 간단한 정보를 작성합니다.</p></div></li>
          <li><span>2</span><div><strong>지원 내용 검토</strong><p>기존 응원단 활동 경험과 참여 가능 일정을 확인합니다.</p></div></li>
          <li><span>3</span><div><strong>1:1 온라인 미팅</strong><p>서로의 활동 경험과 운영방식을 이야기하고 궁금한 점을 확인합니다.</p></div></li>
          <li><span>4</span><div><strong>크루 참여 및 레퍼토리 안내</strong><p>활동 방향이 맞으면 기본 레퍼토리와 이후 진행방식을 안내합니다.</p></div></li>
          <li><span>5</span><div><strong>공연이 생기면 자유롭게 참여</strong><p>일정과 조건을 확인하고 가능한 공연에 참여합니다.</p></div></li>
        </ol>
      </section>

      <section className="crew-final-cta">
        <Image src="/crew/crew-group.png" alt="공연을 마치고 무대에서 함께 포즈를 취한 액션 치어리딩 팀" fill sizes="100vw" />
        <div className="crew-final-overlay" />
        <div className="crew-final-content">
          <p className="crew-eyebrow">ONE MORE STAGE, TOGETHER</p>
          <h2>다시 한번,<br />같이 무대에 서봐요.</h2>
          <p>이미 완성된 팀에 들어오는 것이 아니라<br />첫 멤버들과 함께 앞으로의 모습을 만들어가는 단계입니다.</p>
          <a className="crew-button crew-button-primary crew-button-large" href={applicationFormUrl}>취미로운 응원 크루 지원하기 <span aria-hidden="true">→</span></a>
          <small>지원 단계에서 모든 세부사항을 결정할 필요는 없습니다.</small>
        </div>
      </section>

      <div className="crew-mobile-cta" aria-label="모바일 지원 바로가기">
        <a href={applicationFormUrl}>크루 지원하기 <span aria-hidden="true">→</span></a>
      </div>
    </main>
  );
}
