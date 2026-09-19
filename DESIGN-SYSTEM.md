# Synode — Design System (landing)

Dérivé du *Synode — Master Plan* et de la base de connaissances `ui-ux-pro-max`.
Source de vérité pour toute évolution de la landing.

> **Fichiers liés :**
> - `design-system/99gates/MASTER.md` — recommandation automatique du skill (`search.py --design-system`)
> - `design-system/99gates/pages/landing.md` — écarts assumés vs MASTER (dark / émeraude / Space Grotesk)
> - Ce fichier — le système **tel que réellement implémenté**

## 0. Passe premium (refonte visuelle « site à 10 k$ »)

Objectif : rendu d'agence tech professionnelle, direction artistique et textes conservés.

- **Système de lignes fines** : tout est cadré au `--hairline` (`rgba(255,255,255,0.07)`). Bordures, dividers, grilles de cartes en `gap-px` sur fond `bg-hairline` (les cellules `bg-surface` laissent voir le trait). Rayon de base porté à `0.875rem`.
- **Surfaces** : `--surface` `#071e33` (cartes au repos), `--surface-2` `#0d2a45` (hover). Plus de `--card` opaque bleuté.
- **Typo** : titre display agrandi (`clamp` jusqu'à ~4.75rem), tracking négatif (`-0.035em` sur h1, `-0.02em` sur h2). Gradient du display = blanc → blanc 62 % (plus « blanc chaud », plus de teinte menthe). Labels = utilitaire `.eyebrow` (JetBrains Mono 500, `0.2em`, uppercase) précédé d'un tiret bleu électrique `— `.
- **Rythme vertical** : utilitaire `.section-y` (`py-24 sm:py-32 lg:py-40`) sur toutes les sections. Container `max-w-[76rem]`.
- **Micro-détails agence** : numéros fantômes `.num-ghost` (watermark 6 %), cadres d'angle `.corner-frame` (panneau CTA), rail de connexion fin derrière les cartes Méthode, `.tnum` (chiffres tabulaires) sur toutes les données, sheen bleu électrique en haut des cartes Offre / Réalisations.
- **Hover** : `.lift` / `.glow-hover` = translation `-3px` + bordure qui chauffe vers le bleu électrique + halo doux, 220 ms `cubic-bezier(.22,1,.36,1)`.
- **Header** : scroll-spy (soulignement bleu électrique animé sur la section active), toggle FR/EN en segments, hairline au scroll (`> 8px`).
- **Footer** : 3 colonnes (marque + tagline / navigation / contact) + barre basse (© + liens légaux). La barre basse est volontairement resserrée : `pt` et `pb` identiques (`clamp(1rem,0.85rem+0.6vw,1.6rem)`), donc l'espace au-dessus du filet et celui sous les liens se répondent.
- **Contact** : champs `h-12`, `rounded-xl`, fond `white/[0.02]`, focus `ring-4 ring-brand/15`.
- **Reveal** : fade + `translateY(14px)`, `0.65s`. Fallback `<noscript>` dans `layout.tsx` → contenu visible sans JS.

## 0 bis. Passe « une section = un écran » + éclatement en pages

Refonte de la navigation et du rythme de la landing.

### Landing : sections plein écran (desktop)

- Utilitaire `.section-screen` : à partir de `lg` (1024 px), `min-height: 100dvh`, contenu centré verticalement, `padding-block` haut qui réserve les `4.6rem` du header fixe. **Sous `lg`, la section retrouve son flux naturel** — sur mobile le contenu respire et on scrolle normalement, comme demandé.
- Nouveau token `--ss` : `clamp(0.62, calc(100dvh / 900px), 1)`. Même principe que `--hs` pour le hero, appliqué aux sections plein écran — sur une fenêtre courte (13"), titres et espacements se resserrent ensemble pour que tout tienne sans rogner.
- Enchaînement : `Hero` → `01 Le constat` → `02 Notre offre` → `03 Méthode & qui nous aidons` → `04 L'équipe` → `CtaBand + footer`.
- `CtaBand` et le footer partagent **un seul** écran : ils sont enveloppés dans `.screen-shell` (`min-height:100dvh`, colonne flex) et la section porte `.section-screen-with-footer` (`flex:1`).
- `scroll-margin-top: 0` sur les `.section-screen` en desktop : leur padding haut absorbe déjà le header, donc une ancre les cale pile en haut du viewport (utile pour `#offre` depuis la nav et les cartes du hero).

### Mobile : fond atténué, menu plein écran

**Le fond est nettement plus discret sous `md`** : le shader est mis à l'échelle du viewport, donc sur un téléphone ses zones lumineuses occupent une part bien plus grande de l'écran qu'un moniteur, à réglages identiques. D'où `opacity-25 md:opacity-100` sur le shader et `opacity-45 md:opacity-100` sur le dégradé statique. Les réglages du shader eux-mêmes ne changent pas.

**Le menu mobile couvre tout l'écran** (`fixed inset-0`, fond opaque) et se place **sous la barre du header dans l'ordre d'empilement** (`relative z-10` sur la barre, `z-0` sur le panneau) : le logo et la croix se posent donc sur le noir. Quand le panneau est ouvert, la barre repasse en transparent complet même si la page était scrollée, sinon une couture apparaît sous le logo. Contenu centré verticalement.

**`AgentDiagram` s'affiche aussi sur mobile**, sur une seule ligne comme sur desktop. Les nœuds ne sont espacés que de 15 % du canevas, soit environ 51 px sur un téléphone : les boîtes desktop se chevaucheraient, d'où une taille propre sous `sm` (`size-8`, logo central `size-10`).

### Aucun scroll horizontal

`body` porte `overflow-x: clip`. **`clip` et pas `hidden`** : `hidden` ferait de `<body>` un conteneur de défilement et le scroll-snap déclaré sur `<html>` cesserait de fonctionner, alors que `clip` coupe sans créer de conteneur (et laisse donc aussi les `position: sticky` s'accrocher au viewport).

C'est un garde-fou, pas une excuse : les deux débordements connus sont coupés à la source, le plateau du carrousel (`overflow-x-clip`, les cartes hors centre dépassent largement) et le rail du Constat (`overflow-x-clip`, la lueur finit à `left: 100%`).

### Fond global fixe — `SiteBackground`

**Le site entier scrolle au-dessus d'une seule surface.** Plus aucun fond par section : le contenu est posé sur un plan fixe, continu du haut de la landing au bas des pages légales, sans la moindre couture.

`src/components/site/site-background.tsx`, monté **une seule fois** dans `app/layout.tsx`, en `fixed inset-0 -z-10 pointer-events-none`. Trois couches, du fond vers l'avant :

1. `bg-background` — le navy de base.
2. `.site-bg-wash` — trois halos radiaux très larges et très diffus (`--brand` 14 %, `--brand-deep` 15 %, `--brand` 10 %) posés haut-gauche, droite et bas. C'est ce qui donne la profondeur même quand l'animation est coupée.
3. `Ferrofluid` — le shader du hero, désormais **global**, `opacity 0.16`, `mouseInteraction` désactivé (le curseur n'a pas à réagir sur toute la hauteur du site).
4. `.grain` à 25 % par-dessus, pour qu'aucun dégradé ne fasse de bandes.

Conséquences :

- Le hero n'a **plus** son propre `Ferrofluid`, la page Réalisations non plus, et le `CtaBand` a perdu son halo local. Une seule instance du shader tourne pour tout le site.
- Les sections sont **transparentes** : elles ne portent qu'un `border-t border-hairline` comme séparation. Les cartes gardent leur `bg-surface` opaque pour rester lisibles.
- Pause automatique quand l'onglet est masqué (`visibilitychange` → prop `paused`).
- Sous `prefers-reduced-motion`, le shader n'est pas monté du tout : seuls le wash statique et le grain subsistent.

### Navigation interne — `NavLink`

`src/components/site/nav-link.tsx`, utilisé par le header (logo, nav desktop, menu mobile), le footer et les cartes de services du hero.

**Le problème qu'il règle** : le navigateur ne scrolle vers un `#hash` que si le hash *change*. Une ancre devient donc morte une fois qu'on est déjà à cette URL — clic sur Offre, clic sur Accueil, re-clic sur Offre : plus rien.

**Ce qu'il fait** : si la route cliquée est celle où l'on se trouve déjà, il prend la main — `preventDefault`, scroll piloté en JS vers la cible (ce qui marche quel que soit le hash courant), puis `history.replaceState` pour que la barre d'adresse corresponde. Un lien sans hash remonte en haut **et nettoie le hash résiduel**, ce qui déverrouille le prochain clic sur une section.

Une route différente retombe sur le comportement normal de `next/link`. Les clics modifiés (Cmd, Ctrl, Shift, Alt) ne sont jamais interceptés, et le `href` reste un vrai lien : fonctionnel sans JS, visible dans la barre d'état.

`replaceState` plutôt que `pushState` : un scroll interne n'a pas à empiler une entrée d'historique par section visitée.

### Pager de sections — `SectionPager`

`src/components/site/section-pager.tsx`, monté **une seule fois** dans `SitePage`. Remplace les anciennes flèches par-section, qui s'empilaient visuellement à la remontée et masquaient les cartes de services du hero.

- **Un seul contrôle pour toute la landing**, en `fixed` au milieu du bord droit (`top: 50%`), donc jamais au-dessus d'un contenu.
- **Bidirectionnel** : chevron haut vers la section précédente, chevron bas vers la suivante, désactivés aux extrémités.
- Entre les deux, **un point par section** : le point actif s'étire en barre `--brand`. Sert d'indicateur de progression et de raccourci — chaque point est cliquable.
- **Subtil au repos** : `opacity: 0.45`, fond `surface/40`, hairline à 60 %. Passe à `opacity: 1` au survol **et au focus clavier** (`focus-within`).
- La section courante est suivie par `IntersectionObserver` (mêmes réglages que le scroll-spy du header). Le retour à l'index 0 fait un `scrollTo(0)` plutôt qu'un `scrollIntoView`, parce que le hero passe sous le header fixe.
- Desktop uniquement (`hidden lg:flex`).

### Pages autonomes

Deux sections quittent la landing pour leur propre route, **scrollables, sans contrainte 100vh** :

| Route | FR | EN |
|---|---|---|
| Réalisations | `/realisations` | `/en/realisations` |
| Contact | `/contact` | `/en/contact` |

- Helpers dans `content.ts` : `localePrefix(locale)` et `path(locale, sub)` construisent les chemins par langue.
- La nav du header et du footer pointe sur de vrais `next/link` ; le scroll-spy ne tourne que sur la landing (`usePathname()`), les autres pages sont surlignées par correspondance de route.
- `PageHero` (`site/page-hero.tsx`) : bloc de tête partagé — eyebrow, titre, chapô, puis une ligne mono de faits clés (`stats`).

### Carrousel Réalisations — coverflow

`site/realisations-carousel.tsx`, réécrit : cartes empilées en profondeur autour de la carte active.

- **Cartes au format paysage** (`w-[min(92vw,62rem)]`, `sm:flex-row`) : ces réalisations sont des démos, donc chaque carte réserve à gauche un emplacement destiné à une **vidéo** de la démo, ou à une **image** quand le démonstrateur est testable en ligne. Le partage est **60 % média / 40 % texte**, à partir de `lg` seulement.
- Padding de carte `clamp(1.75rem,1.4rem+1.8vw,3rem)` et gouttière `clamp(1.25rem,1rem+1.4vw,2.25rem)`.
- **Deux mises en page, pas une seule qu'on rétrécit.** En dessous de `lg`, carte portrait étroite (`w-[min(92vw,25rem)]`, média au-dessus, plateau `h-[38rem]`). À partir de `lg`, carte paysage (`w-[min(92vw,56rem)]`, plateau `h-[24rem]`). Entre les deux, une seule carte paysage laisserait une colonne de texte d'environ 240 px, trop étroite pour la description.
- **Le bloc média fait toute la hauteur de la carte** (`lg:h-full`) : son bord haut s'aligne sur la ligne `D/xx` et son bord bas sur la ligne de résultat. Il n'a donc pas de ratio imposé, mais la hauteur du plateau est choisie pour qu'il reste proche du 16:9 (ratio ~1,6), afin qu'une vidéo en `object-contain` n'y laisse qu'une quinzaine de pixels de bandes.
- **La hauteur du plateau est dictée par la colonne de texte, pas par le média.** C'est la contrainte serrée : à 40 % de largeur, la description tient sur 5 lignes et remplit presque toute la hauteur disponible. Sur `public/card-retravailler/cards-realisation.png`, elle débordait et sa dernière ligne était rognée par `overflow-hidden`. Si un texte s'allonge, c'est ici que ça casse en premier.
- **Pas de ligne d'outils.** Sous la description, seul le résultat apparaît. Le champ `stack` existe toujours dans `content.ts` mais n'est plus affiché : le visiteur veut savoir ce que ça lui rapporte, pas avec quoi c'est construit.
- Le média est en `object-contain` : une capture d'écran ne doit jamais être recadrée.
- Le domaine passe sur sa propre ligne plutôt que d'être tronqué, et la typo de la colonne reste d'un cran sous celle du reste du site.
- L'emplacement média lit deux champs optionnels par item, `video` et `poster` : vidéo `controls playsInline preload="metadata"` si `video` est là, image sinon, et à défaut le schéma de processus qui **tient la place** en attendant les captures.
- Décalage latéral + `scale` + `opacity` décroissants par distance à l'index actif ; au-delà de 2 crans, `pointer-events: none`. Le pas latéral est plus court qu'en portrait (44 % + 4 % par cran) parce que les cartes sont larges.
- Pastilles de filtre au-dessus (le `short` de chaque item) + un lien « Parler du vôtre » vers le contact.
- Contrôles : flèches ← →, pastilles de progression, et flèches clavier quand la zone a le focus.
- Transition `500ms cubic-bezier(.22,1,.36,1)`, la même courbe que le reste du site.


### Constat : des points, pas des numéros

Les quatre constats sont **équivalents, pas ordonnés** : ils ne portent donc aucun numéro. `site/timeline-row.tsx`, variante `chain`, affiche à la place un petit `.chain-pip` bleu de 8 px.

- Le halo du point (`::after`) porte la pulsation, jamais le point lui-même : le `scale` de survol ne se bat donc pas avec l'animation. Chaque point est décalé de `0,55 s` via `--pip-delay`.
- Le rail est dessiné **une seule fois pour toute la rangée** (`.chain-rail-line`), et non plus segment par segment dans chaque nœud, avec un `.chain-rail-glow` qui le balaie **de gauche à droite** en 7 s.
- Sous `prefers-reduced-motion`, la lueur disparaît et tout est figé.
- La variante `track` (Méthode) **garde ses numéros** : cette suite-là est bien ordonnée.

### Offre : cartes horizontales, badges en 2×2

Les deux cartes occupent toute la largeur de `container-page` (`lg:grid-cols-2`), donc un **format paysage**. C'est ce format qui permet à la section de tenir sur un écran : une carte portrait pousse la hauteur.

- Les 4 badges sont en `grid-cols-2` : deux par ligne, deux lignes, **chaque pastille remplissant sa cellule** pour que les quatre s'alignent sur une grille nette (référence : `public/card-retravailler/cards-offre.png`).
- `sm:whitespace-nowrap` : à partir de `sm`, un badge ne revient jamais à la ligne à l'intérieur de sa pastille (c'est ça qui donnait l'impression de quatre lignes). En dessous, la carte est trop étroite, donc on laisse le texte passer à la ligne plutôt que d'être coupé.
- Padding de carte `px-[clamp(28px,3vw,52px)]` / `py-[calc(var(--ss)*clamp(30px,2.8vw,48px))]`.
- **Toutes les respirations verticales sont indexées sur `--ss`** : padding de carte, hauteur des pastilles, marges du texte et du bloc Résultat. Elles s'ouvrent sur un grand écran et se referment sur un portable. C'est la seule chose qui tient la section dans son écran, la marge y est faible : toute hauteur ajoutée ici doit être `--ss`-indexée, jamais fixe.

### FAQ de clôture

`sections/faq.tsx`, dernière section numérotée (`05`), **entre l'encadré bleu et le footer**. C'est elle qui partage désormais son écran avec le footer via `.screen-shell` ; la CTA finale, qui occupait ce créneau, a récupéré un écran entier.

**Accordéon, une seule réponse ouverte à la fois** (`site/faq-accordion.tsx`, client). Ce n'est pas qu'une question de style : la section partage son écran avec le footer, et plusieurs réponses ouvertes passeraient sous la ligne de flottaison. **Tout est fermé au chargement** : on n'incite pas le visiteur à lire, il ouvre ce qui l'intéresse.

Colonne unique bornée à `max-w-3xl`, barre de question sur `bg-surface` (`bg-surface-2` à l'ouverture et au survol), filet en bas, chevron qui pivote et passe au bleu.

L'ouverture anime `grid-template-rows: 0fr -> 1fr` : la hauteur naturelle du contenu est atteinte **sans la mesurer en JS**, donc pas de `scrollHeight` ni de recalcul au redimensionnement. Espacements indexés sur `--ss`.

Les 5 réponses engagent l'entreprise (délais, prix fixe, données). À relire avant mise en ligne, en particulier la promesse sur l'entraînement des modèles d'IA, qui doit rester vraie au regard des offres réellement utilisées.

### CTA finale encadrée

`sections/cta-band.tsx` reprend **le même bloc bleu que la CTA de fin de la page Réalisations**, à l'identique : `corner-frame`, `rounded-3xl`, `border-brand/25`, `bg-gradient-to-br from-brand-dim/25 to-transparent`, **toute la largeur de `container-page`** et le texte centré dans un `max-w-2xl` à l'intérieur. Les deux blocs doivent rester interchangeables : si l'un change, l'autre aussi.

Seule différence assumée : le padding vertical est indexé sur `--ss`, parce que ce bloc-ci partage son écran avec le footer.

### Hero : les 4 services en cartes flottantes

`sections/pillars-band.tsx` n'est plus une bande divisée mais **4 cartes distinctes** (`rounded-[1.1rem]`, `border-hairline`, `bg-surface/80`, `backdrop-blur`), chacune : tuile d'icône animée, titre, texte, chevron à droite, barre d'accent bleue en bas à gauche.

- Animation `card-float` : flottement vertical 6 à 8 px, durée et délai **décalés par carte** (table `FLOAT`) pour que les quatre ne bougent jamais à l'unisson. Désactivé sous `prefers-reduced-motion` (l'animation n'est déclarée que dans `@media (prefers-reduced-motion: no-preference)`).
- Au survol : bordure qui chauffe vers le bleu, halo porté, chevron qui glisse, et un `bar-sweep` qui balaie la barre d'accent.
- Chaque carte est un lien vers `#offre`.

### Section Équipe

`sections/team.tsx`, quatrième section numérotée. Deux cartes (Antonino, Killian), chacune avec le portrait, le nom, **les deux lignes de rôle** (`Automatisation & Agents IA` et `Développement & Outils métier` — les deux le font), et un paragraphe.

Portraits : `public/equipe/antonino.png` et `public/equipe/killian.png` (1254×1254), référencés par `team.members[].photo` dans `content.ts`, servis par `next/image` et détourés en disque (`rounded-full`, `object-cover`) dans un anneau `brand/35`. Au survol de la carte : l'anneau chauffe vers `brand/70`, un halo bleu apparaît et la photo fait un léger `scale(1.05)`.

### Logo : la marque seule dans la navbar

`Wordmark` prend une prop `variant` :

- `"plate"` (défaut) — `synode-logo.png`, le carré arrondi complet. Plus utilisé nulle part sur le site ; conservé pour un usage hors écran (favicon, export, partage).
- `"mark"` — `synode-mark.png`, **le S détouré, sans carré ni fond**. C'est la variante de la navbar **et du footer**.

`public/synode-mark.png` a été produit à partir de `synode-logo.png` par détourage (clé sur la « bleuité » `b - r`, remplissage des reflets internes par flood-fill depuis l'extérieur, puis conservation de la plus grande composante connexe). Le hero n'est pas touché.

### Formulaire de contact

Champs, dans l'ordre : **Nom / Prénom** (2 colonnes), **E-mail professionnel / Numéro de téléphone** (2 colonnes), **Délai souhaité** (select), **Le problème à résoudre** (textarea), puis le bouton « Envoyer la demande » et la mention, centrés.

- Société, Offre concernée et Budget envisagé ont été retirés du contenu, du formulaire et de `/api/audit` ; `contact.offers` et `contact.budgets` n'existent plus.
- Le téléphone est **obligatoire**, validé par une regex volontairement permissive (`PHONE_RE`) : les formats internationaux varient trop pour être contraints sans rejeter des numéros valides.
- La mention est explicite en une phrase : usage unique pour traiter la demande, **aucune newsletter, aucune revente, aucune conservation en base**. Cette promesse engage `/api/audit`, qui ne doit donc jamais insérer en base sans que la phrase change (et les pages légales avec).

### Pages légales

`src/lib/legal.ts` porte le contenu, `site/legal-page.tsx` le rendu, et deux routes dynamiques le servent : `/legal/[slug]` et `/en/legal/[slug]`, pré-générées via `generateStaticParams`.

Quatre documents, slugs partagés entre les deux langues pour que le sélecteur FR/EN reste sur la même page :

| Slug | FR | EN | Pourquoi |
|---|---|---|---|
| `mentions-legales` | Mentions légales | Legal notice | Identification de l'éditeur — obligatoire (directive e-commerce, Code de droit économique) |
| `confidentialite` | Politique de confidentialité | Privacy policy | RGPD — obligatoire dès la première donnée collectée par le formulaire |
| `cookies` | Politique cookies | Cookie policy | Art. 129 de la loi du 13 juin 2005 ; le site ne pose aujourd'hui que des cookies strictement nécessaires |
| `conditions` | Conditions générales | Terms and conditions | Cadre B2B des prestations : périmètre, propriété du code et des données, recours à l'IA, responsabilité |

Le footer les liste en bas, à la place de l'ancienne note « Site en cours de finalisation » (le champ `site.footerNote` a été supprimé de `content.ts`). Une colonne de navigation entre les quatre pages accompagne chaque document, collante en desktop.

**Les passages à compléter sont marqués `TODO` dans la copie et rendus en encadré rouge pointillé** (numéro BCE, adresse, hébergeur, sous-traitants, échéancier de paiement). Impossible de les rater en relecture, impossible de les mettre en ligne par accident. Ces textes sont un squelette de travail, pas un avis juridique : à faire relire avant mise en ligne.

## 1. Positionnement → décisions

| Entrée (master plan) | Décision design |
|---|---|
| Entreprise tech B2B, cible PME/indépendants non-tech | Pattern **Trust & Authority + Feature-Rich Showcase** (reasoning « B2B Service ») |
| « Comprendre le problème d'abord » — pas de push techno | Ton consultatif, section **Approche** avant l'offre, zéro survente |
| 4 domaines vendables séparément ou combinés | Section **Offre** en grille bento 2×2 |
| Audit → Recommandations → Implémentation → Suivi | Section **Méthode** en 4 étapes numérotées + chaîne process complète |
| 3 démonstrations (prospect / IA doc / process admin) | Section **Cas d'usage** en chaînes d'étapes (workflow chips) |
| Pas encore de clients | **Aucun faux témoignage / logo client** — les démos font la preuve |

## 2. Style

- **Base** : Dark Mode (OLED) + Swiss Minimalism. Fond deep navy, grille, hiérarchie nette, un seul accent.
- **Offre** : Bento Box Grid (cartes, `rounded-2xl`, hover `border-brand/40`).
- **À éviter** (anti-patterns B2B) : dégradés violet/rose « IA », design joueur, ombres lourdes, effets 3D.

## 3. Tokens (`src/app/globals.css`)

Thème **dark-only** (défini sur `:root` ET `.dark`, `color-scheme: dark`).

| Token | Valeur | Usage |
|---|---|---|
| `--background` | `#011222` | fond global (deep navy, imposé par le client) |
| `--foreground` | `#EEF3F8` | texte principal (~16:1) |
| `--card` / `--surface` | `#071E33` | surfaces, cartes |
| `--secondary` / `--muted` | `#0A2036` | surfaces secondaires |
| `--muted-foreground` | `#8CA3B8` | texte secondaire (~6.7:1, AA) |
| `--border` / `--input` | `rgba(255,255,255,.08)` | traits, champs (overlay blanc translucide) |
| `--primary` / `--brand` | `#00A8F8` | bleu électrique (échantillonné sur le logo client), CTA |
| `--brand-bright` | `#33BEFF` | hover CTA, `--ring` |
| `--brand-dim` | `#0B2F49` | halos, tints d'icônes |
| `--primary-foreground` | `#011222` | texte sur bouton bleu (~7.2:1, reprend le navy du fond) |
| `--destructive` | `#F43F5E` | erreurs de formulaire |
| `--radius` | `0.875rem` | rayon de base |

Utilitaires maison : `.container-page` (max-w-6xl), `.grain`, `.brand-glow`, `.text-gradient-brand`, `.reveal`.

## 4. Typographie (`next/font/google`)

| Rôle | Police | Variable |
|---|---|---|
| Titres (h1–h4) | **Space Grotesk** 500/600/700 | `--font-heading` |
| Corps | **Inter** | `--font-sans` |
| Labels / eyebrows / workflow | **JetBrains Mono** 400/500 | `--font-mono` |

Eyebrows : mono, `uppercase`, `tracking-[0.2em]`, `text-brand`, pastille ● devant.
Titres de section : `text-3xl sm:text-4xl`, `font-semibold`, `leading-[1.1]`, `text-balance`.

## 5. Motion (dial ~5/10)

- Révélation au scroll : `IntersectionObserver` (`threshold 0.15`), fade + `translateY(18px)`, `0.6s cubic-bezier(.22,1,.36,1)`, stagger 50–70 ms par carte.
- Hover cartes : `border` / `bg` transition, pas de layout shift.
- `.glow-hover` (globals.css) : au survol, bordure bleu électrique + léger halo (`box-shadow` anneau 1px 20 % + flou 44 px 42 %), 250 ms ; base à `box-shadow` transparent de même géométrie pour une transition propre. Un enfant `.glow-hover-num` reçoit en plus un `text-shadow` bleu électrique. Utilisé sur les cartes de la section Méthode (les flèches entre cartes ont été retirées).
- **`prefers-reduced-motion`** : `scroll-behavior: auto`, animations neutralisées, `.reveal` forcé visible.
- Header : `backdrop-blur` + bordure au scroll (`> 12px`).

### Effet de fond du hero — `SynapseField`

`src/components/site/synapse-field.tsx` : réseau « synaptique » sur `<canvas>` 2D,
seul effet animé de la vue (règle skill : 1–2 max).

- Nœuds qui dérivent lentement + liens entre voisins (`linkDistance` px) ; ~14 % de « hubs » avec halo.
- Réactif à la souris : les nœuds proches sont repoussés doucement (force *clampée*), et des liens `--brand-bright` relient le curseur aux nœuds voisins (`pointerRadius`). Ignoré au toucher.
- Couleurs lues sur `--brand` / `--brand-bright` (suit le thème).
- Perf : DPR plafonné à 2 · `rAF` en pause hors-écran (`IntersectionObserver`) et onglet masqué (`visibilitychange`) · `ResizeObserver` · `globalCompositeOperation = "lighter"` pour le glow.
- `prefers-reduced-motion` → **une seule frame statique**, pas de boucle, pas de réaction souris.
- `pointer-events: none`, `aria-hidden`, `-z-10`, masque radial (`mask-image`) pour dissoudre derrière le titre + `opacity-70`.
- **Parallaxe** : le canvas dérive vers le bas (max 24 px) au scroll du hero — `transform` uniquement, rAF-batché, coupé sous reduced-motion. Prop `parallax` (défaut `0.05`, `0` = off).
- Props : `density` (64), `linkDistance` (132), `pointerRadius` (190), `intensity` (1), `parallax` (0.05).

### CTA magnétique — retiré

L'effet d'aimantation au curseur (`Magnetic`) a été supprimé sur demande du client. Les CTA gardent leur hover de couleur + le décalage de la flèche.

### Aura du titre — `.title-aura`

Dégradé conique bleu électrique flouté (`blur(64px)`, `opacity .5`, `--brand-dim` + `--brand`) derrière le `<h1>`, dans un conteneur `relative isolate`.

- Rotation via **`transform: rotate()`** (compositeur seul, le flou n'est jamais repeint) — pas d'`@property` animé. `sg-spin` 24 s linéaire.
- `prefers-reduced-motion` → `animation: none`. `aria-hidden`, `-z-10`, `pointer-events: none`.
- Bleu électrique uniquement (jamais violet/rose — anti-pattern MASTER).

## 6. Structure des sections (`src/components/sections/`)

**Landing** : `Hero` (+ 4 cartes services) → `Problem` (01) → `Offer` (02) → `Method` (03, inclut « qui nous aidons ») → `Team` (04) → `CtaBand` + footer dans un même écran.
**Pages autonomes** : `/realisations` (carrousel coverflow + CTA) et `/contact` (formulaire). Voir §0 bis.

*(La bande de stats « 24h · 2 · 100% · FR/EN » entre le Hero et `Problem` a été retirée à la demande du client — `sections/stats.tsx` supprimé.)*

Nav : Accueil `/` · Offre `/#offre` · Réalisations `/realisations` · bouton « Nous contacter » `/contact` · sélecteur **FR / EN**.

### Bilingue (FR / EN)

- Deux routes statiques : `/` (FR, défaut) et `/en` (EN). Le sélecteur FR/EN du header est un vrai `next/link` entre les deux ; la langue active est un `<span>` non cliquable.
- Contenu 100 % centralisé et traduit dans `src/lib/content.ts` (`content.fr` / `content.en`, même forme, `as const`). Chaque section reçoit une prop `locale: Locale` et lit `getContent(locale)`.
- `src/components/site/site-page.tsx` compose les sections une seule fois ; `app/page.tsx` → `locale="fr"`, `app/en/page.tsx` → `locale="en"`.
- `<html lang>` : le layout racine (partagé) rend `lang="fr"` ; `src/components/site/html-lang.tsx` (client) corrige en `"en"` sur `/en` après hydratation.
- SEO : `alternates.languages` (`fr` → `/`, `en` → `/en`) dans `layout.tsx` et `app/en/page.tsx` ; métadonnées EN dédiées (`title: { absolute }` pour ne pas doubler la marque via le template).
- Le formulaire envoie aussi `locale` à `/api/audit`.

Chaque `section[id]` a `scroll-margin-top: 6rem` (compense le header fixe).

### Eyebrows = pastilles bordées

`SectionHeading` rend l'eyebrow en pastille (`rounded-full border`, mono, uppercase, `tracking-[0.22em]`, `text-brand`), préfixée du numéro de section (`01 / Le constat`…). Centrée pour Constat/Offre/Méthode/Réalisations ; alignée à gauche pour Qui-nous-aidons/Contact.

## 7. Accessibilité

- Contrastes texte ≥ 4.5:1 (principal ~16:1, secondaire ~6.7:1) ; accent bleu électrique sur le fond navy ~7.2:1.
- Icônes décoratives : `aria-hidden` (via composant `Icon`).
- Bouton menu mobile : label dynamique, `aria-expanded`, cible 44×44.
- Formulaire : `<label>` visible par champ, erreurs `role="alert"` + `aria-describedby`, focus sur le 1er champ invalide, types (`email`, `inputMode`) + `autoComplete`.
- Wide content (chaînes process) dans des conteneurs `overflow-x-auto` — pas de scroll horizontal de page.

## 8. À compléter (placeholders)

- **Domaine / URL** : `https://99gates.io` dans `src/app/layout.tsx` (`metadataBase`, OpenGraph).
- **E-mail de contact** : `contact@99gates.io` dans `src/lib/site.ts`.
- **Envoi du formulaire** : `src/app/api/audit/route.ts` valide et logge seulement. Brancher Resend / CRM / notification (voir `TODO` dans le fichier).
- **Image OpenGraph** : ajouter `src/app/opengraph-image.png` (1200×630).
- **Mentions légales / RGPD** : page dédiée si prospection e-mail.
