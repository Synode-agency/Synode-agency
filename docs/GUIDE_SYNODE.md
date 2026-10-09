# Synode : guide des documents

Version du 2 octobre 2026.

Les documents du dossier `docs/` servent à donner un contexte stable à Codex et aux associés avant toute modification du site.

## Organisation

```text
Synode-agency/
├── README.md                         (README technique existant)
├── DESIGN-SYSTEM.md                  (design system historique)
├── src/                              (code existant)
├── docs/
│   ├── README_0_CONTEXTE_CODEX_SYNODE.md
│   ├── README_1_REFERENCE_SYNODE.md
│   ├── README_2_ARCHITECTURE_SITE_SYNODE.md
│   ├── README_3_ROADMAP_SYNODE.md
│   ├── DESIGN_STUDIO_CLAIR.md
│   ├── SITE_A_COMPLETER.md
│   ├── SITE_INSTALLATION.md
│   └── GUIDE_SYNODE.md
└── prompts/
    └── PROMPT_CLAUDE_CREATION_SITE.md   (si présent dans le projet)
```

## Ordre de lecture pour Codex

1. `README_0_CONTEXTE_CODEX_SYNODE.md`
2. `README_1_REFERENCE_SYNODE.md`
3. `README_2_ARCHITECTURE_SITE_SYNODE.md`
4. `DESIGN_STUDIO_CLAIR.md`
5. les fichiers techniques utiles à la tâche

La roadmap sert surtout aux associés et ne doit pas déclencher automatiquement tous les chantiers lorsqu’on demande une simple modification du site.

## Consigne de démarrage recommandée pour Codex

> Travaille dans le projet Synode existant. Commence par lire `docs/README_0_CONTEXTE_CODEX_SYNODE.md`, puis `docs/README_1_REFERENCE_SYNODE.md`, `docs/README_2_ARCHITECTURE_SITE_SYNODE.md` et `docs/DESIGN_STUDIO_CLAIR.md`. Inspecte ensuite le code réel avant de modifier quoi que ce soit. Préserve les composants, la direction visuelle et les sections déjà validées. La présentation actuelle des six familles de Solutions est validée : ne la redesigne pas sans demande explicite. Modifie uniquement ce qui est demandé, garde FR/EN cohérents et vérifie lint, TypeScript, build, responsive et accessibilité lorsque possible. N’invente aucun client, chiffre, tarif, certification ou résultat.

## Rôle de chaque document

- `README_0_CONTEXTE_CODEX_SYNODE.md` : contexte maître, positionnement, priorités, règles Codex et décisions récentes.
- `README_1_REFERENCE_SYNODE.md` : source de vérité commerciale : positionnement, 6 familles, ICP, Build + Run, modèle économique et preuves.
- `README_2_ARCHITECTURE_SITE_SYNODE.md` : pages, ordre des sections, SEO et règles de contenu.
- `README_3_ROADMAP_SYNODE.md` : plan business et opérationnel : site, preuves, prospection, livraison et amélioration.
- `DESIGN_STUDIO_CLAIR.md` : direction visuelle active et notes d’implémentation. Ne pas réécrire l’esthétique sans demande.
- `SITE_A_COMPLETER.md` : checklist des éléments encore manquants avant publication.
- `SITE_INSTALLATION.md` : installation, variables d’environnement et configuration technique. Ne le modifier que si la technique change réellement.

## Décisions récentes à ne pas perdre

- Chaque nouvelle section ou réécriture doit intégrer son intention SEO dès la conception : requête visée, titre descriptif, champ sémantique naturel, maillage interne et, lorsque c’est pertinent, contexte Bruxelles/Belgique. La clarté pour le visiteur reste prioritaire et les répétitions artificielles de mots-clés sont à éviter.
- Positionnement stratégique : **Synode conçoit, intègre et opère des systèmes IA sur mesure pour les PME.**
- Offre publique : **Solutions IA sur mesure**, structurée en six familles.
- Maintenance/monitoring : continuité d’une solution, pas une septième offre.
- ICP prioritaire : PME de services avec emails, documents, CRM, administratif et logiciels déconnectés.
- Différenciation à construire : intégration réelle, contrôle humain, suivi dans le temps, proximité et preuves.
- Accueil validé : Hero → Cas d’usage → Solutions → Fiabilité & contrôle → Méthode → Projets & démos → FAQ → CTA. L’Équipe conserve sa page dédiée.
- Les six cards Solutions actuelles sont validées : ne pas les modifier sans demande explicite.
- Priorité business : **finir → prospecter → vendre → livrer → mesurer → transformer en preuve**.
- Preuves : Synode Prospect + deux démonstrateurs solides + premiers cas clients réels.

## Utilisation quotidienne

- Si le positionnement ou l’offre change : mettre à jour d’abord `README_0` et `README_1`.
- Si la navigation ou les sections changent : mettre à jour `README_2`.
- Si les priorités business changent : mettre à jour `README_3`.
- Si le design change réellement : mettre à jour `DESIGN_STUDIO_CLAIR.md`.
- Si une dépendance, variable ou procédure de déploiement change : mettre à jour `SITE_INSTALLATION.md`.
- Si un élément de production est terminé ou devient manquant : mettre à jour `SITE_A_COMPLETER.md`.

Ne pas remplacer le README technique du projet par ces documents.
