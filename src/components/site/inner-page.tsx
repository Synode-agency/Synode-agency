import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { PageHero } from "@/components/site/page-hero";
import type { Locale } from "@/lib/content";

/**
 * La coquille des pages secondaires : Services, une prestation, la FAQ,
 * l'équipe.
 *
 * Elle n'emprunte pas la grande carte plein écran de l'accueil, de
 * Réalisations et de Contact. Ces trois-là sont des pages d'entrée et méritent
 * l'ouverture ; une page de service se lit, elle commence directement par son
 * titre. Le reste — colonne, gouttières, filets, en-tête, pied de page — est
 * exactement celui du site.
 */
export function InnerPage({
  locale,
  eyebrow,
  title,
  titleAccent,
  body,
  action,
  children,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  body: string;
  action?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} />

      <main className="flex-1">
        <section className="page-shell relative px-[var(--page-gutter)] pt-[var(--page-gutter-top)] pb-[var(--page-gutter)]">
          <div className="container-page">
            {/* Réserve la rangée qu'occupe la barre de navigation fixe. */}
            <div
              aria-hidden
              className="h-[calc(var(--header-h)+var(--page-gutter-top)+var(--header-drop))]"
            />
            <div className="pt-[clamp(1.5rem,4vw,3.5rem)] pb-[clamp(2rem,5vw,4rem)]">
              <PageHero
                eyebrow={eyebrow}
                title={title}
                titleAccent={titleAccent}
                body={body}
                action={action}
                align="left"
              />
            </div>
          </div>
        </section>

        {children}
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
