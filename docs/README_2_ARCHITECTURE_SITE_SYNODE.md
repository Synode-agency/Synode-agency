# Synode : Architecture complète du site

Version du 28 septembre 2026 · Plan de production proposé, fondé sur la [fiche de référence](README_1_REFERENCE_SYNODE.md).

## 1. Objectif et règles éditoriales

**Objectif principal : obtenir un échange qualifié avec un prospect.** Le visiteur doit comprendre ce que Synode fait, reconnaître un problème, voir une preuve et pouvoir prendre contact.

- Une offre : **Solutions IA sur mesure**. Les domaines d’intervention sont des exemples.
- Sur l’accueil : problèmes et cas d’usage avant la méthode.
- Une promesse concrète, sans chiffres de performance inventés ni logos clients non autorisés.
- Des démos présentées comme des démos ; Synode Prospect présenté selon son état réel.
- Pas de grille tarifaire publique ; expliquer création, exploitation et maintenance.
- CTA principal identique : **Réserver un échange gratuit**.
- Employer « premier diagnostic » si utile, mais éviter « audit gratuit » seul : préciser 30 minutes, sans engagement, compréhension du besoin et premières pistes, sans audit technique complet.

## 2. Plan du site et navigation

| Page | Adresse proposée | Rôle |
| --- | --- | --- |
| Accueil | `/` | Faire comprendre l’activité et donner envie d’échanger |
| Solutions | `/solutions` | Expliquer l’offre unique et ce qu’elle peut contenir |
| Cas d’usage | `/cas-usage` | Aider le visiteur à se reconnaître |
| Méthode | `/methode` | Montrer comment un projet se déroule |
| Réalisations et démos | `/realisations` | Donner des preuves concrètes |
| Fiche réalisation | `/realisations/[slug]` | Détailler une démonstration ou un projet réel |
| Équipe | `/equipe` | Présenter les deux associés et leurs rôles |
| Contact | `/contact` | Formulaire et réservation Cal.com |
| Confirmation formulaire | `/merci` | Confirmer la réception et indiquer la suite |
| Mentions légales | `/mentions-legales` | Présenter les informations légales validées |
| Confidentialité | `/confidentialite` | Expliquer le traitement des données et les prestataires |

**Navbar ordinateur** : logo Synode → accueil ; Solutions ; Cas d’usage ; Méthode ; Réalisations ; Équipe ; bouton « Réserver un échange gratuit ». Le bouton mène à `/contact#reservation`. Le lien Contact figure aussi dans le pied de page et le menu mobile.

**Mobile** : logo + menu ; mêmes destinations avec libellés lisibles ; CTA visible dans le menu. Aucun sous-menu nécessaire au lancement.

**Pied de page** : phrase courte de présentation, liens vers toutes les pages principales, email professionnel réel, réseaux effectivement alimentés, mentions légales, confidentialité, gestion des cookies si nécessaire. Les informations Smart doivent correspondre au montage validé ; aucun numéro d’entreprise à inventer.

## 3. Accueil : sections dans l’ordre

| Ordre / section | Contenu à produire | Action proposée |
| --- | --- | --- |
| 1. Hero | H1 : « Des solutions IA sur mesure, conçues autour de votre activité. » Texte : « Nous concevons des assistants, automatisations et outils métier pour simplifier vos opérations et mieux exploiter vos données. » Visuel d’une vraie interface ou d’une démo | Principal : réserver ; secondaire : voir les cas d’usage |
| 2. Problèmes rencontrés | Quatre cartes : tâches répétitives, outils dispersés, demandes difficiles à traiter, information difficile à retrouver. Une phrase concrète chacune | Lien vers le cas pertinent |
| 3. Cas d’usage | Quatre à six exemples issus de la page dédiée, décrits par problème → solution possible → bénéfice à vérifier | « Explorer les cas d’usage » |
| 4. Offre | Une offre sur mesure ; combinaison possible d’IA, automatisations, intégrations et outils métier ; portée définie après échange | « Découvrir notre approche » → solutions |
| 5. Preuves | Synode Prospect avec statut exact, puis une ou deux démos. Capture réelle, problème traité, lien vers la fiche | « Voir la démonstration » |
| 6. Méthode | Comprendre → proposer → construire → déployer → suivre. Une phrase par étape | « Comment se déroule un projet ? » |
| 7. Équipe | Photos réelles, prénoms, rôles et courte explication de votre complémentarité | « Rencontrer l’équipe » |
| 8. FAQ | Petit projet accepté ? Quels outils ? Quel budget ? Quelle maintenance ? Mon besoin est différent ? | Réponses de 2 à 4 phrases |
| 9. CTA final | « Quel processus aimeriez-vous simplifier ? » + explication de l’échange gratuit | Réserver ou décrire son projet |

Les sections d’accueil sont des résumés. Les pages dédiées développent les détails sans recopier les mêmes paragraphes.

## 4. Solutions : `/solutions`

1. **Introduction** : « Une solution construite à partir de votre besoin. » Expliquer l’offre unique, de l’amélioration ciblée à l’outil métier complet.
2. **Ce que la solution peut réunir** : assistants et agents IA, automatisations, connexions aux outils existants, interface métier, données et tableaux de bord. Illustrer chaque brique par un exemple simple.
3. **Quatre territoires d’intervention** : ventes et prospection ; opérations et administratif ; service client ; outils métier et connaissance interne. Renvoyer vers les cas d’usage.
4. **Ce que vous recevez** : périmètre validé, solution testée selon les critères convenus, documentation, prise en main et modalités de suivi. Préciser que le devis fixe les livrables exacts.
5. **Comment le projet est dimensionné** : objectif, complexité, données, nombre d’intégrations, utilisateurs, volumes et contraintes. Un petit besoin peut démarrer par un périmètre réduit.
6. **Modèle économique** : création initiale + exploitation et maintenance définies au contrat + évolutions importantes sur devis. Pas de prix public ni de « tout illimité ».
7. **FAQ de décision** : accès nécessaires, compatibilité avec les outils, validation humaine, propriété et reprise des livrables selon contrat, coûts tiers, fonctionnement après livraison.
8. **CTA** : « Parlons de votre besoin » → `/contact#formulaire` ; alternative réservation.

Encart obligatoire : **« Votre besoin ne figure pas ici ? Chaque projet est conçu à partir de votre contexte. »**

## 5. Cas d’usage : `/cas-usage`

### Organisation

Introduction : « Quelques situations dans lesquelles une solution IA peut vous aider. » Afficher les quatre territoires en ancres ; pas besoin d’un système de filtres complexe pour huit exemples.

| Domaine | Problème | Solution possible | Indicateur à mesurer avec le client |
| --- | --- | --- | --- |
| Ventes | Trop de temps pour préparer un rendez-vous | Synthèse des informations disponibles et préparation d’une fiche prospect | Temps de préparation par rendez-vous |
| Ventes | Informations commerciales dispersées | Qualification assistée par IA et alimentation du suivi commercial | Fiches complètes et validées |
| Opérations | Emails entrants difficiles à trier | Classification, extraction et routage avec validation des cas ambigus | Temps de traitement et erreurs de routage |
| Opérations | Données recopiées depuis des documents | Extraction vers un outil métier, contrôles et validation humaine | Taux de données correctes sur un échantillon |
| Service client | Questions fréquentes répétitives | Préparation de réponses fondées sur la documentation validée | Temps de réponse et corrections nécessaires |
| Service client | Demandes mal orientées | Identification du sujet et transmission au bon interlocuteur | Délai d’affectation et réaffectations |
| Outils métier | Recherche longue dans les documents internes | Assistant avec sources, droits d’accès et réponse d’incertitude | Réponses utiles et correctement sourcées |
| Outils métier | Plusieurs outils sans vue commune | Interface centralisée, synchronisations et synthèses IA | Doubles saisies et temps de consolidation |

### Structure de chaque bloc

- Situation de départ en langage client.
- Exemple de fonctionnement en trois étapes.
- Bénéfice recherché, sans résultat chiffré non mesuré.
- Prérequis : sources disponibles, outils accessibles, interlocuteur métier.
- Limite principale : qualité des données, contrôle humain ou compatibilité à vérifier.
- Lien vers une démo si elle existe, sinon badge « Exemple de solution possible ».
- CTA « J’ai un besoin similaire » → formulaire avec le cas prérempli et modifiable.

Ne pas créer huit pages presque vides au lancement. Ajouter une page dédiée uniquement lorsqu’un cas a une vraie démonstration ou suffisamment de contenu propre.

## 6. Méthode : `/methode`

| Étape | Travail Synode | Participation du client | Sortie attendue |
| --- | --- | --- | --- |
| 1. Premier échange | Comprendre problème, fréquence, outils, impact et priorité | Décrire un exemple concret | Résumé du besoin et prochaine étape |
| 2. Analyse et proposition | Examiner faisabilité et dimensionner le projet | Confirmer données, contraintes et décideur | Proposition, devis et critères de réussite |
| 3. Conception | Définir fonctionnement, accès et validations | Valider le périmètre et les exemples | Plan de réalisation partagé |
| 4. Construction | Développer et montrer les jalons | Tester les parcours métier et répondre aux questions | Version prête pour la recette |
| 5. Recette et déploiement | Vérifier, corriger, documenter et mettre en service | Valider les critères convenus | Solution en service et transmission |
| 6. Suivi | Surveiller et intervenir dans le périmètre retenu | Signaler incidents et nouveaux besoins | Maintenance suivie et évolutions chiffrées |

Après le tableau : expliquer les changements de périmètre, les dépendances à des accès client, la confidentialité des données et la distinction entre maintenance et nouvelle fonctionnalité. Aucun délai universel de livraison à annoncer.

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


