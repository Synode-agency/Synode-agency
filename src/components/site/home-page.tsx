import Link from "next/link";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { SolutionSlices } from "@/components/site/solution-slices";
import { renderLines } from "@/lib/lines";
import { Booking } from "@/components/site/booking";
import { FaqAccordion } from "@/components/site/faq-accordion";
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
import { organizationAlternateName, organizationName, sameAsField } from "@/lib/organization";

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
          ? "Agence technologique basée à Bruxelles, spécialisée en intelligence artificielle, en intégration de systèmes et en développement de logiciels sur mesure : agents IA, intégrations, automatisations, logiciels métier, data et formation."
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


  const capabilityItems = fr ? [
    "Agents IA",
    "Intégrations & systèmes connectés",
    "Automatisations intelligentes",
    "Logiciels & applications sur mesure",
    "Data & intelligence",
    "Formation & adoption IA",
    "Cadrage des besoins",
    "Maintenance & évolution",
  ] : [
    "AI Agents",
    "Integrations & Connected Systems",
    "Intelligent Automations",
    "Custom Software & Applications",
    "Data & Intelligence",
    "AI Training & Adoption",
    "Needs assessment",
    "Maintenance & changes",
  ];

  return <Shell locale={locale}>
    {/* ⚠ Les DEUX langues. Le graphe ne sortait que sur l'accueil français,
        donc `/en` n'avait aucune donnée structurée : ni l'organisation, ni le
        site, ni la zone desservie. Ses valeurs suivent maintenant la
        langue. */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <PageHero
      layout="feature"
      className="home-page-hero"
      kicker={fr ? "Agence technologique · Bruxelles" : "Technology agency · Brussels"}
      kickerMobileOnly
      /* Une seule phrase, à toutes les tailles d'écran. Les mots peints
         portent `title-accent` et sont des enfants directs du `h1` ; le texte
         autour reste un nœud de texte, il garde donc la couleur du titre. */
      title={<>
        {/* Le message de Synode depuis le 14/11/2026 : une entreprise
            technologique, et non une « agence IA ». Les trois domaines en
            une phrase : le sur-mesure (les logiciels), les systèmes
            connectés (l'intégration) et l'intelligence artificielle. */}
        {fr ? "Des systèmes sur mesure, " : "Custom systems, "}
        <span className="title-accent">{fr ? "connectés" : "connected"}</span>
        {fr ? " et " : " and "}
        <span className="title-accent">{fr ? "intelligents" : "intelligent"}</span>
      </>}
      strip={<div className="capability-strip">
        <span className="capability-strip-label">{fr ? "De votre besoin à votre outil" : "From your need to your tool"}</span>
        <div className="capability-marquee" role="list" tabIndex={0} aria-label={fr ? "Expertises mobilisables (le défilement s’arrête au toucher ou au clavier)" : "Available capabilities (scrolling stops on touch or keyboard focus)"}>
          <div className="capability-marquee-track">
            <div className="capability-marquee-group">{capabilityItems.map((item) => <span role="listitem" className="capability-marquee-item" key={item}><Check aria-hidden />{item}</span>)}</div>
            <div className="capability-marquee-group" aria-hidden>{capabilityItems.map((item) => <span className="capability-marquee-item" key={item}><Check aria-hidden />{item}</span>)}</div>
          </div>
        </div>
      </div>}
    >
      <p>{fr ? "Synode est une agence technologique basée à Bruxelles, spécialisée en intelligence artificielle, en intégration de systèmes et en développement de logiciels sur mesure. Nous connectons les outils de votre organisation, concevons les logiciels dont vos équipes ont besoin et y intégrons l’IA pour automatiser vos processus, analyser vos données et faciliter votre quotidien." : "Synode is a Brussels-based technology agency specialising in artificial intelligence, systems integration and custom software development. We connect your organisation’s tools, build the software your teams need and bring in AI to automate your processes, analyse your data and make your day-to-day easier."}</p>
      <div className="btn-row"><Link href={bookHref} className="btn btn--primary">{fr ? "Parler de votre besoin" : "Tell us about your need"}<ArrowRight aria-hidden /></Link><Link href={path(locale, ROUTES.solutions)} className="btn btn--ghost">{fr ? "Découvrir nos solutions" : "Explore our solutions"}</Link></div>
      <span className="hero-reassurance">{fr ? "Un premier échange gratuit, sans engagement." : "A free first conversation. No commitment."}</span>
    </PageHero>

    <Band id="cas-usage" tone="white" className="studio-section home-usecases-light">
      <div className="section-heading daily-section-heading"><Lede kicker={fr ? "Usages de l’IA en entreprise" : "AI use cases for business"} title={fr ? "Quand l’IA s’intègre\nà vos processus métier" : "When AI becomes part of\nyour business processes"} accents={fr ? ["processus"] : ["processes"]} text={fr ? "L’IA devient un véritable outil de travail dans l’entreprise : elle peut répondre plus vite à vos clients, relier vos outils, garder la mémoire de l’entreprise et assister vos équipes là où le temps, l’information et les décisions se dispersent." : "AI becomes a real working tool within the business: it can answer your clients faster, connect your tools, keep the company’s memory and support your teams wherever time, information and decisions become scattered."} /><div className="daily-section-aside"><p className="section-side-text">{fr ? "Ces exemples montrent comment l’intelligence artificielle peut répondre à des difficultés fréquentes en entreprise. Votre besoin peut être différent : nous l’étudions à partir de votre organisation, de vos outils, de vos données et de vos priorités." : "These examples show how artificial intelligence can address common business challenges. Your need may be different: we study it in the context of your organisation, tools, data and priorities."}</p><Link className="go" href={path(locale, ROUTES.useCases)}>{fr ? "Découvrir tous les cas d’usage" : "Explore all use cases"}<ArrowRight aria-hidden /></Link></div></div>
      <UseCaseAccordion items={featuredBusinessUseCases(locale)} locale={locale} />
      <div className="daily-open-callout"><div><span className="eyebrow"><span className="status-dot" />{fr ? "Votre situation est unique" : "Your situation is unique"}</span><h3>{renderLines(fr ? "Votre besoin ne correspond pas exactement à\nces cas d’usage IA ?|C’est normal." : "Your need doesn’t quite match\nthese AI use cases? That is normal.")}</h3><p>{renderLines(fr ? "Une solution sur mesure commence par votre organisation, vos contraintes et\nvos priorités, pas par une liste de fonctionnalités prédéfinies." : "A custom solution starts with your organisation, constraints and\npriorities, not a predefined list of features.")}</p></div><Link className="btn btn--primary" href={contactHref}>{fr ? "Décrire votre besoin" : "Describe your need"}<ArrowRight aria-hidden /></Link></div>
    </Band>

    <Band id="offre" tone="base" className="studio-section home-solutions-light solutions-light">
      <div className="section-heading"><Lede kicker={fr ? "Six familles de solutions" : "Six solution families"} title={fr ? "Nos solutions sur mesure,\navec l’IA intégrée" : "Our custom solutions,\nwith built-in AI"} accents={fr ? ["sur mesure"] : ["custom solutions"]} text={fr ? "Chaque solution combine trois savoir-faire : l’IA, la connexion de vos logiciels et le développement sur mesure. Nous ne mobilisons que ceux dont votre projet a besoin." : "Every solution draws on three skills: AI, connecting your software and custom development. We only bring in the ones your project needs."} /><Link className="go" href={path(locale, ROUTES.solutions)}>{fr ? "Découvrir toutes nos solutions" : "Explore all our solutions"}<ArrowRight aria-hidden /></Link></div>
      <SolutionSlices items={getContent(locale).solutions.bricks} locale={locale} />
      <p className="families-note">
        {fr ? (
          <>
            Les solutions peuvent être accompagnées dans le temps{" "}
            par du monitoring, de la maintenance{" "}
            et des évolutions selon les besoins du projet.
          </>
        ) : (
          <>
            Solutions can be supported over time{" "}
            with monitoring, maintenance and changes,{" "}
            according to the needs of the project.
          </>
        )}
      </p>
    </Band>

    <Band id="impact-operationnel" tone="base" className="studio-section home-impact-light operational-impact-band">
      <OperationalImpact locale={locale} />
    </Band>

    <Band id="confiance" tone="white" className="studio-section trust-section home-trust-light">
      <div className="section-heading"><Lede kicker={fr ? "Sécurité, confidentialité et contrôle de vos systèmes" : "Security, confidentiality and control of your systems"} title={fr ? "Des solutions conçues pour protéger vos données et garder le contrôle" : "Solutions designed to protect your data and keep you in control"} accents={fr ? ["protéger vos données", "garder le contrôle"] : ["protect your data", "keep you in control"]} text={fr ? "La confidentialité, la protection des données, la gestion des accès et les validations humaines sont intégrées dès la conception de chaque projet. Les accès aux informations de votre entreprise sont définis avec vous et limités aux systèmes et aux personnes qui en ont besoin." : "Confidentiality, data protection, access management and human approvals are built in from the design stage of every project. Access to your company information is agreed with you and limited to the systems and people that need it."} /></div>
      <TrustSteps locale={locale} />
    </Band>

    <Band id="approche" tone="base" className="studio-section home-dark-band home-method-dark mfr-band">
      {/* Même composition que la section jumelle de la page Solutions : le
          texte à gauche, le cadre des six étapes à droite. Les deux pages
          partagent le composant, elles doivent partager la mise en page. */}
      <div className="mfr-layout">
        <div className="mfr-copy">
          <Lede kicker={fr ? "Conception & développement" : "Design & development"} title={fr ? "Notre méthode\npour votre projet" : "Our method\nfor your project"} accents={fr ? ["méthode"] : ["method"]} text={fr ? "Du cadrage du besoin métier à la maintenance, un projet Synode suit six étapes. Chacune produit un résultat concret : un périmètre validé, une architecture adaptée, un développement testé, une intégration à vos logiciels existants, des équipes formées et un suivi technique défini." : "From scoping the business need to maintenance, a Synode project runs in six stages. Each one produces a concrete result: an agreed scope, a fitting architecture, tested development, integration with your existing software, trained teams and a defined level of technical monitoring."} />
        </div>
        <MethodFrame locale={locale} />
      </div>
    </Band>

    <Band id="realisations" tone="white" className="studio-section home-work-light">
      <div className="section-heading"><Lede kicker={fr ? "Réalisations" : "Work"} title={fr ? "Nos réalisations :\nIA et logiciels métier" : "Our work:\nAI and business software"} accents={fr ? ["logiciels métier"] : ["business software"]} text={fr ? "Nexus et Coory sont des logiciels métier que nous avons conçus et développés nous-mêmes, avec l’IA là où elle sert. Chaque réalisation est présentée avec son état réel, sans résultat inventé." : "Nexus and Coory are business applications we designed and built ourselves, with AI where it helps. Each one is presented with its actual status, with no invented results."} /><Link className="go" href={path(locale, ROUTES.work)}>{fr ? "Voir toutes nos réalisations" : "See all our work"}<ArrowRight aria-hidden /></Link></div>
      <HomeWorkCards locale={locale} />
    </Band>

    <Band id="outils" tone="base" className="studio-section home-tools-light">
      <div className="section-heading"><Lede kicker={fr ? "Diagnostics IA" : "AI diagnostics"} title={fr ? "Diagnostiquez vos processus\navant d’intégrer l’IA" : "Assess your processes\nbefore bringing in AI"} accents={fr ? ["vos processus"] : ["your processes"]} text={fr ? "Identifiez le processus à examiner, vérifiez les premières conditions de faisabilité puis structurez votre besoin avant d’échanger avec Synode. Chaque outil répond à une question différente et fonctionne sans transmettre vos réponses." : "Identify the process to examine, check the first feasibility conditions and structure your need before speaking with Synode. Each tool answers a different question and works without sending your answers."} /></div>
      <ToolsSection locale={locale} />
    </Band>

    <CardPanel id="conclusion" className="booking-cta dark-cta home-booking-cta">
      <div className="col card-body cta-panel cta-booking-grid">
        <div className="cta-booking-copy"><span className="eyebrow">{fr ? "Échange découverte gratuit" : "Free discovery call"}</span><Lede title={fr ? "Parlons de votre projet" : "Let’s discuss your project"} accents={fr ? ["votre projet"] : ["project"]} text={fr ? "En 30 minutes, Synode prend le temps de comprendre votre activité, vos outils et le processus à améliorer afin d’identifier une première piste adaptée à votre entreprise." : "In 30 minutes, Synode takes the time to understand your business, tools and the process you want to improve, then identify a first direction suited to your company."} /><Link href="#calendrier-accueil" className="btn btn--primary">{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowDown aria-hidden /></Link><p className="cta-note">{fr ? "30 minutes, sans engagement. " : "30 minutes. No commitment. "}<br className="only-desktop" />{fr ? "Un besoin concret suffit pour commencer." : "A concrete need is all it takes to begin."}</p></div>
        <div id="calendrier-accueil" className="cta-booking-calendar"><Booking locale={locale} variant="card" /></div>
      </div>
    </CardPanel>

    <Band id="faq" tone="base" className="studio-section home-faq home-faq-light">
      <Lede kicker={home.faq.kicker} title={home.faq.title} accents={fr ? ["solutions sur mesure"] : ["custom solutions"]} />
      <div className="section-gap"><FaqAccordion items={home.faq.items} /></div>
    </Band>

    <Band tone="white" className="home-cta-reminder">
      <div className="home-cta-reminder-card">
        <div>
          {/* Le seul surtitre peint en bleu du site : il tient lieu de titre de
              cette carte de rappel, le h2 en dessous étant une question. */}
          <span className="eyebrow eyebrow--accent">{fr ? "Votre projet" : "Your project"}</span>
          <h2>{fr ? <>Votre besoin mérite<br className="only-mobile" /> d’être étudié ?</> : "Is your need worth exploring?"}</h2>
          <p>{fr ? "Présentez-nous votre processus et vérifions ensemble si une solution sur mesure est pertinente pour votre activité." : "Tell us about your process and let’s assess whether a custom solution makes sense for your business."}</p>
        </div>
        <Link href={bookHref} className="btn btn--primary">
          {fr ? "Réserver un échange gratuit" : "Book a free call"}
          <ArrowRight aria-hidden />
        </Link>
      </div>
    </Band>
  </Shell>;
}
