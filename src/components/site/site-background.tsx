"use client";

import { useEffect, useState } from "react";
import Ferrofluid from "@/components/Ferrofluid";

/**
 * The site's single background layer.
 *
 * Mounted once in the root layout and pinned with `position: fixed`, so every
 * page and every section scrolls over the same continuous surface instead of
 * each carrying its own backdrop. Nothing below it is cut into bands.
 *
 * It pauses while the tab is hidden, and renders a static wash instead of the
 * animation under `prefers-reduced-motion`.
 */
export function SiteBackground() {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* Static depth, always present: keeps the page from reading as flat
          navy even when the animation is paused or disabled. */}
      <div className="site-bg-wash absolute inset-0 opacity-45 md:opacity-100" />

      {!reducedMotion && (
        // The shader is scaled to the viewport, so on a phone its bright cores
        // fill a much larger share of the screen than on a desktop and the
        // background reads as lit up. The wrapper below `md` cancels the
        // desktop value back down to the ~0.9% the phone was already at.
        <div className="absolute inset-0 opacity-[0.146] md:opacity-100">
          <Ferrofluid
            paused={paused}
            colors={["#00A8F8", "#00A8F8", "#00A8F8"]}
            speed={0.1}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            rimWidth={0.2}
            sharpness={4}
            shimmer={1.5}
            glow={2}
            flowDirection="down"
            opacity={0.06}
            mouseInteraction={false}
          />
        </div>
      )}

      {/* Fine grain over the whole thing, so gradients never band. */}
      <div className="grain absolute inset-0 opacity-[0.25]" />
    </div>
  );
}
