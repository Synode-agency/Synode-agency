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
import { CooryDashboardLight } from "@/components/illustrations";
import { CooryContextSection, CooryGoalsSection, cooryContent } from "@/components/coory";
import cooryStyles from "@/components/coory/coory-sections.module.css";
import { HomeWorkCards } from "./home-work-cards";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { COORY_DEMO, COORY_DEMO_URL, cooryCardCopy, findWork, work, type WorkItem, type WorkKind } from "@/lib/work";
import { siteUrl } from "@/lib/site-url";

/** La pastille dit la NATURE du projet avant qu'on ait lu son titre. */
const BADGE: Record<WorkKind, string> = {
  internal: "badge badge--live",
  demo: "badge badge--demo",
  client: "badge badge--live",
  software: "badge badge--live",
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
  const coory = findWork(locale, "coory");
  const cooryCard = cooryCardCopy(locale);
  const pagePath = path(locale, ROUTES.work);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "fr" ? "Réalisations de Synode : logiciels métier et IA" : "Synode work: business software and AI",
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
        coory && {
          "@type": "ListItem",
          position: 2,
          url: `${siteUrl}${pagePath}/${coory.slug}`,
          name: cooryCard.title,
          description: cooryCard.text,
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
          ? <><span>Nos réalisations :</span><br className="only-desktop" /> logiciels métier et IA</>
          : <><span>Our work:</span> business software and AI</>}
        aside={<HeroGallery locale={locale} />}
      >
        <p>{w.intro.text}</p>
        <div className="btn-row">
          <Link href="#liste" className="btn btn--primary">{locale === "fr" ? "Voir les projets" : "See the projects"}<ArrowRight aria-hidden /></Link>
          <Link href={bookHref} className="btn btn--ghost">{site.ctaShort}</Link>
        </div>
        <span className="hero-reassurance">{locale === "fr" ? <>* Chaque projet garde son statut visible : outil interne, outil en bêta ou projet client.</> : "* Every project keeps its status visible: internal tool, beta tool or client project."}</span>
      </PageHero>

      <Band id="liste" tone="white">
        <Lede
          title={locale === "fr" ? "Projets en cours : logiciels métier et IA" : "Current projects: business software and AI"}
          accents={locale === "fr" ? ["Projets en cours"] : ["Current projects"]}
          text={locale === "fr"
            ? "Découvrez des logiciels et des solutions développés autour de besoins métier concrets, avec leur statut réel, leurs usages et les technologies mobilisées."
            : "Explore software and solutions built around concrete business needs, with their actual status, uses and the technologies involved."}
        />
        {/* Les deux mêmes cartes que la section Réalisations de l'accueil,
            au même graphisme et avec les mêmes libellés, mais en rangée :
            visuel à gauche, contenu à droite. Voir `home-work-cards`. */}
        <HomeWorkCards locale={locale} layout="row" heading="h3" />

      </Band>

      {/* ===== LE CTA — une carte bleu nuit posée sur la section, comme sur
          les pages services et non une bande pleine largeur. Le texte à
          gauche, les deux actions à droite l'une au-dessus de l'autre :
          `svc-cta` et `svc-cta-actions` portent cette composition, elles ne
          sont pas réservées aux pages services. ===== */}
      <CardPanel id="conclusion" className="dark-cta svc-cta" shellClassName="cta-shell--tint cta-shell--tall">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <Lede title={w.cta.title} accents={locale === "fr" ? ["solution adaptée"] : ["solution"]} text={w.cta.text} />
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
  const isCoory = item.slug === "coory";
  const sections = nexusSections(locale, item, d);
  const coorySections = cooryContent(locale, item, d);
  const structuredTitle = item.title.replaceAll("\n", " ");
  /* Le nom du produit : ce qui précède le tiret du titre (« Nexus », « Coory »). */
  const productName = item.title.split(/ [-—] /)[0];
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
          name: productName,
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
          accents={item.accent ? [item.accent] : undefined}
          text={item.problem}
        />
        {isCoory ? (
          /* Le statut et le bouton de la démo partagent la troisième case de
             la grille du hero : voir `.heroSplit` dans
             `hero-dashboard.module.css`, qui place ses enfants par rang. */
          <div>
            <p className="work-status section-gap-sm">{item.status}</p>
            <div className="btn-row section-gap-sm">
              {COORY_DEMO_URL ? (
                <a className="btn btn--ghost" href={COORY_DEMO_URL} target="_blank" rel="noopener noreferrer">
                  {locale === "fr" ? "Essayer la démo" : "Try the demo"}<ArrowRight aria-hidden />
                </a>
              ) : (
                /* La démo n'est pas encore en ligne : le bouton est là,
                   désactivé, sans lien. Voir `COORY_DEMO_URL` dans work.ts. */
                <span
                  className={`btn btn--ghost ${cooryStyles.demoSoon}`}
                  role="link"
                  aria-disabled="true"
                  title={locale === "fr" ? "Disponible prochainement" : "Available soon"}
                >
                  {locale === "fr" ? "Essayer la démo" : "Try the demo"}<ArrowRight aria-hidden />
                </span>
              )}
            </div>
          </div>
        ) : (
          <p className="work-status section-gap-sm">{item.status}</p>
        )}
        {isCoory ? (
          /* La colonne de droite de Coory (demande d'Antonino du 14/11) :
             l'application, calée en haut, puis les accès de la démo juste
             dessous, sans encadré. Sur téléphone aussi, à la place de la card
             compacte : l'illustration est simplement réduite. La classe
             `hero-visual-desktop` est gardée pour la séquence d'entrée du
             héros (`scroll-reveal.tsx`) ; `heroAside` annule son masquage
             sous 900px. */
          <div className={`hero-visual-desktop ${cooryStyles.heroAside}`}>
            <CooryDashboardLight frame="app" />
            {/* Les accès de la démo (14/11/2026) : compte partagé, et le code
                pour créer son propre espace. Valeurs des variables Netlify. */}
            {COORY_DEMO_URL && COORY_DEMO.email && COORY_DEMO.password ? (
              <div className={cooryStyles.demoAccess}>
                <p className={cooryStyles.demoTitle}>
                  {locale === "fr" ? "Accès de démonstration" : "Demo access"}
                </p>
                {/* Le petit tableau : les deux identifiants sur une ligne,
                    la règle du compte partagé en pied, plus discrète. */}
                <div className={cooryStyles.demoTable}>
                  <dl className={cooryStyles.demoList}>
                    <div>
                      <dt>{locale === "fr" ? "Adresse" : "Email"}</dt>
                      <dd>{COORY_DEMO.email}</dd>
                    </div>
                    <div>
                      <dt>{locale === "fr" ? "Mot de passe" : "Password"}</dt>
                      <dd>{COORY_DEMO.password}</dd>
                    </div>
                  </dl>
                  <p className={cooryStyles.demoFine}>
                    {locale === "fr"
                      ? "Assistant IA inclus. Compte partagé : n’y mettez aucune donnée réelle, tout est remis à zéro chaque nuit."
                      : "AI assistant included. Shared account: please do not enter real data, everything is reset every night."}
                  </p>
                </div>
                {COORY_DEMO.accessCode ? (
                  <p className={cooryStyles.demoNote}>
                    {locale === "fr"
                      ? "Vous préférez votre propre espace ? Créez un compte avec le code d’accès "
                      : "Prefer your own workspace? Create an account with the access code "}
                    <strong className={cooryStyles.demoCode}>{COORY_DEMO.accessCode}</strong>
                    {locale === "fr" ? ", sans l’Assistant IA." : ", without the AI assistant."}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : (
          <>
          <div className="hero-visual-desktop">
            <HeroDashboard locale={locale} />
          </div>
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
          </>
        )}
      </Band>

      {/* ⚠ Les deux bandes portent leur ton par une CLASSE, pas par `tone` :
          le thème peint les bandes selon leur rang, et `tone` seul ne pèse
          rien contre lui. Voir `.white-band` et `.tint-band` dans
          studio.css. */}
      {/* ===== LE CONTEXTE ET LES OBJECTIFS — deux sections en deux blocs :
          tous les textes à gauche, les écrans de Nexus à droite. Les textes
          du projet viennent de `work.ts` et ne sont que découpés, jamais
          recopiés : voir `components/nexus/nexus-sections`. ===== */}
      {isCoory ? (
        <>
          <div id="contexte">
            <CooryContextSection c={coorySections.context} />
          </div>
          <div id="objectifs">
            <CooryGoalsSection c={coorySections.goals} />
          </div>
        </>
      ) : (
        <>
          <div id="contexte">
            <ContextSection c={sections.context} w={windowsFor(locale)} />
          </div>
          <div id="objectifs">
            <GoalsSection c={sections.goals} w={windowsFor(locale)} />
          </div>
        </>
      )}

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
