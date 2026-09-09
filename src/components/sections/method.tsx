import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Method({ locale }: { locale: Locale }) {
  const { method } = getContent(locale);

  return (
    <section id="methode" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={method.eyebrow}
          title={method.title}
          align="center"
          className="mx-auto"
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {method.steps.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delay={i * 60}
              className="glow-hover flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 sm:p-7"
            >
              <span
                className={cn(
                  "font-heading text-[2rem] leading-none font-bold",
                  i === 0
                    ? "glow-hover-num text-brand"
                    : "text-muted-foreground/40",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
