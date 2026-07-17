import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import { JsonLd } from "@/components/json-ld";
import { SiteChrome } from "@/components/site-chrome";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";
import "./site.css";
import "./content-pages.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "취미로운응원생활 | 치어리딩 안무·응원가·레슨",
    template: "%s | 취미로운응원생활",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "취미로운응원생활 | 치어리딩 안무·응원가·레슨",
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: absoluteUrl(siteConfig.defaultOgImage), width: 600, height: 600, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "취미로운응원생활 | 치어리딩 안무·응원가·레슨",
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.defaultOgImage)],
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-50`}
      >
        <AnalyticsTracker />
        <JsonLd data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            inLanguage: "ko-KR",
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            email: siteConfig.email,
            logo: absoluteUrl(siteConfig.defaultOgImage),
            sameAs: [siteConfig.youtube],
          },
        ]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
