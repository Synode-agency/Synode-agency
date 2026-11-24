import Link from "next/link";
import { ArrowDown, Check, Lock, ScrollText, Server, UserCheck } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Hero } from "@/components/site/hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CtaSection } from "@/components/site/cta-section";
import { renderLines } from "@/lib/lines";
import { getContent, includedAnchor, serviceAnchor, type Locale } from "@/content";

/* Une icône par garantie de sécurité, dans l'ordre du brief. */
const SECURITY_ICONS = [Lock, UserCheck, ScrollText, Server];

/**
 * LA PAGE SERVICES (brief de la refonte, 6.2).
 *
 * Huit sections : le hero, les trois services (une bande chacun, avec son
 * ancre), ce qui est inclus et la tarification côte à côte, la sécurité, la
 * FAQ et l'appel final. Chaque service suit l'ordre du brief : le problème,
 * ce qu'on fait, trois exemples, le résultat (règle 6).
 *
 * La tarification et la sécurité ne sont écrites qu'ici sur tout le site.
 */
export function ServicesPage({ locale }: { locale: Locale }) {
  const { services: s } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Hero
        locale={locale}
        eyebrow={s.hero.eyebrow}
        title={renderLines(s.hero.title, s.hero.accents, "title-accent")}
        subtitle={s.hero.subtitle}
      >
        {/* Le sommaire de la page : trois liens texte vers les trois blocs,
            pas un second bouton. */}
        <nav className="services-index" aria-label={s.hero.eyebrow}>
          {s.blocks.map((block, i) => (
            <Link key={block.key} href={`#${serviceAnchor(locale, block.key)}`}>
              <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
              {block.title}
              <ArrowDown aria-hidden />
            </Link>
          ))}
        </nav>
      </Hero>

      {s.blocks.map((block, i) => (
        <Band key={block.key} id={serviceAnchor(locale, block.key)} className="rf-section service-band">
          <article className="service-block">
            <header className="service-block-head">
              <span className="service-block-index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="service-block-title">{block.title}</h2>
              <p className="service-block-problem">
                <span className="rf-label">{s.labels.problem}</span>
                {block.problem}
              </p>
            </header>

            <div className="service-block-body">
              <div>
                <h3 className="rf-label">{s.labels.does}</h3>
                <p className="service-block-does">{block.does}</p>
              </div>
              <div>
                <h3 className="rf-label">{s.labels.examples}</h3>
                <ul className="check-list">
                  {block.examples.map((example) => (
                    <li key={example.strong}>
                      <Check aria-hidden />
                      <p>
                        <strong>{example.strong}</strong>
                        {example.rest}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="service-block-result">
                <span className="rf-label">{s.labels.result}</span>
                {block.result}
              </p>
            </div>
          </article>
        </Band>
      ))}

      <Band id={includedAnchor(locale)} className="rf-section">
        <div className="rf-split">
          <div>
            <Lede title={s.included.title} />
            <ul className="check-list section-gap-sm">
              {s.included.items.map((item) => (
                <li key={item}>
                  <Check aria-hidden />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <p className="rf-note">{s.included.option}</p>
          </div>
          <div>
            <Lede title={s.pricing.title} />
            <ol className="rf-numbered section-gap-sm">
              {s.pricing.items.map((item) => (
                <li key={item.strong}>
                  <p>
                    <strong>{item.strong}</strong>
                    {item.rest}
                  </p>
                </li>
              ))}
            </ol>
            {/* Vides tant que Synode ne les a pas décidés ou vérifiés. */}
            {s.pricing.from && <p className="rf-note">{s.pricing.from}</p>}
            {s.pricing.aids && <p className="rf-note">{s.pricing.aids}</p>}
          </div>
        </div>
      </Band>

      <Band id="securite" className="rf-section">
        <Lede title={s.security.title} />
        <ul className="security-grid section-gap-sm">
          {s.security.items.map((item, i) => {
            const Icon = SECURITY_ICONS[i % SECURITY_ICONS.length];
            return (
              <li key={item.strong}>
                <span className="rf-icon" aria-hidden>
                  <Icon />
                </span>
                <p>
                  <strong>{item.strong}</strong>
                  {item.rest}
                </p>
              </li>
            );
          })}
        </ul>
      </Band>

      <Band id="faq" className="rf-section">
        <Lede title={s.faq.title} />
        <div className="section-gap-sm">
          <FaqAccordion items={s.faq.items.filter((item) => item.a.trim() !== "")} />
        </div>
      </Band>

      <CtaSection locale={locale} />
    </Shell>
  );
}
