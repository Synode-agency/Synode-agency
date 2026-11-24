import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Hero } from "@/components/site/hero";
import { CtaSection } from "@/components/site/cta-section";
import { TeamCard, TeamCards } from "@/components/equipe";
import { renderLines } from "@/lib/lines";
import { getContent, type Locale } from "@/content";

/**
 * LA PAGE À PROPOS (brief de la refonte, 6.4) : qui construit, comment on
 * travaille, et la méthode en détail. C'est le seul endroit du site où les
 * trois étapes sont détaillées ; leurs titres sont ceux de l'accueil.
 */
export function AboutPage({ locale }: { locale: Locale }) {
  const { about, site } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Hero
        locale={locale}
        eyebrow={about.hero.eyebrow}
        title={renderLines(about.hero.title, about.hero.accents, "title-accent")}
        subtitle={about.hero.text}
      />

      <Band id="fondateurs" className="rf-section">
        <Lede title={about.founders.title} />
        <div className="section-gap-sm">
          <TeamCards>
            {about.founders.people.map((person) => (
              <TeamCard key={person.last} {...person} />
            ))}
          </TeamCards>
        </div>
      </Band>

      <Band id="valeurs" className="rf-section">
        <Lede title={about.values.title} />
        <ul className="values-list section-gap-sm">
          {about.values.items.map((value) => (
            <li key={value.strong}>
              <p>
                <strong>{value.strong}</strong>
                {value.rest}
              </p>
            </li>
          ))}
        </ul>
      </Band>

      <Band id="methode" className="rf-section">
        <Lede title={about.method.title} />
        <ol className="steps-list steps-list--detailed section-gap-sm">
          {site.steps.items.map((step, i) => (
            <li key={step.title}>
              <span className="steps-rank" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>
                <strong>{step.title}</strong> {about.method.details[i]}
              </p>
            </li>
          ))}
        </ol>
      </Band>

      <CtaSection locale={locale} />
    </Shell>
  );
}
