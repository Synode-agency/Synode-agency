"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { BoutonsAimantes } from "./boutons-aimantes";
import { PageSysteme } from "./page-systeme";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { site as siteFr } from "@/content/fr/common";
import { site as siteEn } from "@/content/en/common";
import { erreur as erreurFr } from "@/content/fr/erreur";
import { erreur as erreurEn } from "@/content/en/erreur";
import { renderLines } from "@/lib/lines";
import { homePath, type Locale } from "@/lib/routes";
import { SITE_THEME } from "@/lib/site-theme";

/**
 * LA PAGE D'ERREUR (maquette « A », choisie par Antonino le 28/11/2026),
 * affichée par `error.tsx` quand une page plante : la page entière est
 * remplacée, d'où la barre du haut et le pied de page refaits ici, comme
 * dans `Shell`.
 *
 * Un composant client (les pages d'erreur de Next le sont) : il ne lit que
 * `common.ts` et `erreur.ts` de chaque langue, jamais l'index des contenus,
 * qui tirerait tout le texte du site dans le JavaScript de chaque page.
 *
 * « Réessayer » appelle `retry` (Next 16) : la page est redemandée au
 * serveur et réaffichée si elle passe.
 */
export function ErreurPage({ locale, retry }: { locale: Locale; retry: () => void }) {
  const site = locale === "fr" ? siteFr : siteEn;
  const t = locale === "fr" ? erreurFr : erreurEn;

  return (
    <div className={`site-page site-theme-${SITE_THEME}`}>
      <title>{`${t.documentTitle} · Synode`}</title>
      <a href="#contenu" className="skip">
        {site.skip}
      </a>
      <SiteHeader locale={locale} copy={{ site }} />
      <BoutonsAimantes />
      <main id="contenu">
        <PageSysteme>
          <h1>{renderLines(t.title, t.accents, "title-accent")}</h1>
          <p className="page-systeme-texte">
            {t.text} <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <div className="btn-row page-systeme-actions">
            <button type="button" className="btn btn--primary" onClick={() => retry()}>
              <span className="btn-lib">
                <RotateCcw aria-hidden />
                {t.retry}
              </span>
            </button>
            <Link href={homePath(locale)} className="btn btn--ghost">
              <span className="btn-lib">{t.homeCta}</span>
            </Link>
          </div>
        </PageSysteme>
      </main>
      <SiteFooter locale={locale} site={site} />
    </div>
  );
}
