import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";

/**
 * La méthode, étape par étape.
 *
 * Chaque étape dit trois choses : ce que nous faisons, ce que le client
 * apporte, et ce qui en sort. La colonne du milieu est celle qui compte : un
 * projet qui prend du retard, c'est presque toujours un accès qui n'est pas
 * arrivé ou une validation qui n'a pas été donnée. Le dire ici évite d'avoir
 * à le reprocher plus tard.
 *
 * La page ne promet AUCUN délai. L'architecture l'interdit explicitement, et
 * pour une bonne raison : un délai annoncé sans connaître le périmètre est
 * une promesse qu'on tiendra par hasard.
 */
export function MethodPage({ locale }: { locale: Locale }) {
  const { method, site } = getContent(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" kicker={method.kicker} title={method.title} text={method.text} />
      </Band>

      <Band id="etapes" tone="white">
        <ol className="steps">
          {method.steps.map((step, i) => (
            <li key={step.title} className="step">
              <div className="step-head">
                <span aria-hidden className="step-rank">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="step-title">{step.title}</h2>
              </div>
              <dl className="step-grid">
                <div>
                  <dt>{method.columns.work}</dt>
                  <dd>{step.work}</dd>
                </div>
                <div>
                  <dt>{method.columns.client}</dt>
                  <dd>{step.client}</dd>
                </div>
                <div>
                  <dt>{method.columns.output}</dt>
                  <dd>{step.output}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </Band>

      <Band id="precisions" tone="base">
        <Lede title={method.notesTitle} />
        <div className="tile-grid tile-grid--2 section-gap">
          {method.notes.map((n) => (
            <div key={n.title} className="tile">
              <span className="tile-title">{n.title}</span>
              <span className="tile-text">{n.text}</span>
            </div>
          ))}
        </div>
        <p className="prose-body section-gap-sm">{method.noDelay}</p>
      </Band>

      <Band id="conclusion" tone="blue">
        <Lede title={method.cta} align="center" />
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
