import Link from "next/link";
import {
  Activity, ArrowRight, BadgeCheck, BarChart3, BellRing, CalendarRange, Check, ClipboardList, Contact,
  Database, FileOutput, FileSearch, FileText, Filter, FolderKanban, Globe, Inbox, Layers, LayoutDashboard,
  Lightbulb, ListChecks, ListOrdered, Lock, Mail, MessageSquare, NotebookPen, PackageCheck, PenLine, Plug,
  Puzzle, Repeat, Rocket, ScanText, ScrollText, Search, SearchCheck, Send, ShieldCheck, Shuffle, Smartphone,
  Table2, Target, TrendingUp, TriangleAlert, UserCheck, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Band, CardPanel, Shell } from "./shell";
import { Lede } from "./lede";
import { PageHero } from "./page-hero";
import { FaqAccordion } from "./faq-accordion";
import { AgentDemo } from "./agent-demo";
import { brickIcons } from "./solution-visuals";
import { ServiceCore, ServiceCtaArt, ServiceFlow, ServiceSketch } from "./service-visuals";
import { ServiceHeroIllustration } from "@/components/hero-illustrations";
import { servicePage } from "@/lib/service-pages";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { type solutionFamilies } from "@/lib/solution-details";

/**
 * LE GABARIT DES SIX PAGES SERVICES.
 *
 * Un seul composant pour les six. Ce qui change d'une page à l'autre vient
 * de deux sources de données et de nulle part ailleurs : `solution-details`
 * (définition, prérequis, FAQ, familles liées) et `service-pages` (tout le
 * reste). Il n'y a pas de branche `if (slug === …)` dans ce fichier, et il
 * ne doit pas y en avoir : c'est la seule garantie que les six pages
 * restent dans le même système quand l'une d'elles est retouchée.
 *
 * ── Le rythme des fonds, à ne pas défaire ───────────────────────────────
 * hero bleu nuit · définition blanc · usages bleu clair · formes blanc ·
 * fonctionnement bleu clair · intégration BLEU NUIT · cadrage blanc ·
 * accompagnement bleu clair · CTA bleu nuit (une carte, pas une bande) ·
 * FAQ bleu clair · footer blanc.
 *
 * Deux grandes bandes sombres seulement, le hero et l'intégration, plus la
 * carte du CTA. Chaque bande porte sa classe de ton explicitement
 * (`svc-white`, `svc-tint`, `svc-ink`) : le thème du site peint sinon les
 * bandes selon leur rang pair ou impair, et insérer une section plus tard
 * inverserait toutes les suivantes.
 *
 * Et rien après la FAQ : elle ferme la page, le CTA est au-dessus.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Le paiement récurrent ───────────────────────────────────────────────
 * La section « après la mise en service » porte le libellé contractuel et
 * la note commune, lus dans `content.ts`, et la FAQ se termine toujours par
 * la réponse complète sur les coûts récurrents, ajoutée par
 * `solutionFamilies`. Un visiteur arrive souvent directement ici depuis une
 * recherche : il ne doit pas lire toute la page sans croiser cette
 * information. Ne pas la retirer de ces pages.
 * ────────────────────────────────────────────────────────────────────────
 */

type Family = ReturnType<typeof solutionFamilies>[number];

/** Les icônes des usages, dans l'ordre des `uses` de chaque service. Elles
 *  sont ici et non dans le contenu : c'est une décision graphique, et elles
 *  n'ont pas à être traduites. */
const USE_ICONS: Record<string, LucideIcon[]> = {
  "assistants-agents-ia": [Inbox, FileSearch, Filter, Contact, FileText, Mail, NotebookPen, ListChecks],
  "automatisations-intelligentes": [Inbox, ScanText, ShieldCheck, UserCheck, FileOutput, BellRing, BarChart3, Send],
  "logiciels-applications-ia": [FolderKanban, ClipboardList, Users, Table2, Smartphone, LayoutDashboard, PenLine, Puzzle],
  "integrations-systemes-connectes": [Globe, Contact, PackageCheck, Database, Plug, Shuffle, Repeat, ScrollText],
  "data-intelligence": [Layers, Activity, CalendarRange, TriangleAlert, ListOrdered, TrendingUp, Search, BadgeCheck],
  "formation-adoption-ia": [Lightbulb, Target, MessageSquare, SearchCheck, Lock, FileText, Rocket, Users],
};

export function ServicePage({ locale, family }: { locale: Locale; family: Family }) {
  const fr = locale === "fr";
  const d = family.detail;
  const p = servicePage(locale, family.slug);
  /* Une page service sans contenu n'est pas une page dégradée, c'est une
     erreur de configuration : elle doit casser le build, pas se publier à
     moitié vide. */
  if (!p) throw new Error(`service-pages.ts : contenu manquant pour « ${family.slug} » (${locale}).`);

  const Icon = brickIcons[family.visual];
  const icons = USE_ICONS[family.slug] ?? [];
  const summaries = getContent(locale).solutions.bricks;
  const { operations } = getContent(locale).solutions;
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  /* Les prérequis validés, complétés par ceux de la page : cinq ou six
     points, sans recopier une ligne d'un fichier dans l'autre. */
  const framePoints = [...d.requirements, ...p.frameExtra];

  return <Shell locale={locale}>
    {/* ===== 1 · HERO — bleu nuit ===== */}
    <PageHero
      className="svc-hero"
      kicker={p.kicker}
      title={p.h1}
      aside={
        family.slug === "assistants-agents-ia" ? (
          /* La seule famille dont on peut montrer le déroulé complet, de la
             recherche à la validation humaine. */
          <div className="family-hero-art family-hero-art--demo"><AgentDemo locale={locale} /></div>
        ) : <ServiceHeroIllustration slug={family.slug} locale={locale} />
      }
    >
      <p>{d.definition}</p>
      <div className="btn-row">
        <Link className="btn btn--primary" href={bookHref}>{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowRight aria-hidden /></Link>
        <Link className="btn btn--ghost" href="#usages">{fr ? "Voir à quoi ça peut servir" : "See what it can do"}</Link>
      </div>
    </PageHero>

    {/* ===== 2 · QU'EST-CE QUE… — blanc ===== */}
    <Band id="definition" className="svc-band svc-white svc-rhythm">
      <div className="svc-split">
        <div className="svc-split-copy">
          <Lede title={p.whatTitle} text={p.whatText} />
        </div>
        <ServiceSketch kind={family.visual} data={p.sketch} locale={locale} />
      </div>
    </Band>

    {/* ===== 3 · À QUOI ÇA PEUT SERVIR — bleu clair ===== */}
    <Band id="usages" className="svc-band svc-tint svc-rhythm">
      <div className="section-heading">
        <Lede kicker={fr ? "Usages concrets" : "Concrete uses"} title={p.usesTitle} text={p.usesText} />
      </div>
      <ul className="svc-uses">
        {p.uses.map((use, i) => {
          const UseIcon = icons[i] ?? Check;
          return (
            <li key={use.title}>
              <span className="svc-use-icon"><UseIcon aria-hidden /></span>
              <strong>{use.title}</strong>
              <p>{use.text}</p>
            </li>
          );
        })}
      </ul>
    </Band>

    {/* ===== 4 · LES FORMES — blanc ===== */}
    <Band id="formes" className="svc-band svc-white svc-rhythm">
      <div className="section-heading">
        <Lede kicker={fr ? "Plusieurs formes possibles" : "Several possible forms"} title={p.formsTitle} text={p.formsText} />
      </div>
      <ol className="svc-forms">
        {p.forms.map((form, i) => (
          <li key={form.title}>
            <em aria-hidden>{String(i + 1).padStart(2, "0")}</em>
            <strong>{form.title}</strong>
            <p>{form.text}</p>
          </li>
        ))}
      </ol>
      <p className="svc-related">
        <span>{fr ? "Souvent combiné avec" : "Often combined with"}</span>
        {d.related.map(index => {
          const related = summaries[index];
          return <Link key={related.slug} className="go" href={`${path(locale, ROUTES.solutions)}/${related.slug}`}>{related.title}<ArrowRight aria-hidden /></Link>;
        })}
      </p>
    </Band>

    {/* ===== 5 · COMMENT ÇA FONCTIONNE — bleu clair ===== */}
    <Band id="fonctionnement" className="svc-band svc-tint svc-rhythm">
      <div className="svc-split svc-split--flow">
        <div className="svc-split-copy">
          <Lede kicker={fr ? "Fonctionnement" : "How it works"} title={p.howTitle} text={p.howText} />
        </div>
        <ServiceFlow steps={p.steps} locale={locale} />
      </div>
    </Band>

    {/* ===== 6 · INTÉGRATION DANS L'ENTREPRISE — bleu nuit ===== */}
    <Band id="integration" className="svc-band svc-ink svc-rhythm">
      <div className="svc-split svc-split--core">
        <div className="svc-split-copy">
          <Lede kicker={p.coreKicker} title={p.coreTitle} text={p.coreText} />
          <p className="svc-core-note"><ShieldCheck aria-hidden />{p.coreNote}</p>
        </div>
        <ServiceCore centre={p.coreCentre} chips={p.coreChips} icon={Icon} locale={locale} />
      </div>
    </Band>

    {/* ===== 7 · CE QU'IL FAUT CADRER — blanc ===== */}
    <Band id="cadrage" className="svc-band svc-white svc-rhythm">
      <div className="section-heading">
        <Lede kicker={fr ? "Avant le développement" : "Before development"} title={p.frameTitle} text={p.frameText} />
      </div>
      <ul className="svc-frame">
        {framePoints.map(point => (
          <li key={point}><Check aria-hidden /><span>{point}</span></li>
        ))}
      </ul>
    </Band>

    {/* ===== 8 · APRÈS LA MISE EN SERVICE — bleu clair ===== */}
    <Band id="accompagnement" className="svc-band svc-tint svc-rhythm">
      <div className="section-heading">
        <Lede kicker={fr ? "Après la mise en service" : "After go-live"} title={p.afterTitle} text={p.afterText} />
      </div>
      <p className="svc-after-meta">
        <span className="svc-after-pill"><Activity aria-hidden />{operations.recurringLabel}</span>
        {operations.familyNote}
      </p>
      <div className="svc-after">
        {p.after.map((item, i) => (
          <article key={item.title}>
            <span className="svc-after-index" aria-hidden>{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </Band>

    {/* ===== 9 · CTA — bleu nuit, une carte posée ===== */}
    <CardPanel id="echange" className="dark-cta solutions-cta svc-cta">
      <div className="col card-body cta-panel cta-booking-grid">
        <div className="cta-booking-copy">
          <Lede title={p.ctaTitle} text={p.ctaText} />
          <div className="btn-row">
            <Link className="btn btn--primary" href={bookHref}>{getContent(locale).site.ctaShort}<ArrowRight aria-hidden /></Link>
            <Link className="btn btn--ghost" href={formHref}>{fr ? "Nous contacter" : "Contact us"}</Link>
          </div>
          <p className="cta-note">{fr ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p>
        </div>
        <ServiceCtaArt icon={Icon} title={family.title} benefit={family.benefit} steps={p.steps.slice(0, 3).map(step => step.title)} />
      </div>
    </CardPanel>

    {/* ===== 10 · FAQ — bleu clair, dernière section de la page ===== */}
    <Band id="faq" className="svc-band svc-tint svc-rhythm svc-faq">
      <Lede kicker={fr ? "Questions fréquentes" : "Frequently asked"} title={p.faqTitle} />
      <div className="section-gap"><FaqAccordion items={[...p.faqExtra, ...d.faq]} /></div>
    </Band>
  </Shell>;
}
