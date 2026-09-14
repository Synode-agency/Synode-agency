import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Method({ locale }: { locale: Locale }) {
  const { method } = getContent(locale);

  return (
    <section id="methode" className="section-y border-t border-hairline">
      <div className="container-page">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12 xl:gap-16">
          <SectionHeading eyebrow={method.eyebrow} title={method.title} />

          <div className="relative mt-10 lg:mt-0">
            {/* connecting rail */}
            <span
              aria-hidden
              className="absolute left-9 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-hairline to-transparent"
            />
            <ol className="flex flex-col gap-4">
              {method.steps.map((step, i) => (
                <Reveal
                  key={step.title}
                  as="li"
                  delay={i * 70}
                  className="glow-hover relative flex flex-col gap-2 rounded-2xl border border-hairline bg-surface p-5"
                >
                  <span className="glow-hover-num font-heading tnum text-[1.75rem] font-bold leading-none text-muted-foreground/35 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-[0.95rem] font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[0.83rem] leading-[1.6] text-muted-foreground">
                    {step.text}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
