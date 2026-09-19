# Synode — site vitrine

Next.js 16, React 19, Tailwind 4, TypeScript. Bilingue : FR à la racine, EN sous `/en`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # avant de pousser
```

Depuis un téléphone : `http://<ip-du-mac>:3000`.

| Où | Quoi |
| --- | --- |
| `src/lib/content.ts` | Tout le texte du site, FR + EN |
| `src/lib/legal.ts` | Les 4 pages légales |
| `src/app/api/audit/route.ts` | Réception du formulaire |
| `DESIGN-SYSTEM.md` | Les décisions de design, à lire avant de toucher à la mise en page |

Le design est fini. Reste le contenu, la plomberie et la mise en ligne.

---

# Reste à faire

## 1. Nom de domaine

- [ ] Choisir et acheter le domaine
- [ ] Créer la boîte `contact@` dessus

*Tout en dépend : l'e-mail, les mentions légales, le déploiement. À faire en premier.*

## 2. Brancher le formulaire

Aujourd'hui une demande reçue **est perdue**. `route.ts` la valide et l'affiche dans la console, rien de plus.

- [ ] Choisir le service d'envoi (Resend, Postmark ou Brevo)
- [ ] Brancher `route.ts` dessus
- [ ] Décider qui reçoit : adresse partagée plutôt que l'un de nous deux
- [ ] Accusé de réception automatique au prospect ?
- [ ] Anti-spam : champ piège + limite par IP
- [ ] Tester depuis un vrai téléphone

> ⚠️ Le formulaire promet « aucune conservation en base de données ». Si on branche une base ou un CRM, cette phrase devient fausse et la politique de confidentialité doit suivre. Rester sans base au lancement est plus simple et c'est un argument de confiance.

## 3. Copywriting FR

Tout le texte actuel est à reprendre. Il tient la maquette mais n'a jamais été validé par nous deux. Tout est dans `content.ts`.

**Landing**

- [ ] Hero : titre, sous-titre, 2 boutons
- [ ] Les 4 blocs de services
- [ ] 01 Constat : titre, intro, 4 constats
- [ ] 02 Offre : titre, sous-titre, et par offre : la phrase « pour qui », 4 badges, la phrase Résultat
- [ ] 03 Méthode : titre, paragraphe « qui nous aidons », 7 secteurs, 4 étapes
- [ ] 04 Équipe : titre, chapeau, nos 2 présentations
- [ ] CTA « Une heure pour voir ce qui peut changer » : titre, phrase, bouton, 4 chiffres
- [ ] 05 FAQ : les 5 questions et réponses
- [ ] Footer : tagline

**Page Réalisations** — titre, chapeau, 4 chiffres, les 4 démos, l'encadré bleu

**Page Contact** — titre, chapeau, 3 infos, libellés du formulaire, messages de confirmation et d'erreur

> ⚠️ Limites réelles, pas des caprices : chaque section tient sur un écran (02 et 03 sont les plus serrées) · les intros des 2 cartes d'offre font exactement 2 lignes · chaque badge tient sur une ligne, le plus long est déjà à la limite · les descriptions de démos font ~180 caractères max · deux textes ont des retours à la ligne forcés en `\n`, à replacer si on les réécrit.

## 4. Pages légales

Les 4 pages sont écrites et traduites. **23 champs `TODO`** restent à remplir dans `legal.ts`, affichés en rouge sur le site.

- [ ] Forme juridique (SRL, société simple, indépendant ?)
- [ ] Adresse du siège
- [ ] Numéro BCE et numéro de TVA *(le footer affiche encore `BE 0000.000.000`)*
- [ ] Responsable de la publication : qui de nous deux ?
- [ ] Hébergeur : nom, adresse, pays
- [ ] Sous-traitants à lister nommément : hébergeur, service d'e-mails, CRM éventuel
- [ ] Échéancier de paiement dans les conditions générales
- [ ] Faire relire par un professionnel

> ⚠️ Le site ne peut pas être mis en ligne tant que les TODO sont là.

## 5. Vidéos des démonstrateurs

Les 4 cartes de la page Réalisations réservent un emplacement vidéo. Il est vide.

- [ ] Enregistrer les 4 captures d'écran des démos
- [ ] Les ajouter dans `content.ts` (champs `video` et `poster`)

> ⚠️ En l'état la page annonce des démos sans rien montrer, face à des prospects qui ne nous connaissent pas.

## 6. Mise en ligne

- [ ] Hébergement : Vercel, offre gratuite suffisante
- [ ] Vérifier le téléphone affiché (`+32 493 99 31 63`)
- [ ] SEO : titre et description par page, image de partage, `sitemap.xml`, `robots.txt`
- [ ] Contrôle accessibilité et performance

## 7. Version anglaise

- [ ] Adapter **par l'idée**, pas mot à mot. L'anglais actuel est une traduction proche du français.

*À faire une fois le français figé, sinon on traduit deux fois.*

## 8. Prise de rendez-vous (optionnel)

- [ ] On le fait ? Ça raccourcit le cycle, mais suppose des dispos toujours à jour
- [ ] Cal.com ou Calendly

> ⚠️ Un widget intégré dépose des cookies tiers et déclenche l'obligation de bannière de consentement. Un simple lien vers une page externe l'évite.

---

## Dette technique

- [ ] `package.json` s'appelle encore `99gates-landing`
- [ ] Supprimer `src/components/ui/integration-card.tsx`, inutilisé
- [ ] 2 erreurs de lint préexistantes dans `src/components/ui/`

## À tenir dans la durée

Deux réponses de la FAQ nous engagent : le **délai de 4 semaines minimum**, et le fait que les **modèles d'IA ne soient pas entraînés sur les données client** — vrai uniquement sur les offres professionnelles payantes.

Si on ajoute des statistiques de visite, Google Analytics impose une bannière de consentement, Plausible et Vercel Analytics non.
