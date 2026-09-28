import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { casesOfDomain, domains, type UseCase } from "@/lib/use-cases";

/**
 * Les cas d'usage.
 *
 * Huit blocs, quatre territoires, et des ancres plutôt qu'un système de
 * filtres : pour huit exemples, un filtre est une mécanique de plus à
 * comprendre pour un gain nul.
 *
 * Chaque bloc dit AUSSI ce qu'il faut pour que ça marche et ce qui limite le
 * résultat. C'est contre-intuitif commercialement et c'est le but : un
 * prospect qui se disqualifie lui-même en lisant les prérequis nous fait
 * gagner un rendez-vous à tous les deux.
 *
 * Aucun de ces cas n'a de démonstration aujourd'hui. Le bloc affiche donc
 * une pastille « exemple de solution possible » plutôt qu'un lien mort, et
 * il basculera tout seul le jour où `demo` sera renseigné.
 */
export function UseCasesPage({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede
          as="h1"
          kicker={fr ? "Cas d’usage" : "Use cases"}
          title={
            fr
              ? "Quelques situations où\n^une solution IA peut vous aider."
              : "A few situations where\n^an AI solution can help."
          }
          text={
            fr
              ? "Huit exemples, rangés en quatre territoires. Chacun part d’un problème que vous avez peut-être déjà, pas d’une technologie que nous aurions envie d’installer."
              : "Eight examples, grouped into four areas. Each starts from a problem you may already have, not from a technology we happen to want to install."
          }
        />
        {/* Les quatre ancres. Un lecteur qui sait ce qu'il cherche va droit
            au bon endroit ; les autres font défiler. */}
        <nav aria-label={fr ? "Territoires" : "Areas"} className="anchors section-gap">
          {domains(locale).map((d) => (
            <a key={d.slug} href={`#${d.slug}`} className="anchor-pill">
              {d.title}
            </a>
          ))}
        </nav>
      </Band>

      {domains(locale).map((domain, di) => (
        <Band key={domain.slug} id={domain.slug} tone={di % 2 === 1 ? "white" : "base"}>
          <Lede title={domain.title} text={domain.text} />
          <div className="cases section-gap">
            {casesOfDomain(locale, domain.slug).map((c) => (
              <Case key={c.slug} item={c} locale={locale} />
            ))}
          </div>
        </Band>
      ))}

      <Band id="conclusion" tone="blue">
        <Lede
          title={
            fr
              ? "Votre situation n’est\n^dans aucun de ces huit cas ?"
              : "Your situation is in\n^none of these eight?"
          }
          text={
            fr
              ? "C’est le cas le plus fréquent. Ces exemples montrent comment nous travaillons, pas ce que nous savons faire."
              : "That is the usual case. These examples show how we work, not the limits of what we can build."
          }
          align="center"
        />
        <div className="btn-row cta-actions">
          <Link
            href={`${path(locale, ROUTES.contact)}#${ANCHORS.booking}`}
            className="btn btn--primary"
          >
            {getContent(locale).site.cta}
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </Band>
    </Shell>
  );
}

function Case({ item, locale }: { item: UseCase; locale: Locale }) {
  const fr = locale === "fr";
  /* Le contexte est prérempli par l'URL, et il reste modifiable : le
     formulaire ne fait que proposer un point de départ. */
  const askHref = `${path(locale, ROUTES.contact)}?cas=${item.slug}#${ANCHORS.form}`;

  return (
    <article id={item.slug} className="case">
      <header className="case-head">
        <h3 className="case-title">{item.title}</h3>
        {item.demo ? (
          <Link href={`${path(locale, ROUTES.work)}/${item.demo}`} className="badge badge--demo">
            {fr ? "Voir la démonstration" : "See the demo"}
          </Link>
        ) : (
          /* Pas de lien tant qu'il n'y a rien au bout. Une pastille qui dit
             la vérité vaut mieux qu'un bouton qui ne mène nulle part. */
          <span className="badge">{fr ? "Exemple de solution possible" : "Example of a possible solution"}</span>
        )}
      </header>

      <p className="case-situation">{item.situation}</p>

      <ol className="case-steps">
        {item.steps.map((s, i) => (
          <li key={s}>
            <span aria-hidden className="rank">
              {String(i + 1).padStart(2, "0")}
            </span>
            {s}
          </li>
        ))}
      </ol>

      <dl className="case-facts">
        <div>
          <dt>{fr ? "Bénéfice recherché" : "What we are after"}</dt>
          <dd>{item.benefit}</dd>
        </div>
        <div>
          <dt>{fr ? "Ce qu’on mesurera ensemble" : "What we will measure together"}</dt>
          <dd>{item.metric}</dd>
        </div>
        <div>
          <dt>{fr ? "Prérequis" : "What it needs"}</dt>
          <dd>
            <ul className="case-needs">
              {item.needs.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>{fr ? "Limite principale" : "Main limit"}</dt>
          <dd>{item.limit}</dd>
        </div>
      </dl>

      <Link href={askHref} className="go case-cta">
        {fr ? "J’ai un besoin similaire" : "I have a similar need"}
        <ArrowRight aria-hidden />
      </Link>
    </article>
  );
}
