import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { HeroStage } from "@/components/site/hero-stage";
import { Architecture } from "@/components/site/architecture";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { renderLines } from "@/lib/lines";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { listCases } from "@/lib/use-cases";

/**
 * L'accueil.
 *
 * SIX TEMPS, et pas dix. Tout ce qui a sa propre page dans la navigation a
 * quitté cette page : la méthode, les réalisations et l'équipe ne sont plus
 * des sections d'accueil. Un accueil qui résume les cinq pages du menu est
 * un sommaire, et personne ne lit deux fois la même chose.
 *
 * ⚠ Cela s'écarte de `README_2_ARCHITECTURE_SITE_SYNODE.md`, qui décrit neuf
 * sections d'accueil. C'est une décision prise après avoir vu la page : à
 * neuf sections elle devenait une table des matières. Si l'architecture doit
 * primer, ce sont ces trois sections qu'il faut remettre.
 *
 * LE DÉCOUPAGE SE FAIT PAR LE FOND, pas par des cadres. Gris, blanc, bleu,
 * blanc, puis la carte finale. Deux arrondis sur toute la page : le hero et
 * le CTA, là où elle s'ouvre et se referme.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const { site, home } = getContent(locale);
  const cases = listCases(locale).slice(0, 4);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const fr = locale === "fr";

  return (
    <Shell locale={locale}>
      {/* --------------------------------------------------- 1. Hero (carte) */}
      <CardPanel id="top" variant="hero">
        <div className="col hero">
          <div className="hero-copy">
            {/* Pas d'animation d'entrée sur le titre : c'est la première
                chose à l'écran, et un titre qui apparaît en fondu retarde le
                message et fait passer le site pour lent. */}
            <h1 className="hero-title">{renderLines(home.hero.title)}</h1>
            <p className="hero-text">{home.hero.text}</p>

            <div className="btn-row hero-actions">
              <Link href={bookHref} className="btn btn--primary">
                {site.cta}
                <ArrowRight aria-hidden />
              </Link>
              <Link href={path(locale, ROUTES.useCases)} className="btn btn--ghost">
                {home.hero.secondaryCta}
              </Link>
            </div>

            <ul className="hero-stack">
              {home.hero.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="hero-visual">
            <HeroStage locale={locale} />
          </div>
        </div>
      </CardPanel>

      {/* ------------------------------------------- 2. Problèmes (fond gris) */}
      <Band id="problemes" tone="base">
        <Lede kicker={home.problems.kicker} title={home.problems.title} text={home.problems.text} />
        {/* Quatre rangées sur un filet, pas quatre cartes. Un constat se lit,
            il ne se compare pas. */}
        <ul className="rows section-gap">
          {home.problems.items.map((item) => (
            <li key={item.title}>
              <Link
                href={`${path(locale, ROUTES.useCases)}#${item.useCase}`}
                className="row row--split"
              >
                <span className="row-title">{item.title}</span>
                <span className="row-text">{item.text}</span>
                <ArrowRight aria-hidden className="row-go" />
              </Link>
            </li>
          ))}
        </ul>
      </Band>

      {/* ----------------------------------------- 3. Cas d'usage (fond blanc) */}
      <Band id="cas-usage" tone="white">
        <Lede kicker={home.useCases.kicker} title={home.useCases.title} text={home.useCases.text} />
        <ul className="rows section-gap">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link href={`${path(locale, ROUTES.useCases)}#${c.slug}`} className="row row--split">
                <span className="row-title">{c.title}</span>
                <span className="row-text">{c.benefit}</span>
                <ArrowRight aria-hidden className="row-go" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href={path(locale, ROUTES.useCases)} className="go section-gap-sm">
          {home.useCases.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Band>

      {/* ----------------------------------------------- 4. L'offre (fond bleu) */}
      <Band id="offre" tone="blue">
        <Lede title={home.offer.title} text={home.offer.text} />

        {/* Les quatre briques en séquence numérotée, pleine largeur. Ce ne
            sont pas quatre options à comparer : c'est ce dont une solution
            peut être faite, et la numérotation dit qu'on les assemble. */}
        <ol className="seq section-gap">
          {home.offer.bricks.map((b, i) => (
            <li key={b.title} className="seq-item">
              <span aria-hidden className="seq-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="seq-title">{b.title}</h3>
              <p className="seq-text">{b.text}</p>
            </li>
          ))}
        </ol>

        {/* Le schéma. Il dit en deux secondes ce que le paragraphe met dix
            secondes à dire, et c'est le seul élément graphique de la page
            après le hero. */}
        <div className="section-gap">
          <Architecture locale={locale} />
        </div>

        <p className="offer-note section-gap">{home.offer.note}</p>
        <Link href={path(locale, ROUTES.solutions)} className="btn btn--primary section-gap-sm">
          {home.offer.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Band>

      {/* ------------------------------------------------- 5. FAQ (fond blanc) */}
      <Band id="faq" tone="white">
        <Lede kicker={home.faq.kicker} title={home.faq.title} />
        <div className="section-gap">
          <FaqAccordion items={home.faq.items.map((i) => ({ q: i.q, a: i.a }))} />
        </div>
      </Band>

      {/* ------------------------------------------------ 6. CTA final (carte) */}
      <CardPanel id="conclusion">
        <div className="col card-body cta-panel">
          <Lede title={home.cta.title} text={home.cta.text} align="center" />
          <div className="btn-row cta-actions">
            <Link href={bookHref} className="btn btn--primary">
              {site.cta}
              <ArrowRight aria-hidden />
            </Link>
            <Link href={formHref} className="btn btn--ghost">
              {home.cta.secondary}
            </Link>
          </div>
          <p className="cta-note">
            {fr
              ? "30 minutes, sans engagement. Si l’IA n’est pas la bonne réponse à votre problème, nous vous le dirons."
              : "30 minutes, no strings attached. If AI is not the right answer to your problem, we will tell you."}
          </p>
        </div>
      </CardPanel>
    </Shell>
  );
}
