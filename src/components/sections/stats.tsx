import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

export function Stats({ locale }: { locale: Locale }) {
  const { stats } = getContent(locale);

  return (
    <section className="relative z-10 border-y border-hairline bg-surface/40">
      <div className="container-page">
        <Reveal className="grid grid-cols-2 divide-x divide-y divide-hairline sm:grid-cols-4 sm:divide-y-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-2 px-2 py-8 first:pl-0 sm:px-6 sm:py-10"
            >
              <span className="font-heading tnum text-[1.6rem] font-bold leading-none text-brand sm:text-[1.9rem]">
                {s.value}
              </span>
              <span className="text-[0.8rem] leading-snug text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
