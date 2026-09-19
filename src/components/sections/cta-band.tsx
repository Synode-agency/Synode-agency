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
    <section id="conclusion" className="section-screen relative">
      <div className="section-panel panel-ink">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-[calc(var(--ss)*1.35rem)] text-center">
            <h2 className="max-w-[16ch] text-balance text-[length:var(--fs-h2)] leading-[0.98] font-extrabold tracking-[-0.035em]">
              {ctaBand.title}
            </h2>
            <p className="max-w-lg text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground">
              {ctaBand.body}
            </p>
            <Link
              href={path(locale, "/contact")}
              className="btn-ink group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium"
            >
              {ctaBand.button}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <dl className="mt-[calc(var(--ss)*1rem)] grid w-full max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-[calc(var(--ss)*1.25rem)] text-left sm:grid-cols-4">
              {ctaBand.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="label-xs text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="text-[0.9rem] font-medium">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
