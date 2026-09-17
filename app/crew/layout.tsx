import { Noto_Sans_KR } from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crew-sans",
});

export default function CrewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={notoSansKr.variable}>{children}</div>;
}
