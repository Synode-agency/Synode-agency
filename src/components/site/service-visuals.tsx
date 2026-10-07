import type { LucideIcon } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * LE VISUEL DE LA BANDE BLEU NUIT DES PAGES SERVICES.
 *
 * Il n'en reste qu'un ici, `ServiceCore`. Les six sections « Qu'est-ce
 * que… » ont chacune leur visuel animé : `AgentBrief`, `AutomationGraph`,
 * et les quatre de `components/understand-visuals`.
 *
 * Celui-ci n'est pas interactif : des blocs et des filets, rendus côté
 * serveur. Pas de 3D, pas de dégradé, pas de forme abstraite. Tous ses
 * textes viennent de `service-pages.ts`, sinon ils échapperaient à la
 * traduction.
 */

/** La bande bleu nuit : ce qui reste au centre, et ce qui s'y branche. */
export function ServiceCore({ centre, chips, icon: Icon, locale }: { centre: string; chips: string[]; icon: LucideIcon; locale: Locale }) {
  const fr = locale === "fr";
  const half = Math.ceil(chips.length / 2);
  return (
    <div className="svc-core" role="img" aria-label={fr ? `${centre}, relié à : ${chips.join(", ")}.` : `${centre}, connected to: ${chips.join(", ")}.`}>
      <ul className="svc-core-row" aria-hidden>
        {chips.slice(0, half).map(chip => <li key={chip}>{chip}</li>)}
      </ul>
      <span className="svc-core-hub" aria-hidden>
        <Icon />
        <strong>{centre}</strong>
      </span>
      <ul className="svc-core-row" aria-hidden>
        {chips.slice(half).map(chip => <li key={chip}>{chip}</li>)}
      </ul>
    </div>
  );
}

