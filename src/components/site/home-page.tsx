import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Panel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { HeroStage } from "@/components/site/hero-stage";
import { Reveal } from "@/components/site/reveal";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { renderLines } from "@/lib/lines";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { listCases } from "@/lib/use-cases";
import { work, workItems } from "@/lib/work";

/**
 * L'accueil.
 *
 * L'ordre vient de l'architecture, et il a une logique : on montre le
 * PROBLÈME et les CAS D'USAGE avant la méthode. Quelqu'un qui ne se
 * reconnaît pas dans les quatre premières cartes n'a aucune raison de lire
 * comment nous travaillons.
 *
 * Les sections d'accueil sont des résumés. Chacune renvoie à la page qui
 * développe, et aucune ne recopie le paragraphe de cette page : deux textes
 * identiques à deux endroits, c'est deux textes à maintenir et un visiteur
 * qui a l'impression de tourner en rond.
 *
 * Un seul panneau coloré dans le corps de la page, le CTA final. Le pied de
 * page porte l'encre, mais il n'est pas une section : c'est le cadre de la
 * page, identique partout.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const { site, home } = getContent(locale);
  const cases = listCases(locale).slice(0, 4);
  const w = work(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;

  return (
    <Shell locale={locale}>
      {/* ------------------------------------------------------------ 1. Hero */}
      <section className="panel panel--hero" id="top">
        <div className="col hero">
          <div className="hero-copy">
            {/* Pas de Reveal sur le titre : c'est la première chose à
                l'écran, et un titre qui apparaît en fondu retarde le message
                et fait passer le site pour lent. */}
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

            {/* Ce que la maison fabrique, en une ligne. Ce ne sont pas des
                liens : à l'arrivée le visiteur a deux choix, pas sept. */}
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
      </section>

      {/* -------------------------------------------------------- 2. Problèmes */}
      <Panel id="problemes">
        <Lede
          kicker={home.problems.kicker}
          title={home.problems.title}
          text={home.problems.text}
        />
        <div className="tile-grid tile-grid--4 section-gap">
          {home.problems.items.map((item, i) => (
            <Reveal key={item.title} delay={60 + i * 70} className="reveal-up">
              <Link
                href={`${path(locale, ROUTES.useCases)}#${item.useCase}`}
                className="tile problem-tile"
              >
                <span className="tile-title">{item.title}</span>
                <span className="tile-text">{item.text}</span>
                <span className="go problem-go">
                  {locale === "fr" ? "Le cas d’usage" : "The use case"}
                  <ArrowRight aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Panel>

      {/* ------------------------------------------------------ 3. Cas d'usage */}
      <Panel id="cas-usage" tone="quiet">
        <Lede
          kicker={home.useCases.kicker}
          title={home.useCases.title}
          text={home.useCases.text}
        />
        <ul className="rows section-gap">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={`${path(locale, ROUTES.useCases)}#${c.slug}`}
                className="row row--split"
              >
                <span className="row-title">{c.title}</span>
                <span className="row-text">{c.benefit}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={path(locale, ROUTES.useCases)} className="go section-gap-sm">
          {home.useCases.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Panel>

      {/* ------------------------------------------------------------ 4. Offre */}
      <Panel id="offre">
        <Lede kicker={home.offer.kicker} title={home.offer.title} text={home.offer.text} />
        <div className="tile-grid tile-grid--4 section-gap">
          {home.offer.bricks.map((b) => (
            <div key={b.title} className="tile">
              <span className="tile-title">{b.title}</span>
              <span className="tile-text">{b.text}</span>
            </div>
          ))}
        </div>
        <p className="prose-body section-gap-sm">{home.offer.note}</p>
        <Link href={path(locale, ROUTES.solutions)} className="go section-gap-sm">
          {home.offer.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Panel>

      {/* ---------------------------------------------------------- 5. Preuves */}
      <Panel id="preuves" tone="quiet">
        <Lede kicker={home.proof.kicker} title={home.proof.title} text={home.proof.text} />
        <div className="tile-grid tile-grid--2 section-gap">
          {workItems(locale).map((item) => (
            <Link
              key={item.slug}
              href={`${path(locale, ROUTES.work)}/${item.slug}`}
              className="tile"
            >
              <span className="badge badge--wip">{w.kinds[item.kind]}</span>
              <span className="tile-title">{item.title}</span>
              <span className="tile-text">{item.problem}</span>
              <span className="go">
                {locale === "fr" ? "Voir la fiche" : "See the entry"}
                <ArrowRight aria-hidden />
              </span>
            </Link>
          ))}
          {/* Il n'y a pas encore de démonstration. On le dit, plutôt que de
              laisser une case vide ou d'inventer un exemple. */}
          <div className="todo">
            <span className="todo-label">{w.empty.title}</span>
            <p>{w.empty.text}</p>
          </div>
        </div>
        <Link href={path(locale, ROUTES.work)} className="go section-gap-sm">
          {home.proof.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Panel>

      {/* ---------------------------------------------------------- 6. Méthode */}
      <Panel id="methode">
        <Lede kicker={home.method.kicker} title={home.method.title} text={home.method.text} />
        {/* Cinq temps, et c'est une vraie séquence : chacun ne peut pas
            commencer avant que le précédent soit validé. C'est la seule
            section de la page où une numérotation dit quelque chose. */}
        <ol className="rows section-gap">
          {home.method.steps.map((step, i) => (
            <li key={step.title}>
              <div className="row row--split method-row">
                <span className="method-head">
                  <span aria-hidden className="rank">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="row-title">{step.title}</span>
                </span>
                <span className="row-text">{step.text}</span>
              </div>
            </li>
          ))}
        </ol>
        <Link href={path(locale, ROUTES.method)} className="go section-gap-sm">
          {home.method.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Panel>

      {/* ----------------------------------------------------------- 7. Équipe */}
      <Panel id="equipe" tone="quiet">
        <Lede kicker={home.team.kicker} title={home.team.title} text={home.team.text} />
        <Link href={path(locale, ROUTES.team)} className="go section-gap-sm">
          {home.team.cta}
          <ArrowRight aria-hidden />
        </Link>
      </Panel>

      {/* -------------------------------------------------------------- 8. FAQ */}
      <Panel id="faq">
        <Lede kicker={home.faq.kicker} title={home.faq.title} />
        <div className="section-gap">
          <FaqAccordion items={home.faq.items.map((i) => ({ q: i.q, a: i.a }))} />
        </div>
      </Panel>

      {/* -------------------------------------------------------- 9. CTA final */}
      <Panel id="conclusion" tone="brand">
        <Lede title={home.cta.title} text={home.cta.text} align="center" />
        <div className="btn-row cta-actions">
          <Link href={bookHref} className="btn btn--primary cta-primary">
            {site.cta}
            <ArrowRight aria-hidden />
          </Link>
          <Link href={formHref} className="btn btn--ghost">
            {home.cta.secondary}
          </Link>
        </div>
      </Panel>
    </Shell>
  );
}
