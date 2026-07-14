import type { Metadata } from "next";
import { Black_Han_Sans, Jua, Noto_Sans_KR } from "next/font/google";

const blackHanSans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-black-han",
});

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jua",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "질풍가도 치어리딩 VOD | 취미로운응원생활",
  description:
    "파트별 동작 학습부터 배속별 완곡 연습까지 담은 질풍가도 치어리딩 전체 안무 튜토리얼입니다.",
};

export default function VodTutorialLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${blackHanSans.variable} ${jua.variable} ${notoSansKr.variable}`}
    >
      {children}
    </div>
  );
}
