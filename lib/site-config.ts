export const siteConfig = {
  name: "취미로운응원생활",
  shortName: "취미로운응원생활",
  description: "치어리딩 안무와 응원가 정보를 확인하고, 초보자부터 단체까지 레슨과 온라인 클래스로 배울 수 있는 응원문화 전문 플랫폼입니다.",
  url: "https://www.cheermeuplife.com",
  email: "guatemala3081@gmail.com",
  youtube: "https://www.youtube.com/@cheermeuplife",
  author: "취미로운응원생활",
  locale: "ko_KR",
  defaultOgImage: "/cheermeuplife_logo.png",
} as const;

export const siteNavigation = [
  { href: "/about", label: "소개" },
  { href: "/performance", label: "공연·행사" },
  { href: "/posts", label: "치어위키" },
  { href: "/vod-tutorial", label: "질풍가도 완전정복 클래스" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의" },
] as const;

export const footerNavigation = [
  { href: "/about", label: "취미로운응원생활 소개" },
  { href: "/performance", label: "공연·행사 섭외" },
  { href: "/posts", label: "치어위키" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/contact", label: "문의" },
  { href: "/faq", label: "FAQ" },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
