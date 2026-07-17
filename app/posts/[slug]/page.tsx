import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCta } from "@/components/content-cta";
import { JsonLd } from "@/components/json-ld";
import { SharePrompt } from "@/components/share-prompt";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "../posts.css";

export const revalidate = 600;

export async function generateStaticParams() { return (await getAllPostSlugs()).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return createMetadata({ title: "게시글을 찾을 수 없습니다", description: "요청한 게시글이 없거나 아직 공개되지 않았습니다.", path: `/posts/${slug}`, noIndex: true });
  return createMetadata({ title: post.seoTitle, description: post.seoDescription, path: `/posts/${post.slug}`, image: post.coverImage.src, type: "article", publishedTime: post.publishedAt, modifiedTime: post.updatedAt, authors: [post.author], keywords: [post.category, ...post.tags] });
}

const formatDate = (date: string) => new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Seoul" }).format(new Date(date));

const youtubeEmbedUrl = (id: string, start?: number, end?: number) => {
  const params = new URLSearchParams();
  if (start !== undefined) params.set("start", String(start));
  if (end !== undefined) params.set("end", String(end));
  params.set("rel", "0");
  const query = params.toString();
  return `https://www.youtube-nocookie.com/embed/${id}${query ? `?${query}` : ""}`;
};

const renderInline = (text: string): ReactNode[] => text
  .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  .filter(Boolean)
  .map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return part;
  });

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post);
  return (
    <main className="posts-page">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.summary, image: [absoluteUrl(post.coverImage.src)], datePublished: post.publishedAt, dateModified: post.updatedAt, author: { "@type": "Organization", name: post.author, url: siteConfig.url }, publisher: { "@type": "Organization", name: siteConfig.name, logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.defaultOgImage) } }, mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`), articleSection: post.category, keywords: post.tags.join(", "), inLanguage: "ko-KR" }} />
      {post.video && <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", name: post.video.title, description: post.video.description, thumbnailUrl: `https://i.ytimg.com/vi/${post.video.id}/hqdefault.jpg`, embedUrl: youtubeEmbedUrl(post.video.id, post.video.start, post.video.end), contentUrl: `https://www.youtube.com/watch?v=${post.video.id}`, inLanguage: "ko-KR" }} />}
      <header className="post-detail-header"><div className="content-container"><Breadcrumbs items={[{ label: "치어위키", href: "/posts" }, ...(post.parentPost ? [{ label: post.parentPost.title, href: `/posts/${post.parentPost.slug}` }] : []), { label: post.title }]} /><div className="post-detail-meta"><span className="post-category">{post.category}</span><time dateTime={post.publishedAt}>발행 {formatDate(post.publishedAt)}</time>{post.updatedAt !== post.publishedAt && <time dateTime={post.updatedAt}>수정 {formatDate(post.updatedAt)}</time>}<span>작성자 {post.author}</span></div><h1>{post.title}</h1><p className="post-detail-summary">{post.summary}</p><div className="post-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></div></header>
      {post.showCoverImage !== false && <div className="post-cover"><Image src={post.coverImage.src} alt={post.coverImage.alt} fill priority sizes="(max-width: 1080px) calc(100vw - 28px), 1080px" /></div>}
      <div className="post-layout"><article className="post-body">{post.body.map((block, index) => {
        if (block.type === "heading") return <h2 id={block.id} key={index}>{renderInline(block.text)}</h2>;
        if (block.type === "subheading") return <h3 id={block.id} key={index}>{renderInline(block.text)}</h3>;
        if (block.type === "paragraph") return <p key={index}>{renderInline(block.text)}</p>;
        if (block.type === "list") return <ul key={index}>{block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}</ul>;
        if (block.type === "orderedList") return <ol key={index}>{block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}</ol>;
        if (block.type === "links") return <ul className="post-link-list" key={index}>{block.items.map((item) => <li key={item.href}><a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>{item.label} →</a></li>)}</ul>;
        if (block.type === "quote") return <blockquote key={index}>{renderInline(block.text)}</blockquote>;
        if (block.type === "image") return <figure className="post-body-image" key={index}><Image src={block.src} alt={block.alt} width={block.width} height={block.height} sizes="(max-width: 800px) calc(100vw - 28px), 760px" />{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
        if (block.type === "imagePlaceholder") return <div className="post-image-placeholder" role="note" key={index}><span>IMAGE PLACEHOLDER</span><strong>{block.label}</strong></div>;
        if (block.type === "moveCards") return <div className="basic-move-grid" key={index}>{block.items.map((item) => <article className="basic-move-card" key={`${item.order}-${item.title}`}>{item.imageLabel && <div className="basic-move-card-image" role="note">{item.imageLabel}</div>}<span>{String(item.order).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.summary}</p><small>{item.feature}</small><Link href={item.href}>자세히 배우기 →</Link></article>)}</div>;
        return <div className="post-youtube" key={index}><iframe src={youtubeEmbedUrl(block.id, block.start, block.end)} title={block.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
      })}{post.learningNavigation && <nav className="learning-navigation" aria-label="기본동작 학습 순서"><div>{post.learningNavigation.previous && <Link href={post.learningNavigation.previous.href}>← {post.learningNavigation.previous.label}</Link>}</div><Link className="learning-navigation-hub" href={post.learningNavigation.hub.href}>{post.learningNavigation.hub.label}</Link><div>{post.learningNavigation.next && <Link href={post.learningNavigation.next.href}>{post.learningNavigation.next.label} →</Link>}</div></nav>}</article><aside className="post-aside"><strong>취미로운응원생활</strong><p>치어리딩과 응원문화를 직접 배우고 즐길 수 있도록 정보를 정리합니다.</p><Link href="/#products">레슨 알아보기 →</Link><Link href="/vod-tutorial">질풍가도 VOD →</Link></aside></div>
      <SharePrompt
        variant="post"
        title="이 글이 도움이 되었다면 함께 나눠보세요"
        description="치어리딩을 함께 배우는 친구나 공연을 준비하는 팀원에게 이 글을 공유할 수 있습니다."
        buttonLabel="이 글 공유하기"
        shareTitle={post.title}
        shareText={post.summary}
        sharePath={`/posts/${post.slug}`}
        location="post_bottom"
      />
      <ContentCta title="직접 안무를 배워보고 싶나요?" description="현재 수준과 공연 목표에 맞는 레슨을 확인하거나 질풍가도 전체 안무 튜토리얼을 살펴보세요." primaryHref="/#products" primaryLabel="레슨 알아보기" secondaryHref="/vod-tutorial" secondaryLabel="질풍가도 VOD" />
      {related.length > 0 && <section className="related-posts"><div className="content-container"><h2>함께 읽으면 좋은 글</h2><div className="posts-grid">{related.map((item) => <article className="post-card" key={item.slug}><Link href={`/posts/${item.slug}`}><div className="post-card-image"><Image src={item.coverImage.src} alt={item.coverImage.alt} fill sizes="(max-width: 620px) calc(100vw - 28px), 33vw" /></div><div className="post-card-copy"><span className="post-category">{item.category}</span><h2>{item.title}</h2><p>{item.summary}</p></div></Link></article>)}</div></div></section>}
    </main>
  );
}
