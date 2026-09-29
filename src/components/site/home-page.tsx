import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Search, Mail, MessagesSquare, Database, Check } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Booking } from "@/components/site/booking";
import { UseCaseVisual } from "@/components/site/use-case-visual";
import { HeroStage } from "@/components/site/hero-stage";
import { SolutionFamilies } from "@/components/site/solution-families";
import { workItems } from "@/lib/work";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
export function HomePage({
  locale
}: {
  locale: Locale;
}) {
  const {
    site,
    home,
    method
  } = getContent(locale);
  const fr = locale === "fr";
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const examples = fr ? [{
    icon: Search,
    tag: "Ventes & prospection",
    title: "Chaque rendez-vous, mieux préparé.",
    text: "Rassemblez les informations utiles sur un prospect avant votre prochain échange.",
    slug: "preparer-rendez-vous",
    steps: ["CRM + agenda", "Synthèse IA", "Brief prêt"]
  }, {
    icon: Mail,
    tag: "Opérations",
    title: "Une boîte mail qui devient un flux de travail.",
    text: "Classez les demandes et dirigez-les vers la bonne personne, avec les informations utiles.",
    slug: "trier-emails",
    steps: ["Email reçu", "Qualification", "Orientation"]
  }, {
    icon: MessagesSquare,
    tag: "Service client",
    title: "Des réponses prêtes à être relues.",
    text: "Préparez les réponses fréquentes à partir de votre documentation, puis validez l’envoi.",
    slug: "reponses-frequentes",
    steps: ["Question", "Vos documents", "Brouillon"]
  }, {
    icon: Database,
    tag: "Connaissance interne",
    title: "Votre savoir, enfin accessible.",
    text: "Retrouvez une information dans vos documents, accompagnée de sa source.",
    slug: "recherche-documents",
    steps: ["Recherche", "Sources", "Réponse"]
  }] : [{
    icon: Search,
    tag: "Sales & prospecting",
    title: "Walk into every meeting prepared.",
    text: "Gather useful prospect information before your next conversation.",
    slug: "preparer-rendez-vous",
    steps: ["CRM + calendar", "AI summary", "Ready to brief"]
  }, {
    icon: Mail,
    tag: "Operations",
    title: "Turn your inbox into a workflow.",
    text: "Classify requests and route them to the right person with the information they need.",
    slug: "trier-emails",
    steps: ["Incoming email", "Qualification", "Routing"]
  }, {
    icon: MessagesSquare,
    tag: "Customer service",
    title: "Answers ready for your review.",
    text: "Draft frequent answers from your documentation, then approve before sending.",
    slug: "reponses-frequentes",
    steps: ["Question", "Your documents", "Draft"]
  }, {
    icon: Database,
    tag: "Internal knowledge",
    title: "Your knowledge, within reach.",
    text: "Find information in your documents, with a source you can check.",
    slug: "recherche-documents",
    steps: ["Search", "Sources", "Answer"]
  }];
  return <Shell locale={locale}>
    <section id="top" className="studio-hero">
      <div className="col studio-hero-grid">
        <div className="studio-hero-copy">
          <h1>{fr ? "Moins de tâches répétitives." : "Less repetitive work."}<span>{fr ? "Plus de possibilités." : "More possibilities."}</span></h1>
          <p>{fr ? "Nous concevons des solutions IA sur mesure pour simplifier vos opérations. Connectées à vos outils. Pensées pour votre équipe." : "We build custom AI solutions to simplify your operations. Connected to your tools. Designed for your team."}</p>
          <div className="btn-row"><Link href={bookHref} className="btn btn--primary">{site.ctaShort}<ArrowRight aria-hidden /></Link><Link href={path(locale, ROUTES.solutions)} className="btn btn--ghost">{fr ? "Découvrir nos solutions" : "Explore our solutions"}</Link></div>
          <span className="hero-reassurance">{fr ? "* Un premier échange gratuit, sans engagement." : "* A free first conversation. No commitment."}</span>
        </div>
        <div className="studio-demo"><HeroStage locale={locale} /></div>
      </div>
      <div className="col"><div className="capability-strip"><span>{fr ? "De votre besoin à votre outil" : "From your need to your tool."}</span>{home.hero.stack.slice(0, 4).map(s => <span key={s}><Check aria-hidden />{s}</span>)}</div></div>
    </section>

    <Band id="cas-usage" tone="white" className="studio-section">
      <div className="section-heading"><Lede kicker={fr ? "L’IA dans votre quotidien" : "AI in your everyday work"} title={fr ? "Des usages concrets.^Des journées plus simples." : "Practical applications.^Simpler working days."} /><p className="section-side-text">{fr ? "Quelques exemples de ce que nous pouvons concevoir avec vous." : "A few examples of what we can design with you."}</p></div>
      <div className="usecase-bento">{examples.map(({
          icon: Icon,
          ...e
        }, i) => <Link key={e.slug} id={["ventes", "operations", "service-client", "outils-metier"][i]} className={`usecase-card usecase-card--${i}`} href={`${path(locale, ROUTES.solutions)}/${["assistants-agents-ia", "automatisations-intelligentes", "assistants-agents-ia", "data-intelligence"][i]}#exemple`}>
        <div className="usecase-top"><span className="feature-icon"><Icon aria-hidden /></span><span>{e.tag}</span><ArrowUpRight aria-hidden /></div>
        <h3>{e.title}</h3><p>{e.text}</p>
        <UseCaseVisual kind={i} locale={locale} />
        <div className="mini-flow" aria-hidden>{e.steps.map((step, j) => <span key={step}>{j > 0 && <ArrowRight />}<span>{step}</span></span>)}</div>
      </Link>)}</div>
    </Band>

    <Band id="offre" tone="base" className="studio-section technical-band">
      <div className="section-heading"><Lede kicker={fr ? "Six familles complémentaires" : "Six complementary families"} title={fr ? "Nos solutions IA sur mesure" : "Our custom AI solutions"} text={fr ? "Votre activité est unique. Nous combinons les approches utiles à votre besoin, à vos outils et à votre équipe." : "Your business is unique. We combine the approaches that fit your needs, tools and team."} /><Link className="go" href={path(locale, ROUTES.solutions)}>{fr ? "Toutes nos solutions" : "All our solutions"}<ArrowRight aria-hidden /></Link></div>
      <SolutionFamilies locale={locale} />
    </Band>

    <Band id="approche" tone="white" className="studio-section">
      <div className="section-heading"><Lede kicker={fr ? "Du premier échange à l’usage" : "From first conversation to daily use"} title={fr ? "Un projet clair.^Six étapes pour avancer ensemble." : "A clear project.^Six steps forward together."} text={method.text} /></div>
      <ol className="home-method-grid">{method.steps.map((step, i) => <li key={step.title}><span className="step-index">0{i + 1}</span><h3>{step.title}</h3><p>{step.work}</p><p className="method-participation"><strong>{fr ? "Avec vous : " : "With you: "}</strong>{step.client}</p><div className="method-output"><Check aria-hidden /><span>{step.output}</span></div></li>)}</ol>
      <p className="prose-body section-gap-sm">{fr ? "Le premier échange dure 30 minutes, il est gratuit et sans engagement. Le périmètre, le budget et les frais de suivi sont précisés dans le devis ; les évolutions importantes font l’objet d’un nouvel accord." : "The first conversation takes 30 minutes, is free and has no commitment. Scope, budget and ongoing costs are set out in the quote; major changes require a new agreement."}</p>
    </Band>

    <Band id="realisations" tone="base" className="studio-section">
      <div className="section-heading"><Lede kicker={fr ? "Réalisations" : "Our work"} title={fr ? "Ce que nous construisons." : "What we are building."} text={fr ? "Découvrez notre travail et son état d’avancement." : "Explore our work and its current progress."} /><Link className="go" href={path(locale, ROUTES.work)}>{fr ? "Voir toutes nos réalisations" : "See all our work"}<ArrowRight aria-hidden /></Link></div>
      <div className="home-work-grid">{workItems(locale).slice(0, 3).map(item => <Link key={item.slug} className="home-work-card" href={`${path(locale, ROUTES.work)}/${item.slug}`}><div><span className="badge badge--wip">{item.status}</span><h3>{item.title}</h3><p>{item.problem}</p><span className="go">{fr ? "Découvrir le projet" : "Explore the project"}<ArrowRight aria-hidden /></span></div><div className="home-work-mark" aria-hidden><Image src="/synode-mark.png" alt="" width={100} height={100} /><span>Synode Prospect</span></div></Link>)}</div>
    </Band>

    <CardPanel id="conclusion" className="booking-cta dark-cta">
      <div className="col card-body cta-panel cta-booking-grid">
        <div className="cta-booking-copy">
          <span className="eyebrow">{fr ? "Et si on simplifiait la suite ?" : "What could we simplify next?"}</span>
          <Lede title={fr ? "Parlons de ce qui vous prend trop de temps." : "Let’s talk about what takes too much of your time."} text={fr ? "Un premier échange pour comprendre votre quotidien et identifier ce que l’IA pourrait simplifier." : "A first conversation to understand your daily work and explore what AI could simplify."} />
          <Link href="#calendrier-accueil" className="btn btn--primary">{fr ? "Choisir un créneau" : "Choose a time"}<ArrowRight aria-hidden /></Link>
          <p className="cta-note">{fr ? "30 minutes, sans engagement." : "30 minutes. No commitment."}<br />{fr ? "Un besoin concret suffit pour commencer." : "A concrete need is all it takes to begin."}</p>
        </div>
        <div id="calendrier-accueil" className="cta-booking-calendar"><Booking locale={locale} variant="card" /></div>
      </div>
    </CardPanel>
  </Shell>;
}
