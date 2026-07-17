"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { footerNavigation, siteConfig, siteNavigation } from "@/lib/site-config";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isOverlay = pathname === "/" || pathname === "/vod-tutorial";
  const isVod = pathname === "/vod-tutorial";

  return (
    <div className="site-shell">
      <header className={`site-header ${isOverlay ? "site-header-overlay" : "site-header-solid"} ${isVod ? "site-header-on-dark" : ""}`}>
        <div className="site-header-inner">
          <Link className="site-brand" href="/" aria-label="취미로운응원생활 홈">
            <Image src="/cheermeuplife_logo.png" alt="" width={42} height={42} priority={pathname === "/"} />
            <span>{siteConfig.name}</span>
          </Link>
          <button className="site-menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span className="sr-only">메뉴 {menuOpen ? "닫기" : "열기"}</span>
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
          <nav id="site-navigation" className={`site-navigation ${menuOpen ? "is-open" : ""}`} aria-label="주요 메뉴">
            {siteNavigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <Link className="site-footer-brand" href="/">{siteConfig.name}</Link>
            <p>치어리딩 안무·응원가 정보부터 레슨과 온라인 클래스까지, 응원문화를 취미롭게 만나는 공간입니다.</p>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <nav aria-label="푸터 메뉴">
            {footerNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <div className="site-footer-channel">
            <a href={siteConfig.youtube} target="_blank" rel="noreferrer">YouTube 채널</a>
            <small>© {new Date().getFullYear()} {siteConfig.name}</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
