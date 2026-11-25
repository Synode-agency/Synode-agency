import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NexusVisual } from "@/components/nexus-visual";
import { CooryDesktopMobile } from "@/components/illustrations";
import { CASES, ROUTES, getContent, path, type CaseCard, type CaseStatus, type Locale } from "@/content";
import styles from "./case-cards.module.css";

/* La pastille de chaque état, dans les couleurs du design system. */
const BADGE: Record<CaseStatus, string> = {
  live: "badge badge--live",
  beta: "badge badge--wip",
  demo: "badge badge--demo",
};

/* Le visuel de chaque réalisation : ses vrais écrans, animés, avec des
   données d'exemple. Une réalisation sans visuel garde une carte sans
   image plutôt qu'une image inventée. */
function visualFor(slug: string, locale: Locale): { node: ReactNode; stage: boolean } | null {
  if (slug === "nexus") return { node: <NexusVisual locale={locale} />, stage: false };
  if (slug === "coory") return { node: <CooryDesktopMobile />, stage: true };
  return null;
}

/**
 * LES CARTES DE RÉALISATIONS (brief, 5 : `CaseCard`).
 *
 * Une carte : le visuel, la pastille d'état (En production, Bêta, Démo), le
 * nom, une phrase, la mention éventuelle (« données fictives » pour Nexus)
 * et le lien vers la fiche. Les textes viennent de
 * `src/content/{fr,en}/cases/`.
 */
export function CaseCards({ locale, heading: Heading = "h3" }: { locale: Locale; heading?: "h2" | "h3" }) {
  const { site } = getContent(locale);
  return (
    <div className={styles.grid}>
      {CASES[locale].map((item: CaseCard) => {
        const href = `${path(locale, ROUTES.work)}/${item.slug}`;
        const visual = visualFor(item.slug, locale);
        const id = `case-${item.slug}`;
        return (
          <article key={item.slug} className={styles.card} aria-labelledby={id}>
            {visual && (
              <div className={visual.stage ? `${styles.visual} ${styles.visualStage}` : styles.visual}>
                {visual.node}
                <Link className={styles.visualLink} href={href} tabIndex={-1} aria-hidden="true" />
              </div>
            )}
            <div className={styles.content}>
              <span className={BADGE[item.status]}>{site.caseStatus[item.status]}</span>
              <Heading id={id} className={styles.title}>{item.name}</Heading>
              <p className={styles.summary}>{item.summary}</p>
              {item.note && <p className={styles.note}>{item.note}</p>}
            </div>
            <Link className={styles.linkFooter} href={href}>
              <span>{site.caseLink}</span>
              <ArrowUpRight aria-hidden />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

/**
 * LES RÉALISATIONS DE L'ACCUEIL (25/11/2026, demande d'Antonino), à la
 * place des cartes : le visuel de chaque produit à gauche, l'un sous
 * l'autre, et à droite son nom (en capitales très espacées) et sa phrase.
 * Ni pastille d'état, ni mention, ni « Découvrir le projet » : le nom et
 * le visuel mènent à la fiche. La page Réalisations garde les cartes
 * (`CaseCards`).
 */
export function CaseShowcase({ locale }: { locale: Locale }) {
  return (
    /* Au défilement, chaque projet arrive de son côté : celui de gauche par
       la gauche, celui de droite par la droite (`data-rv-groupe`, voir
       `scroll-reveal.tsx`). */
    <div className={styles.showcase} data-rv-groupe="">
      {CASES[locale].map((item: CaseCard) => {
        const href = `${path(locale, ROUTES.work)}/${item.slug}`;
        const visual = visualFor(item.slug, locale);
        const id = `vitrine-${item.slug}`;
        return (
          <article key={item.slug} className={styles.showRow} aria-labelledby={id}>
            {visual && (
              <div
                className={[styles.visual, visual.stage ? styles.visualStage : null, styles.showVisual]
                  .filter(Boolean)
                  .join(" ")}
              >
                {visual.node}
                <Link className={styles.visualLink} href={href} tabIndex={-1} aria-hidden="true" />
              </div>
            )}
            <div className={styles.showText}>
              <h3 id={id} className={styles.showName}>
                <Link href={href}>{item.name}</Link>
              </h3>
              <p className={styles.showSummary}>{item.summary}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
