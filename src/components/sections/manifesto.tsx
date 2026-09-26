import { renderLines } from "@/lib/lines";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * Le manifeste, juste sous le hero.
 *
 * Une phrase, et le schéma qui la démontre. Rien d'autre : c'est le seul
 * endroit de la page où une seule idée occupe toute la largeur, et c'est ce
 * qui lui donne son poids. Y ajouter un chapeau, un libellé ou un bouton la
 * ramènerait au rang de section ordinaire.
 *
 * Le schéma n'est pas une illustration de la phrase, c'est sa suite : la
 * phrase dit qu'il y a quelque chose entre les logiciels et les équipes, le
 * schéma dit quoi. Trois verbes enchaînés, puis les outils qu'ils pilotent.
 */
export function Manifesto({ locale }: { locale: Locale }) {
  const { manifesto } = getContent(locale);

  return (
    <section id="manifeste" className="section-screen relative">
      <div className="container-page">
        <Reveal className="manifesto reveal-up">
          {/* Un `p` et non un `h2` : ce n'est pas le titre d'un contenu qui
              suit, c'est une affirmation. Le plan de titres de la page ne
              doit pas la compter comme une section. */}
          <p className="manifesto-statement">
            {renderLines(manifesto.statement)}
          </p>

          <div className="manifesto-figure">
            {/* La chaîne des trois verbes. C'est une séquence réelle :
                comprendre précède décider, qui précède agir. */}
            <ol className="manifesto-verbs">
              {manifesto.verbs.map((verb) => (
                <li key={verb} className="manifesto-verb">
                  {verb}
                </li>
              ))}
            </ol>

            {/* Le faisceau vers les outils. Purement graphique : les outils
                sont écrits juste en dessous, en clair. */}
            <span aria-hidden className="manifesto-fan" />

            <div className="manifesto-targets">
              <span className="manifesto-targets-label">
                {manifesto.targetsLabel}
              </span>
              <ul className="manifesto-target-list">
                {manifesto.targets.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
