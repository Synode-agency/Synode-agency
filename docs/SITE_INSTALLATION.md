# Lancer et configurer le site

Version du 28 septembre 2026.

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
| `NEXT_PUBLIC_CAL_LINK` | L'identifiant Cal.com, par exemple `synode/30min`. | La page Contact dit que la réservation n'est pas disponible. |
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
| `src/app/globals.css` | Les jetons, puis le système de panneaux. |
| `src/components/site/shell.tsx` | La pile et le panneau. Tout passe par là. |
| `DESIGN-SYSTEM.md` | Le système, et la page `/design-system` qui le montre. |

Pour changer un texte, un seul fichier. Pour changer une couleur, un seul
bloc.
