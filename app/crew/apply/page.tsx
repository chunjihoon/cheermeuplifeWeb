import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { CrewApplicationForm } from "./crew-application-form";
import "./apply.css";

export const metadata: Metadata = createMetadata({
  title: "취미로운 응원 크루 지원하기",
  description: "취미로운 응원 크루 지원서를 작성하고 제출할 수 있습니다.",
  path: "/crew/apply",
  noIndex: true,
});

export default function CrewApplicationPage() {
  return <CrewApplicationForm />;
}
