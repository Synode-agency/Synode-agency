"use client";

import type { CSSProperties } from "react";

/**
 * LE DERNIER FILET : la page affichée si le layout racine lui-même plante
 * (28/11/2026). Rarissime : les pages ont chacune leur `error.tsx`, et
 * celle-ci ne sert que si `SiteShell` ne peut plus s'afficher.
 *
 * Elle remplace tout le document, sans les feuilles de style ni les polices
 * du site (Next ne les charge pas ici) : elle ne dépend donc de rien, styles
 * écrits sur place et polices du système, pour s'afficher quoi qu'il
 * arrive. Le texte reprend celui de la page d'erreur (maquette « A »), en
 * français, avec une ligne en anglais : elle ne sait pas quelle langue
 * avait la page.
 */
const corps: CSSProperties = {
  margin: 0,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "48px 24px",
  boxSizing: "border-box",
  background: "#090f1f",
  color: "#ffffff",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  textAlign: "center",
};
const bouton: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 45,
  padding: "0 18px",
  borderRadius: 999,
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: 1,
  textDecoration: "none",
  cursor: "pointer",
  boxSizing: "border-box",
};

export default function GlobalError({ retry }: { error: unknown; retry: () => void }) {
  return (
    <html lang="fr">
      <body style={corps}>
        <title>Problème technique · Synode</title>
        <h1 style={{ margin: "0 auto", maxWidth: 900, fontSize: "clamp(2.25rem, 5vw, 4rem)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
          Un problème <em style={{ fontFamily: "Georgia, serif", fontWeight: 400, color: "#4a78c8" }}>technique</em> est survenu.
        </h1>
        <p style={{ margin: "28px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#b9c5d8" }}>
          La page n’a pas pu s’afficher. Réessayez dans un instant ; si le problème continue, écrivez-nous à{" "}
          <a href="mailto:contact@synode-agency.com" style={{ color: "#ffffff" }}>
            contact@synode-agency.com
          </a>
          .
        </p>
        <p lang="en" style={{ margin: "12px auto 0", maxWidth: 640, fontSize: 15, lineHeight: 1.6, color: "#a9b3c6" }}>
          A technical problem occurred. Please try again in a moment.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 40 }}>
          <button type="button" onClick={() => retry()} style={{ ...bouton, border: 0, background: "#325ca4", color: "#ffffff" }}>
            Réessayer
          </button>
          {/* Un lien simple, pas `next/link` : le routeur peut être celui qui a planté. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" style={{ ...bouton, border: "1px solid rgb(255 255 255 / 30%)", color: "#ffffff" }}>
            Revenir à l’accueil
          </a>
        </div>
      </body>
    </html>
  );
}
