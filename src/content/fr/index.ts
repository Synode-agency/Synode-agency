import type { Locale } from "@/lib/routes";
import { site } from "./common";
import { home } from "./home";
import { services } from "./services";
import { work } from "./work";
import { about } from "./about";
import { contact } from "./contact";
import { thanks } from "./thanks";
import { notFound } from "./not-found";
import { legal } from "./legal";

/** Le contenu français, assemblé. Sa forme fait foi pour l'anglais (`../types.ts`). */
export const fr = {
  locale: "fr" as Locale,
  site,
  home,
  services,
  work,
  about,
  contact,
  thanks,
  notFound,
  legal,
};
