import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * 04 — L'équipe, on the we-are.be "about" pattern.
 *
 * No portraits here: the hero already shows both faces at full size, and
 * repeating the same two photographs on one page reads as an oversight. This
 * section answers the next question instead — who does what.
 */
export function Team({ locale }: { locale: Locale }) {
  const { team } = getContent(locale);

  return (
    <section id="equipe" className="section-screen">
      <div className="section-panel section-panel--surface">
        <div className="container-page">
          <SectionHeading
            eyebrow={team.eyebrow}
            title={team.title}
            subtitle={team.body}
          />

          <div className="mt-[clamp(2rem,1.5rem+2vw,3.25rem)] grid gap-[clamp(0.75rem,0.6rem+0.8vw,1.25rem)] sm:grid-cols-2">
            {team.members.map((member, i) => (
              <Reveal
                key={member.name}
                delay={i * 110}
                className="surface-card lift flex flex-col p-[clamp(1.5rem,1.2rem+1.4vw,2.5rem)]"
              >
                <h3 className="font-heading text-[clamp(1.5rem,1vw+1.25rem,2.25rem)] leading-none font-extrabold tracking-[-0.035em]">
                  {member.name}
                </h3>

                {member.roles.map((role) => (
                  <p key={role} className="label-xs mt-3 text-brand">
                    {role}
                  </p>
                ))}

                <p className="mt-5 max-w-[46ch] text-[length:var(--fs-body)] leading-[1.6] text-muted-foreground">
                  {member.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
