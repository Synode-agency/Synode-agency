import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { WorkProjectCard } from "./work-project-card";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { work, workItems, type WorkItem, type WorkKind } from "@/lib/work";

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

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" kicker={w.intro.kicker} title={w.intro.title} text={w.intro.text} />
      </Band>

      <Band id="liste" tone="white">
        <div className="projects-gallery">
          {workItems(locale).map(item => <WorkProjectCard key={item.slug} item={item} locale={locale} />)}
        </div>
        <div className="work-editorial-note"><span className="eyebrow">{locale === "fr" ? "La suite se construit" : "More work is taking shape"}</span><p>{locale === "fr" ? "Les prochaines démonstrations et réalisations rejoindront cette sélection une fois prêtes à être présentées. Chaque projet garde son statut visible : outil interne, démonstration ou projet client." : "Future demos and projects will join this selection when they are ready to be shown. Every project keeps its status visible: internal tool, demo or client project."}</p></div>

      </Band>

      <Band id="conclusion" tone="blue">
        <Lede title={w.cta.title} text={w.cta.text} align="center" />
        <div className="btn-row cta-actions">
          <Link href={bookHref} className="btn btn--primary">
            {site.cta}
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </Band>
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
