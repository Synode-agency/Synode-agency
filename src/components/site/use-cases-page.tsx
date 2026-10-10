import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Lede } from "@/components/site/lede";
import { Booking } from "@/components/site/booking";
import { UseCaseAccordion } from "@/components/site/use-case-accordion";
import { OperationalImpact } from "@/components/site/operational-impact";
import { UseCaseTerminal } from "@/components/site/use-case-terminal";
import { businessUseCases } from "@/lib/business-use-cases";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export function UseCasesPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
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
          accents={fr ? ["solutions IA"] : ["AI solutions"]}
          text={fr
            ? "Agents IA, automatisations, intégrations, analyse de données et logiciels métier peuvent intervenir dans de nombreux processus d’entreprise : opérations, service client, ventes, finance, gestion documentaire ou planification. Chaque solution est cadrée selon votre environnement, vos données, vos règles métier et le niveau de contrôle humain requis."
            : "AI agents, automations, integrations, data analysis and business software can support many company processes: operations, customer service, sales, finance, document management or planning. Every solution is scoped around your environment, data, business rules and the required level of human control."}
        />
        <UseCaseAccordion items={cases} locale={locale} rich anchors />
      </Band>

      <Band id="impact-operationnel" tone="base" className="studio-section operational-impact-band">
        <OperationalImpact locale={locale} />
      </Band>

      <CardPanel id="conclusion" className="booking-cta dark-cta">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <span className="eyebrow">{fr ? "Échange découverte gratuit" : "Free discovery call"}</span>
            <Lede
              title={fr ? "Identifions votre\ncas d’usage IA." : "Let’s identify your\nAI use case."}
              accents={fr ? ["cas d’usage IA."] : ["AI use case."]}
              text={fr
                ? "En 30 minutes, Synode analyse avec vous un processus, ses contraintes et les outils concernés afin d’identifier un cas d’usage de l’intelligence artificielle pertinent pour votre entreprise."
                : "In 30 minutes, Synode reviews a process, its constraints and the tools involved with you to identify a relevant artificial intelligence use case for your business."}
            />
            <Link href="#calendrier-cas-usage" className="btn btn--primary">{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowRight aria-hidden /></Link>
            <p className="cta-note">{fr ? "30 minutes, sans engagement." : "30 minutes. No commitment."}<br />{fr ? "Un processus à améliorer suffit pour commencer." : "One process to improve is all it takes to begin."}</p>
          </div>
          <div id="calendrier-cas-usage" className="cta-booking-calendar"><Booking locale={locale} variant="card" /></div>
        </div>
      </CardPanel>
    </Shell>
  );
}
