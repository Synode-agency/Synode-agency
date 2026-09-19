import { Reveal } from "@/components/site/reveal";

/**
 * Headline block shared by the standalone pages (Réalisations, Contact):
 * label over a rule, big headline, lead paragraph, then a row of key facts.
 * Left-aligned like the rest of the site.
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
    <Reveal className="flex flex-col">
      <span className="eyebrow border-b border-hairline pb-3">{eyebrow}</span>

      <h1 className="mt-[clamp(1.25rem,1rem+1vw,2rem)] max-w-[17ch] text-balance text-[length:var(--fs-h2)] leading-[0.98] font-extrabold tracking-[-0.035em]">
        {title}
      </h1>

      <p className="mt-[clamp(1rem,0.85rem+0.6vw,1.5rem)] max-w-[58ch] text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground">
        {body}
      </p>

      {stats && (
        <dl className="mt-[clamp(1.5rem,1.25rem+1vw,2.5rem)] grid gap-x-8 gap-y-4 border-t border-hairline pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <dt className="label-xs text-muted-foreground">{stat.label}</dt>
              <dd className="text-[0.95rem] font-medium">{stat.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </Reveal>
  );
}
