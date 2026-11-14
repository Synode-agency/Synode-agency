"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NexusVisual } from "@/components/nexus-visual";
import { CooryDesktopMobile } from "@/components/illustrations";
import { ROUTES, path, type Locale } from "@/lib/content";
import { cooryCardCopy, findWork, workItems } from "@/lib/work";
import styles from "./home-work-cards.module.css";

/* Le statut de chaque projet est écrit dans sa description, et non plus
   dans une pastille en haut de la carte (demande d'Antonino du 14/11). */
const COPY = {
  fr: {
    project: "Projet",
    discover: "Découvrir le projet",
    nexusStatus: "Nexus est un outil interne de Synode, déjà opérationnel.",
  },
  en: {
    project: "Project",
    discover: "Explore the project",
    nexusStatus: "Nexus is an internal Synode tool, already in use.",
  },
} as const;

function Tags({ items }: { items: readonly string[] }) {
  return <ul className={styles.tags}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

/**
 * LES DEUX CARTES DE PROJET, SUR L'ACCUEIL ET SUR LA PAGE RÉALISATIONS.
 *
 * Même contenu, mêmes libellés, même graphisme sur les deux pages : il n'y a
 * qu'une seule carte de projet sur ce site, et c'est voulu. Seule la
 * DISPOSITION change.
 *
 *  - `stack` (l'accueil) : visuel en haut, contenu dessous, deux cartes côte
 *    à côte.
 *  - `row` (Réalisations) : visuel à gauche, contenu à droite, une carte par
 *    rangée.
 *
 * `heading` suit le plan de titres de la page qui l'accueille : sous le `h2`
 * d'une section sur l'accueil, la carte descend en `h3` ; sur la page
 * Réalisations, où la bande n'a pas de titre, elle est en `h2`. Sauter un
 * niveau casse le plan du document pour un lecteur d'écran.
 */
export function HomeWorkCards({
  locale,
  layout = "stack",
  heading: Heading = "h3",
}: {
  locale: Locale;
  layout?: "stack" | "row";
  heading?: "h2" | "h3";
}) {
  const fr = locale === "fr";
  const c = COPY[fr ? "fr" : "en"];
  const nexus = workItems(locale)[0];
  const coory = findWork(locale, "coory");
  const cooryCard = cooryCardCopy(locale);

  if (!nexus || !coory) return null;

  const nexusHref = `${path(locale, ROUTES.work)}/${nexus.slug}`;
  const cooryHref = `${path(locale, ROUTES.work)}/${coory.slug}`;
  const nexusTags = fr
    ? ["Recherche web", "Analyse IA", "Qualification", "Suivi commercial"]
    : ["Web research", "AI analysis", "Qualification", "Sales follow-up"];

  return (
    <div className={layout === "row" ? `${styles.grid} ${styles.row}` : styles.grid}>
      <article className={styles.card} aria-labelledby="home-project-nexus">
        {/* La zone image de la carte Nexus : un visuel animé, plus une
            capture. Il porte sa propre description pour les lecteurs
            d'écran. Voir `components/nexus-visual`. */}
        <div className={styles.visual}>
          <NexusVisual locale={locale} />
          {/* L'illustration mène aussi au projet. C'est un doublon du lien
              « Découvrir le projet » : caché des lecteurs d'écran et sorti
              de la tabulation, pour qu'un seul lien soit annoncé par carte.
              Il est posé PAR-DESSUS l'illustration, sans l'envelopper : elle
              garde sa description et la mise en page ne change pas. */}
          <Link className={styles.visualLink} href={nexusHref} tabIndex={-1} aria-hidden="true" />
        </div>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span>{c.project} 01</span>
          </div>
          <Heading id="home-project-nexus">{fr ? "Nexus — Logiciel de prospection" : "Nexus — Prospecting software"}</Heading>
          <p>{nexus.problem} {c.nexusStatus}</p>
          <Tags items={nexusTags} />
        </div>
        <Link className={styles.linkFooter} href={nexusHref}>
          <span>{c.discover}</span>
          <ArrowUpRight aria-hidden />
        </Link>
      </article>

      <article className={styles.card} aria-labelledby="home-project-coory">
        {/* L'illustration animée de Coory, à l'identique du fichier de
            design : voir `components/illustrations`. Elle porte son propre
            fond pointillé ; `visualStage` le prolonge quand la zone est plus
            haute que l'illustration (page Réalisations). */}
        <div className={`${styles.visual} ${styles.visualStage}`}>
          <CooryDesktopMobile />
          <Link className={styles.visualLink} href={cooryHref} tabIndex={-1} aria-hidden="true" />
        </div>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span>{c.project} 02</span>
          </div>
          <Heading id="home-project-coory">{cooryCard.title}</Heading>
          <p>{cooryCard.text}</p>
          <Tags items={cooryCard.tags} />
        </div>
        <Link className={styles.linkFooter} href={cooryHref}>
          <span>{c.discover}</span>
          <ArrowUpRight aria-hidden />
        </Link>
      </article>
    </div>
  );
}
