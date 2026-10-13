"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/content";
import { useOnScreen } from "@/lib/use-on-screen";

/**
 * LE DÉROULÉ D'UN PROJET, EN CADRE À HAUTEUR FIXE.
 *
 * Six étapes dans une liste à gauche, le détail de l'étape à droite. Posé
 * dans la section « Méthode » de la page Solutions, à côté du texte.
 *
 * ── Le point à ne pas défaire ───────────────────────────────────────────
 * LA HAUTEUR DU CADRE NE BOUGE JAMAIS, d'une étape à l'autre comme pendant
 * le défilement. C'est ce qui empêche la page de sauter toutes les quatre
 * secondes. Trois règles y veillent, et il faut les trois : le corps est en
 * `flex: 1; min-height: 0`, la description absorbe le reste en `flex: 1`
 * avec `overflow: hidden`, et l'encart de résultat a une hauteur fixe. En
 * retirer une seule fait grandir le cadre sur l'étape au texte le plus
 * long.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Deux autres ─────────────────────────────────────────────────────────
 * 1. L'étape 0 est active au premier rendu, côté serveur comme côté
 *    client : la tirer au montage provoquerait une différence d'hydratation.
 * 2. Un clic arrête le défilement DÉFINITIVEMENT. Quelqu'un qui a cliqué
 *    pour lire une étape ne doit pas la voir disparaître quatre secondes
 *    plus tard.
 * ────────────────────────────────────────────────────────────────────────
 */

/** Une étape toutes les 4s. La barre de l'étape active se remplit sur la
 *  même durée : les deux valeurs doivent rester accordées, l'une est en JS
 *  et l'autre dans l'animation CSS `mfr-fill`. */
const STEP_MS = 4000;

type Step = { short: string; title: string; text: string; out: string };

const STEPS: Record<"fr" | "en", Step[]> = {
  fr: [
    { short: "Cadrage du besoin", title: "Cadrage du besoin métier", text: "Analyse du processus à améliorer, de vos outils, de vos données et de vos contraintes. Le périmètre est écrit et validé avant tout développement.", out: "Un périmètre écrit et validé." },
    { short: "Conception & architecture", title: "Conception & architecture IA", text: "Définition de l’architecture, des intégrations et des briques réellement utiles à votre objectif. Vous savez ce qui sera construit avant le démarrage.", out: "Une architecture et un devis." },
    { short: "Développement", title: "Développement IA sur mesure", text: "Création des agents IA, des automatisations ou des logiciels métier prévus au périmètre, testés au fur et à mesure sur vos cas réels.", out: "Une version testée sur vos cas." },
    { short: "Intégration & déploiement", title: "Intégration & déploiement", text: "Connexion à vos logiciels existants, recette sur des données réelles, puis mise en service de la solution dans votre environnement.", out: "La solution en service." },
    { short: "Documentation & formation", title: "Documentation & formation", text: "Documentation du fonctionnement et accompagnement de vos équipes jusqu’à la prise en main complète de la solution.", out: "Une documentation et une équipe autonome." },
    { short: "Maintenance & évolution", title: "Maintenance & évolution", text: "Monitoring, maintenance et évolutions selon les besoins du projet. Vous choisissez de nous confier ce suivi ou de le reprendre en interne.", out: "Un suivi défini et des évolutions chiffrées." },
  ],
  en: [
    { short: "Scoping", title: "Scoping the business need", text: "Analysis of the process to improve, your tools, your data and your constraints. The scope is written and agreed before any development.", out: "A written, agreed scope." },
    { short: "Design & architecture", title: "AI design & architecture", text: "We define the architecture, the integrations and the blocks genuinely useful to your objective. You know what will be built before work starts.", out: "An architecture and a quote." },
    { short: "Development", title: "Custom AI development", text: "We build the AI agents, automations or business software set out in the scope, tested as we go on your real cases.", out: "A version tested on your cases." },
    { short: "Integration & go-live", title: "Integration & go-live", text: "Connection to your existing software, acceptance testing on real data, then putting the solution into service in your environment.", out: "The solution in service." },
    { short: "Documentation & training", title: "Documentation & training", text: "We document how it works and support your teams until they have fully taken the solution in hand.", out: "Documentation and an autonomous team." },
    { short: "Maintenance & changes", title: "Maintenance & changes", text: "Monitoring, maintenance and changes according to the needs of the project. You choose whether to entrust this to us or handle it in-house.", out: "A defined support level and costed changes." },
  ],
};

const COPY = {
  fr: { head: "DÉROULÉ · 6 ÉTAPES", step: (n: string) => `étape ${n} / 06`, of: (n: number) => `étape ${n} sur 6`, out: "PRODUIT", group: "Les six étapes d’un projet" },
  en: { head: "FLOW · 6 STEPS", step: (n: string) => `step ${n} / 06`, of: (n: number) => `step ${n} of 6`, out: "OUTPUT", group: "The six steps of a project" },
} as const;

/**
 * Le panneau de détail d'une étape.
 *
 * Sorti en composant parce qu'il est rendu SEPT fois sous 900px : une fois
 * pour de vrai, et six fois dans le bloc de mesure. Deux écritures du même
 * panneau finiraient par divergir, et la mesure porterait alors sur autre
 * chose que ce qui s'affiche.
 */
function Detail({
  step, index, copy, style,
}: {
  step: Step;
  index: number;
  copy: (typeof COPY)["fr"] | (typeof COPY)["en"];
  style?: { minHeight: number };
}) {
  const n = String(index + 1).padStart(2, "0");
  return (
    <div className="mfr-detail" style={style}>
      <span className="mfr-detail-label">{n} · {copy.of(index + 1)}</span>
      <h3>{step.title}</h3>
      <p className="mfr-desc">{step.text}</p>
      <div className="mfr-out">
        <span>{copy.out}</span>
        <strong>{step.out}</strong>
      </div>
    </div>
  );
}

export function MethodFrame({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const steps = STEPS[fr ? "fr" : "en"];
  const c = COPY[fr ? "fr" : "en"];

  const [active, setActive] = useState(0);
  /* Coupé définitivement au premier clic, et jamais relancé. */
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);
  const [root, onScreen] = useOnScreen<HTMLDivElement>();
  /* Sous 900px seulement : le cadre y change de forme, et c'est le seul
     endroit où la hauteur du panneau se mesure. Faux au premier rendu, donc
     le serveur et le client rendent la même chose. */
  const [phone, setPhone] = useState(false);
  /* La hauteur du panneau de détail : celle de l'étape au contenu le plus
     long, pour que le cadre ne bouge pas d'une étape à l'autre. */
  const [detailH, setDetailH] = useState(0);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    if (!auto) return;
    /* Gelé hors écran : voir `useOnScreen`. */
    if (!onScreen) return;
    const id = window.setInterval(() => setActive(n => (n + 1) % steps.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [auto, steps.length, onScreen]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const read = () => setPhone(mq.matches);
    queueMicrotask(read);
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  /* ---- LA HAUTEUR DU PANNEAU, MESURÉE.
     Sur deux colonnes, la hauteur du cadre est écrite — 420px — et c'est la
     description qui encaisse la différence entre les six étapes, rognée par
     `overflow: hidden`. Empilé, plus rien ne doit être rogné : la hauteur
     est donc celle de l'étape au contenu le plus long, et les six la
     prennent.

     Les six contenus sont rendus une seconde fois dans un bloc invisible,
     posé en absolu sur le corps du cadre : il a donc exactement la largeur
     du vrai panneau, et ses six copies se composent comme lui. `visibility`
     et non `display` : une boîte en `display: none` n'a pas de hauteur à
     lire. Ce bloc n'existe QUE sous 900px, et seulement après le montage :
     le HTML servi, lui, ne porte qu'une fois le texte des étapes. ---- */
  useEffect(() => {
    if (!phone) { queueMicrotask(() => setDetailH(0)); return; }
    const body = bodyRef.current;
    let raf = 0;
    const apply = () => {
      const box = measureRef.current;
      if (!box) return;
      let tallest = 0;
      for (const panel of Array.from(box.children)) tallest = Math.max(tallest, (panel as HTMLElement).offsetHeight);
      if (tallest > 0) setDetailH(Math.ceil(tallest));
    };
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply); };
    schedule();
    /* Les polices arrivent après le premier rendu : sans ce second passage,
       la hauteur reste celle de la police de secours. */
    document.fonts?.ready.then(schedule).catch(() => {});
    /* La largeur décide du nombre de lignes, donc de la hauteur. */
    const ro = body ? new ResizeObserver(schedule) : null;
    if (ro && body) ro.observe(body);
    return () => { cancelAnimationFrame(raf); ro?.disconnect(); };
  }, [phone, steps]);

  const pick = (i: number) => { setAuto(false); setActive(i); };
  const num = (i: number) => String(i + 1).padStart(2, "0");
  const step = steps[active];
  const running = auto && !still;

  return (
    <div className="mfr" ref={root}>
      {/* ---- L'en-tête ---- */}
      <div className="mfr-head">
        <span className="mfr-head-label">{c.head}</span>
        <span className="mfr-head-step">{c.step(num(active))}</span>
      </div>

      {/* ---- Le corps : la liste, puis le détail ---- */}
      <div className="mfr-body" ref={bodyRef}>
        <div className="mfr-list" role="group" aria-label={c.group}>
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-pressed={i === active}
              className={`mfr-step ${i === active ? "is-on" : i < active ? "is-done" : "is-next"}`}
              onClick={() => pick(i)}
            >
              {/* La barre n'est rendue QUE sur l'étape active, et sa clé
                  change avec elle : c'est ce qui relance l'animation de
                  remplissage à chaque passage plutôt que de la laisser
                  terminée. */}
              {i === active && running && <i className="mfr-bar" key={active} aria-hidden />}
              <em>{num(i)}</em>
              <span>{s.short}</span>
            </button>
          ))}
        </div>

        <Detail step={step} index={active} copy={c} style={detailH ? { minHeight: detailH } : undefined} />

        {/* Les six copies de mesure. Invisibles, hors du flux et retirées de
            l'arbre d'accessibilité : elles ne servent qu'à donner leur
            hauteur. Voir l'effet qui les lit. */}
        {phone && (
          <div className="mfr-measure" ref={measureRef} aria-hidden>
            {steps.map((s, i) => <Detail key={s.title} step={s} index={i} copy={c} />)}
          </div>
        )}
      </div>

      {/* ---- Le pied : l'avancement ---- */}
      <div className="mfr-foot" aria-hidden>
        {steps.map((s, i) => (
          <i key={s.title} className={i === active ? "is-on" : i < active ? "is-done" : undefined} />
        ))}
      </div>
    </div>
  );
}
