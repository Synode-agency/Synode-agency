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
import { SolutionsDashboard } from "./solutions-dashboard";
import { PageHero } from "@/components/site/page-hero";
import { Booking } from "@/components/site/booking";
import { SecurityPanel } from "@/components/site/security-panel";
import { MethodFrame } from "@/components/site/method-frame";
import { PricingDoc } from "@/components/site/pricing-doc";

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

/** Les besoins métier de la section « Solutions concrètes ». */
const NEEDS = [
  { icon: MessagesSquare, fr: ["Traitement des demandes clients", "Trier les demandes reçues et préparer des réponses contextualisées."], en: ["Customer request handling", "Sort, understand and draft the replies."] },
  { icon: Target, fr: ["Qualification commerciale par IA", "Analyser et prioriser les prospects selon vos critères commerciaux."], en: ["Lead qualification", "Assess and prioritise incoming requests."] },
  { icon: FileSearch, fr: ["Analyse intelligente de documents", "Extraire, classer et vérifier les données de vos documents métier."], en: ["Document analysis", "Extract and check the information that matters."] },
  { icon: UserPlus, fr: ["Onboarding client automatisé", "Automatiser la collecte d’informations, les étapes d’accueil et les relances."], en: ["Client onboarding", "Guide a new client through the first steps."] },
  { icon: Mail, fr: ["Automatisation des emails", "Classer les messages, détecter les priorités et préparer les réponses."], en: ["Email handling", "Classify, route and draft replies."] },
  { icon: BarChart3, fr: ["Tableaux de bord & pilotage", "Centraliser vos indicateurs clés pour faciliter le pilotage de l’activité."], en: ["Reporting & steering", "Gather the numbers and make them readable."] },
  { icon: CalendarRange, fr: ["Planification des rendez-vous", "Coordonner les disponibilités, les plannings et les rappels."], en: ["Planning & scheduling", "Organise tasks, schedules and appointments."] },
  { icon: LifeBuoy, fr: ["Suivi après-vente", "Suivre les demandes après livraison et automatiser les relances utiles."], en: ["After-sales follow-up", "Track requests once the work is delivered."] },
] as const;

const SECURITY = {
  fr: {
    items: [
      { title: "Protection des données", text: "La solution IA accède uniquement aux données nécessaires au fonctionnement défini avec vous." },
      { title: "Gestion des droits d’accès", text: "Les permissions sont limitées selon les utilisateurs, les rôles et les logiciels connectés." },
      { title: "Validation humaine", text: "Les décisions sensibles et les actions importantes peuvent rester soumises à votre validation." },
      { title: "Monitoring technique", text: "Le fonctionnement, les erreurs et les intégrations peuvent être surveillés après le déploiement." },
    ],
    panelTitle: "Vos données restent sous votre contrôle",
    checks: ["Accès restreints", "Validation humaine", "Monitoring", "Traçabilité"],
    panelNote: "Le niveau de sécurité est défini pour chaque projet selon les données, les usages et les risques identifiés.",
  },
  en: {
    items: [
      { title: "Secured data", text: "Access to data is limited to what the system actually needs." },
      { title: "Access rights", text: "Permissions are set according to the users and the tools involved." },
      { title: "Human control", text: "Sensitive actions can stay subject to human approval." },
      { title: "Technical monitoring", text: "The solution can be watched, so errors and integration problems are caught." },
    ],
    panelTitle: "Your data stays under your control",
    checks: ["Restricted access", "Human approval", "Monitoring", "Traceability"],
    panelNote: "The level we keep is decided project by project, against the real risks.",
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
        title={renderLines(solutions.title)}
        aside={<SolutionsDashboard locale={locale} />}
      >
        <p>{fr ? "Synode conçoit et développe des solutions d’intelligence artificielle adaptées aux processus des entreprises. Agents IA, automatisation, logiciels métier, intégrations et analyse de données sont combinés selon vos objectifs, vos outils et vos contraintes." : "Every AI project starts from a specific business need. We then design a custom solution, combining artificial intelligence, process automation, integrations, business software and data wherever your environment and your constraints call for it."}</p>
        <div className="btn-row">
          <Link href="#briques" className="btn btn--primary">{fr ? "Découvrir nos solutions IA" : "Explore our AI solutions"}<ArrowDown aria-hidden /></Link>
          <Link href={formHref} className="btn btn--ghost">{fr ? "Parlons de votre besoin" : "Tell us what you need"}</Link>
        </div>
        <span className="hero-reassurance">{fr ? "* Un premier échange gratuit. Un périmètre clair. Un devis personnalisé." : "* A free first conversation. A clear scope. A tailored quote."}</span>
      </PageHero>

      <Band id="briques" tone="base" className="solutions-rhythm solutions-light solutions-families-band">
        <Lede kicker={fr ? "Solutions IA pour votre entreprise" : "AI solutions for your business"} title={fr ? "Nos solutions IA sur mesure" : "Our custom AI solutions"} accents={fr ? ["solutions IA sur mesure"] : ["custom AI solutions"]} text={fr ? "Notre agence IA à Bruxelles combine agents IA, automatisation des processus, logiciels métier, intégrations, data et formation. Chaque solution est conçue autour de votre fonctionnement réel, sans forfait standard ni technologie imposée." : "AI agents, process automation, business software, integrations, data and support can be combined around your needs to design a solution that fits your tools, your data and your business processes. Every project is scoped individually, with no standard package imposed."} />
        <SolutionSlices items={getContent(locale).solutions.bricks} locale={locale} />
        <p className="families-note">
          {fr
            ? "Les solutions peuvent être accompagnées dans le temps par du monitoring, de la maintenance et des évolutions selon les besoins du projet. *"
            : "Solutions can be supported over time with monitoring, maintenance and changes, according to the needs of the project. *"}
        </p>
      </Band>

      {/* ---- Des solutions concrètes : huit besoins, pour que le visiteur
          se reconnaisse en quelques secondes. Des tuiles, pas des cartes :
          une icône, un titre court, une ligne. ---- */}
      <Band id="cas-concrets" tone="base" className="solutions-rhythm solutions-full solutions-tint-band">
        <div className="section-heading">
          <Lede
            kicker={fr ? "Des solutions concrètes" : "Concrete solutions"}
            title={fr ? "Des cas d’usage IA pour vos enjeux métier" : "Use cases for your business challenges"}
            accents={fr ? ["cas d’usage IA"] : ["Use cases"]}
            text={fr ? "Nos solutions IA pour entreprises répondent à des besoins opérationnels concrets : traitement des demandes clients, qualification commerciale, analyse documentaire, gestion des emails, planification et pilotage des activités." : "See how our AI solutions can answer concrete business problems, from handling customer requests to document analysis, by way of lead qualification and day-to-day steering."}
          />
          <Link className="go" href={path(locale, ROUTES.useCases)}>{fr ? "Voir plus de cas d’usage" : "See more use cases"}<ArrowRight aria-hidden /></Link>
        </div>
        <ul className="need-tiles section-gap">
          {NEEDS.map(({ icon: Icon, fr: textFr, en: textEn }) => {
            const [title, text] = fr ? textFr : textEn;
            return (
              <li key={title} className="need-tile">
                <span className="need-tile-icon"><Icon aria-hidden /></span>
                <strong>{title}</strong>
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

          Le `\n` du titre est retiré : dans une demi-colonne, la coupe
          forcée tombait au mauvais endroit et le titre se replie très bien
          tout seul. ---- */}
      <Band id="methode" tone="base" className="solutions-rhythm technical-band solutions-ink-band mfr-band">
        <div className="mfr-layout">
          <div className="mfr-copy">
            <Lede
              kicker={fr ? "Conception & Développement IA" : "AI design & development"}
              title={fr ? "Notre méthode pour\nvotre projet IA." : "Our method for\nyour AI project."}
              accents={fr ? ["méthode"] : ["method"]}
              text={fr ? "Du cadrage du besoin métier à la maintenance, un projet IA Synode suit six étapes. Chacune produit un résultat concret : un périmètre validé, une architecture adaptée, un développement testé, une intégration à vos logiciels existants, des équipes formées et un suivi technique défini." : "From scoping the business need to maintenance, a Synode AI project runs in six stages. Each one produces a concrete result: an agreed scope, a fitting architecture, tested development, integration with your existing software, trained teams and a defined level of technical monitoring."}
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
            title={fr ? "Sécurité et contrôle\nde vos solutions IA" : "Reliable AI solutions you stay in control of"}
            accents={fr ? ["solutions IA"] : ["stay in control"]}
            text={fr ? "La protection des données, la gestion des accès, la validation humaine et le monitoring sont intégrés dès la conception. Les mesures retenues dépendent des usages, des logiciels connectés et des risques du projet." : "Security, data confidentiality, access management, human control and technical monitoring are defined against the needs and the risks of each project."}
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
          title={fr ? "Prix d’une solution IA sur mesure :\nnotre tarification" : "How we charge"}
          accents={fr ? ["notre tarification"] : ["How we charge"]}
          text={fr ? "Le budget d’un projet IA dépend du périmètre, de la complexité, des intégrations, des volumes et du niveau de suivi attendu. Notre devis distingue clairement le développement, les coûts techniques récurrents et les évolutions futures." : "Every project is different. We prepare a tailored quote based on your needs, the complexity of the solution, the integrations it requires and how it will be run."}
        />
        <PricingDoc locale={locale} />
      </Band>

      {/* ---- L'invitation, AVANT la FAQ. Voir l'en-tête du fichier. ---- */}
      <CardPanel id="autre" className="dark-cta solutions-cta">
        <div className="col card-body cta-panel cta-booking-grid">
          <div className="cta-booking-copy">
            <span className="eyebrow">{fr ? "Parlons de votre projet" : "Let’s talk about your project"}</span>
            <Lede
              title={fr ? "Parlons de votre projet de solution IA." : "Let’s discuss your AI solution project."}
              accents={fr ? ["votre projet"] : undefined}

              text={fr ? "En 30 minutes, Synode prend le temps de comprendre votre activité, vos outils et le processus à améliorer afin d’identifier une première piste adaptée à votre entreprise." : "In 30 minutes, Synode takes the time to understand your business, tools and the process you want to improve, then identify a first direction suited to your company."}
            />
            <div className="btn-row">
              <Link href="#calendrier-solutions" className="btn btn--primary">{fr ? "Réserver un échange" : "Book a call"}<ArrowRight aria-hidden /></Link>
              <Link href={formHref} className="btn btn--ghost">{fr ? "Nous contacter" : "Contact us"}</Link>
            </div>
            <p className="cta-note">{fr ? "30 minutes, sans engagement." : "30 minutes. No commitment."}<br />{site.ctaShort}</p>
          </div>
          <div id="calendrier-solutions" className="cta-booking-calendar"><Booking locale={locale} variant="card" /></div>
        </div>
      </CardPanel>

      <Band id="faq" tone="base" className="solutions-rhythm solutions-faq-light">
        <Lede kicker={fr ? "Questions fréquentes sur nos solutions IA" : "Frequently asked questions about our AI solutions"} title={solutions.faqTitle} accents={fr ? ["solutions IA sur mesure"] : ["custom AI solutions"]} />
        <div className="section-gap"><FaqAccordion items={solutions.faq} /></div>
      </Band>
    </Shell>
  );
}
