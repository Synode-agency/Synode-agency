# Synode — système de design

Refonte claire, éditoriale. La version sombre précédente est figée sur le tag
`v0-dark` si besoin de comparer.

## Le principe

Le caractère vient de **l'échelle typographique, du blanc et des filets**,
jamais d'un effet. Pas de dégradé, pas de lueur, pas d'ombre portée, pas de
fond animé. Si un élément a besoin d'un effet pour exister, c'est qu'il est
mal composé.

Références qui ont guidé la refonte : we-are.be, plasm-agency.com,
fastonweb.com. Elles ont trois choses en commun, et c'est ce qu'on a repris :
fond clair, titres énormes, beaucoup de blanc.

## Couleurs (`globals.css`)

| Token | Valeur | Usage |
| --- | --- | --- |
| `--background` | `#f5f4f0` | Blanc cassé **chaud**. Un gris neutre rend clinique. |
| `--foreground` | `#14130f` | Noir chaud. Jamais `#000`. |
| `--surface` | `#ffffff` | Cartes, posées sur le blanc cassé. C'est ce léger écart qui crée la profondeur, pas une ombre. |
| `--surface-2` | `#ebe9e3` | Survols, aplats secondaires. |
| `--hairline` | `rgba(20,19,15,.13)` | Tous les filets. |
| `--primary` | `#14130f` | **L'action principale est encre, pas bleue.** C'est ce qui fait lire « agence » plutôt que « produit IA ». |
| `--brand` | `#1b4de0` | Bleu, **à très petite dose** : index de section, pastilles, un mot dans le titre du hero. |

Le bleu vif d'avant (`#3fa9f5`) a disparu du fond et des boutons. Il ne survit
que dans le logo et dans ces quelques accents.

## Typographie

**Deux familles, contre cinq avant.**

- **Archivo** (`--font-heading`) : tous les titres, en 700/800, interlettrage
  négatif (`-0.035em`) et interlignage serré (`0.98`).
- **Inter** (`--font-sans`) : tout le reste.

**Le monospace a été supprimé du site.** C'était un des marqueurs les plus
forts du look « outil de développeur », alors que le lecteur est un patron de
PME sans équipe IT. Les libellés de données passent par `.label-xs` :
majuscules, interlettrage large, sans-serif.

## Les trois ornements

Il n'y en a que trois, et ils reviennent partout :

1. **`.section-index`** — le numéro de section en petit bleu (`01`, `02`…),
   posé sur un filet avec son libellé. C'est la signature du site.
2. **Le filet** (`--hairline`) — sous les titres, entre les colonnes, au-dessus
   des blocs. Il structure sans rien ajouter.
3. **Le panneau encre** — fond `--foreground`, texte inversé. Réservé aux deux
   CTA de fin (accueil et Réalisations). C'est le seul aplat sombre du site.

## Boutons

- `.btn-ink` — action principale, aplat encre.
- `.btn-line` — action secondaire, un simple contour qui s'inverse au survol.

## Animation

**Ce qui reste :** `reveal-in`, l'apparition au scroll (opacité + 14 px), et le
scroll-snap section par section.

**Ce qui a été supprimé :** flottement des cartes, pulsation des points,
lueur qui balaie le rail, sheen diagonal sur les cartes d'offre, aura
tournante derrière le titre, fond shader, grain.

Au survol, une carte ne fait qu'une chose : **son filet fonce** (`.lift`).
Pas de décollage, pas d'ombre.

## Supprimé aussi

- **`SiteBackground`** et le shader Ferrofluid.
- **`AgentDiagram`**, le diagramme du hero avec les logos Claude, OpenAI et
  Gmail. Il affichait les outils sur le premier écran, ce qui contredit le
  positionnement (on vend le résultat) et laissait croire à des partenariats
  qui n'existent pas.
- Les icônes animées de la bande de services, remplacées par des numéros.
- `synapse-field`, `brand-icons`, `draft-line-icon`, `integration-card`.

---

# Structure (inchangée par la refonte)

## Une section = un écran

Sur desktop, chaque section fait `100dvh` (`.section-screen`). Deux tokens
fluides tiennent ça :

- `--hs` pour le hero,
- `--ss` pour les sections, de `1` sur grand écran à `0.62` sur une fenêtre
  courte. **Toute hauteur ajoutée dans une section doit être indexée sur
  `--ss`**, jamais fixe, sinon la section déborde sur un portable.

La FAQ partage son écran avec le footer (`.screen-shell`).

## Scroll-snap

`SectionSnap` active `scroll-snap-type: y mandatory` sur `<html>`, **et le
désactive si une section dépasse la hauteur du viewport** — sinon le bas
devient inatteignable. Désactivé aussi sous `prefers-reduced-motion`.

`SectionPager`, un seul contrôle bidirectionnel à droite, remplace les flèches
par section.

## Navigation interne — `NavLink`

Le navigateur ne scrolle vers un `#hash` que si le hash **change**. Une fois
l'URL à `/#offre`, recliquer sur « Offre » ne fait rien. `NavLink` reprend la
main quand on est déjà sur la page visée : il scrolle en JS et réécrit l'URL
avec `replaceState` (pas `pushState`, pour ne pas remplir l'historique).

## Aucun scroll horizontal

`body` porte `overflow-x: clip`. **`clip` et pas `hidden`** : `hidden` ferait
de `<body>` un conteneur de défilement et casserait le scroll-snap.

## Contraintes de contenu

- Les intros des 2 cartes d'offre font **exactement 2 lignes**.
- Les 4 badges d'une carte tiennent **chacun sur une ligne**.
- Les descriptions de démos font **~180 caractères** maximum.
- Deux textes ont des retours à la ligne forcés en `\n`, rendus signifiants à
  partir de `sm` seulement (`sm:whitespace-pre-line`). Sur mobile ils
  retombent en espaces.

## Carrousel Réalisations

Deux mises en page, pas une qu'on rétrécit : carte portrait sous `lg`, carte
paysage **60 % média / 40 % texte** à partir de `lg`. Le bloc média fait toute
la hauteur de la carte, donc son bord haut s'aligne sur `D/xx` et son bord bas
sur la ligne de résultat. **La hauteur du plateau est dictée par la colonne de
texte**, pas par le média : c'est là que ça casse si un texte s'allonge.

## Mobile

Menu plein écran, opaque, placé **sous la barre du header dans l'ordre
d'empilement** pour que le logo et la croix se posent dessus.

## FAQ

Accordéon, **une seule réponse ouverte à la fois**, tout fermé au chargement.
L'ouverture anime `grid-template-rows: 0fr -> 1fr` : la hauteur naturelle est
atteinte sans mesure JS.

## Pages légales

`src/lib/legal.ts` porte le contenu, 4 documents FR + EN. Les champs
company-specific sont marqués `TODO` et rendus dans un encadré rouge : ils ne
peuvent pas partir en production sans qu'on le voie.
