import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";

/**
 * L'équipe.
 *
 * Deux associés, leurs prénoms et leurs rôles. Rien d'autre, et c'est
 * volontaire : l'architecture demande d'éviter les années d'expérience, les
 * certifications et la taille d'équipe, parce que ce sont précisément les
 * champs qu'on gonfle sans que personne puisse vérifier.
 *
 * ⚠ Ce qui manque et qui doit être fourni avant la mise en ligne : les noms
 * complets, les photos réelles et les liens LinkedIn. L'emplacement est
 * dessiné et affiché en clair plutôt que masqué, pour que l'oubli se voie.
 */
export function TeamPage({ locale }: { locale: Locale }) {
  const { team, site } = getContent(locale);
  const fr = locale === "fr";
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" kicker={team.kicker} title={team.title} text={team.vision} />
      </Band>

      <Band id="associes" tone="white">
        <Lede title={team.peopleTitle} />
        <div className="tile-grid tile-grid--2 section-gap">
          {team.people.map((p) => (
            <article key={p.first} className="tile person">
              {/* Le portrait manque. Plutôt qu'une silhouette générique, une
                  initiale composée dans la typographie du site : c'est
                  visiblement un emplacement, pas une fausse photo. */}
              <span aria-hidden className="person-mark">
                {p.first.charAt(0)}
              </span>
              <span className="tile-title">{p.first}</span>
              <span className="person-role">{p.role}</span>
              <span className="tile-text">{p.text}</span>
            </article>
          ))}
        </div>

        <div className="todo section-gap-sm">
          <span className="todo-label">{fr ? "À compléter" : "To complete"}</span>
          <p>
            {fr
              ? "Noms complets, photos réelles et liens LinkedIn des deux associés. Tant qu’ils ne sont pas fournis, cette page présente les rôles sans les personnes."
              : "Full names, real photographs and LinkedIn links for both partners. Until they are supplied, this page describes the roles without the people."}
          </p>
        </div>
      </Band>

      <Band id="complementarite" tone="base">
        <Lede title={team.complementTitle} text={team.complementText} />
      </Band>

      <Band id="facon" tone="white">
        <Lede title={team.workingTitle} />
        <ul className="checks section-gap">
          {team.working.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </Band>

      <Band id="conclusion" tone="blue">
        <Lede title={team.cta} align="center" />
        <div className="btn-row cta-actions">
          <Link href={bookHref} className="btn btn--primary">
            {site.cta}
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </Band>
    </Shell>
  );
}
