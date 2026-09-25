import { renderLines } from "@/lib/lines";
import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * `headless` : la section est réutilisée sur sa propre page, qui porte déjà un
 * titre. On y masque l'en-tête et le numéro de chapitre — un « 04 » n'a de
 * sens que dans la suite des chapitres de la landing.
 */
export function Team({
  locale,
  headless = false,
}: {
  locale: Locale;
  headless?: boolean;
}) {
  const { team } = getContent(locale);

  return (
    <section
      id="equipe"
      className="page-shell relative px-[var(--page-gutter)] py-[var(--page-gutter)] lg:py-[calc(var(--space-between)/2)]"
    >
      <div className="team-panel section-screen overflow-hidden rounded-[var(--r-lg)]">
        {!headless && <ChapterMark n={4} side="right" />}

        <div className="container-page">
          {!headless && (
            <SectionHeading
              eyebrow={team.eyebrow}
              title={renderLines(team.title, [team.titleAccent])}
              subtitle={team.body}
              align="left"
              className="team-heading reveal-left"
            />
          )}

          <div className="team-deck">
            {team.members.map((member, i) => {
              const badgeSide = i === 0 ? "start" : "end";
              return (
                <Reveal
                  key={member.name}
                  delay={120 + i * 240}
                  className={`team-card ${i === 0 ? "reveal-left" : "reveal-right"}`}
                >
                  <div className="team-card-top">
                    <span
                      className="team-card-badge"
                      data-side={badgeSide}
                      style={{ "--team-i": i } as React.CSSProperties}
                    >
                      <b>{member.badge.label}</b>
                      <i>{member.badge.sub}</i>
                    </span>

                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={member.photoSize.width}
                      height={member.photoSize.height}
                      sizes="(min-width: 1024px) 34rem, 90vw"
                      className="team-card-portrait"
                    />
                  </div>

                  <div className="team-card-body">
                    <h3 className="team-card-name">{member.name}</h3>
                    <p className="team-card-position">{team.position}</p>
                    <p className="team-card-role">{member.role}</p>
                    <span aria-hidden className="team-card-rule" />
                    <p className="team-card-text">{member.text}</p>
                  </div>
                </Reveal>
              );
            })}

          </div>

          <Reveal delay={900} className="team-values">
            {team.values.map((value, i) => (
                <span
                  key={value.strong}
                  className="team-value"
                  style={{ "--team-i": i } as React.CSSProperties}
                >
                  <span className="team-value-copy">
                    <i>{value.label}</i>
                    <b>{value.strong}</b>
                  </span>
                </span>
            ))}
          </Reveal>

        </div>
      </div>
    </section>
  );
}
