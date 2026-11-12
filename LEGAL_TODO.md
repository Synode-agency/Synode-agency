# Pages légales : ce qui reste à faire

État au 12/11/2026. Les quatre pages (Mentions légales, Legal notice,
Politique de confidentialité, Privacy policy) sont **rédigées mais pas
validées**. Elles restent marquées « Brouillon » en haut de page. Chaque
information manquante est écrite **entre crochets** dans
`src/lib/legal-content.ts`, puis affichée en évidence sur la page.

**Règle :** on ne remplace jamais un crochet par une valeur supposée. Une fois
TOUS les crochets remplis, on retire l'encadré « Brouillon » dans `LegalPage`
(`src/components/site/simple-pages.tsx`) et on met à jour la date `updated`
dans `legal-content.ts`.

| Fichier | Rôle |
| --- | --- |
| `src/lib/legal-content.ts` | Tout le texte, FR et EN, et les crochets |
| `src/components/site/simple-pages.tsx` | `LegalPage` et `LegalText`, qui affiche gras, crochets et liens |
| `src/app/globals.css` | `.legal-body` (listes) et `.legal-todo` (les crochets) |
| `src/lib/content.ts` | Titres, descriptions SEO et texte de l'encadré « Brouillon » |
| `src/components/site/site-footer.tsx` | Liens « Mentions légales » et « Politique de confidentialité » |

---

## 1. Les informations à demander à Smart

**Situation au 12/11/2026 :** l'inscription chez Smart est **en cours**.
Antonino est membre, Killian pas encore, et l'outil Activité n'est pas encore
ouvert. Antonino a demandé un rendez-vous avec un conseiller Smart (attendu
vers le 16/11) pour ouvrir une Activité commune, et y a inclus les questions
sur le site et le RGPD. Les pages disent donc que les prestations
« seront » facturées dans le cadre de Smart, et que l'inscription est en
cours. Quand l'Activité est ouverte, repasser au présent.

Points à obtenir de Smart (la plupart figurent déjà dans sa demande de
rendez-vous) :

1. Notre activité est-elle rattachée à **Productions Associées**, ou à
   **Formateurs Associés** pour nos formations ? Killian Schoebben et Antonino
   Lo Bianco sont-ils sur la même activité ? Nom et numéro de l'activité ?
2. Pouvons-nous indiquer sur notre site cette entité (dénomination, adresse du
   siège, BCE, TVA) comme **entité contractante et de facturation** ?
3. Smart a-t-elle une **formulation type** pour présenter nos deux noms, notre
   rôle et le lien avec Smart ? (Elle remplacera le crochet « Formulation à
   valider par Smart ».)
4. Smart se considère-t-elle **responsable du traitement** des données des
   prospects qui nous écrivent via notre site, ou est-ce nous ? Quel est son
   rôle (et ses durées de conservation) pour les données de contractualisation
   et de facturation ?

À demander aussi si l'occasion se présente :

- Qui détient les droits d'auteur sur le site et ses contenus dans le cadre du
  contrat Smart ? (crochet « Titulaire des droits »)
- Smart impose-t-elle ses conditions générales sur les devis et factures ?
  Faut-il y renvoyer depuis le site ? (crochet de la section « Prestations »)
- Une charte ou un code de conduite de Smart doit-il être cité ?

**Piste publique, NON confirmée, à ne pas publier telle quelle :** la page
[Entités](https://smartbe.be/fr/a-propos/entites/) de smartbe.be liste quatre
entités à la même adresse, rue Coenraets 72, 1060 Bruxelles, et demande aux
clients d'utiliser le nom indiqué sur les factures, « Productions Associées ou
Formateurs Associés ». Productions Associées (asbl) y figure avec le numéro
BE 0896.755.397. Le guide Smart « Le contrat de webdesign » (2016) cite aussi
Productions Associées, mais il est ancien. Seul Smart, ou une facture Smart
de Synode, peut dire quelle entité s'applique.

## 2. Les identités et coordonnées à compléter

- [x] Responsables du site : **Killian Schoebben et Antonino Lo Bianco**
      (12/11/2026)
- [x] Adresse professionnelle : **rue des Alcyons 86, 1082 Bruxelles**
      (12/11/2026). Elle est publique sur le site : les deux responsables
      doivent être d'accord
- [x] E-mail : **contact@synode-agency.com**
- [ ] Entité juridique contractante, dénomination légale, adresse du siège,
      numéro BCE et numéro de TVA : **Smart** (section 1)
- [ ] Titulaire des droits de propriété intellectuelle
- [ ] Facultatif : un numéro de téléphone. Il n'est pas exigé ici (le site ne
      permet pas de conclure de contrat à distance avec des consommateurs),
      mais il facilite le contact

## 3. Les points RGPD encore à vérifier

- [ ] **Responsabilité conjointe (art. 26 RGPD).** Killian et Antonino sont
      indiqués comme responsables conjoints du traitement. Il faut un court
      accord écrit entre eux deux : qui répond aux demandes d'exercice des
      droits, qui supprime les données à 12 mois, qui gère les comptes. L'essentiel
      de cet accord doit pouvoir être communiqué à une personne qui le demande
- [ ] **Rôle de Smart** (question 4 ci-dessus). Si Smart se dit responsable
      pour une partie des données, adapter « Qui traite vos données »
- [x] **Suivi des e-mails Brevo** : l'**anonymisation** des ouvertures et des
      clics des e-mails transactionnels est activée (12/11/2026, Paramètres ›
      Automatisations › E-mails transactionnels › Suivi,
      [aide Brevo](https://help.brevo.com/hc/en-us/articles/37114679474706)).
      La page le dit. Ne pas la désactiver sans changer la page
- [ ] **Contrats de sous-traitance (art. 28 RGPD)** : accepter le DPA de
      Brevo, Netlify, Cal.com et Hostinger, dans chaque compte
- [x] **Transferts de Brevo, Hostinger et Google** (12/11/2026) : Hostinger,
      clauses contractuelles types 2021/914 dans son
      [DPA](https://www.hostinger.com/fr/legal/dpa) ; Google LLC certifié DPF
      + clauses types ([cadres juridiques de Google](https://policies.google.com/privacy/frameworks)) ;
      Brevo, clauses types selon une source secondaire. Reste à regarder la
      **liste des sous-traitants de Brevo** dans le compte (DPA) pour confirmer
- [ ] **Data Privacy Framework** : vérifier Netlify et Cal.com sur la liste
      officielle, [dataprivacyframework.gov/list](https://www.dataprivacyframework.gov/list).
      Cal.com donne le lien `dataprivacyframework.gov/participant/2960`
- [x] **Gmail** : les e-mails de `contact@synode-agency.com` sont lus dans
      Gmail (confirmé par Antonino le 12/11/2026). La ligne Google de la page
      le dit
- [ ] **Durée de 12 mois appliquée pour de vrai** : supprimer les contacts de la
      liste Brevo n° 2, les réservations Cal.com, les événements de l'agenda et
      les e-mails 12 mois après le dernier échange. Une durée annoncée doit être
      tenue
- [ ] **Double authentification** sur Brevo, Netlify, Cal.com, Hostinger et
      Google : la page dit que l'accès est réservé aux deux personnes de Synode

## 4. Les vérifications techniques sur les cookies

État vérifié le 11 et le 12/11/2026 sur le site en ligne : **aucun cookie,
aucun stockage, aucun hôte tiers avant le clic** sur « Ouvrir le calendrier ».
Aucun bandeau de cookies n'est donc nécessaire.

- [ ] Rejouer cet audit après chaque changement : outils du navigateur
      ouverts, aucun cookie, aucun stockage sauf le brief en `sessionStorage`
      quand le visiteur l'envoie lui-même vers le formulaire
- [ ] Après le clic sur le calendrier : seul `__cf_bm` (Cloudflare,
      protection contre les robots, 30 minutes d'inactivité,
      [doc Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/))
      était posé. Si Cal.com ajoute un traceur de mesure ou de publicité, il
      faudra un **consentement AVANT de charger le calendrier** : le clic sur
      « Ouvrir le calendrier » ne vaut pas consentement à ces cookies
- [ ] Tout nouveau script, iframe, police externe, outil de statistiques ou
      pixel change la page Confidentialité, et peut rendre un bandeau de
      cookies obligatoire
- [ ] L'image de signature de l'accusé de réception est servie par le site
      (Netlify) : elle ne sert à aucun suivi, mais Netlify voit l'adresse IP de
      qui ouvre l'e-mail, comme pour toute page du site

## 5. Ce qui empêche de considérer les pages comme finalisées

1. L'**Activité Smart** n'est pas encore ouverte, donc l'**entité Smart** est
   inconnue : dénomination, siège, BCE, TVA (exigés par l'art. XII.6 du Code
   de droit économique pour le prestataire).
2. Le **rôle de Smart** dans le traitement des données n'est pas confirmé.
3. La **formulation** du lien avec Smart n'est pas validée par Smart.
4. L'**accord de responsabilité conjointe** entre Killian et Antonino n'est
   pas encore signé (projet rédigé le 12/11/2026, hors du dépôt public).

Avant de retirer « Brouillon » :

- [ ] `grep -nE "\[(À|TO BE|FORMULATION|WORDING|RÔLE|SMART)" src/lib/legal-content.ts`
      ne trouve plus rien
- [ ] Les deux langues disent la même chose (mêmes sections, mêmes
      prestataires)
- [ ] `npx tsc --noEmit`, `npx eslint src`, `npm run build`

---

## Sources consultées le 12/11/2026

- SPF Économie, [informations obligatoires sur le site web de votre entreprise](https://news.economie.fgov.be/203681-informations-obligatoires-sur-le-site-web-de-votre-entreprise/) :
  nom, adresse géographique, coordonnées dont un e-mail, numéro d'entreprise,
  TVA si assujetti, autorité de surveillance, profession réglementée et code
  de conduite s'ils s'appliquent.
- Code de droit économique, art. XII.6, III.74 et III.75 : texte consolidé sur
  [Justel](https://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl?language=fr&la=F&cn=2013022819&table_name=loi).
  ⚠ Le texte exact des articles n'a pas pu être relu en entier ; la liste
  ci-dessus vient de la page du SPF Économie.
- RGPD (règlement (UE) 2016/679), notamment art. 6, 13, 26, 28 et 44 à 49 :
  [EUR-Lex](https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679).
- Autorité de protection des données, rue de la Presse 35, 1000 Bruxelles :
  [autoriteprotectiondonnees.be](https://www.autoriteprotectiondonnees.be/),
  [formulaire de plainte](https://www.autoriteprotectiondonnees.be/publications/formulaire-de-plainte.pdf).
- Netlify : [politique de confidentialité](https://www.netlify.com/privacy/)
  (mise à jour du 4/11/2026 : Netlify, Inc., 101 2nd Street, San Francisco,
  CA 94105 ; participation au DPF).
- Cal.com : [politique de confidentialité](https://cal.com/privacy) (en vigueur
  le 1/11/2026, participation au DPF) et
  [page DPF](https://cal.com/dpf-data-privacy-framework).
- Brevo : [politique de confidentialité](https://www.brevo.com/legal/privacypolicy/)
  (1/10/2025 : Sendinblue SAS, RCS Paris 498 019 298, siège 17 rue Salneuve,
  75017 Paris ; d'anciennes versions citent le 106 boulevard Haussmann, d'où
  l'absence d'adresse sur la page) ;
  [pixels de suivi et recommandation de la CNIL](https://help.brevo.com/hc/en-us/articles/37114679474706).
- Cloudflare : [cookies Cloudflare](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/)
  (`__cf_bm`, 30 minutes d'inactivité, nécessaire à la détection des robots).
- Smart : [entités](https://smartbe.be/fr/a-propos/entites/) et
  [mentions légales de smartbe.be](https://smartbe.be/fr/mentions-legales/).
  Aucune consigne publique trouvée pour les sites des membres.
