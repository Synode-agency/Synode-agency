import type { SiteContent } from "../types";

/** La page affichée après l'envoi du formulaire (`/merci`, hors index). */
export const thanks = {
  metaTitle: "Message received",
  title: "Your message\n^has been received",
  text: "We have saved it and we will get back to you. If it is urgent, book a slot directly: that is the fastest route.",
  notBooked: "This message is not a meeting. To set one up, use the calendar.",
  bookCta: "Book a free call",
  homeCta: "Back to home",
} as const satisfies SiteContent["thanks"];
