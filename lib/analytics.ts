// /lib/analytics.ts
"use client";

import { logEvent } from "firebase/analytics";
import { analyticsPromise } from "@/lib/firebase";

type Params = Record<string, string | number | boolean | null | undefined>;

export async function track(eventName: string, params?: Params) {
  const analytics = await analyticsPromise;
  if (!analytics) return;
  logEvent(analytics, eventName, params);
}
