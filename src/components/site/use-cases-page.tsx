import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Lede } from "@/components/site/lede";
import { renderLines } from "@/lib/lines";
import { BusinessUseCaseCards } from "@/components/site/business-use-case-cards";
import { OperationalImpact } from "@/components/site/operational-impact";
import { UseCaseTerminal } from "@/components/site/use-case-terminal";
import { businessUseCases } from "@/lib/business-use-cases";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export function UseCasesPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const contactHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const bookingHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const cases = businessUseCases(locale);
  const pagePath = path(locale, ROUTES.useCases);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: fr ? "Cas d’usage de l’IA en entreprise" : "AI use cases for business",
    description: fr
      ? "Exemples de solutions IA sur mesure pour automatiser et améliorer les processus métier."
      : "Examples of custom AI solutions that automate and improve business processes.",
    url: `${siteUrl}${pagePath}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: cases.length,
      itemListElement: cases.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${siteUrl}${pagePath}#${item.slug}`,
      })),
    },
  };

  return (
    <Shell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        title={fr ? <>Des <span>systèmes IA</span> intégrés à vos processus métier</> : <><span>AI systems</span> integrated into your business processes</>}
        aside={<UseCaseTerminal locale={locale} />}
      >
        <p>{fr ? "Découvrez comment l’intelligence artificielle peut connecter vos outils, exploiter vos données, orchestrer des processus complexes et assister vos équipes au quotidien. Agents IA, automatisations, intégrations et logiciels métier sont combinés sur mesure, selon vos outils, vos données et vos règles métier." : "Discover how artificial intelligence can connect your tools, use your data, orchestrate complex processes and support your teams every day. AI agents, automations, integrations and business software are combined around your tools, data and business rules."}</p>
        <div className="btn-row">
          <Link className="btn btn--primary" href={bookingHref}>{getContent(locale).site.ctaShort}<ArrowRight aria-hidden /></Link>
          <Link className="btn btn--ghost" href="#exemples">{fr ? "Explorer les cas d’usage" : "Explore the use cases"}</Link>
        </div>
      </PageHero>

      <Band id="exemples" tone="white" className="studio-section use-cases-catalog">
        <Lede
          title={fr ? "Des solutions IA intégrées à vos processus métier" : "AI solutions integrated into your business processes"}
          text={fr
            ? "Agents IA, automatisations, intégrations, analyse de données et logiciels métier peuvent intervenir dans de nombreux processus d’entreprise : opérations, service client, ventes, finance, gestion documentaire ou planification. Chaque solution est cadrée selon votre environnement, vos données, vos règles métier et le niveau de contrôle humain requis."
            : "AI agents, automations, integrations, data analysis and business software can support many company processes: operations, customer service, sales, finance, document management or planning. Every solution is scoped around your environment, data, business rules and the required level of human control."}
        />
        <div className="section-gap"><BusinessUseCaseCards items={cases} locale={locale} /></div>
      </Band>

      <Band id="impact-operationnel" tone="base" className="studio-section operational-impact-band">
        <OperationalImpact locale={locale} />
      </Band>

      <Band tone="white" className="studio-section use-cases-closing-band">
        <div className="daily-open-callout use-cases-final-cta">
          <div>
            <span className="eyebrow"><span className="status-dot" />{fr ? "Votre situation est unique" : "Your situation is unique"}</span>
            <h2>{renderLines(fr ? "Votre besoin ne correspond pas exactement à\nces cas d’usage IA ? C’est normal." : "Your need doesn’t quite match\nthese AI use cases? That is normal.")}</h2>
            <p>{renderLines(fr
              ? "Une solution IA sur mesure commence par votre organisation, vos contraintes et\nvos priorités, pas par une liste de fonctionnalités prédéfinies."
              : "A custom AI solution starts with your organisation, constraints and\npriorities, not a predefined list of features.")}</p>
          </div>
          <Link className="btn btn--primary" href={contactHref}>{fr ? "Parler de votre besoin" : "Tell us about your need"}<ArrowRight aria-hidden /></Link>
        </div>
      </Band>
    </Shell>
  );
}
