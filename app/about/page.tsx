import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentCta } from "@/components/content-cta";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { SharePrompt } from "@/components/share-prompt";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "취미로운응원생활 소개",
  description: "치어리딩과 응원문화를 누구나 취미롭게 즐길 수 있도록 안무 정보, 응원가, 레슨과 온라인 클래스를 만드는 취미로운응원생활을 소개합니다.",
  path: "/about",
  keywords: ["취미로운응원생활", "치어리딩 레슨", "치어리딩 안무", "응원문화"],
});

const services = [
  ["치어리딩·응원 안무", "처음 접하는 사람도 흐름과 동작을 이해할 수 있도록 안무를 나누어 설명합니다."],
  ["응원가·플레이리스트 정보", "학교 축제, 체육대회, 행사와 공연에 어울리는 응원곡과 활용 정보를 정리합니다."],
  ["개인·단체 레슨", "개인의 경험과 팀의 목표, 준비 기간에 맞춰 오프라인·온라인 레슨을 진행합니다."],
  ["온라인 클래스", "반복 학습이 필요한 안무를 구간별 설명과 다양한 속도의 연습 영상으로 제공합니다."],
];

export default function AboutPage() {
  return (
    <main className="content-page">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "취미로운응원생활 소개",
        url: absoluteUrl("/about"),
        mainEntity: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          sameAs: [siteConfig.youtube],
          employee: [
            { "@type": "Person", name: "천지훈", jobTitle: "치어리딩 강사", worksFor: { "@type": "Organization", name: siteConfig.name } },
            { "@type": "Person", name: "홍수관", jobTitle: "치어리딩 코치", worksFor: { "@type": "Organization", name: siteConfig.name } },
          ],
        },
      }} />
      <PageHero eyebrow="ABOUT US" title="응원하는 순간을 더 쉽고, 더 즐겁게" description="취미로운응원생활은 치어리딩과 응원문화를 처음 만나는 사람도 부담 없이 배우고 즐길 수 있도록 콘텐츠와 레슨을 만듭니다." breadcrumbs={[{ label: "소개" }]} />
      <section className="content-section content-section-white">
        <div className="content-container">
          <div className="content-heading"><p className="content-eyebrow">WHY WE STARTED</p><h2>찾기 어려웠던 응원 정보를 한곳에 모읍니다</h2><p>좋아하는 응원가의 안무를 배우고 싶어도 완성 영상 외에는 참고할 자료가 부족했습니다. 취미로운응원생활은 현장에서 쌓은 경험을 누구나 이해할 수 있는 정보와 학습 콘텐츠로 바꾸기 위해 시작했습니다.</p></div>
          <div className="content-card-grid">
            <article className="content-card"><span className="content-card-number">01 · EASY</span><h3>초보자도 이해할 수 있게</h3><p>동작의 방향, 순서와 카운트를 나누어 처음 배우는 사람의 시선으로 설명합니다.</p></article>
            <article className="content-card"><span className="content-card-number">02 · PRACTICAL</span><h3>실제 무대에 연결되게</h3><p>학교 축제와 체육대회, 동아리와 행사처럼 구체적인 공연 상황을 기준으로 안내합니다.</p></article>
            <article className="content-card"><span className="content-card-number">03 · JOYFUL</span><h3>응원답게 즐겁게</h3><p>완벽함보다 함께 움직이고 에너지를 나누는 응원문화의 즐거움을 중요하게 생각합니다.</p></article>
          </div>
        </div>
      </section>
      <section className="content-section content-section-soft">
        <div className="content-container">
          <div className="content-heading"><p className="content-eyebrow">WHAT WE DO</p><h2>정보부터 연습과 무대까지</h2><p>콘텐츠를 읽고 영상을 확인하는 단계에서 끝나지 않고, 필요할 때 직접 배우고 공연을 준비할 수 있도록 연결합니다.</p></div>
          <ul className="content-feature-list">{services.map(([title, description]) => <li key={title}><strong>{title}</strong><br />{description}</li>)}</ul>
        </div>
      </section>
      <section className="content-section content-section-white">
        <div className="content-container">
          <div className="content-heading">
            <p className="content-eyebrow">OUR INSTRUCTORS</p>
            <h2>함께하는 강사진</h2>
            <p>입문자의 첫 동작부터 실제 공연 준비까지, 다양한 연령과 목적에 맞춰 치어리딩을 지도합니다.</p>
          </div>
          <div className="instructor-grid">
            <article className="instructor-card instructor-card-pink">
              <div className="instructor-card-header">
                <Image src="/cheermeup_profile_June.png" alt="천지훈 치어리딩 강사" width={209} height={207} />
                <div><span>CHEERLEADING INSTRUCTOR</span><h3>천지훈 강사</h3><p>유튜버 취미로운응원생활</p></div>
              </div>
              <ul>
                <li>2014 수원대학교 적토마응원단 27대 단장</li>
                <li>어린이응원단부터 중·고등학생, 대학생, 직장인과 시니어까지 다양한 연령대 지도</li>
                <li>직장인 워크숍, 결혼식 축무, 일반인 취미반과 복지센터 출강 경험</li>
                <li>2022년부터 <Link href={siteConfig.youtube} target="_blank" rel="noreferrer">취미로운응원생활 YouTube 채널</Link> 운영</li>
                <li>크몽·숨고·탈잉 오프라인 레슨 운영 경험</li>
              </ul>
              <strong>수강생의 경험과 목표에 맞춰 처음부터 차근차근 지도합니다.</strong>
            </article>
            <article className="instructor-card instructor-card-yellow">
              <div className="instructor-card-header">
                <Image src="/cheermeup_profile_Hong.jpeg" alt="홍수관 치어리딩 코치" width={219} height={185} />
                <div><span>CHEERLEADING COACH</span><h3>홍수관 코치</h3><p>치어리딩 경력 15년</p></div>
              </div>
              <ul>
                <li>Rainbow Entertainment 소속 Rainbow Cheer Team 활동</li>
                <li>일본 All-star Cheerleading 대회 입상 2회</li>
                <li>Lotte World Cheerleading 대회 입상</li>
                <li>대영중·장훈고·수원대학교 응원단 훈련부장 출신</li>
                <li>거리 퍼레이드, 청소년 축제와 시즌 스포츠 강습 경험</li>
              </ul>
              <strong>오랜 실전 경험을 바탕으로 동작의 원리와 완성도를 함께 지도합니다.</strong>
            </article>
          </div>
        </div>
      </section>
      <section className="content-section content-section-soft">
        <div className="content-container">
          <div className="content-heading"><p className="content-eyebrow">FOR EVERY CHEERER</p><h2>이런 분들과 함께합니다</h2></div>
          <ul className="content-feature-list">
            <li>치어리딩을 처음 배우는 개인과 소규모 모임</li><li>학교 축제와 체육대회를 준비하는 학생·교사</li><li>동아리, 기업 행사와 축하공연을 준비하는 단체</li><li>응원가와 응원문화에 관심 있는 모든 사람</li>
          </ul>
          <p className="content-meta">운영·콘텐츠 제작: {siteConfig.author} · 공식 채널: <Link href={siteConfig.youtube}>YouTube</Link></p>
        </div>
      </section>
      <SharePrompt
        title="응원의 즐거움을 주변에도 소개해주세요"
        description="치어리딩과 응원문화를 함께 즐기고 싶은 친구나 모임에 취미로운응원생활을 공유해보세요."
        buttonLabel="취미로운응원생활 공유하기"
        shareTitle="취미로운응원생활"
        shareText="치어리딩과 응원문화를 처음이어도 즐겁게 배우고 즐길 수 있는 취미로운응원생활이에요."
        sharePath="/about"
        location="about_bottom"
      />
      <ContentCta title="응원할 준비가 되셨나요?" description="치어위키를 둘러보거나 현재 수준과 목표에 맞는 치어리딩 레슨을 확인해보세요." />
    </main>
  );
}
