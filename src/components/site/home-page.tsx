import Link from "next/link";
import Image from "next/image";
import { Activity, ArrowRight, Check, Lightbulb, LockKeyhole, MessagesSquare, Plug, Search, UserCheck } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Booking } from "@/components/site/booking";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { HeroStage } from "@/components/site/hero-stage";
import { SolutionFamilies } from "@/components/site/solution-families";
import { workItems } from "@/lib/work";
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

  const dailySituations = fr ? [
    {
      icon: Activity,
      tag: "Automatisation des processus",
      title: "Automatiser les tâches répétitives et administratives",
      text: "Saisies, classements, contrôles ou comptes rendus reviennent chaque jour et mobilisent du temps qui pourrait être consacré à votre activité.",
      examples: ["Saisie de données", "Tri d’emails", "Comptes rendus", "Contrôle de documents"],
      response: "Automatiser les étapes répétitives, tout en conservant une validation humaine là où elle est nécessaire.",
    },
    {
      icon: Search,
      tag: "Assistant IA documentaire",
      title: "Retrouver les informations utiles dans vos documents",
      text: "Elle est dispersée entre les emails, les dossiers, les procédures et les personnes qui savent encore où chercher.",
      examples: ["Documents internes", "Historique client", "Contrats", "Procédures"],
      response: "Rassembler les sources autorisées et permettre à votre équipe d’obtenir une réponse claire et vérifiable.",
    },
    {
      icon: MessagesSquare,
      tag: "Agents IA et demandes",
      title: "Trier et orienter les demandes plus rapidement",
      text: "Prospects, clients, fournisseurs ou collègues attendent une réponse pendant que les messages doivent être lus, compris et orientés.",
      examples: ["Demandes clients", "Prospects entrants", "Boîtes partagées", "Dossiers internes"],
      response: "Comprendre, résumer et orienter chaque demande selon vos règles, avec le bon niveau de contrôle.",
    },
    {
      icon: Plug,
      tag: "Intégrations et logiciels métier",
      title: "Connecter vos logiciels et centraliser vos données",
      text: "Les mêmes informations sont recopiées dans plusieurs outils et il devient difficile d’obtenir une vue fiable de l’activité.",
      examples: ["CRM", "Agenda", "Facturation", "Outils métier"],
      response: "Connecter les systèmes utiles et faire circuler les bonnes données sans bouleverser votre organisation.",
    },
  ] : [
    {
      icon: Activity,
      tag: "Process automation",
      title: "Automate repetitive and administrative tasks",
      text: "Data entry, filing, checks and meeting notes return every day and take time away from the work that needs your attention.",
      examples: ["Data entry", "Email sorting", "Meeting notes", "Document checks"],
      response: "Automate repetitive steps while keeping human approval wherever it is needed.",
    },
    {
      icon: Search,
      tag: "Document AI assistant",
      title: "Find useful information in your documents",
      text: "It is scattered across emails, folders, procedures and the people who still remember where to look.",
      examples: ["Internal documents", "Customer history", "Contracts", "Procedures"],
      response: "Bring authorised sources together and help your team obtain clear, verifiable answers.",
    },
    {
      icon: MessagesSquare,
      tag: "AI agents and enquiries",
      title: "Sort and route enquiries more quickly",
      text: "Prospects, customers, suppliers and colleagues wait while messages must be read, understood and routed.",
      examples: ["Customer enquiries", "Incoming leads", "Shared inboxes", "Internal cases"],
      response: "Understand, summarise and route each request according to your rules and approval levels.",
    },
    {
      icon: Plug,
      tag: "Integrations and business software",
      title: "Connect your software and centralise your data",
      text: "The same information is copied between tools, making it difficult to get a reliable view of the business.",
      examples: ["CRM", "Calendar", "Billing", "Business tools"],
      response: "Connect the systems that matter and move the right data without disrupting how your team works.",
    },
  ];

  const trustItems = fr ? [
    { icon: LockKeyhole, title: "Confidentialité", text: "Les accès aux données de votre entreprise sont définis selon les besoins réels du projet IA." },
    { icon: UserCheck, title: "Contrôle humain", text: "Des validations humaines restent prévues pour les décisions et les actions sensibles." },
    { icon: Plug, title: "Intégration", text: "Votre solution IA se connecte à vos logiciels existants lorsque leurs interfaces le permettent." },
    { icon: Activity, title: "Suivi technique", text: "Exploitation, maintenance et monitoring sont définis selon la solution mise en service." },
  ] : [
    { icon: LockKeyhole, title: "Confidentiality", text: "Data access is defined according to what the project requires." },
    { icon: UserCheck, title: "Human control", text: "Approval steps are included whenever an action requires human intervention." },
    { icon: Plug, title: "Integration", text: "Solutions are designed to work with your existing tools when their interfaces allow it." },
    { icon: Activity, title: "Technical support", text: "Support, maintenance and monitoring terms are defined for your solution." },
  ];

  return <Shell locale={locale}>
    {fr && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />}
    <section id="top" className="studio-hero home-dark-band home-hero-dark">
      <div className="col studio-hero-grid">
        <div className="studio-hero-copy">
          <h1>{fr ? "Simplifiez votre activité avec l’IA." : "Synode makes your business simpler with AI."}<span>{fr ? "Vous gardez le contrôle." : "You stay in control."}</span></h1>
          <p>{fr ? "Synode conçoit, développe et opère des solutions IA sur mesure : agents IA, automatisations, intégrations et logiciels métier. Chaque système s’appuie sur vos outils, vos données et vos règles de travail." : "We design, build and run custom AI solutions: AI agents, automations, integrations and business software. Every system works with your tools, data and operating rules."}</p>
          <div className="btn-row"><Link href={bookHref} className="btn btn--primary">{site.ctaShort}<ArrowRight aria-hidden /></Link><Link href={path(locale, ROUTES.solutions)} className="btn btn--ghost">{fr ? "Découvrir nos solutions" : "Explore our solutions"}</Link></div>
          <span className="hero-reassurance">{fr ? "* Un premier échange gratuit, sans engagement." : "* A free first conversation. No commitment."}</span>
        </div>
        <div className="studio-demo"><HeroStage locale={locale} /></div>
      </div>
      <div className="col"><div className="capability-strip"><span>{fr ? "De votre besoin à votre outil" : "From your need to your tool."}</span>{home.hero.stack.slice(0, 4).map((item) => <span key={item}><Check aria-hidden />{item}</span>)}</div></div>
    </section>

    <Band id="cas-usage" tone="white" className="studio-section home-usecases-light">
      <div className="section-heading daily-section-heading"><Lede kicker={fr ? "Usages de l’IA en entreprise" : "AI in everyday business"} title={fr ? "Comment l’IA peut simplifier le quotidien de votre entreprise" : "How AI can simplify your everyday business"} text={fr ? "Tri d’emails, recherche documentaire, saisie de données, demandes clients ou logiciels déconnectés : Synode conçoit des agents IA, des automatisations et des logiciels sur mesure à partir des processus qui ralentissent votre entreprise." : "Email sorting, document search, data entry, customer enquiries or disconnected software: Synode designs AI agents, automations and custom software around the processes slowing your business down."} /><p className="section-side-text">{fr ? "Ces cas d’usage de l’IA illustrent des difficultés fréquentes. Votre besoin peut être différent : nous l’étudions à partir de votre organisation, de vos outils et de vos priorités." : "These AI use cases illustrate common challenges. Your need may be different: we study it in the context of your organisation, tools and priorities."}</p></div>
      <div className="daily-problems-grid">{dailySituations.map(({ icon: Icon, ...situation }, index) => <article key={situation.tag} id={["operations", "outils-metier", "service-client", "ventes"][index]} className="daily-problem-card">
        <div className="daily-problem-top"><span className="feature-icon"><Icon aria-hidden /></span><span>{situation.tag}</span><span aria-hidden>0{index + 1}</span></div>
        <h3>{situation.title}</h3>
        <p>{situation.text}</p>
        <ul className="daily-examples" aria-label={fr ? "Quelques exemples" : "A few examples"}>{situation.examples.map((example) => <li key={example}>{example}</li>)}</ul>
        <div className="daily-response"><Lightbulb aria-hidden /><p><strong>{fr ? "Exemple de solution IA" : "Example AI solution"}</strong>{situation.response}</p></div>
      </article>)}</div>
      <div className="daily-open-callout"><div><span className="eyebrow"><span className="status-dot" />{fr ? "Votre situation est unique" : "Your situation is unique"}</span><h3>{fr ? "Votre difficulté n’apparaît pas ici ? C’est normal." : "Can’t see your challenge here? That is normal."}</h3><p>{fr ? "Une solution IA sur mesure commence par votre organisation, vos contraintes et vos priorités, pas par une liste de fonctionnalités prédéfinies." : "A custom AI solution starts with your organisation, constraints and priorities, not a predefined list of features."}</p></div><Link className="btn btn--primary" href={contactHref}>{fr ? "Parler de votre projet IA" : "Discuss your AI project"}<ArrowRight aria-hidden /></Link></div>
    </Band>

    <Band id="offre" tone="base" className="studio-section home-dark-band home-solutions-dark">
      <div className="section-heading"><Lede kicker={fr ? "Solutions IA sur mesure" : "Custom AI solutions"} title={fr ? "Agents IA, automatisations et logiciels métier.^Six expertises à combiner." : "AI agents, automations and business software.^Six capabilities to combine."} text={fr ? "Assistants et agents IA, automatisation des processus, applications sur mesure, intégrations, data et formation : Synode réunit les expertises nécessaires autour de votre activité, de vos outils et de vos données." : "AI assistants and agents, process automation, custom applications, integrations, data and training: Synode brings together the capabilities your business, tools and data require."} /><Link className="go" href={path(locale, ROUTES.solutions)}>{fr ? "Découvrir toutes nos solutions IA" : "Explore all our AI solutions"}<ArrowRight aria-hidden /></Link></div>
      <SolutionFamilies locale={locale} />
    </Band>

    <Band id="confiance" tone="white" className="studio-section trust-section home-trust-light">
      <div className="section-heading"><Lede kicker={fr ? "Sécurité et contrôle des systèmes IA" : "AI system reliability and control"} title={fr ? "Des solutions IA intégrées,^contrôlées et suivies." : "AI solutions that are integrated,^controlled and monitored."} text={fr ? "Confidentialité, gestion des accès, validation humaine, intégration à vos logiciels et monitoring technique sont définis selon les risques et les besoins de votre projet IA." : "Confidentiality, access management, human approval, software integration and technical monitoring are defined around the risks and requirements of your AI project."} /></div>
      <div className="trust-grid">{trustItems.map(({ icon: Icon, title, text }, index) => <article key={title} className="trust-card"><div><span className="trust-icon"><Icon aria-hidden /></span><span className="trust-index" aria-hidden>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
    </Band>

    <Band id="approche" tone="base" className="studio-section home-dark-band home-method-dark">
      <div className="section-heading"><Lede kicker={fr ? "Développement d’une solution IA sur mesure" : "Building a custom AI solution"} title={fr ? "Comment se déroule votre projet IA avec Synode" : "How your AI project works with Synode"} text={fr ? "Du premier échange au déploiement, puis au suivi, nous concevons votre solution IA en six étapes visibles. Le périmètre, les validations, les accès et les résultats attendus sont définis avec vous." : "From the first conversation to deployment and ongoing support, we build your AI solution in six visible stages. Scope, approvals, access and expected outcomes are agreed with you."} /></div>
      <ol className="home-method-grid">{method.steps.map((step, index) => <li key={step.title}><span className="step-index">0{index + 1}</span><h3>{step.title}</h3><p>{step.work}</p><p className="method-participation"><strong>{fr ? "Avec vous : " : "With you: "}</strong>{step.client}</p><div className="method-output"><Check aria-hidden /><span>{step.output}</span></div></li>)}</ol>
      <p className="prose-body section-gap-sm">{fr ? "Le premier échange dure 30 minutes, il est gratuit et sans engagement. Le périmètre, le budget et les frais de suivi sont précisés dans le devis ; les évolutions importantes font l’objet d’un nouvel accord." : "The first conversation takes 30 minutes, is free and has no commitment. Scope, budget and ongoing costs are set out in the quote; major changes require a new agreement."}</p>
    </Band>

    <Band id="realisations" tone="white" className="studio-section home-work-light">
      <div className="section-heading"><Lede kicker={fr ? "Projets et démonstrateurs IA" : "AI projects and demos"} title={fr ? "Découvrez nos réalisations IA et leur état réel." : "Explore our AI work and its real progress."} text={fr ? "Agents IA, automatisations et outils métier : nous présentons nos projets internes, nos démonstrateurs et, lorsqu’ils existent, les projets clients autorisés, avec un statut clair et sans résultat inventé." : "AI agents, automations and business tools: we present internal projects, demos and authorised client work when available, with a clear status and no invented results."} /><Link className="go" href={path(locale, ROUTES.work)}>{fr ? "Voir toutes nos réalisations IA" : "See all our AI work"}<ArrowRight aria-hidden /></Link></div>
      <div className="home-work-grid">{workItems(locale).slice(0, 3).map((item) => <Link key={item.slug} className="home-work-card" href={`${path(locale, ROUTES.work)}/${item.slug}`}><div><span className="badge badge--wip">{item.status}</span><h3>{item.title}</h3><p>{item.problem}</p><div className="project-journey" aria-label={fr ? "Parcours fonctionnel envisagé" : "Planned functional journey"}>{item.journey.map((step, index) => <span key={step}>{index > 0 && <ArrowRight aria-hidden />}<span>{step}</span></span>)}</div><span className="go">{fr ? "Découvrir ce projet IA" : "Explore this AI project"}<ArrowRight aria-hidden /></span></div><div className="home-work-mark" aria-hidden><Image src="/synode-mark.png" alt="" width={100} height={100} /><span>Synode Prospect</span></div></Link>)}</div>
    </Band>

    <Band id="faq" tone="base" className="studio-section home-faq home-dark-band home-faq-dark">
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
