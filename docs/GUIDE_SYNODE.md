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
│   └── README_3_ROADMAP_SYNODE.md
└── prompts/
    └── PROMPT_CLAUDE_CREATION_SITE.md
```

La fiche de référence décrit l’offre. L’architecture décrit les pages et leur contenu. La roadmap sert à organiser votre activité et reste exclue de la mission de réalisation du site. Le prompt explique à Claude comment utiliser les deux premières références dans le projet existant.

## Depuis VS Code ouvert sur Jarvis

Donne cette consigne à Claude :

> Travaille dans `livrables/Site-Web/Synode-agency`. Lis et applique `livrables/Site-Web/Synode-agency/prompts/PROMPT_CLAUDE_CREATION_SITE.md`. Les chemins `docs/` du prompt sont relatifs à ce projet. Lis la fiche de référence et l’architecture, examine le site et son `DESIGN-SYSTEM.md`, puis complète et adapte le site existant. Ignore `README_3_ROADMAP_SYNODE.md` pour cette mission. Préserve les modifications existantes et documente les informations encore manquantes.

## Depuis VS Code ouvert directement sur Synode-agency

> Lis et applique `prompts/PROMPT_CLAUDE_CREATION_SITE.md`. Utilise les deux premières références de `docs/`, examine le site existant et son `DESIGN-SYSTEM.md`, puis adapte le site. La roadmap reste hors périmètre.

## Utilisation quotidienne

Modifie la fiche lorsque l’offre change, l’architecture lorsque les pages changent et la roadmap pour suivre les tâches de lancement. Demande ensuite à Claude de répercuter les changements pertinents sur le site. Ne remplace pas le README technique du projet par l’un de ces documents.

Les documents ont été ajoutés sans modification du code, du design existant, des secrets ou du contexte personnel Jarvis. La création ou adaptation du site sera une étape distincte, lancée avec le prompt.
