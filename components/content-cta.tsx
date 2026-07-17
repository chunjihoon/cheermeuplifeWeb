import Link from "next/link";

export function ContentCta({
  title,
  description,
  primaryHref = "/#products",
  primaryLabel = "레슨 알아보기",
  secondaryHref = "/posts",
  secondaryLabel = "치어위키 보기",
}: {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <aside className="content-cta">
      <div><h2>{title}</h2><p>{description}</p></div>
      <div className="content-cta-actions">
        <Link className="content-button content-button-primary" href={primaryHref}>{primaryLabel}</Link>
        <Link className="content-button content-button-secondary" href={secondaryHref}>{secondaryLabel}</Link>
      </div>
    </aside>
  );
}
