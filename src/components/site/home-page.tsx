import Link from "next/link";
import { Activity, ArrowRight, Check, LockKeyhole, Plug, UserCheck } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { renderLines } from "@/lib/lines";
import { Booking } from "@/components/site/booking";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { HeroStage } from "@/components/site/hero-stage";
import { PageHero } from "@/components/site/page-hero";
import { SolutionFamilies } from "@/components/site/solution-families";
import { BusinessUseCaseCards } from "@/components/site/business-use-case-cards";
import { OperationalImpact } from "@/components/site/operational-impact";
import { HomeWorkCards } from "@/components/site/home-work-cards";
import { featuredBusinessUseCases } from "@/lib/business-use-cases";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export function HomePage({ locale }: { locale: Locale }) {
  const { site, home, method } = getContent(locale);
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

  const trustItems = fr ? [
    { icon: LockKeyhole, title: "Confidentialité des données", text: "Vos données sont utilisées uniquement dans le cadre défini pour votre solution IA, avec des accès limités aux personnes et systèmes autorisés afin de préserver leur confidentialité." },
    { icon: UserCheck, title: "Contrôle humain", text: "Les décisions sensibles et les actions importantes peuvent rester soumises à une validation humaine afin de conserver un niveau de contrôle adapté à votre activité et à vos processus métier." },
    { icon: Plug, title: "Accès et intégrations sécurisés", text: "Les connexions à vos logiciels, bases de données et outils métier sont configurées avec des droits d’accès adaptés et limitées aux informations nécessaires au fonctionnement de votre solution IA." },
    { icon: Activity, title: "Suivi technique", text: "Le fonctionnement de votre système IA peut être surveillé afin de détecter les erreurs, comportements anormaux ou problèmes d’intégration et de maintenir la solution dans de bonnes conditions d’exploitation." },
  ] : [
    { icon: LockKeyhole, title: "Data confidentiality", text: "Your data is used only within the scope defined for your AI solution, with access restricted to authorised people and systems in order to keep it confidential." },
    { icon: UserCheck, title: "Human control", text: "Sensitive decisions and important actions can remain subject to human approval, to keep a level of control that suits your business and your processes." },
    { icon: Plug, title: "Secure access and integrations", text: "Connections to your software, databases and business tools are configured with appropriate access rights and limited to the information your AI solution needs to operate." },
    { icon: Activity, title: "Technical monitoring", text: "Your AI system can be monitored to detect errors, unusual behaviour or integration problems, and to keep the solution in good operating condition." },
  ];

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
      <p>{fr ? "Synode est votre agence de solutions IA pour concevoir, développer et faire évoluer des solutions IA sur mesure — agents IA, automatisations, intégrations et logiciels métier — intégrées à vos outils, vos données et votre manière de travailler." : "Synode is your AI partner for designing, developing and evolving custom solutions: AI agents, automations, integrations and business software, integrated with your tools, data and ways of working."}</p>
      <div className="btn-row"><Link href={bookHref} className="btn btn--primary">{fr ? "Parler de votre besoin" : "Tell us about your need"}<ArrowRight aria-hidden /></Link><Link href={path(locale, ROUTES.solutions)} className="btn btn--ghost">{fr ? "Découvrir nos solutions" : "Explore our solutions"}</Link></div>
      <span className="hero-reassurance">{fr ? "* Un premier échange gratuit, sans engagement." : "* A free first conversation. No commitment."}</span>
    </PageHero>

    <Band id="cas-usage" tone="white" className="studio-section home-usecases-light">
      <div className="section-heading daily-section-heading"><Lede kicker={fr ? "Usages de l’IA en entreprise" : "AI use cases for business"} title={fr ? "Quand l’IA s’intègre à vos processus métier" : "When AI becomes part of your business processes"} accents={fr ? ["processus"] : ["processes"]} text={fr ? "L’IA devient une véritable couche opérationnelle dans l’entreprise : elle peut relier vos outils, exploiter vos données et vos connaissances internes, orchestrer des processus complexes et assister vos équipes là où le temps, l’information et les décisions se dispersent." : "AI becomes an operational layer within the business: it can connect your tools, use your data and internal knowledge, orchestrate complex processes and support your teams wherever time, information and decisions become scattered."} /><div className="daily-section-aside"><p className="section-side-text">{fr ? "Ces exemples montrent comment l’intelligence artificielle peut répondre à des difficultés fréquentes en entreprise. Votre besoin peut être différent : nous l’étudions à partir de votre organisation, de vos outils, de vos données et de vos priorités." : "These examples show how artificial intelligence can address common business challenges. Your need may be different: we study it in the context of your organisation, tools, data and priorities."}</p><Link className="go" href={path(locale, ROUTES.useCases)}>{fr ? "Découvrir tous les cas d’usage" : "Explore all use cases"}<ArrowRight aria-hidden /></Link></div></div>
      <BusinessUseCaseCards items={featuredBusinessUseCases(locale)} locale={locale} preserveHomeAnchors />
      <div className="daily-open-callout"><div><span className="eyebrow"><span className="status-dot" />{fr ? "Votre situation est unique" : "Your situation is unique"}</span><h3>{renderLines(fr ? "Votre besoin ne correspond pas exactement à\nces cas d’usage IA ? C’est normal." : "Your need doesn’t quite match\nthese AI use cases? That is normal.")}</h3><p>{renderLines(fr ? "Une solution IA sur mesure commence par votre organisation, vos contraintes et\nvos priorités, pas par une liste de fonctionnalités prédéfinies." : "A custom AI solution starts with your organisation, constraints and\npriorities, not a predefined list of features.")}</p></div><Link className="btn btn--primary" href={contactHref}>{fr ? "Parler de votre besoin" : "Tell us about your need"}<ArrowRight aria-hidden /></Link></div>
    </Band>

    <Band id="offre" tone="base" className="studio-section home-solutions-light">
      <div className="section-heading"><Lede kicker={fr ? "Solutions IA sur mesure" : "Custom AI solutions"} title={fr ? "Nos solutions pour intégrer l’IA à vos processus métier" : "Our solutions for integrating AI into your business processes"} accents={["solutions"]} text={fr ? "Chaque solution IA sur mesure est conçue en combinant les expertises adaptées à votre environnement, afin de connecter vos outils, mieux exploiter vos données et faire évoluer vos processus métier." : "Every custom AI solution combines the capabilities suited to your environment to connect your tools, make better use of your data and improve your business processes."} /><Link className="go" href={path(locale, ROUTES.solutions)}>{fr ? "Découvrir toutes nos solutions IA" : "Explore all our AI solutions"}<ArrowRight aria-hidden /></Link></div>
      <SolutionFamilies locale={locale} showIndex={false} />
    </Band>

    <Band id="impact-operationnel" tone="base" className="studio-section home-impact-light operational-impact-band">
      <OperationalImpact locale={locale} />
    </Band>

    <Band id="confiance" tone="white" className="studio-section trust-section home-trust-light">
      <div className="section-heading"><Lede kicker={fr ? "Sécurité, confidentialité et contrôle des systèmes IA" : "Security, confidentiality and control of AI systems"} title={fr ? "Des solutions IA conçues pour protéger vos données et garder le contrôle." : "AI solutions designed to protect your data and keep you in control."} accents={fr ? ["protéger vos données", "garder le contrôle."] : ["protect your data", "keep you in control."]} text={fr ? "La confidentialité, la protection des données, la gestion des accès et les validations humaines sont intégrées dès la conception de chaque projet IA. Les informations de votre entreprise restent accessibles uniquement aux systèmes et aux personnes autorisées, selon les besoins définis avec vous." : "Confidentiality, data protection, access management and human approvals are built in from the design stage of every AI project. Your company information stays available only to authorised systems and people, according to the needs agreed with you."} /></div>
      <div className="trust-grid">{trustItems.map(({ icon: Icon, title, text }, index) => <article key={title} className="trust-card"><div><span className="trust-icon"><Icon aria-hidden /></span><span className="trust-index" aria-hidden>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
    </Band>

    <Band id="approche" tone="base" className="studio-section home-dark-band home-method-dark">
      <div className="section-heading"><Lede kicker={fr ? "Conception & Développement IA" : "AI design & development"} title={fr ? "De votre besoin au déploiement :\nnotre méthode pour votre projet IA" : "From your need to deployment:\nour method for your AI project"} accents={fr ? ["méthode"] : ["method"]} text={fr ? "Du premier échange au déploiement, puis au suivi, nous concevons votre solution IA étape par étape. Le périmètre, les données, les accès, les validations et les résultats attendus sont définis avec vous dès le début du projet." : "From the first conversation to deployment and ongoing support, we build your AI solution step by step. Scope, data, access, approvals and expected outcomes are agreed with you from the start of the project."} /></div>
      <div className="method-ledger">
        <div className="method-ledger-head" aria-hidden>
          <span />
          <span>{fr ? "Étape" : "Stage"}</span>
          <span>{method.columns.client}</span>
          <span>{method.columns.work}</span>
        </div>
        <ol>
          {method.steps.map((step, index) => <li key={step.title}>
            <span className="method-ledger-index">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p className="method-ledger-client"><span className="method-ledger-label">{fr ? "Avec vous" : "With you"}</span>{step.client}</p>
            <p className="method-ledger-work"><span className="method-ledger-label">{fr ? "Côté Synode" : "Synode side"}</span>{step.work}</p>
          </li>)}
        </ol>
      </div>
      <p className="method-ledger-note">{fr ? "Le premier échange dure 30 minutes, il est gratuit et sans engagement. Le périmètre, le budget, les délais et les modalités de suivi sont ensuite précisés dans le devis. Les évolutions importantes font l’objet d’un nouvel accord." : "The first conversation takes 30 minutes, is free and has no commitment. Scope, budget, timelines and support terms are then set out in the quote. Major changes require a new agreement."}</p>
    </Band>

    <Band id="realisations" tone="white" className="studio-section home-work-light">
      <div className="section-heading"><Lede kicker={fr ? "Réalisations" : "Work"} title={fr ? "Nos réalisations en intelligence artificielle" : "Our work in artificial intelligence"} accents={fr ? ["réalisations"] : ["work"]} text={fr ? "Découvrez nos projets IA, démonstrateurs et solutions développées autour des agents IA, de l’automatisation, des intégrations et des outils métier. Chaque réalisation est présentée avec un statut clair, qu’il s’agisse d’un projet interne, d’un démonstrateur ou d’un projet client autorisé." : "Explore our AI projects, demonstrators and solutions built around AI agents, automation, integrations and business tools. Every piece of work is presented with a clear status, whether it is an internal project, a demonstrator or an authorised client project."} /><Link className="go" href={path(locale, ROUTES.work)}>{fr ? "Voir toutes nos réalisations IA" : "See all our AI work"}<ArrowRight aria-hidden /></Link></div>
      <HomeWorkCards locale={locale} />
    </Band>

    <Band id="outils" tone="base" className="studio-section home-tools-light">
      <div className="section-heading"><Lede kicker={fr ? "Outils & Diagnostics IA" : "AI tools & diagnostics"} title={fr ? "Des diagnostics interactifs pour situer le potentiel IA de votre entreprise" : "Interactive diagnostics to situate your company’s AI potential"} accents={fr ? ["diagnostics"] : ["diagnostics"]} text={fr ? "Analysez vos processus, vos outils et vos données grâce à nos diagnostics interactifs afin d’identifier les opportunités d’automatisation, d’intégration et d’intelligence artificielle qui méritent réellement d’être étudiées." : "Analyse your processes, your tools and your data with our interactive diagnostics to identify the opportunities for automation, integration and artificial intelligence that genuinely deserve to be studied."} /></div>
      <div className="tools-grid">
        <Link className="tool-card" href={path(locale, ROUTES.aiDiagnostic)}>
          <div className="tool-card-top"><span className="tool-card-kind">{fr ? "Outil interactif" : "Interactive tool"}</span><span className="tool-card-state"><i aria-hidden />{fr ? "Disponible" : "Available"}</span></div>
          <h3>{fr ? "Diagnostic du potentiel IA" : "AI potential diagnostic"}</h3>
          <p>{fr ? "Analysez un processus de votre entreprise en quelques minutes et identifiez les possibilités d’automatisation, d’intégration, d’exploitation des données ou d’assistance par l’intelligence artificielle." : "Analyse one of your business processes in a few minutes and identify the opportunities for automation, integration, data use or support from artificial intelligence."}</p>
          <ul className="tool-card-meta">
            <li>{fr ? "10 questions" : "10 questions"}</li>
            <li>{fr ? "Sans inscription" : "No sign-up"}</li>
            <li>{fr ? "Résultat immédiat" : "Immediate result"}</li>
          </ul>
          <span className="btn btn--primary">{fr ? "Analyser un processus" : "Analyse a process"}<ArrowRight aria-hidden /></span>
        </Link>
        <div className="tool-slot" aria-hidden>
          <span className="tool-slot-label">{fr ? "D’autres diagnostics suivront" : "More diagnostics will follow"}</span>
          <p>{fr ? "Fragmentation des outils, préparation des données, automatisabilité d’un processus. Ils apparaîtront ici une fois construits et testés." : "Tool fragmentation, data readiness, how automatable a process is. They will appear here once built and tested."}</p>
        </div>
      </div>
    </Band>

    <Band id="faq" tone="base" className="studio-section home-faq home-faq-light">
      <Lede kicker={home.faq.kicker} title={home.faq.title} />
      <div className="section-gap"><FaqAccordion items={home.faq.items} /></div>
    </Band>

    <CardPanel id="conclusion" className="booking-cta dark-cta">
      <div className="col card-body cta-panel cta-booking-grid">
        <div className="cta-booking-copy"><span className="eyebrow">{fr ? "Échange découverte gratuit" : "Free discovery call"}</span><Lede title={fr ? "Parlons de votre projet de solution IA sur mesure." : "Let’s discuss your custom AI solution project."} text={fr ? "En 30 minutes, Synode prend le temps de comprendre votre activité, vos outils et le processus à améliorer afin d’identifier une première piste adaptée à votre entreprise en Belgique." : "In 30 minutes, Synode takes the time to understand your business, tools and the process you want to improve, then identify a first direction suited to your company in Belgium."} /><Link href="#calendrier-accueil" className="btn btn--primary">{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowRight aria-hidden /></Link><p className="cta-note">{fr ? "30 minutes, sans engagement." : "30 minutes. No commitment."}<br />{fr ? "Un besoin concret suffit pour commencer." : "A concrete need is all it takes to begin."}</p></div>
        <div id="calendrier-accueil" className="cta-booking-calendar"><Booking locale={locale} variant="card" /></div>
      </div>
    </CardPanel>
  </Shell>;
}
