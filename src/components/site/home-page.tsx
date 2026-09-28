import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search, Mail, MessagesSquare, Database, Check } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { HeroStage } from "@/components/site/hero-stage";
import { OfferCard } from "@/components/site/offer-card";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
export function HomePage({
  locale
}: {
  locale: Locale;
}) {
  const {
    site,
    home
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
          <span className="eyebrow"><span className="status-dot" />{fr ? "Studio de solutions IA · Bruxelles" : "AI solutions studio · Brussels"}</span>
          <h1>{fr ? "Moins de tâches répétitives." : "Less repetitive work."}<span>{fr ? "Plus de possibilités." : "More possibilities."}</span></h1>
          <p>{fr ? "Nous concevons des solutions IA sur mesure pour simplifier vos opérations. Connectées à vos outils. Pensées pour votre équipe." : "We build custom AI solutions to simplify your operations. Connected to your tools. Designed for your team."}</p>
          <div className="btn-row"><Link href={bookHref} className="btn btn--primary">{site.ctaShort}<ArrowRight aria-hidden /></Link><Link href={path(locale, ROUTES.solutions)} className="btn btn--ghost">{fr ? "Découvrir nos solutions" : "Explore our solutions"}</Link></div>
          <span className="hero-reassurance">{fr ? "Un premier échange gratuit, sans engagement." : "A free first conversation. No commitment."}</span>
        </div>
        <div className="studio-demo"><HeroStage locale={locale} /><span className="demo-caption"><span className="status-dot" />{fr ? "Aperçu de systèmes IA · Illustrations de fonctionnement" : "AI system previews · Illustrative workflows"}</span></div>
      </div>
      <div className="col"><div className="capability-strip"><span>{fr ? "De votre besoin à votre outil." : "From your need to your tool."}</span>{home.hero.stack.slice(0, 4).map(s => <span key={s}><Check aria-hidden />{s}</span>)}</div></div>
    </section>

    <Band id="cas-usage" tone="white" className="studio-section">
      <div className="section-heading"><Lede kicker={fr ? "L’IA dans votre quotidien" : "AI in your everyday work"} title={fr ? "Des usages concrets.\nDes journées plus simples." : "Practical applications.\nSimpler working days."} /><Link href={path(locale, ROUTES.useCases)} className="go">{fr ? "Tous les cas d’usage" : "All use cases"}<ArrowRight aria-hidden /></Link></div>
      <div className="usecase-bento">{examples.map(({
          icon: Icon,
          ...e
        }, i) => <Link key={e.slug} className={`usecase-card usecase-card--${i}`} href={`${path(locale, ROUTES.useCases)}#${e.slug}`}>
        <div className="usecase-top"><span className="feature-icon"><Icon aria-hidden /></span><span>{e.tag}</span><ArrowUpRight aria-hidden /></div>
        <h3>{e.title}</h3><p>{e.text}</p>
        <div className="mini-flow" aria-hidden>{e.steps.map((step, j) => <span key={step}>{j > 0 && <ArrowRight />}<span>{step}</span></span>)}</div>
      </Link>)}</div>
    </Band>

    <Band id="offre" tone="base" className="studio-section"><div className="section-heading"><Lede kicker={home.offer.kicker} title={fr ? "Votre activité est unique.\nVotre solution aussi." : "Your business is unique.\nYour solution should be too."} /><p className="section-side-text">{fr ? "Nous partons du problème à résoudre, puis choisissons les bonnes briques pour y répondre." : "We start with the problem, then choose the right building blocks to solve it."}</p></div><OfferCard locale={locale} /></Band>

    <Band id="approche" tone="white" className="studio-section"><div className="approach-layout"><Lede kicker={fr ? "Du premier échange à l’usage" : "From first conversation to daily use"} title={fr ? "Un projet clair.\nÀ chaque étape." : "A clear project.\nAt every step."} text={fr ? "Vous savez ce que nous construisons, pourquoi, et ce qui reste entre vos mains." : "You know what we are building, why, and what stays in your hands."} /><div className="approach-steps">{(fr ? [["Comprendre", "Vos opérations, vos outils, votre besoin. Nous vérifions où l’IA peut être utile."], ["Construire", "Un périmètre défini, des étapes visibles et des démonstrations pour avancer ensemble."], ["Accompagner", "Tests, prise en main et suivi selon les modalités convenues pour votre projet."]] : [["Understand", "Your operations, tools and needs. We identify where AI can be useful."], ["Build", "An agreed scope, visible milestones and demos to move forward together."], ["Support", "Testing, onboarding and support under the terms agreed for your project."]]).map(([title, text], i) => <div key={title}><span className="step-index">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}<Link className="go" href={path(locale, ROUTES.method)}>{fr ? "Notre méthode en détail" : "Our method in detail"}<ArrowRight aria-hidden /></Link></div></div></Band>

    <Band id="faq" tone="white" className="studio-section"><div className="faq-layout"><Lede kicker={home.faq.kicker} title={fr ? "Quelques questions,\navant de commencer." : "A few questions,\nbefore we start."} /><FaqAccordion items={home.faq.items.map(i => ({
          q: i.q,
          a: i.a
        }))} /></div></Band>
    <CardPanel id="conclusion"><div className="col card-body cta-panel"><span className="eyebrow">{fr ? "Et si on simplifiait la suite ?" : "What could we simplify next?"}</span><Lede title={fr ? "Parlons de ce qui\nvous prend trop de temps." : "Let’s talk about what\ntakes too much of your time."} text={home.cta.text} align="center" /><div className="btn-row cta-actions"><Link href={bookHref} className="btn btn--primary">{site.cta}<ArrowRight aria-hidden /></Link></div><p className="cta-note">{fr ? "30 minutes, sans engagement. Un besoin concret suffit pour commencer." : "30 minutes. No commitment. A concrete need is all it takes to begin."}</p></div></CardPanel>
  </Shell>;
}
