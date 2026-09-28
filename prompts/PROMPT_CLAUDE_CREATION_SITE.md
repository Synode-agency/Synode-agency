# Prompt pour Claude : Construire le site Synode

Copier le contenu à partir de « Ta mission » dans Claude, depuis le projet ouvert dans VS Code. Les deux fichiers de référence doivent être présents dans `docs/` ou joints à la conversation.

## Ta mission

Tu interviens comme développeur web, designer d’interface et rédacteur pour créer le site vitrine complet de **Synode**, en français, dans mon projet existant basé sur **Jarvis Starter Kit**.

Je veux une implémentation réelle, soignée, responsive et maintenable, avec les pages, contenus et interactions décrits dans les références. Ne te limite pas à une proposition, une maquette ou une page d’accueil. Travaille jusqu’à obtenir une version locale navigable et vérifiée, puis indique précisément ce qui reste à configurer avant publication.

## 1. Références à lire avant de commencer

Lis intégralement :

1. `docs/README_1_REFERENCE_SYNODE.md` : source de référence pour l’identité, le positionnement, l’offre, les cibles et la méthode.
2. `docs/README_2_ARCHITECTURE_SITE_SYNODE.md` : source de référence pour les pages, l’ordre des sections, les parcours et les fonctions.

Si les documents sont joints au lieu d’être dans le dépôt, utilise ces pièces jointes. Si tu ne peux pas les lire, signale précisément le fichier manquant avant de prétendre avoir exploité son contenu.

**N’utilise pas la roadmap de lancement et ne cherche pas à la reconstituer.** La mission concerne uniquement le site. Ne construis ni CRM interne, ni outil de prospection complet, ni système de facturation.

La fiche définit le fond commercial ; l’architecture définit sa présentation. Ce prompt précise la réalisation et les comportements de repli lorsque des informations manquent. Signale toute contradiction réelle et avance sur les éléments indépendants.

## Emplacement du projet

Le projet existant est `livrables/Site-Web/Synode-agency` depuis la racine Jarvis. Tous les chemins `docs/` et `prompts/` de cette consigne sont relatifs à ce projet. Examine aussi `DESIGN-SYSTEM.md` et les ressources de `design-system/` ; respecte la direction existante avant toute proposition visuelle de remplacement. Complète et adapte le site déjà commencé.

## 2. Examiner le projet existant

Avant toute modification :

- Lis les consignes du dépôt, son README, ses dépendances et scripts, son arborescence et ses fichiers de configuration utiles.
- Identifie le framework, le routage, les styles, les composants, la gestion des contenus et les intégrations déjà disponibles.
- Vérifie l’état des fichiers pour préserver le travail existant.
- Réutilise les conventions et composants du starter lorsque cela convient.
- N’invente pas les capacités de Jarvis Starter Kit : son contenu réel fait foi.
- Ne remplace pas le projet par un nouveau framework et n’effectue pas de mise à niveau majeure sans nécessité expliquée.
- Ne supprime pas de fonctions existantes sans rapport avec le site ; adapte la navigation publique pour ne pas exposer les écrans inutiles au visiteur.
- S’il n’existe aucun projet exploitable, demande où se trouve le starter avant de générer une seconde application à côté.

Présente brièvement ce que tu as trouvé et l’approche retenue, puis commence la réalisation. Ne demande pas une validation à chaque choix courant de mise en page. En cas d’information manquante, avance avec une solution réversible et consigne le point à compléter.

## 3. Contexte commercial essentiel

Synode conçoit et accompagne des **solutions IA sur mesure** pour indépendants, TPE et PME, sans niche sectorielle imposée.

- Une seule offre, qui peut combiner agents/assistants IA, automatisations, intégrations, outils métier, données et tableaux de bord.
- Quatre domaines pour illustrer cette offre : ventes et prospection ; opérations et administratif ; service client ; outils métier et connaissance interne.
- Ces domaines ne constituent pas quatre forfaits et ne limitent pas les demandes possibles.
- Ton technique mais accessible, concret, pragmatique, orienté vers le problème du client.
- Montrer les problèmes et cas d’usage avant la méthode sur l’accueil.
- Pas de prix public : création initiale, exploitation/maintenance définie au contrat, évolutions importantes sur devis.
- Premier échange gratuit recommandé de 30 minutes, sans engagement ; ne pas promettre un audit exhaustif gratuit.
- CTA principal : **« Réserver un échange gratuit »**.
- Phrase principale : **« Des solutions IA sur mesure, conçues autour de votre activité. »**
- Synode Prospect est un outil interne en construction, pas un produit SaaS disponible à l’achat.
- Facturation prévue via SmartBE. Ne pas inventer de statut de société ou de mentions légales.

La fiche contient aussi des décisions internes. Transforme-les en information utile au visiteur : ne publie pas les marges, tâches des associés, discussions administratives ou stratégie de projets gratuits.

## 4. Pages et navigation à réaliser

Implémente le détail des sections du README d’architecture pour chacune de ces routes, en adaptant leur implémentation au routeur existant :

| Route | Contenu attendu |
| --- | --- |
| `/` | Hero, problèmes, cas d’usage, offre, preuves disponibles, méthode, équipe, FAQ, CTA final |
| `/solutions` | Offre unique, briques possibles, domaines, livrables, dimensionnement, modèle économique, FAQ, contact |
| `/cas-usage` | Les huit exemples des références, regroupés en quatre domaines, avec bénéfices recherchés et prérequis |
| `/methode` | Étapes, participation du client, livrables, validation et suivi |
| `/realisations` | Outil interne, démonstrations disponibles et projets réels uniquement s’ils sont fournis |
| `/realisations/[slug]` | Gabarit et fiches réellement documentées, nature/statut du projet, parcours, limites et CTA |
| `/equipe` | Vision et présentation des deux associés avec les informations réellement disponibles |
| `/contact` | Formulaire et intégration Cal.com indépendamment accessibles |
| `/merci` | Confirmation d’une demande réellement enregistrée, sans confusion avec une réservation |
| `/mentions-legales` | Informations vérifiées et structure à compléter si nécessaire |
| `/confidentialite` | Traitements correspondant aux services effectivement implémentés |

Ajoute une page 404 utile. Respecte la navbar, le menu mobile et le pied de page du README. Le CTA principal mène à `/contact#reservation` ; les demandes écrites à `/contact#formulaire`.

Les CTA « J’ai un besoin similaire » préremplissent le contexte du formulaire sans empêcher sa modification. Conserve des liens et ancres utilisables ; pas de boutons sans effet ou de liens `#` factices.

## 5. Direction visuelle

Commence par exploiter la charte, les ressources et les choix déjà présents s’ils existent. Sinon, applique cette **direction proposée**, qui n’est pas une charte historique de Synode :

- Une esthétique de studio technologique sobre, précise et accueillante.
- Fond clair légèrement teinté, texte sombre et une couleur d’accent mesurée ; palette centralisée et facile à changer.
- Une hiérarchie typographique nette, des espaces généreux et des largeurs de lecture confortables.
- Des compositions variées : texte, parcours, schémas simples, exemples d’interfaces ; éviter d’empiler uniquement des cartes identiques.
- Des icônes cohérentes issues des ressources existantes, avec libellés compréhensibles.
- Des mouvements discrets, respectant la préférence de réduction des animations.
- Des visuels utiles à la compréhension des processus ; éviter les robots et illustrations génériques sans lien avec les services.

Si le logo manque, utilise un logotype typographique « Synode » facile à remplacer. Si les photos manquent, propose une composition textuelle élégante. N’invente pas de portraits, de captures de produits réels ou de résultats clients.

## 6. Rédiger les contenus

Rédige les textes commerciaux complets à partir des références : français naturel, phrases courtes, bénéfices concrets, exemples compréhensibles. Pas de lorem ipsum, de slogans interchangeables ou de jargon technique inutile.

Ne recopie pas les tableaux de consignes dans l’interface : transforme-les en pages lisibles. Les blocs d’accueil résument ; les pages dédiées approfondissent.

N’invente aucun client, témoignage, nom d’associé, chiffre de performance, certification, délai garanti, adresse, email, URL sociale ou numéro légal. Ne transforme pas les objectifs d’un exemple en résultats mesurés.

Pour les réalisations :

- Distingue explicitement « Outil interne », « Démonstration illustrative » et « Projet client ».
- Si aucune vraie capture ou vidéo n’est disponible, tu peux créer un scénario visuel avec données fictives, identifié comme illustration ; ne le présente pas comme une intégration IA déjà opérationnelle.
- N’annonce pas de démonstration interactive disponible si elle ne fonctionne pas.
- Prépare le gabarit et les zones de contenu pour que nous ajoutions les preuves réelles ensuite.

Centralise les informations à compléter dans un fichier de configuration/contenu adapté au projet. Documente les manques dans `docs/SITE_A_COMPLETER.md`. Évite les faux contenus publics destinés à les masquer. Les pages légales incomplètes doivent être identifiées comme brouillons en prévisualisation et figurer parmi les blocages avant publication.

## 7. Formulaire, Resend et conservation des demandes

Respecte les champs et états du README d’architecture. Au minimum : nom, email et besoin obligatoires ; entreprise, téléphone, site, échéance et budget facultatifs.

- Validation côté client pour le confort et côté serveur pour la fiabilité.
- Protection contre les abus adaptée à l’environnement, taille limitée des champs et prévention des doubles soumissions.
- Enregistrement durable de la demande avant confirmation de réception.
- Utilise le stockage déjà présent s’il est adapté ; sinon prépare une intégration clairement documentée, sans imposer un abonnement ou prétendre qu’un stockage temporaire suffit en production.
- Notification via Resend après enregistrement ; clés exclusivement côté serveur.
- Expéditeur sur domaine configuré et email du visiteur comme adresse de réponse.
- Une erreur de notification ne doit pas effacer une demande enregistrée ; prévoir reprise ou traitement explicite.
- Si le stockage échoue, montrer une erreur honnête et conserver le texte du visiteur.
- Prévoir chargement, succès, erreurs et reprise ; rendre ces messages accessibles.

**Sans configuration réelle, ne simule pas un envoi réussi.** Le site doit rester consultable localement, avec une indication claire d’indisponibilité pour cette fonction. Un mode de test éventuel doit être explicitement identifié et ne jamais s’activer silencieusement en production.

N’expose pas les données des demandes dans les pages, les journaux publics ou le navigateur. N’ajoute pas de newsletter ni de prospection automatique.

## 8. Réservation Cal.com

- Prépare une intégration configurable pour un premier échange de 30 minutes.
- Ajoute un lien direct de secours vers le même calendrier configuré.
- N’invente pas d’URL Cal.com, de disponibilités ou de confirmations.
- Si l’URL manque, conserve le formulaire accessible et explique simplement que la réservation n’est pas encore disponible dans la prévisualisation.
- Respecte la gestion du fuseau horaire fournie par le service.
- N’assimile jamais un clic sur le calendrier à un rendez-vous confirmé.
- Documente les réglages à effectuer dans Cal.com, sans prétendre les avoir modifiés depuis le code.

Le fonctionnement sans clés doit permettre d’examiner toutes les pages sans erreur bloquante.

## 9. Qualité technique et référencement

- Réutilise les composants, outils et dépendances installés ; ajoute seulement ce qui est nécessaire.
- Sépare raisonnablement composants réutilisables, contenus et intégrations.
- Ne développe pas un back-office, une authentification ou un système de paiement pour ce site vitrine.
- Prépare des variables de configuration documentées et un `.env.example` sans secret ; préserve les fichiers d’environnement existants.
- Prévois titres et descriptions propres, structure de titres logique, sitemap, robots et métadonnées de partage.
- Utilise le domaine réel seulement lorsqu’il est fourni ; n’invente pas de canonical de production.
- Exclue préproduction et pages de confirmation de l’indexation selon leur contexte.
- Assure navigation clavier, focus visible, contraste lisible, labels et réduction des animations.
- Optimise images et chargement des intégrations ; pas de vidéo lourde automatique.
- Prépare la compatibilité avec un déploiement Vercel si la stack le permet, sans modifier l’hébergement ou publier le site dans cette mission.
- Ne crée pas de compte, ne souscris pas d’offre et n’ajoute pas de suivi publicitaire par défaut.

## 10. Vérifications et livrables

Exécute les vérifications disponibles dans le dépôt : compilation, typage, analyse statique et tests pertinents. Corrige les erreurs introduites. Si tu peux ouvrir le site, contrôle les pages principales sur mobile et ordinateur. Sinon, indique que la vérification visuelle reste à faire.

Vérifie notamment :

- Chaque route, le menu mobile, les liens du footer et les ancres des CTA.
- La cohérence de l’offre unique et des quatre domaines.
- Le préremplissage modifiable du formulaire depuis les cas d’usage.
- Les champs invalides, doubles soumissions, erreurs de stockage et de notification.
- L’absence de faux succès lorsque les intégrations ne sont pas configurées.
- Le comportement de Cal.com configuré ou absent.
- L’absence de secrets, faux témoignages, liens inventés et promesses non étayées.

Livre :

1. Le site implémenté dans le dépôt existant.
2. `docs/SITE_INSTALLATION.md` : lancement local, variables, configuration des services, stockage et préparation du déploiement.
3. `docs/SITE_A_COMPLETER.md` : informations, ressources, clés et validations encore nécessaires, en distinguant ce qui bloque la publication de ce qui peut attendre.
4. Un résumé des pages réalisées, vérifications exécutées et limites restantes.

Conserve le README du starter ; complète la documentation du site dans les fichiers dédiés. Ne déclare pas le site prêt à recevoir des prospects tant que les coordonnées, mentions et intégrations nécessaires ne sont pas réellement configurées et vérifiées.

**Commence maintenant par lire les deux références et examiner le projet, puis réalise le site.**
