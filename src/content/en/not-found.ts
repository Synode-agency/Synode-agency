import type { SiteContent } from "../types";

/** La page 404. */
export const notFound = {
  eyebrow: "Error 404",
  title: "This page does not exist.",
  accents: ["exist"],
  text: "The link may be old, or the address may contain a typo.",
  homeCta: "Back to home",
} as const satisfies SiteContent["notFound"];
