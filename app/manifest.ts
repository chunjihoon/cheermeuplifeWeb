import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "취미로운응원생활",
    short_name: "취미로운응원생활",
    description: "치어리딩 안무와 응원가 정보, 레슨과 온라인 VOD를 제공하는 응원문화 플랫폼",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ed",
    theme_color: "#ec4899",
    lang: "ko-KR",
    icons: [
      {
        src: "/cheermeuplife_logo.jpg",
        sizes: "600x600",
        type: "image/jpeg",
      },
    ],
  };
}
