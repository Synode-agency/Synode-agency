import Link from "next/link";
import { ArrowRight, Check, CircleCheck, ShieldCheck } from "lucide-react";
import { Band, CardPanel, Shell } from "./shell";
import { Lede } from "./lede";
import { PageHero } from "./page-hero";
import { FaqAccordion } from "./faq-accordion";
import { OperationsSection } from "@/components/site/operations-section";
import { BrickVisual, brickIcons, ProjectPreview } from "./solution-visuals";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { type solutionFamilies } from "@/lib/solution-details";

type Family = ReturnType<typeof solutionFamilies>[number];
export function SolutionDetailPage({ locale, family }: { locale: Locale; family: Family }) {
  const fr = locale === "fr";
  const d = family.detail;
  const Icon = brickIcons[family.visual];
  const summaries = getContent(locale).solutions.bricks;
  return <Shell locale={locale}>
    <PageHero
      title={family.title}
      aside={
        /* La composition graphique, sans la grande card bleue qui l'enfermait.
           Les éléments de chaque famille restent ceux d'origine : ils portent
           la personnalité de la solution, et six illustrations identiques ne
           diraient plus rien. */
        <div className="family-hero-art">
          <span className="family-hero-art-mark"><Icon aria-hidden /></span>
          <BrickVisual kind={family.visual} locale={locale} />
          <span className="family-hero-art-benefit">{family.benefit}</span>
        </div>
      }
    >
      <p>{d.definition}</p>
      <div className="btn-row">
        <Link className="btn btn--primary" href={`${path(locale, ROUTES.contact)}#${ANCHORS.booking}`}>{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowRight aria-hidden /></Link>
        <Link className="btn btn--ghost" href="#exemple">{fr ? "Voir un cas concret" : "Explore an example"}</Link>
      </div>
    </PageHero>
    <Band id="possibilites" tone="base">
      <div className="family-purpose"><Lede title={fr ? "À quoi cela peut vous servir" : "How it can help"} text={d.audience} /><div><h3 className="family-small-title">{fr ? "Ce que nous pouvons concevoir avec vous" : "What we can design with you"}</h3><ul className="family-possibilities">{d.possibilities.map(p => <li key={p}><Check aria-hidden /><span>{p}</span></li>)}</ul></div></div>
    </Band>
    <Band id="exemple" tone="base" className="technical-band family-scenario">
      <Lede kicker={fr ? "Exemple illustratif de solution possible" : "Illustrative example of a possible solution"} title={d.scenario.title} text={d.scenario.before} />
      <div className="scenario-tools" aria-label={fr ? "Outils et intervenants" : "Tools and people"}>{d.scenario.tools.map((tool, i) => <span key={tool}>{i > 0 && <ArrowRight aria-hidden />}<span>{tool}</span></span>)}</div>
      <ol className="scenario-steps">{d.scenario.steps.map(([title, text], i) => <li key={title}><span className="scenario-number">0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <div className="scenario-outcome"><CircleCheck aria-hidden /><div><h3>{fr ? "Le résultat recherché" : "The intended outcome"}</h3><p>{d.scenario.outcome}</p></div></div>
    </Band>
    <Band id="autres-usages" tone="white">
      <Lede title={fr ? "D’autres façons de l’utiliser" : "Other ways to use it"} />
      <div className="family-example-grid section-gap">{d.examples.map(([title, text]) => <article key={title}><Icon aria-hidden /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </Band>
    <OperationsSection locale={locale} />
    <Band id="prerequis" tone="base">
      <div className="family-purpose"><Lede title={fr ? "Ce qu’il faut cadrer ensemble" : "What we need to define together"} text={fr ? "Les possibilités dépendent de votre contexte. Nous vérifions ces points avant de confirmer la solution et son périmètre." : "What is possible depends on your context. We check these points before confirming the solution and its scope."} /><ul className="family-possibilities">{d.requirements.map(r => <li key={r}><ShieldCheck aria-hidden /><span>{r}</span></li>)}</ul></div>
    </Band>
    <Band id="integration" tone="white">
      <Lede title={fr ? "Une place dans votre activité" : "A place in your business"} text={d.integration} />
      <div className="family-related section-gap-sm">{d.related.map(index => { const related = summaries[index]; return <Link key={related.slug} className="go" href={`${path(locale, ROUTES.solutions)}/${related.slug}`}>{related.title}<ArrowRight aria-hidden /></Link>; })}</div>
    </Band>
    <Band id="faq" tone="base"><Lede title={fr ? "Vos questions sur cette solution" : "Questions about this solution"} /><div className="section-gap"><FaqAccordion items={d.faq} /></div></Band>
    <CardPanel id="conclusion" className="dark-cta solutions-cta"><div className="col card-body cta-panel cta-booking-grid"><div className="cta-booking-copy"><Lede title={fr ? "Partons de votre situation." : "Let’s start with your situation."} text={fr ? "Décrivez-nous un besoin concret. Le premier échange permet de comprendre le contexte et d’identifier une piste, avant un devis personnalisé." : "Tell us about a concrete need. The first conversation helps us understand the context and identify an approach before preparing a tailored quote."} /><div className="btn-row"><Link className="btn btn--primary" href={`${path(locale, ROUTES.contact)}#${ANCHORS.booking}`}>{getContent(locale).site.ctaShort}<ArrowRight aria-hidden /></Link><Link className="btn btn--ghost" href={`${path(locale, ROUTES.contact)}#${ANCHORS.form}`}>{fr ? "Décrire mon besoin" : "Describe my need"}</Link></div><p className="cta-note">{fr ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p></div><ProjectPreview locale={locale} /></div></CardPanel>
  </Shell>;
}
