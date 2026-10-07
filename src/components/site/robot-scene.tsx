"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * Le robot qui cherche, comprend et prépare.
 *
 * Une tête au centre, trois mots autour. À chaque étape il regarde vers un
 * mot, une ligne se trace jusqu'à lui, le mot s'allume. Puis la boucle
 * repart.
 *
 * ── Un point à ne pas défaire ───────────────────────────────────────────
 * Tout ce qui bouge à chaque image est écrit DIRECTEMENT dans le DOM par
 * la boucle `requestAnimationFrame`, sans passer par l'état React et sans
 * transition CSS. Soixante rendus par seconde pour une décoration
 * coûteraient plus cher que l'illustration ne rapporte, et une transition
 * CSS sur une valeur réécrite à chaque image se bat contre elle.
 *
 * Les seules transitions CSS portent sur ce qui change RAREMENT : la
 * couleur d'un mot atteint, la coche qui glisse, le halo.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Un second ──────────────────────────────────────────────────────────
 * `prefers-reduced-motion` n'arme aucune boucle : le visuel affiche
 * directement les trois lignes tracées et les trois mots allumés.
 * ────────────────────────────────────────────────────────────────────────
 */

/* La scène, en unités de `viewBox`. Les positions HTML s'y rapportent
   aussi : tout est calculé dans ce repère, puis mis à l'échelle. */
const W = 300;
const H = 260;
const BOT = { x: 150, y: 130 };
const R = 40;

const STEP_MS = 1700;
const SEARCH_MS = 550;
const DRAW_MS = 650;
const HOLD_MS = 800;
const FADE_MS = 500;
const LOOP_MS = 3 * STEP_MS + HOLD_MS + FADE_MS;

type Spot = { x: number; y: number; back: number; eye: [number, number]; lean: number };

const SPOTS: Spot[] = [
  { x: 56, y: 46, back: 34, eye: [-3, -2], lean: -4 },
  { x: 244, y: 46, back: 34, eye: [3, -2], lean: 4 },
  { x: 150, y: 232, back: 20, eye: [0, 2], lean: 0 },
];

const WORDS = {
  fr: ["Rechercher", "Comprendre", "Préparer"],
  en: ["Search", "Understand", "Draft"],
} as const;

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

export function RobotScene({ locale, active }: { locale: Locale; active: boolean }) {
  const words = WORDS[locale === "fr" ? "fr" : "en"];

  const root = useRef<HTMLDivElement | null>(null);
  const bot = useRef<HTMLSpanElement | null>(null);
  const led = useRef<HTMLSpanElement | null>(null);
  const eyes = useRef<(HTMLElement | null)[]>([]);
  const chips = useRef<(HTMLSpanElement | null)[]>([]);
  const dashes = useRef<(SVGLineElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const packs = useRef<(SVGCircleElement | null)[]>([]);
  const ripple = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* L'état final : trois lignes tracées, trois mots allumés. C'est aussi
       ce qu'on affiche quand le mouvement est réduit. */
    const settle = () => {
      SPOTS.forEach((spot, i) => {
        const a = Math.atan2(spot.y - BOT.y, spot.x - BOT.x);
        const x1 = BOT.x + Math.cos(a) * R;
        const y1 = BOT.y + Math.sin(a) * R;
        const x2 = spot.x - Math.cos(a) * spot.back;
        const y2 = spot.y - Math.sin(a) * spot.back;
        [dashes.current[i], lines.current[i]].forEach((ln) => {
          if (!ln) return;
          ln.setAttribute("x1", `${x1}`);
          ln.setAttribute("y1", `${y1}`);
          ln.setAttribute("x2", `${x2}`);
          ln.setAttribute("y2", `${y2}`);
          ln.style.opacity = "1";
        });
        const ln = lines.current[i];
        if (ln) {
          const len = Math.hypot(x2 - x1, y2 - y1);
          ln.style.strokeDasharray = `${len}`;
          ln.style.strokeDashoffset = "0";
        }
        packs.current[i]?.setAttribute("opacity", "0");
        chips.current[i]?.classList.add("is-on");
      });
      if (ripple.current) ripple.current.setAttribute("opacity", "0");
    };

    if (still) {
      settle();
      return;
    }

    let raf = 0;
    let t0 = 0;
    let last = 0;
    let running = false;
    /* La position courante des yeux. Ils ne sautent pas sur leur cible :
       ils la rejoignent en 0,4s, par un rattrapage exponentiel calculé sur
       le temps réellement écoulé entre deux images. Une transition CSS
       n'aurait servi à rien — la valeur est réécrite à chaque image. */
    const eye = { x: 0, y: 0 };

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = (now - t0) % LOOP_MS;
      const k = el.clientWidth / W;

      /* ---- Le robot : flottement, balancement, inclinaison vers sa cible. */
      const step = Math.min(2, Math.floor(t / STEP_MS));
      const inStep = t - step * STEP_MS;
      const working = t < 3 * STEP_MS;
      const searching = working && inStep < SEARCH_MS;

      const floatY = Math.sin(now / 700) * 3;
      const sway = Math.sin(now / 1600) * 3;
      const lean = working ? SPOTS[step].lean : 0;
      if (bot.current) {
        bot.current.style.transform =
          `translate(-50%, -50%) translateY(${floatY * k}px) rotate(${sway + lean}deg)`;
        bot.current.classList.toggle("is-searching", searching);
      }

      /* ---- Les yeux : ils visent, balaient pendant la recherche, clignent. */
      const target = working ? SPOTS[step].eye : [0, 0];
      const dt = last ? Math.min(100, now - last) : 16;
      last = now;
      /* 0,4s pour couvrir l'essentiel de la distance. */
      const catchUp = 1 - Math.exp(-dt / 130);
      eye.x += (target[0] - eye.x) * catchUp;
      eye.y += (target[1] - eye.y) * catchUp;
      const sweep = searching ? Math.sin(now / 90) * 1.2 : 0;
      const blink = (now % 3300) < 120 ? 1 : 5;
      eyes.current.forEach((el2) => {
        if (!el2) return;
        el2.style.transform = `translate(${(eye.x + sweep) * k}px, ${eye.y * k}px)`;
        el2.style.height = `${blink * k}px`;
      });

      /* ---- Le voyant de l'antenne. */
      if (led.current) {
        led.current.style.background = searching || Math.floor(now / 500) % 2 === 0 ? "#0b6be6" : "#9db8f2";
        led.current.style.boxShadow = searching ? "0 0 6px rgb(11 107 230 / 60%)" : "none";
      }

      /* ---- L'onde qui part du robot pendant la recherche. */
      if (ripple.current) {
        if (searching) {
          const p = inStep / SEARCH_MS;
          ripple.current.setAttribute("cx", `${BOT.x}`);
          ripple.current.setAttribute("cy", `${BOT.y + floatY}`);
          ripple.current.setAttribute("r", `${34 + p * 26}`);
          ripple.current.setAttribute("opacity", `${(1 - p) * 0.5}`);
        } else {
          ripple.current.setAttribute("opacity", "0");
        }
      }

      /* ---- Les trois mots, les lignes, les paquets. */
      const fading = t > 3 * STEP_MS + HOLD_MS;
      const fade = fading ? 1 - (t - (3 * STEP_MS + HOLD_MS)) / FADE_MS : 1;

      SPOTS.forEach((spot, i) => {
        /* Chaque mot flotte sur sa propre phase. */
        const wx = Math.sin(now / 1100 + i * 2.1) * 5;
        const wy = Math.cos(now / 1270 + i * 1.7) * 6;
        const chip = chips.current[i];
        if (chip) chip.style.transform = `translate(-50%, -50%) translate(${wx * k}px, ${wy * k}px)`;

        const cx = BOT.x;
        const cy = BOT.y + floatY;
        const tx = spot.x + wx;
        const ty = spot.y + wy;
        const a = Math.atan2(ty - cy, tx - cx);
        const x1 = cx + Math.cos(a) * R;
        const y1 = cy + Math.sin(a) * R;
        const x2 = tx - Math.cos(a) * spot.back;
        const y2 = ty - Math.sin(a) * spot.back;
        const len = Math.hypot(x2 - x1, y2 - y1);

        const started = t >= i * STEP_MS + SEARCH_MS;
        const reached = t >= i * STEP_MS + SEARCH_MS + DRAW_MS;
        const p = reached ? 1 : started ? easeOut((t - (i * STEP_MS + SEARCH_MS)) / DRAW_MS) : 0;

        [dashes.current[i], lines.current[i]].forEach((ln) => {
          if (!ln) return;
          ln.setAttribute("x1", `${x1}`);
          ln.setAttribute("y1", `${y1}`);
          ln.setAttribute("x2", `${x2}`);
          ln.setAttribute("y2", `${y2}`);
        });
        const dash = dashes.current[i];
        if (dash) dash.style.opacity = `${(started ? 1 : 0.55) * fade}`;
        const line = lines.current[i];
        if (line) {
          line.style.strokeDasharray = `${len}`;
          line.style.strokeDashoffset = `${len * (1 - p)}`;
          line.style.opacity = `${fade}`;
        }

        if (chip) chip.classList.toggle("is-on", reached && !fading);
        if (chip) chip.classList.toggle("is-aiming", !reached && working && step === i);

        /* Le petit paquet, une fois la ligne tracée. */
        const pack = packs.current[i];
        if (pack) {
          if (reached && !fading) {
            const q = (((now / 1400) + i * 0.285) % 1);
            pack.setAttribute("cx", `${x1 + (x2 - x1) * q}`);
            pack.setAttribute("cy", `${y1 + (y2 - y1) * q}`);
            pack.setAttribute("opacity", `${Math.sin(q * Math.PI) * 0.9}`);
          } else {
            pack.setAttribute("opacity", "0");
          }
        }
      });

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      t0 = 0;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    /* La boucle ne tourne que si la carte est ouverte ET à l'écran. */
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && active) start();
      else stop();
    }, { threshold: 0.2 });
    io.observe(el);

    if (!active) stop();

    return () => { io.disconnect(); stop(); };
  }, [active]);

  return (
    <div className="rbs" ref={root}>
      <svg className="rbs-wires" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden>
        <circle ref={ripple} r="34" fill="none" stroke="#0b6be6" strokeWidth="1" opacity="0" />
        {SPOTS.map((_, i) => (
          <line key={`d${i}`} ref={(el) => { dashes.current[i] = el; }} stroke="#d6e2fa" strokeWidth="1.5" strokeDasharray="3 4" />
        ))}
        {SPOTS.map((_, i) => (
          <line key={`l${i}`} ref={(el) => { lines.current[i] = el; }} stroke="#0b6be6" strokeWidth="1.5" strokeLinecap="round" />
        ))}
        {SPOTS.map((_, i) => (
          <circle key={`p${i}`} ref={(el) => { packs.current[i] = el; }} r="3" fill="#0b6be6" opacity="0" />
        ))}
      </svg>

      <span className="rbs-bot" ref={bot} aria-hidden>
        <span className="rbs-ant"><i /><span ref={led} /></span>
        <span className="rbs-ear rbs-ear--l" />
        <span className="rbs-ear rbs-ear--r" />
        <span className="rbs-head">
          <i ref={(el) => { eyes.current[0] = el; }} />
          <i ref={(el) => { eyes.current[1] = el; }} />
        </span>
      </span>

      {words.map((word, i) => (
        <span
          key={word}
          ref={(el) => { chips.current[i] = el; }}
          className="rbs-word"
          style={{ left: `${(SPOTS[i].x / W) * 100}%`, top: `${(SPOTS[i].y / H) * 100}%` }}
        >
          <i className="rbs-check" aria-hidden><Check /></i>
          {word}
        </span>
      ))}
    </div>
  );
}
