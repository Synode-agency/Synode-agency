import Image from "next/image";
import {
  BarChart3,
  Heart,
  Lightbulb,
  Target,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/** Badge glyph per member, in the order the cards read. */
const BADGE_ICONS: LucideIcon[] = [Lightbulb, BarChart3];

/** Glyph per value, in the order the strip reads. */
const VALUE_ICONS: LucideIcon[] = [Users, Target, Zap, Heart];

export function Team({ locale }: { locale: Locale }) {
  const { team } = getContent(locale);

  return (
    <section
      id="equipe"
      className="relative px-[var(--page-gutter)] py-[var(--page-gutter)] lg:py-[calc(var(--space-between)/2)]"
    >
      <div className="team-panel section-screen overflow-hidden rounded-[clamp(1.25rem,1vw+1rem,2rem)]">
        <div className="container-page">
          <SectionHeading
            eyebrow={team.eyebrow}
            title={team.title
              .split(new RegExp(`(${team.titleAccent}|\n)`))
              .map((part, index) =>
                part === team.titleAccent ? (
                  <span key={index} className="text-brand">
                    {part}
                  </span>
                ) : part === "\n" ? (
                  <br key={index} />
                ) : (
                  part
                ),
              )}
            subtitle={
              <>
                {team.body}
                <span className="team-body-note">{team.bodyNote}</span>
              </>
            }
            align="left"
            className="team-heading reveal-left"
          />

          <div className="team-deck">
            {team.members.map((member, i) => {
              const Badge = BADGE_ICONS[i % BADGE_ICONS.length];
              const badgeSide = i === 0 ? "start" : "end";
              return (
                <Reveal
                  key={member.name}
                  delay={120 + i * 240}
                  className={`team-card ${i === 0 ? "reveal-left" : "reveal-right"}`}
                >
                  <div className="team-card-top">
                    <span className="team-card-badge" data-side={badgeSide}>
                      <span className="team-card-badge-tile" aria-hidden>
                        <Badge />
                      </span>
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
            {team.values.map((value, i) => {
              const Glyph = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <span key={value.strong} className="team-value">
                  <span className="team-value-tile" aria-hidden>
                    <Glyph />
                  </span>
                  <span className="team-value-copy">
                    <i>{value.label}</i>
                    <b>{value.strong}</b>
                  </span>
                </span>
              );
            })}
          </Reveal>

        </div>
      </div>
    </section>
  );
}
