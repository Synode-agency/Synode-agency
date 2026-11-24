import type { CaseCard } from "../../types";

export const coory = {
  slug: "coory",
  name: "Coory",
  status: "beta",
  summary: "A coaching platform with an AI assistant whose every action the coach approves.",
  /* Coory n'existe qu'en français : le lecteur anglophone doit le savoir
     avant de cliquer (lot 8 de l'audit du 23/11/2026). */
  note: "Available in French only",
} satisfies CaseCard;
