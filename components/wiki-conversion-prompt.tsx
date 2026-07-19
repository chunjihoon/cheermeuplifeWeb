"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "wiki_conversion_prompt_seen_until";
const ENGAGEMENT_TIME_MS = 30_000;
const ARTICLE_PROGRESS = 0.8;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const PRODUCTION_HOSTNAME = new URL(siteConfig.url).hostname;

const trackPrompt = (eventName: string, params: Record<string, string | number>) => {
  void import("@/lib/analytics").then(({ track }) => track(eventName, params));
};

const isProductionDomain = () => {
  const hostname = window.location.hostname;
  return hostname === PRODUCTION_HOSTNAME || hostname === PRODUCTION_HOSTNAME.replace(/^www\./, "");
};

const getNextKoreanMidnight = () => {
  const shiftedNow = new Date(Date.now() + KST_OFFSET_MS);
  return Date.UTC(
    shiftedNow.getUTCFullYear(),
    shiftedNow.getUTCMonth(),
    shiftedNow.getUTCDate() + 1,
  ) - KST_OFFSET_MS;
};

const hasSeenPromptToday = () => {
  try {
    return Number(window.localStorage.getItem(STORAGE_KEY)) > Date.now();
  } catch {
    return false;
  }
};

const rememberPromptUntilMidnight = () => {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(getNextKoreanMidnight()));
  } catch {
    // 저장소를 사용할 수 없어도 팝업 자체는 정상적으로 동작합니다.
  }
};

type WikiConversionPromptProps = {
  slug: string;
  category: string;
};

export function WikiConversionPrompt({ slug, category }: WikiConversionPromptProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enforceDailyLimit = isProductionDomain();
    if (enforceDailyLimit && hasSeenPromptToday()) return;

    let hasStayedLongEnough = false;
    let hasReadEnough = false;
    let hasShown = false;

    const showWhenReady = () => {
      if (hasShown || !hasStayedLongEnough || !hasReadEnough || (enforceDailyLimit && hasSeenPromptToday())) return;
      hasShown = true;
      if (enforceDailyLimit) rememberPromptUntilMidnight();
      setVisible(true);
      trackPrompt("wiki_conversion_prompt_view", { slug, category, article_progress: 80 });
    };

    const checkArticleProgress = () => {
      const article = document.querySelector<HTMLElement>(".post-body");
      if (!article || article.offsetHeight === 0) return;
      const rect = article.getBoundingClientRect();
      const viewedHeight = window.innerHeight - rect.top;
      hasReadEnough = viewedHeight / rect.height >= ARTICLE_PROGRESS;
      showWhenReady();
    };

    const engagementTimer = window.setTimeout(() => {
      hasStayedLongEnough = true;
      checkArticleProgress();
    }, ENGAGEMENT_TIME_MS);

    window.addEventListener("scroll", checkArticleProgress, { passive: true });
    window.addEventListener("resize", checkArticleProgress);
    checkArticleProgress();

    return () => {
      window.clearTimeout(engagementTimer);
      window.removeEventListener("scroll", checkArticleProgress);
      window.removeEventListener("resize", checkArticleProgress);
    };
  }, [category, slug]);

  useEffect(() => {
    if (!visible) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    trackPrompt("wiki_conversion_prompt_dismiss", { slug, category });
  };

  return (
    <aside className="wiki-conversion-prompt" aria-label="레슨 및 클래스 안내">
      <button className="wiki-conversion-close" type="button" onClick={dismiss} aria-label="안내 닫기">×</button>
      <small>CHEER WITH US</small>
      <strong>레슨 예약을 고민 중이신가요?</strong>
      <p>혼자 연습하기 어렵거나 내 동작에 맞는 피드백이 필요하다면 현재 수준에 맞춰 안내해드립니다.</p>
      <div className="wiki-conversion-actions">
        <Link href="/?reserve=1" onClick={() => trackPrompt("wiki_conversion_lesson_click", { slug, category })}>레슨 예약하기</Link>
        <Link href="/vod-tutorial" onClick={() => trackPrompt("wiki_conversion_vod_click", { slug, category })}>질풍가도 클래스 보기</Link>
      </div>
      <button className="wiki-conversion-continue" type="button" onClick={dismiss}>계속 읽기</button>
    </aside>
  );
}
