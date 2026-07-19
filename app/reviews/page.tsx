import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { createMetadata } from "@/lib/seo";
import { ReviewsClient } from "./reviews-client";
import "./reviews.css";

export const metadata: Metadata = createMetadata({
  title: "치어리딩 레슨 후기",
  description: "취미로운응원생활 수강생의 치어리딩 레슨과 공연 준비 후기를 확인하세요.",
  path: "/reviews",
  keywords: ["치어리딩 레슨 후기", "치어리딩 수업 후기", "취미로운응원생활 후기"],
});

export default function ReviewsPage() {
  return (
    <main className="content-page reviews-page">
      <PageHero eyebrow="REVIEWS" title="수강생들의 생생한 후기" description="치어리딩을 처음 시작한 분부터 공연을 준비한 팀까지, 취미로운응원생활과 함께한 경험을 모았습니다." breadcrumbs={[{ label: "후기" }]} />
      <ReviewsClient />
    </main>
  );
}
