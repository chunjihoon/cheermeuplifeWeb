"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { getApprovedReviews, type Review } from "@/lib/getApprovedReviews";

const reviewImages = Array.from({ length: 9 }, (_, index) => `/cheermeuplife_review_${index + 1}.png`);
const maskName = (name: string) => name.length < 2 ? `${name}*` : `${name[0]}*${name[name.length - 1]}`;

export function ReviewsClient() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getApprovedReviews()
      .then((items) => { if (active) setReviews(items); })
      .catch(() => { if (active) setReviews([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedImage) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedImage(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [selectedImage]);

  const sortedReviews = useMemo(() => [...reviews].sort((a, b) => b.date.localeCompare(a.date)), [reviews]);

  return (
    <>
      <section className="reviews-section reviews-section-images" aria-labelledby="review-image-title"><div className="reviews-container"><div className="reviews-heading"><p>PHOTO REVIEWS</p><h2 id="review-image-title">수강생이 직접 전해주신 후기</h2></div><div className="reviews-image-grid">{reviewImages.map((src, index) => <button type="button" key={src} onClick={() => { setSelectedImage(src); void track("review_image_click", { index: index + 1, src, location: "reviews_page" }); }} aria-label={`수강생 후기 이미지 ${index + 1} 크게 보기`}><Image src={src} alt={`취미로운응원생활 수강생 후기 ${index + 1}`} width={600} height={600} sizes="(max-width: 620px) 50vw, 33vw" /></button>)}</div></div></section>

      <section className="reviews-section reviews-section-live" aria-labelledby="approved-review-title"><div className="reviews-container"><div className="reviews-heading"><p>APPROVED REVIEWS</p><h2 id="approved-review-title">승인된 레슨 후기</h2></div>{loading ? <p className="reviews-status">후기를 불러오고 있습니다.</p> : sortedReviews.length ? <div className="reviews-card-grid">{sortedReviews.map((review) => <article className="reviews-card" key={review.id}><span>★</span><h3>{maskName(review.name)} · {review.count}회 수강</h3><small>{review.date} · {review.teacher || "천지훈 선생님"}</small>{review.song && <strong>레슨곡 · {review.song}</strong>}<p>{review.content}</p></article>)}</div> : <p className="reviews-status">표시할 승인 후기가 아직 없습니다.</p>}</div></section>

      <section className="reviews-write"><div><h2>수업은 어떠셨나요?</h2><p>남겨주신 후기는 확인 후 이 페이지에 게시됩니다.</p></div><Link href="/reviewNewPage">후기 작성하기</Link></section>

      {selectedImage && <div className="reviews-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedImage(null); }}><section className="reviews-dialog" role="dialog" aria-modal="true" aria-label="수강생 후기 이미지"><Image src={selectedImage} alt="확대된 수강생 후기" width={1200} height={1600} /><button type="button" onClick={() => setSelectedImage(null)} aria-label="후기 이미지 닫기">×</button></section></div>}
    </>
  );
}
