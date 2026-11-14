import type { Locale } from "@/lib/content";
import { AutomationWorkflow } from "./automation-workflow";
import { DataDashboard } from "./data-dashboard";
import { IntegrationSync } from "./integration-sync";
import { InterventionsApp } from "./interventions-app";
import { TrainingConsole } from "./training-console";

export function ServiceHeroIllustration({ slug, locale }: { slug: string; locale: Locale }) {
  switch (slug) {
    case "automatisations-intelligentes": return <AutomationWorkflow locale={locale} />;
    case "data-intelligence": return <DataDashboard locale={locale} />;
    case "formation-adoption-ia": return <TrainingConsole locale={locale} />;
    case "logiciels-applications-ia": return <InterventionsApp locale={locale} />;
    case "integrations-systemes-connectes": return <IntegrationSync locale={locale} />;
    default: return null;
  }
}

