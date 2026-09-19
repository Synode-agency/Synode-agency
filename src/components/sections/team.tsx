import Image from "next/image";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * 04 — L'équipe.
 *
 * Two cards with the portrait filling the top, the way the case-study cards
 * work: for a two-person agency with no client logos yet, the faces *are*
 * the proof, so they get the size that proof deserves rather than a thumbnail.
 *
 * The name sits over the bottom of the photo, on a gradient scrim, so the
 * card reads as one object instead of a picture with a caption under it.
 */
export function Team({ locale }: { locale: Locale }) {
  const { team } = getContent(locale);

  return (
    <section id="equipe" className="section-screen relative">
      <div className="section-panel section-panel--surface">
        <div className="container-page">
          <SectionHeading
            eyebrow={team.eyebrow}
            title={team.title}
            subtitle={team.body}
          />

          <div className="mt-[calc(var(--ss)*clamp(2rem,1.5rem+2vw,3.25rem))] grid gap-[clamp(0.75rem,0.6rem+0.8vw,1.25rem)] sm:grid-cols-2">
            {team.members.map((member, i) => (
              <Reveal
                key={member.name}
                delay={i * 110}
                className="surface-card lift group flex flex-col overflow-hidden"
              >
                <div className="relative h-[calc(var(--ss)*clamp(10rem,7rem+9vw,16rem))] w-full shrink-0 overflow-hidden bg-surface-2">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={1254}
                    height={1254}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="size-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                  />

                  {/* Scrim, so the name stays legible whatever the photo does. */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent"
                  />

                  <h3 className="font-heading absolute bottom-0 left-0 p-[clamp(1rem,0.8rem+0.8vw,1.5rem)] text-[clamp(1.35rem,1vw+1.1rem,2rem)] leading-none font-extrabold tracking-[-0.035em] text-white">
                    {member.name}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-[clamp(1.25rem,1rem+1.2vw,1.75rem)]">
                  {member.roles.map((role) => (
                    <p key={role} className="label-xs text-brand">
                      {role}
                    </p>
                  ))}

                  <p className="mt-3 max-w-[46ch] text-[length:var(--fs-small)] leading-[1.6] text-muted-foreground">
                    {member.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
