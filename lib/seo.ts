import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  image = siteConfig.defaultOgImage,
  type = "website",
  noIndex = false,
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: SeoOptions): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, alt: title }],
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
