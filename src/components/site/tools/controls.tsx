"use client";

import { useId } from "react";

/**
 * Les trois contrôles partagés par les deux outils.
 *
 * Mutualisés ici plutôt que recopiés dans chaque panneau : les deux outils
 * doivent se régler de la même façon, sinon la section donne l'impression
 * de deux produits différents collés l'un à côté de l'autre.
 *
 * Accessibilité : chaque contrôle porte un vrai `<label>` lié à un vrai
 * `<input>` ou `<button>`. Le libellé et la valeur sont visibles en
 * permanence, pas seulement au survol, et tout se pilote au clavier sans
 * rien ajouter puisque ce sont les éléments natifs.
 */

export function SegmentedField<T extends string>({
  label,
  help,
  value,
  options,
  onChange,
}: {
  label: string;
  help?: string;
  value: T;
  options: readonly { id: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const id = useId();

  return (
    <div className="tool-field">
      {/* Un groupe de boutons n'est pas un champ de formulaire : il se
          décrit avec `role="group"` et son libellé, pas avec un `<label>`
          qui n'aurait rien à cibler. */}
      <div className="tool-field-head">
        <span className="tool-field-label" id={id}>{label}</span>
      </div>
      <div className="tool-segmented" role="group" aria-labelledby={id}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={option.id === value}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      {help ? <p className="tool-field-help">{help}</p> : null}
    </div>
  );
}
