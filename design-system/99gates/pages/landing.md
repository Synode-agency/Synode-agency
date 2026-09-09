# Page Override — Landing (`/`)

> Ce fichier **remplace** les règles de `../MASTER.md` là où il y a conflit.
> Raison des écarts : direction visuelle choisie explicitement par le client
> (Killian) via le skill `ui-ux-pro-max` — « dark premium tech, accent émeraude,
> français ». Tout le reste du MASTER s'applique tel quel.

## Écarts assumés vs MASTER

| Sujet | MASTER (recommandation auto) | Landing (choix client) | Justification |
|---|---|---|---|
| **Mode** | Light supporté + dark supporté | **Dark-only** (pas de toggle) | Positionnement « produit tech sérieux » ; registre des agences auto/IA |
| **Palette** | Navy `#0F172A` + CTA bleu `#0369A1` sur `#F8FAFC` | Near-black `#05070A` + accent **émeraude** `#10B981` / `#34D399` | Accent unique pour CTA (règle MASTER respectée), émeraude = « gain de temps / efficacité » |
| **Typo** | Roboto / Roboto (MD3) | **Space Grotesk** (titres) + **Inter** (corps) + **JetBrains Mono** (labels) | Pairing « Tech Startup » du dataset (best-for : tech, startups, SaaS, dev tools, AI) — plus adapté à une landing d'agence que Roboto |
| **Motion** | GSAP `Stagger List`, `back.out(1.4)`, 300–450 ms | IntersectionObserver + CSS, fade + `translateY`, 600 ms, `cubic-bezier(.22,1,.36,1)`, stagger 50–70 ms | Pas de dépendance GSAP ; overshoot évité (rendu plus « premium restrained ») ; `prefers-reduced-motion` respecté à l'identique |

## Conservé du MASTER (non négocié)

- **Pattern** : Trust & Authority + Conversion — Hero (mission) → Preuve → Vue d'ensemble solution → Chemin CTA clair. Ici : Hero → Problème → Approche → Offre → Méthode → Cas d'usage → Pour qui → Vision → Contact.
- **Style « Accessible & Ethical »** : focus rings visibles, ARIA, `prefers-reduced-motion`, cibles 44×44, texte ≥ 16 px, contraste ≥ 4.5:1 (principal ~18:1, secondaire ~7:1, accent ~8:1).
- **Anti-patterns** : pas de design joueur, pas de crédentiels cachés, **pas de dégradés violet/rose « IA »**.
- **Pas de faux témoignages ni logos clients** (entreprise au lancement) — les 3 démonstrations font la preuve. Remplace « Security badges / Case studies » de la stratégie de conversion MASTER.
- Checklist pré-livraison MASTER : emojis→SVG (Lucide), `cursor-pointer` sur interactifs, transitions 150–300 ms, focus visible, responsive 375/768/1024/1440, rien caché sous le header fixe, pas de scroll horizontal mobile.

## Tokens réels

Voir `../../99gates-landing/DESIGN-SYSTEM.md` §3 et `src/app/globals.css`.
