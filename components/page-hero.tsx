import type { BreadcrumbItem } from "@/components/breadcrumbs";
import { Breadcrumbs } from "@/components/breadcrumbs";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
};

export function PageHero({ eyebrow, title, description, breadcrumbs }: PageHeroProps) {
  return (
    <header className="content-hero">
      <div className="content-container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <p className="content-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="content-hero-description">{description}</p>
      </div>
    </header>
  );
}
