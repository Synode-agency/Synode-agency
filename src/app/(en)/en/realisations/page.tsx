import type { Metadata } from "next";
import { RealisationsPage } from "@/components/site/realisations-page";

export const metadata: Metadata = {
  title: { absolute: "Work & demonstrators — Synode" },
  description:
    "Four systems built in-house to show exactly what we deliver: automation, AI agents, dashboards and business tools.",
  alternates: {
    canonical: "/en/realisations",
    languages: { fr: "/realisations", en: "/en/realisations" },
  },
};

export default function RealisationsEn() {
  return (
    <RealisationsPage locale="en" />
  );
}
