"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ANCHORS, ROUTES, path, type Locale } from "@/lib/content";
import { diagnosticContent } from "@/lib/ai-diagnostic-content";
import { BriefBuilderPanel } from "./brief-builder-panel";
import { EMPTY_ANSWERS, type Answers } from "@/lib/ai-diagnostic-score";
import { composeBrief } from "@/lib/tools-brief";
import { DiagnosticPanel } from "./diagnostic-panel";
import { finderHandoff, OpportunityFinderPanel, type PainId } from "./opportunity-finder-panel";

/**
 * La zone interactive de la section « Outils & Diagnostics IA ».
 *
 * Les deux outils vivent ICI, sur l'accueil. Le visiteur choisit, règle et
 * lit son résultat sans jamais quitter la page.
 *
 * Les deux sélecteurs forment un vrai jeu d'onglets : `role="tablist"`,
 * `aria-selected`, et les flèches gauche et droite pour passer de l'un à
 * l'autre, comme un lecteur d'écran et un clavier l'attendent. Ce sont des
 * `<button>` et non des liens : rien ne navigue.
 *
 * Les deux panneaux restent MONTÉS une fois ouverts, cachés par `hidden`
 * plutôt que démontés. Revenir sur un outil retrouve donc ses réglages, et
 * l'aller-retour ne coûte aucun recalcul.
 */

type ToolId = "finder" | "diagnostic" | "brief";
const TOOL_ORDER: readonly ToolId[] = ["finder", "diagnostic", "brief"];

export function ToolsSection({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const d = diagnosticContent(locale);
  const [active, setActive] = useState<ToolId>("finder");
  const [selectedPains, setSelectedPains] = useState<PainId[]>([]);
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);

  /* Ce que les deux premières étapes ont appris, recopié tel quel dans le
     brief. Rien n'est inventé : les champs qu'aucune étape ne couvre
     restent vides. */
  const prefill = useMemo(() => {
    const { pains, process } = finderHandoff(locale, selectedPains);
    return composeBrief(locale, { pains, process, answers });
  }, [locale, selectedPains, answers]);

  /* Les DEUX panneaux sont rendus côté serveur, l'inactif simplement
     masqué. Construire le second à la première ouverture aurait été plus
     économe, mais son contenu n'aurait alors existé dans aucun HTML : ni
     indexable, ni lisible sans JavaScript. Les deux calculs sont locaux et
     tiennent en quelques multiplications. */
  const open = (id: ToolId) => setActive(id);

  const tools = [
    {
      id: "finder" as ToolId,
      kind: fr ? "Étape 01" : "Step 01",
      title: fr ? "Trouver le processus à prioriser" : "Find the process to prioritise",
      text: fr
        ? "Partez des difficultés réellement rencontrées par vos équipes, sans devoir connaître les technologies IA."
        : "Start from the difficulties your teams genuinely face, without needing to know AI technologies.",
    },
    {
      id: "diagnostic" as ToolId,
      kind: fr ? "Étape 02" : "Step 02",
      title: fr ? "Vérifier la faisabilité" : "Check feasibility",
      text: fr
        ? "Examinez les outils, les données et les validations du processus avant d’envisager une solution."
        : "Examine the process tools, data and approvals before considering a solution.",
    },
    {
      id: "brief" as ToolId,
      kind: fr ? "Étape 03" : "Step 03",
      title: fr ? "Préparer votre brief" : "Prepare your brief",
      text: fr
        ? "Structurez votre problème, votre environnement et le résultat attendu pour préparer un premier échange utile."
        : "Structure your problem, environment and expected outcome to prepare a useful first conversation.",
    },
  ];

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const current = TOOL_ORDER.indexOf(active);
    open(TOOL_ORDER[(current + direction + TOOL_ORDER.length) % TOOL_ORDER.length]);
  };

  return (
    <div className="tools-zone">
      <div className="tools-tabs" role="tablist" aria-label={fr ? "Choisir un outil" : "Choose a tool"} onKeyDown={onKeyDown}>
        {tools.map((tool) => {
          const isActive = tool.id === active;
          return (
            <button
              key={tool.id}
              type="button"
              role="tab"
              id={`tool-tab-${tool.id}`}
              aria-selected={isActive}
              aria-controls={`tool-panel-${tool.id}`}
              tabIndex={isActive ? 0 : -1}
              className="tools-tab"
              onClick={() => open(tool.id)}
            >
              <span className="tools-tab-kind">{tool.kind}</span>
              <span className="tools-tab-title">{tool.title}</span>
              <span className="tools-tab-text">{tool.text}</span>
            </button>
          );
        })}
      </div>

      {/* La mention se lit AVANT d'ouvrir un outil, pas après l'avoir
          rempli : elle dit la portée de ce qu'on va obtenir. Placée en
          pied, elle arrivait une fois le résultat déjà lu. */}
      <p className="tools-disclaimer">{d.disclaimer}</p>

      <div
        role="tabpanel"
        id="tool-panel-finder"
        aria-labelledby="tool-tab-finder"
        hidden={active !== "finder"}
      >
        <OpportunityFinderPanel
          locale={locale}
          selected={selectedPains}
          onSelectedChange={setSelectedPains}
          onContinue={() => open("diagnostic")}
        />
      </div>

      <div
        role="tabpanel"
        id="tool-panel-diagnostic"
        aria-labelledby="tool-tab-diagnostic"
        hidden={active !== "diagnostic"}
      >
        <DiagnosticPanel
          locale={locale}
          answers={answers}
          onAnswersChange={setAnswers}
          onContinue={() => open("brief")}
        />
      </div>

      <div
        role="tabpanel"
        id="tool-panel-brief"
        aria-labelledby="tool-tab-brief"
        hidden={active !== "brief"}
      >
        <BriefBuilderPanel locale={locale} prefill={prefill} />
      </div>

      <footer className="tools-foot">
        <p className="tools-cta-text">{d.ctaText}</p>
        <Link className="btn btn--primary" href={`${path(locale, ROUTES.contact)}#${ANCHORS.form}`}>
          {d.ctaPrimary}<ArrowRight aria-hidden />
        </Link>
      </footer>
    </div>
  );
}
