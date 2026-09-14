import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { RealisationsCarousel } from "@/components/site/realisations-carousel";
import { getContent, type Locale } from "@/lib/content";

export function Realisations({ locale }: { locale: Locale }) {
  const { realisations } = getContent(locale);

  return (
    <section id="realisations" className="section-y border-t border-hairline">
      <div className="container-page">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12 xl:gap-16">
          <SectionHeading
            eyebrow={realisations.eyebrow}
            title={realisations.title}
            subtitle={realisations.body}
          />

          <RealisationsCarousel
            items={realisations.items}
            badge={realisations.badge}
          />
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
