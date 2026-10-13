"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight, BarChart3, Blocks, Bot, Check, GraduationCap, LayoutGrid, Link2, Mail,
  Network, type LucideIcon,
} from "lucide-react";
import { path, ROUTES, type Locale } from "@/lib/content";
import { RobotScene } from "@/components/site/robot-scene";

/**
 * Les six solutions, en tranches.
 *
 * Elles sont posées côte à côte comme des dos de livres : l'ouverte prend
 * presque toute la largeur, les cinq autres se resserrent en bandes de
 * 72px où ne restent que l'icône, le numéro et le titre à la verticale.
 *
 * Posé deux fois, sur l'accueil et sur la page Solutions, avec les mêmes
 * données : celles de `content.ts`, qui alimentent déjà les six pages de
 * famille. Aucun texte n'est recopié ici, donc rien ne peut diverger.
 *
 * ── Trois points à ne pas défaire ───────────────────────────────────────
 * 1. La solution 0 est ouverte au premier rendu, côté serveur comme côté
 *    client, et rien ne l'en déloge tant qu'on ne survole pas le bloc.
 * 2. Le contenu de la tranche ouverte porte une `min-width` égale à sa
 *    largeur finale, MESURÉE. Sans elle, le texte se recompose pendant que
 *    la tranche s'ouvre et la carte tremble pendant 0,65s.
 * 3. `prefers-reduced-motion` ARRÊTE les visuels et supprime la transition
 *    de largeur. Le survol continue de fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 */

const TICK_MS = 700;
const TICKS = 4;
/** En dessous, les tranches s'empilent au lieu de s'aligner. */
const SIDE_BY_SIDE = 930;
const RAIL = 72;
const GAP = 10;

const ICONS: LucideIcon[] = [Bot, Blocks, LayoutGrid, Network, BarChart3, GraduationCap];

type Item = {
  slug: string;
  title: string;
  text: string;
  benefit: string;
  example: string;
};

/* Quatre intitulés prennent l'article, deux ne le supportent pas :
   « Découvrez les Data & Intelligence » ne se dit pas. */
const NO_ARTICLE = new Set(["data-intelligence", "formation-adoption-ia"]);

const num = (i: number) => String(i + 1).padStart(2, "0");

/** Les six mini-visuels. `tick` vaut 0 à 3 et repart à chaque ouverture. */
function Visual({ kind, tick, fr, active }: { kind: number; tick: number; fr: boolean; active: boolean }) {
  if (kind === 0) {
    /* La scène du robot a sa propre boucle, en `requestAnimationFrame` :
       le `tick` partagé par les cinq autres visuels avance par paliers de
       700ms, bien trop grossier pour un mouvement continu. */
    return <RobotScene locale={fr ? "fr" : "en"} active={active} />;
  }
  if (kind === 1) {
    /* L'enveloppe entre, le lien relie, la coche valide : les trois carrés
       disent le trajet d'une information d'un outil à l'autre. */
    const glyphs = [Mail, Link2, Check];
    return (
      <div className="slc-art slc-art--flow" aria-hidden>
        {glyphs.map((Glyph, i) => (
          <span key={i} className="slc-flow-part">
            {i > 0 && <i className={tick > i - 1 ? "slc-flow-link is-on" : "slc-flow-link"} />}
            <b className={`${tick > i ? "is-on" : ""}${i === 2 && tick >= 3 ? " is-full" : ""}`}>
              <Glyph />
            </b>
          </span>
        ))}
      </div>
    );
  }
  if (kind === 2) {
    const w = [72, 54, 88];
    return (
      <div className="slc-art slc-art--app" aria-hidden>
        <span className="slc-app-bar" />
        <div className="slc-app-body">
          <span className="slc-app-side"><i /><i /><i /></span>
          <div className="slc-app-main">
            <span className="slc-app-tiles"><i /><i /><i /></span>
            {w.map((v, i) => (
              <i key={i} className="slc-app-line" style={{ width: `${tick > i ? v : 30}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === 3) {
    const labels = ["CRM", "API", "ERP", "Email"];
    return (
      <div className="slc-art slc-art--grid">
        {labels.map((l, i) => <span key={l} className={tick === i ? "is-on" : undefined}>{l}</span>)}
        <i className="slc-grid-core" aria-hidden />
      </div>
    );
  }
  if (kind === 4) {
    const a = [38, 62, 46, 78, 55, 70, 88];
    const b = [55, 44, 70, 52, 82, 60, 74];
    const h = tick % 2 === 0 ? a : b;
    return (
      <div className="slc-art slc-art--data">
        <div className="slc-data-bars" aria-hidden>
          {h.map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}
        </div>
        <span>{fr ? "Vos données, une vue claire" : "Your data, one clear view"}</span>
      </div>
    );
  }
  const words = fr ? ["Comprendre", "Pratiquer", "Adopter"] : ["Understand", "Practise", "Adopt"];
  return (
    <div className="slc-art slc-art--learn">
      <div className="slc-learn-box">
        <GraduationCap aria-hidden />
        <p>
          {words.map((word, i) => (
            <span key={word} className={tick > i ? (tick === i + 1 ? "is-now" : "is-on") : undefined}>
              {i > 0 && <em aria-hidden> · </em>}
              {word}
            </span>
          ))}
        </p>
      </div>
      <span className={tick >= 3 ? "slc-learn-go is-on" : "slc-learn-go"}>
        ✓ {fr ? "À vous de jouer" : "Your turn"}
      </span>
    </div>
  );
}

export function SolutionSlices({ items, locale }: { items: readonly Item[]; locale: Locale }) {
  const fr = locale === "fr";
  const box = useRef<HTMLDivElement | null>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  /* La première tranche est ouverte, et elle le reste tant que personne ne
     survole le bloc. Il n'y a PAS de défilement automatique : une carte qui
     s'ouvre et se ferme toute seule attire l'œil sans qu'on l'ait demandé,
     et le visiteur perd la tranche qu'il était en train de lire. */
  const [open, setOpen] = useState(0);
  const [tick, setTick] = useState(TICKS - 1);
  /* Mesurées, jamais devinées : la largeur du conteneur décide de la
     disposition, et celle de la tranche ouverte fige son contenu. */
  const [width, setWidth] = useState(0);
  /* Le bloc est-il à l'écran ? Le cycle des visuels n'a aucune raison de
     tourner pendant qu'on lit le bas de la page. */
  const [onScreen, setOnScreen] = useState(false);
  /* La hauteur commune des six tranches sur téléphone. Mesurée, pour la
     même raison que la largeur : la devinée, c'est ce qui laissait un vide
     sous le lien. Voir le commentaire de l'effet qui la calcule. */
  const [openH, setOpenH] = useState(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    /* Le même élément, donc le même effet : poser une seconde ref sur le
       bloc demanderait de les fusionner pour rien. */
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.1 });
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  /* ---- LA HAUTEUR COMMUNE DES SIX TRANCHES, SUR TÉLÉPHONE.
     Sur deux colonnes, la hauteur est celle du bloc, 560px, et la tranche
     ouverte la remplit. Empilée, il n'y a plus de bloc à remplir : la
     hauteur était donc posée à la main, 600px sous 520px de large. Un
     chiffre écrit à la main doit tenir le cas le plus défavorable, le
     téléphone le plus étroit et la solution au texte le plus long, et il
     laissait donc partout ailleurs un vide que `margin-top: auto` renvoyait
     soit au milieu de la tranche, soit sous le lien.

     Elle est maintenant MESURÉE : la plus haute des six décide, et les six
     la prennent. Le vide tombe à zéro sur celle-là, et se réduit sur les
     cinq autres à leur seule différence de texte, qu'aucun réglage ne peut
     supprimer à hauteur égale.

     Trois points qui expliquent la forme de ce code :

     1. Les six contenus sont TOUS dans le document, y compris ceux des
        tranches fermées : la bande de 72px les masque par `overflow`, elle
        ne les retire pas. Ils sont donc déjà composés à la bonne largeur et
        se mesurent sans rien déplacer.

     2. La hauteur naturelle ne se lit pas sur la tranche ouverte, dont le
        contenu est ÉTIRÉ par le `margin-top: auto` du bloc exemple. La
        marge est donc neutralisée le temps de la lecture, puis rendue. Le
        bas du dernier élément, lu depuis la carte, donne la hauteur du
        contenu quelle que soit celle de la boîte.

     3. Sous 520px seulement, là où la colonne visuelle est masquée. Au
        dessus, elle passe sur une seconde ligne de la grille, et sa
        position dépend de l'étirement qu'on vient de neutraliser : la
        mesure s'y mordrait la queue. Cette bande garde donc une hauteur
        écrite, et le média est celui de la feuille de style, au pixel. ---- */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 520px)");
    let raf = 0;
    const apply = () => {
      if (!mq.matches) { setOpenH(0); return; }
      let tallest = 0;
      for (const card of cards.current) {
        const open = card?.querySelector<HTMLElement>(".slc-open");
        const copy = card?.querySelector<HTMLElement>(".slc-copy");
        const example = card?.querySelector<HTMLElement>(".slc-example");
        const last = copy?.lastElementChild as HTMLElement | null;
        if (!open || !example || !last) continue;
        const saved = example.style.marginTop;
        example.style.marginTop = "0";
        const bottom = last.offsetTop + last.offsetHeight;
        example.style.marginTop = saved;
        /* `offsetTop` part du bord intérieur de la carte, et la hauteur
           posée est une hauteur de BORDURE À BORDURE — `box-sizing` est
           global. Le filet de la carte s'ajoute donc aux deux bouts, sans
           quoi il manquerait deux pixels et la carte, qui coupe ce qui
           dépasse, mangerait le bas du lien. */
        const cs = window.getComputedStyle(card as HTMLElement);
        const frame = (parseFloat(cs.borderTopWidth) || 0) + (parseFloat(cs.borderBottomWidth) || 0);
        const pad = parseFloat(window.getComputedStyle(open).paddingBottom) || 0;
        tallest = Math.max(tallest, bottom + pad + frame);
      }
      if (tallest > 0) setOpenH(Math.ceil(tallest));
    };
    /* À l'image suivante : la mesure lit la mise en page, elle ne doit pas
       la lire au milieu du rendu qui vient de la changer. */
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply); };
    schedule();
    /* Les polices arrivent après : sans ce second passage, la hauteur reste
       celle de la police de secours, plus étroite d'un cran. */
    document.fonts?.ready.then(schedule).catch(() => {});
    mq.addEventListener("change", schedule);
    return () => { cancelAnimationFrame(raf); mq.removeEventListener("change", schedule); };
  }, [width, items]);

  /* Le cycle des visuels. Il repart de zéro à chaque ouverture : l'effet
     dépend de `open`, donc il se remonte, et son compteur local repart
     avec lui. Le `queueMicrotask` est là pour la remise à zéro — la règle
     de lint du projet interdit d'appeler `setState` en direct dans un
     effet, et c'est le seul endroit qui en aurait besoin. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!onScreen) return;
    queueMicrotask(() => setTick(0));
    let t = 0;
    const id = window.setInterval(() => {
      t = (t + 1) % TICKS;
      setTick(t);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [open, onScreen]);

  const onKey = useCallback((e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + items.length) % items.length;
    setOpen(next);
    cards.current[next]?.focus();
  }, [items.length]);

  const stacked = width > 0 && width < SIDE_BY_SIDE;
  /* La colonne visuelle disparaît quand la tranche ouverte descend sous
     680px : à deux colonnes dans moins que ça, le texte tombait à trois
     mots par ligne. Le calcul se fait ici et non en `@container` — une
     requête de conteneur se serait réévaluée PENDANT l'ouverture, et le
     visuel aurait clignoté au milieu de l'animation. */
  const showVisual = stacked || width === 0 || width - 5 * (RAIL + GAP) >= 680;
  const openWidth = stacked || width === 0
    ? undefined
    : Math.max(0, width - (items.length - 1) * RAIL - (items.length - 1) * GAP);

  return (
    <div ref={box} className={stacked ? "slc slc--stacked" : "slc"}>
      {items.map((item, i) => {
        const Icon = ICONS[i] ?? Bot;
        const on = i === open;
        return (
          <div
            key={item.slug}
            ref={(el) => { cards.current[i] = el; }}
            className={on ? "slc-card is-on" : "slc-card"}
            style={on && openH ? { flexBasis: openH } : undefined}
            tabIndex={0}
            aria-expanded={on}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {/* La bande fermée : icône, numéro, titre à la verticale. */}
            <span className="slc-rail" aria-hidden={on}>
              <span className="slc-rail-icon"><Icon aria-hidden /></span>
              <em>{num(i)}</em>
              <b>{item.title}</b>
            </span>

            <div className="slc-open" aria-hidden={!on} style={openWidth ? { minWidth: openWidth } : undefined}>
              <div className="slc-copy">
                <div className="slc-copy-top">
                  <span className="slc-copy-icon"><Icon aria-hidden /></span>
                  <em>{num(i)} / {num(items.length - 1)}</em>
                </div>
                <h3>{item.title}</h3>
                <p className="slc-text">{item.text}</p>
                <p className="slc-benefit">{item.benefit}</p>

                <div className="slc-example">
                  <span>{fr ? "Exemple possible" : "Possible example"}</span>
                  <p>{item.example}</p>
                </div>

                <Link
                  className="slc-link"
                  href={`${path(locale, ROUTES.solutions)}/${item.slug}`}
                  tabIndex={on ? 0 : -1}
                >
                  {fr ? `Découvrez ${NO_ARTICLE.has(item.slug) ? "" : "les "}${item.title}` : `Discover ${item.title}`}
                  <ArrowUpRight aria-hidden />
                </Link>
              </div>

              {showVisual && (
                <div className="slc-visual">
                  <Visual kind={i} tick={tick} fr={fr} active={on} />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
