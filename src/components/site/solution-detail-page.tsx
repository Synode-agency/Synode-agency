import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InnerPage } from "@/components/site/inner-page";
import { getContent, path, type Locale } from "@/lib/content";
import { capabilitiesOf, findSystem } from "@/lib/solutions";

/**
 * La page d'un système.
 *
 * Elle n'a pas de placeholder, et c'est volontaire : tout ce qu'elle
 * affiche existe déjà. Le système EST la chaîne de ses capacités, dans
 * l'ordre, et chaque capacité a son titre et son résumé écrits au
 * catalogue. Il n'y a donc rien à inventer pour que la page soit complète.
 *
 * La chaîne est une liste ordonnée, pas une grille : c'est le passage d'une
 * étape à la suivante qui explique ce que le système prend en charge. Une
 * grille aurait montré des briques côte à côte, exactement ce que le
 * repositionnement cherche à ne plus vendre.
 */
export function SolutionDetailPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const { solutions } = getContent(locale);
  const system = findSystem(locale, slug);
  if (!system) return null;
  const caps = capabilitiesOf(locale, system);

  return (
    <InnerPage
      locale={locale}
      eyebrow={system.family}
      title={system.title}
      body={system.promise}
      action={
        <Link
          href={path(locale, "/contact")}
          className="group brand-gradient inline-flex w-fit items-center justify-center gap-2 rounded-[var(--r-pill)] px-7 py-4 text-[length:var(--fs-button)] font-medium text-brand-foreground"
        >
          {solutions.ctaLabel}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      }
    >
      <div className="container-page flex flex-col gap-[clamp(2rem,4vw,3rem)] pb-[var(--space-section)]">
        <section className="system-detail">
          <h2 id="composition" className="system-detail-title">
            {solutions.capsTitle}
          </h2>
          <p className="system-detail-lead">{system.lead}</p>

          <ol className="system-steps" aria-labelledby="composition">
            {caps.map((cap, i) => (
              <li key={cap.slug} className="system-step">
                {/* Le rang compte ici : les capacités s'enchaînent, la
                    deuxième travaille sur ce que la première a produit. */}
                <span aria-hidden className="system-step-rank">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="system-step-copy">
                  <Link
                    href={path(locale, `/expertise/${cap.slug}`)}
                    className="system-step-title"
                  >
                    {cap.title}
                  </Link>
                  <p className="system-step-text">{cap.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Link
          href={path(locale, "/solutions")}
          className="inline-flex w-fit items-center gap-2 text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          {solutions.backLabel}
        </Link>
      </div>
    </InnerPage>
  );
}
