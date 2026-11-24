import type { SiteContent } from "../types";
import { site } from "./common";
import { home } from "./home";
import { solutions } from "./solutions";
import { team } from "./team";
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
  solutions,
  team,
  contact,
  thanks,
  notFound,
  legal,
} satisfies SiteContent;
