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
    /* LES APERÇUS NE SONT PAS INDEXÉS (24/11/2026). Netlify indique le
       contexte du build dans `CONTEXT` : « production » pour le site en
       ligne, « branch-deploy » ou « deploy-preview » pour un aperçu
       (refonte-simple--synode-agency.netlify.app…). Un aperçu ne doit pas
       entrer dans Google à côté du vrai site. En local, `CONTEXT` n'existe
       pas : rien ne change. */
    const preview = Boolean(process.env.CONTEXT) && process.env.CONTEXT !== "production";
    return [{
      source: "/:path*",
      headers: [
        ...(preview ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
      ],
    }];
  },

  /* ---- LES REDIRECTIONS PERMANENTES (refonte du 24/11/2026, brief 4.4).

     Le site est passé de 17 pages par langue à 5. Chaque ancienne adresse,
     indexée ou citée ailleurs, mène à la page qui a repris son contenu, et
     les six anciennes offres à l'ancre de leur service. Les adresses
     anglaises ont été traduites (`/en/work`, `/en/about`…) : les anciennes
     y mènent aussi.

     L'ordre compte : une adresse précise avant le motif qui la couvrirait
     (`/en/realisations/synode-prospect` avant `/en/realisations/:slug`).

     À garder même quand plus personne ne se souvient de ces adresses : un
     lien externe, lui, s'en souviendra. ---- */
  async redirects() {
    const FR: [string, string][] = [
      ["/solutions", "/services"],
      ["/solutions/integrations-systemes-connectes", "/services#connecter"],
      ["/solutions/automatisations-intelligentes", "/services#connecter"],
      ["/solutions/agents-ia", "/services#ia"],
      ["/solutions/assistants-agents-ia", "/services#ia"],
      ["/solutions/logiciels-applications-ia", "/services#logiciel"],
      ["/solutions/data-intelligence", "/services#logiciel"],
      ["/solutions/formation-adoption-ia", "/services#inclus"],
      ["/solutions/:slug", "/services"],
      ["/cas-usage", "/services"],
      ["/services/:slug", "/services"],
      ["/expertise", "/services"],
      ["/expertise/:slug", "/services"],
      ["/faq", "/services"],
      ["/equipe", "/a-propos"],
      ["/methode", "/a-propos"],
      ["/realisations/synode-prospect", "/realisations/nexus"],
      ["/legal/mentions-legales", "/mentions-legales"],
      ["/legal/confidentialite", "/confidentialite"],
      ["/legal/:slug", "/mentions-legales"],
    ];
    const EN: [string, string][] = [
      ["/en/solutions", "/en/services"],
      ["/en/solutions/integrations-systemes-connectes", "/en/services#connect"],
      ["/en/solutions/automatisations-intelligentes", "/en/services#connect"],
      ["/en/solutions/agents-ia", "/en/services#ai"],
      ["/en/solutions/assistants-agents-ia", "/en/services#ai"],
      ["/en/solutions/logiciels-applications-ia", "/en/services#software"],
      ["/en/solutions/data-intelligence", "/en/services#software"],
      ["/en/solutions/formation-adoption-ia", "/en/services#included"],
      ["/en/solutions/:slug", "/en/services"],
      ["/en/cas-usage", "/en/services"],
      ["/en/services/:slug", "/en/services"],
      ["/en/expertise", "/en/services"],
      ["/en/expertise/:slug", "/en/services"],
      ["/en/faq", "/en/services"],
      ["/en/realisations", "/en/work"],
      ["/en/realisations/synode-prospect", "/en/work/nexus"],
      ["/en/realisations/:slug", "/en/work/:slug"],
      ["/en/equipe", "/en/about"],
      ["/en/a-propos", "/en/about"],
      ["/en/methode", "/en/about"],
      ["/en/mentions-legales", "/en/legal-notice"],
      ["/en/confidentialite", "/en/privacy"],
      ["/en/merci", "/en/thanks"],
      ["/en/legal/mentions-legales", "/en/legal-notice"],
      ["/en/legal/confidentialite", "/en/privacy"],
      ["/en/legal/:slug", "/en/legal-notice"],
    ];
    return [...FR, ...EN].map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
