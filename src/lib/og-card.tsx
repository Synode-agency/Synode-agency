import type { ReactElement } from "react";

/**
 * L'IMAGE DE PARTAGE, DESSINÉE AU BUILD.
 *
 * C'est ce qui s'affiche quand on colle un lien du site dans LinkedIn,
 * WhatsApp, Slack ou un message. Sans elle, le lien sort nu : un titre, une
 * adresse, et un grand vide à la place de l'aperçu.
 *
 * Elle est dessinée par `next/og`, qui fait partie de Next : rien à
 * installer, aucune image à maintenir dans `public/`, et le texte reste du
 * texte dans le code plutôt que d'être figé dans un fichier qu'il faudrait
 * rouvrir dans un éditeur à chaque changement de baseline.
 *
 * ── Trois contraintes du moteur, à connaître avant d'y toucher ───────────
 * 1. Aucune cascade CSS, aucune classe, aucune variable : chaque style est
 *    écrit en ligne sur son élément. Les propriétés disponibles sont celles
 *    de Satori, un sous-ensemble de CSS.
 * 2. Tout bloc qui contient plusieurs enfants doit déclarer son `display`.
 * 3. La police est celle du moteur, pas celle du site : Helvetica Neue est
 *    une police système, elle n'existe pas dans l'environnement de build. Le
 *    dessin ne repose donc sur aucun détail typographique fin.
 * ────────────────────────────────────────────────────────────────────────
 *
 * 1200 × 630 est le format attendu par les aperçus de LinkedIn, Facebook,
 * X, Slack et WhatsApp. En dessous de 1200 de large, LinkedIn rétrograde
 * l'aperçu en vignette carrée.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const COPY = {
  fr: {
    kicker: "AGENCE IA · BRUXELLES",
    title: "Solutions IA sur mesure",
    text: "Agents IA, automatisations, logiciels métier et intégrations, conçus autour de vos outils et de vos données.",
    foot: "synode-agency.com",
    alt: "Synode, agence IA à Bruxelles : solutions IA sur mesure",
  },
  en: {
    kicker: "AI AGENCY · BRUSSELS",
    title: "Custom AI solutions",
    text: "AI agents, automations, business software and integrations, built around your tools and your data.",
    foot: "synode-agency.com",
    alt: "Synode, AI agency in Brussels: custom AI solutions",
  },
} as const;

export const ogAlt = (locale: "fr" | "en") => COPY[locale].alt;

/** Le dessin : fond bleu nuit, un filet, la marque, le titre, une ligne. */
export function ogCard(locale: "fr" | "en", mark?: string): ReactElement {
  const c = COPY[locale];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0f1d33",
        /* Le filet intérieur, à la place d'un dégradé : c'est la grammaire du
           site, des aplats et des traits d'un pixel. */
        border: "1px solid #24406a",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* Le vrai pictogramme du site, lu sur le disque et passé en
            `data:` par la route : Satori ne va pas chercher une image sur le
            réseau pendant le build. Sans lui, un carré bleu de la même
            couleur tient la place, et la marque reste lisible. */}
        {/* `next/image` n'existe pas dans ce moteur : il rend du HTML hors
            navigateur, sans runtime React ni optimisation d'image. La règle
            de lint vise les pages, pas ce dessin. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {mark ? <img src={mark} width={48} height={48} alt="" style={{ objectFit: "contain" }} />
          : <div style={{ display: "flex", width: 44, height: 44, borderRadius: 12, background: "#0a6cf0" }} />}
        <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: "#ffffff", letterSpacing: -0.5 }}>
          Synode
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#8ec1ff" }}>{c.kicker}</div>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            fontSize: 82,
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: -2,
            color: "#ffffff",
          }}
        >
          {c.title}
        </div>
        <div style={{ display: "flex", maxWidth: 820, fontSize: 28, lineHeight: 1.45, color: "#b6c2d4" }}>
          {c.text}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: "1px solid #24406a",
          fontSize: 24,
          color: "#8fa0b8",
        }}
      >
        <div style={{ display: "flex" }}>{c.foot}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#34d399" }} />
          <div style={{ display: "flex" }}>{locale === "fr" ? "Belgique" : "Belgium"}</div>
        </div>
      </div>
    </div>
  );
}
