import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";

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
 * The four demos, as a card grid built on the we-are.be case-study pattern:
 * media on top taking most of the card, then the tag, the title, the text.
 *
 * Two per row rather than four: these cards carry a video the visitor is
 * meant to actually watch, so the media slot has to stay large.
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
    <section className="section-panel section-panel--surface">
      <div className="container-page">
        <Reveal className="mb-[clamp(1.5rem,1.25rem+1vw,2.5rem)] flex flex-wrap items-baseline justify-between gap-4 border-b border-hairline pb-4">
          <span className="eyebrow">{badge}</span>
          <Link
            href={contactHref}
            className="group inline-flex items-center gap-2 text-[length:var(--fs-small)] font-medium underline-offset-4 hover:underline"
          >
            {filterCta}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="grid gap-[clamp(1rem,0.8rem+1.2vw,2rem)] lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal
              key={item.code}
              delay={i * 80}
              className="surface-card lift flex flex-col overflow-hidden"
            >
              {/* Media first and large: it is the argument, not an accent. */}
              <div className="relative aspect-video w-full shrink-0 bg-surface-2">
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

              <div className="flex flex-1 flex-col p-[clamp(1.25rem,1rem+1.2vw,2rem)]">
                <div className="flex items-baseline gap-3">
                  <span className="section-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="eyebrow">{item.domain}</span>
                </div>

                <h2 className="font-heading mt-3 max-w-[22ch] text-balance text-[clamp(1.25rem,0.7vw+1.1rem,1.75rem)] leading-[1.1] font-extrabold tracking-[-0.03em]">
                  {item.title}
                </h2>

                <p className="mt-3 max-w-[54ch] text-[length:var(--fs-small)] leading-[1.6] text-muted-foreground">
                  {item.desc}
                </p>

                <p className="mt-auto max-w-[44ch] border-t border-hairline pt-4 text-[clamp(0.85rem,0.25vw+0.8rem,0.98rem)] leading-[1.45] font-medium">
                  {item.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
