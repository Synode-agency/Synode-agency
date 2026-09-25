import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { ServicesBand } from "@/components/sections/services-band";
import { Method } from "@/components/sections/method";
import { ReservedSection } from "@/components/sections/reserved";
import { CtaBand } from "@/components/sections/cta-band";
import { getContent, type Locale } from "@/lib/content";

/**
 * La landing.
 *
 * L'enchaînement suit celui qui marche chez les agences comparables : on
 * montre un système qui tourne, on nomme le problème, on annonce ce qu'on
 * vend, on explique comment on travaille, on prouve, on donne quelque chose,
 * on propose l'heure d'audit.
 *
 * Trois de ces temps n'ont pas encore leur matière — le cas d'usage, les
 * résultats chiffrés, les outils gratuits. Leur place est tenue par un bloc
 * qui dit ce qu'il attend, plutôt que par un texte inventé.
 *
 * Ce qui a quitté cette page : l'offre, qui est devenue `/services` et ses
 * douze prestations ; l'équipe, qui a sa page ; la FAQ, qui a la sienne. Une
 * landing annonce, elle ne dit pas tout.
 */
export function SitePage({ locale }: { locale: Locale }) {
  const { landing } = getContent(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1">
        <Hero locale={locale} />

        <ServicesBand locale={locale} />
        <Problem locale={locale} />
        <Method locale={locale} />

        <ReservedSection id="resultats" copy={landing.results} />
        <ReservedSection id="outils" copy={landing.tools} />

        <CtaBand locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
