import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { beginnerProgramConfig } from "@/lib/beginner-program";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { BeginnerProgram } from "./beginner-program";
import "./beginner.css";

const title = "Beginner 1기 · 8주 치어리딩 입문 과정";
const description = "치어리딩이 처음인 분도 기본 자세와 응원동작부터 실제 안무 한 곡 완성까지 함께하는 8주 고정 기수제 그룹 트레이닝입니다.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: "/beginner-1",
  keywords: ["치어리딩 입문", "치어리딩 초보", "치어리딩 그룹 수업", "사당 치어리딩", "Beginner 1기"],
});

export default function BeginnerProgramPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: `취미로운응원생활 ${beginnerProgramConfig.name}`,
        description,
        url: absoluteUrl("/beginner-1"),
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        offers: {
          "@type": "Offer",
          price: beginnerProgramConfig.price,
          priceCurrency: "KRW",
          availability: "https://schema.org/LimitedAvailability",
          url: absoluteUrl("/beginner-1"),
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          startDate: "2026-10-11",
          location: { "@type": "Place", name: beginnerProgramConfig.venue },
        },
      }} />
      <BeginnerProgram />
    </>
  );
}

