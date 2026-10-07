import { renderLines } from "@/lib/lines";
import { ImpactSplit } from "@/components/site/impact-split";
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

  return (
    <section className="operational-impact" aria-labelledby={`operational-impact-${locale}`}>
      <div className="operational-impact-heading">
        <span className="lede-kicker">{heading.kicker}</span>
        <h2 id={`operational-impact-${locale}`}>{renderLines(heading.title, [heading.accent], "title-accent")}</h2>
        <p>{renderLines(heading.text)}</p>
      </div>
      <ImpactSplit locale={locale} />
    </section>
  );
}
