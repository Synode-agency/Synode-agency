import { HeroAppMock } from "@/components/site/hero-app-mock";
import { Reveal } from "@/components/site/reveal";
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
      {/* Reveal sert uniquement de détecteur : il pose data-shown quand le
          mock entre à l'écran. Il n'anime rien par lui-même, le fondu de
          `.reveal` est neutralisé sur ce panneau. C'est ce qui permet au
          mock de jouer ses éléments une seule fois sur téléphone, au
          moment du scroll, au lieu de tourner en boucle. */}
      <Reveal className="hero-stage-panel">
        <HeroAppMock locale={locale} />
      </Reveal>

      <PillarsBand locale={locale} />
    </div>
  );
}
