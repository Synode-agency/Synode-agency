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
  /* ---- LES EN-TÊTES DE SÉCURITÉ.

     Le site est statique et ne pose aucun cookie, donc l'exposition est
     faible — mais il porte un formulaire, et ces quatre en-têtes coûtent
     zéro à servir.

     `X-Frame-Options` empêche qu'on affiche le site dans une iframe pour en
     détourner les clics. `X-Content-Type-Options` interdit au navigateur de
     deviner un type de fichier autre que celui annoncé.
     `Referrer-Policy` ne laisse fuiter que le domaine vers les sites tiers,
     pas l'adresse complète de la page d'où l'on vient. `Permissions-Policy`
     renonce explicitement à la caméra, au micro et à la géolocalisation :
     rien ici n'en a besoin, et le dire ferme la porte à un script tiers.

     PAS de Content-Security-Policy ici : elle demande d'inventorier chaque
     source de script, de style et d'image, et une CSP écrite à l'aveugle
     casse le site en silence. C'est un chantier à mener une fois le
     calendrier et le formulaire branchés, quand on saura ce qui est
     réellement chargé. ---- */
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      ],
    }];
  },

  async redirects() {
    const pairs = [
      /* La famille « Assistants & Agents IA » s'appelle « Agents IA » depuis
         octobre 2026 : son ancienne adresse est indexée, elle doit mener à la
         nouvelle plutôt qu'à une 404. */
      ["/solutions/assistants-agents-ia", "/solutions/agents-ia"],
      /* La fiche du projet s'appelle « Nexus » depuis octobre 2026, et son
         adresse suit. L'ancienne est indexée : elle doit mener à la nouvelle
         plutôt qu'à une 404. */
      ["/realisations/synode-prospect", "/realisations/nexus"],
      ["/services", "/solutions"],
      ["/services/:slug", "/solutions"],
      ["/expertise", "/solutions"],
      ["/expertise/:slug", "/solutions"],
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
