import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

interface RealisationItem {
  code: string;
  short: string;
  domain: string;
  title: string;
  desc: string;
  result: string;
  /** Screen capture of the demo, 16:9. */
  video?: string;
  /** Still frame: poster for the video, or the image of a live demo. */
  poster?: string;
}

/**
 * The four demos, as full-width alternating blocks rather than a carousel.
 *
 * A carousel hides three projects out of four behind an interaction, which is
 * the wrong trade when the projects *are* the argument. Here every demo gets
 * a band of its own, a 16:9 media slot big enough to actually watch, and the
 * page alternates white and off-white so the four read as separate chapters.
 */
export function RealisationsList({
  items,
  badge,
  filterCta,
  contactHref,
}: {
  items: readonly RealisationItem[];
  badge: string;
  filterCta: string;
  contactHref: string;
}) {
  return (
    <>
      {/* Jump index — the whole list at a glance before scrolling into it. */}
      <section className="section-panel">
        <div className="container-page">
          <Reveal className="flex flex-wrap items-center gap-x-2.5 gap-y-2 border-t border-hairline pt-6">
            {items.map((item, i) => (
              <a
                key={item.code}
                href={`#${item.code.replace("/", "").toLowerCase()}`}
                className="group inline-flex items-baseline gap-2 rounded-full border border-hairline px-[clamp(0.9rem,0.6vw+0.7rem,1.35rem)] py-2 text-[length:var(--fs-small)] transition-colors hover:border-foreground"
              >
                <span className="section-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.short}
              </a>
            ))}
            <Link
              href={contactHref}
              className="group ml-auto inline-flex items-center gap-2 text-[length:var(--fs-small)] font-medium underline-offset-4 hover:underline"
            >
              {filterCta}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {items.map((item, i) => {
        const flipped = i % 2 === 1;
        return (
          <section
            key={item.code}
            id={item.code.replace("/", "").toLowerCase()}
            className={cn("section-panel", flipped && "section-panel--surface")}
          >
            <div className="container-page">
              <Reveal className="grid items-center gap-x-[clamp(2rem,1.5rem+3vw,5rem)] gap-y-[clamp(1.5rem,1.2rem+1.5vw,2.5rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                {/* Media: 16:9, sized to be watched, not glanced at. */}
                <div
                  className={cn(
                    "relative aspect-video overflow-hidden rounded border border-hairline bg-surface-2",
                    flipped ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  {item.video ? (
                    <video
                      src={item.video}
                      poster={item.poster}
                      controls
                      playsInline
                      preload="metadata"
                      className="size-full object-cover"
                    />
                  ) : item.poster ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="label-xs absolute inset-0 grid place-items-center text-muted-foreground/50"
                    >
                      {item.code}
                    </span>
                  )}
                </div>

                <div
                  className={cn(
                    "min-w-0",
                    flipped ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <div className="flex items-baseline gap-3 border-b border-hairline pb-3">
                    <span className="section-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{item.domain}</span>
                    <span className="label-xs ml-auto shrink-0 border border-hairline px-2 py-[3px] text-brand">
                      {badge}
                    </span>
                  </div>

                  <h2 className="mt-5 max-w-[20ch] text-balance font-heading text-[clamp(1.5rem,1vw+1.2rem,2.25rem)] leading-[1.05] font-extrabold tracking-[-0.035em]">
                    {item.title}
                  </h2>

                  <p className="mt-4 max-w-[52ch] text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground">
                    {item.desc}
                  </p>

                  <p className="mt-6 max-w-[44ch] border-t border-foreground pt-3.5 text-[clamp(0.9rem,0.3vw+0.84rem,1.05rem)] leading-[1.45] font-medium">
                    {item.result}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}
    </>
  );
}
