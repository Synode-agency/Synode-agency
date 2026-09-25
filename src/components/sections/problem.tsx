import { renderLines } from "@/lib/lines";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { Reveal } from "@/components/site/reveal";
import { ProblemVisual } from "@/components/site/problem-visuals";
import { getContent, path, type Locale } from "@/lib/content";

/** L'encre de chaque carte, dans l'ordre du design. */
const COLUMN_INK = ["#b91c1c", "#1d4ed8", "#15803d", "#7e22ce"];

/**
 * Le constat : quatre cartes distinctes, en deux rangées de deux.
 *
 * Chaque carte tient un problème d'un côté et son illustration de l'autre,
 * sur une tache de sa propre couleur. Elle se termine par ce qui y répond,
 * dans cette même couleur, et ce lien mène à la page de cette prestation
 * précise — pas à la liste des services. C'est le seul endroit de la landing
 * où le constat mène quelque part, et il doit mener au bon endroit.
 */
export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="section-screen relative">
      <div className="problem-content">
        <ChapterMark n={2} side="left" />

        <SectionHeading
          eyebrow={problem.eyebrow}
          title={renderLines(
            problem.title,
            locale === "fr" ? ["L'automatisation", "digital"] : [],
          )}
          subtitle={problem.intro}
          align="left"
          className="problem-heading reveal-left"
        />

        <div className="problem-deck">
          {problem.items.map((item, index) => (
            <Reveal
              key={item.title}
              delay={120}
              className="problem-col reveal-up"
              style={
                { "--card-ink": COLUMN_INK[index % COLUMN_INK.length] } as React.CSSProperties
              }
            >
              <div className="problem-body">
                {/* Un point de la couleur de la carte, et rien d'autre : la
                    page avait déjà une icône en tête de chaque bloc. */}
                <span aria-hidden className="problem-dot" />

                <h3 className="problem-title">{item.title}</h3>
                <p className="problem-text">{item.text}</p>

                <Link
                  href={path(locale, `/services/${item.slug}`)}
                  className="problem-answer"
                >
                  <i>{problem.answerLabel}</i>
                  <b>{item.answer}</b>
                  <ArrowUpRight aria-hidden />
                </Link>
              </div>

              <ProblemVisual index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
