import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Hero on the we-are.be model: a left-aligned headline, the lead paragraph
 * under it, the actions, and photographs of the people beside it.
 *
 * Their hero shows the team at their desks. Ours shows the two of us, in
 * plain rectangular crops, staggered. That is the same argument: a visitor
 * sees who they will actually be talking to before they read a word of offer.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero, team } = getContent(locale);

  return (
    <section id="top" className="section-screen">
      <div className="section-panel section-panel--surface pt-[calc(var(--header-h)+var(--space-md))]">
        <div className="container-page">
          <div className="grid items-center gap-x-[clamp(2rem,1.5rem+3vw,5rem)] gap-y-[clamp(2.5rem,2rem+2vw,4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <Reveal className="flex flex-col items-start gap-6">
              <h1 className="max-w-[15ch] text-[length:var(--fs-display)] leading-[0.98] font-extrabold tracking-[-0.04em]">
                {hero.titleLead}{" "}
                <span className="text-brand">{hero.titleAccent}</span>
              </h1>

              <p className="max-w-[48ch] text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground">
                {hero.subtitle}
              </p>

              <div className="mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href={path(locale, "/contact")}
                  className="btn-ink group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium"
                >
                  {hero.primaryCta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={path(locale, "/realisations")}
                  className="group inline-flex items-center justify-center gap-2 rounded-full px-2 py-4 text-[length:var(--fs-button)] font-medium underline-offset-4 hover:underline"
                >
                  {hero.secondaryCta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>

            {/* Staggered pair, the way their hero images sit at two heights. */}
            <Reveal
              delay={120}
              className="grid grid-cols-2 gap-[clamp(0.6rem,0.5rem+0.5vw,1rem)]"
            >
              {team.members.map((member, i) => (
                <figure
                  key={member.name}
                  className={
                    i === 1 ? "lg:mt-[clamp(1.5rem,1rem+2vw,3.5rem)]" : ""
                  }
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={1254}
                      height={1254}
                      sizes="(min-width: 1024px) 24vw, 45vw"
                      priority={i === 0}
                      className="size-full object-cover object-top"
                    />
                  </div>
                  <figcaption className="mt-2.5 flex flex-col">
                    <span className="text-[0.95rem] font-semibold tracking-tight">
                      {member.name}
                    </span>
                    <span className="text-[0.8rem] leading-snug text-muted-foreground">
                      {member.roles[0]}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
