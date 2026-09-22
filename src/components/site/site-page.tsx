import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Offer } from "@/components/sections/offer";
import { Method } from "@/components/sections/method";
import { Team } from "@/components/sections/team";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import type { Locale } from "@/lib/content";

/**
 * Landing page. One continuous scroll: the sections are spaced by
 * `--space-between` rather than sized to the viewport. Réalisations and the
 * contact form live on their own routes.
 */
export function SitePage({ locale }: { locale: Locale }) {
  return (
    <>
      <SiteHeader locale={locale} />
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
