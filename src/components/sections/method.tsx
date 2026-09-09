import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Method({ locale }: { locale: Locale }) {
  const { method } = getContent(locale);

  return (
    <section id="methode" className="section-y border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={method.eyebrow}
          title={method.title}
          align="center"
          className="mx-auto"
        />

        <div className="relative mt-16">
          {/* connecting rail (desktop) */}
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[3.15rem] hidden h-px bg-gradient-to-r from-transparent via-hairline to-transparent lg:block"
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {method.steps.map((step, i) => (
              <Reveal
                key={step.title}
                as="li"
                delay={i * 70}
                className="glow-hover relative flex flex-col gap-3 rounded-2xl border border-hairline bg-surface p-7"
              >
                <span
                  className={cn(
                    "glow-hover-num font-heading tnum text-[2.15rem] font-bold leading-none transition-colors",
                    i === 0 ? "text-brand" : "text-muted-foreground/35",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-[1rem] font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.65] text-muted-foreground">
                  {step.text}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
