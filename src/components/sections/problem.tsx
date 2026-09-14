import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="section-y border-t border-hairline">
      <div className="container-page">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12 xl:gap-16">
          <SectionHeading
            eyebrow={problem.eyebrow}
            title={problem.title}
            subtitle={problem.intro}
          />

          <div className="mt-10 flex flex-col gap-4 lg:mt-0">
            {problem.items.map((item, i) => (
              <Reveal
                key={item.title}
                delay={80 + i * 70}
                className="flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-hairline bg-surface p-5 transition-colors hover:bg-surface-2"
              >
                <h3 className="text-[0.95rem] font-semibold leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[0.83rem] leading-[1.6] text-muted-foreground">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
