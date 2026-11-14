# Prompt Claude Design · Les illustrations de la page Coory (site Synode)

> **Pour Antonino, avant d'envoyer :**
> - Lance ce prompt dans le même projet Claude Design que **CooryDashboardLight** et **CooryDesktopMobile**, pour qu'il reprenne leur système visuel. Sinon, joins une capture de chacune (le hero de `/realisations/coory` et la carte du projet 02).
> - Joins les **3 captures de la page Nexus** (Vue d'ensemble, Discovery, Leads) : ce sont les références de cadrage.
> - Si tu joins des captures de l'app Coory : **aucun vrai nom** (ni le coach, ni ses sportifs) et **aucune image d'exercice RepDB** (licence).
> - Copie seulement ce qui est sous la ligne.

---

## Ce que je te demande

Six **illustrations animées** de l'application **Coory**, et rien d'autre. Pas de page, pas de titres, pas de textes de site : uniquement des écrans de l'app. Je les placerai moi-même dans la colonne de droite de la page « Coory » du site de mon agence, Synode, à côté de textes qui existent déjà.

Coory est une application web de coaching sportif pour les coachs. Elle regroupe :
- les fiches des sportifs ;
- les programmes d'entraînement (musculation, running, Hyrox, hybride) ;
- l'agenda ;
- une comptabilité simple ;
- les tâches ;
- un assistant IA qui propose des actions que le coach valide.

Seul l'espace coach existe aujourd'hui.

Chaque illustration répond à **un sous-titre précis** de la page. Elle montre ce que dit le texte en face, pas autre chose.

Avant de commencer, **pose-moi tes questions** si un point n'est pas clair. Puis fais **ILL-03 seule** et montre-la-moi pour valider la direction avant de faire les cinq autres.

## Le modèle : la page Nexus (captures jointes)

Les captures viennent de la page d'un autre projet du site, Nexus. À droite des textes, il y a des fenêtres du logiciel.

**Ce que tu reprends :**
1. **Une fenêtre d'application cadrée serré**, comme une capture. On voit une partie de l'écran, pas l'app entière, avec de gros éléments lisibles.
2. **Une fenêtre qui déborde** de la colonne d'un côté et se fait couper net. C'est le site qui coupe, pas toi : voir « Le format ».
3. **Les côtés alternent** d'une fenêtre à l'autre :
   - fenêtre coupée à droite : le menu est visible à gauche (captures « Vue d'ensemble » et « Leads ») ;
   - fenêtre coupée à gauche : le menu est caché, on voit le contenu et le haut droit de l'en-tête (capture « Discovery »).
4. **Une carte blanche flottante** posée sur certaines fenêtres, qui met en avant le geste clé. Exemple : la carte « Analyse IA » de la capture « Leads ».
5. **Une animation calme** qui montre l'outil en train de travailler : un texte qui se tape, une jauge qui avance, une ligne qui s'allume.

**Ce que tu ne reprends PAS :** les couleurs. Nexus est sombre, Coory est clair.

## Le style : celui de Coory

Reprends exactement le système de **CooryDashboardLight** (le hero de la page) et de **CooryDesktopMobile** : même police, mêmes couleurs, mêmes rayons, mêmes icônes, même logo, même menu.

**Rappel des valeurs :**
- **Police :** une seule, Plus Jakarta Sans, en 400, 500, 600 et 700. Jamais de police à chasse fixe.
- **Fonds et texte :**
  - fond de l'app `#F4F4F8` ;
  - cartes `#FFFFFF` avec une bordure `#ECECF2` ;
  - texte `#1C1C28`, texte secondaire `#6B6E7B`, texte discret `#9A9DAA`.
- **Violet `#7C5CFA`,** et violet clair `#F1EEFF` pour les fonds. À utiliser rarement : page active, Assistant IA, progression.
- **Action principale :** bouton noir `#16161F`, texte blanc.
- **Succès :** `#22A45D`, texte `#1F8A4C`, fond `#EAF8EF`.
- **Retard :** `#E0304A`.
- **Disciplines :** les valeurs de CooryDashboardLight.
  - Musculation `#E5384F`, Running `#6E7BF2`, Hyrox `#F2B23A` (texte `#C98A12`), Hybride `#16A79A`.
  - Toujours en pastille ou en petit filet, jamais en grand aplat.
- **Icônes :** SVG au trait, viewBox 24, trait de 1,8, bouts arrondis.
- **Logo :** le logo Coory (`coory-logo-light.png`) en haut du menu.

**Le menu de l'espace coach**, dans cet ordre, sans en inventer d'autres :
- Tableau de bord, Agenda, Sportifs, Programmes, Comptabilité, Bibliothèque ;
- puis, séparés : Assistant IA, Tâches, Documents, Notifications ;
- en bas du menu : « Samuel D. · Coach ».

**L'en-tête de page** est une carte :
- à gauche, l'icône et le titre de la page ;
- à droite, le bouton violet « Assistant IA », la cloche et le bouton noir « + Créer ».

Pour une page à l'intérieur d'une autre, le chemin tient sur une ligne : « ← Sportifs · Lucas J. ».

**Ce qui n'existe pas dans Coory, à ne jamais dessiner :**
- messagerie, bouton « Écrire au sportif », invitations, espace ou application du sportif ;
- factures, TVA ;
- champ de recherche dans l'en-tête ;
- synchronisation avec Google, iCloud ou Outlook.

## Les données : fictives, et cohérentes avec le hero

- **Coach :** Samuel D. Jamais un autre nom de coach.
- **Sportifs :** Lucas J., Emma R., Thomas V., Sarah M., Nora B. Toujours un prénom et une initiale.
- **Dates :** novembre 2026.
- **Montants :** au format français, « 120,00 € », « 3 856 € ».
- **Running :** durée toujours en minutes (« 80 min », jamais « 1 h 20 »). La durée est en gras, la plage de fréquence cardiaque en italique.
- **Musculation sur une carte :** au plus court, le mouvement et le volume en gras (« Squat 4 × 6 »).
- **Exercices :** jamais de photo ni de dessin. Si une vignette est nécessaire, un bloc gris neutre.
- **Langue :** tout le texte en français.

## Le format (le même que pour les deux illustrations précédentes)

**La scène**
- Une scène à taille fixe par illustration : **1220 × 640 px**, dessinée en pixels absolus.
- Le site la réduit d'un bloc (`transform: scale`). Elle s'affiche à environ 610 px de large sur ordinateur et 460 px sur téléphone.

**La fenêtre**
- **La scène est la fenêtre, bord à bord :** rayon de 32 px aux quatre coins, bordure de 1 px `#E6E6EE`, fond `#F4F4F8`.
- **Pas de fond autour, pas d'ombre portée.** La fenêtre sera posée sur un fond blanc (section Contexte) ou bleu très clair `#F1F6FD` (section Objectifs). Vérifie qu'elle se détache sur les deux.

**La coupe**
- **Dessine la fenêtre entière, c'est le site qui la coupe.** Elle déborde de 18 % de sa colonne. Environ **280 px de la scène sont cachés du côté indiqué** pour chaque illustration.
- Rien d'indispensable dans cette bande, ni dans les **60 px du bas**.

**Les tailles de texte**
- Elles suivent l'échelle des captures Nexus, au même rapport.
- Menu et texte courant : 19 à 22 px. Petits libellés : 16 px au minimum.
- Titres de page : 34 à 40 px. Grands chiffres : 40 à 48 px.

**L'animation**
- **Une seule horloge `t` (secondes) qui boucle.** Tout l'état visuel est une fonction pure de `t` (renderVals), comme dans CooryDashboardLight.
- Le site met l'illustration en pause hors écran : tu n'as pas à le gérer.
- **Mouvement calme :** fondus, glissements courts, texte qui se tape, jauges.
- Pas de rebond, pas de clignotement rapide. Un curseur de souris seulement le temps d'un clic, jamais à travers tout l'écran.
- **Fin de boucle = début de boucle**, sans saut visible. Un fondu doux de retour est accepté.
- Pour chaque illustration, indique l'**instant figé** utilisé sous `prefers-reduced-motion` : un instant où l'écran est complet et lisible.

## Les six illustrations

### Section « Le contexte de notre application Coory » (fond blanc)

Quatre fenêtres empilées, chacune en face de son bloc de texte, dans cet ordre.

#### ILL-03 · CooryContexteFiche
**En face de :** « Le contexte de notre application Coory ».

**Le texte en face :** un coach préparait ses programmes dans des tableurs. Il recopiait à la main les exercices, les dates, les allures et les charges, puis exportait chaque programme en PDF. Ses séances, ses sportifs et ses paiements vivaient dans des outils séparés. Coory rassemble tout dans une seule application.

**Le message de l'image :** tout ce qui concerne un sportif est enfin au même endroit.

**L'écran :** la fiche de Lucas J., menu visible à gauche avec « Sportifs » actif.
- En-tête : « ← Sportifs · Lucas J. ».
- Carte du sportif : initiales « LJ », pastilles « Running » et « Hyrox », objectif « Semi-marathon · 12 semaines ».
- Onglets : Profil, Programme, Séances, Paiements, Documents.

**La carte flottante :** « Repères », avec VMA 17 km/h, Allure 10 km 4:25 /km, Squat 1RM 110 kg.

**L'animation :** l'onglet actif passe de Programme à Séances, puis à Paiements, environ 4 s chacun. Le contenu change avec lui :
- Programme : « Prépa semi · semaine 4 / 12 » avec une jauge violette ;
- Séances : les 3 prochaines séances, avec leur pastille de discipline ;
- Paiements : « Encaissé 120,00 € » en vert, « À encaisser 60,00 € ».

La carte « Repères » flotte doucement, de ±4 px.

**Boucle :** 12 s. **Instant figé :** onglet Programme, complet. **Côté coupé :** droite.

#### ILL-04 · CooryParcoursProgramme
**En face de :** « Le parcours d'un programme avec Coory ».

**Le texte en face :** cinq étapes que le site fait défiler toutes les 2,6 s : Fiche du sportif, Programme sur mesure, Agenda des séances, PDF du programme, Suivi de l'activité.

**Le message de l'image :** un programme passe de la fiche du sportif au PDF sans aucune ressaisie.

**L'écran :** l'éditeur de programme, coupé à gauche, donc menu caché.
- En-tête : « ← Programmes · Prépa semi · Lucas J. ». En haut à droite : l'état « Brouillon », qui deviendra « Publié · v1 ».
- Bandeau des semaines : de S1 à S12, groupées en phases Base, Spécifique et Affûtage (teintes de violet clair). La semaine 4 est sélectionnée.
- Trois cartes de séance :
  - Séance 1 : « Footing **45 min** *Z2 · 135-150 bpm* » ;
  - Séance 2 : « Fractionné · Répéter 5 × (2 min vite + 2 min trot) » ;
  - Séance 3 : « Sortie longue **80 min** ».

**La carte flottante :** l'aperçu du PDF, « Prépa semi · Lucas J. · 12 semaines », avec une mini page en lignes grises.

**L'animation :** une boucle de **13 s en 5 temps de 2,6 s**, dans l'ordre des étapes du texte. Je dois pouvoir la caler sur le lecteur d'étapes de la page.

| Temps | Ce qui se passe |
|---|---|
| 1 · 0 à 2,6 s | Les allures se remplissent depuis les repères du sportif, avec une petite étiquette « depuis la fiche de Lucas J. ». |
| 2 · 2,6 à 5,2 s | Le bloc « Répéter 5 × » se construit dans la séance 2. |
| 3 · 5,2 à 7,8 s | Une notification apparaît : « 3 séances placées dans l'agenda ». |
| 4 · 7,8 à 10,4 s | Clic sur « Publier », l'état passe à « Publié · v1 » et la carte du PDF apparaît. |
| 5 · 10,4 à 13 s | La séance 1 se coche « Faite », en vert. |

**Instant figé :** fin du temps 4, programme publié et PDF visible. **Côté coupé :** gauche.

#### ILL-05 · CooryAgendaSemaine
**En face de :** « Ce que Coory fait aujourd'hui ».

**Le texte en face :** quatre lignes cochées une à une :
- les fiches des sportifs ;
- les programmes et leurs PDF ;
- l'agenda (séances individuelles, séances de groupe, rendez-vous, plusieurs par jour si besoin) ;
- les paiements, les sommes à encaisser, les dépenses et les tâches.

**Le message de l'image :** la semaine du coach, en un coup d'œil.

**L'écran :** la vue semaine de l'agenda, du lundi 16 au vendredi 20 novembre, menu visible à gauche avec « Agenda » actif.
- Cinq colonnes, les heures à gauche, une ligne « maintenant » violette.
- Des cartes de séance avec la pastille de leur discipline :
  - « Emma R. · Footing **45 min** » ;
  - « Thomas V. · **Squat 4 × 6** » ;
  - une séance de groupe, « Circuit Hyrox · Collective · 4 inscrits » ;
  - un rendez-vous, « Bilan · Sarah M. » ;
  - un jour avec deux séances, marquées « Matin » et « Soir ».

**La carte flottante :** « Tâches du jour », avec trois tâches :
- « Relancer le paiement de Lucas J. » ;
- « Préparer le circuit du samedi » ;
- « Appeler Nora B. ».

**L'animation :** une nouvelle séance glisse dans sa case avec l'étiquette « ajoutée ». La ligne « maintenant » avance légèrement, une tâche se coche, la carte flotte.

**Boucle :** 10 s. **Instant figé :** semaine pleine, une tâche cochée. **Côté coupé :** droite.

#### ILL-06 · CooryAssistantIA
**En face de :** « Comment l'IA assiste le coach au quotidien ».

**Le texte en face :** l'assistant intégré ajoute une séance, crée une tâche, retrouve une information ou prépare un brouillon de programme à partir d'une simple demande. Il propose, il ne décide pas. Chaque action préparée par l'assistant est relue et validée par le coach avant d'être enregistrée.

**Le message de l'image :** l'assistant prépare, le coach valide.

⚠ Le hero de la page montre déjà l'assistant qui crée une séance et une relance depuis le tableau de bord. Ici, montre un autre geste : **le brouillon de programme, et surtout l'étape de validation**.

**L'écran :** la page Assistant IA, coupée à gauche. L'en-tête est visible à droite, avec le bouton violet « Assistant IA » allumé.
- La demande du coach : « Prépare un brouillon de programme 10 km pour Emma R., 3 séances par semaine sur 8 semaines. »
- La réponse de l'assistant : « Proposition prête. Rien n'est enregistré sans validation. »

**La carte flottante :** la carte d'action.
- « Brouillon de programme · 10 km · Emma R. · 8 semaines · 3 séances / semaine ».
- L'étiquette « À valider ».
- Les boutons « Modifier » (secondaire) et « Valider » (noir).

**L'animation :**
1. La demande se tape, en 2,5 s environ.
2. Trois points s'affichent : « Coory prépare… ».
3. La carte d'action apparaît.
4. Clic sur « Valider » : l'étiquette passe à « Validé par le coach » en vert, et le lien « Ouvrir le brouillon » apparaît.

**Boucle :** 12 s. **Instant figé :** la carte affichée, encore « À valider », avec ses deux boutons. **Côté coupé :** gauche.

### Section « Ce que nous cherchons à obtenir avec Coory » (fond bleu très clair `#F1F6FD`)

Deux fenêtres, dans cet ordre.

#### ILL-07 · CooryComptabilite
**En face de :** « Ce que nous cherchons à obtenir avec Coory ».

**Le texte en face :** trois objectifs :
- réduire le temps passé à préparer et à mettre en page chaque programme ;
- retrouver en un instant les séances, les sportifs et les paiements, au même endroit ;
- supprimer les ressaisies entre tableurs, documents PDF et suivi des paiements.

**Le message de l'image :** plus de ressaisie. Une séance faite devient d'elle-même une somme à encaisser.

**L'écran :** la Comptabilité, menu visible à gauche avec « Comptabilité » actif.
- Trois tuiles : « Encaissé ce mois-ci 3 856 € », « À encaisser 180,00 € », « Dépenses 95,00 € ».
- Une liste « À encaisser », avec des lignes comme « Séance · Thomas V. · 12 nov. · 60,00 € » et la mention discrète « depuis l'agenda ».

**La carte flottante :** une petite notification, « Séance faite · Lucas J. · ajoutée à “À encaisser” ».

**L'animation :**
1. La notification arrive.
2. Une ligne « Séance · Lucas J. · 60,00 € » entre dans la liste, et « À encaisser » passe à 240,00 €.
3. Clic sur « Encaissé » sur cette ligne : elle sort de la liste.
4. « Encaissé ce mois-ci » passe de 3 856 € à 3 916 €, et « À encaisser » revient à 180,00 €.

**Boucle :** 12 s. **Instant figé :** juste après l'encaissement. **Côté coupé :** droite.

#### ILL-08 · CooryValidationCoach
**En face de :** « Limites et validation humaine ».

**Le texte en face :**
- les données des sportifs restent privées, séparées d'un coach à l'autre ;
- l'IA ne prescrit aucun entraînement : chaque programme, chaque séance et chaque envoi restent décidés par le coach.

**Le message de l'image :** c'est toujours le coach qui décide et qui publie.

**L'écran :** le programme « Prépa 10 km · Emma R. », coupé à gauche, avec un panneau « Historique des versions » :
1. « Brouillon préparé par l'assistant IA », en violet, avec l'icône étincelle ;
2. « Allures ajustées par Samuel D. » ;
3. « Publié par Samuel D. · version 1 », en vert.

En bas de l'écran, une mention discrète avec une icône cadenas : « Espace privé du coach ».

**La carte flottante :** une fenêtre de confirmation.
- « Publier ce programme ? Les PDF seront créés à partir de cette version. »
- Les boutons « Annuler » et « Publier ».

**L'animation :**
1. Les lignes 1 et 2 de l'historique arrivent une à une.
2. La fenêtre de confirmation apparaît.
3. Clic sur « Publier » : la fenêtre se ferme, la ligne 3 s'ajoute en vert.

**Boucle :** 10 s. **Instant figé :** historique complet, sans la fenêtre. **Côté coupé :** gauche.

## Ce que tu me livres

Comme pour CooryDashboardLight et CooryDesktopMobile :

1. **Un Design Component (`.dc.html`) par illustration :**
   - styles 100 % en ligne ;
   - une horloge `t` ;
   - `renderVals()` pure.
2. **Une planche de contrôle** qui montre les six fenêtres comme sur le site :
   - réduites à 610 px de large ;
   - coupées par une colonne de 516 px, du côté indiqué ;
   - empilées dans l'ordre (ILL-03 à ILL-06 sur fond blanc, ILL-07 et ILL-08 sur fond `#F1F6FD`).
3. **Le même dossier de passation que la dernière fois** (`CLAUDE_DESIGN_TO_CODE_HANDOFF`) :
   - les documents 01 à 16 ;
   - `source/*/logic.original.js`, `template.original.html` et `support.js` ;
   - une fiche par composant, de ILL-03 à ILL-08.

   Pour chaque illustration, indique : la scène, la durée de boucle, le type d'horloge, l'instant figé, le côté coupé et la chronologie détaillée.

## À vérifier avant de livrer

- Six scènes de 1220 × 640 px : fenêtre bord à bord, rien autour des coins arrondis, pas d'ombre.
- Rien d'indispensable dans les 280 px du côté coupé, ni dans les 60 px du bas.
- Chaque texte tient sur sa ligne : pas de retour à la ligne imprévu, rien qui déborde de sa carte.
- Lisible une fois réduit à 460 px de large (taille téléphone).
- Aucun vrai nom : seulement Samuel D. et les cinq sportifs fictifs. Aucune image d'exercice.
- Rien de la liste « Ce qui n'existe pas dans Coory ».
- Running en minutes partout.
- Chaque boucle revient à son début sans saut.
- Les quatre fenêtres de la section Contexte ne se répètent pas entre elles, ni avec le hero : une idée par fenêtre.
