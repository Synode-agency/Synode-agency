import { ArrowUpRight, Bot, Database, Plug, UserCheck, Workflow, AppWindow, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/content";
import { ROUTES, path } from "@/lib/content";
import type { ApproachId } from "@/lib/ai-diagnostic-score";
import { diagnosticContent } from "@/lib/ai-diagnostic-content";

/** Chaque approche renvoie vers la famille de Solutions correspondante. */
const META: Record<ApproachId, { icon: LucideIcon; slug?: string }> = {
  automation: { icon: Workflow, slug: "automatisations-intelligentes" },
  agents: { icon: Bot, slug: "assistants-agents-ia" },
  integration: { icon: Plug, slug: "integrations-systemes-connectes" },
  data: { icon: Database, slug: "data-intelligence" },
  software: { icon: AppWindow, slug: "logiciels-applications-ia" },
  human: { icon: UserCheck },
};

export function DiagnosticRecommendations({ locale, approaches }: { locale: Locale; approaches: readonly ApproachId[] }) {
  const c = diagnosticContent(locale);
  if (approaches.length === 0) return null;

  return (
    <section className="diag-approaches" aria-labelledby="diag-approaches-title">
      <h3 id="diag-approaches-title">{c.approachesTitle}</h3>
      <ul>
        {approaches.map((id) => {
          const { icon: Icon, slug } = META[id];
          const { title, text } = c.approaches[id];
          return (
            <li key={id}>
              <Icon className="diag-approach-icon" aria-hidden />
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
                {slug && (
                  <Link className="go" href={`${path(locale, ROUTES.solutions)}/${slug}`}>
                    {locale === "fr" ? "Voir cette famille de solutions" : "See this family of solutions"}
                    <ArrowUpRight aria-hidden />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
