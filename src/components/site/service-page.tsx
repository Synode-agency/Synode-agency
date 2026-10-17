import Link from "next/link";
import {
  Activity, ArrowRight, BadgeCheck, BarChart3, BellRing, CalendarRange, Check, ClipboardList, Contact,
  Database, FileOutput, FileText, FolderKanban, Globe, Inbox, Layers, LayoutDashboard,
  Lightbulb, ListOrdered, Lock, MessageSquare, PackageCheck, PenLine, Plug,
  Puzzle, Repeat, Rocket, ScanText, ScrollText, Search, SearchCheck, Send, ShieldCheck, Shuffle, Smartphone,
  Table2, Target, TrendingUp, TriangleAlert, UserCheck, Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Band, CardPanel, Shell } from "./shell";
import { HeroCompact, type HeroRow, type HeroTile } from "@/components/hero-compact";
import { Lede } from "./lede";
import { PageHero } from "./page-hero";
import { FaqAccordion } from "./faq-accordion";
import { AgentDemo } from "./agent-demo";
import { AgentBrief } from "./agent-brief";
import { AutomationGraph } from "./automation-graph";
import { AdoptionVisual, DataVisual, IntegrationVisual, SoftwareVisual } from "@/components/understand-visuals";
import { UseCards } from "./use-cards";
import { AfterPanel } from "./after-panel";
import { AgentNetwork } from "./agent-network";
import { AppVisual, FlowVisual, KpiVisual, LayerVisual, TeamsVisual } from "@/components/core-visuals";
import { ServiceHeroIllustration } from "@/components/hero-illustrations";
import { servicePage } from "@/lib/service-pages";
import { renderLines } from "@/lib/lines";
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
 * hero bleu nuit · définition blanc · usages bleu clair · intégration BLEU
 * NUIT · accompagnement bleu clair · CTA bleu nuit (une carte, pas une
 * bande) · FAQ bleu clair · footer blanc.
 *
 * Deux sections sont tombées en route : « formes », repliée dans les usages,
 * et « fonctionnement », supprimée. Les six pages n'ont donc plus que six
 * bandes et la carte du CTA.
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
 *  n'ont pas à être traduites. ⚠ Plus aucune page ne les lit depuis que les
 *  six affichent leurs usages en cartes à mini-aperçu : la grille commune
 *  `.svc-uses` ne sert plus, et cette table avec elle. Conservées le temps
 *  de s'assurer que les cartes conviennent partout. */
const USE_ICONS: Record<string, LucideIcon[]> = {
  "automatisations-intelligentes": [Inbox, ScanText, ShieldCheck, UserCheck, FileOutput, BellRing, BarChart3, Send],
  "logiciels-applications-ia": [FolderKanban, ClipboardList, Users, Table2, Smartphone, LayoutDashboard, PenLine, Puzzle],
  "integrations-systemes-connectes": [Globe, Contact, PackageCheck, Database, Plug, Shuffle, Repeat, ScrollText],
  "data-intelligence": [Layers, Activity, CalendarRange, TriangleAlert, ListOrdered, TrendingUp, Search, BadgeCheck],
  "formation-adoption-ia": [Lightbulb, Target, MessageSquare, SearchCheck, Lock, FileText, Rocket, Users],
};

/**
 * LE CONTENU DE LA CARD COMPACTE DES SIX HEROS DE SERVICE.
 *
 * ⚠ Chaque chaîne vient du visuel de bureau de la MÊME page, au mot près.
 * Ce n'est pas un second contenu à écrire : c'est le même, dit plus court.
 * Si un visuel de bureau change, c'est ici qu'il faut reporter.
 */
const HERO_COMPACT: Record<string, (fr: boolean) => {
  title: string; status: string; rows?: readonly HeroRow[]; tiles?: readonly HeroTile[];
}> = {
  "agents-ia": fr => ({
    title: fr ? "demande #2041 \u00b7 Marie L." : "request #2041 \u00b7 Marie L.",
    status: fr ? "Validation requise" : "Approval needed",
    rows: fr
      ? [
          { num: "01", label: "Rechercher", state: "Recherche\u2026" },
          { num: "02", label: "Comprendre", state: "devis toiture" },
          { num: "03", label: "Pr\u00e9parer", state: "R\u00e9daction\u2026" },
        ]
      : [
          { num: "01", label: "Search", state: "Searching\u2026" },
          { num: "02", label: "Understand", state: "roofing quote" },
          { num: "03", label: "Draft", state: "Analysing\u2026" },
        ],
  }),
  "automatisations-intelligentes": fr => ({
    title: fr ? "workflow \u00b7 factures fournisseurs" : "workflow \u00b7 supplier invoices",
    status: fr ? "actif" : "active",
    rows: fr
      ? [
          { num: "01", label: "E-mail re\u00e7u", state: "F-118.pdf" },
          { num: "02", label: "Extraction IA", state: "montant \u00b7 TVA" },
          { num: "03", label: "Contr\u00f4le r\u00e8gles", state: "budget \u00b7 doublon" },
          { num: "04", label: "Facture dans l\u2019ERP", state: "compta \u00e0 jour" },
          { num: "05", label: "\u00c0 v\u00e9rifier", state: "hors budget" },
        ]
      : [
          { num: "01", label: "Email received", state: "F-118.pdf" },
          { num: "02", label: "AI extraction", state: "amount \u00b7 VAT" },
          { num: "03", label: "Rule check", state: "budget \u00b7 duplicate" },
          { num: "04", label: "Invoice in ERP", state: "accounts updated" },
          { num: "05", label: "Review needed", state: "over budget" },
        ],
  }),
  "logiciels-applications-ia": fr => ({
    title: fr ? "Tableau de bord \u00b7 Atelier Brun" : "Dashboard \u00b7 Atelier Brun",
    status: fr ? "ce mois" : "this month",
    tiles: fr
      ? [
          { label: "Chiffre d\u2019affaires", value: "84 260 \u20ac" },
          { label: "Projets en cours", value: "12" },
          { label: "Demandes", value: "28" },
          { label: "\u00c0 valider", value: "4" },
        ]
      : [
          { label: "Revenue", value: "84 260 \u20ac" },
          { label: "Active projects", value: "12" },
          { label: "Requests", value: "28" },
          { label: "To approve", value: "4" },
        ],
  }),
  "integrations-systemes-connectes": fr => ({
    title: fr ? "Nouveau lead du site \u2192 CRM + ERP" : "New website lead \u2192 CRM + ERP",
    status: fr ? "0 double saisie" : "0 duplicate entry",
    rows: fr
      ? [
          { num: "01", label: "Formulaire site web", state: "Nouveau lead" },
          { num: "02", label: "CRM", state: "fiche cr\u00e9\u00e9e" },
          { num: "03", label: "ERP", state: "fiche cr\u00e9\u00e9e" },
          { num: "04", label: "\u00c9quipe", state: "assign\u00e9e" },
        ]
      : [
          { num: "01", label: "Website form", state: "New lead" },
          { num: "02", label: "CRM", state: "record created" },
          { num: "03", label: "ERP", state: "record created" },
          { num: "04", label: "Team", state: "assigned" },
        ],
  }),
  "data-intelligence": fr => ({
    title: fr ? "chiffre d\u2019affaires \u00b7 30 jours" : "revenue \u00b7 30 days",
    status: fr ? "\u00e0 jour" : "up to date",
    tiles: fr
      ? [
          { label: "Commandes", value: "382" },
          { label: "Panier moyen", value: "126 \u20ac" },
          { label: "Conversion", value: "4,8 %" },
          { label: "Alerte", value: "stock bas" },
        ]
      : [
          { label: "Orders", value: "382" },
          { label: "Avg. basket", value: "\u20ac126" },
          { label: "Conversion", value: "4.8%" },
          { label: "Alert", value: "low stock" },
        ],
  }),
  "formation-adoption-ia": fr => ({
    title: fr ? "Piloter votre solution IA" : "Run your AI solution",
    status: fr ? "en production" : "live",
    rows: fr
      ? [
          { num: "01", label: "Comprendre votre agent" },
          { num: "02", label: "Garder le contr\u00f4le" },
          { num: "03", label: "Ajuster les r\u00e8gles" },
          { num: "04", label: "Suivre les r\u00e9sultats" },
        ]
      : [
          { num: "01", label: "Understand your agent" },
          { num: "02", label: "Stay in control" },
          { num: "03", label: "Adjust the rules" },
          { num: "04", label: "Track the results" },
        ],
  }),
};

export function ServicePage({ locale, family }: { locale: Locale; family: Family }) {
  const fr = locale === "fr";
  const d = family.detail;
  const p = servicePage(locale, family.slug);
  /* Une page service sans contenu n'est pas une page dégradée, c'est une
     erreur de configuration : elle doit casser le build, pas se publier à
     moitié vide. */
  if (!p) throw new Error(`service-pages.ts : contenu manquant pour « ${family.slug} » (${locale}).`);
  if (!p.mergeForms && (!p.forms || !p.formsTitle || !p.formsText)) throw new Error(`service-pages.ts : « ${family.slug} » n'a ni section « formes » ni \`mergeForms\`.`);
  if (!p.whatVisual) throw new Error(`service-pages.ts : « ${family.slug} » n'a pas de \`whatVisual\`.`);

  const icons = USE_ICONS[family.slug] ?? [];
  const summaries = getContent(locale).solutions.bricks;
  const { operations } = getContent(locale).solutions;
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;

  return <Shell locale={locale}>
    {/* ===== 1 · HERO — bleu nuit ===== */}
    <PageHero
      className="svc-hero"
      kicker={renderLines(p.kicker)}
      title={renderLines(p.h1, p.h1Accents, "title-accent")}
      aside={<>
        <div className="hero-visual-desktop">
          {family.slug === "agents-ia" ? (
            /* La seule famille dont on peut montrer le déroulé complet, de
               la recherche à la validation humaine. */
            <div className="family-hero-art family-hero-art--demo"><AgentDemo locale={locale} /></div>
          ) : <ServiceHeroIllustration slug={family.slug} locale={locale} />}
        </div>
        {HERO_COMPACT[family.slug] && <HeroCompact {...HERO_COMPACT[family.slug](fr)} />}
      </>}
    >
      <p>{d.heroLead}</p>
      <div className="btn-row">
        <Link className="btn btn--primary" href={bookHref}>{fr ? "Réserver un échange gratuit" : "Book a free call"}<ArrowRight aria-hidden /></Link>
        <Link className="btn btn--ghost" href="#usages">{fr ? "Voir à quoi ça peut servir" : "See what it can do"}</Link>
      </div>
    </PageHero>

    {/* ===== 2 · QU'EST-CE QUE… — blanc ===== */}
    <Band id="definition" className="svc-band svc-white svc-rhythm">
      {/* Toujours deux colonnes : le texte à gauche, un visuel à droite. Ce
          qu'on y met vient du contenu et non du slug — le petit schéma
          commun, ou un visuel animé dédié au service. */}
      <div className="svc-split">
        <div className={["svc-split-copy", "svc-what", p.whatTitleOneLine ? "svc-what--line" : "", p.whatTitleTwoLines ? "svc-what--two" : ""].filter(Boolean).join(" ")}>
          <Lede kicker={p.whatKicker} title={p.whatTitle} accents={p.whatTitleAccents} text={p.whatText} />
        </div>
        {p.whatVisual === "agent" ? <AgentBrief locale={locale} />
          : p.whatVisual === "automation" ? <AutomationGraph locale={locale} />
          : p.whatVisual === "software" ? <SoftwareVisual locale={locale} />
          : p.whatVisual === "integration" ? <IntegrationVisual locale={locale} />
          : p.whatVisual === "data" ? <DataVisual locale={locale} />
          : <AdoptionVisual locale={locale} />}
      </div>
    </Band>

    {/* ===== 3 · À QUOI ÇA PEUT SERVIR — bleu clair ===== */}
    <Band id="usages" className="svc-band svc-tint svc-rhythm">
      <div className={p.usesTitleTwoLines ? "section-heading svc-uses-head--two" : "section-heading"}>
        <Lede kicker={p.usesKicker ?? (fr ? "Usages concrets" : "Concrete uses")} title={p.usesTitle} accents={p.usesTitleAccents} text={p.usesText} />
      </div>
      {/* Les mêmes titres et les mêmes descriptions dans les deux
          compositions : seules les cartes ajoutent un mini-aperçu. */}
      {p.usesCards ? (
        <UseCards items={p.uses} set={family.slug} locale={locale} />
      ) : (
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
      )}
      {p.mergeForms && <p className="svc-related">
        <span>{fr ? "Souvent combiné avec" : "Often combined with"}</span>
        {d.related.map(index => {
          const related = summaries[index];
          return <Link key={related.slug} className="go" href={`${path(locale, ROUTES.solutions)}/${related.slug}`}>{related.title}<ArrowRight aria-hidden /></Link>;
        })}
      </p>}
    </Band>

    {/* ===== 4 · LES FORMES — blanc =====
        Absente quand les formes sont repliées dans les cartes d'usages. Le
        ton de la section suivante bascule alors au blanc : deux bandes bleu
        clair voisines n'en feraient plus qu'une. */}
    {!p.mergeForms && (
      <Band id="formes" className="svc-band svc-white svc-rhythm">
        <div className="section-heading">
          <Lede kicker={fr ? "Plusieurs formes possibles" : "Several possible forms"} title={p.formsTitle!} text={p.formsText} />
        </div>
        <ol className="svc-forms">
          {p.forms!.map((form, i) => (
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
    )}

    {/* ===== 5 · COMMENT ÇA FONCTIONNE — bleu clair =====
        Absente quand les cinq temps sont repliés dans le visuel de la
        section « Qu'est-ce que… » : les deux disaient le même déroulé. */}
    {/* ===== 5 · INTÉGRATION DANS L'ENTREPRISE — bleu nuit ===== */}
    <Band id="integration" className="svc-band svc-ink svc-rhythm">
      {/* Toujours deux colonnes, comme les autres sections : le texte à
          gauche, le visuel à droite. Lequel vient du contenu et non du slug.
          Aucun de ces visuels n'a de carte de fond : ils sont posés à même
          la bande. Ne pas leur en redonner une. */}
      <div className="svc-split svc-split--core">
        <div className="svc-split-copy">
          <Lede kicker={p.coreKicker} title={p.coreTitle} accents={p.coreTitleAccents} text={renderLines(p.coreText)} />
          <p className="svc-core-note"><ShieldCheck aria-hidden />{p.coreNote}</p>
        </div>
        {p.coreVisual === "agent" ? <AgentNetwork locale={locale} />
          : p.coreVisual === "automation" ? <FlowVisual locale={locale} />
          : p.coreVisual === "software" ? <AppVisual locale={locale} />
          : p.coreVisual === "integration" ? <LayerVisual locale={locale} />
          : p.coreVisual === "data" ? <KpiVisual locale={locale} />
          : <TeamsVisual locale={locale} />}
      </div>
    </Band>

    {/* ===== 6 · APRÈS LA MISE EN SERVICE — bleu clair =====
        La pastille de paiement récurrent et la note de pied entrent dans le
        panneau. Elles viennent toujours de `content.ts`, écrites une seule
        fois pour tout le site : c'est un engagement contractuel, il ne doit
        pas exister en six exemplaires. */}
    <Band id="accompagnement" className="svc-band svc-tint svc-rhythm">
      <div className="section-heading">
        <Lede kicker={fr ? "Après la mise en service" : "After go-live"} title={p.afterTitle} accents={p.afterTitleAccents} text={p.afterText} />
      </div>
      <AfterPanel items={p.after} pill={operations.recurringLabel} note={operations.familyNote} locale={locale} />
    </Band>

    {/* ===== 7 · CTA — bleu nuit, une carte posée ===== */}
    <CardPanel id="echange" className="dark-cta solutions-cta svc-cta">
      {/* Le texte à gauche, les deux actions à droite l'une au-dessus de
          l'autre, et la mention sous elles. Pas de carte : le CTA ferme la
          page, il n'a rien à illustrer. */}
      <div className="col card-body cta-panel cta-booking-grid">
        <div className="cta-booking-copy">
          <Lede title={p.ctaTitle} accents={p.ctaTitleAccents} text={p.ctaText} />
        </div>
        <div className="svc-cta-actions">
          <Link className="btn btn--primary" href={bookHref}>{getContent(locale).site.ctaShort}<ArrowRight aria-hidden /></Link>
          <Link className="btn btn--ghost" href={formHref}>{fr ? "Nous contacter" : "Contact us"}</Link>
          <p className="cta-note">{fr ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p>
        </div>
      </div>
    </CardPanel>

    {/* ===== 8 · FAQ — bleu clair, dernière section de la page ===== */}
    <Band id="faq" className="svc-band svc-tint svc-rhythm svc-faq">
      <Lede kicker={fr ? "Questions fréquentes" : "Frequently asked"} title={p.faqTitle} accents={p.faqTitleAccents} />
      <div className="section-gap"><FaqAccordion items={[...p.faqExtra, ...d.faq]} /></div>
    </Band>
  </Shell>;
}
