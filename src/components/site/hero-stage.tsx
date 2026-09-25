import { HeroAppMock } from "@/components/site/hero-app-mock";
import { Reveal } from "@/components/site/reveal";
import type { Locale } from "@/lib/content";

/**
 * Côté droit du hero : le mock du logiciel, seul.
 *
 * Les quatre cartes de service qui l'encadraient ont été retirées — elles
 * répétaient ce que la section Services dit désormais en détail, et le hero
 * n'a pas à vendre quatre choses avant d'avoir dit ce qu'on fait.
 *
 * Le plateau garde son rôle de conteneur de requête : tout ce qui vit dans
 * le mock est dimensionné en `cqw`, donc la composition entière s'échelonne
 * comme une image au lieu de se disloquer aux largeurs intermédiaires.
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
    </div>
  );
}
