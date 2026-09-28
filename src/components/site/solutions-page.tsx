import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
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
      <Band id="top" tone="base">
        <Lede as="h1" kicker={solutions.kicker} title={solutions.title} text={solutions.text} />
      </Band>

      {/* ----------------------------------------------- Ce qu'elle peut réunir */}
      <Band id="briques" tone="white">
        <Lede title={solutions.bricksTitle} text={solutions.bricksText} />
        <div className="tile-grid tile-grid--3 section-gap">
          {solutions.bricks.map((b) => (
            <div key={b.title} className="tile">
              <span className="tile-title">{b.title}</span>
              <span className="tile-text">{b.text}</span>
            </div>
          ))}
        </div>
      </Band>

      {/* -------------------------------------------------------- Territoires */}
      <Band id="territoires" tone="base">
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
      </Band>

      {/* ---------------------------------------------------- Ce que vous recevez */}
      <Band id="livrables" tone="white">
        <Lede title={solutions.deliverablesTitle} />
        <ul className="checks section-gap">
          {solutions.deliverables.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <p className="prose-body section-gap-sm">{solutions.deliverablesNote}</p>
      </Band>

      {/* ------------------------------------------------------ Dimensionnement */}
      <Band id="dimensionnement" tone="base">
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
      </Band>

      {/* ---------------------------------------------------- Modèle économique */}
      <Band id="modele" tone="ink">
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
      </Band>

      {/* ------------------------------------------------------------------ FAQ */}
      <Band id="faq" tone="base">
        <Lede title={solutions.faqTitle} />
        <div className="section-gap">
          <FaqAccordion items={solutions.faq} />
        </div>
      </Band>

      {/* -------------------------------------- L'encart imposé par l'architecture */}
      <Band id="autre" tone="blue">
        <Lede title={solutions.notInList.title} text={solutions.notInList.text} align="center" />
        <div className="btn-row cta-actions">
          <Link href={formHref} className="btn btn--primary">
            {solutions.notInList.cta}
            <ArrowRight aria-hidden />
          </Link>
          <Link href={bookHref} className="btn btn--ghost">
            {site.ctaShort}
          </Link>
        </div>
      </Band>
    </Shell>
  );
}
