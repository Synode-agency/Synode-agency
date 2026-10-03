import type { Metadata } from "next";
import { AiDiagnosticPage } from "@/components/site/ai-diagnostic-page";
import { diagnosticContent } from "@/lib/ai-diagnostic-content";
import { ROUTES } from "@/lib/content";

const c = diagnosticContent("fr");
const prefix = "";

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: `${prefix}${ROUTES.aiDiagnostic}`,
    languages: { fr: ROUTES.aiDiagnostic, en: `/en${ROUTES.aiDiagnostic}` },
  },
  openGraph: {
    title: `${c.metaTitle} | Synode`,
    description: c.metaDescription,
    url: `${prefix}${ROUTES.aiDiagnostic}`,
    type: "website",
  },
};

export default function Page() {
  return <AiDiagnosticPage locale="fr" />;
}
