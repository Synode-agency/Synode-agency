# Synode : guide des documents dans Jarvis

Les documents sont installés dans le projet existant :
`/Users/antoninolobianco/Documents/Claude/jarvis-starter-kit/livrables/Site-Web/Synode-agency`

## Organisation

```text
Synode-agency/
├── README.md                         (existant, conservé)
├── DESIGN-SYSTEM.md                  (existant, à respecter)
├── src/                              (code existant)
├── docs/
│   ├── GUIDE_SYNODE.md
│   ├── README_1_REFERENCE_SYNODE.md
│   ├── README_2_ARCHITECTURE_SITE_SYNODE.md
│   ├── README_3_ROADMAP_SYNODE.md
│   ├── SITE_A_COMPLETER.md
│   ├── SITE_INSTALLATION.md
│   └── DESIGN_STUDIO_CLAIR.md
└── prompts/
    └── PROMPT_CLAUDE_CREATION_SITE.md
```

Mise à jour du 29 septembre 2026 : la fiche de référence décrit les six familles de solutions IA sur mesure. L’architecture décrit les pages et leur contenu. La roadmap sert à organiser votre activité et reste exclue de la mission de réalisation du site. Le prompt explique à Claude comment utiliser les deux premières références dans le projet existant.

## Depuis VS Code ouvert sur Jarvis

Donne cette consigne à Claude :

> Travaille dans `livrables/Site-Web/Synode-agency`. Lis et applique `livrables/Site-Web/Synode-agency/prompts/PROMPT_CLAUDE_CREATION_SITE.md`. Les chemins `docs/` du prompt sont relatifs à ce projet. Lis la fiche de référence et l’architecture, examine le site et son `DESIGN-SYSTEM.md`, puis adapte uniquement les parties devenues incohérentes avec les six familles de solutions. Préserve l’architecture, les composants et le design clair actuel inspiré de Supabase, décrit dans `docs/DESIGN_STUDIO_CLAIR.md`. Ignore `README_3_ROADMAP_SYNODE.md` pour cette mission. Préserve les modifications existantes et documente les informations encore manquantes.

## Depuis VS Code ouvert directement sur Synode-agency

> Lis et applique `prompts/PROMPT_CLAUDE_CREATION_SITE.md`. Utilise les deux premières références de `docs/`, examine le site existant et son `DESIGN-SYSTEM.md`, puis adapte uniquement l’offre et les contenus concernés. Préserve l’architecture, les composants et le style actuel de `docs/DESIGN_STUDIO_CLAIR.md`. La roadmap reste hors périmètre.

## Utilisation quotidienne

Modifie la fiche lorsque l’offre change, l’architecture lorsque les pages changent et la roadmap pour suivre les tâches de lancement. Demande ensuite à Claude de répercuter les changements pertinents sur le site. Ne remplace pas le README technique du projet par l’un de ces documents.

Les documents ont été ajoutés sans modification du code, du design existant, des secrets ou du contexte personnel Jarvis. La création ou adaptation du site sera une étape distincte, lancée avec le prompt.

## Références et périmètre

- `README_1_REFERENCE_SYNODE.md` : six familles, cibles, méthode et modèle économique.
- `README_2_ARCHITECTURE_SITE_SYNODE.md` : ordre des contenus et cartes de Solutions, sans refonte de l’architecture technique.
- `README_3_ROADMAP_SYNODE.md` : suivi interne ; les tâches d’adaptation du site restent à réaliser et ne lancent pas les autres chantiers.
- `SITE_A_COMPLETER.md` : checklist de l’offre et prérequis de publication.
- `SITE_INSTALLATION.md` : lancement, configuration et emplacements réels des contenus.
- `DESIGN_STUDIO_CLAIR.md` : référence visuelle active ; conserver les couleurs et la police effectivement utilisées.
- `../prompts/PROMPT_CLAUDE_CREATION_SITE.md` : malgré son nom historique, demande désormais une mise à jour ciblée du site existant.

Pour l’offre, la référence du 29 septembre remplace les anciennes mentions d’une offre unique décrite seulement par des briques ou quatre badges. Les quatre domaines restent utiles aux cas d’usage ; les six familles présentent les solutions. Les notes historiques du README technique et du design ne doivent pas rétablir l’ancienne offre. Les cartes restent asymétriques, de tailles variées dans un ensemble cohérent ; les prix restent non publics, sur devis personnalisé.

Cette intervention actualise la documentation uniquement. Elle n’atteste ni de l’intégration des six cartes dans le code ni de la validation du site en production.
