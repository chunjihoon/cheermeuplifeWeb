"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    void trackPageView(pathname);
  }, [pathname]);

  return null;
}
