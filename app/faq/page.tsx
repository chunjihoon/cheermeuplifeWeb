import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ContentCta } from "@/components/content-cta";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({ title: "자주 묻는 질문", description: "치어리딩 레슨과 질풍가도 완전정복 클래스, 결제·환불·공연 문의에 관해 자주 묻는 질문을 확인하세요.", path: "/faq" });

const faqItems = [
  { question: "치어리딩을 처음 배우는데도 레슨을 받을 수 있나요?", answer: "네. 치어리딩이나 춤 경험이 없는 분도 참여할 수 있습니다. 현재 수준과 목표에 맞춰 기본 동작과 카운트부터 안내합니다." },
  { question: "개인과 단체 레슨이 모두 가능한가요?", answer: "개인·소규모 레슨과 학교, 동아리, 행사 준비를 위한 단체 레슨을 운영합니다. 인원과 목적에 따라 수업 구성이 달라질 수 있습니다.", cta: { href: "/#products", label: "예약 문의하러 가기" } },
  { question: "온라인 레슨은 어떻게 진행되나요?", answer: "화상 수업으로 지도하고, 동작을 확인하고 피드백을 제공합니다. 구체적인 진행 방식과 준비물은 예약 과정에서 안내합니다." },
  { question: "오프라인 레슨은 어느 지역에서 진행하나요?", answer: "희망 지역과 일정에 따라 협의합니다. 예약 신청 시 희망지역, 날짜, 시간을 남겨주시면 강사님 일정과 조율 후에 연락드립니다." },
  { question: "원하는 곡으로 안무 레슨을 받을 수 있나요?", answer: "네. 어떤 곡이든지 원하시는 수준의 안무를 레슨해드립니다. 단 난이도가 높을 경우 권장 수업의 횟수가 늘어날 수 있습니다." },
  { question: "질풍가도 완전정복 클래스에는 무엇이 포함되나요?", answer: "파트별 동작 강의와 0.3·0.5·0.7·1배속 완곡 연습을 포함한 총 10개 영상 (약 1시간 58분) 분량으로 구성되어 있습니다." },
  { question: "결제 후 언제부터 볼 수 있나요?", answer: "리틀리 결제는 결제 완료 후 바로 수강할 수 있습니다. 계좌이체 구매는 매일 한국시간 오전 10시와 오후 10시에 입금을 확인한 후 입력하신 Gmail 계정으로 Google Drive 이용 권한을 보내드립니다." },
  { question: "39,000원과 45,000원 상품은 강의 내용이 다른가요?", answer: "아닙니다. 제공되는 강의 내용은 동일합니다. 계좌이체 구매는 Google Drive로 제공되며 입금 확인 과정이 필요하고, 리틀리 구매는 카드·카카오페이·네이버페이 등의 간편결제가 가능하며 결제 완료 후 바로 수강할 수 있습니다." },
  { question: "클래스 이용 기간이 있나요?", answer: "계좌이체 또는 리틀리에서 결제하실 경우 별도의 시청 기한 없이 이용할 수 있습니다." },
  { question: "클래스 영상이나 링크를 팀원에게 공유해도 되나요?", answer: "아니요. 영상 파일과 Google Drive 링크는 구매자 본인만 이용할 수 있으며 공유·복제·재판매·재배포할 수 없습니다." },
  { question: "클래스 결제 후 환불할 수 있나요?", answer: "계좌이체 구매는 Google Drive 이용 권한 제공 전까지 환불을 요청할 수 있습니다. 리틀리 구매는 리틀리의 이용·환불 정책을 따르며, 자세한 내용은 각 결제 방식의 안내를 확인해주세요." },
  { question: "온/오프라인 레슨 결제 후 환불할 수 있나요?", answer: "약속시간 12시간 이전에 취소하시는 경우 환불해드립니다. 12시간 이후에 취소를 원하시는 경우 당일 수업은 취소하고 추후 다른 날짜로 다시 조정하여 수업을 진행합니다." },
  { question: "학교 축제나 기업 행사도 문의할 수 있나요?", answer: "네. 학교 축제, 체육대회, 기업 행사와 축하공연 등 목적과 일정, 인원을 알려주시면 가능한 진행 방식을 안내합니다.", cta: { href: "/contact", label: "학교 축제·기업 행사 문의하기" } },
];

export default function FaqPage() {
  return (
    <main className="content-page">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqItems.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} />
      <PageHero eyebrow="FAQ" title="자주 묻는 질문" description="레슨과 클래스 이용 전 궁금한 내용을 모았습니다. 필요한 답변을 찾지 못했다면 문의 페이지를 이용해주세요." breadcrumbs={[{ label: "FAQ" }]} />
      <section className="content-section content-section-white"><div className="content-narrow faq-list">{faqItems.map(({ question, answer, cta }) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p>{cta && <div className="faq-item-action"><Link className="content-button content-button-primary" href={cta.href}>{cta.label}</Link></div>}</details>)}</div></section>
      <ContentCta title="답변을 찾지 못하셨나요?" description="준비 중인 레슨이나 공연 상황을 알려주시면 확인 후 안내해드리겠습니다." primaryHref="/contact" primaryLabel="문의 방법 확인" secondaryHref="/vod-tutorial" secondaryLabel="질풍가도 완전정복 클래스" />
    </main>
  );
}
