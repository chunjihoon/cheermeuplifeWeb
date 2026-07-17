"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

type SharePromptProps = {
  eyebrow?: string;
  title: string;
  description: string;
  buttonLabel: string;
  shareTitle: string;
  shareText: string;
  sharePath: string;
  location: string;
  variant?: "default" | "home" | "vod" | "post";
};

async function trackShare(location: string) {
  const { track } = await import("@/lib/analytics");
  track("share_click", { location, method: "native" });
}

export function SharePrompt({
  eyebrow = "SHARE THE CHEER",
  title,
  description,
  buttonLabel,
  shareTitle,
  shareText,
  sharePath,
  location,
  variant = "default",
}: SharePromptProps) {
  const [feedback, setFeedback] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const showFeedback = (message: string) => {
    setFeedback(message);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setFeedback(""), 2400);
  };

  const handleShare = async () => {
    if (!navigator.share) {
      showFeedback("모바일 HTTPS 환경에서 공유할 수 있습니다");
      return;
    }

    const url = new URL(sharePath, siteConfig.url).toString();
    try {
      await navigator.share({ title: shareTitle, text: shareText, url });
      void trackShare(location);
      showFeedback("공유가 완료되었습니다");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      showFeedback("공유창을 열지 못했습니다");
    }
  };

  return (
    <aside className={`share-prompt share-prompt-${variant}`}>
      <div className="share-prompt-copy">
        <p className="share-prompt-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="share-prompt-action">
        <button type="button" className="share-prompt-button" onClick={handleShare}>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.7 6.8-4.1M8.6 13.3l6.8 4.1" />
          </svg>
          {buttonLabel}
        </button>
        <span className="share-prompt-feedback" role="status" aria-live="polite">{feedback}</span>
      </div>
    </aside>
  );
}
