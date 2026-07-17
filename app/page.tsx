import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import CheerMeUpLifeMain from "./home-client";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export const metadata: Metadata = createMetadata({
  title: "치어리딩 레슨·공연·온라인 클래스",
  description:
    "치어리딩 입문 레슨부터 학교 축제와 결혼식 축하공연, 온라인 클래스까지. 처음이어도 즐겁게 배우는 취미로운응원생활입니다.",
  path: "/",
  keywords: [
    "치어리딩 레슨",
    "치어리딩 배우기",
    "학교 축제 치어리딩",
    "결혼식 축하공연",
    "온라인 치어리딩 클래스",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "취미로운응원생활 치어리딩 레슨 및 공연",
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          serviceType: "치어리딩 레슨, 온라인 클래스 및 축하공연",
          areaServed: "KR",
          url: absoluteUrl("/"),
        }}
      />
      <CheerMeUpLifeMain />
    </>
  );
}
