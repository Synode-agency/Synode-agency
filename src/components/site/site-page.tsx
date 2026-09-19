import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Offer } from "@/components/sections/offer";
import { Method } from "@/components/sections/method";
import { Team } from "@/components/sections/team";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { SectionPager } from "@/components/site/section-pager";
import { SectionSnap } from "@/components/site/section-snap";
import type { Locale } from "@/lib/content";

/**
 * Landing page. Every section fills one viewport on desktop; the FAQ shares
 * its screen with the footer. Réalisations and the contact form live on their
 * own routes.
 *
 * A single `SectionPager` on the right edge moves between sections in both
 * directions — there is no per-section arrow. `SectionSnap` makes one scroll
 * gesture land on one section.
 */
export function SitePage({ locale }: { locale: Locale }) {
  return (
    <>
      <SiteHeader locale={locale} />
      <SectionSnap />
      <SectionPager />
      <main className="flex-1">
        <Hero locale={locale} />
        <Problem locale={locale} />
        <Offer locale={locale} />
        <Method locale={locale} />
        <Team locale={locale} />

        <CtaBand locale={locale} />

        <div className="screen-shell">
          <Faq locale={locale} />
          <SiteFooter locale={locale} />
        </div>
      </main>
    </>
  );
}
