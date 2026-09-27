import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { renderLines } from "@/lib/lines";
import { getContent, type Locale } from "@/lib/content";

/**
 * AI Operations.
 *
 * La cinquième offre, et la seule qui parle de ce qui se passe APRÈS. Un
 * système IA n'est pas un livrable, c'est quelque chose qui tourne : mieux
 * vaut le dire ici qu'attendre qu'un client le découvre trois mois après la
 * mise en production.
 *
 * Six points sur un seul filet, sans cartes. Ce n'est pas une offre qu'on
 * parcourt en comparant, c'est une liste de ce qu'il faut tenir.
 */
export function AiOps({ locale }: { locale: Locale }) {
  const { aiops } = getContent(locale);

  return (
    <section id="exploitation" className="section-screen relative">
      <div className="container-page">
        <SectionHeading
          title={renderLines(aiops.title)}
          subtitle={aiops.body}
          align="left"
          className="reveal-left"
        />

        <Reveal delay={110} className="reveal-up">
          <ul className="aiops-list">
            {aiops.items.map((item) => (
              <li key={item.title} className="aiops-item">
                <h3 className="aiops-item-title">{item.title}</h3>
                <p className="aiops-item-text">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
