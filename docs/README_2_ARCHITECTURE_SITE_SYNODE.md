# Synode : Architecture complète du site

Version du 3 octobre 2026 · Architecture actuelle : Accueil / Solutions / Cas d’usage / Réalisations / Équipe / Contact. Référence commerciale : [fiche Synode](README_1_REFERENCE_SYNODE.md). Contexte maître : [README 0](README_0_CONTEXTE_CODEX_SYNODE.md).

## 1. Objectif et règles éditoriales

**Objectif principal : obtenir un échange qualifié avec un prospect.** Le visiteur doit comprendre ce que Synode fait, reconnaître un problème, voir une preuve et pouvoir prendre contact.

- Positionnement externe : **Solutions IA sur mesure**. Positionnement stratégique interne : **Synode conçoit, intègre et opère des systèmes IA sur mesure pour les PME.** Les quatre domaines restent des exemples de cas d’usage, pas des offres.
- Sur l’accueil : hero → usages de l’IA → solutions → impact opérationnel → fiabilité et contrôle → méthode → projets et démos → autodiagnostic → FAQ → CTA. L’équipe reste accessible depuis la navigation et sa page dédiée. Les pages principales sont Accueil, Solutions, Cas d’usage, Réalisations, Équipe et Contact.
- Une promesse concrète, sans chiffres de performance inventés ni logos clients non autorisés.
- Des démos présentées comme des démos ; Synode Prospect présenté selon son état réel.
- Pas de grille tarifaire publique ; expliquer création, exploitation et maintenance.
- CTA principal identique : **Réserver un échange gratuit**.
- Employer « premier diagnostic » si utile, mais éviter « audit gratuit » seul : préciser 30 minutes, sans engagement, compréhension du besoin et premières pistes, sans audit technique complet.

## 2. Plan du site et navigation

| Page | Adresse proposée | Rôle |
| --- | --- | --- |
| Accueil | `/` | Faire comprendre l’activité et donner envie d’échanger |
| Solutions | `/solutions` | Présenter les six familles de solutions et leur combinaison sur mesure |
| Famille de solutions | `/solutions/[slug]` | Définition, usages, scénario, prérequis et FAQ propres à chaque famille |
| Cas d’usage | `/cas-usage` | Présenter douze exemples de systèmes IA appliqués à des processus métier |
| Réalisations et démos | `/realisations` | Donner des preuves concrètes |
| Fiche réalisation | `/realisations/[slug]` | Détailler une démonstration ou un projet réel |
| Équipe | `/equipe` | Présenter les deux associés et leurs rôles |
| Contact | `/contact` | Formulaire et réservation Cal.com |
| Confirmation formulaire | `/merci` | Confirmer la réception et indiquer la suite |
| Mentions légales | `/mentions-legales` | Présenter les informations légales validées |
| Confidentialité | `/confidentialite` | Expliquer le traitement des données et les prestataires |

**Navbar ordinateur** : Accueil ; Solutions (menu déroulant) ; Cas d’usage ; Réalisations ; Équipe ; Contact ; bouton « Réserver un échange ». Le bouton mène à `/contact#reservation`, tandis que Contact ouvre la page avec ses deux portes d’entrée, calendrier et formulaire.

**Solutions** : bouton ouvrant le panneau au clic ou au clavier, lien « Toutes nos solutions » et six liens détaillés. État annoncé avec `aria-expanded`, fermeture avec Échap, au clic extérieur, à la sortie du focus et après navigation. Mobile : sous-menu dépliable, mêmes destinations.

La route `/cas-usage` et son équivalent anglais affichent la page dédiée et figurent dans la navigation et le sitemap. L’ancienne route `/methode` redirige définitivement vers `/#approche`, avec son équivalent anglais.

**Pied de page** : phrase courte de présentation, liens vers toutes les pages principales, email professionnel réel, réseaux effectivement alimentés, mentions légales, confidentialité, gestion des cookies si nécessaire. Les informations Smart doivent correspondre au montage validé ; aucun numéro d’entreprise à inventer.

## 3. Accueil : sections dans l’ordre

| Ordre / section | Contenu | Action |
| --- | --- | --- |
| 1. Hero | Promesse actuelle, systèmes IA animés préservés, bandeau animé discrètement | Réserver / découvrir les solutions |
| 2. L’IA dans votre quotidien | Quatre cas d’usage représentatifs, avec lien vers les douze exemples détaillés | Reconnaître un processus à améliorer et découvrir la page Cas d’usage |
| 3. Solutions IA | Aperçu des six familles ; la présentation actuelle est validée | Solutions / pages détaillées |
| 4. Impact opérationnel | Effets recherchés sur les frictions, la circulation de l’information, la fiabilité et le temps utile, sans résultat garanti | Comprendre ce qui pourra être défini et mesuré pendant le projet |
| 5. Fiabilité et contrôle | Confidentialité, validation humaine, intégration et suivi technique, sans certification inventée | Comprendre les garde-fous prévus selon le projet |
| 6. Du premier échange à l’usage | Six étapes : travail Synode, participation du client, résultat de chaque étape | Comprendre le déroulement sans page séparée |
| 7. Quelques projets & démos | Une ou deux preuves maximum sur l’accueil, dont Synode Prospect selon son état réel | Fiche du projet + « Voir toutes nos réalisations » |
| 8. Outils d’autodiagnostic | Parcours en trois étapes : identifier un processus à prioriser, vérifier ses premières conditions de faisabilité, puis générer un brief avec les mots du visiteur. Les réponses restent dans le navigateur. | Passer d’un problème concret à un besoin structuré, puis contacter Synode |
| 9. FAQ | Cinq réponses sur les outils, le coût, le déroulement, les données et la maintenance | Accordéon accessible dans l’accueil |
| 10. CTA | Premier échange gratuit de 30 minutes, sans engagement | Réservation configurable et contact |

Le hero suit la hauteur disponible sur ordinateur jusqu’à une référence maximale de 768 px CSS. Une fenêtre plus haute révèle la section suivante au lieu d’étirer l’espace avant le bandeau. Le bandeau fait défiler les expertises, reste complet sans animation et le hero demeure libre de grandir si son contenu l’exige. Voir la recette pour les tailles réellement vérifiées, sans confondre pixels CSS et dimensions physiques du MacBook.

### Priorités SEO de l’accueil

- Intention principale : **solutions IA sur mesure à Bruxelles et en Belgique** pour indépendants, TPE et PME.
- Intentions complémentaires : **développement d’agents IA Bruxelles**, **automatisation PME Belgique** et **logiciel IA sur mesure Belgique**.
- Employer ces expressions dans le titre SEO, les introductions, les sections concernées et les liens lorsqu’elles décrivent réellement le contenu, sans transformer le H1 en liste de mots-clés ni créer de répétition artificielle.
- Conserver un contenu utile et lisible : problèmes métier, solutions possibles, méthode, contrôles et exemples réels priment sur la densité de mots-clés.
- Métadonnées FR/EN, URL canoniques, `hreflang`, sitemap, liens HTML explorables et données structurées `WebSite` / `Organization` sont gérés dans le code.
- Le SEO local doit être complété hors du site par une fiche Google Business vérifiée, des informations cohérentes et des signaux locaux réels. Ne pas ajouter d’adresse, de téléphone, d’avis ou de zone desservie non confirmés.

### Intention SEO de chaque section de l’accueil

| Section | Intention principale | Champ sémantique naturel |
| --- | --- | --- |
| Hero | Comprendre immédiatement l’offre de Synode | solutions IA sur mesure, agents IA, automatisations, logiciels métier |
| Usages de l’IA | Identifier ce que l’IA peut simplifier dans une entreprise | usages de l’IA en entreprise, tâches répétitives, recherche documentaire, logiciels déconnectés |
| Solutions | Découvrir les expertises disponibles | agents IA, automatisation des processus, applications IA, intégrations, data, formation IA |
| Fiabilité & contrôle | Comprendre comment une solution IA reste maîtrisée | confidentialité, contrôle humain, gestion des accès, monitoring et maintenance IA |
| Méthode | Comprendre le déroulement d’un projet | développement de solution IA sur mesure, cadrage, intégration, déploiement et suivi |
| Projets & démos | Voir des preuves et des exemples concrets | projets IA, démonstrateurs IA, agents, automatisations et outils métier |
| FAQ | Répondre aux objections avant une prise de contact | prix d’une solution IA, outils existants, données, maintenance et déroulement |
| CTA | Déclencher un échange qualifié | projet IA sur mesure, échange gratuit, Synode, Bruxelles et Belgique lorsque pertinent |

Cette grille guide les contenus futurs. Elle ne demande pas de répéter les expressions à l’identique : chaque titre doit rester naturel, utile et adapté à la section.


## 4. Solutions : `/solutions`

1. **Introduction** : « Des solutions IA sur mesure, conçues autour de votre activité. » Expliquer les six familles, de l’amélioration ciblée au système complet et à l’adoption.
2. **Nos solutions IA sur mesure** : les six cartes actuelles sont validées. **Ne pas les redesigner, les réorganiser, les simplifier ni modifier leurs dimensions ou leur logique visuelle sans demande explicite.** Elles restent dans l’ordre 01 à 06 ci-dessous.
3. **Exemple de combinaison** : agent IA + CRM + automatisation + tableau de bord, présenté comme un exemple illustratif et non un forfait.
4. **Exploitation, maintenance et monitoring** : continuité opérationnelle des six familles, avec paiement récurrent et conditions définies au contrat. Ce n’est pas une septième famille.
5. **Ce que vous recevez** : périmètre validé, solution testée selon les critères convenus, documentation, prise en main et modalités de suivi. Préciser que le devis fixe les livrables exacts.
6. **Comment le projet est dimensionné** : objectif, complexité, données, nombre d’intégrations, utilisateurs, volumes et contraintes. Un petit besoin peut démarrer par un périmètre réduit.
7. **Modèle économique** : création initiale + paiement récurrent d’exploitation, maintenance et monitoring + évolutions importantes sur devis. Pas de prix public ni de « tout illimité ».
8. **FAQ de décision** : accès nécessaires, compatibilité avec les outils, validation humaine, propriété et reprise des livrables selon contrat, coûts tiers, fonctionnement après livraison.
9. **CTA** : « Parlons de votre besoin » → `/contact#formulaire` ; alternative réservation.

Encart obligatoire : **« Votre besoin ne figure pas ici ? Chaque projet est conçu à partir de votre contexte. »**

### Règle de préservation de la section Solutions

La présentation actuelle des six familles est considérée comme validée. Toute intervention future doit préserver :

- les six intitulés ;
- le système de cards existant ;
- les dimensions et la hiérarchie ;
- les visuels ;
- les comportements responsive ;
- le style Supabase-like propre à Synode.

Les modifications futures portent uniquement sur les éléments explicitement demandés autour de cette section (texte d’introduction, maintenance/monitoring, CTA, SEO, etc.).

### Contenu des six cartes

| Famille | Ce que nous pouvons concevoir | Exemple de besoin |
| --- | --- | --- |
| 01 Agents IA | Assistants documentaires avec sources, copilotes métier, agents vocaux et agents capables d’exécuter des actions encadrées | Retrouver une information, préparer une réponse ou qualifier une demande |
| 02 Automatisations intelligentes | Workflows, tri d’emails, extraction de documents, traitement administratif et circuits de validation | Transformer des documents reçus en données vérifiées et exploitables |
| 03 Logiciels & Applications IA sur mesure | Logiciels métier internes, interfaces sur mesure et fonctionnalités ou produits IA destinés aux clients de l’entreprise | Centraliser une activité ou intégrer un copilote dans un produit |
| 04 Intégrations & systèmes connectés | Connexions entre API, CRM, ERP, outils existants et bases de données | Synchroniser les informations et limiter les doubles saisies |
| 05 Data & Intelligence | Centralisation, tableaux de bord, recherche sémantique, analyse, prévision, scoring et recommandation | Comprendre l’activité et éclairer les décisions à partir des données disponibles |
| 06 Formation & Adoption IA | Formation aux usages de l’IA, ateliers métier et prise en main des solutions Synode | Aider les équipes à utiliser l’IA de façon utile et adaptée à leur travail |

Les familles se combinent selon le besoin. Formation & Adoption IA comprend la formation générale et celle aux solutions livrées. Les logiciels couvrent les outils internes et les produits IA destinés aux clients de l’entreprise. Data & Intelligence dépasse les tableaux de bord, sous réserve de données et d’une faisabilité adaptées.

### Mise en page à préserver

- Conserver la direction claire inspirée de Supabase documentée dans `DESIGN_STUDIO_CLAIR.md`, les couleurs Synode et la police actuellement appliquée (Helvetica Neue, Helvetica, Arial). Ne pas rétablir une ancienne charte.
- Dernier choix : six cartes de même poids visuel, en trois colonnes sur ordinateur, puis deux et une selon la largeur. Même fond, même typographie et même espace pour les illustrations ; aucune famille n’est présentée comme plus importante.
- Adapter la grille existante de cinq briques à six familles. Préserver les accents bleus et bleu nuit existants, les composants, illustrations réutilisables et animations du hero. Aucun changement global de palette, police ou structure.
- Sur mobile, assurer une lecture fluide dans l’ordre 01 à 06, sans débordement ni texte tronqué. Les numéros identifient les familles et ne représentent pas des étapes obligatoires.
- Conserver les sections livrables, dimensionnement, modèle économique, FAQ et CTA lorsqu’elles restent cohérentes. Ajouter les six pages détaillées en FR/EN. La page Cas d’usage est une page principale ; seule l’ancienne page Méthode redirige vers l’accueil.


### Pages détaillées intégrées

| Famille | Route FR |
| --- | --- |
| Agents IA | `/solutions/agents-ia` |
| Automatisations intelligentes | `/solutions/automatisations-intelligentes` |
| Logiciels & Applications IA sur mesure | `/solutions/logiciels-applications-ia` |
| Intégrations & systèmes connectés | `/solutions/integrations-systemes-connectes` |
| Data & Intelligence | `/solutions/data-intelligence` |
| Formation & Adoption IA | `/solutions/formation-adoption-ia` |

Les équivalents EN conservent le slug avec le préfixe `/en`. Les cartes de l’accueil, de Solutions et le menu mènent aux pages détaillées. Les anciennes ancres de familles sur Solutions et `#briques` restent présentes.

Chaque page présente une définition propre, son public, plusieurs possibilités, un scénario illustratif en trois étapes avec outils et contrôle humain, deux autres exemples, les prérequis, les familles complémentaires, une FAQ et un CTA. Aucun exemple n’est présenté comme un projet client livré. Métadonnées, canonique, liens de langue et sitemap couvrent les douze routes.

## 5. Usages de l’IA : section `/#cas-usage`

Cette section aide le visiteur à reconnaître une difficulté sans donner l’impression que Synode ne sait traiter qu’une liste fermée de problèmes. Elle reste distincte des six familles de Solutions : elle part du quotidien de l’entreprise, tandis que la section suivante présente les expertises mobilisables.

Le contenu actuellement validé est :

- surtitre : **« Usages de l’IA en entreprise »** ;
- titre : **« Comment l’IA peut simplifier le quotidien de votre entreprise »** ;
- introduction : exemples de tâches et de processus courants, puis explication de l’approche sur mesure de Synode ;
- note éditoriale : les situations illustrent des difficultés fréquentes et ne constituent pas un catalogue exhaustif.

### Quatre familles de difficultés

| Situation | Exemples visibles | Réponse possible présentée |
| --- | --- | --- |
| Automatiser les tâches répétitives et administratives | Saisie de données, tri d’emails, comptes rendus, contrôle de documents | Automatiser les étapes répétitives avec validation humaine lorsque nécessaire |
| Retrouver les informations utiles dans les documents | Documents internes, historique client, contrats, procédures | Rassembler les sources autorisées et produire des réponses vérifiables |
| Trier et orienter les demandes plus rapidement | Demandes clients, prospects entrants, boîtes partagées, dossiers internes | Comprendre, résumer et orienter selon les règles de l’entreprise |
| Connecter les logiciels et centraliser les données | CRM, agenda, facturation, outils métier | Faire circuler les bonnes données sans imposer le remplacement de l’organisation existante |

### Structure visuelle actuelle

- quatre cartes rectangulaires en deux colonnes sur ordinateur, puis une colonne sur mobile ;
- une catégorie métier, un titre explicite, une description, plusieurs petits labels d’exemples et un bloc « Exemple de solution IA » ;
- une introduction éditoriale large en deux colonnes, avec une note latérale soulignée par un filet bleu ;
- un encart final : **« Votre difficulté n’apparaît pas ici ? C’est normal. »** ;
- CTA **« Parler de votre projet IA »** vers le formulaire de contact.

Les anciennes ancres `#ventes`, `#operations`, `#service-client` et `#outils-metier` restent présentes pour préserver les liens existants. Les huit cas détaillés de `src/lib/use-cases.ts` restent une réserve éditoriale et ne définissent pas les limites de l’offre. Ne pas créer huit pages presque vides au lancement ; ajouter une page de cas uniquement lorsqu’une démonstration ou un contenu propre le justifie.

## 6. Méthode : section `/#approche`

| Étape | Travail Synode | Participation du client | Sortie attendue |
| --- | --- | --- | --- |
| 1. Premier échange | Comprendre problème, fréquence, outils, impact et priorité | Décrire un exemple concret | Résumé du besoin et prochaine étape |
| 2. Analyse et proposition | Examiner faisabilité et dimensionner le projet | Confirmer données, contraintes et décideur | Proposition, devis et critères de réussite |
| 3. Conception | Définir fonctionnement, accès et validations | Valider le périmètre et les exemples | Plan de réalisation partagé |
| 4. Construction | Développer et montrer les jalons | Tester les parcours métier et répondre aux questions | Version prête pour la recette |
| 5. Recette et déploiement | Vérifier, corriger, documenter et mettre en service | Valider les critères convenus | Solution en service et transmission |
| 6. Suivi | Surveiller et intervenir dans le périmètre retenu | Signaler incidents et nouveaux besoins | Maintenance suivie et évolutions chiffrées |

Sur l’accueil : les six étapes affichent le travail, la participation et la sortie attendue. Une note précise le premier échange gratuit et le cadre du devis et du suivi. Les conditions détaillées restent dans Solutions. Aucun délai universel de livraison à annoncer.

CTA final : **« Commençons par votre situation actuelle »** → réservation.

## 7. Réalisations et démos : `/realisations`

### Page liste

1. Introduction : voir concrètement ce que Synode construit.
2. Synode Prospect : outil interne en construction ; afficher uniquement les fonctions réellement disponibles.
3. Une ou deux démonstrations : données fictives, captures ou vidéo et description du scénario.
4. Projets clients : ajouter seulement après livraison documentée et autorisation de publication.
5. CTA : « Construisons une solution adaptée à votre activité ».

Chaque carte comporte : titre, badge **Outil interne / Démo / Projet client**, problème, aperçu visuel, statut, lien. Ne pas afficher de rubrique client vide ni de faux témoignages.

### Fiche détaillée : `/realisations/[slug]`

1. Titre, nature du projet et état actuel.
2. Contexte et problème traité.
3. Parcours avant/après, sans assimiler une simulation à un résultat client.
4. Fonctionnalités réellement montrées et rôle de l’IA.
5. Vidéo courte ou démonstration guidée ; prévoir une capture de secours.
6. Résultats : mesures réelles avec conditions de mesure, ou objectifs du prototype.
7. Limites et rôle de la validation humaine.
8. CTA « Un besoin similaire ? Parlons-en ».

Pas de démonstration publique permettant d’accéder à des données personnelles réelles. Prévoir réinitialisation, quotas et protection contre les appels IA abusifs si une démo est interactive.

## 8. Équipe : `/equipe`

1. **Vision** : pourquoi vous construisez Synode et quels problèmes vous voulez résoudre.
2. **Les deux associés** : prénom/nom, photo réelle, rôle, compétences démontrables et lien LinkedIn si disponible.
3. **Votre complémentarité** : qui comprend et suit le besoin, qui conçoit et réalise ; adapter à votre répartition réelle.
4. **Votre manière de travailler** : interlocuteurs identifiés, explications simples, étapes visibles et décisions documentées.
5. **CTA** : « Échangeons sur votre projet ».

Éviter années d’expérience, certifications, taille d’équipe et références non confirmées.

## 9. Contact : `/contact`

### Introduction

Titre : **« Parlons de votre projet. »** Deux choix : réserver un échange de 30 minutes ou décrire le besoin par écrit. Aucun formulaire à remplir avant d’accéder au calendrier.

### Formulaire : ancre `#formulaire`

| Champ | Statut | Règle |
| --- | --- | --- |
| Nom | Obligatoire | Texte court |
| Email de contact | Obligatoire | Accepter aussi les indépendants sans domaine professionnel |
| Entreprise / activité | Facultatif | Utile à la préparation |
| Besoin / difficulté | Obligatoire | « Que souhaitez-vous améliorer aujourd’hui ? » |
| Téléphone | Facultatif | Aucune obligation pour envoyer |
| Site internet | Facultatif | Lien valide si renseigné |
| Échéance et budget envisagés | Facultatif | Inclure « À définir » |

Sous le formulaire : information concise sur l’utilisation des données pour répondre, lien confidentialité. Si inscription marketing ajoutée plus tard, prévoir un choix distinct, facultatif et non précoché. Ne pas demander de documents confidentiels dans ce premier formulaire.

**États à prévoir** : champ invalide, envoi en cours, réception confirmée, erreur avec nouvelle tentative, limitation anti-spam. Préserver le texte en cas d’erreur. Bouton : « Envoyer mon message ».

**Circuit recommandé** : formulaire → validation côté serveur → enregistrement durable de la demande → notification via Resend → confirmation à l’utilisateur. Le CRM peut être ce stockage, ou une base dédiée si nécessaire. Une panne d’email ne doit pas effacer une demande enregistrée. Si l’enregistrement échoue, ne pas afficher de succès.

### Cal.com : ancre `#reservation`

- Événement : « Premier échange Synode : 30 minutes ».
- Un associé référent au lancement ; agenda connecté et créneaux réellement disponibles.
- Fuseau visible et adapté au visiteur ; disponibilités gérées en Europe/Brussels.
- Prévoir un délai minimum de réservation et un tampon entre rendez-vous.
- Questions : nom, email, activité et besoin en une phrase ; éviter de refaire tout le formulaire.
- Confirmation avec lien de visioconférence et possibilités d’annulation/report.
- Intégration dans la page, avec lien direct « Ouvrir le calendrier » si elle ne charge pas.
- Décider du chargement de l’intégration selon les traitements et cookies réellement utilisés.

Le forfait gratuit Cal.com concerne un utilisateur. Ne pas promettre une réservation coordonnant automatiquement les disponibilités des deux associés sans vérifier l’offre adaptée. [Source : offres Cal.com](https://cal.com/pricing).

### Confirmation : `/merci`

Afficher « Votre message a bien été reçu » seulement après enregistrement réussi. Indiquer la prochaine étape et proposer la réservation. Ne publier un délai de réponse que si vous pouvez le tenir. La confirmation du formulaire ne signifie pas qu’un rendez-vous est réservé. Exclure cette page de l’indexation.

## 10. Exigences de production et recette

- [ ] Contenu validé avant la finition du design ; aucune section « bientôt » inutile.
- [ ] Un H1 par page, titres de page et descriptions propres, liens explicites.
- [ ] Navigation clavier, focus visible, contraste suffisant, labels de champs et textes alternatifs.
- [ ] Affichage testé sur téléphone et ordinateur ; images optimisées ; vidéo sans lecture imposée.
- [ ] Tous les CTA mènent à une destination réelle ; page 404 utile.
- [ ] Formulaire testé en succès, erreur et double clic ; pas de clé secrète côté navigateur.
- [ ] Réservation, report, annulation, fuseaux et conflit d’agenda testés.
- [ ] Mentions et confidentialité correspondent aux prestataires et à l’identité réellement utilisés.
- [ ] Sitemap, domaine canonique, favicon et aperçu de partage configurés ; préproduction non indexée.
- [ ] Mesures prévues : demandes reçues, rendez-vous réservés, rendez-vous qualifiés. Compter une conversion sur confirmation réelle, pas uniquement sur clic.

**Périmètre de lancement** : toutes les pages principales ci-dessus, une fiche démo fonctionnelle au minimum, contact opérationnel. Blog, espace client, chatbot public et catalogue étendu sont reportés jusqu’à l’existence d’un besoin.
