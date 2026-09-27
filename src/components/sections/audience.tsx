import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { renderLines } from "@/lib/lines";
import { getContent, type Locale } from "@/lib/content";

/**
 * Qui nous aidons.
 *
 * Elle existait sous forme de contenu sans avoir de section : son texte
 * était affiché dans le chapeau de la Méthode, sous un titre qui parlait
 * d'autre chose. Deux sujets sous un seul titre, et le visiteur n'apprenait
 * ni la méthode ni à qui elle s'adresse.
 *
 * Les règles sont à droite et non sous le texte : ce sont des engagements,
 * pas la suite du paragraphe. Les poser en colonne à côté leur donne le
 * statut d'une liste qu'on peut opposer à quelqu'un, ce qu'elles sont.
 */
export function Audience({ locale }: { locale: Locale }) {
  const { audience } = getContent(locale);

  return (
    <section id="audience" className="section-screen relative">
      <div className="container-page">
        <div className="audience">
          <div className="audience-copy">
            <SectionHeading
              title={renderLines(audience.title)}
              subtitle={audience.body}
              align="left"
              className="reveal-left"
            />
          </div>

          <Reveal delay={120} className="audience-rules reveal-up">
            <h3 className="audience-rules-title">{audience.rulesTitle}</h3>
            <ul className="audience-rule-list">
              {audience.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
