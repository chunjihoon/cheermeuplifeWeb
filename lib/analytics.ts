// /lib/analytics.ts
"use client";

import { logEvent } from "firebase/analytics";
import { analyticsPromise } from "@/lib/firebase";

type Params = Record<string, string | number | boolean | null | undefined>;

export async function track(eventName: string, params?: Params) {
  try {
    const analytics = await analyticsPromise;
    if (!analytics) return;
    logEvent(analytics, eventName, params);
  } catch {
    // 분석 실패가 사용자 기능을 막지 않도록 처리합니다.
  }
}

export function trackPageView(pathname: string) {
  if (typeof window === "undefined") return Promise.resolve();
  return track("page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: `${pathname}${window.location.search}`,
  });
}
