import { GitMerge, Database, ShieldCheck, UserCheck } from "lucide-react";
import { renderLines } from "@/lib/lines";
import type { Locale } from "@/lib/content";

/**
 * Les résultats recherchés, en bloc éditorial.
 *
 * Quatre cards de plus n'auraient rien dit que les cards Solutions, Usages,
 * Fiabilité et Méthode ne disent déjà. La section se lit donc comme un
 * paragraphe en quatre temps : une icône fine, un titre, une phrase, un mot
 * de registre. Aucun cadre, aucun fond, aucun numéro — seulement des filets
 * verticaux entre les colonnes, qui disparaissent dès que la grille se
 * replie.
 *
 * La coupe du titre passe par `renderLines` : elle ne s'applique qu'à partir
 * de 768px, parce qu'une coupe calée sur une colonne large n'a aucune raison
 * de tomber juste sur un téléphone. Le chapeau n'en a aucune : il remplit la
 * mesure du titre, que le CSS leur donne en commun.
 */
export function OperationalImpact({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const heading = fr
    ? {
        kicker: "Résultats recherchés",
        accent: "fonctionnement réel",
        title: "Des systèmes IA conçus pour\nle fonctionnement réel de votre entreprise.",
        text: "Un système bien intégré agit sur le fonctionnement lui-même : il réduit les frictions entre les outils, fiabilise l’exécution d’un processus métier, rend les données exploitables au bon moment et laisse aux équipes les décisions qui demandent leur jugement.",
      }
    : {
        kicker: "Intended outcomes",
        accent: "actually operates",
        title: "AI systems designed around\nhow your business actually operates.",
        text: "A well-integrated system acts on the way the business runs: it reduces friction between tools, makes the execution of a business process more reliable, makes data usable at the right moment and leaves teams the decisions that call for their judgement.",
      };

  const items = fr ? [
    { icon: GitMerge, title: "Continuité des processus", text: "Réduisez les ruptures entre vos outils, vos équipes et les différentes étapes de vos processus métier grâce à une meilleure orchestration des systèmes.", keyword: "Orchestration" },
    { icon: ShieldCheck, title: "Fiabilité opérationnelle", text: "Intégrez vos règles métier, contrôles et validations directement dans votre système IA afin de fiabiliser l’exécution de vos processus.", keyword: "Règles métier" },
    { icon: Database, title: "Exploitation des données", text: "Centralisez, contextualisez et rendez vos données exploitables au bon moment pour faciliter le pilotage et la prise de décision.", keyword: "Pilotage" },
    { icon: UserCheck, title: "Capacité opérationnelle augmentée", text: "Automatisez certaines étapes de vos processus métier tout en conservant un contrôle humain sur les décisions importantes et les situations complexes.", keyword: "Validation humaine" },
  ] : [
    { icon: GitMerge, title: "Process continuity", text: "Reduce the breaks between your tools, your teams and the successive steps of a business process through better orchestration of your systems.", keyword: "Orchestration" },
    { icon: ShieldCheck, title: "Operational reliability", text: "Build your business rules, checks and approvals into your AI system itself, so that your processes run reliably.", keyword: "Business rules" },
    { icon: Database, title: "Data you can use", text: "Centralise and contextualise your data, and make it usable at the right moment to support oversight and decision-making.", keyword: "Oversight" },
    { icon: UserCheck, title: "Extended operational capacity", text: "Automate selected steps of your business processes while keeping human control over the decisions that matter and the situations that are complex.", keyword: "Human approval" },
  ];

  return (
    <section className="operational-impact" aria-labelledby={`operational-impact-${locale}`}>
      <div className="operational-impact-heading">
        <span className="lede-kicker">{heading.kicker}</span>
        <h2 id={`operational-impact-${locale}`}>{renderLines(heading.title, [heading.accent], "title-accent")}</h2>
        <p>{renderLines(heading.text)}</p>
      </div>
      <ul className="impact-rail">
        {items.map(({ icon: Icon, title, text, keyword }) => (
          <li key={title}>
            <Icon className="impact-rail-icon" aria-hidden />
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="impact-rail-keyword">{keyword}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
