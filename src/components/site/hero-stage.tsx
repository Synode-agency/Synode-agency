import { HeroCardStack } from "@/components/hero-cards";
import type { Locale } from "@/lib/content";

/**
 * La pile des trois cartes, dans le hero.
 *
 * Le plateau ne fait plus que donner sa place à la pile : la mise à
 * l'échelle, l'enchaînement et le contenu des cartes vivent dans
 * `components/hero-cards`. Lire le commentaire d'en-tête de `frame.tsx`
 * avant d'y toucher : les cartes sont dessinées sur une base fixe et
 * rétrécissent d'un bloc, elles ne se replient pas.
 */
export function HeroStage({ locale }: { locale: Locale }) {
  return (
    <div className="hero-stage">
      <div className="hero-stage-panel">
        <HeroCardStack locale={locale} />
      </div>
    </div>
  );
}
