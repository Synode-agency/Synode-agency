import { InnerPage } from "@/components/site/inner-page";
import { Team } from "@/components/sections/team";
import { getContent, type Locale } from "@/lib/content";

/**
 * L'équipe, sortie de la landing.
 *
 * La section `Team` est réutilisée telle quelle : c'est elle qui porte le
 * panneau, les deux cartes et les quatre valeurs. Seul son propre en-tête est
 * masqué ici, puisque la page en a déjà un.
 */
export function TeamPage({ locale }: { locale: Locale }) {
  const { team } = getContent(locale);

  return (
    <InnerPage
      locale={locale}
      eyebrow={team.eyebrow}
      title={team.title}
      titleAccent={team.titleAccent}
      body={team.body}
    >
      <div className="team-page-deck pb-[var(--space-section)]">
        <Team locale={locale} headless />
      </div>
    </InnerPage>
  );
}
