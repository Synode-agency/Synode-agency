# Synode — site vitrine

Next.js 16, React 19, Tailwind 4, TypeScript. Bilingue : FR à la racine, EN sous `/en`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # avant de pousser
```

Depuis un téléphone : `http://<ip-du-mac>:3000`.

| Où | Quoi |
| --- | --- |
| `src/lib/content.ts` | Tout le texte du site, FR + EN |
| `src/lib/legal.ts` | Les 4 pages légales |
| `src/app/api/audit/route.ts` | Réception du formulaire |
| `src/app/globals.css` | Toute la mise en page et les animations |
| `DESIGN-SYSTEM.md` | Les décisions de design, à lire avant de toucher à la mise en page |

## Le dépôt

Le projet vit dans `Synode-agency/Synode-agency`, dépôt **privé** de l'organisation
GitHub (`origin`). L'ancien dépôt personnel `Killian-Sn/Synode-agency` reste
joignable en local sous le remote `killian`, il n'est plus la référence.

Une seule branche, `main`. Les versions précédentes sont retrouvables par tag :

| Tag | Ce que c'est |
| --- | --- |
| `v2-clair-desktop` | La refonte claire, desktop terminé le 23/09/2026 |
| `v2-dark-archivo` | L'étape intermédiaire, typo Archivo |
| `v1-fastonweb` | La version « fastonweb » |
| `v0-dark` | Le design sombre bleu électrique d'origine |

`git checkout <tag>` pour revoir une version, `git checkout main` pour revenir.
Ne jamais ramener `main` en arrière : chaque refonte a été construite par-dessus
la précédente, l'historique contient déjà tout.

## Règle de travail en cours

**Le desktop est figé depuis le 22/09/2026.** Tout le reste du chantier est du
mobile. Concrètement : écrire dans des `@media (max-width: …)`, ne pas toucher aux
jetons de `:root` ni aux blocs `@media (min-width: …)` existants. Si un correctif
mobile impose de changer une valeur partagée, en parler avant de l'appliquer :
l'alignement desktop a été validé écran par écran, du portable au 4K.

---

# Avant la mise en production

Dans cet ordre : chaque point débloque les suivants. Les trois premiers sont
bloquants au sens strict, le site ne peut pas être publié sans eux.

## 0. Les emplacements réservés — bloquant

La refonte d'architecture du 24/09/2026 a laissé des blocs volontairement
vides plutôt que du texte inventé. **Ils s'affichent en clair sur le site** et
doivent être remplis ou retirés avant toute mise en ligne.

- [ ] Landing, deux sections réservées : **résultats mesurés** et **outils
      gratuits** (`landing` dans `content.ts`). Elles ne s'affichent **qu'en
      développement** : la page publiée n'en montre rien. Retirer la garde
      `NODE_ENV` dans `reserved.tsx` le jour où le contenu existe.
- [ ] Les **12 pages de service** n'ont que leur coquille. Le gabarit se valide
      sur une prestation, puis s'applique aux onze autres, en FR et en EN
- [ ] Le formulaire de la page contact et le calendrier Cal.com : **en dernier**,
      après la structure et le contenu

Pour tous les repérer : `grep -rn 'data-placeholder\|detailPlaceholder' src/`

## 1. Nom de domaine — `synode-agency.com`

- [ ] Acheter le domaine
- [ ] Créer la boîte `contact@synode-agency.com`

*Le site est déjà codé sur cette adresse : `siteUrl` dans `src/app/site-shell.tsx`, l'e-mail dans `content.ts`, le `sitemap.xml` et le `robots.txt` en découlent. Rien à changer si le domaine est bien celui-là.*

## 2. Brancher le formulaire

Aujourd'hui une demande reçue **est perdue**. `src/app/api/audit/route.ts` la valide, l'écrit dans la console du serveur et répond « c'est envoyé ». Le visiteur voit un message de succès, personne ne reçoit rien.

- [ ] Choisir le service d'envoi (Brevo, déjà utilisé sur BEHYBRID, ou Resend)
- [ ] Brancher `route.ts` dessus
- [ ] Décider qui reçoit : adresse partagée plutôt que l'un de nous deux
- [ ] Accusé de réception automatique au prospect ?
- [ ] Anti-spam : champ piège (honeypot) + limite par IP
- [ ] Tester depuis un vrai téléphone

> ⚠️ Une route POST publique sans limite se fait spammer en quelques jours. L'anti-spam n'est pas optionnel.

> ⚠️ Le formulaire promet « aucune conservation en base de données ». Si on branche une base ou un CRM, cette phrase devient fausse et la politique de confidentialité doit suivre. Rester sans base au lancement est plus simple et c'est un argument de confiance.

## 3. Pages légales

Les 4 pages sont écrites et traduites. **23 champs `TODO`** restent à remplir dans `src/lib/legal.ts`, et ils s'affichent tels quels sur le site en ligne.

- [ ] Forme juridique (SRL, société simple, indépendant ?)
- [ ] Adresse du siège
- [ ] Numéro BCE et numéro de TVA *(le footer affiche encore `BE 0000.000.000`, dans `content.ts`)*
- [ ] Responsable de la publication : qui de nous deux ?
- [ ] Hébergeur : nom, adresse, pays
- [ ] Sous-traitants à lister nommément : hébergeur, service d'e-mails, CRM éventuel
- [ ] Échéancier de paiement dans les conditions générales
- [ ] Faire relire par un professionnel

> ⚠️ En Belgique ces mentions sont obligatoires. Le site ne peut pas être mis en ligne tant que les TODO sont là.

## 4. Mobile

**Jamais traité.** Tout le travail de mise en page a porté sur le desktop. Le site n'est pas cassé sur téléphone, les réglages de repli existent, mais rien n'a été regardé ni décidé.

- [ ] Passer chaque section au crible sur un vrai téléphone, pas seulement dans le simulateur
- [ ] La navbar et le menu plein écran
- [ ] Le diagramme de la Méthode : les flèches longues ne tiennent pas sur une colonne
- [ ] Le diagramme de l'audit : sous 768px les courbes et les points disparaissent et il ne reste que les cartes empilées, décider si ça suffit
- [ ] Le hero de Réalisations : les deux colonnes ne s'ouvrent qu'à partir de 1180px, en dessous tout s'empile. À vérifier sur téléphone.
- [ ] Le parcours des projets (les 7 barres en 3 familles) et la bande de vignettes : les deux ont un repli mobile jamais testé en vrai
- [ ] Les deux cartes de l'équipe et les crânes qui dépassent
- [ ] La galerie des réalisations : flèches, vignettes, vidéo
- [ ] Le formulaire de contact
- [ ] Les espacements : `--space-between` est pensé pour le desktop

## 5. Les démos des réalisations

Les 7 projets de la page Réalisations montrent des **vidéos et des visuels fabriqués**, générés pour habiller la maquette. Ils sont présentés sous le titre « Des systèmes qui tournent, pas des promesses ».

- [ ] Décider : soit on enregistre les vraies captures, soit on réduit la page aux projets réels
- [ ] Si on garde des démonstrateurs, le dire explicitement dans la page
- [ ] Remplacer les fichiers de `public/demos/` et les champs `video` / `poster` dans `content.ts`

> ⚠️ C'est le point qui coûte le plus cher au premier prospect qui demande une référence.

## 6. Copywriting FR

Tout le texte actuel est à reprendre. Il tient la maquette mais n'a jamais été validé par nous deux. Tout est dans `src/lib/content.ts`.

**Landing**

- [ ] Hero : titre, sous-titre, 2 boutons
- [ ] Constat : titre, intro, les 4 constats
- [ ] Offre : titre, sous-titre, et par offre : la phrase « pour qui », les badges, la phrase Résultat
- [ ] Méthode : titre, paragraphe « qui nous aidons », les secteurs, les 4 étapes
- [ ] Équipe : titre, chapeau, nos 2 présentations
- [ ] CTA « Une heure pour voir ce qui peut changer » : titre, phrase, bouton, note en astérisque
- [ ] FAQ : les 5 questions et réponses
- [ ] Footer : tagline

**Page Réalisations** — titre, chapeau, les 3 catégories (libellé long, nom court affiché sous les barres du parcours, phrase de présentation), les 7 projets (nom court, résumé de 3-4 mots, titre, description, résultat), l'encadré bleu de fin

**Page Contact** — titre, chapeau, les 2 encadrés, libellés du formulaire, messages de confirmation et d'erreur

> ⚠️ Limites réelles, pas des caprices : les retours à la ligne des titres et des chapeaux sont **écrits en dur** avec `\n`, parce que la composition doit être identique d'un portable à un écran 4K. Si un texte est réécrit, ses retours sont à replacer à la main. Les intros des 2 cartes d'offre font exactement 2 lignes, chaque badge tient sur une ligne et le plus long est déjà à la limite, les descriptions de projets font ~180 caractères max.

## 7. Version anglaise

- [ ] Adapter **par l'idée**, pas mot à mot. L'anglais actuel est une traduction proche du français.

*À faire une fois le français figé, sinon on traduit deux fois.*

## 8. Partage et référencement

Fait : `lang` correct par langue via deux layouts racine, `sitemap.xml` avec les paires `hreflang`, `robots.txt`, `canonical` sur chaque page, titre et description par page, domaine `synode-agency.com` câblé partout.

- [ ] **Image de partage (OG)** : il n'y en a pas. Sans elle, un lien posté sur LinkedIn ou WhatsApp sort nu. Format 1200x630.
- [ ] Vérifier le téléphone affiché : `+32 487 30 18 90`
- [ ] Vérifier que `contact@synode-agency.com` existe avant de publier
- [ ] Contrôle accessibilité et performance (Lighthouse)

> Contrastes vérifiés au calcul : corps de texte 4,77:1 sur le fond de page, petites étiquettes 4,54:1, bleu et violet des domaines au-dessus de 6:1. Le vert `#15803d` est à 4,40:1 sur le fond de page, juste sous la barre AA — il n'est utilisé que sur des surfaces blanches, où il passe à 5,02:1. À ne pas poser sur le gris de page.

## 9. Mise en ligne

Hébergement : **Vercel**, branché sur le dépôt de l'organisation. Le déploiement
est déclenché par un `git push` sur `main`, il n'y a rien à téléverser.

- [ ] Installer l'application GitHub Vercel **sur l'organisation** `Synode-agency`
      (elle n'y est pas par défaut, tant qu'elle n'y est pas le dépôt n'apparaît
      pas dans la liste d'import de Vercel). Antonino est admin de l'organisation,
      il peut valider lui-même.
- [ ] Importer `Synode-agency/Synode-agency`. La racine du dépôt est la racine de
      l'application Next, il n'y a pas de sous-dossier à indiquer, et **aucune
      variable d'environnement** n'est nécessaire aujourd'hui : le code n'en lit
      aucune.
- [ ] Vérifier le premier déploiement sur l'URL `*.vercel.app` avant de brancher
      le domaine
- [ ] Brancher `synode-agency.com` et forcer le HTTPS
- [ ] Vérifier une dernière fois les 4 pages légales en ligne
- [ ] Soumettre le `sitemap.xml` dans la Google Search Console

> ⚠️ **L'offre gratuite de Vercel (Hobby) est réservée à un usage non commercial.**
> Un site d'agence qui démarche des clients n'en relève pas. Compter l'offre Pro
> au moment de brancher le domaine, ou choisir un autre hébergeur.

> ⚠️ Le dépôt est privé, le site déployé sera public. Tant que les points 2, 3 et 5
> ne sont pas réglés, mettre en ligne expose les `TODO` des mentions légales, un
> formulaire qui n'envoie rien et des démonstrations fabriquées.

> La clé d'API du service d'e-mails se met dans les variables d'environnement de
> Vercel, **jamais dans le dépôt**.

## 10. Prise de rendez-vous (optionnel)

- [ ] On le fait ? Ça raccourcit le cycle, mais suppose des dispos toujours à jour
- [ ] Cal.com ou Calendly

> ⚠️ Un widget intégré dépose des cookies tiers et déclenche l'obligation de bannière de consentement. Un simple lien vers une page externe l'évite.

---

## Dette technique

- [ ] `package.json` s'appelle encore `99gates-landing`
- [ ] `content.ts` garde `rulesTitle` et `rules` (« Nos règles », 4 phrases) que plus aucune section n'affiche. Soit on les replace quelque part, soit on les supprime.
- [x] `build`, `tsc --noEmit` et `eslint` passent tous les trois sans rien dire — les garder ainsi

## À tenir dans la durée

Deux réponses de la FAQ nous engagent : le **délai de 4 semaines minimum**, et le fait que les **modèles d'IA ne soient pas entraînés sur les données client** — vrai uniquement sur les offres professionnelles payantes.

Si on ajoute des statistiques de visite, Google Analytics impose une bannière de consentement, Plausible et Vercel Analytics non.
