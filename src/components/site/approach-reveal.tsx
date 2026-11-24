"use client";

import { Fragment, useEffect, useRef } from "react";

/* Les trois couleurs de l'effet : le gris de départ, le bleu nuit d'arrivée,
   et le bleu des mots mis en avant (Instrument Serif). */
const GRIS = "#D5D9E0";
const NOIR = "#0B1424";
const BLEU = "#2563EB";

type Morceau = { texte: string; accent: boolean };

/* Un mot (découpé sur les espaces) en morceaux : le mot mis en avant seul,
   sa ponctuation ou son article élidé à part (« l' » + « IA »,
   « outils » + « , »), pour que seul le mot change de police. */
function morceaux(mot: string, accents: readonly string[]): Morceau[] {
  for (const accent of accents) {
    const i = mot.indexOf(accent);
    if (i === -1) continue;
    const avant = mot.slice(0, i);
    const apres = mot.slice(i + accent.length);
    /* Un mot entier : rien avant (ou une apostrophe), pas de lettre après. */
    if ((avant === "" || /['’]$/.test(avant)) && !/^\p{L}/u.test(apres)) {
      return [
        { texte: avant, accent: false },
        { texte: accent, accent: true },
        { texte: apres, accent: false },
      ].filter((m) => m.texte !== "");
    }
  }
  return [{ texte: mot, accent: false }];
}

/**
 * LA PHRASE DE « NOTRE APPROCHE » (24/11/2026) : elle passe du gris au
 * bleu nuit, mot par mot, au défilement, et revient au gris quand on
 * remonte. Les mots mis en avant passent au bleu.
 *
 * Le texte reste du vrai texte : les `<span>` ne changent rien à la
 * lecture ni à la sélection. Le HTML servi a déjà les couleurs finales :
 * sans JavaScript, la phrase est lisible. Le calcul tourne au défilement
 * (une fois par image), au redimensionnement et au chargement ; tout est
 * retiré au démontage. Moins de mouvement demandé : pas d'effet.
 */
export function ApproachReveal({ text, accents }: { text: string; accents: readonly string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const paragraphe = ref.current;
    if (!paragraphe) return;
    const mots = Array.from(paragraphe.querySelectorAll<HTMLElement>(".approach-word"));
    /* (`hasAttribute` : `data-accent` est vide, donc `dataset.accent` vaut
       "" et serait lu comme faux.) */
    const final = (m: HTMLElement) => (m.hasAttribute("data-accent") ? BLEU : NOIR);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mots.forEach((m) => (m.style.color = final(m)));
      return;
    }

    let raf = 0;
    const calculer = () => {
      raf = 0;
      const vh = window.innerHeight;
      const b = paragraphe.getBoundingClientRect();
      const prog = Math.max(0, Math.min(1, (vh * 0.8 - b.top) / (b.height + vh * 0.2)));
      const n = Math.round(prog * mots.length);
      mots.forEach((m, i) => (m.style.color = i < n ? final(m) : GRIS));
    };
    const demander = () => {
      if (!raf) raf = requestAnimationFrame(calculer);
    };

    /* Le premier état sans transition (la page peut s'ouvrir déjà
       défilée), puis les transitions s'allument. */
    calculer();
    const allumer = requestAnimationFrame(() => (paragraphe.dataset.reveal = ""));

    window.addEventListener("scroll", demander, { passive: true });
    window.addEventListener("resize", demander);
    window.addEventListener("load", demander);
    return () => {
      window.removeEventListener("scroll", demander);
      window.removeEventListener("resize", demander);
      window.removeEventListener("load", demander);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(allumer);
    };
  }, []);

  return (
    <p ref={ref} className="approach-text">
      {text.split(" ").map((mot, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          {morceaux(mot, accents).map((m, k) => (
            <span
              key={k}
              className={m.accent ? "approach-word approach-accent" : "approach-word"}
              data-accent={m.accent ? "" : undefined}
            >
              {m.texte}
            </span>
          ))}
        </Fragment>
      ))}
    </p>
  );
}
