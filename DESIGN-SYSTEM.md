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
- **Surfaces** : `--surface` `#0b0f13` (cartes au repos), `--surface-2` `#0f151b` (hover). Plus de `--card` opaque bleuté.
- **Typo** : titre display agrandi (`clamp` jusqu'à ~4.75rem), tracking négatif (`-0.035em` sur h1, `-0.02em` sur h2). Gradient du display = blanc → blanc 62 % (plus « blanc chaud », plus de teinte menthe). Labels = utilitaire `.eyebrow` (JetBrains Mono 500, `0.2em`, uppercase) précédé d'un tiret émeraude `— `.
- **Rythme vertical** : utilitaire `.section-y` (`py-24 sm:py-32 lg:py-40`) sur toutes les sections. Container `max-w-[76rem]`.
- **Micro-détails agence** : numéros fantômes `.num-ghost` (watermark 6 %), cadres d'angle `.corner-frame` (panneau CTA), rail de connexion fin derrière les cartes Méthode, `.tnum` (chiffres tabulaires) sur toutes les données, sheen émeraude en haut des cartes Offre / Réalisations.
- **Hover** : `.lift` / `.glow-hover` = translation `-3px` + bordure qui chauffe vers l'émeraude + halo doux, 220 ms `cubic-bezier(.22,1,.36,1)`.
- **Header** : scroll-spy (soulignement émeraude animé sur la section active), toggle FR/EN en segments, hairline au scroll (`> 8px`).
- **Footer** : 3 colonnes (marque + tagline / navigation / contact) + ligne légale.
- **Contact** : champs `h-12`, `rounded-xl`, fond `white/[0.02]`, focus `ring-4 ring-brand/15`.
- **Reveal** : fade + `translateY(14px)`, `0.65s`. Fallback `<noscript>` dans `layout.tsx` → contenu visible sans JS.

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

- **Base** : Dark Mode (OLED) + Swiss Minimalism. Fond near-black, grille, hiérarchie nette, un seul accent.
- **Offre** : Bento Box Grid (cartes, `rounded-2xl`, hover `border-brand/40`).
- **À éviter** (anti-patterns B2B) : dégradés violet/rose « IA », design joueur, ombres lourdes, effets 3D.

## 3. Tokens (`src/app/globals.css`)

Thème **dark-only** (défini sur `:root` ET `.dark`, `color-scheme: dark`).

| Token | Valeur | Usage |
|---|---|---|
| `--background` | `#05070A` | fond global |
| `--foreground` | `#E9EDF0` | texte principal (~18:1) |
| `--card` | `#0B0F14` | surfaces, cartes |
| `--secondary` / `--muted` | `#11161C` | surfaces secondaires |
| `--muted-foreground` | `#97A3AF` | texte secondaire (~7:1, AA) |
| `--border` / `--input` | `#1B242E` | traits, champs |
| `--primary` / `--brand` | `#10B981` | accent émeraude, CTA |
| `--brand-bright` | `#34D399` | hover CTA, `--ring` |
| `--brand-dim` | `#0F3D30` | halos, tints d'icônes |
| `--primary-foreground` | `#04120C` | texte sur bouton émeraude (contraste fort) |
| `--destructive` | `#F43F5E` | erreurs de formulaire |
| `--radius` | `0.75rem` | rayon de base |

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
- `.glow-hover` (globals.css) : au survol, bordure émeraude + léger halo (`box-shadow` anneau 1px 20 % + flou 44 px 42 %), 250 ms ; base à `box-shadow` transparent de même géométrie pour une transition propre. Un enfant `.glow-hover-num` reçoit en plus un `text-shadow` émeraude. Utilisé sur les cartes de la section Méthode (les flèches entre cartes ont été retirées).
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

Dégradé conique émeraude flouté (`blur(64px)`, `opacity .5`, `--brand-dim` + `--brand`) derrière le `<h1>`, dans un conteneur `relative isolate`.

- Rotation via **`transform: rotate()`** (compositeur seul, le flou n'est jamais repeint) — pas d'`@property` animé. `sg-spin` 24 s linéaire.
- `prefers-reduced-motion` → `animation: none`. `aria-hidden`, `-z-10`, `pointer-events: none`.
- Émeraude uniquement (jamais violet/rose — anti-pattern MASTER).

## 6. Structure des sections (`src/components/sections/`)

`Hero` (+ 4 piliers) → `Stats` (bande 4 chiffres) → `Problem` (01, `border-t` en séparateur) → `Offer` (02, 2 offres) → `Method` (03) → `Realisations` (4 démonstrateurs + mini-CTA) → `Audience` (04 + carte « Nos règles ») → `CtaBand` → `Contact` (form enrichi) → footer.

Nav : Accueil `#top` · Offre `#offre` · Réalisations `#realisations` · bouton « Nous contacter » `#contact` · sélecteur **FR / EN**.

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

- Contrastes texte ≥ 4.5:1 (principal ~18:1, secondaire ~7:1) ; accent émeraude sur near-black ~8:1.
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
