import { HeroAppMock } from "@/components/site/hero-app-mock";
import { HeroSystems } from "@/components/site/hero-systems";
import { getContent, type Locale } from "@/lib/content";

/**
 * Côté droit du hero : la pile des trois systèmes Synode.
 *
 * Le plateau garde son rôle de conteneur de requête : tout ce qui vit dans
 * un mock est dimensionné en `cqw`, donc la composition entière s'échelonne
 * comme une image au lieu de se disloquer aux largeurs intermédiaires.
 *
 * Le contenu est lu ici, côté serveur, et les trois mocks sont passés en
 * enfants au pilote. Celui-ci est le seul morceau client : il ne connaît
 * que le nombre de cartes et l'ordre, pas leur contenu, donc aucune copie ne
 * part dans le paquet JavaScript.
 */
export function HeroStage({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <div className="hero-stage">
      <div className="hero-stage-panel">
        <HeroSystems>
          {hero.systems.map((system, i) => (
            <HeroAppMock key={system.id} system={system} index={i} />
          ))}
        </HeroSystems>
      </div>
    </div>
  );
}
