import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { getPublishedPosts } from "@/lib/posts";
import { createMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site-config";
import "./posts.css";

export const revalidate = 600;
export const metadata: Metadata = createMetadata({ title: "치어위키 · 치어리딩 응원문화 정보", description: "치어위키에서 치어리딩 기본동작과 안무, 응원가, 학교 축제와 체육대회 공연 준비에 필요한 정보를 확인하세요.", path: "/posts", keywords: ["치어위키", "치어리딩", "응원단", "응원가", "치어리딩 안무", "학교 축제 공연"] });

const formatDate = (date: string) => new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Seoul" }).format(new Date(date));

export default async function PostsPage() {
  const publishedPosts = await getPublishedPosts();
  return (
    <main className="posts-page">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "치어위키", description: "치어리딩과 응원문화에 필요한 기본동작, 안무, 응원가와 공연 준비 정보를 정리한 지식 공간", url: absoluteUrl("/posts"), hasPart: publishedPosts.map((post) => ({ "@type": "BlogPosting", headline: post.title, url: absoluteUrl(`/posts/${post.slug}`) })) }} />
      <PageHero eyebrow="CHEER WIKI" title="치어위키" description="치어리딩 기본동작부터 안무 연습, 응원가와 학교 행사 준비까지 흩어져 있던 응원 지식을 하나씩 정리합니다." breadcrumbs={[{ label: "치어위키" }]} />
      <section className="content-section content-section-white"><div className="content-container"><div className="posts-toolbar"><p>현재 {publishedPosts.length}개의 글이 있습니다.</p></div><div className="posts-grid">{publishedPosts.map((post) => <article className="post-card" key={post.slug}><Link href={`/posts/${post.slug}`}><div className="post-card-image"><Image src={post.coverImage.src} alt={post.coverImage.alt} fill sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 900px) 50vw, 33vw" /></div><div className="post-card-copy"><div className="post-card-meta"><span className="post-category">{post.category}</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div><h2>{post.title}</h2><p>{post.summary}</p><div className="post-tags">{post.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div></div></Link></article>)}</div></div></section>
    </main>
  );
}
