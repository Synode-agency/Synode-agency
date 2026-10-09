"use client";

import { useState } from "react";
import type { Locale } from "@/lib/content";
import { EMPTY_ANSWERS, type Answers } from "@/lib/ai-diagnostic-score";
import { DiagnosticPanel } from "./diagnostic-panel";

/**
 * Le diagnostic hors du parcours, sur sa page dédiée.
 *
 * Le panneau tient désormais ses réponses à l'extérieur, parce que sur
 * l'accueil le brief de l'étape 3 vient y puiser. Ici il n'y a pas d'étape
 * suivante : ce composant lui rend simplement l'état qu'il avait avant, et
 * omet le bouton de relais.
 */
export function StandaloneDiagnostic({ locale }: { locale: Locale }) {
  const [answers, setAnswers] = useState<Answers>(EMPTY_ANSWERS);
  return <DiagnosticPanel locale={locale} answers={answers} onAnswersChange={setAnswers} />;
}
