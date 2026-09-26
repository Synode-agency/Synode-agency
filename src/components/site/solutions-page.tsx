import { InnerPage } from "@/components/site/inner-page";
import { Reveal } from "@/components/site/reveal";
import { SystemCard } from "@/components/sections/solutions-band";
import { getContent, type Locale } from "@/lib/content";
import { systems } from "@/lib/solutions";

/**
 * La page Solutions : les quatre systèmes, et rien d'autre.
 *
 * Elle porte les mêmes cartes que la landing, sans les réécrire. Une carte
 * système dit la même chose partout où elle apparaît, sinon le visiteur qui
 * arrive par la page découvre une offre différente de celui qui arrive par
 * l'accueil.
 */
export function SolutionsPage({ locale }: { locale: Locale }) {
  const { solutions } = getContent(locale);

  return (
    <InnerPage
      locale={locale}
      eyebrow={solutions.eyebrow}
      title={solutions.title.replace(/[\n^]/g, " ").replace(/\s+/g, " ").trim()}
      body={solutions.body}
    >
      <div className="container-page pb-[var(--space-section)]">
        <div className="systems-grid">
          {systems(locale).map((system, i) => (
            <Reveal key={system.slug} delay={60 + i * 80} className="reveal-up">
              <SystemCard locale={locale} system={system} />
            </Reveal>
          ))}
        </div>
      </div>
    </InnerPage>
  );
}
