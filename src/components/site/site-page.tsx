import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Problem } from "@/components/sections/problem";
import { Offer } from "@/components/sections/offer";
import { Method } from "@/components/sections/method";
import { Realisations } from "@/components/sections/realisations";
import { Audience } from "@/components/sections/audience";
import { CtaBand } from "@/components/sections/cta-band";
import { Contact } from "@/components/sections/contact";
import type { Locale } from "@/lib/content";

export function SitePage({ locale }: { locale: Locale }) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1">
        <Hero locale={locale} />
        <Stats locale={locale} />
        <Problem locale={locale} />
        <Offer locale={locale} />
        <Method locale={locale} />
        <Realisations locale={locale} />
        <Audience locale={locale} />
        <CtaBand locale={locale} />
        <Contact locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
