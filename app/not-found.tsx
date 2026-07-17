import Link from "next/link";

export default function NotFound() {
  return (
    <main className="content-page">
      <section className="content-hero"><div className="content-container"><p className="content-eyebrow">404 · NOT FOUND</p><h1>요청한 페이지를 찾을 수 없습니다</h1><p className="content-hero-description">주소가 변경되었거나 아직 공개되지 않은 페이지입니다. 홈 또는 치어위키에서 필요한 내용을 찾아보세요.</p><div className="content-cta-actions" style={{ marginTop: 24 }}><Link className="content-button content-button-primary" href="/">홈으로 가기</Link><Link className="content-button content-button-secondary" href="/posts">치어위키 보기</Link></div></div></section>
    </main>
  );
}
