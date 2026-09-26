import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { Reveal } from "@/components/site/reveal";
import { Wordmark } from "@/components/site/wordmark";
import { renderLines } from "@/lib/lines";
import { getContent, type Locale } from "@/lib/content";

/**
 * La différence, dessinée plutôt qu'affirmée.
 *
 * L'objection qu'on va nous faire est « encore un outil IA ». On ne répond
 * pas à ça par un adjectif, on y répond par une position : Synode est une
 * couche posée entre les logiciels d'une entreprise et ses processus, et
 * cette couche ne remplace rien.
 *
 * Le schéma est en HTML et non en SVG, pour une raison : les trois étages
 * sont du texte réel, qui se lit, se traduit, se sélectionne et se
 * recompose en colonne sur téléphone. Un SVG aurait figé la largeur.
 */
export function Difference({ locale }: { locale: Locale }) {
  const { difference } = getContent(locale);
  const { layers } = difference;

  return (
    <section id="difference" className="section-screen relative">
      <ChapterMark n={3} side="right" />

      <div className="container-page">
        <SectionHeading
          eyebrow={difference.eyebrow}
          title={renderLines(difference.title)}
          subtitle={difference.body}
          align="left"
          className="reveal-left"
        />

        <Reveal delay={120} className="stack reveal-up">
          {/* Étage du haut : ce que l'entreprise possède déjà. */}
          <div className="stack-tier stack-tier--tools">
            <span className="stack-label">{layers.toolsLabel}</span>
            <ul className="stack-chips">
              {layers.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <span aria-hidden className="stack-flow stack-flow--down" />

          {/* Étage du milieu : nous. Le seul des trois qui porte l'encre
              pleine, parce que c'est le seul que nous construisons. */}
          <div className="stack-tier stack-tier--core">
            <span className="stack-core-mark">
              <Wordmark />
            </span>
            <ul className="stack-core-list">
              {layers.core.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <span aria-hidden className="stack-flow stack-flow--down" />

          {/* Étage du bas : ce qui tourne, et qui le pilote. */}
          <div className="stack-tier stack-tier--out">
            <span className="stack-label">{layers.processLabel}</span>
            <span className="stack-team">{layers.teamLabel}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
