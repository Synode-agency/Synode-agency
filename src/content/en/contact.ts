import type { SiteContent } from "../types";

/** La page Contact : calendrier et formulaire. */
export const contact = {
  metaTitle: "Let’s talk about your project",
  metaDescription: "Book a free 30-minute call with Synode, a technology agency in Brussels, or tell us what you need in writing. No commitment.",
  kicker: "Contact",
  title: "Let’s talk about\n^your project",
  text: "A free first call, with no commitment. We use it to understand your situation and identify a first direction. It is not a full technical audit.",

  booking: {
    title: "Book a 30-minute call",
    text: "A free first call, with no commitment. We use it to understand your situation and identify a first direction. It is not a full technical audit.",
    openLabel: "Open the calendar",
    closedTitle: "Choose your slot",
    closedText: "30 minutes by video call, free and with no commitment.",
    closedNote: "The calendar is provided by Cal.com. It only loads when you open it, and may then use its own cookies.",
    closedNoteLink: "Learn more",
  },

  form: {
    title: "Tell us what you need in writing",
    text: "If you would rather write, or if none of the slots suit you.",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Contact email", placeholder: "you@example.com" },
      company: { label: "Company or activity", placeholder: "Optional", optional: "Optional" },
      need: { label: "What would you like to improve?", placeholder: "Describe the task that costs you the most time, or the software you would like to connect.", hint: "One concrete example beats a general description." },
      phone: { label: "Phone", placeholder: "Optional", optional: "Optional" },
      website: { label: "Website", placeholder: "Optional", optional: "Optional" },
      timeline: { label: "Timeline in mind", optional: "Optional" },
      budget: { label: "Budget in mind", optional: "Optional" },
    },
    timelineOptions: ["To be defined", "As soon as possible", "In 1 to 3 months", "In 3 to 6 months", "Later"],
    budgetOptions: ["To be defined", "Under €5,000", "€5,000 to €15,000", "€15,000 to €40,000", "Over €40,000"],
    submit: "Send my message",
    sending: "Sending…",
    privacyNote: "Your details are used only to handle your request and are kept for 12 months after the last exchange. Controllers: Antonino Lo Bianco and Killian Schoebben (Synode). No newsletter, no reselling.",
    privacyLink: "How we handle your data",
    errors: {
      name: "Please enter your name.",
      email: "Please enter an email address.",
      emailInvalid: "That email address looks wrong.",
      need: "Tell us what you need in a few words (10 characters minimum).",
      website: "That website address looks wrong.",
      tooLong: "This field is too long.",
      rateLimited: "You have just sent a request. Give it a moment before trying again.",
      server: "We could not save your request. Your text is still here: try again in a moment.",
      notConfigured:
        "Sending messages is not switched on in this version of the site. Your text is kept below; write to us directly at contact@synode-agency.com in the meantime.",
    },
  },
} as const satisfies SiteContent["contact"];
