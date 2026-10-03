import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Lede } from "@/components/site/lede";
import { DiagnosticWizard } from "@/components/site/ai-diagnostic/diagnostic-wizard";
import { ROUTES, path, type Locale } from "@/lib/content";
import { diagnosticContent } from "@/lib/ai-diagnostic-content";
import { siteUrl } from "@/lib/site-url";

/**
 * La page de l'outil.
 *
 * Le hero reprend le gabarit des pages internes, donc la page n'invente
 * aucune mise en page : seule la colonne de droite change, et elle y pose
 * directement l'outil plutôt qu'une illustration. Le questionnaire est le
 * sujet de la page, pas une décoration.
 */
export function AiDiagnosticPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const c = diagnosticContent(locale);
  const pagePath = path(locale, ROUTES.aiDiagnostic);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: c.h1,
    description: c.metaDescription,
    url: `${siteUrl}${pagePath}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: fr ? "fr-BE" : "en-BE",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: "Synode", url: `${siteUrl}/` },
  };

  return (
    <Shell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        title={fr ? <>Diagnostic du <span>potentiel IA</span> de votre entreprise</> : <>Your company’s <span>AI potential</span> diagnostic</>}
        aside={<div className="diag-stage"><DiagnosticWizard locale={locale} /></div>}
      >
        <p>{c.intro}</p>
        <p className="diag-lead">{c.lead}</p>
      </PageHero>

      <Band id="comprendre" tone="white" className="studio-section diag-explainer">
        <Lede
          kicker={fr ? "Comment lire ce diagnostic" : "How to read this diagnostic"}
          title={fr ? "Un potentiel, pas une promesse de résultat" : "A potential, not a promise of results"}
          accents={fr ? ["potentiel"] : ["potential"]}
          text={fr
            ? "Le diagnostic examine un seul processus métier à la fois : sa fréquence, les outils qu’il mobilise, les ressaisies qu’il impose, les documents qu’il fait circuler, les règles qu’il applique et les validations qu’il réclame. Il en déduit les familles de solutions IA qui méritent d’être étudiées pour ce processus précis, et celles qui n’apportent rien."
            : "The diagnostic examines a single business process at a time: how often it runs, which tools it mobilises, the re-entry it imposes, the documents it moves around, the rules it applies and the approvals it requires. From that it derives which families of AI solutions are worth studying for that specific process, and which bring nothing."}
        />
        <div className="section-gap diag-explainer-grid">
          <article>
            <h3>{fr ? "Déterministe" : "Deterministic"}</h3>
            <p>{fr ? "Les mêmes réponses donnent toujours le même résultat. Aucun modèle d’IA n’intervient dans le calcul, et aucune part d’aléatoire." : "The same answers always give the same result. No AI model is involved in the calculation, and nothing is left to chance."}</p>
          </article>
          <article>
            <h3>{fr ? "Rien n’est enregistré" : "Nothing is stored"}</h3>
            <p>{fr ? "Le calcul se fait dans votre navigateur. Vos réponses ne sont envoyées à aucun serveur, et aucune adresse email n’est demandée pour voir le résultat." : "The calculation runs in your browser. Your answers are sent to no server, and no email address is required to see the result."}</p>
          </article>
          <article>
            <h3>{fr ? "Un point de départ" : "A starting point"}</h3>
            <p>{fr ? "Un diagnostic en dix questions ne remplace pas l’examen de vos données, de vos accès et de vos contraintes réelles. Il sert à savoir quelle conversation vaut la peine d’être ouverte." : "A ten-question diagnostic does not replace a look at your data, your access and your real constraints. It tells you which conversation is worth opening."}</p>
          </article>
        </div>
        <p className="prose-body section-gap-sm">
          {fr ? "Pour aller plus loin : " : "To go further: "}
          <Link className="go" href={path(locale, ROUTES.useCases)}>{fr ? "les cas d’usage de l’IA en entreprise" : "AI use cases for business"}<ArrowRight aria-hidden /></Link>
          {" · "}
          <Link className="go" href={path(locale, ROUTES.solutions)}>{fr ? "les six familles de solutions IA sur mesure" : "the six families of custom AI solutions"}<ArrowRight aria-hidden /></Link>
          {" · "}
          <Link className="go" href={path(locale, ROUTES.work)}>{fr ? "nos réalisations et démonstrateurs" : "our work and demos"}<ArrowRight aria-hidden /></Link>
        </p>
      </Band>
    </Shell>
  );
}
