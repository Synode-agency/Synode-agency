import type { SiteContent } from "../types";
import { site } from "./common";
import { home } from "./home";
import { services } from "./services";
import { work } from "./work";
import { about } from "./about";
import { contact } from "./contact";
import { thanks } from "./thanks";
import { notFound } from "./not-found";
import { legal } from "./legal";

/**
 * Le contenu anglais, assemblé.
 *
 * Written for an English-speaking reader, not translated word for word. The
 * offer, the targets and the claims are identical: only the register moves.
 */
export const en = {
  locale: "en",
  site,
  home,
  services,
  work,
  about,
  contact,
  thanks,
  notFound,
  legal,
} satisfies SiteContent;
