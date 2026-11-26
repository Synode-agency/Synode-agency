import type { SiteContent } from "../types";

export const contact = {
  metaTitle: "Contact · Book a call · Synode",
  metaDescription: "Book a free 30-minute call to talk about your project.",

  hero: {
    eyebrow: "Contact",
    title: "Let’s talk about your project",
    accents: ["your project"],
    text: "A 30-minute video call to understand your needs and see whether we can help. Free, no commitment.",
  },

  booking: {
    title: "Book a 30-minute call",
    text: "A 30-minute video call to understand your needs.",
    openLabel: "Open the calendar",
    closedTitle: "Choose your slot",
    closedText: "30 minutes by video call.",
    closedNote: "The calendar is provided by Cal.com. It only loads when you open it, and may then use its own cookies.",
    closedNoteLink: "Learn more",
    projetLabel: "Your project",
  },

  write: {
    title: "Prefer to write?",
    text: "Email us at",
    or: "or leave us a message here.",
    replyDelay: "",
  },

  next: {
    title: "What happens next",
    items: [
      "We listen.",
      "We tell you honestly whether we can help.",
      "If so, we propose a scope.",
    ],
  },

  form: {
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@example.com" },
      need: {
        label: "Your message",
        placeholder: "Describe the task that wastes your time, or the software you would like to connect.",
        hint: "One concrete example beats a general description.",
      },
    },
    submit: "Send my message",
    sending: "Sending…",
    privacyNote: "Your details are used only to handle your request and are kept for 12 months after the last exchange. Controllers: Antonino Lo Bianco and Killian Schoebben (Synode). No newsletter, no reselling.",
    privacyLink: "How we handle your data",
    errors: {
      name: "Please enter your name.",
      email: "Please enter an email address.",
      emailInvalid: "That email address looks wrong.",
      need: "Tell us what you need in a few words (10 characters minimum).",
      tooLong: "This field is too long.",
      rateLimited: "You have just sent a request. Give it a moment before trying again.",
      server: "We could not save your request. Your text is still here: try again in a moment.",
      notConfigured:
        "Sending messages is not switched on in this version of the site. Your text is kept below; write to us directly at contact@synode-agency.com in the meantime.",
    },
  },
} as const satisfies SiteContent["contact"];
