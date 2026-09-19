import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * 01 — Le constat.
 *
 * Four cards on a 2x2 grid, not a rail. The rail said "ordered sequence",
 * which these four are not: they are four independent symptoms, and a reader
 * should be able to recognise their own in any of them.
 *
 * Each card carries a short accent rule that grows to the full width of the
 * card on hover — the only motion here, and it marks the card being read
 * rather than decorating it.
 */
export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="section-screen relative">
      <div className="section-panel section-panel--surface">
        <div className="container-page">
          <SectionHeading
            eyebrow={problem.eyebrow}
            title={problem.title}
            subtitle={problem.intro}
          />

          <div className="mt-[calc(var(--ss)*clamp(2rem,1.6rem+2vw,3.25rem))] grid gap-[clamp(0.75rem,0.6rem+0.8vw,1.25rem)] sm:grid-cols-2">
            {problem.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 70}
                className="surface-card lift group flex flex-col p-[clamp(1.25rem,1rem+1.2vw,2rem)]"
              >
                <span
                  aria-hidden
                  className="h-[3px] w-10 bg-brand transition-[width] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-full"
                />

                <h3 className="font-heading mt-[calc(var(--ss)*clamp(1rem,0.8rem+0.8vw,1.75rem))] max-w-[22ch] text-balance text-[clamp(1.05rem,0.5vw+0.95rem,1.4rem)] leading-[1.15] font-bold tracking-[-0.025em]">
                  {item.title}
                </h3>

                <p className="mt-2.5 max-w-[46ch] text-[length:var(--fs-small)] leading-[1.6] text-muted-foreground">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
