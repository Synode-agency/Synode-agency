import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { HeroStage } from "@/components/site/hero-stage";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Hero, built as one card inset from the viewport and sitting on the page's
 * darker ground: `--page-gutter` on the sides and below, the smaller
 * `--page-gutter-top` above, because the navbar occupies that row.
 *
 * Le fond de carte porte tout le hero. La barre de navigation est
 * transparente en haut de page, donc au repos elle se lit comme la première
 * rangée de la carte et non comme une barre séparée. The card therefore reserves
 * `--header-h + --page-gutter-top + --header-drop` before its content
 * starts, which is exactly where the navbar ends while it is still inside
 * the card.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section id="top" className="page-shell relative px-[var(--page-gutter)] pt-[var(--page-gutter-top)] pb-[var(--page-gutter)]">
      <div className="relative flex min-h-[calc(100dvh-var(--page-gutter-top)-var(--page-gutter))] flex-col overflow-hidden hero-card rounded-[var(--r-lg)] border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)]">
        {/* Reserves the row the fixed navbar sits over */}
        <div aria-hidden className="h-[calc(var(--header-h)+var(--page-gutter-top)+var(--header-drop))]" />

        <div className="container-page relative z-10 flex flex-1 items-center py-[clamp(2rem,3vw,4.5rem)] lg:py-[clamp(1.25rem,1.6vw,2.5rem)]">
          <div className="hero-composition mx-auto grid w-full max-w-[104rem] items-center gap-10">
            {/* Left column — the pitch. Pas de Reveal : c'est la première
                chose à l'écran. Un titre qui apparaît en fondu retarde le
                message et fait passer le site pour lent. */}
            <div className="hero-copy flex flex-col items-start gap-6 text-left lg:gap-[calc(var(--hs)*1.6rem)]">
              {/* Plus de `w-fit` : il faisait prendre au titre la largeur de
                  son contenu, donc il ne revenait jamais à la ligne et
                  débordait de sa colonne. Il n'était là que pour la lueur
                  qui tournait derrière le titre, retirée depuis. */}
              <div className="relative isolate">
                <h1 className="hero-heading text-[length:var(--fs-display)] leading-[1.04] font-semibold lg:text-[min(calc(var(--hs)*6.2cqi),4.5rem)]">
                  {/* Chaque moitié tient sa ligne. Laissé libre, le titre se
                      coupait là où la largeur le décidait : après « l'IA » sur
                      un grand écran, après « votre » sur un 13 pouces, ce qui
                      laissait « business. » seul en bas. La coupe est donc
                      écrite, et elle tombe au même endroit partout.

                      Pas de `white-space: nowrap` avec : si une moitié ne
                      tient pas, elle se replie au lieu de sortir de sa
                      colonne. C'est exactement ce qui débordait sous le mock
                      avant. */}
                  <span className="block text-gradient-brand">{hero.titleLead}</span>
                  <span className="block text-gradient-accent">{hero.titleAccent}</span>
                </h1>
              </div>

              <p className="max-w-[56ch] text-[length:var(--fs-body)] leading-[var(--lh-body)] text-muted-foreground">
                {hero.subtitle}
              </p>

              <div className="mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <Link
                  href={path(locale, "/solutions")}
                  className="group brand-gradient inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] px-6 py-3.5 text-[length:var(--fs-button)] font-medium text-brand-foreground"
                >
                  {hero.primaryCta}
                  {/* La flèche avance : le bouton mène ailleurs. */}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href={path(locale, "/contact")}
                  className="group inline-flex items-center justify-center gap-2 rounded-[var(--r-pill)] border border-hairline px-6 py-3.5 text-[length:var(--fs-button)] font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-surface-2"
                >
                  {/* Pas d'icône ici. Le bouton principal porte la flèche
                      parce qu'il fait avancer dans le parcours ; celui-ci
                      ouvre une conversation, et deux boutons fléchés côte à
                      côte se répondent en miroir sans rien distinguer. */}
                  {hero.secondaryCta}
                </Link>
              </div>

              {/* La bande de ce que la maison fabrique.

                  Elle dit en cinq mots que Synode ne vend pas que de
                  l'automatisation, et elle porte les expressions que les
                  gens tapent dans un moteur de recherche. Ce ne sont pas
                  des liens : un visiteur qui vient d'arriver a deux
                  boutons à choisir, pas sept.

                  Elle est SOUS les boutons et non au-dessus du titre : au-
                  dessus, elle aurait été un sixième élément avant que le
                  message principal soit lu. */}
              <ul className="hero-stack">
                {hero.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* La pile des trois systèmes. Pas de Reveal : les cartes
                entrent une par une au chargement, depuis le CSS, après que
                le texte de gauche a commencé à bouger. */}
            <div className="hero-visual">
              <HeroStage locale={locale} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
