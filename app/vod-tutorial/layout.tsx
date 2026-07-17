import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = createMetadata({
  title: "질풍가도 치어리딩 전체 안무 VOD 튜토리얼",
  description:
    "파트별 동작 학습부터 배속별 완곡 연습까지 담은 질풍가도 치어리딩 전체 안무 튜토리얼입니다.",
  path: "/vod-tutorial",
  image: "/vod-hero-poster.jpg",
  keywords: [
    "질풍가도 치어리딩",
    "질풍가도 안무",
    "치어리딩 VOD",
    "학교 축제 안무",
    "치어리딩 튜토리얼",
  ],
});

export default function VodTutorialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={notoSansKr.variable}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "질풍가도 치어리딩 전체 안무 튜토리얼",
          description:
            "기본 동작과 파트별 안무, 속도별 반복 연습, 전체 연결 연습으로 구성된 질풍가도 치어리딩 VOD입니다.",
          image: absoluteUrl("/vod-hero-poster.jpg"),
          sku: "JFG-VOD-001",
          brand: {
            "@type": "Brand",
            name: siteConfig.name,
          },
          offers: {
            "@type": "Offer",
            url: absoluteUrl("/vod-tutorial"),
            priceCurrency: "KRW",
            price: "39000",
            availability: "https://schema.org/InStock",
          },
        }}
      />
      {children}
    </div>
  );
}
