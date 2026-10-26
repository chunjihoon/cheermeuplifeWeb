import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/one-day-class/admin"] },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  };
}
