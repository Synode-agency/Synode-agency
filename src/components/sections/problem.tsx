import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="border-t border-border py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          subtitle={problem.intro}
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {problem.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 50}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <span className="font-mono text-sm text-muted-foreground/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-base font-semibold leading-snug">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
