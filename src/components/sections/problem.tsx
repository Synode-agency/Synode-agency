import { ArrowUpRight, Clock3, Globe, Network, Repeat2, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { Reveal } from "@/components/site/reveal";
import { ProblemVisual } from "@/components/site/problem-visuals";
import { getContent, type Locale } from "@/lib/content";

/** One glyph per problem, in the order the columns read. */
const COLUMN_ICONS: LucideIcon[] = [Repeat2, Network, Clock3, Globe];

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
          title={locale === "fr"
            ? problem.title.split(/(automatisation|digital|\n)/).map((part, index) =>
                (part === "automatisation" || part === "digital") ? <span key={index} className="text-brand">{part}</span>
                  : part === "\n" ? <br key={index} /> : part,
              )
            : problem.title}
          subtitle={problem.intro}
          align="left"
          className="problem-heading reveal-left"
        />

        <div className="problem-deck">
          {problem.items.map((item, index) => {
            const Glyph = COLUMN_ICONS[index % COLUMN_ICONS.length];
            return (
              <Reveal
                key={item.title}
                delay={150 + index * 190}
                className="problem-col reveal-up"
                style={
                  { "--card-ink": COLUMN_INK[index % 4] } as React.CSSProperties
                }
              >
                <ProblemVisual index={index} />

                <span className="problem-index">
                  <span className="problem-icon" aria-hidden>
                    <Glyph />
                  </span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
