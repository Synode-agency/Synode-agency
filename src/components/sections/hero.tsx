import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { NavLink } from "@/components/site/nav-link";
import { getContent, homePath, path, type Locale } from "@/lib/content";

/**
 * Hero, on the fastonweb model: a left-aligned text block with the visual
 * proof beside it.
 *
 * They put portfolio screenshots there. We have none yet, so the right column
 * carries the four services instead — real content rather than a placeholder,
 * and it puts the offer on the first screen.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);
  const offerHref = `${homePath(locale)}#offre`;

  return (
    <section id="top" className="section-screen">
      <div className="section-panel section-panel--surface pt-[calc(var(--header-h)+var(--space-md))]">
        <div className="container-page">
          <div className="grid items-center gap-x-[clamp(2rem,1.5rem+3vw,5rem)] gap-y-[clamp(2.5rem,2rem+2vw,4rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <Reveal className="flex flex-col items-start gap-6">
              <h1 className="max-w-[15ch] text-[length:var(--fs-display)] leading-[0.98] font-extrabold tracking-[-0.04em]">
                {hero.titleLead}{" "}
                <span className="text-brand">{hero.titleAccent}</span>
              </h1>

              <p className="max-w-[48ch] text-[length:var(--fs-body)] leading-[1.65] text-muted-foreground">
                {hero.subtitle}
              </p>

              <div className="mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href={path(locale, "/contact")}
                  className="btn-ink group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium"
                >
                  {hero.primaryCta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={path(locale, "/realisations")}
                  className="btn-line inline-flex items-center justify-center rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium"
                >
                  {hero.secondaryCta}
                </Link>
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="grid gap-[clamp(0.6rem,0.5rem+0.5vw,1rem)] sm:grid-cols-2"
            >
              {hero.pillars.map((p, i) => (
                <NavLink
                  key={p.title}
                  href={offerHref}
                  locale={locale}
                  className="surface-card lift group flex flex-col p-[clamp(1.1rem,0.9rem+0.8vw,1.5rem)]"
                >
                  <span className="section-index">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading mt-2.5 text-[clamp(0.95rem,0.3vw+0.88rem,1.1rem)] leading-tight font-bold tracking-[-0.02em] transition-colors group-hover:text-brand">
                    {p.title}
                  </h2>
                  <p className="mt-1.5 text-[clamp(0.8rem,0.2vw+0.76rem,0.88rem)] leading-[1.5] text-muted-foreground">
                    {p.text}
                  </p>
                </NavLink>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
