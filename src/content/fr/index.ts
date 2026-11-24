import type { Locale } from "@/lib/routes";
import { site } from "./common";
import { home } from "./home";
import { solutions } from "./solutions";
import { team } from "./team";
import { contact } from "./contact";
import { thanks } from "./thanks";
import { notFound } from "./not-found";
import { legal } from "./legal";

/** Le contenu français, assemblé. Sa forme fait foi pour l'anglais (`../types.ts`). */
export const fr = {
  locale: "fr" as Locale,
  site,
  home,
  solutions,
  team,
  contact,
  thanks,
  notFound,
  legal,
};
