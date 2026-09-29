# Lancer et configurer le site

Version du 29 septembre 2026.

## Portée de la mise à jour de l’offre

Les six familles sont définies dans [la référence Synode](README_1_REFERENCE_SYNODE.md) et leur présentation dans [l’architecture](README_2_ARCHITECTURE_SITE_SYNODE.md). Cette évolution concerne les contenus et les cartes existantes ; elle ne nécessite pas de nouvelle installation, de nouveau service ni de nouvelles variables d’environnement. Les procédures techniques ci-dessous sont conservées.

Les six familles, leurs douze pages FR/EN, le menu Solutions et la nouvelle composition de l’accueil sont intégrés. Les anciennes routes Cas d’usage et Méthode redirigent vers les sections d’accueil. La redirection globale `/solutions/:slug` a été retirée pour laisser accéder aux nouvelles pages. Aucune variable supplémentaire n’est nécessaire. Les prérequis de publication restent listés dans [SITE_A_COMPLETER.md](SITE_A_COMPLETER.md).

## Lancer en local

```bash
npm install
npm run dev
```

Le site répond sur `http://localhost:3000`. Sur le réseau local, l'adresse
`http://<ip>:3000` fonctionne aussi : les origines du réseau sont
autorisées dans `next.config.ts`, sinon le téléphone reçoit le HTML mais
pas le JavaScript et la page reste presque blanche.

**Le site est entièrement consultable sans aucune clé.** Les fonctions qui
dépendent d'un service tiers disent qu'elles ne sont pas disponibles plutôt
que de faire semblant. Aucune page ne plante.

## Vérifier

```bash
npx tsc --noEmit     # types
npx eslint src       # analyse statique
npm run build        # compilation et pré-rendu
```

Le build exécute aussi une vérification d'intégrité du catalogue : un cas
d'usage ajouté dans une seule langue casse la compilation au lieu de
produire une page anglaise vide.

## Les variables d'environnement

Copier `.env.example` en `.env.local` et remplir ce dont vous avez besoin.
**Aucune de ces valeurs ne doit être préfixée `NEXT_PUBLIC_`, sauf celle
qui l'est déjà** : ce préfixe expose la valeur au navigateur.

| Variable | Rôle | Sans elle |
| --- | --- | --- |
| `SYNODE_STORE` | Le dépôt des demandes. `file` pour le disque local. | Le formulaire refuse d'enregistrer et le dit. |
| `SYNODE_STORE_DIR` | Où écrire, si `SYNODE_STORE=file`. | `.data/` à la racine du projet. |
| `RESEND_API_KEY` | La clé d'envoi Resend. | Les demandes sont enregistrées, aucune notification ne part. |
| `CONTACT_FROM` | L'expéditeur, sur un domaine vérifié chez Resend. | Idem. |
| `CONTACT_TO` | Votre boîte de réception. | Idem. |
| `NEXT_PUBLIC_CAL_LINK` | L'identifiant Cal.com, par exemple `synode/30min`. | Contact affiche un aperçu de calendrier explicitement fictif, sans réservation. |
| `NEXT_PUBLIC_SITE_URL` | Le domaine canonique. | Une valeur provisoire sert au sitemap. |

## Le circuit d'une demande

L'ordre compte, et il est le même en développement et en production :

1. le navigateur valide, pour le confort ;
2. le serveur revalide, parce que c'est lui qui décide ;
3. une limitation anti-abus par adresse IP ;
4. **l'enregistrement** dans le dépôt ;
5. la notification par email.

Si l'étape 4 échoue, le visiteur reçoit une erreur honnête et **son texte
reste dans le formulaire**. Si l'étape 5 échoue, la demande est déjà en
sécurité : le visiteur est confirmé, le serveur journalise l'échec, et la
demande sera lue dans le dépôt.

Le contenu d'une demande ne part jamais dans le navigateur ni dans un
journal public.

### Lire les demandes avec `SYNODE_STORE=file`

```bash
cat .data/contact-requests.jsonl | tail -5
```

Une ligne par demande, en JSON. Ajouter `.data/` à `.gitignore` : ces
fichiers contiennent des données personnelles.

## Brancher un vrai dépôt

`src/lib/contact-store.ts`, fonction `saveRequest`. Ajouter un cas à côté
de `file`, en respectant la même règle : renvoyer `{ ok: true }` seulement
si l'écriture a réellement abouti.

**Sur Vercel, `file` ne fonctionne pas.** Le système de fichiers y est en
lecture seule et ce qui est écrit dans `/tmp` disparaît avec l'instance.

## Configurer Cal.com

À faire dans Cal.com, pas dans le code : voir `SITE_A_COMPLETER.md`. Le
code ne fait que charger le calendrier que vous lui indiquez, **et
seulement au clic** : aucun cookie tiers n'est déposé tant que le visiteur
n'a pas demandé à voir le calendrier.

Un clic sur le calendrier n'est pas un rendez-vous. La confirmation vient
de Cal.com, par email.

## Déployer

Le projet est prêt pour Vercel : rien à changer dans le code. Avant de
publier, dérouler `SITE_A_COMPLETER.md` — notamment le dépôt des demandes,
qui doit être autre chose que `file`.

Poser les variables d'environnement dans le tableau de bord de
l'hébergeur, **jamais dans le dépôt**.

Les pages `/merci` et `/design-system` portent un `noindex` et sont absentes
du sitemap.

## Où se trouve quoi

| Fichier | Contenu |
| --- | --- |
| `src/lib/content.ts` | Tous les textes, sauf les cas d'usage et les réalisations. |
| `src/lib/use-cases.ts` | Les huit cas d'usage et les quatre territoires. |
| `src/lib/work.ts` | Les réalisations. |
| `src/lib/solution-details.ts` | Définitions, scénarios, prérequis et FAQ des six familles en FR/EN. |
| `src/components/site/solutions-menu.tsx` | Menu Solutions au clic et au clavier, partagé avec le mobile. |
| `src/app/globals.css` | Styles historiques et illustrations encore utilisées. |
| `src/app/studio.css` | Direction visuelle active, chargée après les styles historiques. |
| `src/app/site-shell.tsx` | Police active et chargement des styles. |
| `src/components/site/shell.tsx` | La pile et le panneau. Tout passe par là. |
| `DESIGN-SYSTEM.md` | Le système, et la page `/design-system` qui le montre. |

Les textes se trouvent dans les contenus partagés et dans certains composants. Vérifier les deux emplacements pour garder FR/EN cohérents. Respecter `DESIGN_STUDIO_CLAIR.md` pour la direction active ; les sections historiques de `DESIGN-SYSTEM.md` ne doivent pas rétablir une ancienne police ou une ancienne composition.
