import Link from "next/link";
import {
  ArrowDown, ArrowRight, BarChart3, CalendarRange, FileSearch,
  LifeBuoy, Mail, MessagesSquare, Target, UserPlus,
} from "lucide-react";
import { Band, CardPanel, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { SolutionSlices } from "@/components/site/solution-slices";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";
import { renderLines } from "@/lib/lines";
import { PageHero } from "@/components/site/page-hero";
import { Booking } from "@/components/site/booking";
import { SecurityPanel } from "@/components/site/security-panel";
import { MethodFrame } from "@/components/site/method-frame";
import { PricingDoc } from "@/components/site/pricing-doc";
import { businessUseCases } from "@/lib/business-use-cases";

/**
 * La page Solutions.
 *
 * Elle raconte une progression, et c'est elle qui fixe l'ordre des bandes :
 * voici nos familles de solutions, voici ce qu'elles résolvent, voici
 * comment elles s'assemblent, voici ce que comprend un projet, comment nous
 * travaillons, comment vos données sont protégées, comment la facturation
 * fonctionne. Puis l'invitation, et seulement ensuite les dernières
 * objections.
 *
 * ── Un point à ne pas défaire ───────────────────────────────────────────
 * Le CTA passe AVANT la FAQ. Une FAQ posée après l'invitation renvoie le
 * visiteur à ses doutes au moment où il allait écrire ; posée après, elle
 * rattrape ceux qui n'ont pas cliqué. La FAQ est donc la dernière bande
 * avant le pied de page.
 * ────────────────────────────────────────────────────────────────────────
 *
 * Les fonds alternent tout seuls : le thème du site peint une bande sur
 * deux en bleu nuit selon son rang. Les composants ci-dessous lisent donc
 * leurs couleurs dans les jetons de la bande (`--surface`, `--hairline`,
 * `--muted-foreground`) plutôt que dans des littéraux, et traversent les
 * deux fonds sans règle en double. La FAQ fait exception et force un fond
 * clair : elle suit la carte sombre du CTA, et deux aplats sombres de
 * suite effaçaient la carte.
 */

/** Les besoins métier de la section « Solutions concrètes ».
 *
 *  Chaque carte reprend un cas de la page Cas d'usage, par son slug : le
 *  nom de la carte est le domaine du cas, et sa phrase en est le titre. Le
 *  lien « Voir plus de cas d'usage » mène donc à des cas qui portent les
 *  mêmes noms (constat C41 de l'audit du 23/11/2026). Un slug qui
 *  disparaît du catalogue fait échouer la construction, il ne laisse pas
 *  une carte vide. */
const NEEDS = [
  { icon: Mail, slug: "demandes-de-devis" },
  { icon: MessagesSquare, slug: "questions-frequentes" },
  { icon: Target, slug: "opportunites-commerciales" },
  { icon: FileSearch, slug: "documents-en-volume" },
  { icon: UserPlus, slug: "onboarding-client" },
  { icon: CalendarRange, slug: "rendez-vous" },
  { icon: LifeBuoy, slug: "support-incidents" },
  { icon: BarChart3, slug: "detection-priorites" },
] as const;

function needTiles(locale: Locale) {
  const cases = businessUseCases(locale);
  return NEEDS.map(({ icon, slug }) => {
    const useCase = cases.find((c) => c.slug === slug);
    if (!useCase) throw new Error(`Cas d’usage introuvable pour la page Solutions : ${slug}`);
    return { icon, slug, title: useCase.domain, text: useCase.title };
  });
}

const SECURITY = {
  fr: {
    items: [
      { title: "Protection des données", text: "La solution accède uniquement aux données nécessaires au fonctionnement défini avec vous." },
      { title: "Gestion des droits d’accès", text: "Les permissions sont limitées selon les utilisateurs, les rôles et les logiciels connectés." },
      { title: "Validation humaine", text: "Vous choisissez : toutes les actions validées par une personne, ou seulement les actions sensibles." },
      { title: "Suivi & maintenance", text: "Si vous nous confiez le suivi, le fonctionnement, les erreurs et les intégrations sont surveillés après le déploiement." },
    ],
    panelTitle: "Vos données restent sous votre contrôle",
    checks: ["Accès restreints", "Validation humaine", "Monitoring", "Traçabilité"],
    panelNote: "Le niveau de sécurité est défini pour chaque projet selon les données, les usages et les risques identifiés.",
  },
  en: {
    items: [
      { title: "Data protection", text: "The solution only accesses the data needed for the operation agreed with you." },
      { title: "Access rights management", text: "Permissions are limited by user, role and connected software." },
      { title: "Human approval", text: "You choose: every action approved by a person, or only sensitive ones." },
      { title: "Support & maintenance", text: "If you entrust support to us, operation, errors and integrations are monitored after deployment." },
    ],
    panelTitle: "Your data stays under your control",
    checks: ["Restricted access", "Human approval", "Monitoring", "Traceability"],
    panelNote: "The level of security is set for each project, according to the data, the uses and the risks identified.",
  },
} as const;

export function SolutionsPage({ locale }: { locale: Locale }) {
  const { site, solutions } = getContent(locale);
  const fr = locale === "fr";
  const formHref = `${path(locale, ROUTES.contact)}#${ANCHORS.form}`;
  const security = SECURITY[fr ? "fr" : "en"];

  return (
    <Shell locale={locale}>
      <PageHero
        className="solutions-page-hero"
        kicker={fr ? "Solutions sur mesure" : "Custom solutions"}
        kickerMobileOnly
        title={renderLines(solutions.title)}
      >
        <p>{fr ? "Intégrer l’IA à vos processus, connecter vos logiciels, développer l’application dont vos équipes ont besoin ou former votre équipe : chaque solution sur mesure part de votre activité, de vos outils et de vos contraintes." : "Bringing AI into your processes, connecting your software, building the application your teams need or training your staff: every custom solution starts from your business, your tools and your constraints."}</p>
        <div className="btn-row">
          <Link href="#briques" className="btn btn--primary">{fr ? "Découvrir nos solutions" : "Explore our solutions"}<ArrowDown aria-hidden /></Link>
          <Link href={formHref} className="btn btn--ghost">{fr ? "Décrire votre besoin" : "Tell us what you need"}</Link>
        </div>
        <span className="hero-reassurance">{fr ? <>Un premier échange gratuit. Un périmètre clair. Un devis personnalisé.</> : "A free first call. A clear scope. A tailored quote."}</span>
      </PageHero>

      <Band id="briques" tone="base" className="solutions-rhythm solutions-light solutions-families-band">
        <Lede kicker={fr ? "Six familles de solutions" : "Six solution families"} title={fr ? "Nos solutions sur mesure,\navec l’IA intégrée" : "Our custom solutions,\nwith built-in AI"} accents={fr ? ["sur mesure"] : ["custom solutions"]} text={fr ? "Synode combine agents IA, intégration de systèmes, automatisation des processus, logiciels métier, data et formation. Chaque solution est conçue autour de votre fonctionnement réel, sans forfait standard ni technologie imposée." : "Synode combines AI agents, systems integration, process automation, business software, data and training. Every solution is designed around how you actually work, with no standard package and no imposed technology."} />
        <SolutionSlices items={getContent(locale).solutions.bricks} locale={locale} />
        <p className="families-note">
          {fr ? (
            <>
              Les solutions peuvent être accompagnées dans le temps{" "}
              par du monitoring, de la maintenance{" "}
              et des évolutions selon les besoins du projet.
            </>
          ) : (
            <>
              Solutions can be supported over time{" "}
              with monitoring, maintenance and changes,{" "}
              according to the needs of the project.
            </>
          )}
        </p>
      </Band>

      {/* ---- Des solutions concrètes : huit besoins, pour que le visiteur
          se reconnaisse en quelques secondes. Des tuiles, pas des cartes :
          une icône, un titre court, une ligne. ---- */}
      <Band id="cas-concrets" tone="base" className="solutions-rhythm solutions-full solutions-tint-band">
        <div className="section-heading">
          <Lede
            kicker={fr ? "Des solutions concrètes" : "Concrete solutions"}
            title={fr ? "Des cas d’usage IA pour\nvos enjeux métier" : "AI use cases for\nyour business challenges"}
            accents={fr ? ["cas d’usage IA"] : ["AI use cases"]}
            text={fr ? "Nos solutions répondent à des besoins opérationnels concrets : devis et relances, service client, prospection, documents en volume, démarrage des nouveaux clients, rendez-vous, SAV et pilotage." : "Our solutions meet concrete operational needs: quotes and follow-ups, customer service, prospecting, high-volume documents, onboarding new clients, appointments, after-sales support and performance tracking."}
          />
          <Link className="go" href={path(locale, ROUTES.useCases)}>{fr ? "Voir plus de cas d’usage" : "See more use cases"}<ArrowRight aria-hidden /></Link>
        </div>
        <ul className="need-tiles section-gap">
          {needTiles(locale).map(({ icon: Icon, slug, title, text }) => {
            return (
              <li key={slug} className="need-tile">
                <span className="need-tile-heading">
                  <span className="need-tile-icon"><Icon aria-hidden /></span>
                  <strong>{title}</strong>
                </span>
                <p>{text}</p>
              </li>
            );
          })}
        </ul>
      </Band>

      {/* ---- Le déroulé d'un projet : le texte à gauche, le cadre des six
          étapes à droite, les deux de la même hauteur.

          La bande ne porte plus `solutions-full` : elle n'impose donc plus
          la hauteur d'écran, et son rembourrage est le même en haut et en
          bas, celui de `solutions-rhythm`.

          Les coupes mobile et desktop tombent au même endroit, après
          « méthode », pour garantir deux lignes aux deux formats. ---- */}
      <Band id="methode" tone="base" className="solutions-rhythm technical-band solutions-ink-band mfr-band">
        <div className="mfr-layout">
          <div className="mfr-copy">
            <Lede
              kicker={fr ? "Conception & développement" : "Design & development"}
              title={fr ? "Notre méthode\npour votre projet" : "Our method\nfor your project"}
              accents={fr ? ["méthode"] : ["method"]}
              text={fr ? "Du cadrage du besoin métier à la maintenance, un projet Synode suit six étapes. Chacune produit un résultat concret : un périmètre validé, une architecture adaptée, un développement testé, une intégration à vos logiciels existants, des équipes formées et un suivi technique défini." : "From scoping the business need to maintenance, a Synode project runs in six stages. Each one produces a concrete result: an agreed scope, a fitting architecture, tested development, integration with your existing software, trained teams and a defined level of technical monitoring."}
            />
          </div>
          <MethodFrame locale={locale} />
        </div>
      </Band>

      {/* ---- Sécurité : le texte à gauche, un petit panneau d'état à
          droite. Pas de cadenas, pas d'imagerie de cybersécurité. ---- */}
      <Band id="securite" tone="base" className="solutions-rhythm solutions-full solutions-tint-band">
        {/* Le bloc de titres en pleine largeur, comme partout ailleurs sur
            la page. Les quatre réglages et le panneau d'état se partagent
            ensuite la ligne au même niveau : le panneau ne flotte plus en
            haut à droite d'une colonne plus haute que lui. */}
        <div className="section-heading">
          <Lede
            kicker={fr ? "Sécurité & contrôle" : "Security & control"}
            title={fr ? "Sécurité et contrôle\nde vos solutions" : "Security and control\nof your solutions"}
            accents={fr ? ["Sécurité", "contrôle"] : ["Security", "control"]}
            text={fr ? "La protection des données, la gestion des accès, la validation humaine et le monitoring sont intégrés dès la conception. Les mesures retenues dépendent des usages, des logiciels connectés et des risques du projet." : "Data protection, access management, human approval and monitoring are built in from the design stage. The measures chosen depend on how the solution is used, the software it connects to and the risks of the project."}
          />
        </div>
        <SecurityPanel
          items={security.items}
          panelTitle={security.panelTitle}
          checks={security.checks}
          panelNote={security.panelNote}
        />
      </Band>

      <Band id="tarification" tone="base" className="solutions-rhythm solutions-full solutions-white-band">
        <Lede
          kicker={fr ? "Une tarification adaptée au projet" : "Pricing that fits the project"}
          title={fr ? "Comment nous chiffrons\nvotre projet" : "How we price\nyour project"}
          accents={fr ? ["chiffrons"] : ["price"]}
          text={fr ? "Pas de grille de prix : chaque projet est chiffré sur son périmètre réel. Le premier échange est gratuit. Le cadrage est payant : il aboutit au périmètre écrit et au devis ferme, et son montant est déduit du prix du projet au démarrage du développement. Le devis distingue ensuite le développement, les coûts techniques récurrents et les évolutions futures." : "No price list: every project is priced on its real scope. The first call is free. Scoping is paid: it produces the written scope and the firm quote, and its fee is deducted from the project price when development starts. The quote then separates development, recurring technical costs and future changes."}
        />
        <PricingDoc locale={locale} />
      </Band>

      {/* ---- L'invitation, AVANT la FAQ. Voir l'en-tête du fichier. ---- */}
      <CardPanel id="autre" className="dark-cta solutions-cta solutions-page-cta">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <span className="eyebrow">{fr ? "Échange découverte gratuit" : "Free discovery call"}</span>
            <Lede
              title={fr ? "Parlons de votre projet" : "Let’s talk about your project"}
              accents={fr ? ["votre projet"] : ["project"]}

              text={fr ? "En 30 minutes, Synode prend le temps de comprendre votre activité, vos outils et le processus à améliorer afin d’identifier une première piste adaptée à votre entreprise." : "In 30 minutes, Synode takes the time to understand your business, tools and the process you want to improve, then identify a first direction suited to your company."}
            />
            <div className="btn-row">
              <Link href="#calendrier-solutions" className="btn btn--primary">{site.cta}<ArrowDown aria-hidden /></Link>
              <Link href={formHref} className="btn btn--ghost">{fr ? "Décrire votre besoin" : "Tell us what you need"}</Link>
            </div>
            <p className="cta-note">{fr ? "30 minutes, gratuites et sans engagement." : "30 minutes, free and with no commitment."}</p>
          </div>
          <div id="calendrier-solutions" className="cta-booking-calendar"><Booking locale={locale} copy={getContent(locale).contact.booking} variant="card" /></div>
        </div>
      </CardPanel>

      <Band id="faq" tone="base" className="solutions-rhythm solutions-faq-light">
        <Lede kicker={fr ? "Questions fréquentes" : "FAQ"} title={solutions.faqTitle} accents={fr ? ["solutions sur mesure"] : ["custom solutions"]} />
        <div className="section-gap"><FaqAccordion items={solutions.faq} /></div>
      </Band>
    </Shell>
  );
}
