# Prompt pour Claude : Mettre à jour l’offre du site Synode existant

Copier le contenu à partir de « Ta mission » dans Claude, depuis le projet ouvert dans VS Code. Le nom de ce fichier est conservé pour les liens existants.

## Ta mission

Adapte le site Synode existant à notre nouvelle présentation de l’offre. **Ne reconstruis pas le site. Adapte l’offre, crée les six pages de familles demandées, ajoute le menu déroulant Solutions et ajuste le hero de l’accueil selon les consignes ci-dessous.** Préserve autant que possible l’architecture, les routes, les composants, les fonctionnalités et le style actuels. Tout ce qui reste cohérent doit être conservé.

Le projet est `livrables/Site-Web/Synode-agency` depuis la racine Jarvis. Les chemins ci-dessous sont relatifs à ce projet. Travaille dans ce dépôt, sans créer une autre application.

## 1. Lire et examiner avant toute modification

Lis les consignes du dépôt et les documents existants, notamment :

1. `docs/README_1_REFERENCE_SYNODE.md` : référence commerciale des six familles.
2. `docs/README_2_ARCHITECTURE_SITE_SYNODE.md` : présentation et parcours attendus.
3. `docs/DESIGN_STUDIO_CLAIR.md` et `DESIGN-SYSTEM.md` : direction visuelle active et historique.
4. `docs/SITE_A_COMPLETER.md` et `docs/SITE_INSTALLATION.md` : état des prérequis et configuration existante.

Pour l’offre, la référence du 29 septembre 2026 remplace les anciennes descriptions par une offre unique et quelques briques. Pour le design, conserve la direction claire actuellement appliquée ; ne restaure pas les règles historiques sur une autre police, un hero en carte ou un desktop figé.

Examine l’état des modifications locales, les contenus FR/EN, les composants et les styles réellement chargés. Préserve le travail en cours. Indique brièvement les fichiers concernés puis réalise les ajustements ciblés. Ne lance aucune tâche commerciale, CRM, facturation ou prospection de la roadmap ; elle reste un outil de suivi interne.

### Nouvelle demande prioritaire

Les précisions de ce prompt remplacent les anciennes consignes qui interdisaient six pages de solutions ou toute modification de la navigation. Le périmètre comprend désormais une page générale Solutions, six pages détaillées et un menu déroulant dédié. Conserver le reste de l’architecture. Il y a **six familles partout**, y compris sur l’accueil et la page générale ; la mention de « cinq familles » dans la demande initiale était une coquille.

## 2. Positionnement à conserver

**Des solutions IA sur mesure, conçues autour de votre activité.**

Synode conçoit et développe des solutions pour indépendants, TPE et PME. Nous partons du problème, des processus, des outils, des données, des contraintes et des équipes du client. Une solution peut combiner plusieurs familles ; ce ne sont pas six forfaits standardisés.

- Aucun prix public ; échange découverte gratuit, puis devis personnalisé.
- Premier échange de 30 minutes, sans engagement ; aucun audit technique exhaustif promis gratuitement.
- Modèle économique : création + coûts récurrents d’exploitation, monitoring et maintenance selon contrat + évolutions importantes sur devis.
- CTA principal conservé : « Réserver un échange gratuit ».
- Ton français clair, concret et accessible. Aucune promesse de gains garantis.
- SmartBE, statut des associés et Synode Prospect : conserver les informations confirmées dans les références, sans inventer de statut juridique, de client ni de preuve.

## 3. Présenter les six familles

| Famille | Ce que nous pouvons concevoir | Exemple de besoin |
| --- | --- | --- |
| 01 Agents IA | Assistants documentaires avec sources, copilotes métier, agents vocaux et agents capables d’exécuter des actions encadrées | Retrouver une information, préparer une réponse ou qualifier une demande |
| 02 Automatisations intelligentes | Workflows, tri d’emails, extraction de documents, traitement administratif et circuits de validation | Transformer des documents reçus en données vérifiées et exploitables |
| 03 Logiciels & Applications IA sur mesure | Logiciels métier internes, interfaces sur mesure et fonctionnalités ou produits IA destinés aux clients de l’entreprise | Centraliser une activité ou intégrer un copilote dans un produit |
| 04 Intégrations & systèmes connectés | Connexions entre API, CRM, ERP, outils existants et bases de données | Synchroniser les informations et limiter les doubles saisies |
| 05 Data & Intelligence | Centralisation, tableaux de bord, recherche sémantique, analyse, prévision, scoring et recommandation | Comprendre l’activité et éclairer les décisions à partir des données disponibles |
| 06 Formation & Adoption IA | Formation aux usages de l’IA, ateliers métier et prise en main des solutions Synode | Aider les équipes à utiliser l’IA de façon utile et adaptée à leur travail |

Formation & Adoption IA couvre les usages généraux et la prise en main des solutions Synode. Logiciels & Applications IA couvre les outils internes et les produits destinés aux clients de l’entreprise. Data & Intelligence inclut analyse, prévision, scoring et recommandation selon la qualité des données et la faisabilité. Les exemples sont des possibilités à cadrer, pas des produits déjà disponibles.

Exploitation, monitoring et maintenance accompagnent les solutions selon contrat ; ne crée pas une septième carte commerciale. Les quatre domaines ventes, opérations, service client et outils/connaissance restent des repères pour les cas d’usage, pas un substitut aux six familles.

## 4. Modifications ciblées attendues

### Page Solutions

Remplace « Ce qu’une solution peut contenir », « Ce que la solution peut réunir » et les formulations équivalentes par une présentation claire : **« Nos solutions IA sur mesure »**. Réutilise la grille de cartes actuelle pour afficher les six familles dans l’ordre 01 à 06, avec titre, définition simple, bénéfice court, exemple concret, visuel adapté et lien vers la page détaillée de la famille. Le visiteur doit comprendre ce que signifie chaque catégorie sans connaître le vocabulaire technique.

Garde la carte de présentation générale si elle reste utile et ajuste son texte. Conserve les sections livrables, dimensionnement, modèle économique, FAQ et CTA lorsqu’elles sont cohérentes. Ajoute les six pages détaillées ci-dessous. Ne crée pas de forfaits tarifaires.

### Six pages détaillées, une par famille

La page `/solutions` reste la vue d’ensemble. Chaque famille possède également une vraie page, accessible directement par son URL, depuis sa carte sur l’accueil et Solutions, et depuis le menu déroulant. Réutilise un gabarit commun avec du contenu propre à chaque famille, sans créer six pages qui répètent les mêmes généralités.

Routes proposées, à adapter aux conventions existantes sans casser les URL actuelles :

| Famille | Route FR |
| --- | --- |
| Agents IA | `/solutions/agents-ia` |
| Automatisations intelligentes | `/solutions/automatisations-intelligentes` |
| Logiciels & Applications IA sur mesure | `/solutions/logiciels-applications-ia` |
| Intégrations & systèmes connectés | `/solutions/integrations-systemes-connectes` |
| Data & Intelligence | `/solutions/data-intelligence` |
| Formation & Adoption IA | `/solutions/formation-adoption-ia` |

Prévoir leurs équivalents EN selon le routage bilingue existant, les titres et descriptions propres à chaque page, ainsi que les liens de changement de langue et le sitemap correspondants.

Chaque page doit expliquer :

1. **Ce que c’est**, avec une définition simple, immédiatement compréhensible par un indépendant ou dirigeant de PME.
2. **À quoi cela sert**, les problèmes concernés et les personnes qui l’utilisent.
3. **Ce que Synode peut proposer**, avec plusieurs possibilités concrètes de cette famille, à cadrer selon les besoins.
4. **Un cas concret développé**, présenté comme une situation de départ → un fonctionnement en quelques étapes → un résultat attendu. Montrer les outils, informations et interventions humaines concernés. Ajouter deux exemples plus courts pour illustrer d’autres usages.
5. **Les prérequis et limites utiles**, tels que les données disponibles, la connexion aux outils ou la validation humaine, sans jargon ni promesse d’autonomie totale.
6. **Comment cela s’intègre à l’activité**, y compris les liens vers une ou deux familles complémentaires lorsque c’est pertinent.
7. **Une FAQ propre à la famille** et un CTA pour décrire son besoin ou réserver l’échange gratuit. Aucun prix public.

Repères pédagogiques et scénarios à développer :

| Famille | Explication attendue | Exemple principal illustratif |
| --- | --- | --- |
| Agents IA | Distinguer un assistant qui aide à chercher, rédiger ou analyser à la demande, et un agent qui peut enchaîner des étapes et utiliser des outils dans un périmètre autorisé. Ces notions se recouvrent selon les systèmes ; ne pas promettre une autonomie sans contrôle. | Une PME reçoit une question client : l’assistant retrouve les informations dans une documentation autorisée et prépare une réponse sourcée ; un agent peut aussi créer une tâche dans le CRM, avec validation humaine avant les actions sensibles. |
| Automatisations intelligentes | Expliquer le déclencheur, les étapes et les règles d’un flux ; montrer où l’IA aide à comprendre ou classer une information. Toute automatisation n’utilise pas nécessairement de l’IA. | Une facture reçue par email est extraite, contrôlée puis transmise à l’outil comptable ; les données ambiguës sont envoyées à une personne pour validation. |
| Logiciels & Applications IA sur mesure | Définir un outil métier comme une application conçue autour du travail réel des utilisateurs. Distinguer outil interne et produit ou fonctionnalité IA proposé aux clients. | Une société de services centralise ses demandes et interventions dans une interface ; l’IA prépare un compte rendu que le collaborateur relit avant envoi. |
| Intégrations & systèmes connectés | Expliquer comment les logiciels échangent leurs données. Une intégration relie les outils ; une automatisation organise les étapes du processus, les deux peuvent se combiner. | Une demande validée sur le site crée ou met à jour le contact dans le CRM et transmet les informations utiles à l’outil de gestion, sans ressaisie. |
| Data & Intelligence | Expliquer centralisation, indicateurs, analyse, puis prévision ou recommandation lorsque les données le permettent. Distinguer un indicateur observé d’une estimation. | Un commerce regroupe ventes et stocks dans un tableau de bord, repère les anomalies et estime les besoins de réapprovisionnement sous réserve d’un historique suffisant. |
| Formation & Adoption IA | Expliquer les ateliers pratiques, le choix des usages, les bonnes pratiques et l’accompagnement des équipes, avec ou sans solution développée par Synode. | Une petite équipe apprend à préparer des comptes rendus et réponses clients à partir de ses situations réelles, puis adopte une méthode de relecture et des règles sur les informations à partager. |

Ces scénarios sont des **exemples illustratifs de solutions possibles**, pas des références clients ni des résultats mesurés. Les développer en textes et visuels pédagogiques soignés : petits parcours, schémas, extraits d’interfaces illustratifs. Ne pas recopier ces tableaux de consignes tels quels dans l’interface et ne pas produire de longs murs de texte.

### Navbar : menu déroulant Solutions

- Conserver l’accès à la page générale via « Solutions » ou un lien clairement visible « Toutes nos solutions », et ajouter les six catégories comme liens vers leurs pages respectives.
- Réutiliser la navbar existante et son style. Le panneau reste sobre, clair, avec bordures fines, espaces confortables et, si utile, une courte description par famille.
- Prévoir une ouverture au clic et au clavier, pas uniquement au survol ; gérer l’état ouvert, le focus, la fermeture avec Échap et le clic extérieur. Utiliser les éléments sémantiques adaptés et indiquer l’état déplié aux technologies d’assistance.
- Sur mobile, proposer un sous-menu dépliable dans la navigation existante avec les mêmes destinations, sans dépendance au survol.
- Vérifier le menu dans les deux langues, sur toutes les pages, et fermer correctement le menu après navigation. Ne pas modifier les autres entrées sans nécessité.

### Accueil et contenus partagés

Crée ou adapte la section Solutions pour montrer les six grandes familles sous forme de cartes asymétriques dans le système visuel existant. Chaque carte présente une explication courte et un exemple compréhensible, puis mène à la page détaillée correspondante. Ajouter un lien vers la vue d’ensemble `/solutions`, sans répéter tous ses détails. Conserve le parcours : **cas d’usage → solutions → méthode → réalisations/démos → équipe → CTA**, avec le hero en ouverture et la FAQ existante. Réutilise les contenus des pages dédiées pour les aperçus manquants ; ne fabrique pas de réalisations ou de portraits.

Ajuste les autres textes seulement s’ils contredisent l’offre : FAQ, présentation courte, métadonnées ou libellés concernés. Préserve les routes françaises et anglaises existantes et adapte les textes EN correspondants pour éviter une offre différente selon la langue.

### Accueil : bandeau animé et hauteur du hero

**Bandeau à animer :** « De votre besoin à votre outil - Assistants IA - Automatisations - Intégrations - Outils métier ».

Conserver ce contenu et proposer une animation discrète, fluide et lisible, cohérente avec le design actuel : apparition progressive ou changement doux des libellés, par exemple. Ne pas ajouter d’effet envahissant ni de décalage de mise en page. Conserver une version statique complète et lisible lorsque la réduction des animations est activée. Ce bandeau résume un parcours ; il ne remplace pas les six familles de la section Solutions.

**Hauteur souhaitée :** sur le MacBook Pro 13 pouces de l’utilisateur, à l’ouverture de la page et avant tout défilement, le hero doit occuper l’espace visible disponible sous la navbar. Le texte « L’IA dans votre quotidien », qui ouvre la section suivante, ne doit apparaître qu’après avoir commencé à faire défiler la page.

Raisonner sur la hauteur réelle de la fenêtre du navigateur en pixels CSS, en tenant compte de la navbar et des barres du navigateur ; le nombre de pouces ne détermine pas une résolution unique. Préférer une hauteur minimale responsive à une hauteur rigide qui couperait les contenus. Vérifier plusieurs tailles de fenêtre représentatives d’un portable 13 pouces et indiquer celles réellement testées. Ne pas prétendre avoir validé le MacBook physique si seul un viewport simulé a été utilisé.

Sur un écran plus grand, la section suivante peut commencer à apparaître : c’est acceptable. Ne pas imposer artificiellement le plein écran à tous les écrans. Préserver la lisibilité du hero, ses boutons et ses visuels sur mobile, sur petite hauteur et avec zoom. Ne pas masquer le texte de la section suivante par une astuce de visibilité ; ajuster réellement les dimensions et les espacements. Conserver un défilement naturel.

### Emplacements à examiner

- `src/lib/content.ts` : contenus FR/EN, dont la liste actuelle des briques.
- `src/components/site/solutions-page.tsx` : rendu de la grille.
- `src/components/site/solution-visuals.tsx` : visuels et correspondances par index.
- `src/components/site/offer-card.tsx` : présentation partagée de l’offre.
- `src/components/site/home-page.tsx` : accueil et textes spécifiques.
- `src/app/studio.css` : grille, hero et adaptations responsive.
- `src/components/site/site-header.tsx` : navbar et menu Solutions.
- Routes FR/EN existantes : nouvelles pages de familles, métadonnées et navigation bilingue.

Vérifie les icônes et les visuels actuellement prévus pour cinq briques : le sixième élément doit avoir un rendu défini. Préserve les ancres et leurs liens existants, même si un titre visible change. Évite toute refonte du stockage des contenus ou des composants qui ne serait pas nécessaire.

## 5. Design à préserver

- Style actuel inspiré de Supabase : thème clair, espaces généreux, bordures fines, rendu professionnel et sobre.
- Couleurs Synode et police actuellement appliquée : Helvetica Neue, Helvetica, Arial. Aucun changement de palette, logo ou typographie.
- Cartes éditoriales de tailles variées, asymétriques mais alignées dans un même ensemble rectangulaire cohérent. Composer la grille ; ne pas rendre leur placement aléatoire à chaque chargement.
- Adapter les dimensions nécessaires aux six familles, aux nouvelles pages et au hero demandé. Conserver les accents bleus et bleu nuit déjà présents.
- Réutiliser les illustrations pertinentes ; conserver les systèmes animés du hero et les composants existants.
- Sur mobile, garder un ordre de lecture 01 à 06, sans débordement ni texte coupé. Respecter focus, contrastes et réduction des animations.

La référence Supabase concerne la logique visuelle existante ; elle n’autorise ni copie d’une nouvelle charte ni refonte du site.

## 6. Fonctions et contenus à préserver

Ne refais pas les formulaires, les intégrations ou les pages légales pour cette évolution commerciale. Limite les changements de navigation au menu Solutions et aux liens des nouvelles pages demandées. Conserve leurs exigences existantes : validation serveur, enregistrement durable avant confirmation, notification Resend distincte, erreurs honnêtes, absence de faux succès et réservation Cal.com configurable. Aucun clic ne doit devenir une fausse confirmation.

Ne touche pas aux secrets ni aux fichiers d’environnement. N’invente pas de calendrier, de coordonnées, de témoignages, de résultats ou de fonctionnalités opérationnelles. Distingue toujours outil interne, démonstration et projet client. Signale dans `docs/SITE_A_COMPLETER.md` les manques découverts hors périmètre, sans lancer une réécriture globale.

## 7. Vérifier et livrer

Exécute les vérifications adaptées aux changements : typage, analyse statique et compilation disponibles dans le dépôt. Vérifie les pages concernées en FR/EN, les liens, les ancres et les six correspondances carte/icône/visuel. Contrôle visuellement ordinateur et mobile ; indique clairement si ce contrôle n’a pas pu être fait.

Vérifie les six pages détaillées, leurs exemples propres, les liens depuis les cartes, le menu déroulant au clavier et sur mobile, le bandeau animé avec réduction des animations, et le hero aux dimensions de portable testées.

Vérifie que l’ordre de l’accueil, les six intitulés, l’absence de prix publics, l’échange gratuit et le modèle économique sont cohérents. Compare le rendu avant/après pour confirmer la conservation du style et l’absence de régression hors de l’offre.

Après implémentation, actualise les points pertinents de `docs/SITE_A_COMPLETER.md`, les routes et parcours de `docs/README_2_ARCHITECTURE_SITE_SYNODE.md` et, si nécessaire, `docs/SITE_INSTALLATION.md`. Corrige notamment l’ancienne interdiction de créer six pages ; ce prompt constitue la nouvelle demande de référence sur ce point. Ne marque comme terminées que les tâches effectivement vérifiées. Résume les fichiers modifiés, les changements, les vérifications et les limites restantes. Ne publie pas le site et ne fais ni commit ni push sans demande explicite.

**Commence par examiner les références et le site existant, puis réalise les évolutions décrites : offre pédagogique, six pages, menu Solutions et hero, en conservant l’esprit du design actuel inspiré de Supabase.**
