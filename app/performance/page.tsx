import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { PerformanceLanding } from "./performance-landing";

const title = "치어리딩 공연·행사 섭외";
const description = "학교축제, 체육대회, 기업행사, 지역축제 등 행사에 맞는 치어리딩 공연과 응원 퍼포먼스를 만나보세요.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path: "/performance",
  image: "/goyangCheerFestival2022.png",
  keywords: ["치어리딩 공연", "행사 섭외", "학교축제 공연", "체육대회 공연", "기업행사 공연"],
});

export default function PerformancePage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: title,
        description,
        url: absoluteUrl("/performance"),
        provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        areaServed: { "@type": "Country", name: "대한민국" },
        serviceType: "치어리딩 공연 및 응원 퍼포먼스",
      }} />
      <PerformanceLanding />
    </>
  );
}
