import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Lede } from "@/components/site/lede";
import { ContactPanel, SkillsPanel, TeamCard, TeamCards } from "@/components/equipe";
import layout from "@/components/equipe/equipe.module.css";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/content";
import { siteUrl } from "@/lib/site-url";
import { organizationAlternateName, organizationName, sameAsField } from "@/lib/organization";

/** Cofounder copy from the published team page; portraits supplied in public/equipe. */
export function TeamPage({ locale }: { locale: Locale }) {
  const { team, site } = getContent(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const pagePath = path(locale, ROUTES.team);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "fr" ? "L’équipe de Synode à Bruxelles" : "The Synode team in Brussels",
    description: team.metaDescription,
    url: `${siteUrl}${pagePath}`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: organizationName,
      alternateName: organizationAlternateName,
      url: `${siteUrl}/`,
      ...sameAsField,
      member: team.people.map((person) => ({
        "@type": "Person",
        name: `${person.first} ${person.last}`,
        givenName: person.first,
        familyName: person.last,
        jobTitle: person.role,
        image: `${siteUrl}${person.photo}`,
        worksFor: { "@id": `${siteUrl}/#organization` },
      })),
    },
  };

  return (
    <Shell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PageHero
        className="team-hero"
        kicker={locale === "fr" ? "Agence technologique · Bruxelles" : "Technology agency · Brussels"}
        title={locale === "fr" ? <>Les <span>fondateurs</span> de Synode</> : <>The <span>founders</span> of Synode</>}
      >
        <p>{team.vision}</p>
        <div className="btn-row">
          <Link href="#associes" className="btn btn--primary">{locale === "fr" ? "Rencontrer les fondateurs" : "Meet the founders"}<ArrowDown aria-hidden /></Link>
          <Link href={bookHref} className="btn btn--ghost">{site.cta}</Link>
        </div>
      </PageHero>

      <Band id="associes" tone="white">
        <Lede kicker={locale === "fr" ? "Les fondateurs" : "The founders"} title={team.peopleTitle} accents={locale === "fr" ? ["expertises complémentaires"] : ["complementary expertise"]} />
        {/* Les quatre textes de chaque carte viennent du contenu et sont
            affichés mot pour mot. Voir `components/equipe/team-card`. */}
        <div className="section-gap">
          <TeamCards>
            {team.people.map((p) => (
              <TeamCard key={p.first} first={p.first} last={p.last} photo={p.photo} role={p.role} text={p.text} />
            ))}
          </TeamCards>
        </div>

      </Band>

      {/* ⚠ Le thème peint les bandes selon leur RANG, pas selon leur `tone` :
          sans la classe explicite, cette bande serait bleu nuit parce
          qu'elle est la troisième. Voir `.tint-band` dans studio.css. */}
      {/* ⚠ La grille est posée sur le `.col` de la bande, par `bodyClassName`,
          et non sur un conteneur intercalé : les règles de mesure des titres
          et des chapeaux visent `.band > .col > .lede` en enfant DIRECT, et
          un conteneur de plus les ferait tomber. Le texte garderait sa place
          mais pas sa largeur de ligne. */}
      <Band id="complementarite" tone="base" className="tint-band" bodyClassName={layout.split}>
        <Lede kicker={locale === "fr" ? "Nos expertises" : "Our expertise"} title={team.complementTitle} accents={locale === "fr" ? ["de l’IA au logiciel"] : ["from AI to software"]} text={team.complementText} />
        <div className={layout.visual}><SkillsPanel locale={locale} /></div>
      </Band>

      {/* Même raison qu'au-dessus pour la grille sur le `.col`. Ici elle a
          TROIS enfants — le titre, la liste et la carte — donc le placement
          est explicite : les deux premiers l'un sous l'autre à gauche, la
          carte sur les deux rangées à droite. */}
      <Band id="facon" tone="white" bodyClassName={layout.splitList}>
        <Lede kicker={locale === "fr" ? "Notre façon de travailler" : "How we work"} title={team.workingTitle} accents={locale === "fr" ? ["votre projet"] : ["your project"]} />
        <ul className="checks section-gap">
          {team.working.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
        <div className={layout.visual}><ContactPanel locale={locale} /></div>
      </Band>

      {/* ===== LE CTA — une carte bleu nuit posée sur la section, comme sur
          les pages services et non une bande pleine largeur. Le texte à
          gauche, les deux actions à droite l'une au-dessus de l'autre :
          `svc-cta` et `svc-cta-actions` portent cette composition, elles ne
          sont pas réservées aux pages services. ===== */}
      {/* `cta-shell--tall` donne à la coquille un remplissage vertical SYMÉTRIQUE :
          par défaut elle a 2rem en haut et 5rem en bas, et la carte paraissait
          collée au haut de sa section. */}
      <CardPanel id="conclusion" className="dark-cta svc-cta team-cta" shellClassName="cta-shell--tall">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <span className="eyebrow">{locale === "fr" ? "Échange découverte gratuit" : "Free discovery call"}</span>
            <Lede title={team.cta} accents={locale === "fr" ? ["votre projet"] : ["your project"]} text={team.ctaText} />
          </div>
          <div className="svc-cta-actions">
            <Link className="btn btn--primary" href={bookHref}>{site.cta}<ArrowRight aria-hidden /></Link>
            <Link className="btn btn--ghost" href={formHref}>{locale === "fr" ? "Décrire votre besoin" : "Tell us what you need"}</Link>
            <p className="cta-note">{locale === "fr" ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p>
          </div>
        </div>
      </CardPanel>
    </Shell>
  );
}
