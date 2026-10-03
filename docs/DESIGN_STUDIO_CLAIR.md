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
- Le H1 présente directement la transformation proposée : « Transformez vos opérations avec des solutions IA sur mesure. » Le paragraphe positionne Synode comme partenaire pour concevoir, développer et faire évoluer agents IA, automatisations, intégrations et logiciels métier.
- L’accueil dispose de métadonnées propres, de variantes linguistiques et d’un graphe JSON-LD `WebSite` / `Organization`, sans adresse, téléphone, avis ou certification inventés.

## Alternance claire et sombre, 2 octobre 2026

- L’architecture de l’accueil reste inchangée.
- Le rythme visuel de l’accueil est explicite : hero sombre, usages clair, Solutions bleu très clair, fiabilité claire, méthode sombre, projets clair, FAQ légèrement teintée, CTA final sombre et footer clair.
- Les interfaces animées du hero utilisent des panneaux `#0B192C` et des cartes sombres contrastées afin de rester cohérentes avec le fond bleu nuit du hero.
- Les cartes des six familles utilisent un fond blanc, des bordures bleu gris et des illustrations claires afin de se détacher sobrement du fond bleu très clair de la section Solutions.
- Les sections sombres utilisent des nuances de bleu Synode, des bordures fines et des motifs discrets inspirés de la logique visuelle de Supabase, sans copier sa charte.
- Chaque section possède une intention SEO propre, un `h2` descriptif et un champ lexical adapté. Les expressions locales restent réservées aux endroits où Bruxelles et la Belgique apportent un contexte utile.
- La clarté pour le lecteur reste prioritaire sur la répétition des mots-clés.

### Deux éditions visuelles maintenues

- L’édition principale alterne les bandes : chaque page commence par un hero bleu nuit, puis une section claire, une section sombre, et ainsi de suite.
- La navigation reste bleu nuit sur toute la page afin de prolonger visuellement le hero et de conserver un repère stable au défilement.
- Une édition sombre intégrale utilise les mêmes composants, contenus, routes et règles SEO. Seule la constante `SITE_THEME` diffère entre les branches.
- Toute évolution de contenu, de SEO ou de fonctionnalité doit être reportée dans les deux branches. Les différences entre branches restent limitées au thème et à ses ajustements de contraste.
- Références de direction : impact et crédibilité technique d’Ingram, système de cartes et d’interfaces de Supabase, clarté commerciale et locale d’Intyb. Ne pas recopier leur identité, leurs promesses ni leurs preuves.
- Les grandes surfaces sombres utilisent le token CSS `--surface-dark`, défini dans `src/app/studio.css`, avec la valeur actuelle `#171F2C`. Les fonds de page restent unis, sans dégradé ni halo ; les bleus plus lumineux sont réservés aux actions, liens, icônes et états actifs. Les motifs éventuels restent confinés aux illustrations d’interface.

## Heroes harmonisés et allègement visuel, 3 octobre 2026

### Un seul hero pour six pages

Le hero de l'accueil devient la référence et le seul gabarit. `page-hero.tsx` porte la structure, les six pages principales l'utilisent : Accueil, Solutions, Cas d'usage, Réalisations, Équipe, Contact. Les douze pages détaillées de solutions ne sont pas touchées.

La structure est toujours la même : le titre, centré, pleine largeur de la colonne, puis deux blocs sous lui, texte et actions à gauche, illustration à droite. Le changement de page fait changer le titre, le texte et l'illustration ; il ne fait changer ni la hauteur de départ, ni la taille du H1, ni l'alignement, ni le rythme vertical.

Les déclinaisons locales qui divergeaient ont été supprimées : `use-cases-hero*` et `solutions-intro` n'existent plus, Réalisations, Équipe et Contact n'ont plus un simple `Lede` aligné à gauche. Le hero n'est plus une `Band` : il reste une `<section class="studio-hero">`, ce qui lui conserve sa propre gestion du dégagement de header et laisse l'alternance claire/sombre des bandes suivantes inchangée.

### Illustrations de droite

- Cas d'usage : terminal réduit de 31 à 27 rem, six étapes au lieu de dix, trois systèmes connectés au lieu de cinq, bloc de résumé supprimé et libellés métier rendus visibles. Les trois groupes annoncés dans la demande sont explicites : PROCESS, CONNECTED, CONTROL.
- Solutions : la composition des six familles passe en panneau sombre, cohérente avec les panneaux `#0B192C` du hero de l'accueil et du terminal, et resserrée à 27 rem.
- Réalisations : aperçu du premier projet de la liste, avec son statut réel et son parcours envisagé. Aucune capture inventée.
- Équipe : les deux portraits de `public/equipe`, plus sobres, dans la même case de grille que les autres illustrations.
- Contact : les deux portes d'entrée, de même rang, avec durée, format et fuseau. Aucun créneau annoncé ici ; la réservation reste gérée plus bas dans la page.

Sous 1050 px les illustrations prennent toute la largeur de leur colonne, sous 760 px elles se recentrent et se limitent à 30 rem, sous le bloc de texte.

### Impact opérationnel

Les quatre cards sont remplacées par un bloc éditorial, `impact-rail` : une icône fine, un titre, une phrase, un mot de registre, sur quatre colonnes séparées par un filet d'un cheveu. Deux colonnes sous 900 px, une seule sous 600 px, le filet suivant le pli. La page comptait déjà quatre grilles de cartes ; une cinquième faisait gabarit.

La section et la section Solutions sont toutes deux en `tone="base"`, donc le filet de secours des bandes voisines se posait entre elles et se lisait comme une coupure. Même fond `#f2f6fc`, filet supprimé, respiration réduite plutôt que doublée. Le même composant sert l'accueil et Cas d'usage, où il reste placé après la grille des cas et avant le CTA final.

### Cards Usages et titres de section

Le fond gris neutre `#fafafb` des quatre cards d'usages devient un bleu très pâle `#f4f8fd` avec bordure `#dde7f4`. Hiérarchie, icônes, espacements et layout inchangés.

Les titres de section étaient enfermés dans un bloc à deux tiers dont ils héritaient, et des plafonds en `ch` les resserraient encore. Le bloc prend désormais toute la colonne, le titre reçoit sa propre mesure de 60 % sur desktop, 78 % jusqu'à 1280 px et 100 % sous 900 px ; le paragraphe garde une mesure courte de 68 caractères. La FAQ et les heroes gardent leur composition propre.

### SEO

Un seul H1 par page et aucun saut de niveau sur les douze pages FR et EN : les libellés d'interface des illustrations, qui créaient des sauts H1 → H3 et H2 → H4, sont redevenus du texte courant sans changer d'apparence.

Les H1 de Solutions, Réalisations, Équipe et Contact portent désormais l'intention de la page : solutions IA sur mesure, réalisations IA, projet IA. Les métadonnées, les URL canoniques, les `hreflang`, le sitemap et les données structurées sont inchangés.

### Vérifications

- ESLint, TypeScript et `npm run build` réussis, 44 pages générées.
- Douze pages FR et EN servies en HTTP 200, plus une page détaillée de solution et les mentions légales.
- Structure des heroes contrôlée dans le HTML de production : même classe, même grille, un seul H1, zéro saut de niveau sur les douze pages.
- Terminal, aperçu projet, portraits, portes de contact et `impact-rail` confirmés dans le HTML rendu.
- Contrôle visuel desktop, tablette et mobile restant à faire dans un navigateur : aucun pilote de navigateur n'est installé dans le projet et aucun n'a été ajouté.

### Reste à décider

`team.title`, `team.kicker`, `contact.title`, `contact.kicker` et `work.intro.title`/`kicker` ne sont plus lus : les H1 des heroes sont écrits dans les composants, comme l'étaient déjà ceux de l'accueil et de Cas d'usage. Les clés sont conservées en attendant un arbitrage.

## Heroes internes sobres et nouvelles illustrations, 3 octobre 2026 (second passage)

Correction du passage précédent : le titre centré pleine largeur était devenu la règle des six pages, ce qui donnait à chaque page interne la force visuelle de l'accueil. L'accueil redevient la seule page au hero spectaculaire.

### Deux dispositions dans `page-hero.tsx`

- `feature`, réservée à l'accueil : titre centré au-dessus de la grille, hero suivant la hauteur de la fenêtre. Inchangée.
- `inner`, par défaut, pour Solutions, Cas d'usage, Réalisations, Équipe et Contact : le titre entre dans la colonne de gauche, aligné à gauche, suivi du paragraphe puis des actions ; l'illustration occupe la colonne de droite. H1 ramené à `clamp(2.1rem, 3.2vw, 3rem)`, plus de `min-height` de fenêtre, plus d'inset gauche sur la colonne de texte. Grille `1.08fr / 0.92fr`.
- Sous 760 px : titre, paragraphe, actions, puis illustration, sur une colonne.

### Solutions : nouvelle illustration

Le schéma « six entrées reliées à une carte centrale » est supprimé, avec tout son CSS. À sa place, `SolutionsModules` : six modules de tailles inégales en deux colonnes, la seconde décalée de 1,75 rem vers le bas, sans encadré englobant. Chaque module porte une icône fine, un libellé court, un détail technique en mono et un micro-détail graphique différent selon la brique : lignes, étapes, ports, barres, interrupteur. Les six liens vers les pages de familles sont conservés. Le décalage vertical tombe sous 760 px et avec la réduction des animations.

### Réalisations : l'aperçu descend, la console monte

- L'aperçu de projet en panneau quitte le hero et devient la couverture de la carte Synode Prospect, à la place de l'emplacement de capture en pointillés. Le composant est le même, généralisé pour recevoir son projet en paramètre plutôt que de lire le premier de la liste. `project-cover-placeholder` et son CSS sont supprimés.
- Nouveau hero : `WorkHeroTerminal`, fenêtre macOS `project.synode` avec quatre lignes d'état puis cinq étapes de construction, la dernière encore ouverte. Compact, sans code inutile, proportionné au bloc de texte.

### Accueil : illustration « Facture en retard »

Seule modification sur l'accueil. Le texte de l'exemple de fonctionnement passe de 125 à 100 caractères en FR et de 117 à 101 en EN, par retrait de la fin redondante. Les trois illustrations mesurent désormais 111, 100 et 122 caractères : celle des impayés est la plus courte des trois, son bloc est le plus bas et l'espace intérieur jusqu'au cadre principal est au moins égal à celui des deux autres. Aucun changement de design, de proportions ni d'animation.

### Vérifications

- ESLint, TypeScript et `npm run build` réussis, 44 pages.
- Neuf routes FR et EN servies en HTTP 200.
- `page-hero--inner` présent sur les cinq pages internes et absent de l'accueil, confirmé dans le HTML servi.
- H1 à l'intérieur de `studio-hero-copy` sur les cinq pages internes, et toujours au-dessus de la grille sur l'accueil.
- `solutions-module` et `work-console` présents en FR et EN ; `solutions-composer`, `composer-grid` et `project-cover-placeholder` absents du HTML et du CSS.
- Aperçu de projet confirmé après `project-showcase`, donc dans la carte et non dans le hero.
- Contrôle visuel desktop, tablette et mobile toujours à faire dans un navigateur : aucun pilote n'est installé dans le projet et aucun n'a été ajouté.

## Hauteur des heroes et pages de solutions, 3 octobre 2026 (troisième passage)

### Une seule enveloppe de hero

`page-hero.tsx` sert désormais les onze pages : Solutions, les six familles, Cas d'usage, Réalisations, Équipe et Contact en disposition `inner`, l'accueil en `feature`. Les pages internes reprennent la hauteur de l'accueil, `min(100svh, 48rem)`, avec le contenu centré verticalement dans l'espace restant. La hauteur ne s'applique qu'au-dessus de 960 px : sous ce seuil le hero suit son contenu, comme avant.

Le fond sombre vient du même token `--surface-dark` que l'accueil, via `home-dark-band` et `home-hero-dark`. Aucune couleur nouvelle.

### Les six pages de familles

- Le lien de retour « Toutes nos solutions » est supprimé du corps de page. Celui de la navbar reste, c'est de la navigation.
- Le hero passe par le gabarit commun : titre, définition et deux actions à gauche, illustration à droite.
- La grande card bleue `family-detail-art` est supprimée, CSS compris. Les compositions `BrickVisual` d'origine sont conservées telles quelles, chacune gardant sa personnalité : orbites et jetons pour les agents, chaîne d'étapes pour les automatisations, modules API pour les intégrations, interface pour les logiciels, barres pour la data, session et équipe pour la formation.
- Les éléments sont resserrés : la composition passe de 280 px de haut dans une card de 2 rem de rembourrage à 15,5 rem sans cadre, les orbites de la famille Agents de 180/240/300 px à 150/200/250 px, et la largeur de la colonne est plafonnée à 25 rem.
- Le chapeau « Solutions IA sur mesure » du hero disparaît avec l'ancienne structure. L'expression reste présente trois fois par page dans le corps, la page ne perd donc rien.

### Page Solutions : les six familles en bento

L'accueil garde sa grille régulière, inchangée. Sur Solutions, la classe `family-bento--overview` répartit les surfaces : un module large sur six colonnes de douze qui ouvre la série, en deux colonnes internes avec le texte d'un côté et l'illustration de l'autre, puis deux modules de trois colonnes et trois modules de quatre. Deux colonnes entre 601 et 1100 px, une seule en dessous.

Les six intitulés, contenus, exemples, visuels et liens sont inchangés, et les six liens vers les pages de familles sont vérifiés dans le HTML servi.

### Vérifications

- ESLint, TypeScript et `npm run build` réussis, 44 pages.
- Dix routes FR et EN servies en HTTP 200.
- Un seul H1 et zéro saut de niveau sur douze pages FR et EN contrôlées.
- `page-hero--inner` sur les onze pages internes, absent de l'accueil.
- Les six pages de familles : aucune occurrence de `family-detail-art` ni du lien de retour dans le corps, `family-hero-art` présent, et six `brick-art` distincts.
- `family-bento--overview` présent sur Solutions, absent de l'accueil.
- `family-detail-art` et `family-detail-hero` absents du CSS compilé.

### À valider à l'œil

La hauteur demandée est celle de l'accueil, soit une fenêtre entière à 1366 x 768. Le contenu des pages internes étant plus sobre, il reste de l'espace libre au-dessus et en dessous du bloc centré. C'est le comportement demandé, mais il mérite un regard : si l'espace paraît trop généreux, la valeur à ajuster est le `min-height` de `.page-hero--inner`.

## Trois retouches, 3 octobre 2026

- Encart « Votre difficulté n'apparaît pas ici ? » : fond bleu plein `#0067EA`, texte et bouton en blanc. Il reprend le jeu de jetons de la bande bleue, fond écrit en littéral parce que le bloc redéfinit `--brand` pour ses enfants. Le bouton suit par les jetons, sans règle propre. L'encart étant un composant partagé, le changement vaut pour l'accueil et pour Cas d'usage, en FR comme en EN.
- Cards de services de l'accueil : les numéros 01 à 06 sont retirés. Ce sont six services proposés, sans priorité entre eux, et le numéro laissait croire à un classement. Nouvelle prop `showIndex` sur `SolutionFamilies` ; la page Solutions conserve ses numéros, où l'ordre 01 à 06 est documenté.
- Titre « Quand l'IA s'intègre à vos processus métier » : le mot « processus » passe en bleu, « processes » en anglais. `Lede` accepte une prop `accents` transmise à `renderLines`, qui peint les mots dans la chaîne sans la découper : le titre reste d'un seul tenant pour un lecteur d'écran comme pour un moteur. Aucun autre titre n'est touché.

## Outils, réalisations et hauteur des heros, 3 octobre 2026 (quatrième passage)

### Un outil interactif public

Nouvelle page `/outils/diagnostic-potentiel-ia` (FR et EN) : dix questions sur un processus métier, puis un résultat par famille de solutions. Le calcul est déterministe et tourne dans le navigateur. Aucune réponse n'est envoyée ni enregistrée, aucune adresse email n'est demandée pour voir le résultat, et c'est un argument de la page autant qu'un choix technique.

Cinq dimensions plutôt qu'un score unique : automatisation, intégration, agents, data, et le contrôle humain tenu **hors** du potentiel global. Agents et data sont multiplicatifs : sans documents ni données, la famille ne peut pas obtenir de score de fond. Le code est séparé en données, calcul, textes et interface.

Une section « Outils & Diagnostics IA » le relaie sur l'accueil, juste après Réalisations, sur fond `#f2f6fc`, avec un emplacement annoncé pour les outils suivants.

### Réalisations

La section passe d'une grande carte unique à un sommaire à gauche et un aperçu à droite. Le sommaire donne le domaine puis le nom du projet ; la ligne survolée ou focalisée commande le panneau, et la première est active au chargement. La ligne active porte un fond `#eef4fd`, une barre bleue de 3 px sur son flanc et un bouton sur fond bleu pâle.

L'aperçu montre la vraie capture de Nexus, redimensionnée à 2200 px et servie en WebP. Le bloc de compte de la barre latérale, qui portait le nom et l'adresse email d'Antonino, est recouvert du fond de la barre avant publication ; le fichier source déposé dans `public/demos/` a été supprimé pour la même raison. Le second projet n'existe pas encore : sa ligne ne porte pas de lien et son visuel est un fil de fer de même format, pas une interface floutée.

### Hauteur des heros

Le plafond de `48rem` venait du code d'origine, calé sur un portable 1366 × 768. Sur un MacBook 13 pouces, dont la fenêtre fait environ 815 px, le hero s'arrêtait donc 47 px avant le bas de l'écran. La valeur passe à `56rem` et sort dans un jeton unique, `--hero-min-h`, partagé par le hero d'accueil et celui des pages internes.

### Vérifications

- ESLint, TypeScript et `npm run build` réussis, 46 pages.
- Les cinq scénarios de score du diagnostic donnent les niveaux attendus, du potentiel limité au très élevé, avec les bonnes familles de solutions.
- Un seul H1 et zéro saut de niveau sur les deux versions de la page outil.
- Capture servie contrôlée : aucune barre de défilement sur le bord droit, bloc de compte masqué.
- Contrôle visuel toujours à faire : aucun pilote de navigateur dans le projet, et aucun n'a été ajouté.

### Chantiers ouverts

- Section « Conception & Développement IA » à raccourcir : c'est la méthode, elle pèse plus que son importance sur l'accueil.
- Présentation des réalisations à retravailler : la disposition actuelle ne convainc qu'à moitié.
- D'autres outils interactifs à construire pour l'accueil.
