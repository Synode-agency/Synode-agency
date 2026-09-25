"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * La durée d'un système : sa séquence interne, plus le temps de lire le
 * résultat avant que le suivant ne passe devant. La séquence elle-même court
 * jusqu'à environ 6,4 s (voir `--app-lead` et les délais du mock).
 */
const SYSTEM_MS = 8200;

/** Le temps que met une carte à glisser par-dessus la précédente. */
const SLIDE_MS = 700;

/**
 * La pile des trois systèmes du hero.
 *
 * Les trois sont empilés, le premier devant, les suivants décalés vers le
 * haut et légèrement réduits — on voit leur bord dépasser, donc on comprend
 * qu'il y en a d'autres avant même que le premier ait fini.
 *
 * Quand une séquence se termine, la carte suivante se soulève, passe devant
 * et joue la sienne ; celle qui vient de jouer repasse au fond de la pile.
 * La rotation ne s'arrête pas, et les trois restent visibles en permanence.
 *
 * Rien ne démarre tant que le hero n'est pas à l'écran. Sur desktop il y est
 * dès le chargement ; sur téléphone, au scroll — on ne rate donc pas la
 * séquence parce qu'elle s'est jouée pendant qu'on lisait le titre.
 */
export function HeroSystems({ children }: { children: ReactNode }) {
  const items = Children.toArray(children);
  const count = items.length;
  const [active, setActive] = useState(0);
  /* Incrémenté à chaque passage. Il sert de clé de remontage : une animation
     CSS terminée ne rejoue pas d'elle-même, et les séquences internes des
     cartes sont réglées pour ne compter qu'un seul tour. Changer la clé
     recrée le mock, donc ses animations repartent de zéro quand il revient
     devant. */
  const [tick, setTick] = useState(0);
  const [started, setStarted] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    /* Sous `prefers-reduced-motion`, la pile ne tourne pas : la première
       carte reste devant, affichée dans son état fini par les règles CSS de
       mouvement réduit, et aucune autre ne vient glisser par-dessus. */
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % count);
      setTick((t) => t + 1);
    }, SYSTEM_MS);
    return () => clearInterval(id);
  }, [started, count]);

  return (
    <div ref={root} className="hero-systems">
      {items.map((child, i) => {
        /* 0 pour la carte de devant, 1 pour celle juste derrière, 2 pour
           celle du fond. Le modulo est ce qui renvoie la carte qui vient de
           jouer tout au fond plutôt que de la faire disparaître : c'est lui,
           et lui seul, qui fait qu'on voit toujours les trois. */
        const depth = (i - active + count) % count;
        return (
          <div
            key={i}
            className="hero-system"
            data-play={i === active ? "true" : "false"}
            /* La toute première carte est déjà devant au chargement : elle
               n'a rien à enjamber, donc elle ne joue pas l'entrée. Aux
               tours suivants, si. */
            data-enter={i === active && tick > 0 ? "true" : "false"}
            style={
              {
                "--depth": depth,
                zIndex: count - depth,
                transitionDuration: `${SLIDE_MS}ms`,
              } as React.CSSProperties
            }
          >
            {/* Le remontage porte sur le contenu, pas sur la carte : celle-ci
                garde son identité, donc sa transition de position continue de
                s'animer au lieu de sauter. */}
            <div key={`${i}-${tick}`} className="hero-system-slot">
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}
