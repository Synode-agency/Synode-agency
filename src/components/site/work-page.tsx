import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { WorkHeroStack } from "@/components/work-hero-stack";
import { HomeWorkCards } from "./home-work-cards";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { projectTwoCardCopy, work, type WorkItem, type WorkKind } from "@/lib/work";
import { siteUrl } from "@/lib/site-url";

/** La pastille dit la NATURE du projet avant qu'on ait lu son titre. */
const BADGE: Record<WorkKind, string> = {
  internal: "badge badge--wip",
  demo: "badge badge--demo",
  client: "badge badge--live",
};

/**
 * La liste des réalisations.
 *
 * Elle est presque vide, et c'est ce qu'il y a de plus honnête à montrer
 * aujourd'hui : un outil interne en construction, aucune démo fonctionnelle,
 * aucun projet client livré. Une page de réalisations remplie d'exemples
 * inventés est ce qui se repère le plus vite chez un prestataire qui démarre.
 */
export function WorkPage({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);
  const w = work(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const nexus = w.items[0];
  const demo = projectTwoCardCopy(locale);
  const pagePath = path(locale, ROUTES.work);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "fr" ? "Réalisations IA, projets et démonstrateurs Synode" : "Synode AI projects and demonstrations",
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
          name: demo.title,
          description: demo.text,
        },
      ].filter(Boolean),
    },
  };

  return (
    <Shell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        /* La coupe ne vaut qu'à partir de 768px, comme tous les titres du
           site : sur téléphone la phrase coule d'elle-même. */
        title={locale === "fr"
          ? <><span>Réalisations IA :</span><br className="max-md:hidden" /> nos projets et solutions</>
          : <><span>AI projects</span> and custom solutions by Synode</>}
        aside={<WorkHeroStack locale={locale} />}
      >
        <p>{w.intro.text}</p>
        <div className="btn-row">
          <Link href="#liste" className="btn btn--primary">{locale === "fr" ? "Voir les projets" : "See the projects"}<ArrowRight aria-hidden /></Link>
          <Link href={bookHref} className="btn btn--ghost">{site.ctaShort}</Link>
        </div>
        <span className="hero-reassurance">{locale === "fr" ? "* Chaque projet garde son statut visible : outil interne, démonstration ou projet client." : "* Every project keeps its status visible: internal tool, demo or client project."}</span>
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
        <div className="work-editorial-note"><h3 className="eyebrow">{locale === "fr" ? "Des réalisations IA présentées avec transparence" : "AI work presented transparently"}</h3><p>{locale === "fr" ? "Les prochaines démonstrations et réalisations IA rejoindront cette sélection lorsqu’elles seront réellement prêtes à être présentées. Chaque projet conserve un statut explicite : outil interne, démonstration ou projet client autorisé." : "Future AI demonstrations and projects will join this selection when they are genuinely ready to be shown. Every project keeps an explicit status: internal tool, demonstration or authorised client project."}</p></div>

      </Band>

      {/* ===== LE CTA — une carte bleu nuit posée sur la section, comme sur
          les pages services et non une bande pleine largeur. Le texte à
          gauche, les deux actions à droite l'une au-dessus de l'autre :
          `svc-cta` et `svc-cta-actions` portent cette composition, elles ne
          sont pas réservées aux pages services. ===== */}
      <CardPanel id="conclusion" className="dark-cta svc-cta" shellClassName="cta-shell--tint cta-shell--tall">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <Lede title={w.cta.title} accents={locale === "fr" ? ["solution IA."] : ["AI solution."]} text={w.cta.text} />
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
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <span className={BADGE[item.kind]}>{w.kinds[item.kind]}</span>
        <Lede as="h1" title={item.title} text={item.problem} />
        <p className="work-status section-gap-sm">{item.status}</p>
      </Band>

      {item.todo && (
        <Band tone="white">
          <div className="todo">
            <span className="todo-label">{w.todoLabel}</span>
            <p>{w.todoText}</p>
          </div>
        </Band>
      )}

      <Band id="contexte" tone={item.todo ? "base" : "white"}>
        <Lede title={d.contextTitle} />
        <p className="prose-body section-gap-sm">{item.context}</p>

        <h3 className="ds-demo-title section-gap">{locale === "fr" ? "Parcours fonctionnel envisagé" : "Planned functional journey"}</h3>
        <div className="project-journey project-journey--detail section-gap-sm">{item.journey.map((step, index) => <span key={step}>{index > 0 && <ArrowRight aria-hidden />}<span>{step}</span></span>)}</div>

        {item.does.length > 0 && (
          <>
            <h3 className="ds-demo-title section-gap">{d.doesTitle}</h3>
            <ul className="checks section-gap-sm">
              {item.does.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </>
        )}

        <h3 className="ds-demo-title section-gap">{d.aiTitle}</h3>
        <p className="prose-body section-gap-sm">{item.aiRole}</p>
      </Band>

      <Band id="objectifs" tone="base">
        <Lede title={d.goalsTitle} text={d.goalsNote} />
        <ul className="checks section-gap">
          {item.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>

        <h3 className="ds-demo-title section-gap">{d.limitsTitle}</h3>
        <ul className="checks section-gap-sm">
          {item.limits.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      </Band>

      <Band id="conclusion" tone="blue">
        <Lede title={d.cta} align="center" />
        <div className="btn-row cta-actions">
          <Link href={formHref} className="btn btn--primary">
            {getContent(locale).site.cta}
            <ArrowRight aria-hidden />
          </Link>
          <Link href={path(locale, ROUTES.work)} className="btn btn--ghost">
            <ArrowLeft aria-hidden />
            {d.backLabel}
          </Link>
        </div>
      </Band>
    </Shell>
  );
}
