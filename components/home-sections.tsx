"use client";

import Image from "next/image";
import Link from "next/link";
import type { Review } from "@/lib/getApprovedReviews";
import { siteConfig } from "@/lib/site-config";

export type HomePostPreview = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  coverImage: { src: string; alt: string };
};

export type HomeProduct = {
  name: string;
  audience: string;
  format: string;
  condition: string;
  price: string;
  features: string[];
  cta: string;
};

type TrackLink = (service: string, location: string, destination: string) => void;

export function HomeHero({ onReserve, onTrackLink }: { onReserve: () => void; onTrackLink: TrackLink }) {
  return (
    <section className="home-hero">
      <div className="home-container home-hero-grid">
        <Image className="home-hero-logo" src="/cheermeuplife_logo.png" alt="취미로운응원생활" width={600} height={600} priority sizes="(max-width: 760px) 70vw, 330px" />
        <div className="home-hero-copy">
          <p className="home-eyebrow">CHEERMEUPLIFE</p>
          <h1>치어리딩,<br /><span>처음이어도 신나게!</span></h1>
          <p>개인부터 학교·동아리·기업과 시니어까지, 목적과 경험에 맞춰 치어리딩을 배우고 공연을 준비할 수 있습니다.</p>
          <div className="home-actions">
            <button className="home-button home-button-primary" type="button" onClick={onReserve}>지금 바로 예약하기</button>
            <Link className="home-button home-button-secondary" href="/posts" onClick={() => onTrackLink("cheerwiki", "hero", "/posts")}>치어위키 둘러보기</Link>
          </div>
        </div>
      </div>
      <div className="home-slogan" aria-label="취미로운응원생활 특징"><span>왕초보도 차근차근</span><span>개인·학교·동아리·단체 모두 가능</span><span>공연 목적에 맞춘 실전 수업</span></div>
    </section>
  );
}

const serviceItems = [
  { key: "lesson", title: "치어리딩 레슨", description: "왕초보 개인부터 학교·동아리·단체까지 맞춤형으로 배워보세요.", label: "레슨 살펴보기", href: "#products" },
  { key: "cheerwiki", title: "치어위키", description: "치어리딩 기본 동작과 안무를 단계별 학습자료로 만나보세요.", label: "치어위키 보기", href: "/posts" },
  { key: "ultimate_class", title: "질풍가도 완전정복 클래스", description: "기본 동작부터 풀곡 안무까지 원하는 속도로 반복 학습하세요.", label: "클래스 자세히 보기", href: "/vod-tutorial" },
  { key: "group_inquiry", title: "공연 및 단체 문의", description: "학교·동아리·기업 행사와 결혼식 공연을 목적에 맞게 준비해드립니다.", label: "상담하기", href: "/contact" },
] as const;

export function HomeServiceHub({ onTrackLink }: { onTrackLink: TrackLink }) {
  return (
    <section className="home-section home-service-section" aria-labelledby="home-service-title">
      <div className="home-container">
        <div className="home-heading"><p className="home-eyebrow">START HERE</p><h2 id="home-service-title">원하는 서비스를 바로 찾아보세요</h2><p>배우기, 콘텐츠 탐색, 공연 준비 중 지금 필요한 항목을 선택할 수 있습니다.</p></div>
        <div className="home-service-grid">
          {serviceItems.map((item, index) => <article className="home-service-card" key={item.key}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p><Link href={item.href} onClick={() => onTrackLink(item.key, "service_hub", item.href)}>{item.label} →</Link></article>)}
        </div>
      </div>
    </section>
  );
}

export function HomeInstructorSummary({ onDetail }: { onDetail: () => void }) {
  return (
    <section className="home-section home-instructor-section" aria-labelledby="home-instructor-title">
      <div className="home-container home-instructor-grid">
        <div className="home-instructor-copy"><p className="home-eyebrow">ABOUT US</p><h2 id="home-instructor-title">처음 배우는 분도 신나게 따라올 수 있도록</h2><p>다양한 연령과 목적에 맞는 치어리딩 수업을 진행합니다. 동작의 원리부터 실제 무대 준비까지 현재 수준에 맞춰 함께합니다.</p><Link className="home-button home-button-dark" href="/about#instructors" onClick={onDetail}>강사진 자세히 보기</Link></div>
        <div className="home-instructor-cards">
          <article><Image src="/cheermeup_profile_June.png" alt="천지훈 치어리딩 강사" width={209} height={207} sizes="110px" /><div><h3>천지훈 강사</h3><p>전 연령 입문자와 공연 준비를 위한 맞춤형 지도</p></div></article>
          <article><Image src="/cheermeup_profile_Hong.jpeg" alt="홍수관 치어리딩 코치" width={219} height={185} sizes="110px" /><div><h3>홍수관 코치</h3><p>15년 실전 경험을 바탕으로 한 동작 원리와 완성도 지도</p></div></article>
        </div>
      </div>
    </section>
  );
}

export function HomeServiceProducts({ products, onSelect }: { products: HomeProduct[]; onSelect: (product: HomeProduct) => void }) {
  return (
    <section id="products" className="home-section home-products-section" aria-labelledby="home-products-title">
      <div className="home-container">
        <div className="home-heading"><p className="home-eyebrow">LESSONS & SERVICES</p><h2 id="home-products-title">레슨 및 서비스 안내</h2><p>인원, 장소와 준비 목적에 맞는 방식을 선택하세요. 구체적인 일정과 장소는 신청 후 협의합니다.</p></div>
        <div className="home-product-grid">
          {products.map((product) => <article className="home-product-card" key={product.name}><div className="home-product-head"><span>{product.audience}</span><h3>{product.name}</h3><strong>{product.price}</strong></div><dl><div><dt>진행 방식</dt><dd>{product.format}</dd></div><div><dt>기본 조건</dt><dd>{product.condition}</dd></div></dl><ul>{product.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><button className="home-button home-button-primary" type="button" onClick={() => onSelect(product)}>{product.cta}</button></article>)}
        </div>
      </div>
    </section>
  );
}

export function HomeFeaturedClass({ onDetail }: { onDetail: () => void }) {
  return (
    <section className="home-section home-featured-class" aria-labelledby="featured-class-title">
      <div className="home-container home-featured-grid">
        <Image src="/vod-hero-poster.jpg" alt="질풍가도 완전정복 클래스 강의 장면" width={1280} height={720} sizes="(max-width: 760px) calc(100vw - 28px), 50vw" />
        <div><p className="home-eyebrow">FEATURED CLASS</p><h2 id="featured-class-title">질풍가도 완전정복 클래스</h2><p>치어리딩이 처음이어도 기본 동작부터 구간별·배속별 연습까지 순서대로 따라가며 한 곡을 완성할 수 있습니다.</p><ul><li>총 9개 영상 · 약 1시간 58분</li><li>기본 동작부터 풀곡까지 단계별 구성</li><li>0.3·0.5·0.7·1배속 반복 연습</li><li>계좌이체 구매 시 기간 제한 없이 이용</li><li>구매자 대상 온라인 레슨 할인 혜택</li></ul><Link className="home-button home-button-light" href="/vod-tutorial" onClick={onDetail}>클래스 자세히 보기</Link></div>
      </div>
    </section>
  );
}

export function HomeCheerWiki({ posts, onTrackLink }: { posts: HomePostPreview[]; onTrackLink: TrackLink }) {
  return (
    <section className="home-section home-wiki-section" aria-labelledby="home-wiki-title">
      <div className="home-container">
        <div className="home-heading home-heading-row"><div><p className="home-eyebrow">CHEER WIKI</p><h2 id="home-wiki-title">단계별로 배우는 치어리딩</h2><p>기본 동작과 안무 연습에 필요한 추천 콘텐츠를 확인해보세요.</p></div><Link href="/posts" onClick={() => onTrackLink("cheerwiki", "cheerwiki_section", "/posts")}>치어위키 전체 보기 →</Link></div>
        <div className="home-wiki-grid">{posts.map((post) => <article className="home-wiki-card" key={post.slug}><Link href={`/posts/${post.slug}`} onClick={() => onTrackLink("cheerwiki_post", "cheerwiki_section", `/posts/${post.slug}`)}><div className="home-wiki-image"><Image src={post.coverImage.src} alt={post.coverImage.alt} fill sizes="(max-width: 620px) calc(100vw - 28px), (max-width: 960px) 50vw, 25vw" /></div><div><span>{post.category}</span><h3>{post.title}</h3><p>{post.summary}</p></div></Link></article>)}</div>
      </div>
    </section>
  );
}

const videos = [
  { id: "rmNImGLrTfQ", title: "질풍가도 치어리딩 안무", shape: "wide" },
  { id: "uPlCSt3_qZg", title: "결혼식 치어리딩 축하공연", shape: "wide" },
  { id: "XO2v-MJIjk8", title: "취미로운응원생활 치어리딩 Shorts 1", shape: "short" },
  { id: "FWjtQd5bAJA", title: "취미로운응원생활 치어리딩 Shorts 2", shape: "short" },
] as const;

export function HomeVideos({ onTrackLink }: { onTrackLink: TrackLink }) {
  return (
    <section className="home-section home-videos-section" aria-labelledby="home-videos-title"><div className="home-container"><div className="home-heading home-heading-row"><div><p className="home-eyebrow">WATCH US</p><h2 id="home-videos-title">영상으로 만나는 취미로운응원생활</h2><p>레슨과 공연의 분위기를 대표 영상으로 확인해보세요.</p></div><a href={siteConfig.youtube} target="_blank" rel="noreferrer" onClick={() => onTrackLink("youtube", "video_section", siteConfig.youtube)}>유튜브에서 더 보기 →</a></div><div className="home-video-grid">{videos.map((video) => <div className={`home-video home-video-${video.shape}`} key={video.id}><iframe src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>)}</div></div></section>
  );
}

const maskName = (name: string) => name.length < 2 ? `${name}*` : `${name[0]}*${name[name.length - 1]}`;

export function HomeReviewPreview({ imageReviews, reviews, onImage, onMore }: { imageReviews: string[]; reviews: Review[]; onImage: (src: string, index: number) => void; onMore: () => void }) {
  return (
    <section className="home-section home-reviews-section" aria-labelledby="home-reviews-title"><div className="home-container"><div className="home-heading home-heading-row"><div><p className="home-eyebrow">REVIEWS</p><h2 id="home-reviews-title">수강생들의 생생한 후기</h2><p>처음 시작한 수강생과 공연을 준비한 팀의 이야기를 만나보세요.</p></div><Link href="/reviews" onClick={onMore}>후기 전체 보기 →</Link></div><div className="home-review-grid">{imageReviews.slice(0, 3).map((src, index) => <button className="home-review-image" type="button" key={src} onClick={() => onImage(src, index)} aria-label={`수강생 후기 이미지 ${index + 1} 크게 보기`}><Image src={src} alt={`수강생 후기 ${index + 1}`} width={600} height={600} sizes="(max-width: 620px) calc(100vw - 28px), 33vw" /></button>)}{reviews.slice(0, 3).map((review) => <article className="home-review-card" key={review.id}><span>★</span><h3>{maskName(review.name)} · {review.count}회 수강</h3><small>{review.date} · {review.teacher || "천지훈 선생님"}</small><p>{review.content}</p></article>)}</div></div></section>
  );
}

export function HomeFinalCta({ onReserve }: { onReserve: () => void }) {
  return <section className="home-final-cta" aria-labelledby="home-final-title"><div><p className="home-eyebrow">READY TO CHEER?</p><h2 id="home-final-title">나에게 맞는 치어리딩을 시작해보세요</h2><p>현재 경험과 목표를 알려주시면 가능한 수업과 준비 방법을 안내합니다.</p></div><button className="home-button home-button-light" type="button" onClick={onReserve}>지금 바로 예약하기</button></section>;
}
