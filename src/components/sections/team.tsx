import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Team({ locale }: { locale: Locale }) {
  const { team } = getContent(locale);

  return (
    <section
      id="equipe"
      className="section-screen relative border-t border-hairline"
    >
      <div className="container-page flex flex-col items-center">
        <SectionHeading eyebrow={team.eyebrow} title={team.title} subtitle={team.body} />

        <div className="mt-[calc(var(--ss)*clamp(2rem,1.5rem+2vw,4rem))] grid w-full max-w-5xl gap-[clamp(1rem,0.8rem+1.2vw,2rem)] sm:grid-cols-2">
          {team.members.map((member, i) => (
            <Reveal
              key={member.name}
              delay={i * 110}
              className="group glow-hover flex flex-col items-center rounded-2xl border border-hairline bg-surface px-[clamp(1.25rem,1rem+1.5vw,2.5rem)] py-[calc(var(--ss)*clamp(1.75rem,1.4rem+1.8vw,3rem))] text-center"
            >
              {/* Portrait, cropped to a disc with a brand ring */}
              <span className="relative block size-[calc(var(--ss)*clamp(5.5rem,4.5rem+3vw,8rem))] shrink-0 overflow-hidden rounded-full border border-brand/35 bg-brand-dim/30 transition-colors duration-300 group-hover:border-brand">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={1254}
                  height={1254}
                  sizes="(min-width: 1024px) 8rem, 6rem"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>

              <h3 className="mt-[calc(var(--ss)*1.25rem)] text-[length:var(--fs-h3)] font-semibold tracking-tight">
                {member.name}
              </h3>

              <div className="mt-2 flex flex-col gap-1">
                {member.roles.map((role) => (
                  <span key={role} className="text-[0.8rem] font-light tracking-[0.04em] text-brand">
                    {role}
                  </span>
                ))}
              </div>

              <p className="mt-[calc(var(--ss)*1.25rem)] max-w-[38ch] text-[length:var(--fs-small)] leading-[1.65] text-muted-foreground">
                {member.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}
