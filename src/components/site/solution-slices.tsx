"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, BarChart3, Blocks, Bot, Check, GraduationCap, LayoutGrid, Link2, Mail,
  Network, type LucideIcon,
} from "lucide-react";
import { path, ROUTES, type Locale } from "@/lib/content";
import { RobotScene } from "@/components/site/robot-scene";

/**
 * Les six solutions, en tranches.
 *
 * Elles sont posées côte à côte comme des dos de livres : l'ouverte prend
 * presque toute la largeur, les cinq autres se resserrent en bandes de
 * 72px où ne restent que l'icône, le numéro et le titre à la verticale.
 *
 * Posé deux fois, sur l'accueil et sur la page Solutions, avec les mêmes
 * données : celles de `content.ts`, qui alimentent déjà les six pages de
 * famille. Aucun texte n'est recopié ici, donc rien ne peut diverger.
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. La solution 0 est ouverte au premier rendu, côté serveur comme côté
 *    client, et rien ne l'en déloge tant qu'on ne survole pas le bloc.
 * 2. Le contenu de la tranche ouverte porte une `min-width` égale à sa
 *    largeur finale, MESURÉE. Sans elle, le texte se recompose pendant que
 *    la tranche s'ouvre et la carte tremble pendant 0,65s.
 * 3. `prefers-reduced-motion` ARRÊTE les visuels et supprime la transition
 *    de largeur. Le survol continue de fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 */

const TICK_MS = 700;
const TICKS = 4;
/** En dessous, les tranches s'empilent au lieu de s'aligner. */
const SIDE_BY_SIDE = 930;
const RAIL = 72;
const GAP = 10;

const ICONS: LucideIcon[] = [Bot, Blocks, LayoutGrid, Network, BarChart3, GraduationCap];

type Item = {
  slug: string;
  title: string;
  text: string;
  benefit: string;
  example: string;
};

/* Quatre intitulés prennent l'article, deux ne le supportent pas :
   « Découvrez les Data & Intelligence » ne se dit pas. */
const NO_ARTICLE = new Set(["data-intelligence", "formation-adoption-ia"]);

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Les six mini-visuels. `tick` vaut 0 à 3 et repart à chaque ouverture. */
function Visual({ kind, tick, fr, active }: { kind: number; tick: number; fr: boolean; active: boolean }) {
  if (kind === 0) {
    /* La scène du robot a sa propre boucle, en `requestAnimationFrame` :
       le `tick` partagé par les cinq autres visuels avance par paliers de
       700ms, bien trop grossier pour un mouvement continu. */
    return <RobotScene locale={fr ? "fr" : "en"} active={active} />;
  }
  if (kind === 1) {
    /* L'enveloppe entre, le lien relie, la coche valide : les trois carrés
       disent le trajet d'une information d'un outil à l'autre. */
    const glyphs = [Mail, Link2, Check];
    return (
      <div className="slc-art slc-art--flow" aria-hidden>
        {glyphs.map((Glyph, i) => (
          <span key={i} className="slc-flow-part">
            {i > 0 && <i className={tick > i - 1 ? "slc-flow-link is-on" : "slc-flow-link"} />}
            <b className={`${tick > i ? "is-on" : ""}${i === 2 && tick >= 3 ? " is-full" : ""}`}>
              <Glyph />
            </b>
          </span>
        ))}
      </div>
    );
  }
  if (kind === 2) {
    const w = [72, 54, 88];
    return (
      <div className="slc-art slc-art--app" aria-hidden>
        <span className="slc-app-bar" />
        <div className="slc-app-body">
          <span className="slc-app-side"><i /><i /><i /></span>
          <div className="slc-app-main">
            <span className="slc-app-tiles"><i /><i /><i /></span>
            {w.map((v, i) => (
              <i key={i} className="slc-app-line" style={{ width: `${tick > i ? v : 30}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === 3) {
    const labels = ["CRM", "API", "ERP", "Email"];
    return (
      <div className="slc-art slc-art--grid">
        {labels.map((l, i) => <span key={l} className={tick === i ? "is-on" : undefined}>{l}</span>)}
        <i className="slc-grid-core" aria-hidden />
      </div>
    );
  }
  if (kind === 4) {
    const a = [38, 62, 46, 78, 55, 70, 88];
    const b = [55, 44, 70, 52, 82, 60, 74];
    const h = tick % 2 === 0 ? a : b;
    return (
      <div className="slc-art slc-art--data">
        <div className="slc-data-bars" aria-hidden>
          {h.map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}
        </div>
        <span>{fr ? "Vos données, une vue claire" : "Your data, one clear view"}</span>
      </div>
    );
  }
  const words = fr ? ["Comprendre", "Pratiquer", "Adopter"] : ["Understand", "Practise", "Adopt"];
  return (
    <div className="slc-art slc-art--learn">
      <div className="slc-learn-box">
        <GraduationCap aria-hidden />
        <p>
          {words.map((word, i) => (
            <span key={word} className={tick > i ? (tick === i + 1 ? "is-now" : "is-on") : undefined}>
              {i > 0 && <em aria-hidden> · </em>}
              {word}
            </span>
          ))}
        </p>
      </div>
      <span className={tick >= 3 ? "slc-learn-go is-on" : "slc-learn-go"}>
        ✓ {fr ? "À vous de jouer" : "Your turn"}
      </span>
    </div>
  );
}

export function SolutionSlices({ items, locale }: { items: readonly Item[]; locale: Locale }) {
  const fr = locale === "fr";
  const box = useRef<HTMLDivElement | null>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  /* La première tranche est ouverte, et elle le reste tant que personne ne
     survole le bloc. Il n'y a PAS de défilement automatique : une carte qui
     s'ouvre et se ferme toute seule attire l'œil sans qu'on l'ait demandé,
     et le visiteur perd la tranche qu'il était en train de lire. */
  const [open, setOpen] = useState(0);
  const [tick, setTick] = useState(TICKS - 1);
  /* Mesurées, jamais devinées : la largeur du conteneur décide de la
     disposition, et celle de la tranche ouverte fige son contenu. */
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Le cycle des visuels. Il repart de zéro à chaque ouverture : l'effet
     dépend de `open`, donc il se remonte, et son compteur local repart
     avec lui. Le `queueMicrotask` est là pour la remise à zéro — la règle
     de lint du projet interdit d'appeler `setState` en direct dans un
     effet, et c'est le seul endroit qui en aurait besoin. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    queueMicrotask(() => setTick(0));
    let t = 0;
    const id = window.setInterval(() => {
      t = (t + 1) % TICKS;
      setTick(t);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [open]);

  const onKey = useCallback((e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + items.length) % items.length;
    setOpen(next);
    cards.current[next]?.focus();
  }, [items.length]);

  const stacked = width > 0 && width < SIDE_BY_SIDE;
  /* La colonne visuelle disparaît quand la tranche ouverte descend sous
     680px : à deux colonnes dans moins que ça, le texte tombait à trois
     mots par ligne. Le calcul se fait ici et non en `@container` — une
     requête de conteneur se serait réévaluée PENDANT l'ouverture, et le
     visuel aurait clignoté au milieu de l'animation. */
  const showVisual = stacked || width === 0 || width - 5 * (RAIL + GAP) >= 680;
  const openWidth = stacked || width === 0
    ? undefined
    : Math.max(0, width - (items.length - 1) * RAIL - (items.length - 1) * GAP);

  return (
    <div ref={box} className={stacked ? "slc slc--stacked" : "slc"}>
      {items.map((item, i) => {
        const Icon = ICONS[i] ?? Bot;
        const on = i === open;
        return (
          <div
            key={item.slug}
            ref={(el) => { cards.current[i] = el; }}
            className={on ? "slc-card is-on" : "slc-card"}
            tabIndex={0}
            aria-expanded={on}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {/* La bande fermée : icône, numéro, titre à la verticale. */}
            <span className="slc-rail" aria-hidden={on}>
              <span className="slc-rail-icon"><Icon aria-hidden /></span>
              <em>{num(i)}</em>
              <b>{item.title}</b>
            </span>

            <div className="slc-open" aria-hidden={!on} style={openWidth ? { minWidth: openWidth } : undefined}>
              <div className="slc-copy">
                <div className="slc-copy-top">
                  <span className="slc-copy-icon"><Icon aria-hidden /></span>
                  <em>{num(i)} / {num(items.length - 1)}</em>
                </div>
                <h3>{item.title}</h3>
                <p className="slc-text">{item.text}</p>
                <p className="slc-benefit">{item.benefit}</p>

                <div className="slc-example">
                  <span>{fr ? "Exemple possible" : "Possible example"}</span>
                  <p>{item.example}</p>
                </div>

                <Link
                  className="slc-link"
                  href={`${path(locale, ROUTES.solutions)}/${item.slug}`}
                  tabIndex={on ? 0 : -1}
                >
                  {fr ? `Découvrez ${NO_ARTICLE.has(item.slug) ? "" : "les "}${item.title}` : `Discover ${item.title}`}
                  <ArrowUpRight aria-hidden />
                </Link>
              </div>

              {showVisual && (
                <div className="slc-visual">
                  <Visual kind={i} tick={tick} fr={fr} active={on} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
