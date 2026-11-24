import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Hero } from "@/components/site/hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CaseCards } from "@/components/site/case-cards";
import { CtaSection } from "@/components/site/cta-section";
import { Founders, ProblemList, ProofStrip, ServiceCards, Steps } from "@/components/site/home-sections";
import { renderLines } from "@/lib/lines";
import { ROUTES, getContent, path, type Locale } from "@/content";
import { siteUrl } from "@/lib/site-url";
import { organizationAlternateName, organizationName, sameAsField } from "@/lib/organization";

/**
 * L'ACCUEIL DE LA REFONTE (brief, 6.1), réécrit le 24/11/2026.
 *
 * Huit sections au plus, et dans cet ordre : le hero avec la bande de
 * preuve, le problème du client, les trois services, les réalisations, les
 * trois étapes, les fondateurs, une FAQ courte, l'appel final. Un seul
 * bouton plein, le même partout. Tous les textes viennent de
 * `src/content/{fr,en}/home.ts` et `common.ts`.
 *
 * Les bandes alternent sombre et clair d'elles-mêmes (thème
 * `alternating`) : aucune ne force sa couleur.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const { site, home, team } = getContent(locale);
  const fr = locale === "fr";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: organizationName,
        alternateName: organizationAlternateName,
        inLanguage: ["fr-BE", "en-BE"],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: organizationName,
        alternateName: organizationAlternateName,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/synode-logo.png`,
        email: site.email,
        ...sameAsField,
        description: fr
          ? "Agence technologique basée à Bruxelles, spécialisée en intelligence artificielle, en intégration de systèmes et en développement de logiciels sur mesure : agents IA, intégrations, automatisations, logiciels métier, data et formation."
          : "Brussels-based technology agency specialising in artificial intelligence, systems integration and custom software development: AI agents, integrations, automations, business software, data and training.",
        areaServed: [
          { "@type": "City", name: fr ? "Bruxelles" : "Brussels" },
          { "@type": "Country", name: fr ? "Belgique" : "Belgium" },
        ],
        knowsAbout: fr
          ? ["Intelligence artificielle", "Agents IA", "Intégration de systèmes", "Intégration de logiciels et API", "Automatisation des processus", "Logiciels métier sur mesure", "Data et tableaux de bord", "Formation à l’IA"]
          : ["Artificial intelligence", "AI agents", "Systems integration", "Software and API integration", "Process automation", "Custom business software", "Data and dashboards", "AI training"],
      },
    ],
  };

  /* Une question sans réponse (« À compléter ») ne s'affiche pas. */
  const faq = home.faq.items.filter((item) => item.a.trim() !== "");

  return (
    <Shell locale={locale}>
      {/* Les données structurées, dans les deux langues. Revues à l'étape 12
          de la refonte (SEO). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <Hero
        locale={locale}
        layout="feature"
        className="home-page-hero home-hero"
        eyebrow={site.agency}
        title={renderLines(home.hero.title, home.hero.accents, "title-accent")}
        subtitle={home.hero.subtitle}
        primaryCta
        secondaryLink={{ href: path(locale, ROUTES.work), label: home.hero.secondaryLink }}
        note={site.ctaNote}
      >
        <ProofStrip proof={home.proof} />
      </Hero>

      <Band id="probleme" className="home-section">
        <Lede title={home.problems.title} />
        <div className="section-gap-sm">
          <ProblemList items={home.problems.items} />
        </div>
      </Band>

      <Band id="services" className="home-section">
        <Lede title={home.services.title} text={home.services.audience} />
        <div className="section-gap-sm">
          <ServiceCards locale={locale} services={home.services} />
        </div>
      </Band>

      <Band id="realisations" className="home-section">
        <div className="section-heading home-section-heading">
          <Lede title={home.work.title} />
          <Link className="go" href={path(locale, ROUTES.work)}>
            {home.work.link}
            <ArrowRight aria-hidden />
          </Link>
        </div>
        <div className="section-gap-sm">
          <CaseCards locale={locale} />
        </div>
      </Band>

      <Band id="etapes" className="home-section">
        <Lede title={site.steps.title} />
        <div className="section-gap-sm">
          <Steps steps={site.steps} />
        </div>
      </Band>

      <Band id="fondateurs" className="home-section">
        <div className="section-heading home-section-heading">
          <Lede title={home.founders.title} />
          {/* À propos n'existe pas encore (étape 7) : le lien mène à Équipe. */}
          <Link className="go" href={path(locale, ROUTES.team)}>
            {home.founders.link}
            <ArrowRight aria-hidden />
          </Link>
        </div>
        <div className="section-gap-sm">
          <Founders people={team.people} />
        </div>
      </Band>

      {faq.length > 0 && (
        <Band id="faq" className="home-section">
          <Lede title={home.faq.title} />
          <div className="section-gap-sm">
            <FaqAccordion items={faq} />
          </div>
        </Band>
      )}

      <CtaSection locale={locale} />
    </Shell>
  );
}
