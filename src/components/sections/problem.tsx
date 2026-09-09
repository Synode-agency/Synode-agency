import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Problem({ locale }: { locale: Locale }) {
  const { problem } = getContent(locale);

  return (
    <section id="probleme" className="section-y border-t border-hairline">
      <div className="container-page">
        <SectionHeading
          eyebrow={problem.eyebrow}
          title={problem.title}
          subtitle={problem.intro}
          align="center"
          className="mx-auto"
        />

        <Reveal
          delay={80}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-4"
        >
          {problem.items.map((item, i) => (
            <div
              key={item.title}
              className="group relative flex flex-col gap-3 overflow-hidden bg-surface p-7 transition-colors hover:bg-surface-2"
            >
              <span
                aria-hidden
                className="num-ghost pointer-events-none absolute -right-3 -top-5 text-[5rem] transition-opacity group-hover:opacity-80"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="eyebrow tnum text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative text-[1.02rem] font-semibold leading-snug tracking-tight">
                {item.title}
              </h3>
              <p className="relative text-[0.875rem] leading-[1.65] text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
