import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Hero } from "@/components/site/hero";
import { CaseCards } from "@/components/site/case-cards";
import { CtaSection } from "@/components/site/cta-section";
import { NexusVisual } from "@/components/nexus-visual";
import { CooryAssistant, CooryDesktopMobile, CooryProgramme } from "@/components/illustrations";
import { COORY_DEMO } from "@/lib/coory-demo";
import { ROUTES, getContent, path, type CaseStudy, type Locale } from "@/content";

/* La pastille de chaque état, comme sur les cartes. */
const BADGE = { live: "badge badge--live", beta: "badge badge--wip", demo: "badge badge--demo" } as const;

/**
 * LA PAGE RÉALISATIONS (brief, 6.3) : le titre, les cartes, l'appel final.
 */
export function WorkListPage({ locale }: { locale: Locale }) {
  const { work } = getContent(locale);
  return (
    <Shell locale={locale}>
      <Hero locale={locale} eyebrow={work.hero.eyebrow} title={work.hero.title} subtitle={work.hero.subtitle} />
      <Band id="liste" className="rf-section">
        <CaseCards locale={locale} heading="h2" />
      </Band>
      <CtaSection locale={locale} />
    </Shell>
  );
}

/* Les écrans de chaque réalisation : ses vrais écrans, animés, avec des
   données fictives. Le premier est l'écran principal de la fiche ; les
   suivants illustrent « Ce qu'on a construit ». */
function screensFor(slug: string, locale: Locale): { main: ReactNode; stage: boolean; more: ReactNode[] } | null {
  if (slug === "nexus") return { main: <NexusVisual locale={locale} />, stage: false, more: [] };
  if (slug === "coory") return { main: <CooryDesktopMobile />, stage: true, more: [<CooryProgramme key="programme" />, <CooryAssistant key="assistant" />] };
  return null;
}

/**
 * LA FICHE D'UNE RÉALISATION, au modèle du brief (6.3) : l'en-tête (nom,
 * secteur, statut, année), le problème, ce qu'on a construit avec ses
 * écrans, le résultat, la citation si elle existe, les technologies, puis
 * l'appel final.
 *
 * Le résultat n'invente aucun chiffre : ce sont des constats honnêtes tant
 * qu'aucune mesure n'existe.
 */
export function CaseStudyPage({ locale, item }: { locale: Locale; item: CaseStudy }) {
  const { work, site } = getContent(locale);
  const d = work.detail;
  const screens = screensFor(item.slug, locale);
  const showDemo = item.slug === "coory" && COORY_DEMO.url !== "";

  return (
    <Shell locale={locale}>
      <Hero locale={locale} className="case-hero" eyebrow={<span className={BADGE[item.status]}>{site.caseStatus[item.status]}</span>} title={item.name} subtitle={item.summary}>
        <dl className="case-meta">
          <div>
            <dt>{d.sector}</dt>
            <dd>{item.sector}</dd>
          </div>
          <div>
            <dt>{d.status}</dt>
            <dd>{site.caseStatus[item.status]}</dd>
          </div>
          <div>
            <dt>{d.year}</dt>
            <dd>{item.year}</dd>
          </div>
        </dl>
        {item.note && <p className="case-note">{item.note}</p>}
      </Hero>

      {screens && (
        <Band id="ecran" className="rf-section case-screen-band">
          <div className={screens.stage ? "case-screen case-screen--stage" : "case-screen"}>{screens.main}</div>
        </Band>
      )}

      <Band id="projet" className="rf-section">
        <div className="rf-split">
          <div>
            <h2 className="rf-label case-label">{d.problem}</h2>
            <p className="case-text">{item.problem}</p>
          </div>
          <div>
            <h2 className="rf-label case-label">{d.built}</h2>
            <p className="case-text">{item.built}</p>
          </div>
        </div>
        {screens && screens.more.length > 0 && (
          <div className="case-more section-gap-sm" role="group" aria-label={d.screens}>
            {screens.more.map((node, i) => (
              <div key={i} className="case-screen case-screen--stage case-screen--small">
                {node}
              </div>
            ))}
          </div>
        )}
      </Band>

      <Band id="resultat" className="rf-section">
        <div className="rf-split">
          <div>
            <h2 className="rf-label case-label">{d.result}</h2>
            <ul className="check-list case-results">
              {item.results.map((r) => (
                <li key={r}>
                  <Check aria-hidden />
                  <p>{r}</p>
                </li>
              ))}
            </ul>
            {item.quote.text && (
              <figure className="case-quote">
                <blockquote>{item.quote.text}</blockquote>
                {item.quote.author && <figcaption>{item.quote.author}</figcaption>}
              </figure>
            )}
          </div>
          <div className="case-side">
            <h2 className="rf-label case-label">{d.tech}</h2>
            <p className="case-tech">{item.tech}</p>
            {showDemo && (
              <div className="case-demo">
                <h2 className="case-demo-title">{work.demo.title}</h2>
                <p>{work.demo.text}</p>
                {COORY_DEMO.email && (
                  <dl className="case-demo-access">
                    <div>
                      <dt>{work.demo.email}</dt>
                      <dd>{COORY_DEMO.email}</dd>
                    </div>
                    {COORY_DEMO.password && (
                      <div>
                        <dt>{work.demo.password}</dt>
                        <dd>{COORY_DEMO.password}</dd>
                      </div>
                    )}
                  </dl>
                )}
                <a className="go" href={COORY_DEMO.url} target="_blank" rel="noopener noreferrer">
                  {work.demo.link}
                  <ArrowUpRight aria-hidden />
                </a>
              </div>
            )}
          </div>
        </div>
        <Link className="go case-back" href={path(locale, ROUTES.work)}>
          <ArrowLeft aria-hidden />
          {d.back}
        </Link>
      </Band>

      <CtaSection locale={locale} />
    </Shell>
  );
}
