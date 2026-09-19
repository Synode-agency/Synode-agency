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
        <Reveal className="rounded-lg bg-foreground px-[clamp(1.5rem,1.25rem+2vw,4rem)] py-[calc(var(--ss)*clamp(3rem,2.5rem+2.5vw,5rem))] text-center text-background">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-[calc(var(--ss)*1.35rem)]">
            <h2 className="max-w-[18ch] text-balance text-[length:var(--fs-h2)] leading-[1] font-extrabold tracking-[-0.035em]">
              {ctaBand.title}
            </h2>
            <p className="max-w-lg text-[length:var(--fs-body)] leading-[1.65] text-background/70">
              {ctaBand.body}
            </p>
            <Link
              href={path(locale, "/contact")}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-[length:var(--fs-button)] font-medium text-foreground transition-opacity hover:opacity-90"
            >
              {ctaBand.button}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <dl className="mt-[calc(var(--ss)*1rem)] flex flex-wrap items-center justify-center gap-x-[clamp(1.25rem,1rem+1.5vw,3rem)] gap-y-2.5">
              {ctaBand.stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <dt className="label-xs text-background/55">{stat.label}</dt>
                  <dd className="text-[0.85rem] font-medium">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
