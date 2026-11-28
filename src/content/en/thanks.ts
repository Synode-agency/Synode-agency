import { ctaLabel } from "../cta";
import type { SiteContent } from "../types";

/** La page affichée après l'envoi du formulaire (`/thanks`, hors index). */
export const thanks = {
  metaTitle: "Message received",
  title: "Your message has been received.",
  accents: ["message"],
  text: "We have saved it. Here is what happens next.",
  steps: [
    {
      title: "An acknowledgement",
      text: "A confirmation email is on its way to the address you gave.",
    },
    {
      title: "Our reply",
      text: "We read your request and get back to you by email.",
    },
    {
      title: "A call, if it is urgent",
      text: "This message is not a meeting. To set one up, book a call directly.",
    },
  ],
  bookCta: ctaLabel.en,
  homeCta: "Back to home",
} as const satisfies SiteContent["thanks"];
