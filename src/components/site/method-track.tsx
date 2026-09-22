"use client";

import { useState } from "react";
import { ClipboardList, LineChart, Search, Wrench } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

/* The glyphs live here rather than being handed down from the section: a
   server component cannot pass a function across the client boundary, and a
   React component is a function. */
const STEP_ICONS = [Search, ClipboardList, Wrench, LineChart];

interface Step {
  title: string;
  text: string;
}

/**
 * The four steps of the method.
 *
 * The track itself is unchanged — the glyphs, the number riding beside the
 * title, the long thin arrows running from one glyph to the next. What
 * changed is that the four paragraphs no longer sit under the four titles
 * at once: the step being read carries its text in a panel below the track,
 * and the other three are titles waiting. Four paragraphs shown at once
 * made the section a wall of small print that nobody walks through in
 * order; one at a time gives the row something to do and lets the text be
 * set at a readable size.
 *
 * Pointing at a step is enough to open it, so the whole row can be scanned
 * by moving across it. The click is there for touch, and the keyboard gets
 * the same thing through focus.
 */
export function MethodTrack({
  steps,
  className,
}: {
  steps: readonly Step[];
  className?: string;
}) {
  const [open, setOpen] = useState(0);
  const active = steps[open] ?? steps[0];

  return (
    <div className={className}>
      {/* Mobile: the stacked list, every step with its text. */}
      <div className="flex flex-col gap-4 sm:hidden">
        {steps.map((step, i) => {
          const Glyph = STEP_ICONS[i];
          return (
            <Reveal
              key={step.title}
              delay={i * 70}
              className="flex items-start gap-4 rounded-2xl border border-hairline bg-surface p-5 text-left"
            >
              {Glyph && (
                <span aria-hidden className="track-icon mt-[3px] shrink-0">
                  <Glyph />
                </span>
              )}
              <div>
                <h3 className="text-[0.95rem] font-semibold tracking-tight">
                  <span className="track-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[0.83rem] leading-[1.6] text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="track-row hidden sm:grid">
        {steps.map((step, i) => {
          const Glyph = STEP_ICONS[i];
          return (
            <Reveal
              key={step.title}
              delay={200 + i * 180}
              className="track-node reveal-up"
            >
              {i < steps.length - 1 && (
                <span aria-hidden className="track-arrow" />
              )}

              <button
                type="button"
                className="track-step"
                data-on={i === open}
                aria-expanded={i === open}
                aria-controls="method-detail"
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
              >
                {Glyph && (
                  <span aria-hidden className="track-icon">
                    <Glyph />
                  </span>
                )}
                <h3 className="track-title font-archivo mt-[18px] text-[clamp(18px,1.9vw,21px)] font-semibold">
                  <span className="track-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
              </button>
            </Reveal>
          );
        })}
      </div>

      {/* One panel for the four steps: keyed on the step so it replays its
          entrance each time, which is what makes the change legible. */}
      <div id="method-detail" className="method-detail hidden sm:block">
        <span aria-hidden className="method-detail-rule" />
        <p key={active.title} className="method-detail-text">
          {active.text}
        </p>
      </div>
    </div>
  );
}
