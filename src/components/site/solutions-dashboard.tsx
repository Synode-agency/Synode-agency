"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

/**
 * La maquette de logiciel du hero de Solutions : un tableau de bord qui
 * présente les six familles de services.
 *
 * ── Ce que la maquette n'est pas ────────────────────────────────────────
 * Les six chiffres (6 agents, 24 tâches, 128 demandes, 92% d'équipe
 * formée…) sont ILLUSTRATIFS. Ils ne décrivent aucun client et ne mesurent
 * rien. C'est pour ça que le bloc porte un `aria-label` qui le dit, et que
 * ces valeurs ne doivent jamais ressortir ailleurs sur le site comme des
 * résultats. Le jour où de vrais chiffres existeront, ils auront leur
 * propre page, pas un hero.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. L'index 0 est actif au premier rendu, côté serveur comme côté client.
 *    Tirer la carte active au montage provoquerait une différence
 *    d'hydratation.
 * 2. `prefers-reduced-motion` ARRÊTE le défilement, il ne l'allonge pas.
 *    Une rotation qui tourne indéfiniment est précisément ce que ce
 *    réglage demande de supprimer. La carte 01 reste alors ouverte, et le
 *    survol continue de fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Le bouton de la barre latérale, la carte et la mention « module actif »
 * lisent tous le même état : il ne peut pas y avoir de désynchronisation.
 */

type Art = "curve" | "segments" | "window" | "dots" | "bars" | "ring";

const CARDS: readonly {
  num: string; value: string; delta: string; art: Art;
  fr: readonly [string, string]; en: readonly [string, string];
}[] = [
  { num: "01", value: "6", delta: "+2", art: "curve", fr: ["Agent IA", "Agents IA actifs"], en: ["AI agent", "Active AI agents"] },
  { num: "02", value: "24", delta: "+8%", art: "segments", fr: ["Automatisation", "Tâches automatisées"], en: ["Automation", "Automated tasks"] },
  { num: "03", value: "3", delta: "v2.4", art: "window", fr: ["Logiciel métier", "Applications métier"], en: ["Business software", "Business applications"] },
  { num: "04", value: "12", delta: "sync", art: "dots", fr: ["Intégration", "Outils connectés"], en: ["Integration", "Connected tools"] },
  { num: "05", value: "128", delta: "+12%", art: "bars", fr: ["Data", "Demandes traitées"], en: ["Data", "Requests handled"] },
  { num: "06", value: "92%", delta: "+5%", art: "ring", fr: ["Formation & Adoption IA", "Équipe formée"], en: ["AI Training & Adoption", "Team trained"] },
];

const CYCLE_MS = 2600;

/** Les six mini-visuels, 64×40. Le seul qui demande du SVG est la courbe. */
function CardArt({ kind }: { kind: Art }) {
  if (kind === "curve") {
    return (
      <span className="sol-card-art sol-card-art--curve" aria-hidden>
        <svg viewBox="0 0 64 40" preserveAspectRatio="none">
          <path d="M0 34 L13 27 L26 29 L39 17 L52 12 L64 4 L64 40 L0 40 Z" fill="#16335a" />
          <polyline points="0,34 13,27 26,29 39,17 52,12 64,4" fill="none" stroke="#4e8ff0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </span>
    );
  }
  if (kind === "window") {
    return (
      <span className="sol-card-art sol-card-art--window" aria-hidden>
        <i /><i /><i />
      </span>
    );
  }
  if (kind === "ring") {
    return <span className="sol-card-art sol-card-art--ring" aria-hidden><i /></span>;
  }
  const count = kind === "dots" ? 8 : 4;
  return (
    <span className={`sol-card-art sol-card-art--${kind}`} aria-hidden>
      {Array.from({ length: count }, (_, i) => <i key={i} />)}
    </span>
  );
}

export function SolutionsDashboard({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  const [auto, setAuto] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const active = held ?? auto;

  useEffect(() => {
    if (held !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAuto((n) => (n + 1) % CARDS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [held]);

  const name = (i: number) => (fr ? CARDS[i].fr : CARDS[i].en)[0];
  const label = (i: number) => (fr ? CARDS[i].fr : CARDS[i].en)[1];

  return (
    <div
      className="sol-app"
      role="img"
      aria-label={fr
        ? "Aperçu illustratif d’un tableau de bord présentant les six familles de solutions Synode. Les chiffres affichés sont fictifs."
        : "Illustrative preview of a dashboard showing Synode’s six solution families. The figures shown are fictional."}
      onMouseLeave={() => setHeld(null)}
    >
      <nav className="sol-app-rail" aria-hidden>
        <Image src="/synode-mark.png" alt="" width={22} height={22} priority />
        <div className="sol-app-rail-buttons">
          {CARDS.map((card, i) => (
            <button
              key={card.num}
              type="button"
              tabIndex={-1}
              className={i === active ? "is-active" : undefined}
              onMouseEnter={() => setHeld(i)}
            >
              {card.num}
            </button>
          ))}
        </div>
      </nav>

      <div className="sol-app-main">
        <div className="sol-app-top">
          <span>{fr ? "synode / tableau de bord" : "synode / dashboard"}</span>
          <span className="sol-app-status"><i aria-hidden />{fr ? "en ligne" : "online"}</span>
        </div>

        <div className="sol-app-hello">
          <div>
            <strong>{fr ? "Bonjour !" : "Hello!"}</strong>
            <p>{fr ? "Voici un résumé de votre activité." : "Here is a summary of your activity."}</p>
          </div>
          <div className="sol-app-hello-module">
            <span>{fr ? "module actif" : "active module"}</span>
            <strong>{name(active)}</strong>
          </div>
        </div>

        <ul className="sol-app-grid">
          {CARDS.map((card, i) => (
            <li
              key={card.num}
              className={i === active ? "sol-card is-active" : "sol-card"}
              onMouseEnter={() => setHeld(i)}
            >
              <span className="sol-card-copy">
                <span className="sol-card-value">{card.value}<em>{card.delta}</em></span>
                <span className="sol-card-label">{label(i)}</span>
                <span className="sol-card-tag">{card.num} · {name(i)}</span>
              </span>
              <CardArt kind={card.art} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
