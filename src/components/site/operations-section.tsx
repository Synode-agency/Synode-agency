import { Activity, Check, LifeBuoy, Radar, ReceiptText, SlidersHorizontal } from "lucide-react";
import { Band } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { getContent, type Locale } from "@/lib/content";

/**
 * « Après la mise en service » : ce qui se passe une fois la solution
 * livrée, et ce qu'elle coûte pour continuer à tourner.
 *
 * Sortie de la page Solutions pour être posée aussi sur les six pages de
 * famille. Un visiteur arrive souvent directement sur une famille depuis
 * une recherche, sans passer par la page qui les chapeaute : il y lisait
 * tout le détail d'une solution sans jamais croiser la question du
 * paiement récurrent.
 *
 * Écrite une seule fois plutôt que recopiée sept fois. C'est un engagement
 * contractuel : s'il existait en sept exemplaires, il finirait par
 * diverger d'une page à l'autre au fil des retouches.
 *
 * `id` est paramétrable parce que deux ancres identiques sur deux pages
 * différentes ne gênent pas, mais un titre de section dupliqué dans une
 * même page, si.
 */

const operationIcons = [Radar, SlidersHorizontal, ReceiptText, LifeBuoy];

export function OperationsSection({ locale, id = "exploitation" }: { locale: Locale; id?: string }) {
  const fr = locale === "fr";
  const { operations } = getContent(locale).solutions;

  return (
    <Band id={id} tone="white" className="operations-band">
      <div className="operations-heading">
        <div>
          <Lede kicker={operations.kicker} title={operations.title} text={operations.text} />
          <div className="operations-meta">
            <span className="operations-recurring"><Activity aria-hidden />{operations.recurringLabel}</span>
            <p>{operations.familyNote}</p>
          </div>
        </div>
        <ol className="operations-cycle" aria-label={fr ? "Cycle de vie de la solution" : "Solution lifecycle"}>
          {operations.cycle.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
              <Check aria-hidden />
            </li>
          ))}
        </ol>
      </div>
      <div className="operations-grid section-gap">
        {operations.items.map((item, index) => {
          const Icon = operationIcons[index];
          return (
            <article key={item.title} className="operations-card">
              <span className="operations-icon"><Icon aria-hidden /></span>
              <span className="operations-index" aria-hidden>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </Band>
  );
}
