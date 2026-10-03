import Link from "next/link";
import { ArrowDown, ArrowRight, Target, Network, Database, Plug, Users, ShieldCheck, FileCheck2, FlaskConical, BookOpen, GraduationCap, Headphones, Code2, Activity, Plus, Radar, SlidersHorizontal, ReceiptText, LifeBuoy, Check, Bot, ContactRound, Workflow, LayoutDashboard } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { SolutionsModules } from "./solutions-hero";
import { PageHero } from "@/components/site/page-hero";
import { DeliveryPreview, ProjectPreview } from "@/components/site/solution-visuals";

import { SolutionFamilies } from "./solution-families";

const deliveryIcons = [FileCheck2, FlaskConical, BookOpen, GraduationCap, Headphones];
const sizingIcons = [Target, Network, Database, Plug, Users, ShieldCheck];
const pricingIcons = [Code2, Activity, Plus];
const operationIcons = [Radar, SlidersHorizontal, ReceiptText, LifeBuoy];

export function SolutionsPage({ locale }: { locale: Locale }) {
  const { site, solutions } = getContent(locale);
  const fr = locale === "fr";
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const deliveryLabels = fr ? ["Un cadre clair", "Une solution testée", "Les clés pour comprendre", "Votre équipe accompagnée", "La suite organisée"] : ["A clear scope", "A tested solution", "Knowledge you can use", "Your team supported", "A plan for what comes next"];

  return (
    <Shell locale={locale}>
      <PageHero
        title={fr ? <>Six familles pour composer vos <span>solutions IA sur mesure</span></> : <>Six families to compose your <span>custom AI solutions</span></>}
        aside={<SolutionsModules locale={locale} />}
      >
        <p>{fr ? "Un besoin précis, plusieurs façons d’y répondre. Agents IA, automatisations, logiciels métier, intégrations, data et formation se combinent en une seule solution, conçue autour de vos outils, de vos données et de vos règles métier." : "One specific need, several ways to address it. AI agents, automations, business software, integrations, data and training combine into a single solution, designed around your tools, your data and your business rules."}</p>
        <div className="btn-row">
          <Link href="#briques" className="btn btn--primary">{fr ? "Explorer les six familles" : "Explore the six families"}<ArrowDown aria-hidden /></Link>
          <Link href={formHref} className="btn btn--ghost">{fr ? "Parlons de votre besoin" : "Tell us what you need"}</Link>
        </div>
        <span className="hero-reassurance">{fr ? "* Un premier échange gratuit. Un périmètre clair. Un devis personnalisé." : "* A free first conversation. A clear scope. A tailored quote."}</span>
      </PageHero>

      <Band id="briques" tone="base" className="technical-band">
        <Lede kicker={fr ? "Six familles, votre solution" : "Six families, your solution"} title={solutions.bricksTitle} text={solutions.bricksText} />
        <SolutionFamilies locale={locale} overview />
      </Band>

      <Band id="combinaison" tone="base" className="combination-band">
        <div className="combination-layout">
          <Lede
            kicker={fr ? "Un exemple de combinaison" : "One example combination"}
            title={fr ? "Plusieurs expertises.^Une seule solution." : "Several capabilities.^One solution."}
            text={fr ? "Une solution peut réunir un agent IA, votre CRM, des automatisations et un tableau de bord. Nous retenons uniquement les éléments utiles à votre activité." : "One solution can combine an AI agent, your CRM, automations and a dashboard. We only include what is useful to your business."}
          />
          <div className="combination-card" aria-label={fr ? "Exemple illustratif d’une solution composée" : "Illustrative example of a combined solution"}>
            {(fr ? [
              { icon: Bot, title: "Agent IA", text: "Analyse la demande" },
              { icon: ContactRound, title: "CRM", text: "Apporte le contexte" },
              { icon: Workflow, title: "Automatisation", text: "Organise les étapes" },
              { icon: LayoutDashboard, title: "Tableau de bord", text: "Rend le suivi visible" },
            ] : [
              { icon: Bot, title: "AI agent", text: "Analyses the request" },
              { icon: ContactRound, title: "CRM", text: "Provides context" },
              { icon: Workflow, title: "Automation", text: "Organises the steps" },
              { icon: LayoutDashboard, title: "Dashboard", text: "Makes progress visible" },
            ]).map(({ icon: Icon, title, text }, index) => <div key={title} className="combination-step">{index > 0 && <ArrowRight aria-hidden className="combination-arrow" />}<span><Icon aria-hidden /></span><div><strong>{title}</strong><small>{text}</small></div></div>)}
            <p>{fr ? "Exemple illustratif · le périmètre est défini selon votre besoin" : "Illustrative example · scope is defined around your needs"}</p>
          </div>
        </div>
      </Band>

      <Band id="exploitation" tone="white" className="operations-band">
        <div className="operations-heading">
          <div>
            <Lede kicker={solutions.operations.kicker} title={solutions.operations.title} text={solutions.operations.text} />
            <div className="operations-meta">
              <span className="operations-recurring"><Activity aria-hidden />{solutions.operations.recurringLabel}</span>
              <p>{solutions.operations.familyNote}</p>
            </div>
          </div>
          <ol className="operations-cycle" aria-label={fr ? "Cycle de vie de la solution" : "Solution lifecycle"}>
            {solutions.operations.cycle.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                <Check aria-hidden />
              </li>
            ))}
          </ol>
        </div>
        <div className="operations-grid section-gap">
          {solutions.operations.items.map((item, index) => {
            const Icon = operationIcons[index];
            return (
              <article key={item.title} className="operations-card">
                <span className="operations-icon"><Icon aria-hidden /></span>
                <span className="operations-index" aria-hidden>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </Band>

      <Band id="livrables" tone="white">
        <div className="delivery-layout">
          <div><Lede kicker={fr ? "Du code à la prise en main" : "From code to daily use"} title={solutions.deliverablesTitle} /><DeliveryPreview locale={locale} /></div>
          <ol className="delivery-list">
            {solutions.deliverables.map((d, i) => {
              const Icon = deliveryIcons[i];
              return <li key={d}><span className="delivery-icon"><Icon aria-hidden /></span><div><h3>{deliveryLabels[i]}</h3><p>{d}</p></div><span className="delivery-index" aria-hidden>0{i + 1}</span></li>;
            })}
          </ol>
        </div>
        <p className="prose-body section-gap-sm">{solutions.deliverablesNote}</p>
      </Band>

      <Band id="dimensionnement" tone="base">
        <div className="section-heading"><Lede kicker={fr ? "Un périmètre à votre mesure" : "A scope that fits"} title={solutions.sizingTitle} text={solutions.sizingText} /><span className="scope-label"><Target aria-hidden />{fr ? "6 points pour cadrer juste" : "6 factors to get the scope right"}</span></div>
        <div className="scope-grid">
          {solutions.sizing.map((s, i) => {
            const Icon = sizingIcons[i];
            return <article key={s.title} className="scope-card"><div><span className="scope-icon"><Icon aria-hidden /></span><span className="scope-number" aria-hidden>0{i + 1}</span></div><h3>{s.title}</h3><p>{s.text}</p><span className="scope-rule" aria-hidden /></article>;
          })}
        </div>
        <p className="prose-body section-gap-sm">{solutions.sizingNote}</p>
      </Band>

      <Band id="modele" tone="white">
        <Lede kicker={fr ? "Un budget lisible" : "A transparent budget"} title={solutions.pricingTitle} />
        <ol className="pricing-grid section-gap">
          {solutions.pricing.map((p, i) => {
            const Icon = pricingIcons[i];
            return <li key={p.title} className="pricing-card"><div className="pricing-card-top"><Icon aria-hidden /><span aria-hidden>0{i + 1}</span></div><h3>{p.title}</h3><p>{p.text}</p><span className="pricing-card-foot">{(fr ? ["Construire", "Faire fonctionner", "Faire évoluer"] : ["Build", "Run", "Evolve"])[i]}<ArrowRight aria-hidden /></span></li>;
          })}
        </ol>
        <p className="prose-body section-gap-sm">{solutions.pricingNote}</p>
      </Band>

      <Band id="faq" tone="base">
        <Lede title={solutions.faqTitle} />
        <div className="section-gap"><FaqAccordion items={solutions.faq} /></div>
      </Band>

      <CardPanel id="autre" className="dark-cta solutions-cta">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <span className="eyebrow">{fr ? "Votre idée est le point de départ" : "Your idea is the starting point"}</span>
            <Lede title={solutions.notInList.title} text={solutions.notInList.text} />
            <div className="btn-row"><Link href={formHref} className="btn btn--primary">{solutions.notInList.cta}<ArrowRight aria-hidden /></Link><Link href={bookHref} className="btn btn--ghost">{site.ctaShort}</Link></div>
            <p className="cta-note">{fr ? "30 minutes, sans engagement." : "30 minutes. No commitment."}<br />{fr ? "Commençons par votre quotidien." : "Let’s start with your everyday work."}</p>
          </div>
          <ProjectPreview locale={locale} />
        </div>
      </CardPanel>
    </Shell>
  );
}
