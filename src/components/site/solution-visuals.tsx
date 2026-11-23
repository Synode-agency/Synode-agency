import { Bot, Workflow, Blocks, LayoutDashboard, ChartNoAxesColumnIncreasing, GraduationCap, type LucideIcon } from "lucide-react";

/**
 * LES ICÔNES DES SIX FAMILLES DE SOLUTIONS.
 *
 * Une seule liste, dans l'ordre des familles de `content.ts`, lue par son
 * index `visual`. Les deux menus — celui du bureau et celui du téléphone —
 * s'en servent, et c'est tout ce qui reste de ce fichier.
 *
 * ⚠ Ce fichier portait aussi trois visuels, `EcosystemDiagram`, `BrickVisual`
 * et `ProjectPreview`, qui n'étaient plus importés nulle part depuis une
 * refonte précédente. Ils ont été supprimés le 14/10/2026, avec le CSS qui
 * les servait. Ne pas les réécrire pour « compléter » ce fichier : les
 * visuels du site vivent dans `core-visuals/` et `understand-visuals/`.
 *
 * ⚠ Ne pas confondre avec `components/core-visuals/`, qui porte les scènes
 * de la bande bleu nuit des pages service.
 */
export const brickIcons = [Bot, Workflow, Blocks, LayoutDashboard, ChartNoAxesColumnIncreasing, GraduationCap];

/**
 * L'icône de chaque offre, par SLUG : la MÊME partout où l'offre apparaît,
 * menus, panneaux des solutions et recommandations du diagnostic (décision
 * du 23/11/2026 : les trois endroits en employaient trois jeux différents, et
 * la même icône désignait deux offres). Ce sont celles du menu, `brickIcons`.
 */
export const offerIcons: Record<string, LucideIcon> = {
  "agents-ia": Bot,
  "integrations-systemes-connectes": Blocks,
  "automatisations-intelligentes": Workflow,
  "logiciels-applications-ia": LayoutDashboard,
  "data-intelligence": ChartNoAxesColumnIncreasing,
  "formation-adoption-ia": GraduationCap,
};
