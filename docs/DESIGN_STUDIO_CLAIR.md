# Direction active : studio clair

Proposition réalisée à la demande d’Antonino sur `proposition/palette-bleu-encre`.

## Intentions

La capture de Supabase sert de référence pour le rythme, les filets discrets et la place donnée aux illustrations techniques. La palette Synode reste claire : blanc, gris et bleu `#0067EA`, texte `#464444`.

- Police système : Helvetica Neue, Helvetica, puis Arial. Aucun téléchargement de police.
- Largeur maximale : 1240 px, marges latérales adaptatives.
- Hero ouvert sur fond blanc. Les trois systèmes animés existants restent présents, avec leurs composants et leur rotation automatique conservés.
- Quatre cartes de cas d’usage avec un parcours simplifié, liées aux fiches existantes.
- Une carte d’offre commune à l’accueil et à Solutions, avec quatre badges de domaines : ventes, opérations, service client, outils métier et connaissance interne.
- Ces badges ne sont ni des forfaits ni des offres distinctes. Les briques techniques sont expliquées séparément dans Solutions.
- CTA final conservé en carte, sur fond bleu très clair.
- Navigation, pied de page, boutons et typographie harmonisés sur les autres pages.

## Sources dans le code

- `src/app/studio.css` : direction active, chargée après `globals.css`. Les styles des illustrations restent dans le fichier historique.
- `src/app/site-shell.tsx` : famille typographique et import des styles.
- `src/components/site/home-page.tsx` : composition et textes de l’accueil FR/EN.
- `src/components/site/offer-card.tsx` : offre partagée FR/EN.
- `src/components/site/solutions-page.tsx` : contenu détaillé et offre.

Les textes spécifiques à cette proposition sont dans les composants, les contenus métier existants restent dans `src/lib/content.ts` et `src/lib/use-cases.ts`.

## Adaptation

Sous 760 px, hero, offre, cas d’usage, méthode et FAQ passent sur une colonne. Les badges peuvent revenir à la ligne. L’illustration conserve une hauteur suffisante pour ses cartes internes. Les liens gardent les styles de focus existants et les mouvements respectent la préférence de réduction des animations.

## Vérifications

- ESLint et TypeScript : réussis.
- Compilation de production avec `npm run build -- --webpack` : réussie, 32 pages générées.
- Accueil et carte d’offre vérifiés visuellement sur ordinateur dans le serveur existant, port 3000.
- Contrôle visuel mobile restant à faire dans un navigateur disponible. Les règles responsive sont implémentées, mais ne remplacent pas cette vérification.
- Le premier build Turbopack est resté sans résultat et a été interrompu ; la compilation Webpack a ensuite réussi.

Cette proposition ne configure pas les services de contact et ne constitue pas une mise en production. Les prérequis de `SITE_A_COMPLETER.md` restent applicables.
