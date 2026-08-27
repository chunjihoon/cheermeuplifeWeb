import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site-config";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedPosts = await getPublishedPosts();
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: new Date("2026-07-15"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/vod-tutorial"), lastModified: new Date("2026-07-15"), changeFrequency: "monthly", priority: .9 },
    { url: absoluteUrl("/performance"), lastModified: new Date("2026-08-26"), changeFrequency: "monthly", priority: .9 },
    { url: absoluteUrl("/about"), lastModified: new Date("2026-07-15"), changeFrequency: "monthly", priority: .7 },
    { url: absoluteUrl("/posts"), lastModified: new Date("2026-07-15"), changeFrequency: "weekly", priority: .9 },
    { url: absoluteUrl("/faq"), lastModified: new Date("2026-07-15"), changeFrequency: "monthly", priority: .6 },
    { url: absoluteUrl("/contact"), lastModified: new Date("2026-07-15"), changeFrequency: "monthly", priority: .5 },
    { url: absoluteUrl("/privacy"), lastModified: new Date("2026-07-15"), changeFrequency: "yearly", priority: .3 },
    { url: absoluteUrl("/terms"), lastModified: new Date("2026-07-15"), changeFrequency: "yearly", priority: .3 },
  ];
  return [...staticPages, ...publishedPosts.map((post) => ({ url: absoluteUrl(`/posts/${post.slug}`), lastModified: new Date(post.updatedAt), changeFrequency: "monthly" as const, priority: .75 }))];
}
