# Synode — site vitrine

**En ligne sur [synode-agency.com](https://synode-agency.com)** depuis le
19/10/2026, hébergé sur Netlify (offre gratuite) depuis le 11/11/2026. Chaque
`git push` sur `main` redéploie le site, sauf un commit qui ne touche que la
documentation (voir `netlify.toml`).

Next.js 16, React 19, Tailwind 4, TypeScript. Bilingue : FR à la racine, EN sous `/en`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # avant de pousser : build, types et lint doivent passer sans rien dire
```

Depuis un téléphone : `http://<ip-du-mac>:3000`.

| Où | Quoi |
| --- | --- |
| `src/lib/content.ts` | Tout le texte du site, FR + EN, pages légales comprises (bloc `legal`) |
| `src/app/api/contact/route.ts` | Réception du formulaire de contact |
| `src/lib/contact-store.ts` | Où vont les demandes (dépôt + notification par e-mail) |
| `src/lib/ack-email.ts` | L'accusé de réception envoyé au prospect (texte + HTML, avec la signature). Images dans `public/email/` |
| `src/components/site/booking.tsx` | La réservation : Cal.com si configuré, sinon l'aperçu factice |
| `src/app/globals.css`, `src/app/studio.css` | La mise en page et les animations |
| `.env.example` | Les variables d'environnement, avec ce que chacune déclenche |
| `DESIGN-SYSTEM.md` | Les décisions de design, à lire avant de toucher à la mise en page |

## Le dépôt

Le projet vit dans `Synode-agency/Synode-agency`, dépôt **public** de l'organisation
GitHub (`origin`). ⚠ Il doit le rester tant que le site est sur l'offre
gratuite de Netlify : elle ne peut pas se brancher sur un dépôt **privé
d'organisation**. Le rendre privé coupe les déploiements automatiques. L'ancien dépôt personnel `Killian-Sn/Synode-agency` reste
joignable en local sous le remote `killian`, il n'est plus la référence.

Une seule branche, `main`. Les versions précédentes sont retrouvables par tag :

| Tag | Ce que c'est |
| --- | --- |
| `v3-architecture` | Architecture Services/FAQ/Équipe, avant la passe de cohérence visuelle |
| `v2-clair-desktop` | La refonte claire, desktop terminé le 23/09/2026 |
| `v2-dark-archivo` | L'étape intermédiaire, typo Archivo |
| `v1-fastonweb` | La version « fastonweb » |
| `v0-dark` | Le design sombre bleu électrique d'origine |

`git checkout <tag>` pour revoir une version, `git checkout main` pour revenir.
Ne jamais ramener `main` en arrière : chaque refonte a été construite par-dessus
la précédente, l'historique contient déjà tout.

---

## Ce qu'il reste à faire (au 12/11/2026)

Le formulaire et la réservation sont en service depuis le 12/11/2026. Il
reste les **pages légales**, qui affichent encore « Brouillon » au public :
elles attendent les informations de SmartBE, pas du code.

### 1. Le formulaire de contact : EN SERVICE depuis le 12/11/2026

Chaque demande est enregistrée comme contact dans une liste Brevo, puis
Brevo envoie la notification à `contact@synode-agency.com` et un accusé de
réception au prospect. Voir `src/lib/contact-store.ts`. Si un réglage manque
un jour chez l'hébergeur, le formulaire dit honnêtement qu'il n'est pas
activé au lieu d'afficher un faux succès.

- [x] Brevo (compte `contact@synode-agency.com`, séparé de celui de BEHYBRID) :
      liste « Demandes Synode » créée, **n° 2** (`BREVO_LIST_ID=2`)
- [x] Attributs de contact créés le 12/11/2026, type Texte : `NOM`, `DEMANDE`,
      `DATE_DEMANDE`, `LANGUE`, `ENTREPRISE`, `TELEPHONE_DEMANDE`, `SITE_WEB`,
      `ECHEANCE`, `BUDGET`, `CAS_USAGE` (sans eux, le contact est quand même
      enregistré, mais sans le texte de sa demande)
- [x] Domaine `synode-agency.com` authentifié dans Brevo (11/11/2026) : code
      Brevo, DKIM `brevo1`/`brevo2`, redirections `r.mail` et `img.mail`,
      enregistrement de marque, et le DMARC existant complété par
      `rua=mailto:rua@dmarc.brevo.com` (un seul DMARC, ne jamais en ajouter un 2e)
- [x] Réglages saisis chez Netlify le 12/11/2026 : `SYNODE_STORE=brevo`,
      `BREVO_API_KEY`, `BREVO_LIST_ID`, `CONTACT_FROM`, `CONTACT_TO` (voir
      `.env.example`). La clé ne va **jamais** dans le dépôt ni dans le chat.
      Un réglage changé chez Netlify ne s'applique qu'au déploiement suivant
- [x] Clé API **`site-synode2`** (13/11/2026) : accès **restreint** (Emails
      transactionnels + contact, rien d'autre), sans expiration. Elle remplace
      `site-synode`, exposée dans une capture d'écran le 12/11. Pour changer de
      clé sans casser le formulaire : nouvelle clé → `.env.local` et Netlify →
      déploiement → vérifier dans l'historique d'un contact Brevo quelle clé l'a
      ajouté → seulement alors supprimer l'ancienne
- [x] Test local réussi le 12/11/2026 : notification reçue sur `contact@`,
      accusé de réception reçu par le « prospect », aucune erreur Brevo
- [x] Accusé de réception mis en forme (12/11/2026), FR et EN, dans
      `src/lib/ack-email.ts`. La signature est **une seule image**, comme dans
      le Gmail de Synode : `public/email/signature-fr.png` et
      `signature-en.png` (1178 × 316, affichées en 440 px). Pour la changer :
      remplacer ces deux fichiers, puis déployer (15 crédits). L'e-mail ne doit
      JAMAIS reprendre ce que le visiteur a tapé (voir l'en-tête du fichier)
- [ ] Tester un vrai envoi depuis un téléphone, sur le site en ligne, et
      vérifier l'accusé dans Gmail, Outlook/Hotmail et en mode sombre
- [ ] Tous les 12 mois : supprimer dans Brevo les demandes de plus de 12 mois
      après le dernier échange (c'est ce que promet la page Confidentialité)

### 2. La réservation Cal.com : EN SERVICE depuis le 12/11/2026

Testée au navigateur (11/11/2026) avec
`synode-agency-k4c8xl/30min` : l'agenda ne se charge **qu'au clic**, sur les
quatre emplacements, et la carte dit avant le clic que l'agenda est fourni par
Cal.com. Le site reste ainsi sans cookie et sans bandeau.

- [x] `NEXT_PUBLIC_CAL_LINK=synode-agency-k4c8xl/30min` saisi chez Netlify le
      12/11/2026. La valeur est lue à la construction du site : la changer
      demande un redéploiement
- [ ] Tester une vraie réservation depuis un téléphone sur le site en ligne

> ⚠ La variante `/embed` de Cal.com reste blanche dans un cadre sans leur
> script `embed.js` : le site charge la page de réservation normale. Ne pas
> y revenir.

### 3. Les pages légales : rédigées, en attente de Smart

Mentions légales et Politique de confidentialité, FR et EN, **entièrement
rédigées le 12/11/2026** (art. XII.6 CDE, art. 13 RGPD). Le texte vit dans
`src/lib/legal-content.ts`. Tout ce qui reste à confirmer est **entre
crochets** et affiché en évidence, sous l'encadré « Brouillon ». La liste
complète, avec les sources et les questions pour Smart : **`LEGAL_TODO.md`**.

- [x] Responsables du site et responsables conjoints du traitement : Killian
      Schoebben et Antonino Lo Bianco, rue des Alcyons 86, 1082 Bruxelles
- [x] Hébergeur, prestataires (Brevo, Netlify, Cal.com, Hostinger, Google),
      transferts, 12 mois de conservation, droits, plainte à l'APD, cookies
- [x] Pied de page : « Mentions légales » et « Politique de confidentialité »
- [ ] **Smart** : entité contractante, dénomination, siège, BCE, TVA,
      formulation, rôle dans le traitement des données (voir `LEGAL_TODO.md`)
- [x] Brevo : anonymisation du suivi des e-mails transactionnels activée (12/11/2026)
- [ ] Retirer l'encadré « Brouillon » une fois tous les crochets remplis

### 4. Mesurer l'audience et le référencement

Aucune mesure n'est branchée : on ne sait ni combien de visiteurs viennent, ni
si Google indexe le site.

- [ ] Google Search Console : vérifier le domaine, soumettre `sitemap.xml`
- [ ] Bing Webmaster Tools : importer depuis la Search Console
- [ ] Statistiques de visite sans cookie : Plausible ou équivalent (l'analytique
      de Netlify est payante).
      Google Analytics imposerait une bannière de consentement.

### 5. L'hébergement : Netlify, offre gratuite (en ligne depuis le 11/11/2026)

> Décision du 11/11/2026 : l'offre gratuite de Vercel (Hobby) interdit l'usage
> commercial, et un site d'agence en est un. Le site passe sur l'offre gratuite
> de Netlify, qui l'autorise et prend en charge Next.js 16.

- [x] Projet Netlify `synode-agency` créé depuis `Synode-agency/Synode-agency`
      (11/11/2026), adresse de secours https://synode-agency.netlify.app.
      Aucune variable d'environnement : Vercel n'en avait aucune non plus.
      Elles s'ajouteront avec l'activation de Brevo et de Cal.com (voir 1 et 2)
- [x] DNS chez Hostinger (11/11/2026) : seules deux lignes ont changé,
      `A @` → `75.2.60.5` et `CNAME www` → `synode-agency.netlify.app`.
      MX, SPF, DMARC et `google-site-verification` intacts
- [x] HTTPS Let's Encrypt émis par Netlify (11/11/2026), renouvelé
      automatiquement. `www` et `http` redirigent vers `https://synode-agency.com`
- [x] Page 404 (`global-not-found`) vérifiée chez Netlify, FR et EN
- [x] Badge « Powered by Netlify » désactivé (13/11/2026, Project configuration ›
      General). Netlify l'injectait d'office (script `/.netlify/scripts/hud`, qui
      écrit dans le `localStorage` du visiteur). Vérifié : plus aucune trace dans
      les pages. S'il revenait, le désactiver au même endroit
- [x] **Le domaine `synode-agency.be`** redirige vers le .com depuis le
      13/11/2026 (il pointait encore vers Vercel, qui répondait
      « DEPLOYMENT_NOT_FOUND »). `synode-agency.be` et `www` sont des alias
      Netlify ; DNS du **.be** chez Hostinger : `A @` → `75.2.60.5`,
      `CNAME www` → `synode-agency.netlify.app`. Certificat Let's Encrypt
      commun aux 4 noms. Redirection 301 page comprise dans `netlify.toml`
- [ ] **À partir du 13/11/2026**, si rien n'a cassé : retirer le domaine du
      projet Vercel (Settings › Domains), puis supprimer ce projet. D'ici là,
      revenir en arrière = remettre chez Hostinger `A @` → `216.198.79.1` et
      `CNAME www` → `cf6cfc97a75077e8.vercel-dns-017.com`

> ⚠ **Le budget de l'offre gratuite : 300 crédits par mois.** Une mise en
> production coûte 15 crédits, 1 Go de trafic 20, 10 000 requêtes 2. Si le
> compteur tombe à zéro, **le site est mis en pause** jusqu'au mois suivant
> (page « Site not available »). Donc : grouper les modifications avant de
> pousser sur `main`, ne pas pousser dix petits commits d'affilée, et
> regarder Netlify › Usage de temps en temps. Netlify prévient à 50, 75 et
> 100 %.

---

## Fait

- [x] **Mise en ligne** (19/10/2026) : domaine relié, HTTPS, `www` et `http`
      redirigés, anciennes adresses redirigées, `sitemap.xml`, `robots.txt`,
      `hreflang`, `canonical` sur chaque page
- [x] **E-mail** `contact@synode-agency.com` chez Hostinger, avec MX, SPF, DKIM et DMARC
- [x] **Image de partage** sur toutes les pages, FR et EN (11/11/2026). Une page
      qui déclare son propre `openGraph` doit avoir son `opengraph-image.tsx` :
      voir `src/lib/og-image.tsx`
- [x] **Page 404** du site pour toute adresse inconnue, en français à la racine et
      en anglais sous `/en` (11/11/2026). Voir `src/app/global-not-found.tsx`
- [x] **Démo Nexus** : les entreprises, personnes et adresses e-mail réelles
      issues de la prospection ont été remplacées par des noms inventés
      (11/11/2026). Ne jamais y remettre de vraies données : c'est une page publique
- [x] **Erreur React #418** corrigée (11/11/2026) : le mois du calendrier de démo
      n'est plus gravé au déploiement, il est lu dans le navigateur
- [x] Revue de code et de sécurité (17/10/2026), Next.js passé en 16.3.8,
      `npm audit --omit=dev` : 0 vulnérabilité
- [x] Revue graphique de toutes les pages, FR/EN, bureau et téléphone (17/10/2026)

## Dette technique

- [x] Clés de contenu orphelines de `content.ts` supprimées (17/10/2026)
- [x] CSS mort retiré (17/10/2026) : 83 classes, 38 `@keyframes`, l'ancien système
      `.reveal` et les entrées mortes des listes `:is()`, vérifié au navigateur sur toutes les pages
- [x] Deux commentaires non fermés dans `studio.css` avalaient ~150 lignes de
      règles mortes : retirés, rendu inchangé
- [ ] Pas de Content-Security-Policy : à écrire une fois Cal.com et le formulaire
      branchés, quand on saura exactement ce qui est chargé
- [ ] 9 alertes `npm audit` dans l'outil `shadcn` (développement seulement, jamais
      livré). Ne pas lancer `npm audit fix --force` : il rétrograderait `shadcn` en 1.0
- [x] `build`, `tsc --noEmit` et `eslint` passent tous les trois sans rien dire : les garder ainsi

## À tenir dans la durée

Deux réponses de la FAQ nous engagent : le **délai de 4 semaines minimum**, et le
fait que les **modèles d'IA ne soient pas entraînés sur les données client**,
vrai uniquement sur les offres professionnelles payantes.

La politique de confidentialité doit toujours lister les prestataires
**réellement** branchés : si le dépôt des demandes change, la page change avec.
