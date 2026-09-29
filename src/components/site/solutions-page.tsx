import Link from "next/link";
import { ArrowRight, Target, Network, Database, Plug, Users, ShieldCheck, FileCheck2, FlaskConical, BookOpen, GraduationCap, Headphones, Code2, Activity, Plus } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { SolutionsHero } from "./solutions-hero";
import { DeliveryPreview, ProjectPreview } from "@/components/site/solution-visuals";

import { SolutionFamilies } from "./solution-families";

const deliveryIcons = [FileCheck2, FlaskConical, BookOpen, GraduationCap, Headphones];
const sizingIcons = [Target, Network, Database, Plug, Users, ShieldCheck];
const pricingIcons = [Code2, Activity, Plus];

export function SolutionsPage({ locale }: { locale: Locale }) {
  const { site, solutions } = getContent(locale);
  const fr = locale === "fr";
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const deliveryLabels = fr ? ["Un cadre clair", "Une solution testée", "Les clés pour comprendre", "Votre équipe accompagnée", "La suite organisée"] : ["A clear scope", "A tested solution", "Knowledge you can use", "Your team supported", "A plan for what comes next"];

  return (
    <Shell locale={locale}>
      <Band id="top" tone="white" className="solutions-intro">
        <SolutionsHero locale={locale} />
      </Band>

      <Band id="briques" tone="base" className="technical-band">
        <Lede kicker={fr ? "Six familles, votre solution" : "Six families, your solution"} title={solutions.bricksTitle} text={solutions.bricksText} />
        <SolutionFamilies locale={locale} overview />
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
