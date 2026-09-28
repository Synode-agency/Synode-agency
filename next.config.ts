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

  /* Le site a changé d'architecture. Ces redirections permanentes évitent
     qu'un lien ancien, externe ou indexé, tombe sur une 404. Elles couvrent
     les deux langues et n'ont aucun coût tant qu'elles ne servent pas.

     À garder même quand plus personne ne se souvient de ces adresses : un
     lien externe, lui, s'en souviendra. */
  async redirects() {
    const pairs = [
      ["/services", "/solutions"],
      ["/services/:slug", "/cas-usage"],
      ["/expertise", "/solutions"],
      ["/expertise/:slug", "/cas-usage"],
      ["/solutions/:slug", "/solutions"],
      ["/a-propos", "/equipe"],
      ["/faq", "/solutions"],
      ["/legal/mentions-legales", "/mentions-legales"],
      ["/legal/confidentialite", "/confidentialite"],
      ["/legal/:slug", "/mentions-legales"],
    ];
    return pairs.flatMap(([source, destination]) => [
      { source, destination, permanent: true },
      { source: `/en${source}`, destination: `/en${destination}`, permanent: true },
    ]);
  },
};

export default nextConfig;
