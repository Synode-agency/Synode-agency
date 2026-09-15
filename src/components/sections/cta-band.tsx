import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function CtaBand({ locale }: { locale: Locale }) {
  const { ctaBand } = getContent(locale);

  return (
    <section className="section-y border-t border-hairline">
      <div className="container-page">
        <Reveal className="corner-frame relative overflow-hidden rounded-3xl border border-hairline bg-surface px-[clamp(1.5rem,1.25rem+2vw,3.5rem)] py-[clamp(3.5rem,3rem+3vw,6rem)] text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-1/2 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-dim/25 blur-[130px]" />
            <div className="absolute inset-0 grain opacity-[0.3]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
          </div>

          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-balance text-[1.9rem] font-semibold leading-[1.1] sm:text-4xl lg:text-[length:var(--fs-h2)]">
              {ctaBand.title}
            </h2>
            <p className="max-w-lg text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground">
              {ctaBand.body}
            </p>
            <a
              href="#contact"
              className="group brand-gradient mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium text-brand-foreground brand-glow"
            >
              {ctaBand.button}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
