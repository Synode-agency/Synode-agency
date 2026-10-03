import Link from "next/link";
import { Bot, Database, Plug, UserCheck, Workflow, AppWindow } from "lucide-react";
import { getContent, path, ROUTES, type Locale } from "@/lib/content";

/**
 * Les briques d'une solution, dans le hero de Solutions.
 *
 * L'ancienne illustration était un schéma : six entrées reliées à une carte
 * centrale « votre solution ». Un hub central dit une seule chose, et il la
 * dit déjà dans le titre. Ici les six briques sont posées côte à côte, en
 * modules de tailles inégales et décalés verticalement : rien ne les
 * enveloppe, rien ne les relie, et c'est l'asymétrie qui tient la
 * composition. Chaque module garde son lien vers la famille correspondante.
 *
 * Les six modules suivent l'ordre des six familles de `content.ts`, donc les
 * liens restent justes si cet ordre change. Les libellés courts et les
 * détails techniques sont propres à l'illustration.
 */
const MODULES = [
  { icon: Bot, meta: "agent.run()", size: "tall", detail: "rows" },
  { icon: Workflow, meta: "workflow.trigger", size: "flat", detail: "steps" },
  { icon: AppWindow, meta: "ui + logic", size: "flat", detail: null },
  { icon: Plug, meta: "crm · erp · api", size: "tall", detail: "ports" },
  { icon: Database, meta: "index · query", size: "flat", detail: "bars" },
  { icon: UserCheck, meta: "approval: on", size: "flat", detail: "switch" },
] as const;

export function SolutionsModules({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const labels = fr
    ? ["Agent IA", "Automatisation", "Logiciel métier", "Intégration", "Data", "Contrôle humain"]
    : ["AI agent", "Automation", "Business software", "Integration", "Data", "Human control"];
  const families = getContent(locale).solutions.bricks;

  return (
    <div
      className="solutions-modules"
      aria-label={fr ? "Les briques combinées dans une solution Synode" : "The building blocks combined in a Synode solution"}
    >
      {MODULES.map(({ icon: Icon, meta, size, detail }, i) => {
        const family = families[i];
        return (
          <Link
            key={labels[i]}
            className={`solutions-module solutions-module--${size}`}
            href={family ? `${path(locale, ROUTES.solutions)}/${family.slug}` : path(locale, ROUTES.solutions)}
          >
            <Icon className="solutions-module-icon" aria-hidden />
            <strong>{labels[i]}</strong>
            <code>{meta}</code>
            {detail === "rows" && (
              <span className="solutions-module-rows" aria-hidden>
                <i /><i /><i />
              </span>
            )}
            {detail === "steps" && (
              <span className="solutions-module-steps" aria-hidden>
                <i /><i /><i /><i />
              </span>
            )}
            {detail === "ports" && (
              <span className="solutions-module-ports" aria-hidden>
                <i /><i /><i /><i /><i /><i />
              </span>
            )}
            {detail === "bars" && (
              <span className="solutions-module-bars" aria-hidden>
                <i /><i /><i /><i /><i />
              </span>
            )}
            {detail === "switch" && <span className="solutions-module-switch" aria-hidden />}
          </Link>
        );
      })}
    </div>
  );
}
