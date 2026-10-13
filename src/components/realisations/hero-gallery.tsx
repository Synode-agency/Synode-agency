"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import styles from "./hero-gallery.module.css";

/**
 * LA CARD « GALERIE DE PROJETS », DANS LE HERO DE LA PAGE RÉALISATIONS.
 *
 * Une barre latérale, des filtres, et quatre vignettes de projet. Toutes les
 * 2,6s le projet actif change : son bouton dans la barre, sa vignette et le
 * filtre de sa catégorie s'allument ensemble.
 *
 * ── Ce que ce bloc dit, et ce qu'il ne dit pas ──────────────────────────
 * Les quatre vignettes reprennent l'état RÉEL des projets : un outil interne
 * opérationnel, des projets en préparation, et une place vide pour le premier
 * projet client, qui ne sera publié qu'avec son accord.
 * Aucun logo, aucune capture, aucun chiffre. Ne pas y ajouter un projet qui
 * n'existe pas : c'est précisément ce que cette page refuse de faire.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Seule la couleur change pendant le cycle : la hauteur de la card est fixée
 * par son contenu, et elle ne bouge pas d'une étape à l'autre.
 *
 * Décoratif : le conteneur porte `aria-hidden`. La liste des réalisations,
 * juste en dessous, dit la même chose en clair.
 */

/** Le projet actif change toutes les 2,6s, dans l'ordre 1 → 2 → 3. */
const TURN_MS = 2600;
const CYCLE = 3;
/** La pastille d'une ligne du tableau s'allume toutes les 0,7s. */
const ROW_MS = 700;
/** Le point du flux fait un aller en 2,2s, puis recommence. */
const FLOW_MS = 2200;

type Kind = "table" | "chat" | "flow" | "plus";
type Tone = "blue" | "warm" | "grey";

const PROJECTS: { kind: Kind; tone: Tone; filter: number }[] = [
  { kind: "table", tone: "blue", filter: 1 },
  { kind: "chat", tone: "warm", filter: 2 },
  { kind: "flow", tone: "warm", filter: 2 },
  { kind: "plus", tone: "grey", filter: 3 },
];

/** Les quatre carrés de couleur du tableau, dans cet ordre. */
const MARKS = ["#34d399", "#4e8ff0", "#f5b454", "#4e8ff0"];

const COPY = {
  fr: {
    head: "synode / réalisations",
    live: "statuts à jour",
    filters: ["Tous", "Internes", "En préparation", "Clients"],
    names: ["Nexus — prospection", "Projet 2", "Projet en préparation", "Prochain projet client"],
    states: ["Outil interne · opérationnel", "En préparation", "En préparation", "Publié avec accord"],
    /* La variante compacte dit la même chose en moins de place. Les deux
       sont dans le DOM et c'est la feuille de style qui montre l'une ou
       l'autre : la card est décorative et `aria-hidden`, donc rien n'est lu
       deux fois, et il n'y a pas de bascule au montage. */
    liveShort: "à jour",
    statesShort: ["Opérationnel", "En préparation", "En préparation", "Publié avec accord"],
  },
  en: {
    head: "synode / work",
    live: "statuses up to date",
    filters: ["All", "Internal", "In preparation", "Clients"],
    names: ["Nexus — prospecting", "Project 2", "Project in preparation", "Next client project"],
    states: ["Internal tool · operational", "In preparation", "In preparation", "Published with consent"],
    liveShort: "up to date",
    statesShort: ["Operational", "In preparation", "In preparation", "Published with consent"],
  },
} as const;

export function HeroGallery({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const [active, setActive] = useState(0);
  const [lit, setLit] = useState(0);
  const [still, setStill] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const flowDot = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }

    let raf = 0;
    let t0 = 0;
    let running = false;

    /* Une seule horloge pour les trois rythmes : le projet actif, la
       pastille du tableau et le point du flux. */
    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;

      const next = Math.floor(t / TURN_MS) % CYCLE;
      setActive(prev => (prev === next ? prev : next));
      const row = Math.floor(t / ROW_MS) % 4;
      setLit(prev => (prev === row ? prev : row));
      if (flowDot.current) {
        flowDot.current.style.left = `${(12 + 76 * ((t % FLOW_MS) / FLOW_MS)).toFixed(2)}%`;
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => { if (running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!running) return; running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.2 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, []);

  const on = still ? 0 : active;
  const litRow = still ? 0 : lit;

  /* ---- Les quatre aperçus ---- */
  const preview = (kind: Kind) => {
    if (kind === "table") {
      return (
        <span className={styles.table}>
          {MARKS.map((colour, i) => (
            <span key={i} className={styles.tableRow}>
              <i className={styles.tableMark} style={{ background: colour }} />
              <i className={styles.tableLine} />
              <i className={styles.tablePill} style={{ background: i === litRow ? "#8ec1ff" : "#2f5fa8" }} />
            </span>
          ))}
        </span>
      );
    }
    if (kind === "chat") {
      return (
        <span className={styles.chat}>
          <i className={styles.chatOne} />
          <i className={`${styles.chatTwo} ${styles.chatRight}`} />
          <i className={styles.chatThree} />
        </span>
      );
    }
    if (kind === "flow") {
      return (
        <span className={styles.flow}>
          <i className={styles.flowLine} />
          <i ref={flowDot} className={styles.flowDot} style={{ left: still ? "88%" : "12%" }} />
          <i className={styles.flowBlock} />
          <i className={styles.flowBlock} />
          <i className={`${styles.flowBlock} ${styles.flowDone}`} />
        </span>
      );
    }
    return <span className={styles.plus} aria-hidden>+</span>;
  };

  return (
    <div className={styles.card} ref={root} aria-hidden>
      {/* ---- La barre latérale ---- */}
      <div className={styles.side}>
        <Image className={styles.logo} src="/synode-mark.png" alt="" width={52} height={52} />
        <span className={styles.gap} />
        {[0, 1, 2].map(i => (
          <span key={i} className={i === on ? `${styles.tab} ${styles.tabOn}` : styles.tab}>
            {String(i + 1).padStart(2, "0")}
          </span>
        ))}
      </div>

      {/* ---- La zone principale ---- */}
      <div className={styles.main}>
        <span className={styles.head}>
          <em>
            {/* Le symbole seul, sans le mot « Synode » : la barre latérale
                qui le portait n'existe pas dans la variante compacte. Masqué
                au-dessus de 600px, où c'est elle qui l'affiche. */}
            <Image className={styles.headLogo} src="/synode-mark.png" alt="" width={40} height={40} />
            {c.head}
          </em>
          <span className={styles.live}>
            <i />
            <span className={styles.long}>{c.live}</span>
            <span className={styles.short}>{c.liveShort}</span>
          </span>
        </span>

        {/* Une seule rangée : si les filtres ne tiennent pas, le dépassement
            est masqué à droite plutôt que de passer à la ligne. */}
        <span className={styles.filters}>
          {c.filters.map((filter, i) => (
            <i
              key={filter}
              className={[
                styles.filter,
                i === 0 ? styles.filterAll : "",
                i === PROJECTS[on].filter ? styles.filterOn : "",
              ].filter(Boolean).join(" ")}
            >
              {filter}
            </i>
          ))}
        </span>

        <span className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <span
              key={c.names[i]}
              className={[
                styles.thumb,
                i === 3 ? styles.thumbEmpty : "",
                i === on ? styles.thumbOn : "",
              ].filter(Boolean).join(" ")}
            >
              <span className={styles.shot}>{preview(project.kind)}</span>
              <strong className={styles.name}>{c.names[i]}</strong>
              <em className={`${styles.state} ${styles[project.tone]}`}>
                <i />
                <span className={styles.long}>{c.states[i]}</span>
                <span className={styles.short}>{c.statesShort[i]}</span>
              </em>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
