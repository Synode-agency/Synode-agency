import { existsSync } from "node:fs";
import { join } from "node:path";
import { Fragment, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { AppelProjet } from "@/components/site/appel-projet";
import { ApproachScroll } from "@/components/site/approach-scroll";
import { MethodeScroll } from "@/components/site/methode-scroll";
import { SectionNuit } from "@/components/site/section-nuit";
import { ServicesSplit } from "@/components/site/services-split";
import { TitreAnime } from "@/components/site/titre-anime";
import { getContent, includedAnchor, serviceAnchor, type Locale } from "@/content";
import { ctaLabel } from "@/content/cta";
import { bookingHref } from "@/lib/routes";
import { sansVeuve } from "@/lib/sans-veuve";
import m from "./services-page.module.css";

/* Une ligne du titre du hero, avec son mot en couleur (`.title-accent`). */
function ligneTitre(ligne: string, accents: readonly string[]): ReactNode[] {
  const motif = new RegExp(`(${accents.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return ligne
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

/* Un texte sur deux lignes (le nom d'un service). */
function deuxLignes(lignes: readonly string[]): ReactNode {
  return lignes.map((ligne, i) => (
    <Fragment key={i}>
      {i > 0 ? <br /> : null}
      {ligne}
    </Fragment>
  ));
}

/**
 * LA PAGE SERVICES, REFAITE LE 27/11/2026 (fiche d'Antonino), sur le
 * design system de l'accueil, dont elle reprend les composants :
 *
 * 1. le hero bleu nuit texturé : le titre, la phrase et la barre des
 *    quatre services, qui mène à chacun ;
 * 2. « Notre approche », centrée, sans photos (`ApproachScroll`) ;
 * 3. les quatre services, à côté d'une photo qui reste à l'écran
 *    (`ServicesSplit`), sous l'en-tête animé de l'accueil (`TitreAnime`) ;
 * 4. D'UN SEUL FOND BLEU NUIT, comme « Notre méthode » et l'appel final de
 *    l'accueil (`SectionNuit`, le calque fixe : aucune ligne entre les
 *    sections) : « Inclus dans chaque projet », le chiffrage (le composant
 *    de « Notre méthode ») et l'appel final de l'accueil ;
 * 5. la FAQ de l'accueil, blanche, qui coupe le bleu nuit d'une ligne nette.
 *
 * Tous les textes viennent de `src/content/{fr,en}/services.ts` ; l'appel
 * final, de l'accueil (les mêmes textes).
 */
export function ServicesPage({ locale }: { locale: Locale }) {
  const { services: s, home } = getContent(locale);
  const faq = s.faq.items.filter((item) => item.a.trim() !== "");
  const items = s.items.map((item) => ({ ...item, anchor: serviceAnchor(locale, item.key) }));

  return (
    <Shell locale={locale}>
      {/* 1. LE HERO : le fond et le titre de celui de l'accueil, aligné à
          gauche, la lueur en haut à gauche ; ses lignes arrivent comme
          celles de l'accueil, la phrase et la barre en fondu ensuite
          (`refonte.css`). */}
      <section id="top" className="services-hero">
        <div className="col services-hero-col">
          {/* Le titre et la phrase, centrés dans la place au-dessus de la
              barre (comme ceux de l'accueil) ; alignés à gauche sur
              téléphone. */}
          <div className="services-hero-copie">
            <h1 className="services-hero-titre">
              {s.hero.title.split("\n").map((ligne, i) => (
                <Fragment key={ligne}>
                  {i > 0 ? " " : null}
                  <span className={`hero-title-line hero-title-line--${i + 1}`}>
                    {ligne.split("|").map((morceau, j) => (
                      <Fragment key={j}>
                        {j > 0 ? (
                          <>
                            {" "}
                            <br className="hero-title-br" />
                          </>
                        ) : null}
                        {ligneTitre(morceau, s.hero.accents)}
                      </Fragment>
                    ))}
                  </span>
                </Fragment>
              ))}
            </h1>
            <p className="services-hero-texte">{sansVeuve(s.hero.subtitle)}</p>
          </div>
          {/* La barre des quatre services, qui termine le hero : une colonne
              par service, chacune mène à son bloc plus bas. */}
          <nav className="services-barre" aria-label={s.hero.tilesLabel}>
            <ul>
              {items.map((item) => (
                <li key={item.key}>
                  <a href={`#${item.anchor}`}>
                    <span className="services-barre-nom">{deuxLignes(item.name)}</span>
                    <span className="services-barre-bas">
                      <span className="services-barre-ligne">{item.line}</span>
                      <span className="services-barre-fleche" aria-hidden="true">
                        <ArrowDown />
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* 2. NOTRE APPROCHE, centrée, sans photos. */}
      <ApproachScroll label={s.approach.label} text={s.approach.text} accents={s.approach.accents} centre />

      {/* 3. LES QUATRE SERVICES. L'identifiant `services` est celui de la
          section des services de l'accueil : même en-tête, mêmes règles. */}
      <Band id="services" className="rf-section svp-clair">
        <div className="section-heading home-section-heading">
          <TitreAnime prefix={s.list.prefix} rotating={s.list.rotating} full={s.list.full} fullEnd={s.list.fullEnd} />
          <p className="section-etiquette">{s.list.etiquette}</p>
        </div>
        <ServicesSplit items={items} labels={s.list.labels} button={s.list.button} />
      </Band>

      {/* 4a. INCLUS DANS CHAQUE PROJET : ici commence le bleu nuit, qui va
          jusqu'à l'appel final. Le bas des services bascule avec lui. */}
      <Band id={includedAnchor(locale)} className={`rf-section svp-clair svp-inclus ${m.inclus}`}>
        <SectionNuit aussi="#services, #etapes, #appel" />
        <div className={m.entete}>
          <h2 className={m.titre}>
            {s.included.title} <em>{s.included.accent}</em>
          </h2>
          <p className={m.texte}>{sansVeuve(s.included.text)}</p>
        </div>
        <ul className={m.cartes} data-rv-groupe="bottom">
          {s.included.items.map((item) => (
            <li key={item.title} className={m.carte}>
              {/* Les quatre photos « Inclus » (27/11/2026, fournies par
                  Antonino et passées au ton bleu nuit de celles des
                  services), dans `public/images/services/`. Si un fichier
                  manque, un bloc bleu nuit tient sa place. */}
              <div className={m.photo} aria-hidden="true">
                {existsSync(join(process.cwd(), "public", item.image)) ? (
                  <Image src={item.image} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 24vw" />
                ) : null}
              </div>
              <div className={m.carteTexte}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className={m.recurrent}>
          {s.included.recurring.before}
          <em>{s.included.recurring.accent}</em>
          {sansVeuve(s.included.recurring.after)}
        </p>
      </Band>

      {/* 4b. COMMENT NOUS CHIFFRONS : le composant de « Notre méthode »,
          dans le bleu nuit posé au-dessus (`nuit={false}`). */}
      <MethodeScroll methode={s.pricing} nuit={false} />

      {/* 4c. L'APPEL FINAL DE L'ACCUEIL, dans le même bleu nuit, avec sa
          propre question, tournée vers les services (27/11/2026, demande
          d'Antonino) ; le champ et ses exemples restent ceux de l'accueil. */}
      <AppelProjet locale={locale} appel={{ ...home.appel, ...s.appel }} />

      {/* 5. LA FAQ DE L'ACCUEIL. */}
      {faq.length > 0 && (
        <Band id="faq" className="rf-section">
          <div data-rv-bloc="left">
            <Lede title={s.faq.title} accents={[s.faq.accent]} />
          </div>
          <div className="section-gap-sm">
            <FaqAccordion items={faq} apparition="left" />
            <p className="faq-suite">
              {s.faq.more}
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
