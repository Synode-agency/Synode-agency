import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Lede } from "@/components/site/lede";
import { Booking } from "@/components/site/booking";
import { UseCaseAccordion } from "@/components/site/use-case-accordion";
import { OperationalImpact } from "@/components/site/operational-impact";
import { businessUseCases } from "@/lib/business-use-cases";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/content";
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
      ? "Exemples de solutions sur mesure, avec l’IA intégrée, pour automatiser et améliorer les processus métier."
      : "Examples of custom solutions with built-in AI that automate and improve business processes.",
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
        kicker={fr ? "Cas d’usage" : "Use cases"}
        kickerMobileOnly
        title={fr ? <>Des <span>solutions</span> intégrées à vos processus métier</> : <><span>Solutions</span> built into your business processes</>}
      >
        <p>{fr ? "Découvrez comment l’intelligence artificielle peut répondre plus vite à vos clients, relier vos outils, exploiter vos chiffres et assister vos équipes au quotidien. Agents IA, intégrations, automatisations et logiciels métier sont combinés sur mesure, selon vos outils, vos données et vos règles métier." : "Discover how artificial intelligence can answer your clients faster, connect your tools, use your figures and support your teams every day. AI agents, integrations, automations and business software are combined around your tools, data and business rules."}</p>
        <div className="btn-row">
          <Link className="btn btn--primary" href={bookingHref}>{getContent(locale).site.cta}<ArrowRight aria-hidden /></Link>
          <Link className="btn btn--ghost" href="#exemples">{fr ? "Explorer les cas d’usage" : "Explore the use cases"}<ArrowDown aria-hidden /></Link>
        </div>
      </PageHero>

      <Band id="exemples" tone="white" className="studio-section use-cases-catalog">
        <Lede
          kicker={fr ? "22 cas d’usage" : "22 use cases"}
          title={fr ? "Du devis au pilotage,\ndes cas concrets" : "From quotes to reporting,\nconcrete cases"}
          accents={fr ? ["cas concrets"] : ["concrete cases"]}
          text={fr
            ? "Des situations concrètes, de l’équipe de quelques personnes à la grande organisation : devis, demandes de clients, documentation interne, appels d’offres, support interne, documents en volume, pilotage. Pour les grandes structures, chaque solution est aussi conçue en tenant compte de la sécurité, de l’intégration au système d’information et des exigences du RGPD et de l’AI Act, avec votre délégué à la protection des données. Elle est ensuite cadrée selon vos outils, vos données, vos règles et le niveau de contrôle humain que vous souhaitez."
            : "Concrete situations, from a team of a few people to a large organisation: quotes, client requests, internal documentation, tenders, internal support, high-volume documents, reporting. For larger organisations, every solution is also designed with security, integration with your existing IT systems and the requirements of the GDPR and the AI Act in mind, together with your data protection officer. It is then scoped around your tools, your data, your rules and the level of human control you want."}
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
              title={fr ? "Identifions votre\ncas d’usage IA" : "Let’s identify your\nAI use case"}
              accents={fr ? ["cas d’usage IA"] : ["AI use case"]}
              text={fr
                ? "En 30 minutes, Synode analyse avec vous un processus, ses contraintes et les outils concernés afin d’identifier un cas d’usage de l’intelligence artificielle pertinent pour votre entreprise."
                : "In 30 minutes, Synode reviews a process, its constraints and the tools involved with you to identify a relevant artificial intelligence use case for your business."}
            />
            <Link href="#calendrier-cas-usage" className="btn btn--primary">{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowDown aria-hidden /></Link>
            <p className="cta-note">{fr ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}<br />{fr ? "Un processus à améliorer suffit pour commencer." : "One process to improve is all it takes to begin."}</p>
          </div>
          <div id="calendrier-cas-usage" className="cta-booking-calendar"><Booking locale={locale} copy={getContent(locale).contact.booking} variant="card" /></div>
        </div>
      </CardPanel>
    </Shell>
  );
}
