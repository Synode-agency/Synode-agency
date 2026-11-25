import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { Castoro, Instrument_Serif } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { Hero } from "@/components/site/hero";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { CaseShowcase } from "@/components/site/case-cards";
import { CtaSection } from "@/components/site/cta-section";
import { ProofStrip } from "@/components/site/home-sections";
import { MethodeScroll } from "@/components/site/methode-scroll";
import { ServicesGrid } from "@/components/site/services-grid";
import { TitreAnime } from "@/components/site/titre-anime";
import { SectionNuit } from "@/components/site/section-nuit";
import { ApproachScroll } from "@/components/site/approach-scroll";
import { ROUTES, getContent, path, type Locale } from "@/content";
import { ctaLabel } from "@/content/cta";
import { bookingHref } from "@/lib/routes";
import { siteUrl } from "@/lib/site-url";
import { organizationAlternateName, organizationName, sameAsField } from "@/lib/organization";

/* LES MOTS EN COULEUR DE L'ACCUEIL (25/11/2026) : « logiciel », « IA »,
   et les mots qui changent dans les en-têtes des services et des
   réalisations, en italique, dans une police à
   empattements : Castoro (choisie par Antonino sur la planche de
   maquettes, après Instrument Serif, Bodoni Moda et Fraunces). Elle n'a
   qu'une graisse, la normale : jamais de faux gras. Le reste reste en
   Manrope. Chargée ici et non dans le gabarit commun : seul l'accueil s'en
   sert. `next/font` la sert depuis le site lui-même. Licence libre (OFL). */
const accentFont = Castoro({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-accent",
  display: "swap",
});

/* Les mots clés de « Notre méthode » (« 30 min. », « écrit. », « suivi. ») :
   Instrument Serif italique, demandé par la fiche « 4a » d'Antonino
   (25/11/2026). Seule cette section s'en sert. */
const instrumentFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
});

/* Met un passage d'un texte en gras (le nom de l'agence dans la
   description du hero). Sans le passage, le texte reste tel quel. */
function emphasize(text: string, phrase: string): ReactNode {
  const at = phrase ? text.indexOf(phrase) : -1;
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <strong>{phrase}</strong>
      {text.slice(at + phrase.length)}
    </>
  );
}

/* Une ligne du titre, avec ses mots en couleur (`.title-accent`). */
function titleLine(line: string, accents: readonly string[]): ReactNode[] {
  const motif = new RegExp(`(${accents.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return line
    .split(motif)
    .filter(Boolean)
    .map((part, i) =>
      accents.includes(part) ? (
        <span key={i} className="title-accent">
          {part}
        </span>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}

/**
 * L'ACCUEIL DE LA REFONTE (brief, 6.1), réécrit le 24/11/2026.
 *
 * Huit sections au plus, et dans cet ordre : le hero avec la bande de
 * preuve, le problème du client, les trois services, les réalisations, les
 * trois étapes, les fondateurs, une FAQ courte, l'appel final. Un seul
 * bouton plein, le même partout. Tous les textes viennent de
 * `src/content/{fr,en}/home.ts` et `common.ts`.
 *
 * Les bandes alternent sombre et clair d'elles-mêmes (thème
 * `alternating`) : aucune ne force sa couleur.
 */
export function HomePage({ locale }: { locale: Locale }) {
  const { site, home, about } = getContent(locale);
  const fr = locale === "fr";
  /* LES DONNÉES STRUCTURÉES (brief, section 10) : le site, et l'agence en
     `ProfessionalService`, avec sa ville et son pays mais sans adresse de
     rue (Synode n'en a pas de publique), son e-mail, ses langues et sa page
     LinkedIn. Les deux langues ont les leurs. */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: organizationName,
        alternateName: organizationAlternateName,
        inLanguage: ["fr-BE", "en"],
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: organizationName,
        alternateName: organizationAlternateName,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/synode-logo.png`,
        image: `${siteUrl}/synode-logo.png`,
        email: site.email,
        ...sameAsField,
        description: home.metaDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: fr ? "Bruxelles" : "Brussels",
          addressCountry: "BE",
        },
        areaServed: [
          { "@type": "City", name: fr ? "Bruxelles" : "Brussels" },
          { "@type": "Country", name: fr ? "Belgique" : "Belgium" },
        ],
        availableLanguage: ["fr", "en"],
        knowsAbout: home.services.items.map((item) => item.title),
        founder: about.founders.people.map((p) => ({ "@type": "Person", name: `${p.first} ${p.last}` })),
      },
    ],
  };

  /* Une question sans réponse (« À compléter ») ne s'affiche pas. */
  const faq = home.faq.items.filter((item) => item.a.trim() !== "");

  return (
    <Shell locale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Le hero de l'accueil (24/11/2026) : centré (titre, phrase, l'appel
          de 30 min, mention), sur un fond bleu nuit avec un halo bleu au
          centre. Pas de photo. */}
      <Hero
        locale={locale}
        className={`home-page-hero home-hero ${accentFont.variable}`}
        title={home.hero.title.split("\n").map((line, i) => (
          /* Une ligne par `\n`, décalées l'une de l'autre dès 768px ; sur
             téléphone, elles se suivent (l'espace les sépare) et chaque
             « | » y devient un retour à la ligne (`.hero-title-br`, masqué
             dès 768px) : quatre lignes choisies (choix D, 25/11/2026). */
          <Fragment key={line}>
            {i > 0 ? " " : null}
            <span className={`hero-title-line hero-title-line--${i + 1}`}>
              {line.split("|").map((morceau, j) => (
                <Fragment key={j}>
                  {j > 0 ? (
                    <>
                      {" "}
                      <br className="hero-title-br" />
                    </>
                  ) : null}
                  {titleLine(morceau, home.hero.accents)}
                </Fragment>
              ))}
            </span>
          </Fragment>
        ))}
        subtitle={emphasize(home.hero.subtitle, home.hero.emphasis)}
        primaryCta
        arrows={false}
        note={home.hero.note}
      />

      {/* LA BANDE DES CLIENTS, juste sous le hero (24/11/2026) : blanche,
          seulement les logos qui défilent sur toute la largeur de l'écran
          (« Ils nous font confiance » ne sert plus qu'aux lecteurs d'écran).
          ⚠ Un `div` et non une `section` (ni une `Band`) : les bandes
          alternent sombre et clair selon leur RANG parmi les sections
          (thème « alternating »). Une section de plus ici inverserait les
          couleurs de toute la suite de la page. */}
      <div className="logo-band" role="region" aria-label={home.proof.logosLabel}>
        <ProofStrip proof={home.proof} />
      </div>

      {/* NOTRE APPROCHE (refaite le 25/11/2026, maquette « L'escalier »
          validée par Antonino) : sur fond blanc, le paragraphe se remplit
          au défilement, mot par mot, et les trois photos de l'équipe
          arrivent en escalier à sa droite (`ApproachScroll`). En Manrope ;
          « logiciel » et « IA » en Castoro italique bleu.
          ⚠ Un `div` et non une `section`, comme le bandeau des logos : il
          ne compte pas dans l'alternance sombre/clair des bandes (la
          section des services reste blanche et la suite alterne à partir
          d'elle, demande d'Antonino du 24/11/2026). */}
      <ApproachScroll
        className={accentFont.variable}
        label={home.approach.label}
        text={home.approach.text}
        accents={home.approach.accents}
        photos={home.approach.photos}
      />

      <Band id="services" className={`rf-section ${accentFont.variable}`}>
        {/* Au défilement, tout l'écran passe en bleu nuit, d'un seul fond,
            avec « Notre approche » au-dessus et le haut des réalisations en
            dessous (aucune coupure entre bleu nuit et blanc), et les
            couleurs s'inversent ; tout l'écran redevient blanc, d'un bloc,
            à l'arrivée des réalisations. « Notre méthode » repasse ensuite
            au bleu nuit de la même façon (`SectionNuit`, `refonte.css`,
            demande d'Antonino du 25/11/2026). */}
        <SectionNuit aussi="#approche, #realisations" jusqua="#realisations" />
        {/* L'en-tête animé : « Conçus pour les » et un mot qui change en
            boucle (`TitreAnime`), sans étiquette au-dessus ; à droite,
            « Tous nos services », comme « Toutes nos réalisations »
            (demande d'Antonino du 25/11/2026). */}
        <div className="section-heading home-section-heading">
          <TitreAnime
            prefix={home.services.prefix}
            rotating={home.services.rotating}
            full={home.services.full}
            fullEnd={home.services.fullEnd}
          />
          <Link className="go" href={path(locale, ROUTES.services)}>
            {home.services.link}
            <ArrowRight aria-hidden />
          </Link>
        </div>
        {/* Les quatre services en photos (25/11/2026, fiche d'Antonino) :
            une grille, sans fond de carte ; l'en-tête ne change pas. */}
        <ServicesGrid locale={locale} services={home.services} />
      </Band>

      <Band id="realisations" className={`rf-section ${accentFont.variable}`}>
        <div className="section-heading home-section-heading">
          {/* Le même en-tête animé que les services : « Nos réalisations »,
              puis « Ce que nous avons » et un mot qui change en boucle
              (25/11/2026). Le lien reste à droite. */}
          <TitreAnime
            prefix={home.work.prefix}
            rotating={home.work.rotating}
            full={home.work.full}
            fullEnd={home.work.fullEnd}
          />
          <Link className="go" href={path(locale, ROUTES.work)}>
            {home.work.link}
            <ArrowRight aria-hidden />
          </Link>
        </div>
        <div className="section-gap-sm">
          <CaseShowcase locale={locale} />
        </div>
      </Band>

      {/* « Notre méthode » : les trois étapes en une seule phrase qui
          s'éclaire au défilement (fiche « 4a » d'Antonino, 25/11/2026). */}
      <MethodeScroll methode={home.methode} className={`${accentFont.variable} ${instrumentFont.variable}`} />

      {/* L'appel final AVANT la FAQ, et plus de fondateurs sur l'accueil :
          ils sont sur À propos (demande d'Antonino, 25/11/2026). */}
      <CtaSection locale={locale} />

      {faq.length > 0 && (
        <Band id="faq" className="rf-section">
          <Lede title={home.faq.title} />
          <div className="section-gap-sm">
            <FaqAccordion items={faq} />
            {/* La page ne se termine pas sans action : le bouton unique du
                site, en lien discret. */}
            <p className="faq-suite">
              {home.faq.more}
              <Link className="go" href={bookingHref(locale)}>
                {ctaLabel[locale]}
                <ArrowRight aria-hidden />
              </Link>
            </p>
          </div>
        </Band>
      )}
    </Shell>
  );
}
