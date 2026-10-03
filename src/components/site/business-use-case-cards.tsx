import {
  Activity,
  AppWindow,
  BarChart3,
  CalendarClock,
  CreditCard,
  FileText,
  LifeBuoy,
  Lightbulb,
  MessagesSquare,
  Search,
  ShoppingCart,
  TrendingUp,
  UserPlus,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { BusinessUseCase, BusinessUseCaseIcon } from "@/lib/business-use-cases";
import type { Locale } from "@/lib/content";

const icons: Record<BusinessUseCaseIcon, LucideIcon> = {
  workflow: Workflow,
  knowledge: Search,
  support: MessagesSquare,
  data: BarChart3,
  finance: CreditCard,
  purchasing: ShoppingCart,
  sales: TrendingUp,
  contracts: FileText,
  onboarding: UserPlus,
  incidents: LifeBuoy,
  planning: CalendarClock,
  copilot: AppWindow,
};

export function BusinessUseCaseCards({
  items,
  locale,
  preserveHomeAnchors = false,
}: {
  items: readonly BusinessUseCase[];
  locale: Locale;
  preserveHomeAnchors?: boolean;
}) {
  const fr = locale === "fr";

  return (
    <div className="daily-problems-grid">
      {items.map((item, index) => {
        const Icon = icons[item.icon] ?? Activity;
        return (
          <article
            key={item.slug}
            id={preserveHomeAnchors ? item.homeAnchor : item.slug}
            className="daily-problem-card"
          >
            <div className="daily-problem-top">
              <span className="feature-icon"><Icon aria-hidden /></span>
              <span>{item.domain}</span>
              <span aria-hidden>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <ul className="daily-examples" aria-label={fr ? "Outils et informations concernés" : "Relevant tools and information"}>
              {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <div className="daily-response">
              <Lightbulb aria-hidden />
              <p>
                <strong>{fr ? "Exemple de solution IA" : "Example AI solution"}</strong>
                {item.example}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
