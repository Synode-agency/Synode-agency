import Image from "next/image";
import type { SiteContent } from "@/content";

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
      {proof.logos.length > 0 && <LogoMarquee logos={proof.logos} />}
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
function LogoMarquee({ logos }: { logos: Home["proof"]["logos"] }) {
  const copies = MARQUEE_REPEAT * 2;
  /* Plus de phrase au-dessus (retirée le 24/11/2026) : seulement les
     logos. Le bandeau garde son nom pour les lecteurs d'écran
     (`aria-label` de la bande, dans `home-page.tsx`). */
  return (
    <div className="logo-marquee">
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
