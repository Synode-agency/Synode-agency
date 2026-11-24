# Synode

Site de **Synode**, agence technologique basée à Bruxelles : solutions sur
mesure, avec l'IA intégrée (agents IA, automatisations, intégrations de
systèmes, logiciels métier, data et formation).

En ligne sur **[synode-agency.com](https://synode-agency.com)**, en français à
la racine et en anglais sous `/en`.

---

## Sommaire

1. [Fonctionnalités](#fonctionnalités)
2. [Stack technique](#stack-technique)
3. [Structure du projet](#structure-du-projet)
4. [Installation](#installation)
5. [Variables d'environnement](#variables-denvironnement)
6. [Qualité du code](#qualité-du-code)
7. [Déploiement](#déploiement)
8. [Versions précédentes](#versions-précédentes)
9. [Principes à respecter](#principes-à-respecter)

---

## Fonctionnalités

### Les pages

| Page | Adresse (FR) | Adresse (EN) |
| --- | --- | --- |
| Accueil | `/` | `/en` |
| Solutions | `/solutions` | `/en/solutions` |
| Six pages services | `/solutions/<service>` | `/en/solutions/<service>` |
| Cas d'usage | `/cas-usage` | `/en/cas-usage` |
| Réalisations | `/realisations` | `/en/realisations` |
| Projets Nexus et Coory | `/realisations/nexus`, `/realisations/coory` | `/en/realisations/...` |
| Équipe | `/equipe` | `/en/equipe` |
| Contact (formulaire et réservation) | `/contact` | `/en/contact` |
| Confirmation d'envoi | `/merci` | `/en/merci` |
| Mentions légales, confidentialité | `/mentions-legales`, `/confidentialite` | `/en/...` |

Les six services : `agents-ia`, `automatisations-intelligentes`,
`integrations-systemes-connectes`, `logiciels-applications-ia`,
`data-intelligence` et `formation-adoption-ia`.

S'y ajoutent une page 404 en français (`src/app/global-not-found.tsx`) et
en anglais (`src/app/(en)/en/not-found.tsx`),
`/methode` qui redirige vers la section Méthode de l'accueil, et
`/design-system`, un outil d'équipe exclu des moteurs de recherche.

### Ce que fait le site

- **Formulaire de contact** : validation côté client et côté serveur, champ
  piège contre les robots, limitation du nombre d'envois par adresse IP. Chaque
  demande est enregistrée dans une liste Brevo, puis Brevo envoie une
  notification à l'équipe et un accusé de réception au visiteur
  (`src/lib/contact-store.ts`, `src/lib/ack-email.ts`). Sans configuration, le
  formulaire le dit au lieu d'afficher un faux succès.
- **Réservation d'un rendez-vous** : l'agenda Cal.com est intégré à la page
  Contact et aux appels à l'action de l'accueil, de Solutions et de Cas
  d'usage. Il n'est chargé **qu'au clic** : le site ne dépose aucun cookie et
  n'a pas besoin de bandeau de consentement.
- **Outils en ligne** sur l'accueil : un diagnostic IA (questionnaire et score
  calculés dans le navigateur) et un assistant qui prépare un brief, repris
  ensuite dans le formulaire de contact.
- **Référencement** : `sitemap.xml`, `robots.txt`, balises `canonical` et
  `hreflang` sur chaque page indexée, données structurées (Organization,
  listes de projets), image de partage générée pour chaque page.
- **Animations d'apparition** au défilement, désactivées sous
  `prefers-reduced-motion`, et le site reste entièrement lisible sans
  JavaScript.
- **Typographie soignée** : aucun paragraphe de hero ne finit sur un mot seul
  (`src/lib/sans-veuve.ts`).

---

## Stack technique

| Domaine | Choix |
| --- | --- |
| Framework | Next.js 16 (App Router, pages générées à la construction) |
| Interface | React 19, TypeScript 5 |
| Styles | Tailwind CSS 4 et deux feuilles écrites à la main (`globals.css`, `studio.css`), modules CSS pour les visuels |
| Icônes | lucide-react |
| Formulaire | Route API Next.js et API Brevo (contacts et e-mails transactionnels) |
| Réservation | Cal.com |
| Hébergement | Netlify |

---

## Structure du projet

```text
src/
├── app/
│   ├── (fr)/               Pages françaises, à la racine du site
│   ├── (en)/en/            Pages anglaises, sous /en
│   ├── api/contact/        Réception du formulaire de contact
│   ├── site-shell.tsx      Squelette HTML commun (en-tête, pied, animations)
│   ├── sitemap.ts, robots.ts, global-not-found.tsx
│   ├── globals.css         Jetons de design, base et composants communs
│   └── studio.css          Mise en page des sections et des pages
├── components/
│   ├── site/               Pages, sections et composants du site
│   ├── nav/                Menu mobile
│   ├── illustrations/      Illustrations animées de Coory (accueil, page Coory)
│   ├── coory/, nexus/, nexus-visual/   Pages et visuels des deux projets
│   ├── core-visuals/, understand-visuals/, compact-panel/, hero-compact/
│   │                       Visuels animés des pages services, et leurs
│   │                       versions compactes pour téléphone
│   └── equipe/             Visuels de la page Équipe
├── content/
│   ├── fr/, en/            Textes du site, un fichier par page + common.ts
│   │                       (menu, pied de page, boutons), work.ts (projets),
│   │                       legal.ts (mentions légales et confidentialité)
│   ├── types.ts            Forme commune : l'anglais doit suivre le français
│   ├── legal-shared.ts     Numéro d'activité Smart et règles d'écriture du légal
│   └── index.ts            getContent(locale) et le reste de l'accès aux textes
└── lib/
    ├── routes.ts           Langues, adresses et ancres
    ├── service-pages.ts, solution-details.ts, business-use-cases.ts
    │                       Contenu des services et des cas d'usage
    ├── work.ts             Logique des projets (démo de Coory, recherche)
    ├── contact-store.ts, ack-email.ts   Traitement des demandes de contact
    ├── ai-diagnostic-*.ts, tools-brief.ts   Les outils de l'accueil
    └── og-image.tsx, og-card.tsx, organization.ts, site-url.ts
                            Images de partage et référencement
public/                     Logos, portraits de l'équipe, logos des projets
```

Les textes vivent dans `src/content/`, un dossier par langue avec les mêmes
fichiers. Le français fait foi : si un fichier anglais oublie ou ajoute une
clé, la compilation échoue. Certaines pages portent encore leurs textes FR et
EN dans leur composant ou dans `src/lib/` : ils rejoignent `src/content/` au
fil de la refonte.

---

## Installation

Prérequis : **Node.js 22** ou plus récent, et npm.

```bash
git clone https://github.com/Synode-agency/Synode-agency.git
cd Synode-agency
npm install
cp .env.example .env.local   # facultatif, voir plus bas
npm run dev                  # http://localhost:3000
```

Le site est entièrement consultable sans aucune variable d'environnement : le
formulaire indique alors qu'il n'est pas configuré, et la réservation affiche
un aperçu de calendrier fictif, signalé comme tel.

Pour le voir depuis un téléphone sur le même réseau : `http://<ip-de-l-ordinateur>:3000`.

---

## Variables d'environnement

Elles sont toutes décrites dans [`.env.example`](.env.example). En local, elles
vont dans `.env.local` (jamais commité) ; en production, dans les réglages de
Netlify, et un changement ne s'applique qu'au déploiement suivant.

| Variable | Rôle |
| --- | --- |
| `SYNODE_STORE` | Où vont les demandes : `brevo` en production, `file` pour un dépôt local dans `.data/` |
| `SYNODE_STORE_DIR` | Dossier du dépôt local (facultatif) |
| `BREVO_API_KEY` | Clé d'API Brevo, **secrète**, à accès restreint |
| `BREVO_LIST_ID` | Liste Brevo qui reçoit les demandes |
| `CONTACT_FROM`, `CONTACT_TO` | Expéditeur des e-mails, destinataire des notifications |
| `NEXT_PUBLIC_CAL_LINK` | Identifiant de l'événement Cal.com |
| `NEXT_PUBLIC_SITE_URL` | Domaine canonique (sitemap, balises canoniques) |
| `NEXT_PUBLIC_COORY_DEMO_*` | Accès de démonstration affichés sur la page Coory |

Les variables `NEXT_PUBLIC_*` sont lues à la construction du site et visibles
dans le navigateur : n'y mettre que des valeurs publiques.

---

## Qualité du code

Avant chaque mise en ligne, les trois commandes doivent passer sans aucun
avertissement :

```bash
npm run build        # construction de production
npx tsc --noEmit     # vérification des types
npm run lint         # ESLint
```

---

## Déploiement

Le site est hébergé sur **Netlify** (offre gratuite), branché sur ce dépôt.

- Chaque `git push` sur `main` construit et met en ligne le site.
- Un commit qui ne modifie que des fichiers Markdown ne déclenche pas de
  construction (règle `ignore` de `netlify.toml`).
- L'offre gratuite fonctionne par crédits mensuels, et chaque mise en
  production en consomme : mieux vaut grouper les modifications avant de
  pousser.
- `synode-agency.be` et `www.synode-agency.be` redirigent vers
  `synode-agency.com` (`netlify.toml`).

---

## Versions précédentes

Une seule branche, `main`. Les grandes versions du design sont retrouvables
par tag :

| Tag | Version |
| --- | --- |
| `v3-architecture` | Architecture Services, FAQ et Équipe |
| `v2-clair-desktop` | Refonte claire, version ordinateur |
| `v2-dark-archivo` | Étape intermédiaire, typographie Archivo |
| `v1-fastonweb` | Première version publiée |
| `v0-dark` | Design sombre d'origine |

```bash
git checkout <tag>   # revoir une version
git checkout main    # revenir à la version en cours
```

---

## Principes à respecter

- **Aucune donnée réelle dans les démonstrations** : la page Nexus utilise des
  entreprises et des personnes inventées, et le compte de démonstration de
  Coory ne doit contenir aucune donnée réelle.
- **Aucun secret dans le dépôt** : clés et identifiants vont dans `.env.local`
  ou chez Netlify.
- **Les pages légales suivent les services réellement branchés** : si un
  prestataire est ajouté ou retiré (formulaire, réservation, hébergement), la
  politique de confidentialité change avec lui.
- **L'accusé de réception ne reprend jamais** ce que le visiteur a écrit.
