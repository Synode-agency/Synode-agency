import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next blocks cross-origin requests to dev-only assets by default, so the
  // dev server reached from a phone over the LAN serves the HTML but refuses
  // the JS chunks. The page then renders with `.reveal` still at opacity 0,
  // i.e. almost blank. Allowing the local network origins fixes it.
  // Development only — this has no effect on a production build.
  allowedDevOrigins: ["192.168.129.14", "192.168.*.*", "10.*.*.*"],

  // Hides the floating Next badge while we review the design on real devices.
  // Compile and runtime errors are still surfaced.
  devIndicators: false,
};

export default nextConfig;
