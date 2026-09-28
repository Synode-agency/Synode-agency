# Synode — le système

Version du 28 septembre 2026. Source de vérité pour toute évolution du site.

> La page `/design-system` montre ce document **en fonctionnement** : elle
> est rendue par le site, avec ses propres classes et ses propres jetons.
> Si une valeur change dans `globals.css`, elle change là-bas aussi. Ce
> fichier explique les décisions ; la page montre le résultat.

Le fichier précédent était un journal de 31 Ko qui documentait un site
sombre n'existant plus. Celui-ci décrit le système tel qu'il est.

---

## 1. Le principe : la bande

**Une page Synode est une suite de bandes pleine largeur.** Chacune porte son
fond, et c'est le changement de fond, pas un cadre, qui sépare deux sections.
Une bande touche les deux bords de l'écran et court d'un bout à l'autre.

**Deux exceptions, et deux seulement** : le hero et le CTA final. Eux sont
des cartes encartées à bords arrondis. Ce sont les deux moments où la page
s'ouvre et se referme ; entre les deux, elle se lit à plat.

C'est la correction d'une première version où toute section était une carte.
Un titre et un paragraphe enfermés dans un cadre arrondi se lisent comme une
vignette ; vingt vignettes à la suite, et plus rien ne ressort.

### Les quatre fonds

| Fond | Usage | Règle |
| --- | --- | --- |
| `base` | Le gris de la page | — |
| `white` | La bande claire | — |
| `blue` | L'accent de couleur | **Une fois par page** |
| `ink` | Le point d'appui sombre | **Une fois par page** |

Deux bandes voisines ne portent jamais le même fond, sinon elles n'en font
qu'une ; le CSS pose un filet de secours si cela arrive. Une page qui compte
trois accents n'a plus de point d'appui, et la couleur cesse de vouloir dire
quelque chose.

L'accueil suit : gris, blanc, bleu, blanc, puis la carte finale et le pied de
page en encre.

### ⚠ Le fond d'une bande colorée est un littéral

`.band--blue` et `.band--ink` **redéclarent** `--brand` et `--foreground`
pour leurs enfants. Les propriétés personnalisées étant résolues au calcul,
un `background: var(--brand)` écrit dans ce même bloc lirait la **nouvelle**
valeur, donc du blanc.

La bande sortait entièrement inversée : fond blanc, texte bleu, numéros
invisibles. Le build était vert.

De même, `color` sur ces bandes vaut `#FFFFFF` et non
`var(--brand-foreground)` : ce dernier est ce qui se pose **sur** un bouton
de marque, et dans une bande bleue ce bouton devient blanc. Les deux rôles
sont inversés.

## 2. Couleur

Trois valeurs, et tout le reste en dérive. **Chaque paire texte sur fond a
été mesurée** selon la formule WCAG avant d'être écrite. Les ratios ne sont
pas décoratifs : ce sont les limites du système.

| Jeton | Valeur | Mesure |
| --- | --- | --- |
| `--background` | `#F2F1F1` | Le fond |
| `--surface` | `#FFFFFF` | 1,13:1 contre le fond |
| `--foreground` | `#464444` | 8,58:1 fond · 9,67:1 carte |
| `--muted-foreground` | `#605D5D` | 5,78:1 · 6,52:1 |
| `--text-mono` | `#6B6868` | 4,90:1 · 5,52:1 · 4,52:1 |
| `--brand` | `#0067EA` | 5,09:1 sur blanc, blanc dessus 5,09:1 |
| `--brand-hover` | `#0051B7` | 7,34:1 |
| `--accent-foreground` | `#004398` | 7,89:1 sur `--accent` |

### Pourquoi le fond vaut exactement `#F2F1F1`

Ce n'est pas un arrondi. C'est le point où le bleu de marque passe encore
**4,51:1** en texte, tout en gardant une séparation lisible avec les cartes
blanches (**1,13:1**).

Un cran plus sombre, le bleu tombe sous le seuil AA. Un cran plus clair,
les cartes blanches disparaissent et le principe du site avec elles.

### Les bandes colorées reteignent leur palette

`.band--ink` et `.band--blue` redéclarent `--foreground`,
`--muted-foreground`, `--hairline`, `--surface` et `--brand` pour leurs
enfants. Tout ce qu'elles contiennent devient lisible sans une seule règle
par composant.

Sur l'encre, le bleu de marque ne tient que **1,9:1** : il est relevé à
`#8FC0FF`, qui donne 7,4:1. Sans ça, tout ce qui est bleu disparaît de la
bande.

---

## 3. Typographie

**Une seule famille, Anodina.** La différence entre un titre et un
paragraphe se fait par le corps et la graisse, jamais par un changement de
police : deux familles mal appariées font plus amateur qu'une seule tenue
fermement.

Dix corps, et pas un onzième. Règle : **aucune taille ne s'écrit en dur
dans un composant**. Si une valeur manque, c'est l'échelle qu'on corrige.

| Jeton | Corps | Usage |
| --- | --- | --- |
| `--fs-display` | 2,5 → 5,5rem | Titre de page |
| `--fs-h2` | 1,875 → 3,5rem | Titre de section |
| `--fs-h3` | 1,25 → 1,75rem | Titre de bloc |
| `--fs-h4` | 1,06 → 1,31rem | Titre de tuile |
| `--fs-lead` | 1,125 → 1,375rem | Chapeau de section |
| `--fs-body` | 1 → 1,125rem | Texte courant |
| `--fs-small` | 0,875rem | Texte secondaire |
| `--fs-label` | 0,8125rem | Chapeau |
| `--fs-micro` | 0,75rem | Mention, pastille |
| `--fs-button` | 0,9375rem | Bouton |

`--fs-lead` est le seul ajout par rapport à l'échelle précédente. Le chapeau
d'une section n'est ni un titre ni du texte courant, et le faire passer pour
l'un des deux était ce qui aplatissait les pages.

### Les mesures

**Un titre a sa propre mesure, et elle n'a rien à voir avec celle du texte
courant.** À 56px, une mesure de lecture de 62 caractères fait courir un
titre sur quatre lignes. `.lede-title` est donc bridé à **22 caractères**.

- `--measure` : 62ch, texte courant.
- `--measure-lead` : 46ch, chapeau de section.

### ⚠ Ne jamais redéclarer l'échelle ailleurs

Un vestige de la version précédente redéclarait `--fs-h2` à partir de
`--hs`, un jeton supprimé depuis. La déclaration devenait invalide, la
valeur se résolvait à **vide**, et tous les titres de section retombaient à
16px hérités — plus petits que leur propre chapeau.

Le symptôme ne se voyait qu'à l'écran. Le build était vert.

---

## 4. Rayons

Cinq valeurs. Règle unique : **un contenu prend toujours un rayon plus petit
que son contenant.** Deux rayons égaux emboîtés font une bavure optique le
long de l'angle.

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `--r-xs` | 10px | Puces, tuiles d'icône, champs |
| `--r-sm` | 16px | Cartes internes |
| `--r-lg` | 28px | Cartes internes larges |
| `--r-panel` | 40px | Le hero et le CTA, les deux seules cartes |
| `--r-pill` | ∞ | Boutons, pastilles, la barre de nav |

---

## 5. Ombres

Deux valeurs, et pas une troisième. **Teintées d'encre et jamais noires** :
une ombre noire sur un fond chaud fait un trou gris, pas une feuille posée.

- `--shadow-card` : le repos des deux cartes, hero et CTA.
- `--shadow-lift` : le survol d'une **tuile cliquable** seulement. Une bande
  n'en prend jamais : elle n'est pas un objet posé.

À l'intérieur d'une bande, une tuile utilise un **fond** plutôt qu'une
ombre : deux ombres emboîtées font de la boue.

---

## 6. Composants

| Classe | Rôle | Règle |
| --- | --- | --- |
| `.btn--primary` / `.btn--ghost` | Les deux seuls boutons | Une page n'a jamais deux boutons pleins |
| `.tile` | La carte dans une bande | Fond, pas ombre |
| `.rows` / `.row` | Une suite, pas un ensemble | Un seul filet entre deux rangées |
| `.badge` | La nature d'une réalisation | Avant qu'on lise le titre |
| `.todo` | Un emplacement réservé | **Volontairement visible** |
| `.rank` | Le rang d'une étape | Seulement sur une vraie séquence |

### Pas d'ornement devant un chapeau

Ni tiret, ni pastille. Un ornement répété au-dessus de chaque titre donne à
la page le rythme d'un gabarit rempli, et il ne dit rien que le mot ne dise
déjà.

### Le chapeau est optionnel

Un chapeau ne se met **que s'il dit quelque chose que le titre ne dit pas**.
En mettre un au-dessus de chaque section donne à la page le rythme d'un
gabarit rempli, et la plupart ne font que redire le titre en plus petit.

### La numérotation aussi

Un rang ne s'affiche que sur une séquence réelle — la méthode, les étapes
d'un cas d'usage. Numéroter un ensemble non ordonné ne dit rien.

---

## 7. Accessibilité

Ces règles font partie du système, au même titre qu'une couleur.

- **Contraste** : 4,5:1 minimum pour le texte courant, 3:1 pour les grands
  titres. Mesuré, jamais estimé.
- **Focus** : un contour visible sur tout ce qui se focalise, déclaré une
  seule fois pour tout le site, inversé en blanc sur les panneaux colorés.
- **Cible tactile** : 44px minimum. Les boutons et les champs font 48px.
- **Mouvement** : toute animation se coupe sous `prefers-reduced-motion`.
- **Clavier** : un lien d'évitement, premier élément focalisable de chaque
  page.
- **Formulaire** : libellé au-dessus du champ et toujours visible. Une
  erreur se voit à la bordure **et** au message : la couleur seule ne suffit
  pas à qui ne la distingue pas.

---

## 8. Mouvement

Deux durées, une courbe. `--anim-element` (0,5s), `--anim-block` (0,7s),
`--anim-ease`.

Un seul moment orchestré par page : les cartes arrivent au scroll, court et
serré. Pas d'effet sur chaque élément.

**Exception assumée** : les trois interfaces animées du hero, seul élément
visuel repris de la version précédente du site. Elles n'apparaissent qu'une
fois, à un seul endroit.

---

## 9. Ce qu'on ne fait pas

- Deux boutons pleins sur une page.
- Un chapeau au-dessus de chaque section.
- Un rayon égal à celui de son contenant.
- Une taille écrite en dur dans un composant.
- Une bande colorée plus d'une fois par page.
- Une ombre noire.
- Une troisième carte arrondie.
- Un emplacement réservé discret.
- Un chiffre, un client ou un témoignage qui n'existe pas.
