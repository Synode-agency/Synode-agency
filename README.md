# Synode — site vitrine

**En ligne sur [synode-agency.com](https://synode-agency.com)** depuis le
19/10/2026, hébergé sur Vercel. Chaque `git push` sur `main` redéploie le site.

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
| `src/components/site/booking.tsx` | La réservation : Cal.com si configuré, sinon l'aperçu factice |
| `src/app/globals.css`, `src/app/studio.css` | La mise en page et les animations |
| `.env.example` | Les variables d'environnement, avec ce que chacune déclenche |
| `DESIGN-SYSTEM.md` | Les décisions de design, à lire avant de toucher à la mise en page |

## Le dépôt

Le projet vit dans `Synode-agency/Synode-agency`, dépôt **privé** de l'organisation
GitHub (`origin`). L'ancien dépôt personnel `Killian-Sn/Synode-agency` reste
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

## Ce qu'il reste à faire (au 11/11/2026)

Le site est en ligne mais **trois fonctions affichent encore un état provisoire
au public**. Elles attendent des informations d'Antonino, pas du code.

### 1. Le formulaire de contact : branché sur Brevo, à activer

Le code est prêt (11/11/2026) : chaque demande est enregistrée comme contact
dans une liste Brevo, puis Brevo envoie la notification à
`contact@synode-agency.com` et un accusé de réception au prospect. Voir
`src/lib/contact-store.ts`. En ligne, tant que les réglages ne sont pas
saisis, le formulaire dit honnêtement qu'il n'est pas activé.

- [ ] Brevo (compte `contact@synode-agency.com`, séparé de celui de BEHYBRID) :
      créer la liste « Demandes Synode » et noter son numéro
- [ ] Créer les attributs de contact, type Texte : `NOM`, `DEMANDE`,
      `DATE_DEMANDE`, `LANGUE`, `ENTREPRISE`, `TELEPHONE_DEMANDE`, `SITE_WEB`,
      `ECHEANCE`, `BUDGET`, `CAS_USAGE` (sans eux, le contact est quand même
      enregistré, mais sans le texte de sa demande)
- [ ] Authentifier le domaine `synode-agency.com` dans Brevo (lignes DNS chez
      Hostinger), sinon l'expéditeur devient une adresse `@brevosend.com`
- [ ] Saisir chez l'hébergeur : `SYNODE_STORE=brevo`, `BREVO_API_KEY`,
      `BREVO_LIST_ID`, `CONTACT_FROM`, `CONTACT_TO` (voir `.env.example`).
      La clé ne va **jamais** dans le dépôt ni dans le chat
- [ ] Tester un vrai envoi depuis un téléphone
- [ ] Tous les 12 mois : supprimer dans Brevo les demandes de plus de 12 mois
      après le dernier échange (c'est ce que promet la page Confidentialité)

### 2. La réservation Cal.com : branchée, à activer

Le code est prêt et testé au navigateur (11/11/2026) avec
`synode-agency-k4c8xl/30min` : l'agenda ne se charge **qu'au clic**, sur les
quatre emplacements, et la carte dit avant le clic que l'agenda est fourni par
Cal.com. Le site reste ainsi sans cookie et sans bandeau.

- [ ] Saisir chez l'hébergeur `NEXT_PUBLIC_CAL_LINK=synode-agency-k4c8xl/30min`,
      puis redéployer (la valeur est lue à la construction du site)

> ⚠ La variante `/embed` de Cal.com reste blanche dans un cadre sans leur
> script `embed.js` : le site charge la page de réservation normale. Ne pas
> y revenir.

### 3. Les pages légales — ⚠ « Brouillon » affiché en ligne

Mentions légales et Confidentialité, FR et EN, affichent « Cette page est
incomplète » et des blocs « À compléter ». En Belgique ces mentions sont obligatoires.

- [ ] Identité juridique exacte, adresse, numéro d'entreprise et de TVA (via SmartBE)
- [ ] Hébergeur : celui qui sera retenu (voir plus bas), avec son adresse officielle
- [x] Prestataires : Brevo et Cal.com écrits dans la page Confidentialité (11/11/2026) ; reste l'hébergeur
- [x] Durée de conservation : 12 mois après le dernier échange (décidé le 11/11/2026)
- [ ] Retirer l'avertissement « Brouillon » une fois tout rempli

### 4. Mesurer l'audience et le référencement

Aucune mesure n'est branchée : on ne sait ni combien de visiteurs viennent, ni
si Google indexe le site.

- [ ] Google Search Console : vérifier le domaine, soumettre `sitemap.xml`
- [ ] Bing Webmaster Tools : importer depuis la Search Console
- [ ] Statistiques de visite sans cookie : Vercel Web Analytics (ou Plausible).
      Google Analytics imposerait une bannière de consentement.

### 5. L'hébergement : quitter l'offre gratuite de Vercel

> ⚠ **L'offre gratuite de Vercel (Hobby) interdit l'usage commercial**, et un
> site d'agence en est un. Décision du 11/11/2026 : chercher un hébergeur
> gratuit plutôt que payer Vercel Pro (20 $ par mois).

- [ ] Choisir l'hébergeur (piste principale : Netlify, offre gratuite qui
      autorise l'usage commercial et prend en charge Next.js 16)
- [ ] Y saisir les réglages de `.env.example`, déplacer le domaine (DNS chez
      Hostinger), puis retester tout le site en ligne
- [ ] Vérifier que la page 404 (`global-not-found`, encore expérimentale dans
      Next) fonctionne chez le nouvel hébergeur

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
