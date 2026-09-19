import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * The two of us. Real faces are the strongest proof a young agency has, so
 * the portraits are printed as plain rectangles rather than hidden inside a
 * glowing avatar disc.
 */
export function Team({ locale }: { locale: Locale }) {
  const { team } = getContent(locale);

  return (
    <section
      id="equipe"
      className="section-screen relative border-t border-hairline"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow={team.eyebrow}
          title={team.title}
          subtitle={team.body}
        />

        <div className="mt-[calc(var(--ss)*clamp(2rem,1.5rem+2vw,3.5rem))] grid gap-x-[clamp(2rem,1.5rem+3vw,5rem)] gap-y-[clamp(2rem,1.5rem+2vw,3rem)] sm:grid-cols-2">
          {team.members.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 110}
              className="flex items-start gap-[clamp(1rem,0.8rem+1vw,1.75rem)] border-t border-hairline pt-6"
            >
              <span className="relative block w-[calc(var(--ss)*clamp(5rem,4rem+3vw,7.5rem))] shrink-0 overflow-hidden rounded bg-surface-2">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={1254}
                  height={1254}
                  sizes="(min-width: 1024px) 8rem, 6rem"
                  className="aspect-[4/5] size-full object-cover"
                />
              </span>

              <div className="min-w-0">
                <h3 className="font-heading text-[length:var(--fs-h3)] leading-tight font-bold tracking-[-0.03em]">
                  {member.name}
                </h3>

                {member.roles.map((role) => (
                  <p key={role} className="label-xs mt-1.5 text-brand">
                    {role}
                  </p>
                ))}

                <p className="mt-3 max-w-[40ch] text-[length:var(--fs-small)] leading-[1.6] text-muted-foreground">
                  {member.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
