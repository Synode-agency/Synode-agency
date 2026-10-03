# Ce qui manque avant la mise en ligne

Version du 3 octobre 2026 (mise à jour du soir). Architecture et offre alignées ; recette visuelle et prérequis de publication encore à terminer.

Ce fichier liste tout ce que le site attend et que le code ne peut pas
inventer. Il est séparé en deux : ce qui **bloque** la publication, et ce
qui peut attendre.

Tout ce qui est marqué bloquant apparaît **en clair sur le site**, dans un
encadré visible. C'est délibéré : un emplacement réservé qu'on ne voit pas
est un emplacement qu'on oublie de remplir.

---

## Offre et architecture : état de la recette

- [x] Six familles exactes en FR/EN sur l’accueil et Solutions, avec exemples et visuels correspondants.
- [x] Six pages détaillées par langue : définitions, scénarios, prérequis, compléments et FAQ spécifiques.
- [x] Liens des cartes, liens de langue, métadonnées et sitemap contrôlés sur les HTML de production.
- [x] Navigation : Accueil / Solutions / Cas d’usage / Réalisations / Équipe / Contact et CTA vers le calendrier.
- [x] Accueil : hero / cas d’usage simplifiés / solutions IA / impact opérationnel / fiabilité et contrôle / méthode / projets et démos / FAQ / CTA, conformément à l’architecture actuelle. L’Équipe reste sur sa page dédiée.
- [x] Accueil : titre, H1, textes, liens, métadonnées FR/EN et données structurées orientés vers les recherches IA sur mesure, agents IA et automatisation à Bruxelles et en Belgique.
- [x] Solutions : exemple de combinaison et exploitation, maintenance et monitoring présentés comme continuité récurrente, sans septième famille.
- [x] Synode Prospect : statut d’outil interne et parcours envisagé visibles, sans résultat ni capture inventés.
- [x] Page Cas d’usage disponible en FR/EN, hero illustré, grille et impact opérationnel intégrés, puis ajoutée au sitemap ; ancienne route Méthode redirigée en 308 vers la section d’accueil.
- [x] Les six familles sont présentes et la présentation actuelle est validée. Ne pas modifier leur design sans demande explicite.
- [x] ESLint, TypeScript et compilation Webpack réussis ; 44 pages et routes pré-rendues.
- [x] Menu Solutions ouvert au clic et contrôlé visuellement sur ordinateur.
- [ ] Recette clavier complète (Échap, focus, clic extérieur, navigation), mobile et bilingue dans le navigateur. Les comportements sont implémentés mais les essais ont été interrompus par l’utilisation simultanée de Chrome.
- [ ] Contrôle du hero à 1280 × 800, 1440 × 900 et 1366 × 768 CSS, puis mobile et zoom. Ces dimensions sont des cibles de recette, pas des tailles déjà validées.
- [ ] Vérification visuelle de la réduction des animations. La règle CSS statique est intégrée.
- [x] Heroes des six pages principales harmonisés sur un gabarit unique : un seul H1 par page, zéro saut de niveau de titre, même classe et même grille confirmés dans le HTML de production FR et EN.
- [x] Impact opérationnel en bloc éditorial, cards Usages détachées du gris neutre, titres de section élargis et filet supprimé entre Solutions et Impact.
- [ ] Contrôle visuel des six heroes côte à côte sur desktop, tablette et mobile : même hauteur de départ, même taille de H1, même rythme vertical, et illustration jamais plus haute que le bloc de texte sur mobile. Les règles responsive sont écrites, aucun navigateur n'est pilotable depuis le projet.
- [x] Premier outil interactif en ligne : diagnostic du potentiel IA, FR et EN, calcul déterministe côté navigateur, aucune donnée enregistrée.
- [ ] Contrôle visuel de la section Réalisations et de la page du diagnostic : proportions, cadrage de la capture Nexus et lisibilité du questionnaire. Aucun navigateur n'est pilotable depuis le projet.
- [ ] Décider si « Synode Prospect » devient « Nexus » partout : le titre affiché a changé, mais la documentation et le slug `/realisations/synode-prospect` disent encore l'ancien nom.
- [ ] Arbitrage sur `team.title`, `team.kicker`, `contact.title`, `contact.kicker` et `work.intro.title`/`kicker` : plus lues depuis que les H1 des heroes sont écrits dans les composants. À supprimer de `content.ts` et `work.ts`, ou à réutiliser.

Les contraintes commerciales et techniques de publication ci-dessous restent applicables. Aucune capture ou référence client supplémentaire n’a été inventée : l’accueil présente uniquement Synode Prospect avec son statut actuel.

### SEO local restant

- [ ] Créer ou vérifier la fiche Google Business Profile de Synode avec les informations réellement validées.
- [ ] Connecter le domaine définitif à Google Search Console et soumettre le sitemap après publication.
- [ ] Valider les données structurées avec le Rich Results Test sur le domaine publié.
- [ ] Ajouter une adresse, un téléphone, des profils sociaux ou un balisage `LocalBusiness` uniquement après confirmation de ces informations.

---

## Bloquant : ne pas publier sans

### 1. Le dépôt des demandes de contact

**Le formulaire ne peut rien enregistrer aujourd'hui.** Sans dépôt, l'API
répond 503 et le site affiche honnêtement que l'envoi n'est pas activé.
Personne ne reçoit de faux succès, mais personne ne peut vous écrire non
plus.

Il faut choisir un dépôt et le brancher dans `src/lib/contact-store.ts` :

| Option | Ce qu'elle vaut |
| --- | --- |
| `SYNODE_STORE=file` | Écrit un fichier JSON Lines. **Ne fonctionne pas sur Vercel**, dont le disque est en lecture seule. Convient au développement et à un serveur avec disque persistant. |
| Base de données | La solution durable. Ajouter un cas dans `saveRequest`. |
| Table externe ou CRM | Acceptable si l'accès est fiable et que la panne est visible. |

**Ne pas publier en comptant sur l'email seul.** Une notification n'est pas
un enregistrement : si elle se perd, la demande est perdue avec elle et le
visiteur croit avoir été entendu.

### 2. Les mentions légales

La page existe, elle est marquée **brouillon** et elle ne contient aucune
information inventée. À confirmer **avec SmartBE** :

- l'identité juridique exacte à faire figurer ;
- l'adresse du siège ;
- le numéro d'entreprise et le numéro de TVA ;
- le nom et l'adresse de l'hébergeur, une fois le déploiement décidé.

Ne pas présenter Synode comme une société juridiquement constituée sans
cette confirmation.

### 3. La politique de confidentialité

Même statut. Elle doit correspondre **exactement** aux prestataires
réellement branchés au moment de la mise en ligne. À décider :

- la durée de conservation des demandes, puis l'annoncer ;
- la liste définitive des prestataires (le dépôt choisi, Resend, Cal.com).

### 4. L'adresse email

`contact@synode-agency.com` est utilisée partout dans le site. **À
confirmer qu'elle existe et qu'elle est relevée.** Elle se change à un seul
endroit, `site.email` dans `src/lib/content.ts`.

### 5. Le nom de domaine

`src/lib/site-url.ts` porte l'URL canonique. Tant que le domaine n'est pas
décidé, les balises canoniques et le sitemap pointent vers une valeur
provisoire.

---

## Important, mais ne bloque pas la publication

### La page Équipe

Les portraits fournis (`public/equipe/AntoEquipe.webp` et `KillianEquipe.webp`) sont intégrés. Les titres et descriptions des cards reprennent [la page publiée](https://synode-agency.vercel.app/equipe) : Antonino conçoit les workflows et agents ; Killian développe les applications, outils internes et intégrations. Les deux sont présentés comme cofondateurs, développeurs et experts IA, conformément à cette source.

Restent à fournir si souhaités : noms complets et liens LinkedIn. Aucun lien ni nom supplémentaire n’a été inventé.

### Les réalisations

La page ne contient qu'une entrée, **Synode Prospect**, et elle dit son
état réel. La priorité business est maintenant de construire les preuves plutôt que de refaire le design. Manquent :

- ce que l'outil fait réellement aujourd'hui (le champ `does` est vide) ;
- des captures réelles ;
- une ou deux démonstrations avec données fictives, identifiées comme
  telles ;
- une démo “gestion intelligente des emails” ou équivalente ;
- une démo “Knowledge Assistant” ou équivalente.

Un projet client ne s'ajoute qu'après livraison **et** accord écrit.

Quand une démonstration existe, renseigner son slug dans le champ `demo` du
cas d'usage concerné, dans `src/lib/use-cases.ts` : la carte devient
cliquable toute seule, sans toucher au composant.

### La réservation Cal.com

Sans `NEXT_PUBLIC_CAL_LINK`, la page Contact affiche un aperçu interactif explicitement fictif : mois, date et heure peuvent être explorés, sans réserver ni envoyer de données. Un lien renvoie au formulaire pour un vrai contact. Une fois le lien configuré, le calendrier réel remplace cet aperçu et se charge au clic. À faire **dans Cal.com**,
pas dans le code :

- créer l'événement « Premier échange Synode : 30 minutes » ;
- connecter l'agenda de l'associé référent ;
- régler le fuseau sur Europe/Brussels ;
- poser un délai minimum de réservation et un tampon entre rendez-vous ;
- limiter les questions à : nom, email, activité, besoin en une phrase ;
- vérifier que la confirmation contient le lien de visioconférence.

Le forfait gratuit couvre **un** utilisateur. Une réservation qui
coordonnerait les agendas des deux associés demande une offre adaptée : ne
pas la promettre avant de l'avoir vérifiée.

### La notification email

Sans `RESEND_API_KEY`, `CONTACT_FROM` et `CONTACT_TO`, les demandes sont
enregistrées mais aucune notification ne part. Le serveur le journalise. À
faire : vérifier le domaine d'envoi dans Resend, sans quoi les messages
partiront en indésirables.

---

## Points à surveiller, sans action immédiate

**La limitation anti-abus est en mémoire.** Elle arrête un envoi répété
depuis un navigateur et rien de plus : plusieurs instances ne la partagent
pas. Pour une protection réelle, un compteur partagé ou le pare-feu de
l'hébergeur.

**Le nom du paquet** est encore `99gates-landing` dans `package.json`,
vestige du gabarit d'origine.

**Aucune mesure d'audience n'est installée.** L'architecture demande de
suivre demandes reçues, rendez-vous réservés et rendez-vous qualifiés.
Rien n'a été ajouté par défaut : c'est une décision qui touche à la vie
privée et elle vous revient.
