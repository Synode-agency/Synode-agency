import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { SolutionSlices } from "@/components/site/solution-slices";
import { renderLines } from "@/lib/lines";
import { Booking } from "@/components/site/booking";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { HeroStage } from "@/components/site/hero-stage";
import { PageHero } from "@/components/site/page-hero";
import { TrustSteps } from "@/components/site/trust-steps";
import { MethodFrame } from "@/components/site/method-frame";
import { UseCaseAccordion } from "@/components/site/use-case-accordion";
import { OperationalImpact } from "@/components/site/operational-impact";
import { ToolsSection } from "@/components/site/tools/tools-section";
import { HomeWorkCards } from "@/components/site/home-work-cards";
import { featuredBusinessUseCases } from "@/lib/business-use-cases";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export function HomePage({ locale }: { locale: Locale }) {
  const { site, home } = getContent(locale);
  const fr = locale === "fr";
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const contactHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Synode",
        alternateName: "Synode Agency",
        inLanguage: ["fr-BE", "en-BE"],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Synode",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/synode-logo.png`,
        email: site.email,
        description: "Solutions IA sur mesure, agents IA, automatisations, intégrations et logiciels métier conçus autour des outils et des données de chaque entreprise.",
        areaServed: [
          { "@type": "City", name: "Bruxelles" },
          { "@type": "Country", name: "Belgique" },
        ],
        knowsAbout: ["Agents IA", "Automatisation IA", "Logiciels IA sur mesure", "Intégrations", "Data et intelligence artificielle"],
      },
    ],
  };


  const capabilityItems = fr ? [
    "Conseil & consultance IA",
    "Cadrage des besoins",
    "Assistants & agents IA",
    "Automatisations",
    "Intégrations",
    "Logiciels métier",
    "Data & intelligence",
    "Formation & adoption",
    "Maintenance & monitoring",
  ] : [
    "AI consulting",
    "Needs assessment",
    "AI assistants & agents",
    "Automations",
    "Integrations",
    "Business software",
    "Data & intelligence",
    "Training & adoption",
    "Maintenance & monitoring",
  ];

  return <Shell locale={locale}>
    {fr && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />}
    <PageHero
      layout="feature"
      title={<>{fr ? "Transformez vos opérations avec des" : "Transform your operations with"}{"\u00a0"}<span>{fr ? "solutions IA sur mesure." : "custom AI solutions."}</span></>}
      aside={<div className="studio-demo"><HeroStage locale={locale} /></div>}
      strip={<div className="capability-strip">
        <span className="capability-strip-label">{fr ? "De votre besoin à votre outil" : "From your need to your tool"}</span>
        <div className="capability-marquee" role="list" aria-label={fr ? "Expertises mobilisables" : "Available capabilities"}>
          <div className="capability-marquee-track">
            <div className="capability-marquee-group">{capabilityItems.map((item) => <span role="listitem" className="capability-marquee-item" key={item}><Check aria-hidden />{item}</span>)}</div>
            <div className="capability-marquee-group" aria-hidden>{capabilityItems.map((item) => <span className="capability-marquee-item" key={item}><Check aria-hidden />{item}</span>)}</div>
          </div>
        </div>
      </div>}
    >
      <p>{fr ? "Synode est une agence IA à Bruxelles spécialisée dans la conception et le développement de solutions IA sur mesure pour les entreprises — agents IA, automatisations, intégrations et logiciels métier — adaptées à vos outils, à vos données et à vos processus métier." : "Synode is an AI agency in Brussels specialising in the design and development of custom AI solutions for businesses — AI agents, automations, integrations and business software — adapted to your tools, your data and your business processes."}</p>
      <div className="btn-row"><Link href={bookHref} className="btn btn--primary">{fr ? "Parler de votre besoin" : "Tell us about your need"}<ArrowRight aria-hidden /></Link><Link href={path(locale, ROUTES.solutions)} className="btn btn--ghost">{fr ? "Découvrir nos solutions" : "Explore our solutions"}</Link></div>
      <span className="hero-reassurance">{fr ? "* Un premier échange gratuit, sans engagement." : "* A free first conversation. No commitment."}</span>
    </PageHero>

    <Band id="cas-usage" tone="white" className="studio-section home-usecases-light">
      <div className="section-heading daily-section-heading"><Lede kicker={fr ? "Usages de l’IA en entreprise" : "AI use cases for business"} title={fr ? "Quand l’IA s’intègre à vos processus métier" : "When AI becomes part of your business processes"} accents={fr ? ["processus"] : ["processes"]} text={fr ? "L’IA devient une véritable couche opérationnelle dans l’entreprise : elle peut relier vos outils, exploiter vos données et vos connaissances internes, orchestrer des processus complexes et assister vos équipes là où le temps, l’information et les décisions se dispersent." : "AI becomes an operational layer within the business: it can connect your tools, use your data and internal knowledge, orchestrate complex processes and support your teams wherever time, information and decisions become scattered."} /><div className="daily-section-aside"><p className="section-side-text">{fr ? "Ces exemples montrent comment l’intelligence artificielle peut répondre à des difficultés fréquentes en entreprise. Votre besoin peut être différent : nous l’étudions à partir de votre organisation, de vos outils, de vos données et de vos priorités." : "These examples show how artificial intelligence can address common business challenges. Your need may be different: we study it in the context of your organisation, tools, data and priorities."}</p><Link className="go" href={path(locale, ROUTES.useCases)}>{fr ? "Découvrir tous les cas d’usage" : "Explore all use cases"}<ArrowRight aria-hidden /></Link></div></div>
      <UseCaseAccordion items={featuredBusinessUseCases(locale)} locale={locale} />
      <div className="daily-open-callout"><div><span className="eyebrow"><span className="status-dot" />{fr ? "Votre situation est unique" : "Your situation is unique"}</span><h3>{renderLines(fr ? "Votre besoin ne correspond pas exactement à\nces cas d’usage IA ? C’est normal." : "Your need doesn’t quite match\nthese AI use cases? That is normal.")}</h3><p>{renderLines(fr ? "Une solution IA sur mesure commence par votre organisation, vos contraintes et\nvos priorités, pas par une liste de fonctionnalités prédéfinies." : "A custom AI solution starts with your organisation, constraints and\npriorities, not a predefined list of features.")}</p></div><Link className="btn btn--primary" href={contactHref}>{fr ? "Parler de votre besoin" : "Tell us about your need"}<ArrowRight aria-hidden /></Link></div>
    </Band>

    <Band id="offre" tone="base" className="studio-section home-solutions-light solutions-light">
      <div className="section-heading"><Lede kicker={fr ? "Solutions IA sur mesure" : "Custom AI solutions"} title={fr ? "Nos solutions pour intégrer l’IA à vos processus métier" : "Our solutions for integrating AI into your business processes"} accents={["solutions"]} text={fr ? "Chaque solution IA sur mesure est conçue en combinant les expertises adaptées à votre environnement, afin de connecter vos outils, mieux exploiter vos données et faire évoluer vos processus métier." : "Every custom AI solution combines the capabilities suited to your environment to connect your tools, make better use of your data and improve your business processes."} /><Link className="go" href={path(locale, ROUTES.solutions)}>{fr ? "Découvrir toutes nos solutions IA" : "Explore all our AI solutions"}<ArrowRight aria-hidden /></Link></div>
      <SolutionSlices items={getContent(locale).solutions.bricks} locale={locale} />
      <p className="families-note">
        {fr
          ? "Les solutions peuvent être accompagnées dans le temps par du monitoring, de la maintenance et des évolutions selon les besoins du projet.\u2009*"
          : "Solutions can be supported over time with monitoring, maintenance and changes, according to the needs of the project.\u2009*"}
      </p>
    </Band>

    <Band id="impact-operationnel" tone="base" className="studio-section home-impact-light operational-impact-band">
      <OperationalImpact locale={locale} />
    </Band>

    <Band id="confiance" tone="white" className="studio-section trust-section home-trust-light">
      <div className="section-heading"><Lede kicker={fr ? "Sécurité, confidentialité et contrôle des systèmes IA" : "Security, confidentiality and control of AI systems"} title={fr ? "Des solutions IA conçues pour protéger vos données et garder le contrôle." : "AI solutions designed to protect your data and keep you in control."} accents={fr ? ["protéger vos données", "garder le contrôle."] : ["protect your data", "keep you in control."]} text={fr ? "La confidentialité, la protection des données, la gestion des accès et les validations humaines sont intégrées dès la conception de chaque projet IA. Les informations de votre entreprise restent accessibles uniquement aux systèmes et aux personnes autorisées, selon les besoins définis avec vous." : "Confidentiality, data protection, access management and human approvals are built in from the design stage of every AI project. Your company information stays available only to authorised systems and people, according to the needs agreed with you."} /></div>
      <TrustSteps locale={locale} />
    </Band>

    <Band id="approche" tone="base" className="studio-section home-dark-band home-method-dark mfr-band">
      {/* Même composition que la section jumelle de la page Solutions : le
          texte à gauche, le cadre des six étapes à droite. Les deux pages
          partagent le composant, elles doivent partager la mise en page. */}
      <div className="mfr-layout">
        <div className="mfr-copy">
          <div className="section-heading"><Lede kicker={fr ? "Conception & Développement IA" : "AI design & development"} title={fr ? "Notre méthode pour\nvotre projet IA." : "Our method for\nyour AI project."} accents={fr ? ["méthode"] : ["method"]} text={fr ? "Du cadrage du besoin métier à la maintenance, un projet IA Synode suit six étapes. Chacune produit un résultat concret : un périmètre validé, une architecture adaptée, un développement testé, une intégration à vos logiciels existants, des équipes formées et un suivi technique défini." : "From scoping the business need to maintenance, a Synode AI project runs in six stages. Each one produces a concrete result: an agreed scope, a fitting architecture, tested development, integration with your existing software, trained teams and a defined level of technical monitoring."} /></div>
        </div>
        <MethodFrame locale={locale} />
      </div>
    </Band>

    <Band id="realisations" tone="white" className="studio-section home-work-light">
      <div className="section-heading"><Lede kicker={fr ? "Réalisations" : "Work"} title={fr ? "Nos réalisations en\nsolutions IA sur mesure" : "Our work in custom AI solutions"} accents={fr ? ["solutions IA"] : ["AI solutions"]} text={fr ? "Découvrez nos projets IA, démonstrateurs et solutions développées autour des agents IA, de l’automatisation, des intégrations et des outils métier. Chaque réalisation est présentée avec un statut clair, qu’il s’agisse d’un projet interne, d’un démonstrateur ou d’un projet client autorisé." : "Explore our AI projects, demonstrators and solutions built around AI agents, automation, integrations and business tools. Every piece of work is presented with a clear status, whether it is an internal project, a demonstrator or an authorised client project."} /><Link className="go" href={path(locale, ROUTES.work)}>{fr ? "Voir toutes nos réalisations IA" : "See all our AI work"}<ArrowRight aria-hidden /></Link></div>
      <HomeWorkCards locale={locale} />
    </Band>

    <Band id="outils" tone="base" className="studio-section home-tools-light">
      <div className="section-heading"><Lede kicker={fr ? "Diagnostics IA" : "AI diagnostics"} title={fr ? "Diagnostiquez vos processus\navant d’intégrer l’IA" : "Assess your processes\nbefore bringing in AI"} accents={fr ? ["vos processus"] : ["your processes"]} text={fr ? "Identifiez le processus à examiner, vérifiez les premières conditions de faisabilité puis structurez votre besoin avant d’échanger avec Synode. Chaque outil répond à une question différente et fonctionne sans transmettre vos réponses." : "Identify the process to examine, check the first feasibility conditions and structure your need before speaking with Synode. Each tool answers a different question and works without sending your answers."} /></div>
      <ToolsSection locale={locale} />
    </Band>

    <CardPanel id="conclusion" className="booking-cta dark-cta">
      <div className="col card-body cta-panel cta-booking-grid">
        <div className="cta-booking-copy"><span className="eyebrow">{fr ? "Échange découverte gratuit" : "Free discovery call"}</span><Lede title={fr ? "Parlons de votre projet de solution IA." : "Let’s discuss your AI solution project."} text={fr ? "En 30 minutes, Synode prend le temps de comprendre votre activité, vos outils et le processus à améliorer afin d’identifier une première piste adaptée à votre entreprise." : "In 30 minutes, Synode takes the time to understand your business, tools and the process you want to improve, then identify a first direction suited to your company."} /><Link href="#calendrier-accueil" className="btn btn--primary">{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowRight aria-hidden /></Link><p className="cta-note">{fr ? "30 minutes, sans engagement." : "30 minutes. No commitment."}<br />{fr ? "Un besoin concret suffit pour commencer." : "A concrete need is all it takes to begin."}</p></div>
        <div id="calendrier-accueil" className="cta-booking-calendar"><Booking locale={locale} variant="card" /></div>
      </div>
    </CardPanel>

    <Band id="faq" tone="base" className="studio-section home-faq home-faq-light">
      <Lede kicker={home.faq.kicker} title={home.faq.title} accents={fr ? ["solutions IA sur mesure"] : ["custom AI solutions"]} />
      <div className="section-gap"><FaqAccordion items={home.faq.items} /></div>
    </Band>

    <Band tone="white" className="home-cta-reminder">
      <div className="home-cta-reminder-card">
        <div>
          <span className="eyebrow">{fr ? "Votre projet IA" : "Your AI project"}</span>
          <h2>{fr ? "Votre besoin mérite d’être étudié ?" : "Is your need worth exploring?"}</h2>
          <p>{fr ? "Présentez-nous votre processus et vérifions ensemble si une solution IA sur mesure est pertinente pour votre activité." : "Tell us about your process and let’s assess whether a custom AI solution makes sense for your business."}</p>
        </div>
        <Link href="#calendrier-accueil" className="btn btn--primary">
          {fr ? "Réserver un échange gratuit" : "Book a free call"}
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </Band>
  </Shell>;
}
