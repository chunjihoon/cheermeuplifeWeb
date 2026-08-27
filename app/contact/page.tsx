import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = createMetadata({
  title: "문의",
  description: "치어리딩 레슨, 질풍가도 완전정복 클래스 구매, 학교 축제·행사·협업 및 일반 문의 방법을 안내합니다.",
  path: "/contact",
});

const contacts = [
  ["레슨 문의", "개인·단체 레슨, 온라인 수업과 원하는 곡의 안무 학습에 대해 문의해주세요.", "/#products", "레슨 상품 확인"],
  ["클래스 구매 문의", "질풍가도 완전정복 클래스 구성, 계좌이체 주문과 Google Drive 이용에 대해 안내합니다.", "/vod-tutorial#purchase", "클래스 구매 안내"],
  ["공연·행사 문의", "학교 축제, 체육대회, 기업 행사와 지역축제를 위한 치어리딩 공연을 문의할 수 있습니다.", "/performance#inquiry", "공연 문의하기"],
  ["일반 문의", "사이트 이용, 콘텐츠 정정 요청과 기타 의견은 이메일로 보내주세요.", `mailto:${siteConfig.email}?subject=${encodeURIComponent("[일반 문의] ")}`, siteConfig.email],
];

export default function ContactPage() {
  return (
    <main className="content-page">
      <PageHero eyebrow="CONTACT" title="무엇을 준비하고 계신가요?" description="레슨부터 공연과 콘텐츠 협업까지 문의 목적에 맞는 경로를 확인해주세요. 내용을 확인한 뒤 순차적으로 답변드립니다." breadcrumbs={[{ label: "문의" }]} />
      <section className="content-section content-section-white">
        <div className="content-container contact-grid">
          {contacts.map(([title, description, href, label]) => <article className="contact-card" key={title}><h2>{title}</h2><p>{description}</p><a href={href}>{label} →</a></article>)}
        </div>
      </section>
      <section className="content-section content-section-soft"><div className="content-narrow content-prose" style={{ paddingTop: 0, paddingBottom: 0 }}><h2>문의 시 함께 알려주세요</h2><ul><li>희망하는 서비스 또는 협업 유형</li><li>예상 날짜와 지역</li><li>참여 인원과 현재 경험</li><li>배우거나 공연하려는 곡</li></ul><p>문의 내용에 개인정보가 포함될 수 있으므로 필요한 정보만 보내주세요. 공식 영상과 활동 소식은 <a href={siteConfig.youtube} target="_blank" rel="noreferrer">YouTube 채널</a>에서도 확인할 수 있습니다.</p></div></section>
    </main>
  );
}
