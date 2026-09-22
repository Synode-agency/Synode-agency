"use client";

import { Bot, Code2, Smartphone, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { useWorks } from "@/components/site/works-context";

interface Category {
  id: string;
  label: string;
  icon: string;
  /** One line on what this kind of project actually is. */
  note: string;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = { Bot, Code2, Smartphone };

/**
 * A drawing per domain, bleeding off the right edge of the open pane.
 *
 * Not decoration picked at random: each one is the shape of the thing it
 * stands for — a graph of agents passing work along, a stack of panes for a
 * tool built to order, a screen and a handset for the web. They are drawn
 * in the domain's own ink at low opacity, so they read as a watermark and
 * never fight the words in front of them.
 */
const MOTIFS: Record<string, React.ReactNode> = {
  automation: (
    <>
      <path d="M14 66 L46 34 M46 34 L86 34 M86 34 L118 66 M46 34 L46 96 M46 96 L86 96 M86 96 L118 66" />
      <circle cx="14" cy="66" r="7" />
      <circle cx="46" cy="34" r="7" />
      <circle cx="86" cy="34" r="7" />
      <circle cx="46" cy="96" r="7" />
      <circle cx="86" cy="96" r="7" />
      <circle cx="118" cy="66" r="10" />
    </>
  ),
  software: (
    <>
      <rect x="10" y="22" width="86" height="58" rx="8" />
      <rect x="26" y="40" width="86" height="58" rx="8" />
      <path d="M42 58 h54 M42 74 h34" />
    </>
  ),
  web: (
    <>
      <rect x="6" y="20" width="92" height="66" rx="7" />
      <path d="M6 38 h92 M18 29 h10" />
      <rect x="80" y="48" width="42" height="66" rx="8" />
      <path d="M94 104 h14" />
    </>
  ),
};

/**
 * The three domains, in the right-hand column of the Réalisations hero.
 *
 * A stack that opens rather than three equal buttons: the domain being
 * shown takes the room, wearing its own colour, its sentence and its
 * drawing, while the other two fall back to slim rows. The hierarchy is
 * then impossible to misread — one is open, two are waiting — and the whole
 * block moves when the visitor picks another one.
 */
export function WorksTabs({
  categories,
  counts,
  countLabel,
}: {
  categories: readonly Category[];
  counts: Record<string, number>;
  countLabel: string;
}) {
  const { category, setCategory } = useWorks();

  return (
    /* Not a tablist: ARIA tabs must sit next to the panel they control and
       answer to the arrow keys, while these three live in the hero and drive
       a gallery a screen further down. Plain pressed buttons say the same
       thing without lying about the structure. */
    <div className="works-deck">
      {categories.map((c, i) => {
        const Glyph = CATEGORY_ICONS[c.icon] ?? Bot;
        const isOn = c.id === category;
        return (
          <Reveal
            key={c.id}
            delay={700 + i * 160}
            className="works-tab-in reveal-right"
          >
            <button
              type="button"
              aria-pressed={isOn}
              onClick={() => setCategory(c.id)}
              className="works-deck-card"
              data-on={isOn}
              data-ink={i}
            >
              <span aria-hidden className="works-deck-edge" />

              <svg
                aria-hidden
                className="works-deck-motif"
                viewBox="0 0 128 128"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {MOTIFS[c.id]}
              </svg>

              <span className="works-deck-head">
                <span className="works-deck-tile" aria-hidden>
                  <Glyph />
                </span>
                <b className="works-deck-label">{c.label}</b>
                <i aria-hidden className="works-deck-index">
                  {String(i + 1).padStart(2, "0")}
                </i>
              </span>

              {/* Rows of 0fr to 1fr: the pane opens to whatever its own copy
                  needs, without a height measured in JS. */}
              <span className="works-deck-fold">
                <span className="works-deck-fold-inner">
                  <span className="works-deck-note">{c.note}</span>
                  <span className="works-deck-count">
                    {String(counts[c.id] ?? 0).padStart(2, "0")} {countLabel}
                  </span>
                </span>
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}
