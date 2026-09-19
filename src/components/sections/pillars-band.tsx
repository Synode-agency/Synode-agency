import { NavLink } from "@/components/site/nav-link";
import { Reveal } from "@/components/site/reveal";
import { getContent, homePath, type Locale } from "@/lib/content";

/**
 * The four services, closing the hero screen.
 *
 * Four columns separated by rules, not four floating cards. The animated
 * icons went with them: they were the loudest "AI product" signal on the
 * page, and they said nothing the titles don't say better.
 */
export function PillarsBand({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);
  const href = `${homePath(locale)}#offre`;

  return (
    <section
      aria-label={hero.pillars.map((p) => p.title).join(", ")}
      className="container-page pb-[clamp(1.5rem,1vw+1.25rem,3rem)]"
    >
      <Reveal
        delay={180}
        className="grid border-t border-hairline sm:grid-cols-2 lg:grid-cols-4"
      >
        {hero.pillars.map((p, i) => (
          <NavLink
            key={p.title}
            href={href}
            locale={locale}
            className="group flex flex-col gap-2 border-b border-hairline py-[clamp(1rem,0.8rem+0.7vw,1.6rem)] transition-colors hover:bg-surface-2 sm:border-b-0 sm:px-[clamp(1rem,0.8rem+0.8vw,1.75rem)] sm:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-hairline"
          >
            <span className="section-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading text-[clamp(0.95rem,0.3vw+0.88rem,1.1rem)] leading-tight font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
              {p.title}
            </h3>
            <p className="max-w-[34ch] text-[clamp(0.8rem,0.2vw+0.76rem,0.9rem)] leading-[1.55] text-muted-foreground">
              {p.text}
            </p>
          </NavLink>
        ))}
      </Reveal>
    </section>
  );
}
