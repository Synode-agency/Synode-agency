import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Panel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { domains } from "@/lib/use-cases";

/**
 * La page Solutions : l'offre unique, et ce qu'elle peut contenir.
 *
 * Le point le plus important de cette page n'est pas la liste des briques,
 * c'est l'encart de fin : « votre besoin ne figure pas ici ». Une page qui
 * énumère cinq possibilités donne au visiteur l'impression qu'il doit s'y
 * ranger. L'architecture impose cet encart pour cette raison, et il est
 * traité comme un bloc à part entière, pas comme une note de bas de page.
 */
export function SolutionsPage({ locale }: { locale: Locale }) {
  const { site, solutions } = getContent(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;

  return (
    <Shell locale={locale}>
      <Panel id="top">
        <Lede as="h1" kicker={solutions.kicker} title={solutions.title} text={solutions.text} />
      </Panel>

      {/* ----------------------------------------------- Ce qu'elle peut réunir */}
      <Panel id="briques" tone="quiet">
        <Lede title={solutions.bricksTitle} text={solutions.bricksText} />
        <div className="tile-grid tile-grid--3 section-gap">
          {solutions.bricks.map((b) => (
            <div key={b.title} className="tile">
              <span className="tile-title">{b.title}</span>
              <span className="tile-text">{b.text}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* -------------------------------------------------------- Territoires */}
      <Panel id="territoires">
        <Lede title={solutions.domainsTitle} text={solutions.domainsText} />
        <ul className="rows section-gap">
          {domains(locale).map((d) => (
            <li key={d.slug}>
              <Link href={`${path(locale, ROUTES.useCases)}#${d.slug}`} className="row row--split">
                <span className="row-title">{d.title}</span>
                <span className="row-text">{d.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={path(locale, ROUTES.useCases)} className="go section-gap-sm">
          {solutions.domainsCta}
          <ArrowRight aria-hidden />
        </Link>
      </Panel>

      {/* ---------------------------------------------------- Ce que vous recevez */}
      <Panel id="livrables" tone="quiet">
        <Lede title={solutions.deliverablesTitle} />
        <ul className="checks section-gap">
          {solutions.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <p className="prose-body section-gap-sm">{solutions.deliverablesNote}</p>
      </Panel>

      {/* ------------------------------------------------------ Dimensionnement */}
      <Panel id="dimensionnement">
        <Lede title={solutions.sizingTitle} text={solutions.sizingText} />
        <div className="tile-grid tile-grid--3 section-gap">
          {solutions.sizing.map((s) => (
            <div key={s.title} className="tile">
              <span className="tile-title">{s.title}</span>
              <span className="tile-text">{s.text}</span>
            </div>
          ))}
        </div>
        <p className="prose-body section-gap-sm">{solutions.sizingNote}</p>
      </Panel>

      {/* ---------------------------------------------------- Modèle économique */}
      <Panel id="modele" tone="ink">
        <Lede title={solutions.pricingTitle} />
        <ol className="rows section-gap">
          {solutions.pricing.map((p, i) => (
            <li key={p.title}>
              <div className="row row--split">
                <span className="method-head">
                  <span aria-hidden className="rank">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="row-title">{p.title}</span>
                </span>
                <span className="row-text">{p.text}</span>
              </div>
            </li>
          ))}
        </ol>
        <p className="prose-body section-gap-sm">{solutions.pricingNote}</p>
      </Panel>

      {/* ------------------------------------------------------------------ FAQ */}
      <Panel id="faq">
        <Lede title={solutions.faqTitle} />
        <div className="section-gap">
          <FaqAccordion items={solutions.faq} />
        </div>
      </Panel>

      {/* -------------------------------------- L'encart imposé par l'architecture */}
      <Panel id="autre" tone="brand">
        <Lede title={solutions.notInList.title} text={solutions.notInList.text} align="center" />
        <div className="btn-row cta-actions">
          <Link href={formHref} className="btn btn--primary cta-primary">
            {solutions.notInList.cta}
            <ArrowRight aria-hidden />
          </Link>
          <Link href={bookHref} className="btn btn--ghost">
            {site.ctaShort}
          </Link>
        </div>
      </Panel>
    </Shell>
  );
}
