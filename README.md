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

### 1. Le formulaire de contact — ⚠ inactif en ligne

`/api/contact` répond « non configuré » : le visiteur voit « L'envoi de messages
n'est pas encore activé » et aucune demande n'arrive.

- [ ] Choisir où vont les demandes : notification par e-mail (Resend, déjà codé)
      ou un autre service (Brevo, utilisé pour BEHYBRID, demande un branchement)
- [ ] Choisir qui reçoit : une adresse partagée plutôt que l'un de nous deux
- [ ] Renseigner les variables dans Vercel (voir `.env.example`), **jamais dans le dépôt**
- [ ] Tester un vrai envoi depuis un téléphone

> ⚠ Le dépôt `file` (fichier sur disque) ne fonctionne **pas** sur Vercel : le
> disque y est en lecture seule, les demandes seraient perdues.

### 2. La réservation — ⚠ calendrier factice en ligne

L'aperçu affiche « dates et horaires fictifs. Aucune réservation n'est
effectuée » sur l'accueil, Solutions, Cas d'usage et Contact.

- [ ] Créer l'événement sur Cal.com (échange de 30 minutes)
- [ ] Renseigner `NEXT_PUBLIC_CAL_LINK` dans Vercel (ex. `synode/30min`) et redéployer :
      le vrai agenda remplace alors l'aperçu tout seul

> Le calendrier Cal.com n'est chargé qu'au clic, jamais avant : pas de cookie
> tiers à l'arrivée sur le site, donc pas de bannière de consentement.

### 3. Les pages légales — ⚠ « Brouillon » affiché en ligne

Mentions légales et Confidentialité, FR et EN, affichent « Cette page est
incomplète » et des blocs « À compléter ». En Belgique ces mentions sont obligatoires.

- [ ] Identité juridique exacte, adresse, numéro d'entreprise et de TVA (via SmartBE)
- [ ] Hébergeur : Vercel Inc., avec l'adresse publiée sur `vercel.com/legal` (à recopier telle quelle)
- [ ] Liste exacte des prestataires réellement branchés (Vercel, service d'e-mails, Cal.com)
- [ ] Durée de conservation des demandes, réellement appliquée
- [ ] Retirer l'avertissement « Brouillon » une fois tout rempli

### 4. Mesurer l'audience et le référencement

Aucune mesure n'est branchée : on ne sait ni combien de visiteurs viennent, ni
si Google indexe le site.

- [ ] Google Search Console : vérifier le domaine, soumettre `sitemap.xml`
- [ ] Bing Webmaster Tools : importer depuis la Search Console
- [ ] Statistiques de visite sans cookie : Vercel Web Analytics (ou Plausible).
      Google Analytics imposerait une bannière de consentement.

### À vérifier au moment de payer Vercel

> ⚠ **L'offre gratuite de Vercel (Hobby) est réservée à un usage non
> commercial.** Un site d'agence qui démarche des clients n'en relève pas :
> passer à l'offre Pro.

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
