# Ce qui manque avant la mise en ligne

Version du 28 septembre 2026.

Ce fichier liste tout ce que le site attend et que le code ne peut pas
inventer. Il est séparé en deux : ce qui **bloque** la publication, et ce
qui peut attendre.

Tout ce qui est marqué bloquant apparaît **en clair sur le site**, dans un
encadré visible. C'est délibéré : un emplacement réservé qu'on ne voit pas
est un emplacement qu'on oublie de remplir.

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

Elle présente les rôles sans les personnes. Manquent :

- les noms complets des deux associés ;
- des photos réelles (pas de portrait générique : l'initiale composée qui
  s'affiche aujourd'hui est un emplacement assumé) ;
- les liens LinkedIn, s'ils existent.

### Les réalisations

La page ne contient qu'une entrée, **Synode Prospect**, et elle dit son
état réel. Manquent :

- ce que l'outil fait réellement aujourd'hui (le champ `does` est vide) ;
- des captures réelles ;
- une ou deux démonstrations avec données fictives, identifiées comme
  telles.

Un projet client ne s'ajoute qu'après livraison **et** accord écrit.

Quand une démonstration existe, renseigner son slug dans le champ `demo` du
cas d'usage concerné, dans `src/lib/use-cases.ts` : la carte devient
cliquable toute seule, sans toucher au composant.

### La réservation Cal.com

Sans `NEXT_PUBLIC_CAL_LINK`, la page Contact dit que la réservation n'est
pas encore disponible et renvoie au formulaire. À faire **dans Cal.com**,
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
