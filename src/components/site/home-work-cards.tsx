"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { NexusVisual } from "@/components/nexus-visual";
import { ROUTES, path, type Locale } from "@/lib/content";
import { projectTwoCardCopy, workItems } from "@/lib/work";
import styles from "./home-work-cards.module.css";

const STEP_MS = 1100;
const STEP_COUNT = 5;

const COPY = {
  fr: {
    project: "Projet",
    discover: "Découvrir le projet",
    fictional: "données fictives",
    steps: ["Demande reçue", "Analyse par l’agent", "Action préparée", "Validation humaine"],
    running: "en cours…",
    done: "fait",
    approved: "validé",
  },
  en: {
    project: "Project",
    discover: "Explore the project",
    fictional: "fictional data",
    steps: ["Request received", "Analysed by the agent", "Action prepared", "Human approval"],
    running: "under way…",
    done: "done",
    approved: "approved",
  },
} as const;

type Tone = "green" | "blue";

function StatusPill({ tone, children }: { tone: Tone; children: string }) {
  return <span className={`${styles.status} ${styles[tone]}`}><i aria-hidden />{children}</span>;
}

function Tags({ items }: { items: readonly string[] }) {
  return <ul className={styles.tags}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

/**
 * Le déroulé animé du second projet.
 *
 * Il porte SON horloge et SON observateur, donc il se suffit à lui-même :
 * c'est ce qui permet de le reprendre tel quel dans la carte de la page
 * Réalisations sans dupliquer l'animation. Le pas n'est pas une donnée, il
 * n'est écrit nulle part dans le contenu.
 */
export function ProjectScenario({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];
  const [step, setStep] = useState(0);
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStep(STEP_COUNT - 1));
      return;
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && timer === undefined) {
        timer = window.setInterval(() => setStep((current) => (current + 1) % STEP_COUNT), STEP_MS);
      } else if (!entry.isIntersecting && timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.scenarioVisual} ref={root}>
      <span className={styles.fictional}>{c.fictional}</span>
      <ol className={styles.scenario}>
        {c.steps.map((name, index) => {
          const state = index < step ? "done" : index === step ? "active" : "next";
          const stateLabel = state === "active" ? c.running : state === "done" ? (index === 3 ? c.approved : c.done) : "";

          return (
            <li key={name} className={`${styles.step} ${styles[state]}`}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <strong>{name}</strong>
              <span className={styles.stepState}>{stateLabel}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
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
  const projectTwo = projectTwoCardCopy(locale);

  if (!nexus) return null;

  const nexusHref = `${path(locale, ROUTES.work)}/${nexus.slug}`;
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
        </div>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span>{c.project} 01</span>
            <StatusPill tone="green">{nexus.status}</StatusPill>
          </div>
          <Heading id="home-project-nexus">{fr ? "Nexus — Logiciel de prospection" : "Nexus — Prospecting software"}</Heading>
          <p>{nexus.problem}</p>
          <Tags items={nexusTags} />
        </div>
        <Link className={styles.linkFooter} href={nexusHref}>
          <span>{c.discover}</span>
          <ArrowUpRight aria-hidden />
        </Link>
      </article>

      <article className={styles.card} aria-labelledby="home-project-two">
        <div className={styles.visual}>
          <ProjectScenario locale={locale} />
        </div>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span>{c.project} 02</span>
            <StatusPill tone="blue">{projectTwo.status}</StatusPill>
          </div>
          <Heading id="home-project-two">{projectTwo.title}</Heading>
          <p>{projectTwo.text}</p>
          <Tags items={projectTwo.tags} />
        </div>
        <footer className={styles.staticFooter}>
          <span>{projectTwo.publication}</span>
          <span>{projectTwo.soon}</span>
        </footer>
      </article>
    </div>
  );
}
