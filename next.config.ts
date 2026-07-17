import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  // Next.js 15 uses the same .next directory for `next dev` and `next build`.
  // Keep development output separate so a production build cannot break HMR.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/posts/cheerleading-basic-cheer-moves-7",
        destination: "/posts/cheerleading-basic-moves",
        permanent: true,
      },
    ];
  },
});

export default nextConfig;
