import type { Question } from "@/lib/ai-diagnostic-questions";

/**
 * Une question.
 *
 * Choix unique et choix multiple partagent le même dessin, mais pas la même
 * sémantique : `radio` pour l'un, `checkbox` pour l'autre. L'entrée native
 * est masquée visuellement et non retirée du document, donc le clavier et
 * les lecteurs d'écran gardent le comportement attendu du navigateur.
 */
export function DiagnosticQuestion({
  question,
  selected,
  onToggle,
}: {
  question: Question;
  selected: readonly string[];
  onToggle: (optionId: string) => void;
}) {
  const multiple = question.kind === "multiple";

  return (
    <fieldset className="diag-question">
      <legend>{question.label}</legend>
      {question.help && <p className="diag-question-help">{question.help}</p>}
      <div className={multiple ? "diag-options diag-options--multiple" : "diag-options"}>
        {question.options.map((option) => {
          const checked = selected.includes(option.id);
          return (
            <label key={option.id} className={checked ? "diag-option is-selected" : "diag-option"}>
              <input
                type={multiple ? "checkbox" : "radio"}
                name={question.id}
                value={option.id}
                checked={checked}
                onChange={() => onToggle(option.id)}
              />
              <span className="diag-option-mark" aria-hidden />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
