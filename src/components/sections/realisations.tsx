import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Realisations({ locale }: { locale: Locale }) {
  const { realisations } = getContent(locale);

  return (
    <section id="realisations" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={realisations.eyebrow}
          title={realisations.title}
          subtitle={realisations.body}
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {realisations.items.map((item, i) => (
            <Reveal
              key={item.code}
              delay={i * 60}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand/40"
            >
              <div className="flex items-start justify-between gap-3 border-b border-border pb-4">
                <span className="font-mono text-xs leading-relaxed text-muted-foreground/70">
                  {item.code} · {item.domain}
                </span>
                <span className="shrink-0 rounded-full border border-brand/40 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-brand">
                  {realisations.badge}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>

              <p className="mt-5 border-t border-border pt-4 font-mono text-xs text-muted-foreground/80">
                {item.stack.join(" · ")}
              </p>
              <p className="mt-3 text-sm font-medium text-brand">
                {item.result}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-xl font-semibold leading-snug">
              {realisations.cta.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {realisations.cta.body}
            </p>
          </div>
          <a
            href="#contact"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-brand-foreground transition-colors hover:bg-brand-bright"
          >
            {realisations.cta.button}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
