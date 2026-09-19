# Synode — site vitrine

Site de l'agence Synode : automatisation, agents IA et solutions sur mesure pour les PME.
Next.js 16 (App Router, Turbopack), React 19, Tailwind 4, TypeScript.

Bilingue FR / EN. Le français est la langue par défaut et vit à la racine (`/`),
l'anglais sous `/en`.

## Démarrer

```bash
npm install
npm run dev          # http://localhost:3000
```

Pour tester depuis un téléphone sur le même réseau : `http://<ip-du-mac>:3000`.
Les origines du réseau local sont autorisées dans `next.config.ts` (`allowedDevOrigins`),
sans quoi Next bloque les fichiers JS et la page s'affiche presque vide.

```bash
npm run build        # vérifie que tout compile
npx tsc --noEmit     # vérifie les types
```

## Où se trouve quoi

| Chemin | Rôle |
| --- | --- |
| `src/lib/content.ts` | **Tout le texte du site**, FR et EN. Source unique. |
| `src/lib/legal.ts` | Contenu des 4 pages légales, FR et EN. |
| `src/components/sections/` | Les sections de la landing. |
| `src/components/site/` | Header, footer, et les composants partagés entre pages. |
| `src/app/api/audit/route.ts` | Réception du formulaire de contact. |
| `DESIGN-SYSTEM.md` | Les décisions de design et **pourquoi** elles ont été prises. À lire avant de toucher à la mise en page. |

Le design est en place. Ce qui reste est du contenu, de la plomberie et de la
mise en ligne.

---

# Ce qu'il reste à faire

## 1. Copywriting

**Tout le texte actuel est à reprendre.** Il a été écrit pour tenir la maquette,
pas pour vendre. Il est cohérent et pas mauvais, mais il n'a jamais été validé
par nous deux.

Méthode : on écrit **tout en français d'abord**, on valide, et seulement ensuite
on adapte en anglais. L'anglais actuel est une traduction proche du français,
ce qui ne va pas : il faudra une adaptation par **l'idée**, pas mot à mot.
Un prospect anglophone n'a pas les mêmes réflexes qu'un patron de PME bruxellois.

Tout se modifie dans `src/lib/content.ts`, les deux langues côte à côte.

### Landing

- [ ] **Hero** — titre en deux morceaux (`titleLead` + `titleAccent`), sous-titre, les deux boutons
- [ ] **Les 4 blocs de services** sous le hero — titre + une phrase chacun
- [ ] **01 / Le constat** — titre, intro, les 4 constats (titre + phrase)
- [ ] **02 / Notre offre** — titre, sous-titre, la mention bleue, et pour chacune des 2 offres : la phrase « pour qui », les 4 badges, la phrase « Résultat »
- [ ] **03 / Méthode** — titre, le paragraphe « qui nous aidons », les 7 secteurs, les 4 étapes
- [ ] **04 / L'équipe** — titre, chapeau, et les deux présentations d'Antonino et Killian
- [ ] **CTA « Une heure pour voir ce qui peut changer »** — titre, phrase, bouton, les 4 chiffres (Durée, Prix, Livrable, Engagement)
- [ ] **05 / FAQ** — les 5 questions et leurs réponses
- [ ] **Footer** — la tagline

### Page Réalisations

- [ ] Titre, chapeau, les 4 chiffres du bandeau
- [ ] Les 4 démonstrateurs : nom court, titre, description, résultat
- [ ] L'encadré bleu de fin

### Page Contact

- [ ] Titre, chapeau, les 3 informations du bandeau
- [ ] Les libellés du formulaire et le message de confirmation
- [ ] Le message d'erreur

### Contraintes à connaître avant de réécrire

Ce ne sont pas des caprices de mise en page, ce sont des limites réelles :

- **Chaque section de la landing tient sur un écran.** Un texte plus long
  déborde, surtout dans « 02 / Notre offre » et « 03 / Méthode », qui sont les
  plus denses. Les espacements se resserrent tout seuls sur un petit écran,
  mais ça ne rattrape pas deux lignes en trop.
- **Les intros des 2 cartes d'offre font exactement 2 lignes.** Elles sont
  calibrées pour ça, et les deux cartes doivent rester de la même hauteur.
- **Les 4 badges d'une carte d'offre tiennent chacun sur une ligne.** Le plus
  long aujourd'hui, « Outil interne & portail client », est à la limite. Si un
  libellé s'allonge, c'est le texte qu'il faut raccourcir.
- **Les descriptions des démonstrateurs font environ 180 caractères.** Au-delà,
  le texte déborde de la carte.
- **Deux textes ont des retours à la ligne forcés** (le paragraphe « qui nous
  aidons » et la mention sous le formulaire), écrits avec `\n` dans le contenu.
  Si le texte change, il faut replacer les coupures.

---

## 2. Formulaire, e-mail et base de données

**C'est le point bloquant numéro un. Aujourd'hui le formulaire ne va nulle part.**

`src/app/api/audit/route.ts` valide la demande puis se contente de l'afficher
dans la console du serveur. En production, **une demande reçue serait perdue**.

### À décider

- [ ] **Vers quelle boîte e-mail ?** `contact@synode-agency.com` est affiché
      partout sur le site. Il faut que cette adresse existe vraiment, sur un
      vrai hébergeur mail lié au nom de domaine.
- [ ] **Par quel service d'envoi ?** Un service transactionnel type Resend,
      Postmark ou Brevo. On ne peut pas envoyer un mail depuis le serveur sans
      passer par l'un d'eux, sinon tout part en spam.
- [ ] **Qui reçoit ?** Une seule adresse, ou les deux en copie ? Ma
      recommandation : une adresse partagée, pour qu'une demande ne dorme pas
      dans la boîte de celui qui est en poste ce jour-là.
- [ ] **Accusé de réception au prospect ?** Un mail automatique « on a bien
      reçu, réponse sous 24 h ouvrées » évite qu'il relance ou aille voir ailleurs.

### Un piège à ne pas oublier

La mention sous le formulaire promet noir sur blanc : **« aucune newsletter,
aucune revente, aucune conservation en base de données »**.

Le jour où on branche une base ou un CRM, **cette phrase devient fausse**. Il
faudra la réécrire, et mettre la politique de confidentialité à jour en même
temps. Ce n'est pas un détail de rédaction, c'est une obligation légale.

Tant qu'on reste sur « le formulaire part par mail, rien n'est stocké », la
promesse tient et c'est un vrai argument de confiance. Je recommande de rester
comme ça au lancement.

### Aussi à prévoir

- [ ] **Anti-spam.** Aucune protection aujourd'hui. Un champ piège invisible
      plus une limite de fréquence par IP suffisent au début.
- [ ] **Tester de bout en bout** une fois branché, depuis un vrai téléphone.

---

## 3. Prise de rendez-vous

Idée à trancher : laisser le prospect réserver directement son audit d'une heure,
au lieu de passer par le formulaire et d'attendre notre réponse.

- [ ] **Le fait-on ?** Ça raccourcit énormément le cycle. Ça suppose aussi que
      nos disponibilités réelles soient à jour, sinon c'est pire que rien.
- [ ] **Avec quoi ?** Cal.com (open source, gratuit, se connecte à Google
      Calendar) ou Calendly. Cal.com se marie mieux avec notre discours sur la
      maîtrise de nos outils.
- [ ] **Où ?** Une page dédiée, ou un bouton « Réserver l'audit » à côté du
      formulaire de contact.

**Attention :** un widget de réservation intégré dépose des cookies tiers.
Ça déclenche l'obligation d'une bannière de consentement, que le site n'a pas
aujourd'hui **précisément parce qu'il ne dépose aucun cookie**. Un simple lien
vers une page de réservation externe évite ce problème.

---

## 4. Pages légales

Les 4 pages existent, sont rédigées et traduites : mentions légales, politique
de confidentialité, politique cookies, conditions générales.

**Il reste 23 champs marqués `TODO`** dans `src/lib/legal.ts`. Ils s'affichent
dans un encadré rouge sur le site, impossible de les rater. **Le site ne peut
pas être mis en ligne tant qu'ils sont là.**

Ce qu'il faut réunir :

- [ ] **Forme juridique** de Synode : SRL, société simple, indépendant ?
- [ ] **Adresse du siège** complète
- [ ] **Numéro d'entreprise (BCE)** et **numéro de TVA**
      (le footer affiche encore `BE 0000.000.000`)
- [ ] **Responsable de la publication** : qui de nous deux ?
- [ ] **Hébergeur** : nom, adresse, pays
- [ ] **Sous-traitants techniques** : hébergeur, service d'envoi d'e-mails,
      et le CRM si on en branche un. À lister nommément, c'est une obligation RGPD.
- [ ] **Transferts hors UE** s'il y en a (à vérifier selon les prestataires choisis)
- [ ] **Échéancier de paiement** dans les conditions générales : acompte,
      jalons, délai de paiement

Une fois rempli, **faire relire par quelqu'un dont c'est le métier**. Ces textes
nous engagent face à des clients professionnels.

---

## 5. Ce qui reste selon moi

Les points ci-dessus sont ceux que tu as listés. Voici ce que je vois d'autre,
par ordre d'urgence.

### Bloquant pour la mise en ligne

- [ ] **Nom de domaine.** Tout en dépend : l'adresse e-mail, les mentions
      légales, le déploiement. C'est la première décision à prendre.
- [ ] **Hébergement.** Vercel est le choix naturel pour du Next.js, l'offre
      gratuite suffit largement au lancement.
- [ ] **Vérifier le numéro de téléphone** affiché sur la page contact
      (`+32 493 99 31 63`) : est-ce bien le numéro qu'on veut rendre public ?
- [ ] **Les vidéos des démonstrateurs.** Les cartes de la page Réalisations
      réservent un emplacement 16:9 pour une vidéo par démo. Il est vide
      aujourd'hui, un schéma tient la place. Il faut enregistrer les 4 captures.
      C'est ce qui rend la page crédible : sans ça, on annonce des démos sans
      rien montrer.

### Important, pas bloquant

- [ ] **SEO.** Titre et description par page, image de partage pour les réseaux
      sociaux, `sitemap.xml`, `robots.txt`. Aujourd'hui seules les métadonnées
      de base existent.
- [ ] **Statistiques de visite.** Si on en veut, ça déclenche la bannière de
      consentement. À trancher en connaissance de cause. Plausible ou Vercel
      Analytics évitent la bannière, Google Analytics non.
- [ ] **Tenir les promesses de la FAQ.** Deux réponses nous engagent : le délai
      de quatre semaines minimum, et le fait que nos modèles d'IA ne soient pas
      entraînés sur les données client. La seconde n'est vraie que sur les
      offres professionnelles payantes. Si un projet passe un jour par un
      niveau gratuit, la phrase devient fausse.

### Dette technique, quand on aura le temps

- [ ] `package.json` s'appelle encore `99gates-landing`.
- [ ] `src/components/ui/integration-card.tsx` n'est plus utilisé nulle part et
      porte une erreur de lint. À supprimer.
- [ ] Deux autres erreurs de lint préexistantes dans `src/components/ui/`.
- [ ] Passer un contrôle d'accessibilité et de performance avant la mise en ligne.

---

## Ordre conseillé

1. **Nom de domaine** — tout le reste en dépend.
2. **Copywriting français**, validé par nous deux.
3. **Données légales** réunies et pages complétées.
4. **Formulaire branché** sur une vraie boîte mail, et testé.
5. **Vidéos des démonstrateurs.**
6. **Adaptation anglaise**, une fois le français figé.
7. **Mise en ligne**, puis SEO et prise de rendez-vous.
