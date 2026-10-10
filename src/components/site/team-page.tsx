import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { Lede } from "@/components/site/lede";
import { ContactPanel, HeroTeam, SkillsPanel, TeamCard, TeamCards } from "@/components/equipe";
import layout from "@/components/equipe/equipe.module.css";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

/** Cofounder copy from the published team page; portraits supplied in public/equipe. */
export function TeamPage({ locale }: { locale: Locale }) {
  const { team, site } = getContent(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const pagePath = path(locale, ROUTES.team);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: locale === "fr" ? "Équipe Synode, experts IA à Bruxelles" : "The Synode AI team in Brussels",
    description: team.metaDescription,
    url: `${siteUrl}${pagePath}`,
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Synode",
      url: siteUrl,
      member: team.people.map((person) => ({
        "@type": "Person",
        name: person.first,
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
        kicker={locale === "fr" ? "Agence IA à Bruxelles" : "AI agency in Brussels"}
        title={locale === "fr" ? <>Les <span>experts IA</span> de Synode</> : <>The <span>AI experts</span> behind Synode</>}
        aside={<HeroTeam locale={locale} />}
      >
        <p>{team.vision}</p>
        <div className="btn-row">
          <Link href="#associes" className="btn btn--primary">{locale === "fr" ? "Rencontrer les associés" : "Meet the partners"}<ArrowRight aria-hidden /></Link>
          <Link href={bookHref} className="btn btn--ghost">{site.ctaShort}</Link>
        </div>
      </PageHero>

      <Band id="associes" tone="white">
        <Lede title={team.peopleTitle} accents={locale === "fr" ? ["expertises IA"] : ["AI expertise"]} />
        {/* Les quatre textes de chaque carte viennent du contenu et sont
            affichés mot pour mot. Voir `components/equipe/team-card`. */}
        <div className="section-gap">
          <TeamCards>
            {team.people.map((p) => (
              <TeamCard key={p.first} first={p.first} photo={p.photo} headline={p.headline} role={p.role} text={p.text} />
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
        <Lede title={team.complementTitle} accents={locale === "fr" ? ["projets IA"] : ["AI projects"]} text={team.complementText} />
        <div className={layout.visual}><SkillsPanel locale={locale} /></div>
      </Band>

      {/* Même raison qu'au-dessus pour la grille sur le `.col`. Ici elle a
          TROIS enfants — le titre, la liste et la carte — donc le placement
          est explicite : les deux premiers l'un sous l'autre à gauche, la
          carte sur les deux rangées à droite. */}
      <Band id="facon" tone="white" bodyClassName={layout.splitList}>
        <Lede title={team.workingTitle} accents={locale === "fr" ? ["projet IA"] : ["AI project"]} />
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
      <CardPanel id="conclusion" className="dark-cta svc-cta team-cta" shellClassName="cta-shell--tint cta-shell--tall">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <Lede title={team.cta} accents={locale === "fr" ? ["votre projet"] : ["your project"]} text={team.ctaText} />
          </div>
          <div className="svc-cta-actions">
            <Link className="btn btn--primary" href={bookHref}>{site.cta}<ArrowRight aria-hidden /></Link>
            <Link className="btn btn--ghost" href={formHref}>{locale === "fr" ? "Nous contacter" : "Contact us"}</Link>
            <p className="cta-note">{locale === "fr" ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p>
          </div>
        </div>
      </CardPanel>
    </Shell>
  );
}
