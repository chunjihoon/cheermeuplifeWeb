import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site-config";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ label: "홈", href: "/" }, ...items];
  return (
    <>
      <nav className="site-breadcrumbs" aria-label="현재 위치">
        <ol>
          {allItems.map((item, index) => (
            <li key={`${item.label}-${index}`}>
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: allItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: item.href ? absoluteUrl(item.href) : undefined,
        })),
      }} />
    </>
  );
}
