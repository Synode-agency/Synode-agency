"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/content";

/**
 * Les six étapes d'un projet, en onglets.
 *
 * Posé deux fois : sur l'accueil, dans « Conception & Développement IA »,
 * et sur la page Solutions. C'est volontairement le MÊME composant et les
 * mêmes textes — deux copies auraient divergé au premier retouchage, et
 * c'est exactement ce qui était arrivé aux deux versions précédentes.
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. L'étape 0 est active au premier rendu, côté serveur comme côté
 *    client. La tirer au montage provoquerait une différence d'hydratation.
 * 2. `prefers-reduced-motion` ARRÊTE la lecture automatique, il ne
 *    l'allonge pas. L'étape 01 reste alors active, sa barre pleine, et les
 *    onglets répondent toujours au clic et au clavier.
 * 3. La barre de progression est une animation CSS et non un minuteur
 *    JavaScript : elle se cale sur le même temps que l'intervalle sans
 *    qu'aucune des deux valeurs n'ait à être lue par l'autre. Les deux
 *    durées doivent donc rester identiques — 4s ici, 4s dans `studio.css`.
 * ────────────────────────────────────────────────────────────────────────
 */

const CYCLE_MS = 4000;

type Step = {
  tab: string;
  title: string;
  text: string;
  out: string;
  pill: string;
};

const STEPS: Record<"fr" | "en", readonly Step[]> = {
  fr: [
    {
      tab: "Cadrage du besoin",
      title: "Cadrage du besoin métier",
      text: "Tout commence par un premier échange gratuit. Nous analysons le processus à améliorer, vos outils, vos données et vos contraintes. Le périmètre est écrit et validé avant tout développement.",
      out: "Un périmètre écrit et validé.",
      pill: "Périmètre",
    },
    {
      tab: "Conception & architecture",
      title: "Conception & architecture IA",
      text: "Définition de l’architecture, des intégrations et des briques réellement utiles à votre objectif. Vous savez ce qui sera construit avant le démarrage.",
      out: "Une architecture et un devis.",
      pill: "Architecture + devis",
    },
    {
      tab: "Développement",
      title: "Développement IA sur mesure",
      text: "Création des agents IA, des automatisations ou des logiciels métier prévus au périmètre, testés au fur et à mesure sur vos cas réels.",
      out: "Une version testée sur vos cas.",
      pill: "Version testée",
    },
    {
      tab: "Intégration & déploiement",
      title: "Intégration & déploiement",
      text: "Connexion à vos logiciels existants, recette sur des données réelles, puis mise en service de la solution dans votre environnement.",
      out: "La solution en service.",
      pill: "Mise en service",
    },
    {
      tab: "Documentation & formation",
      title: "Documentation & formation",
      text: "Documentation du fonctionnement et accompagnement de vos équipes jusqu’à la prise en main complète de la solution.",
      out: "Une documentation et une équipe autonome.",
      pill: "Équipe autonome",
    },
    {
      tab: "Maintenance & évolution",
      title: "Maintenance & évolution",
      text: "Monitoring, maintenance et évolutions selon les besoins du projet. Vous choisissez de nous confier ce suivi ou de le reprendre en interne.",
      out: "Un suivi défini et des évolutions chiffrées.",
      pill: "Suivi défini",
    },
  ],
  en: [
    {
      tab: "Scoping the need",
      title: "Scoping the business need",
      text: "It starts with a free first conversation. We analyse the process to improve, your tools, your data and your constraints. The scope is written down and agreed before any development.",
      out: "A written, agreed scope.",
      pill: "Scope",
    },
    {
      tab: "Design & architecture",
      title: "AI design & architecture",
      text: "Defining the architecture, the integrations and the blocks that genuinely serve your objective. You know what will be built before work starts.",
      out: "An architecture and a quote.",
      pill: "Architecture + quote",
    },
    {
      tab: "Development",
      title: "Custom AI development",
      text: "Building the AI agents, automations or business software set out in the scope, tested against your real cases as we go.",
      out: "A build tested on your cases.",
      pill: "Tested build",
    },
    {
      tab: "Integration & rollout",
      title: "Integration & rollout",
      text: "Connecting to your existing software, testing on real data, then putting the solution live in your environment.",
      out: "The solution, live.",
      pill: "Go-live",
    },
    {
      tab: "Documentation & training",
      title: "Documentation & training",
      text: "Documenting how it works and supporting your teams until they can run the solution themselves.",
      out: "Documentation and a self-sufficient team.",
      pill: "Self-sufficient team",
    },
    {
      tab: "Maintenance & evolution",
      title: "Maintenance & evolution",
      text: "Monitoring, maintenance and changes, according to the needs of the project. You choose whether we handle that or you take it in-house.",
      out: "A defined level of support and quoted changes.",
      pill: "Defined support",
    },
  ],
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export function MethodTabs({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const steps = STEPS[fr ? "fr" : "en"];
  const base = useId();

  const [active, setActive] = useState(0);
  /* La lecture automatique, coupée définitivement au premier geste. */
  const [auto, setAuto] = useState(true);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((n) => (n + 1) % steps.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [auto, steps.length]);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  /* Flèches gauche et droite, en boucle, avec le focus qui suit l'onglet. */
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + steps.length) % steps.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="mtabs" data-auto={auto ? "true" : "false"}>
      <div
        className="mtabs-row"
        role="tablist"
        aria-label={fr ? "Les six étapes d’un projet" : "The six steps of a project"}
        onKeyDown={onKey}
      >
        {/* Deux groupes de trois : c'est ce qui interdit la rangée de cinq
            plus un à la largeur intermédiaire. Un `auto-fit` sur les six
            onglets ne saurait pas s'en empêcher. */}
        {[0, 3].map((from) => (
          <div className="mtabs-group" key={from}>
            {steps.slice(from, from + 3).map((s, k) => {
              const i = from + k;
              const state = i === active ? "is-on" : i < active ? "is-past" : "is-next";
              return (
                <button
                  key={s.tab}
                  type="button"
                  role="tab"
                  id={`${base}-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls={`${base}-panel-${i}`}
                  tabIndex={i === active ? 0 : -1}
                  ref={(el) => { tabs.current[i] = el; }}
                  className={`mtabs-tab ${state}`}
                  onClick={() => choose(i)}
                >
                  <em>{num(i)}</em>
                  <span>{s.tab}</span>
                  <i className="mtabs-bar" aria-hidden />
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Les SIX panneaux sont rendus et superposés dans une seule cellule
          de grille ; seul l'actif est visible. C'est ce qui fige la hauteur
          du bloc : elle vaut celle du panneau le plus haut, quelle que soit
          l'étape affichée. Une valeur en dur aurait menti à la première
          retouche de texte ou à la première traduction plus longue.

          `visibility: hidden` et non `display: none` : un panneau masqué
          doit continuer à occuper sa place pour que la grille le mesure. */}
      <div className="mtabs-panels">
        {steps.map((s, i) => (
          <div
            key={s.tab}
            className={i === active ? "mtabs-panel is-on" : "mtabs-panel"}
            role="tabpanel"
            id={`${base}-panel-${i}`}
            aria-labelledby={`${base}-tab-${i}`}
            aria-hidden={i !== active}
          >
            <div className="mtabs-main">
              <p className="mtabs-step">
                <em>{num(i)}</em>
                <span>{fr ? `étape ${i + 1} sur ${steps.length}` : `step ${i + 1} of ${steps.length}`}</span>
              </p>
              <h3>{s.title}</h3>
              <p className="mtabs-text">{s.text}</p>
            </div>

            <div className="mtabs-out">
              <span className="mtabs-out-label">{fr ? "Produit" : "Output"}</span>
              <p className="mtabs-out-value">{s.out}</p>

              <div className="mtabs-pills">
                <span className="mtabs-pills-label">{fr ? "livrables cumulés" : "deliverables so far"}</span>
                <ul>
                  {steps.map((p, k) => (
                    <li key={p.pill} className={k <= i ? "is-done" : undefined}>
                      <em>{num(k)}</em>
                      {p.pill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
