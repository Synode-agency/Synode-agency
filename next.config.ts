import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Ne pas annoncer la technologie du site dans chaque réponse HTTP. */
  poweredByHeader: false,
  // Next blocks cross-origin requests to dev-only assets by default, so the
  // dev server reached from a phone over the LAN serves the HTML but refuses
  // the JS chunks. The page then renders with `.reveal` still at opacity 0,
  // i.e. almost blank. Allowing the local network origins fixes it.
  // Development only — this has no effect on a production build.
  allowedDevOrigins: ["192.168.129.14", "192.168.*.*", "10.*.*.*"],

  // Hides the floating Next badge while we review the design on real devices.
  // Compile and runtime errors are still surfaced.
  devIndicators: false,

  /* LES PAGES RÉSERVÉES AU DÉVELOPPEMENT (24/11/2026). Un fichier de route
     nommé `page.dev.tsx` n'est une page qu'avec `npm run dev` : en
     production, Next ne reconnaît que les extensions par défaut, il ne
     construit donc pas la page et son adresse donne une 404. C'est le cas
     du design system, outil de l'équipe qui n'a rien à faire sur le site. */
  pageExtensions: process.env.NODE_ENV === "production" ? ["tsx", "ts", "jsx", "js"] : ["dev.tsx", "tsx", "ts", "jsx", "js"],

  /* La 404 des adresses qui ne correspondent à aucune route. Avec deux
     layouts racine, `(fr)` et `(en)`, Next n'a pas de layout où la
     composer et sert sa page brute : voir `src/app/global-not-found.tsx`. */
  experimental: {
    globalNotFound: true,
  },

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

     Une Content-Security-Policy MINIMALE depuis le 23/11/2026 (constat K15
     de l'audit) : elle ne restreint AUCUNE source de script, de style,
     d'image ni de cadre (le calendrier Cal.com continue de se charger),
     elle interdit seulement qu'une autre page affiche le site dans un
     cadre, qu'on change l'adresse de base des liens, qu'un formulaire
     envoie ailleurs que sur le site, et les plugins. Une CSP complète,
     source par source, reste à écrire : écrite à l'aveugle, elle casse le
     site en silence.

     ⚠ Ces en-têtes ne couvrent que les PAGES. Chez Netlify, les images de
     `public/` et les fichiers de `/_next/static` partent du CDN sans
     passer par Next : leurs en-têtes sont dans `netlify.toml`. ---- */
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
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
