import { InnerPage } from "@/components/site/inner-page";
import { MethodTrack } from "@/components/site/method-track";
import { Reveal } from "@/components/site/reveal";
import { getContent, type Locale } from "@/lib/content";

/**
 * La page Méthode.
 *
 * Elle porte la même piste que la landing, sans la réécrire : cinq étapes
 * qui racontent deux choses différentes selon l'endroit seraient deux
 * méthodes. Ce que la page ajoute, c'est le texte des cinq étapes lisible
 * d'un coup, là où la piste de l'accueil n'en montre qu'un à la fois.
 */
export function MethodPage({ locale }: { locale: Locale }) {
  const { method } = getContent(locale);

  return (
    <InnerPage
      locale={locale}
      eyebrow={method.eyebrow}
      title={method.title.replace(/[\n^]/g, " ").replace(/\s+/g, " ").trim()}
      body={method.body}
    >
      <div className="container-page pb-[var(--space-section)]">
        <MethodTrack steps={method.steps} className="w-full" />

        {/* Les cinq étapes en clair. La piste au-dessus n'en montre qu'une
            à la fois, ce qui va pour un aperçu ; une page dédiée doit
            pouvoir se lire sans attendre que le carrousel tourne. */}
        <Reveal delay={120} className="method-detail reveal-up">
          <ol className="method-detail-list">
            {method.steps.map((step, i) => (
              <li key={step.title} className="method-detail-item">
                <span aria-hidden className="method-detail-rank">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="method-detail-title">{step.title}</h2>
                  <p className="method-detail-text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </InnerPage>
  );
}
