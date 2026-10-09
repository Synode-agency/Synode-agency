/**
 * Les cinq visuels de la bande bleu nuit des pages services.
 *
 * Un par page, choisi par le champ `coreVisual` du contenu — jamais par le
 * slug. Chacun est posé à même le fond de la bande, sans carte, sans cadre
 * et sans légende, et tous partagent le socle de `scene.tsx` : même repère
 * 480 × 320, même horloge, mêmes outils de tracé. Avant d'en ajouter un
 * sixième, lire le commentaire d'en-tête de ce socle.
 *
 * ⚠ Ne pas confondre avec `components/site/solution-visuals.tsx`, qui ne
 * contient que les icônes des familles.
 */
export { FlowVisual } from "./flow-visual";
export { AppVisual } from "./app-visual";
export { LayerVisual } from "./layer-visual";
export { KpiVisual } from "./kpi-visual";
export { TeamsVisual } from "./teams-visual";
