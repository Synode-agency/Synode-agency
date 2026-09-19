import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Closing CTA, on its own screen. It used to share one with the footer; the
 * FAQ took that slot when it was added between the two.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const { ctaBand } = getContent(locale);

  return (
    <section id="conclusion" className="section-screen relative border-t border-hairline">
      <div className="container-page">
        {/* Same blue framed block as the Réalisations closing CTA: same width
            (the full page container), same border, same gradient. Only the
            vertical padding is scaled by --ss, because here the block shares
            its screen with the footer. */}
        <Reveal className="corner-frame relative overflow-hidden rounded-3xl border border-brand/25 bg-gradient-to-br from-brand-dim/25 to-transparent px-[clamp(1.5rem,1.25rem+2vw,3.5rem)] py-[calc(var(--ss)*clamp(3rem,2.5rem+2.5vw,5rem))] text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-[calc(var(--ss)*1.35rem)]">
            <h2 className="max-w-[18ch] text-balance text-[1.9rem] font-semibold leading-[1.1] sm:text-4xl lg:text-[calc(var(--ss)*var(--fs-h2))]">
              {ctaBand.title}
            </h2>
            <p className="max-w-lg text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground">
              {ctaBand.body}
            </p>
            <Link
              href={path(locale, "/contact")}
              className="group brand-gradient inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium text-brand-foreground brand-glow"
            >
              {ctaBand.button}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <dl className="mt-[calc(var(--ss)*1rem)] flex flex-wrap items-center justify-center gap-x-[clamp(1.25rem,1rem+1.5vw,3rem)] gap-y-2.5 font-mono text-[0.82rem]">
              {ctaBand.stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <dt className="text-text-mono">{stat.label}</dt>
                  <dd className="text-foreground">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
