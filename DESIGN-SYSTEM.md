# Synode — système de design

Conception calquée sur **we-are.be**. Points de restauration : `v1-fastonweb`
(version claire précédente), `v0-dark` (première version sombre).

## Le principe

Le caractère vient de **l'échelle typographique, du blanc et de la
photographie**, jamais d'un effet. Pas de dégradé, pas de lueur, pas d'ombre
portée, pas de fond animé.

Ce qu'on a repris à we-are.be, point par point :

- **titre de section seul**, sans petit label ni tag au-dessus
- **boutons noirs en pastille**, padding horizontal généreux
- **navigation en minuscules**
- **photos en cadrages rectangulaires** (pas de détourage, pas de disques)
- cartes de service **remplies, sans bordure**, coins à 8 px
- cartes de projet **à angles vifs**, image en haut
- bandes pleine largeur alternant blanc et blanc cassé
- tout **aligné à gauche**

## Logo

La variante suit le fond :

| Fond | Variante | Fichier |
| --- | --- | --- |
| Clair (navbar) | `plate` | `synode-logo.png`, la plaque carrée complète |
| Sombre (footer) | `mark` | `synode-mark.png`, le S seul, détouré |

Sur fond sombre, la plaque imprimerait un carré plus foncé dans le noir ;
c'est pour ça que le S détouré existe.

Le mot « Synode » est un PNG en lettrage **blanc** : `.wordmark-type`
l'inverse sur fond clair et le laisse tel quel dans un panneau encre.

## Le rythme des sections

Sections à hauteur de contenu, scroll naturel. Bandes pleine largeur,
**aucun coin arrondi sur les sections**.

| Section | Fond |
| --- | --- |
| Hero | blanc |
| Services (les 4 piliers) | blanc cassé |
| 01 Constat | blanc cassé |
| 02 Offre | blanc |
| 03 Méthode | blanc cassé |
| 04 Équipe | blanc |
| CTA finale | blanc cassé, carte blanche au centre |
| FAQ | blanc |
| Footer | **encre** |

## Hero

Leur modèle exact : titre à gauche, paragraphe, deux actions, et **les photos
des personnes à droite**, en cadrages 4:5 décalés en hauteur. Leur hero montre
leur équipe au bureau ; le nôtre montre Antonino et Killian. Même argument :
on voit à qui on va parler avant d'avoir lu une ligne d'offre.

**Conséquence : la section Équipe n'a plus de portraits.** Répéter les deux
mêmes photographies sur une page se lit comme un oubli. Elle répond à la
question suivante, qui fait quoi.

## L'inversion de palette — `.panel-ink`

C'est la pièce maîtresse du système. Toutes les couleurs du site passent par
des variables CSS, donc **une seule classe suffit à réthémer tout un
sous-arbre** :

```css
.panel-ink {
  background: var(--ink);
  --foreground: #f5f4f0;
  --muted-foreground: rgba(245,244,240,.62);
  --primary: #f5f4f0;          /* le bouton s'inverse */
  --brand: #9db5ff;            /* le bleu s'éclaircit pour le contraste */
}
```

Aucun composant n'a de variante sombre. `text-muted-foreground`,
`border-hairline`, `btn-ink` : tout s'adapte tout seul.

Deux tokens, `--ink` et `--ink-foreground`, existent **uniquement** pour que
`background: var(--ink)` ne soit pas affecté par la redéfinition de
`--foreground` dans la même règle.

## Header

**Bande rectangulaire pleine largeur, blanche**, avec un filet en bas et un
léger flou d'arrière-plan. Hauteur `--header-h`
(`clamp(4.5rem, 3.8rem + 1.6vw, 5.75rem)`). Logo à gauche, navigation
**centrée**, CTA en pastille à droite : c'est la disposition commune aux deux
références.

`--header-h` est le seul endroit où cette hauteur est écrite. Le hero, les
pages scrollables et chaque section plein écran la réservent via ce token.

Le mot-clé « Synode » du logo est un PNG en lettrage **blanc**. `.wordmark-type`
l'inverse sur fond clair et le laisse tel quel dans un panneau encre.

## Devices récurrents

Trois, repris de fastonweb : les **coches** dans les listes de bénéfices, les
**numéros** sur les étapes de la méthode, et les **filets** entre les blocs.
Rien d'autre ne se répète.

## Les cartes — `.surface-card`

Calquées sur we-are.be : **un bloc rempli, sans bordure**. La carte se lit
comme une surface, pas comme une boîte encadrée.

```css
.surface-card {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: var(--radius);      /* 8px, pas plus */
  box-shadow: var(--shadow-card);    /* profondeur légère, pas une lueur */
}
```

**Le remplissage s'adapte à la bande qui la contient**, donc une carte n'est
jamais de la même couleur que son fond :

| Bande | `--surface` (la carte) |
| --- | --- |
| Page (blanc cassé) | blanc |
| Blanche | gris chaud `#f1efe9` |
| Encre | blanc à 8 % |

C'est le même mécanisme de redéfinition locale que `.panel-ink`, et c'est
pour ça que `--paper` existe : `.section-panel--surface` doit pouvoir se
peindre en blanc tout en redéfinissant `--surface` pour ses enfants.

Au survol, une carte fait **une seule chose** : son remplissage passe d'un
cran. Pas de décollage, pas d'ombre, pas de bordure qui s'allume.

Les bordures ne survivent que sur les **contrôles** (le pager, le bouton du
menu mobile), où elles délimitent une zone cliquable.

## Constat, Méthode, Équipe — trois grilles de cartes

Le motif « rail horizontal avec des points » a disparu des sections 01 et 03.
Il disait « séquence ordonnée », ce que les quatre constats ne sont pas, et il
imposait une composition rigide.

**01 Constat** — 4 cartes en 2×2. Chaque carte porte un court trait bleu qui
**s'étend sur toute sa largeur au survol**. C'est la seule animation de la
section, et elle marque la carte qu'on lit au lieu de décorer.

**03 Méthode** — 4 cartes. Ces étapes-là **sont** ordonnées, donc le numéro
reste : posé en grand et très pâle dans le coin de la carte, il porte la
séquence sans qu'aucune ligne n'ait à relier les cartes.

**04 Équipe** — le portrait occupe le haut de la carte et le prénom se pose
dessus, sur un voile dégradé. Pour une agence de deux personnes sans logo
client à montrer, **les visages sont la preuve** : ils méritent mieux qu'une
vignette. La hauteur de l'image est indexée sur `--ss`, pas fixée par un
ratio, sinon la section sort de son écran sur une fenêtre courte.

`timeline-row.tsx` et tous les styles `chain-*` / `track-*` ont été supprimés.

## Cartes projet (Réalisations)

Le motif des cas clients de we-are.be : **média en haut occupant l'essentiel
de la carte**, puis le tag, le titre, le texte. Deux par ligne et non quatre,
parce que nos cartes portent une vidéo qu'on doit pouvoir regarder.

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

## Page Réalisations — blocs alternés

Le carrousel coverflow a été supprimé. **Il cachait trois projets sur quatre
derrière une interaction**, alors que ce sont précisément les projets qui
constituent l'argument d'une agence qui démarre.

À la place, `realisations-list.tsx` : une **grille de cartes** sur le modèle
des cas clients de we-are.be, deux par ligne, média 16:9 en haut de carte.

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
