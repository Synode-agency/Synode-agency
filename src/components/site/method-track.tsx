"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/site/reveal";
import {
  GraphIncreaseIcon,
  LampOutlineIcon,
  ToolsIcon,
  ZoomIcon,
} from "@/components/site/icons";

/* The glyphs live here rather than being handed down from the section: a
   server component cannot pass a function across the client boundary, and a
   React component is a function. */
const STEP_ICONS = [ZoomIcon, LampOutlineIcon, ToolsIcon, GraphIncreaseIcon];

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
 * The track reads itself: a step keeps the panel for three seconds, then
 * hands it to the next, round and round. Pointing at a step, clicking it or
 * reaching it with the keyboard takes the cycle off the visitor's hands,
 * and it starts again three seconds after they let go.
 */
/** How long a step keeps the panel before the next one takes it. */
const STEP_MS = 3000;

/** How long the track waits, after the visitor lets go, before resuming. */
const RESUME_MS = 3000;

export function MethodTrack({
  steps,
  className,
}: {
  steps: readonly Step[];
  className?: string;
}) {
  const [open, setOpen] = useState(0);
  const [auto, setAuto] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Set once, from the first effect: whether this visitor gets the cycle at
     all. Kept in a ref because the handlers below read it without needing
     to re-run when it changes. */
  const mayRun = useRef(false);

  /* The cycle starts when the section reaches the screen, not when the page
     loads. Otherwise it has already been round several times by the moment
     the visitor scrolls down to it, and they land in the middle of some
     step instead of on the first one. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    mayRun.current = true;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAuto(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setOpen((i) => (i + 1) % steps.length),
      STEP_MS,
    );
    return () => clearInterval(id);
  }, [auto, steps.length]);

  useEffect(() => () => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
  }, []);

  /* Pointing at a step, clicking it or reaching it with the keyboard takes
     the cycle off the visitor's hands. Without this the panel would change
     under them in the middle of the sentence they chose to read. */
  const take = useCallback((i: number) => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    setOpen(i);
    setAuto(false);
  }, []);

  /* And it starts again a few seconds after they let go, so the section
     does not stay frozen for the rest of the visit. */
  const release = useCallback(() => {
    if (!mayRun.current) return;
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setAuto(true), RESUME_MS);
  }, []);

  const active = steps[open] ?? steps[0];

  return (
    <div ref={rootRef} className={className}>
      {/* Mobile: the stacked list, every step with its text. */}
      <div className="flex flex-col gap-4 sm:hidden">
        {steps.map((step, i) => {
          const Glyph = STEP_ICONS[i];
          return (
            <Reveal
              key={step.title}
              delay={i * 70}
              className="flex items-start gap-4 rounded-[var(--r-sm)] border border-hairline bg-surface p-5 text-left"
            >
              {Glyph && (
                <span aria-hidden className="track-icon mt-[3px] shrink-0">
                  <Glyph />
                </span>
              )}
              <div>
                <h3 className="text-[length:var(--fs-small)] font-semibold tracking-tight">
                  <span className="track-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[length:var(--fs-label)] leading-[var(--lh-body)] text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div
        className="track-row hidden sm:grid"
        onMouseLeave={release}
        onBlur={release}
      >
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
                onMouseEnter={() => take(i)}
                onFocus={() => take(i)}
                onClick={() => take(i)}
              >
                {Glyph && (
                  <span aria-hidden className="track-icon">
                    <Glyph />
                  </span>
                )}
                <h3 className="track-title font-archivo mt-[18px] text-[length:var(--fs-h4)] font-semibold">
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
