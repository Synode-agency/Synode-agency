import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Stats({ locale }: { locale: Locale }) {
  const { stats } = getContent(locale);

  return (
    <section className="relative z-10 -mt-4 pb-4">
      <div className="container-page">
        <Reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1.5 bg-card px-4 py-7 text-center"
            >
              <span className="font-heading text-2xl font-bold text-brand sm:text-[1.75rem]">
                {s.value}
              </span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
