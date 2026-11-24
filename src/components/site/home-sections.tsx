import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Copy, FileSpreadsheet } from "lucide-react";
import { serviceHref, type Locale, type SiteContent } from "@/content";

/*
 * LES PETITS COMPOSANTS DES PAGES DE LA REFONTE (brief, section 5).
 * Chacun ne reçoit que ses textes, tirés de `src/content/`. Leurs styles
 * sont dans `src/app/refonte.css`.
 */

type Home = SiteContent["home"];

/**
 * LA PREUVE (`ProofStrip`), au bas du hero.
 *
 * Le bandeau défilant des logos des clients, puis la note et la citation si
 * elles existent. Rien n'est inventé (brief,
 * règle 8) : sans logo dans le contenu, pas de bandeau.
 */
export function ProofStrip({ proof }: { proof: Home["proof"] }) {
  const hasQuote = proof.quote.text.trim() !== "";
  return (
    <div className="proof-strip">
      {proof.logos.length > 0 && <LogoMarquee label={proof.logosLabel} accent={proof.logosAccent} logos={proof.logos} />}
      {proof.rating.trim() !== "" && <p className="proof-rating">{proof.rating}</p>}
      {hasQuote && (
        <figure className="proof-quote">
          <blockquote>{proof.quote.text}</blockquote>
          {proof.quote.author && <figcaption>{proof.quote.author}</figcaption>}
        </figure>
      )}
    </div>
  );
}

/* Combien de fois la liste est répétée dans une moitié du bandeau : assez
   pour dépasser la largeur de l'écran avec peu de logos. */
const MARQUEE_REPEAT = 2;

/**
 * LE BANDEAU DÉFILANT DES LOGOS (24/11/2026).
 *
 * La piste porte deux moitiés identiques et glisse d'une moitié : la boucle
 * ne se voit pas. Seule la première série est annoncée aux lecteurs
 * d'écran ; les copies sont masquées. Le défilement continue au survol
 * (choix d'Antonino) ; il n'a pas lieu sous `prefers-reduced-motion` :
 * les logos sont alors posés une seule fois.
 */
function LogoMarquee({ label, accent, logos }: { label: string; accent: string; logos: Home["proof"]["logos"] }) {
  const copies = MARQUEE_REPEAT * 2;
  /* Le mot mis en avant (« confiance ») dans sa propre police. */
  const at = accent ? label.indexOf(accent) : -1;
  return (
    <div className="logo-marquee">
      <p className="logo-marquee-label">
        {at === -1 ? (
          label
        ) : (
          <>
            {label.slice(0, at)}
            <span className="logo-marquee-accent">{accent}</span>
            {label.slice(at + accent.length)}
          </>
        )}
      </p>
      <div className="logo-marquee-viewport">
        <ul className="logo-marquee-track">
          {Array.from({ length: copies }).flatMap((_, copy) =>
            logos.map((logo) => (
              <li key={`${copy}-${logo.src}`} aria-hidden={copy > 0 ? true : undefined}>
                <Image
                  src={logo.src}
                  alt={copy > 0 ? "" : logo.alt}
                  width={logo.width}
                  height={logo.height}
                  style={{ height: logo.display, width: "auto" }}
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}

/* Une icône par situation, dans l'ordre du brief : la ressaisie, le temps,
   les chiffres dans Excel. */
const PROBLEM_ICONS = [Copy, Clock, FileSpreadsheet];

/** LES TROIS SITUATIONS (`ProblemList`) : le problème du client avant nous. */
export function ProblemList({ items }: { items: Home["problems"]["items"] }) {
  return (
    <ul className="problem-list">
      {items.map((item, i) => {
        const Icon = PROBLEM_ICONS[i % PROBLEM_ICONS.length];
        return (
          <li key={item.strong}>
            <span className="problem-icon" aria-hidden>
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
  );
}

/**
 * LES TROIS SERVICES (`ServiceCards`) : un titre, une phrase, un lien vers
 * leur bloc de la page Services.
 */
export function ServiceCards({ locale, services }: { locale: Locale; services: Home["services"] }) {
  return (
    <div className="tile-grid tile-grid--3 service-cards">
      {services.items.map((item) => (
        <div key={item.key} className="tile">
          <h3 className="tile-title">{item.title}</h3>
          <p className="tile-text">{item.text}</p>
          <Link className="go" href={serviceHref(locale, item.key)}>
            {services.more}
            {/* Trois « En savoir plus » à la suite ne disent rien à un
                lecteur d'écran : il entend aussi le service. */}
            <span className="sr-only"> : {item.title}</span>
            <ArrowRight aria-hidden />
          </Link>
        </div>
      ))}
    </div>
  );
}

/**
 * LES TROIS ÉTAPES (`Steps`), les mêmes partout (brief, 6.1 et 6.4).
 * Numérotées : c'est une vraie séquence.
 */
export function Steps({ steps }: { steps: SiteContent["site"]["steps"] }) {
  return (
    <ol className="steps-list">
      {steps.items.map((step, i) => (
        <li key={step.title}>
          <span className="steps-rank" aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p>
            <strong>{step.title}</strong> {step.text}
          </p>
        </li>
      ))}
    </ol>
  );
}

/**
 * LES FONDATEURS EN BREF (`Founders`, version de l'accueil) : la photo, le
 * nom, le rôle. Le portrait complet est sur À propos.
 */
export function Founders({ people }: { people: SiteContent["about"]["founders"]["people"] }) {
  return (
    <ul className="founders-list">
      {people.map((person) => (
        <li key={person.last}>
          <span className="founders-photo">
            <Image src={person.photo} alt="" fill sizes="96px" />
          </span>
          <span className="founders-text">
            <strong>
              {person.first} {person.last}
            </strong>
            <span>{person.role}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
