import { HeroAppMock } from "@/components/site/hero-app-mock";
import { PillarsBand } from "@/components/sections/pillars-band";
import type { Locale } from "@/lib/content";

/**
 * Right-hand side of the hero: the product mock with the four service
 * cards overlapping its corners.
 *
 * The stage keeps the exact aspect ratio of the source design and places
 * everything in percentages of it, so the whole composition scales as one
 * image instead of drifting apart at intermediate widths. Below `lg` the
 * absolute placement is dropped and the mock stacks above a plain 2x2 grid
 * of the cards.
 */
export function HeroStage({ locale }: { locale: Locale }) {
  return (
    <div className="hero-stage">
      <div className="hero-stage-panel">
        <HeroAppMock locale={locale} />
      </div>

      <PillarsBand locale={locale} />
    </div>
  );
}
