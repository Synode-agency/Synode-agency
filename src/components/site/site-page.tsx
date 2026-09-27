import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { SolutionsBand } from "@/components/sections/solutions-band";
import { Problem } from "@/components/sections/problem";
import { Difference } from "@/components/sections/difference";
import { CapabilitiesBand } from "@/components/sections/capabilities-band";
import { Opportunity } from "@/components/sections/opportunity";
import { Method } from "@/components/sections/method";
import { AiOps } from "@/components/sections/ai-ops";
import { Audience } from "@/components/sections/audience";
import { ReservedSection } from "@/components/sections/reserved";
import { CtaBand } from "@/components/sections/cta-band";
import { getContent, type Locale } from "@/lib/content";

/**
 * La landing.
 *
 * L'enchaînement raconte une seule chose, dans cet ordre : voici un système
 * qui tourne, voici la place qu'il occupe, voici les quatre que nous
 * construisons, voici les situations qu'ils prennent en charge, voici
 * pourquoi ce n'est pas un outil de plus, voici comment on s'y prend, et
 * voici à qui on parle.
 *
 * « Qui nous aidons » est une section depuis la revue de design. Son texte
 * était affiché dans le chapeau de la Méthode : deux sujets vivaient sous
 * un seul titre, et aucun des deux ne se lisait.
 *
 * Les numéros de chapitre ont quitté la page dans le même mouvement. Ils
 * existaient pour distinguer des sections qui se ressemblaient toutes ;
 * elles ne se ressemblent plus, et les numéros percutaient les titres.
 *
 * Ce qui a quitté cette page, et pourquoi : les seize prestations. Seize
 * cartes se lisent comme un catalogue, et un catalogue se compare au prix.
 * Elles sont sous `/expertise`, d'où elles servent le référencement sans
 * définir l'offre.
 *
 * Chaque section utilise une famille de composition différente — carte
 * pleine, phrase seule, grille de quatre, quatre colonnes, schéma empilé,
 * piste horizontale, bandeau. Deux sections voisines qui se ressemblent
 * donnent l'impression d'un gabarit répété, ce qui est exactement
 * l'impression qu'un site d'agence doit éviter.
 */
export function SitePage({ locale }: { locale: Locale }) {
  const { landing } = getContent(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1">
        <Hero locale={locale} />

        <Manifesto locale={locale} />
        <SolutionsBand locale={locale} />
        <Problem locale={locale} />
        <Difference locale={locale} />
        <CapabilitiesBand locale={locale} />
        <Opportunity locale={locale} />
        <Method locale={locale} />
        <Audience locale={locale} />
        <AiOps locale={locale} />

        <ReservedSection id="resultats" copy={landing.results} />

        <CtaBand locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
