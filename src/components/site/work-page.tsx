import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { HeroGallery } from "@/components/realisations";
import { HeroDashboard } from "@/components/nexus";
import { HeroCompact } from "@/components/hero-compact";
import { ContextSection } from "@/components/nexus/context-section";
import { GoalsSection } from "@/components/nexus/goals-section";
import { nexusSections } from "@/components/nexus/nexus-sections";
import { windowsFor } from "@/components/nexus/windows-content";
import nexus from "@/components/nexus/hero-dashboard.module.css";
import { HomeWorkCards } from "./home-work-cards";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { projectTwoCardCopy, work, type WorkItem, type WorkKind } from "@/lib/work";
import { siteUrl } from "@/lib/site-url";

/** La pastille dit la NATURE du projet avant qu'on ait lu son titre. */
const BADGE: Record<WorkKind, string> = {
  internal: "badge badge--live",
  demo: "badge badge--demo",
  client: "badge badge--live",
};

/**
 * La liste des réalisations.
 *
 * Elle présente les projets avec leur état réel, sans résultat inventé ni
 * référence client non autorisée.
 */
export function WorkPage({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const w = work(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const nexus = w.items[0];
  const projectTwo = projectTwoCardCopy(locale);
  const pagePath = path(locale, ROUTES.work);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "fr" ? "Réalisations et projets IA de Synode" : "Synode AI projects and work",
    description: w.intro.text,
    url: `${siteUrl}${pagePath}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        nexus && {
          "@type": "ListItem",
          position: 1,
          url: `${siteUrl}${pagePath}/${nexus.slug}`,
          name: locale === "fr" ? "Nexus — Logiciel de prospection" : "Nexus — Prospecting software",
          description: nexus.problem,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: projectTwo.title,
          description: projectTwo.text,
        },
      ].filter(Boolean),
    },
  };

  return (
    <Shell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        kicker={locale === "fr" ? "Réalisations" : "Work"}
        kickerMobileOnly
        /* La coupe ne vaut qu'à partir de 768px, comme tous les titres du
           site : sur téléphone la phrase coule d'elle-même. */
        title={locale === "fr"
          ? <><span>Réalisations IA :</span><br className="only-desktop" /> nos projets et solutions</>
          : <><span>AI projects</span> and custom solutions by Synode</>}
        aside={<HeroGallery locale={locale} />}
      >
        <p>{w.intro.text}</p>
        <div className="btn-row">
          <Link href="#liste" className="btn btn--primary">{locale === "fr" ? "Voir les projets" : "See the projects"}<ArrowRight aria-hidden /></Link>
          <Link href={bookHref} className="btn btn--ghost">{site.ctaShort}</Link>
        </div>
        <span className="hero-reassurance">{locale === "fr" ? <>* Chaque projet garde son statut visible : outil interne, projet en préparation ou projet client.</> : "* Every project keeps its status visible: internal tool, project in preparation or client project."}</span>
      </PageHero>

      <Band id="liste" tone="white">
        <Lede
          title={locale === "fr" ? "Projets IA et solutions en cours" : "Current AI projects and solutions"}
          accents={locale === "fr" ? ["Projets IA"] : ["AI projects"]}
          text={locale === "fr"
            ? "Découvrez des solutions IA développées autour de besoins métier concrets, avec leur statut réel, leurs usages et les technologies mobilisées."
            : "Explore AI solutions developed around concrete business needs, with their actual status, uses and the technologies involved."}
        />
        {/* Les deux mêmes cartes que la section Réalisations de l'accueil,
            au même graphisme et avec les mêmes libellés, mais en rangée :
            visuel à gauche, contenu à droite. Voir `home-work-cards`. */}
        <HomeWorkCards locale={locale} layout="row" heading="h3" />
        <div className="work-editorial-note"><h3 className="eyebrow">{locale === "fr" ? "Des réalisations IA présentées avec transparence" : "AI work presented transparently"}</h3><p>{locale === "fr" ? "Les prochains projets et réalisations IA rejoindront cette sélection lorsqu’ils seront réellement prêts à être présentés. Chaque projet conserve un statut explicite : outil interne, projet en préparation ou projet client autorisé." : "Future AI projects and work will join this selection when they are genuinely ready to be shown. Every project keeps an explicit status: internal tool, project in preparation or authorised client project."}</p></div>

      </Band>

      {/* ===== LE CTA — une carte bleu nuit posée sur la section, comme sur
          les pages services et non une bande pleine largeur. Le texte à
          gauche, les deux actions à droite l'une au-dessus de l'autre :
          `svc-cta` et `svc-cta-actions` portent cette composition, elles ne
          sont pas réservées aux pages services. ===== */}
      <CardPanel id="conclusion" className="dark-cta svc-cta" shellClassName="cta-shell--tint cta-shell--tall">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <Lede title={w.cta.title} accents={locale === "fr" ? ["solution\u00a0IA"] : ["AI solution"]} text={w.cta.text} />
          </div>
          <div className="svc-cta-actions">
            <Link className="btn btn--primary" href={bookHref}>{site.cta}<ArrowRight aria-hidden /></Link>
            <Link className="btn btn--ghost" href={formHref}>{locale === "fr" ? "Nous contacter" : "Contact us"}</Link>
            <p className="cta-note">{locale === "fr" ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p>
          </div>
        </div>
      </CardPanel>
    </Shell>
  );
}

/**
 * La fiche d'une réalisation.
 *
 * Elle sépare ce que l'outil FAIT de ce que nous CHERCHONS à obtenir. Cette
 * séparation est la seule chose qui empêche un objectif de se lire comme un
 * résultat mesuré, et c'est exactement le glissement que l'architecture
 * interdit.
 */
export function WorkDetailPage({ locale, item }: { locale: Locale; item: WorkItem }) {
  const w = work(locale);
  const d = w.detail;
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const itemPath = `${path(locale, ROUTES.work)}/${item.slug}`;
  const sections = nexusSections(locale, item, d);
  const structuredTitle = item.title.replaceAll("\n", " ");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: structuredTitle,
        description: item.problem,
        url: `${siteUrl}${itemPath}`,
        inLanguage: locale === "fr" ? "fr-BE" : "en-BE",
        about: {
          "@type": "Thing",
          name: "Nexus",
          description: item.problem,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "fr" ? "Réalisations" : "Work",
            item: `${siteUrl}${path(locale, ROUTES.work)}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: structuredTitle,
            item: `${siteUrl}${itemPath}`,
          },
        ],
      },
    ],
  };

  return (
    <Shell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Le texte reste à gauche, à l'identique ; le tableau de bord est
          ajouté à droite. La grille vit sur le `.col` de la bande : voir le
          commentaire au bas de `hero-dashboard.module.css`. */}
      <Band id="top" tone="base" className="work-detail-hero" bodyClassName={nexus.heroSplit}>
        <span className={BADGE[item.kind]}>{w.kinds[item.kind]}</span>
        <Lede
          as="h1"
          title={item.title}
          accents={item.slug === "nexus" ? [locale === "fr" ? "B2B assisté par IA" : "B2B prospecting"] : undefined}
          text={item.problem}
        />
        <p className="work-status section-gap-sm">{item.status}</p>
        <div className="hero-visual-desktop"><HeroDashboard locale={locale} /></div>
        <HeroCompact
          title={locale === "fr" ? "Nexus · Vue d’ensemble" : "Nexus · Overview"}
          status={locale === "fr" ? "outil interne" : "internal tool"}
          tiles={locale === "fr" ? [
            { label: "Total leads", value: "570" },
            { label: "Leads qualifiés", value: "128" },
            { label: "Leads contactés", value: "64" },
            { label: "Jobs en cours", value: "3" },
          ] : [
            { label: "Total leads", value: "570" },
            { label: "Qualified leads", value: "128" },
            { label: "Leads contacted", value: "64" },
            { label: "Jobs running", value: "3" },
          ]}
        />
      </Band>

      {/* ⚠ Les deux bandes portent leur ton par une CLASSE, pas par `tone` :
          le thème peint les bandes selon leur rang, et `tone` seul ne pèse
          rien contre lui. Voir `.white-band` et `.tint-band` dans
          studio.css. */}
      {/* ===== LE CONTEXTE ET LES OBJECTIFS — deux sections en deux blocs :
          tous les textes à gauche, les écrans de Nexus à droite. Les textes
          du projet viennent de `work.ts` et ne sont que découpés, jamais
          recopiés : voir `components/nexus/nexus-sections`. ===== */}
      <div id="contexte">
        <ContextSection c={sections.context} w={windowsFor(locale)} />
      </div>
      <div id="objectifs">
        <GoalsSection c={sections.goals} w={windowsFor(locale)} />
      </div>

      {/* ===== LE CTA — une carte bleu nuit posée sur une section blanche,
          comme sur les autres pages : le texte à gauche, les deux actions à
          droite l'une au-dessus de l'autre. ===== */}
      <CardPanel id="conclusion" className="dark-cta svc-cta" shellClassName="cta-shell--tall">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <Lede title={d.cta} text={d.ctaText} />
          </div>
          <div className="svc-cta-actions">
            <Link className="btn btn--primary" href={bookHref}>{getContent(locale).site.cta}<ArrowRight aria-hidden /></Link>
            <Link className="btn btn--ghost" href={formHref}>{locale === "fr" ? "Nous contacter" : "Contact us"}</Link>
            <p className="cta-note">{locale === "fr" ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p>
          </div>
        </div>
      </CardPanel>
    </Shell>
  );
}
