"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ApproachReveal } from "@/components/site/approach-reveal";

/* Les outils du calcul de l'animation. */
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/* Pour la sortie de la carte et du texte : une courbe douce, qui ne
   traîne pas à la fin (la cubique passait ses derniers 14 % presque
   immobile : du défilement « pour rien »). */
const easeSine = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

/* Le gris des mots pas encore remplis, et le noir qui laisse voir la photo. */
const GRIS = "#E4E7EC";
const NOIR = "#000000";

/* LE CALENDRIER DE LA SCÈNE, en part de la section (0 → 1). La section
   fait 287vh (CSS) : la carte et le texte se posent exactement à la fin
   (1), et la section se libère aussitôt (demande d'Antonino du 24/11/2026 :
   plus aucun défilement une fois la photo en place). */
const ETAPES = {
  mots: [0.028, 0.5], // 1. les mots se remplissent avec la photo
  sortie: [0.583, 1], // 2. la carte et le texte rejoignent leur place
  photoLettres: [0.583, 0.722], // la photo quitte les lettres
  voile: [0.639, 0.806], // le voile blanc s'efface
  carte: [0.611, 0.778], // la carte apparaît
  texteFinal: [0.722, 0.917], // le texte final apparaît
} as const;

/* Quand la scène fixe tourne : ordinateur, mouvement accepté. */
const SCENE = "(min-width: 800px) and (prefers-reduced-motion: no-preference)";

/* La photo, sans zoom : elle remplit son cadre, qui finit aux proportions
   de l'image (la carte la montre alors en entier). */
const COVER = { objectFit: "cover" } as const;

/**
 * LA SECTION « NOTRE APPROCHE » (24/11/2026), avec la photo du bureau.
 *
 * Sur ordinateur, la section reste fixe à l'écran pendant qu'on fait
 * défiler ses 287vh :
 *  1. le paragraphe, en gras et en gris clair, se remplit mot par mot avec
 *     la photo cachée derrière lui ;
 *  2. la sortie : la photo quitte les lettres, qui s'effacent ; une carte
 *     de la photo, déjà à sa petite taille, sort du paragraphe et glisse
 *     vers la gauche ; en même temps, le texte se réduit et part vers la
 *     droite jusqu'à sa taille finale ;
 *  3. la carte à gauche, un peu plus haute que le texte, et le paragraphe
 *     en noir à droite.
 * Tout se rejoue à l'envers en remontant.
 *
 * Le remplissage : la photo est dessous, et par-dessus un calque blanc en
 * `mix-blend-mode: screen` qui porte le texte. Le blanc cache la photo, le
 * noir la laisse voir : un mot passé au noir montre la photo dans ses
 * lettres. `isolation: isolate` garde ce mélange dans la scène.
 *
 * La photo des lettres reste en plein écran et s'efface avec elles. La
 * carte est une seconde image, aux proportions de la photo (elle la
 * montre en entier, sans zoom), un peu plus haute que le texte final :
 * elle part du centre du paragraphe, légèrement réduite, et finit collée
 * à gauche du texte, centrée sur lui en hauteur. Aucun calque sombre sur
 * la photo. `data-tone="dark"` dit à la barre de navigation que la photo
 * est sombre quand elle passe dessous.
 *
 * Sous 800px, ou si le visiteur demande moins de mouvement : une version
 * simple (`approach-simple`), le paragraphe qui passe du gris au noir mot
 * par mot (`ApproachReveal`, figé au noir sans mouvement) et la photo en
 * carte, entière. Sans mouvement et sur ordinateur : photo à gauche, texte
 * à droite.
 *
 * Le grand texte de la scène est décoratif (`aria-hidden`) : les lecteurs
 * d'écran lisent le texte final, une seule fois. Pas d'étiquette visible
 * (retirée le 24/11/2026) : `label` nomme la section pour eux.
 */
export function ApproachScroll({
  label,
  text,
  image,
  alt,
}: {
  label: string;
  text: string;
  image: string;
  alt: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLParagraphElement>(null);
  const finRef = useRef<HTMLDivElement>(null);
  const mots = text.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const photo = photoRef.current;
    const card = cardRef.current;
    const cardImg = card?.querySelector("img");
    const mask = maskRef.current;
    const big = bigRef.current;
    const fin = finRef.current;
    const finText = fin?.querySelector("p");
    if (!section || !sticky || !photo || !card || !cardImg || !mask || !big || !fin || !finText) return;
    const motsEls = Array.from(big.querySelectorAll<HTMLElement>("[data-mot]"));
    const scene = window.matchMedia(SCENE);

    const stepScene = () => {
      const st = sticky.getBoundingClientRect();
      const W = st.width;
      const H = st.height;
      const s = section.getBoundingClientRect();
      const p = clamp(-s.top / (s.height - H));

      // 1. Les mots se remplissent avec la photo.
      const n = Math.round(seg(p, ...ETAPES.mots) * motsEls.length);
      motsEls.forEach((el, i) => (el.style.color = i < n ? NOIR : GRIS));

      // Les repères : la colonne du site, la carte à gauche, le texte à droite.
      const cw = Math.min(1280, W);
      const cl = (W - cw) / 2 + 24;
      const cr = (W - cw) / 2 + cw - 24;
      const split = cl + (cr - cl) * 0.47;
      const gap = Math.min(72, W * 0.05);

      // Le texte final à sa place, et le grand texte, mesurés sans
      // transformation.
      fin.style.transform = "none";
      fin.style.left = `${split + gap}px`;
      fin.style.width = `${Math.max(200, cr - split - gap)}px`;
      fin.style.top = `${(H - fin.offsetHeight) / 2}px`;
      big.style.transform = "none";
      const F = fin.getBoundingClientRect();
      const R = big.getBoundingClientRect();
      // Le rapport des deux tailles de texte (celle du paragraphe final,
      // pas de son conteneur).
      const k = parseFloat(getComputedStyle(finText).fontSize) / parseFloat(getComputedStyle(big).fontSize);

      // 2. La sortie.
      const t = easeSine(seg(p, ...ETAPES.sortie));

      // La photo quitte les lettres, puis le voile blanc et ses lettres
      // s'effacent (sur le fond blanc, sans trace).
      photo.style.opacity = String(1 - ease(seg(p, ...ETAPES.photoLettres)));
      mask.style.opacity = String(1 - ease(seg(p, ...ETAPES.voile)));

      // La carte : un peu plus haute que le texte final, aux proportions de
      // la photo, sans dépasser la colonne de gauche.
      const ratio = cardImg.naturalWidth && cardImg.naturalHeight ? cardImg.naturalWidth / cardImg.naturalHeight : 1205 / 1305;
      let ch = Math.min(F.height * 1.12, H * 0.8);
      let cwid = ch * ratio;
      if (cwid > split - cl) {
        cwid = split - cl;
        ch = cwid / ratio;
      }
      card.style.width = `${cwid}px`;
      card.style.height = `${ch}px`;
      // Elle sort du centre du paragraphe et finit collée à gauche du texte.
      const xStart = R.left - st.left + R.width / 2 - cwid / 2;
      const yStart = R.top - st.top + R.height / 2 - ch / 2;
      const xEnd = split - cwid;
      const yEnd = F.top - st.top + F.height / 2 - ch / 2;
      card.style.opacity = String(ease(seg(p, ...ETAPES.carte)));
      card.style.transform = `translate(${lerp(xStart, xEnd, t)}px, ${lerp(yStart, yEnd, t)}px) scale(${lerp(0.8, 1, t)})`;

      // Le grand texte part vers la droite en se réduisant, vers le texte final.
      big.style.transform = `translate(${(F.left - R.left) * t}px, ${(F.top - R.top) * t}px) scale(${lerp(1, k, t)})`;

      // Le texte final part de la place du grand texte, à sa taille, et se
      // réduit jusqu'à la sienne.
      fin.style.opacity = String(ease(seg(p, ...ETAPES.texteFinal)));
      fin.style.transform = `translate(${(R.left - F.left) * (1 - t)}px, ${(R.top - F.top) * (1 - t)}px) scale(${lerp(1 / k, 1, t)})`;
    };

    let raf = 0;
    const step = () => {
      raf = 0;
      if (scene.matches) stepScene();
    };
    const request = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    step();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("load", request);
    scene.addEventListener("change", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.removeEventListener("load", request);
      scene.removeEventListener("change", request);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="approche" className="approach" aria-label={label}>
      {/* LA SCÈNE FIXE (ordinateur). */}
      <div ref={stickyRef} className="approach-sticky">
        {/* La photo des lettres, en plein écran ; elle s'efface avec elles. */}
        <div ref={photoRef} className="approach-photo" data-tone="dark" aria-hidden="true">
          <Image src={image} alt="" fill sizes="100vw" style={COVER} />
        </div>

        {/* Le calque blanc en mélange « screen », qui porte le texte. */}
        <div ref={maskRef} className="approach-mask">
          <div className="approach-grid">
            <div />
            <p ref={bigRef} className="approach-big" aria-hidden="true">
              {mots.map((m, i) => (
                <span key={i} data-mot="" style={{ color: GRIS }}>
                  {m}{" "}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* La carte : sort du paragraphe et se pose à gauche du texte. */}
        <div ref={cardRef} className="approach-card" data-tone="dark">
          <Image src={image} alt={alt} fill sizes="(max-width: 1280px) 40vw, 520px" style={COVER} />
        </div>

        {/* Le texte final, à droite. */}
        <div ref={finRef} className="approach-final">
          <p className="approach-final-text">{text}</p>
        </div>
      </div>

      {/* LA VERSION SIMPLE (téléphone, ou moins de mouvement). */}
      <div className="approach-simple">
        <div className="approach-simple-text">
          <ApproachReveal text={text} accents={[]} />
        </div>
        <div className="approach-simple-card">
          <Image src={image} alt={alt} fill sizes="(max-width: 799px) 92vw, 46vw" style={COVER} />
        </div>
      </div>
    </section>
  );
}
