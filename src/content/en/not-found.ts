import type { SiteContent } from "../types";

/** La page 404. */
export const notFound = {
  title: "This page\n^does not exist",
  text: "The link may be old, or the address has a typo. Here are the main pages of the site.",
  homeCta: "Back to home",
} as const satisfies SiteContent["notFound"];
