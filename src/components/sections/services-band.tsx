import { ArrowRight } from "lucide-react";
import { NavLink } from "@/components/site/nav-link";
import { Reveal } from "@/components/site/reveal";
import { getContent, homePath, type Locale } from "@/lib/content";

/**
 * The four services, on the we-are.be service-card pattern: a filled block
 * with no border, generous padding, and a link affordance at the bottom.
 *
 * It sits between the hero and the Constat, where their own services band
 * sits, and it is the short answer for a visitor who will not read further.
 */
export function ServicesBand({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);
  const offerHref = `${homePath(locale)}#offre`;

  return (
    <section className="section-screen">
      <div className="section-panel">
        <div className="container-page">
          <Reveal className="grid gap-[clamp(0.75rem,0.6rem+0.8vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-4">
            {hero.pillars.map((p) => (
              <NavLink
                key={p.title}
                href={offerHref}
                locale={locale}
                className="surface-card lift group flex flex-col p-[clamp(1.25rem,1rem+1.2vw,2rem)]"
              >
                <h2 className="font-heading max-w-[16ch] text-[clamp(1.05rem,0.4vw+0.95rem,1.3rem)] leading-[1.15] font-bold tracking-[-0.025em]">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-[34ch] text-[length:var(--fs-small)] leading-[1.6] text-muted-foreground">
                  {p.text}
                </p>
                <ArrowRight
                  aria-hidden
                  className="mt-[clamp(1.5rem,1.2rem+1vw,2.5rem)] size-5 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
                <span className="sr-only">{`En savoir plus : ${p.title}`}</span>
              </NavLink>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
