"use client";

import { useEffect, useState } from "react";
import { Activity, Check, LockKeyhole, Plug, UserCheck } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * « Sécurité, confidentialité et contrôle » : quatre contrôles franchis
 * dans l'ordre.
 *
 * Chaque carte est une étape : à venir, en cours, puis franchie avec sa
 * pastille verte. Les quatre franchies, le cycle repart. C'est la forme
 * qui porte le message — ces mesures ne sont pas quatre promesses posées
 * côte à côte, elles s'enchaînent sur un même parcours.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. Le pas 0 est actif au premier rendu, côté serveur comme côté client.
 *    Le tirer au montage provoquerait une différence d'hydratation.
 * 2. `prefers-reduced-motion` ARRÊTE le cycle et affiche les quatre étapes
 *    franchies, pastilles vertes comprises. Le survol continue de
 *    fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Les pastilles disent ce qui a été vérifié, pas ce qui est garanti : le
 * niveau retenu est défini projet par projet, ce que dit déjà le
 * paragraphe au-dessus. Ne pas les transformer en engagements chiffrés.
 */

/** Un pas toutes les 1,4s. Six pas : quatre étapes, un palier, une remise à zéro. */
const STEP_MS = 1400;
const STEPS = 6;

const ICONS = [LockKeyhole, UserCheck, Plug, Activity];

const ITEMS = {
  fr: [
    { title: "Confidentialité des données", text: "Vos données sont utilisées uniquement dans le cadre défini pour votre solution IA, avec des accès limités aux personnes et systèmes autorisés afin de préserver leur confidentialité.", pill: "accès vérifié" },
    { title: "Contrôle humain", text: "Les décisions sensibles et les actions importantes peuvent rester soumises à une validation humaine afin de conserver un niveau de contrôle adapté à votre activité et à vos processus métier.", pill: "action validée" },
    { title: "Accès et intégrations sécurisés", text: "Les connexions à vos logiciels, bases de données et outils métier sont configurées avec des droits d’accès adaptés et limitées aux informations nécessaires au fonctionnement de votre solution IA.", pill: "connexion limitée" },
    { title: "Suivi technique", text: "Le fonctionnement de votre système IA peut être surveillé afin de détecter les erreurs, comportements anormaux ou problèmes d’intégration et de maintenir la solution dans de bonnes conditions d’exploitation.", pill: "exécution surveillée" },
  ],
  en: [
    { title: "Data confidentiality", text: "Your data is used only within the scope defined for your AI solution, with access restricted to authorised people and systems in order to keep it confidential.", pill: "access checked" },
    { title: "Human control", text: "Sensitive decisions and important actions can remain subject to human approval, to keep a level of control that suits your business and your processes.", pill: "action approved" },
    { title: "Secure access and integrations", text: "Connections to your software, databases and business tools are configured with appropriate access rights and limited to the information your AI solution needs to run.", pill: "access limited" },
    { title: "Technical monitoring", text: "Your AI system can be watched, so that errors, unusual behaviour or integration problems are detected and the solution is kept in good running order.", pill: "run monitored" },
  ],
} as const;

export function TrustSteps({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const items = ITEMS[fr ? "fr" : "en"];

  const [step, setStep] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  /* Coupé définitivement au premier survol, et jamais relancé. */
  const [auto, setAuto] = useState(true);
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }
    if (!auto) return;
    const id = window.setInterval(() => setStep((n) => (n + 1) % STEPS), STEP_MS);
    return () => window.clearInterval(id);
  }, [auto]);

  /** À venir, en cours, ou franchie. */
  const state = (i: number) => {
    if (still) return "done";
    if (held !== null) return i < held ? "done" : i === held ? "now" : "next";
    if (step >= STEPS - 1) return "next";
    if (step === STEPS - 2) return "done";
    return i < step ? "done" : i === step ? "now" : "next";
  };

  const hold = (i: number) => {
    setAuto(false);
    setHeld(i);
  };

  return (
    <div className="tst" data-auto={auto && !still ? "true" : "false"}>
      {/* Deux groupes de deux : c'est ce qui interdit la rangée de trois
          plus un à la largeur intermédiaire. Un `auto-fit` sur les quatre
          cartes ne saurait pas s'en empêcher. */}
      {[0, 2].map((from) => (
        <div className="tst-group" key={from}>
          {items.slice(from, from + 2).map((item, k) => {
            const i = from + k;
            const Icon = ICONS[i];
            return (
              <article
                key={item.title}
                className={`tst-card is-${state(i)}`}
                tabIndex={0}
                onMouseEnter={() => hold(i)}
                onFocus={() => hold(i)}
              >
                <span className="tst-bar" aria-hidden />
                <div className="tst-top">
                  <span className="tst-icon"><Icon aria-hidden /></span>
                  <em>{String(i + 1).padStart(2, "0")}</em>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="tst-pill">
                  <Check aria-hidden />
                  {item.pill}
                </span>
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
}
