import type { Widen } from "../types";
import type { erreur as erreurFr } from "../fr/erreur";

/** La page d'erreur, en anglais (voir `../fr/erreur.ts`). */
export const erreur = {
  documentTitle: "Technical problem",
  title: "A technical problem occurred.",
  accents: ["technical"],
  text: "The page could not be displayed. Try again in a moment; if the problem persists, email us at",
  retry: "Try again",
  homeCta: "Back to home",
} as const satisfies Widen<typeof erreurFr>;
