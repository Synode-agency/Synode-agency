import { Reveal } from "@/components/site/reveal";

/**
 * Headline block shared by the standalone pages (Réalisations, Contact):
 * eyebrow, big title, lead paragraph, then a mono row of key facts.
 */
export function PageHero({
  eyebrow,
  title,
  body,
  stats,
}: {
  eyebrow: string;
  title: string;
  body: string;
  stats?: readonly { label: string; value: string }[];
}) {
  return (
    <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <span className="eyebrow inline-flex items-center gap-2.5 text-brand">
        <span className="h-px w-6 bg-brand/50" aria-hidden />
        {eyebrow}
      </span>

      <h1 className="max-w-[18ch] text-balance text-[2.4rem] leading-[1.05] font-semibold sm:text-[3.25rem] lg:text-[length:var(--fs-h2)]">
        {title}
      </h1>

      <p className="max-w-2xl text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground">
        {body}
      </p>

      {stats && (
        <dl className="mt-2 flex flex-wrap items-center justify-center gap-x-[clamp(1.25rem,1rem+1.5vw,3rem)] gap-y-2.5 text-[0.82rem] font-light tracking-[0.03em]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <dt className="text-text-mono">{stat.label}</dt>
              <dd className="text-foreground">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Reveal>
  );
}
