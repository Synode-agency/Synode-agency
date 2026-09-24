import { renderLines } from "@/lib/lines";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { Reveal } from "@/components/site/reveal";
import { ProblemVisual } from "@/components/site/problem-visuals";
import { getContent, type Locale } from "@/lib/content";

/** Ink per column, in the design's order. */
const COLUMN_INK = ["#b91c1c", "#1d4ed8", "#15803d", "#7e22ce"];

export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="section-screen relative">
      <div className="problem-content">
        <ChapterMark n={1} side="left" />

        <SectionHeading
          eyebrow={problem.eyebrow}
          title={renderLines(
            problem.title,
            /* « L' » fait partie du mot peint : couper l'article du nom
               laissait une lettre noire collée à un mot bleu. */
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
                /* Même délai pour les quatre : ce sont des pairs.
                   Les décaler affirmerait un ordre de lecture qui
                   n'existe pas. Le titre passe d'abord, elles
                   arrivent ensuite, en un bloc. */
                delay={120}
                className="problem-col reveal-up"
                style={
                  { "--card-ink": COLUMN_INK[index % 4] } as React.CSSProperties
                }
              >
                <ProblemVisual index={index} />

                {/* A dot, not a glyph in a coloured square: the column's
                    colour is all this row has to say, and the site had
                    reached the point where every block opened on an icon. */}
                <span className="problem-index">
                  <span className="problem-dot" aria-hidden />
                  <i />
                </span>

                <h3 className="problem-title">{item.title}</h3>
                <p className="problem-text">{item.text}</p>

                {/* Each problem says what answers it and links to the offer.
                    The section used to describe four difficulties and stop
                    there, with nothing tying it to the rest of the page. */}
                <Link href="#offre" className="problem-answer">
                  <i>{problem.answerLabel}</i>
                  <b>{item.answer}</b>
                  <ArrowUpRight aria-hidden />
                </Link>
              </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
