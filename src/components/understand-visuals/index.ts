/**
 * Les quatre visuels de la section « Qu'est-ce que… » des pages services.
 *
 * Chacun est posé à même le fond blanc de sa section, sans cadre ni
 * légende, et tous partagent le socle de `scene.tsx` : même repère, même
 * horloge, mêmes outils de tracé. Avant d'en ajouter un cinquième, lire le
 * commentaire d'en-tête de ce socle : il explique pourquoi les textes sont
 * en HTML et pas en `<text>` SVG.
 */
export { SoftwareVisual } from "./software-visual";
export { IntegrationVisual } from "./integration-visual";
export { DataVisual } from "./data-visual";
export { AdoptionVisual } from "./adoption-visual";
