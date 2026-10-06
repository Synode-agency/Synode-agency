"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/content";

/**
 * « Comment tout s'assemble » : l'analyse, montrée.
 *
 * Le visiteur choisit un exemple de besoin. Les six briques sont alors
 * passées en revue, celles qui conviennent sont retenues une à une, et la
 * solution se compose à droite dans l'ordre où elles ont été retenues.
 *
 * ── Un point à ne pas défaire ───────────────────────────────────────────
 * Le visiteur ne peut pas cocher ni décocher une brique. Seuls les besoins
 * sont cliquables, et c'est tout le propos : le choix des briques est le
 * travail de Synode, pas une case à remplir par le client. Rendre les
 * lignes cliquables retournerait le message du bloc.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Un second ──────────────────────────────────────────────────────────
 * `prefers-reduced-motion` affiche l'état final et ARRÊTE tout : ni
 * dépliement de ligne, ni passage au besoin suivant. Une boucle qui tourne
 * indéfiniment est exactement ce que ce réglage demande de supprimer.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Toute la cadence tient dans un seul effet, relancé à chaque changement
 * d'état : tant qu'il reste une brique à retenir il arme un délai, sinon
 * il arme la pause avant le besoin suivant. Aucun `setState` n'y est
 * appelé en direct — la règle de lint du projet l'interdit, et un
 * `queueMicrotask` suffit pour le seul cas qui en a besoin.
 */

const AUTO_STEP_MS = 650;
const CLICK_STEP_MS = 380;
const HOLD_MS = 2000;

const BRICKS = {
  fr: [
    ["Agents IA", "Répondent, trient, rédigent", "agent.run()"],
    ["Automatisations", "Enchaînent les tâches répétitives", "workflow.trigger"],
    ["Intégrations", "Relient vos outils existants", "crm · erp · api"],
    ["Logiciels métier", "Des interfaces faites pour vos équipes", "ui + logic"],
    ["Data", "Des données structurées et exploitables", "index · query"],
    ["Formation", "Des équipes autonomes avec l’IA", "team.onboard()"],
  ],
  en: [
    ["AI agents", "Answer, sort, draft", "agent.run()"],
    ["Automations", "Chain the repetitive tasks", "workflow.trigger"],
    ["Integrations", "Connect the tools you already have", "crm · erp · api"],
    ["Business software", "Interfaces built for your teams", "ui + logic"],
    ["Data", "Structured data you can actually use", "index · query"],
    ["Training", "Teams who work with AI on their own", "team.onboard()"],
  ],
} as const;

/** L'ordre des indices est celui dans lequel les briques sont retenues. */
const NEEDS: readonly { picks: readonly number[]; fr: readonly [string, string]; en: readonly [string, string] }[] = [
  {
    picks: [0, 1, 2, 5],
    fr: ["Demandes clients", "Pour traiter chaque demande client plus vite, sans rien oublier."],
    en: ["Customer requests", "To handle every customer request faster, without missing one."],
  },
  {
    picks: [1, 2, 4, 5],
    fr: ["Impayés", "Pour détecter les retards et relancer automatiquement."],
    en: ["Overdue invoices", "To spot late payments and chase them automatically."],
  },
  {
    picks: [3, 2, 1, 5],
    fr: ["Planning", "Pour organiser rendez-vous et équipes dans un seul outil."],
    en: ["Scheduling", "To organise appointments and teams in a single tool."],
  },
  {
    picks: [4, 2, 3, 0, 1, 5],
    fr: ["Pilotage global", "Pour centraliser vos opérations et décider sur des données fiables."],
    en: ["Overall steering", "To centralise your operations and decide on data you can trust."],
  },
];

function Tick() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AssemblyPicker({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const bricks = BRICKS[fr ? "fr" : "en"];

  const [need, setNeed] = useState(0);
  const [count, setCount] = useState(0);
  /* Le défilement automatique, coupé définitivement au premier clic. */
  const [auto, setAuto] = useState(true);

  const picks = NEEDS[need].picks;
  const total = picks.length;
  const done = count >= total;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      if (count < total) queueMicrotask(() => setCount(total));
      return;
    }
    if (count < total) {
      const id = window.setTimeout(() => setCount((c) => c + 1), auto ? AUTO_STEP_MS : CLICK_STEP_MS);
      return () => window.clearTimeout(id);
    }
    /* Sélection terminée. En automatique on enchaîne, après un clic on
       s'arrête et le visiteur garde ce qu'il a demandé sous les yeux. */
    if (!auto) return;
    const id = window.setTimeout(() => {
      setNeed((n) => (n + 1) % NEEDS.length);
      setCount(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [need, count, auto, total]);

  const choose = (i: number) => {
    setAuto(false);
    setNeed(i);
    setCount(0);
  };

  const rank = (b: number) => picks.indexOf(b);
  const state = (b: number) => {
    const r = rank(b);
    if (r > -1 && r < count) return "kept";
    return done ? "skip" : "scan";
  };
  const statusLabel = { kept: fr ? "retenue" : "selected", skip: fr ? "non requise" : "not needed", scan: fr ? "analyse…" : "analysing…" };

  const kept = fr
    ? `${count} ${count > 1 ? "services retenus" : "service retenu"}`
    : `${count} ${count > 1 ? "services selected" : "service selected"}`;

  return (
    <div className="apick">
      {/* ---- La barre du haut : le besoin à gauche, le décompte à droite.
          Le décompte vit ici et non dans la bande du bas : il commente la
          sélection en cours, qui est au-dessus de lui. ---- */}
      <div className="apick-needs">
        {/* L'étiquette et le contrôle forment un seul groupe : sans lui, le
            `space-between` de la barre les écartait aux deux bouts de la
            ligne dès que le décompte tenait à côté. */}
        <div className="apick-needs-main">
          <span className="apick-label">{fr ? "Exemple de votre besoin" : "Your need, for example"}</span>
          <div className="apick-seg" role="group" aria-label={fr ? "Choisir un exemple de besoin" : "Choose an example need"}>
            {NEEDS.map((n, i) => (
              <button
                key={n.fr[0]}
                type="button"
                aria-pressed={i === need}
                className={i === need ? "is-on" : undefined}
                onClick={() => choose(i)}
              >
                {(fr ? n.fr : n.en)[0]}
              </button>
            ))}
          </div>
        </div>
        <p className="apick-meter">
          <em>{fr ? "conçue par Synode ·" : "designed by Synode ·"}</em> <b>{kept}</b>
        </p>
      </div>

      {/* ---- Notre sélection : les six briques sur une rangée. Le `gap`
          de 1px sur un fond gris dessine les séparateurs, donc la grille
          peut se replier sans qu'aucune bordure ne reste orpheline. ---- */}
      <div className="apick-panel">
        <span className="apick-panel-head">{fr ? "Notre sélection" : "Our selection"}</span>
        <ul className="apick-list" aria-live="polite">
          {bricks.map(([name, desc], b) => {
            const s = state(b);
            return (
              <li key={name} className={`apick-cell is-${s}`}>
                <strong>{name}</strong>
                <small>{desc}</small>
                <span className="apick-chip">
                  {s === "kept" && <Tick />}
                  {statusLabel[s]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---- Votre solution : une bande, pas une carte. Les étiquettes
          sont TOUTES rendues et celles qui ne sont pas encore retenues
          restent repliées à zéro. C'est ce qui permet d'animer leur
          apparition par une transition plutôt que par un montage. ---- */}
      <div className={done ? "apick-band is-done" : "apick-band"}>
        <span className="apick-band-label">{fr ? "Votre solution" : "Your solution"}</span>

        <div className="apick-tags">
          {picks.map((b, i) => (
            <span key={bricks[b][0]} className={i < count ? "apick-tag is-in" : "apick-tag"}>
              <i aria-hidden />
              {bricks[b][0]}
            </span>
          ))}
        </div>

        <div className="apick-band-out">
          <strong><em aria-hidden>=</em>{fr ? "Une solution IA sur mesure" : "One custom AI solution"}</strong>
          <p>{(fr ? NEEDS[need].fr : NEEDS[need].en)[1]}</p>
        </div>
      </div>
    </div>
  );
}
