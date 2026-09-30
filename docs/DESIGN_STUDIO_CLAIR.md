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
- CTA final conservé en carte, désormais sur fond bleu nuit avec deux colonnes.
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

## Ajustements après revue

- Navigation : conteneur commun `.site-page` pour donner à Next une cible de défilement stable, déclaration `data-scroll-behavior="smooth"` requise avec Next 16, conservation de l’état de navigation lors du changement d’ancre.
- Espace FR/EN et réservation : 12 px ajoutés au gap initial.
- Hero : suppression des deux mentions, astérisque sur la note du premier échange.
- Cas d’usage : deuxième ligne du titre en bleu et quatre miniatures distinctes (fiche prospect, boîte mail triée, brouillon de réponse, recherche documentaire).
- Notre solution : fond bleu pleine largeur, titres blancs et bleu clair, carte d’offre conservée en blanc.
- CTA : texte à gauche, réservation à droite, note sur deux lignes. `Booking` accepte un chemin d’événement ou une URL publique Cal.com/Cal.eu dans `NEXT_PUBLIC_CAL_LINK` et charge le calendrier au clic. En l’absence de lien, l’interface indique explicitement que la réservation est à venir ; aucune disponibilité fictive n’est proposée.
- Footer : pictogramme S rétabli via le même logo que la navbar.

Référence pour l’intégration : [calendrier intégré Cal.com](https://cal.com/embed). Le parcours de réservation réel reste à vérifier avec le lien public de l’événement.


## Enrichissement graphique du 28 septembre 2026

- Parcours en labels centrés sous les miniatures des quatre cas d’usage.
- Schéma de l’offre reconstruit en HTML/SVG : cinq outils reliés au véritable logo S de Synode, puis deux résultats. Illustration partagée par l’accueil et Solutions, disponible en FR/EN.
- CTA de l’accueil et de Solutions sur fond bleu nuit. Solutions présente un aperçu graphique du projet dans la colonne droite.
- Briques techniques de Solutions présentées en grille de cartes sur une section bleu nuit, avec cinq illustrations distinctes.
- Livrables accompagnés d’un visuel de documentation ; dimensionnement et facturation enrichis d’icônes et d’accents bleus.
- Composants graphiques : `src/components/site/solution-visuals.tsx`. Les systèmes animés de la hero restent conservés.
- Vérifications de cette itération : ESLint, TypeScript, compilation Webpack et contrôle des espaces Git réussis ; page Solutions servie en HTTP 200 et nouveau contenu confirmé dans l’arbre d’accessibilité du navigateur.
- Vérification visuelle finale ordinateur et mobile à compléter : la capture Chrome est restée figée sur un ancien rendu, puis l’outil a signalé qu’aucune fenêtre n’était disponible. Les adaptations responsive sont implémentées.


## Six familles : grille du 29 septembre 2026

- Accueil et Solutions utilisent désormais `solution-families.tsx`, avec les six familles de la référence commerciale et les contenus FR/EN de `content.ts`.
- Grille composée sur quatre colonnes : 01 et 06 occupent deux colonnes ; 02 à 05 une colonne. Passage à deux colonnes, puis une colonne sous 600 px, dans l’ordre 01 à 06.
- Chaque carte contient une définition, un bénéfice recherché, un exemple illustratif et un visuel. Formation & Adoption IA dispose de sa propre illustration. Les correspondances des visuels sont explicites dans les contenus.
- L’accueil renvoie vers les six ancres de Solutions. La carte générale avec le schéma Synode reste présente sur Solutions.
- Cette itération porte sur les deux grilles. Le prompt plus large (pages détaillées, menu et hero) reste à traiter séparément selon le périmètre confirmé.
- ESLint, TypeScript et build Webpack réussis. Les HTML de production des quatre pages FR/EN contiennent les six cartes et leurs six visuels dans le bon ordre ; les six liens de l’accueil trouvent leurs ancres.
- Grille Solutions contrôlée visuellement sur ordinateur dans Chrome. Contrôle visuel mobile non effectué : interaction interrompue car la fenêtre était utilisée.


## Architecture simplifiée et familles détaillées, 29 septembre 2026

Cette demande remplace la grille asymétrique précédente : les six familles ont désormais le même poids visuel, en grille de trois colonnes, deux puis une. Les illustrations restent distinctes, avec une surface identique.

- Menu : Accueil, Solutions (six pages + vue d’ensemble), Réalisations, Équipe, Contact ; CTA vers `/contact#reservation`.
- Douze pages détaillées FR/EN générées avec un gabarit partagé, du contenu spécifique et des parcours illustratifs. Les URLs suivent l’architecture documentée.
- Accueil : méthode en six étapes, aperçu de Synode Prospect réel et retrait des sections FAQ et équipe du parcours d’accueil selon le dernier ordre demandé. Les FAQ restent sur Solutions et les pages détaillées.
- Bandeau : mise en couleur progressive des libellés, sans déplacement de mise en page ; statique avec réduction des animations.
- Hero : hauteur minimale de fenêtre pour les formats portables, incluant le dégagement du header fixe. Largeur du contenu toujours limitée au conteneur existant ; pas de hauteur fixe qui coupe le contenu.
- Vérifications : typage, lint, build, douze routes, liens locaux et ancres, métadonnées, langues, sitemap et redirections 308. Rendu ordinateur de la navbar et ouverture du menu observés dans Chrome. Les essais clavier et multi-viewport ont été interrompus par les interactions simultanées dans Chrome ; ResponsivelyApp n’était pas autorisé par l’outil de contrôle. Aucun viewport précis ni MacBook physique n’est déclaré validé. Recette restante dans `SITE_A_COMPLETER.md`.


## Solutions, Réalisations, Équipe et Contact : revue complémentaire

- Solutions : ancien encadré « Une offre. Votre solution. » remplacé par un hero ouvert « Six familles. Votre solution à composer. », accompagné d’une composition graphique des six familles, chacune liée à sa page. L’ancienne illustration est conservée dans les sources mais n’est plus affichée ici.
- Réalisations : grande composition avec emplacement explicite pour une capture, fond bleu nuit quadrillé et texte éditorial. `WorkItem.image` accepte une capture réelle future ; aucun projet n’est ajouté artificiellement.
- Équipe : portraits du dossier `public/equipe` et contenus des cofondateurs repris de https://synode-agency.vercel.app/equipe à la demande d’Antonino. Les contenus anglais sont adaptés avec les mêmes rôles.
- Contact : aperçu de calendrier interactif quand Cal.com n’est pas configuré. Toute sélection est annoncée comme fictive et ne crée aucun rendez-vous. L’intégration réelle existante reste prioritaire dès qu’un lien valide est fourni.
- Vérifications : ESLint, TypeScript, build Webpack, huit pages FR/EN (hero, portraits, placeholder et calendrier), liens et ancres. Les quatre pages FR ont été contrôlées visuellement sur ordinateur. La sélection d’une date et d’une heure de démonstration a été testée dans Chrome. Le contrôle visuel mobile reste à réaliser.


## Clarté, confiance et suivi : ajustements du 30 septembre 2026

- Accueil : textes des quatre cas d’usage simplifiés, Réalisations placée avant la méthode, puis ajout des sections Fiabilité & contrôle, Équipe et FAQ avant le CTA.
- Les quatre cartes de confiance restent conditionnelles au projet : aucune certification, garantie absolue ou localisation d’hébergement n’est inventée.
- Solutions : ajout d’un exemple compact combinant agent IA, CRM, automatisation et tableau de bord, puis d’une section exploitation, maintenance et monitoring applicable aux six familles.
- Le modèle économique sépare création, paiement récurrent et évolutions importantes sur devis. L’exploitation n’est pas une septième famille.
- Synode Prospect : parcours envisagé visible sur l’accueil, la liste et la fiche détaillée ; le statut « outil interne · en construction » et l’emplacement de capture restent explicites.
- Styles ajoutés dans `src/app/studio.css`, sans nouvelle dépendance et avec passages à deux puis une colonne sur les petites largeurs.


## Accueil et SEO local : structure validée

- Ordre final : Hero, L’IA dans votre quotidien, Solutions IA, Fiabilité & contrôle, Du premier échange à l’usage, Quelques projets & démos, FAQ, CTA.
- L’aperçu Équipe est retiré de l’accueil ; la page Équipe et son entrée de navbar sont conservées.
- Le surtitre des six familles devient « Solutions IA ». La section Réalisations devient « Quelques projets & démos » tout en conservant le lien « Voir toutes nos réalisations ».
- Les textes français ciblent naturellement les solutions IA sur mesure, le développement d’agents IA, l’automatisation des PME et les logiciels IA sur mesure à Bruxelles et en Belgique. L’anglais conserve le même positionnement pour Brussels et Belgium.
- Le H1 reste volontairement plus large : « Simplifiez votre activité avec l’IA. Vous gardez le contrôle. » Les expressions locales et techniques restent dans le titre SEO, le paragraphe du hero et les sections spécialisées.
- L’accueil dispose de métadonnées propres, de variantes linguistiques et d’un graphe JSON-LD `WebSite` / `Organization`, sans adresse, téléphone, avis ou certification inventés.
