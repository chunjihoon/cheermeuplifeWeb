import { posts, type Post } from "@/content/posts";

const isPublished = (post: Post, now = new Date()) => post.status === "published" && new Date(post.publishedAt) <= now;

export async function getPublishedPosts(now = new Date()) {
  return posts.filter((post) => isPublished(post, now)).sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function getPostBySlug(slug: string, now = new Date()) {
  return posts.find((post) => post.slug === slug && isPublished(post, now)) ?? null;
}

export async function getRelatedPosts(post: Post, now = new Date()) {
  const published = await getPublishedPosts(now);
  return post.relatedSlugs.map((slug) => published.find((item) => item.slug === slug)).filter((item): item is Post => Boolean(item));
}

export async function getAllPostSlugs() {
  return posts.map((post) => post.slug);
}
