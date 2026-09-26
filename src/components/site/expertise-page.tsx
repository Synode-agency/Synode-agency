import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerPage } from "@/components/site/inner-page";
import { Reveal } from "@/components/site/reveal";
import { getContent, path, type Locale } from "@/lib/content";
import { groupItems } from "@/lib/solutions";

/**
 * La page Expertise : les seize capacités, rangées en cinq familles.
 *
 * C'est l'étage du dessous, et la page le dit dès son chapeau : ces
 * capacités ne se vendent pas seules. Elles existent ici pour deux raisons
 * honnêtes. La première est le référencement : « automatisation de
 * facturation » est ce que les gens tapent, et ce sont ces pages qui le
 * portent. La seconde est la preuve technique : un acheteur qui veut savoir
 * de quoi un système est fait doit pouvoir le vérifier.
 *
 * Elles sont donc adressables, mais elles ne sont plus l'offre.
 */
export function ExpertisePage({ locale }: { locale: Locale }) {
  const { capabilities } = getContent(locale);

  return (
    <InnerPage
      locale={locale}
      eyebrow={capabilities.eyebrow}
      title={capabilities.title.replace(/[\n^]/g, " ").replace(/\s+/g, " ").trim()}
      body={capabilities.body}
    >
      <div className="container-page flex flex-col gap-[clamp(3rem,6vw,5rem)] pb-[var(--space-section)]">
        {capabilities.groups.map((group, g) => {
          const items = groupItems(locale, group);
          return (
            <Reveal key={group.slug} delay={60 + g * 70} className="cap-group reveal-up">
              <div className="cap-group-head">
                <h2 id={`famille-${group.slug}`} className="cap-group-title">
                  {group.title}
                </h2>
                <p className="cap-group-lead">{group.lead}</p>
              </div>

              <ul className="cap-list" aria-labelledby={`famille-${group.slug}`}>
                {items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={path(locale, `/expertise/${item.slug}`)}
                      className="cap-row"
                    >
                      <span className="cap-row-title">{item.title}</span>
                      <span className="cap-row-text">{item.summary}</span>
                      <ArrowRight aria-hidden className="cap-row-go" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </InnerPage>
  );
}
