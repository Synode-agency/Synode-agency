import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Realisations({ locale }: { locale: Locale }) {
  const { realisations } = getContent(locale);

  return (
    <section id="realisations" className="section-y border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={realisations.eyebrow}
          title={realisations.title}
          subtitle={realisations.body}
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {realisations.items.map((item, i) => (
            <Reveal
              key={item.code}
              delay={i * 70}
              className="group glow-hover relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface p-7"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-start justify-between gap-3">
                <span className="eyebrow tnum text-muted-foreground/60">
                  {item.code}
                </span>
                <span className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-brand">
                  {realisations.badge}
                </span>
              </div>

              <span className="mt-3 text-[0.72rem] leading-snug text-muted-foreground/70">
                {item.domain}
              </span>

              <h3 className="mt-4 text-[1.1rem] font-semibold leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.85rem] leading-[1.65] text-muted-foreground">
                {item.desc}
              </p>

              <div className="mt-auto space-y-3 border-t border-hairline pt-5">
                <p className="font-mono text-[0.72rem] leading-relaxed text-muted-foreground/75">
                  {item.stack.join("  ·  ")}
                </p>
                <p className="flex items-start gap-2 text-[0.82rem] font-medium text-brand">
                  <span
                    aria-hidden
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-brand"
                  />
                  {item.result}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="corner-frame mt-6 flex flex-col gap-6 rounded-2xl border border-brand/25 bg-gradient-to-br from-brand-dim/25 to-transparent p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-2xl space-y-2.5">
            <h3 className="text-[1.2rem] font-semibold leading-snug tracking-tight">
              {realisations.cta.title}
            </h3>
            <p className="text-[0.875rem] leading-[1.65] text-muted-foreground">
              {realisations.cta.body}
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-brand-foreground transition-colors hover:bg-brand-bright"
          >
            {realisations.cta.button}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
