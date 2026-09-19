import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * 03 — Méthode, plus who we help.
 *
 * Four step cards. Unlike the Constat these *are* ordered, so the number
 * stays — set large and quiet in the corner of each card, which carries the
 * sequence without needing a connecting line.
 */
export function Method({ locale }: { locale: Locale }) {
  const { method, audience } = getContent(locale);

  return (
    <section id="methode" className="section-screen relative">
      <div className="section-panel">
        <div className="container-page">
          <SectionHeading
            eyebrow={method.eyebrow}
            title={method.title}
            subtitle={audience.body}
          />

          <Reveal
            delay={80}
            className="mt-[calc(var(--ss)*1.5rem)] flex flex-wrap gap-2"
          >
            {audience.sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full bg-surface px-3.5 py-1.5 text-[0.8rem] text-foreground/80 transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {sector}
              </span>
            ))}
          </Reveal>

          <div className="mt-[calc(var(--ss)*clamp(1.75rem,1.4rem+1.8vw,3rem))] grid gap-[clamp(0.75rem,0.6rem+0.8vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
            {method.steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 70}
                className="surface-card lift relative flex flex-col overflow-hidden p-[clamp(1.25rem,1rem+1.2vw,1.75rem)]"
              >
                {/* The step number, large and quiet: it carries the order so
                    no connecting line has to. */}
                <span
                  aria-hidden
                  className="font-heading pointer-events-none absolute -top-1 right-2 text-[clamp(3.5rem,3vw+2.5rem,5.5rem)] leading-none font-extrabold tracking-[-0.06em] text-foreground/[0.06]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="section-index">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="font-heading relative mt-[calc(var(--ss)*0.9rem)] max-w-[18ch] text-balance text-[clamp(1rem,0.4vw+0.92rem,1.25rem)] leading-[1.15] font-bold tracking-[-0.025em]">
                  {step.title}
                </h3>

                <p className="relative mt-2.5 max-w-[34ch] text-[length:var(--fs-small)] leading-[1.6] text-muted-foreground">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
