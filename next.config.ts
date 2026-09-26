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

  /* Le repositionnement déplace deux familles d'URL. `/services` devient
     `/solutions`, et les seize prestations descendent sous `/expertise`.
     Ces redirections sont permanentes (308), donc un moteur de recherche
     transfère ce qui était acquis sur l'ancienne adresse au lieu de la
     traiter comme disparue. Elles couvrent les deux langues.

     À garder même quand plus personne ne se souvient de `/services` : un
     lien externe, lui, s'en souviendra. */
  async redirects() {
    return [
      { source: "/services", destination: "/solutions", permanent: true },
      { source: "/services/:slug", destination: "/expertise/:slug", permanent: true },
      { source: "/en/services", destination: "/en/solutions", permanent: true },
      { source: "/en/services/:slug", destination: "/en/expertise/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
