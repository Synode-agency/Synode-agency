import Link from "next/link";
import { ArrowRight, Workflow, Check, Database, Sparkles } from "lucide-react";
import { ANCHORS, ROUTES, path, type Locale } from "@/lib/content";
import { domains } from "@/lib/use-cases";

/** The same single offer on the homepage and the Solutions page. */
export function OfferCard({
  locale,
  detailed = false
}: {
  locale: Locale;
  detailed?: boolean;
}) {
  const fr = locale === "fr";
  return <article className="solution-offer">
      <div className="solution-offer-copy">
        <span className="eyebrow"><span className="status-dot" />{fr ? "Une offre. Votre solution." : "One offer. Your solution."}</span>
        <h2>{fr ? "Solutions IA sur mesure" : "Custom AI solutions"}</h2>
        <p>{fr ? "Un assistant, un processus automatisé ou un outil métier complet. Nous construisons la solution qui répond à votre besoin, connectée à votre façon de travailler." : "An assistant, an automated process or a complete internal tool. We build the solution your business needs, connected to the way you work."}</p>
        <ul className="domain-badges" aria-label={fr ? "Quatre domaines d’application" : "Four application areas"}>
          {domains(locale).map(d => <li key={d.slug}><Link href={`${path(locale, ROUTES.useCases)}#${d.slug}`}>{d.title}<ArrowRight aria-hidden /></Link></li>)}
        </ul>
        <div className="offer-bottom">
          <Link className="btn btn--primary" href={detailed ? `${path(locale, ROUTES.contact)}#${ANCHORS.form}` : path(locale, ROUTES.solutions)}>
            {detailed ? fr ? "Parlons de votre projet" : "Tell us about your project" : fr ? "Découvrir l’offre" : "Explore the offer"}<ArrowRight aria-hidden />
          </Link>
          <span>{fr ? "Périmètre clair. Devis sur mesure." : "Clear scope. Tailored quote."}</span>
        </div>
      </div>
      <div className="offer-system" aria-label={fr ? "Vos outils connectés à votre solution IA, avec validation humaine" : "Your tools connected to your AI solution, with human review"}>
        <span className="diagram-label">{fr ? "VOTRE ENVIRONNEMENT" : "YOUR ENVIRONMENT"}</span>
        <div className="system-inputs"><span><Database aria-hidden />CRM</span><span>Email</span><span>{fr ? "Documents" : "Documents"}</span></div>
        <div className="system-connector" />
        <div className="system-core"><Sparkles aria-hidden /><strong>Synode</strong><span>{fr ? "Votre solution IA" : "Your AI solution"}</span></div>
        <div className="system-connector" />
        <div className="system-output"><Workflow aria-hidden /><span>{fr ? "Des opérations simplifiées" : "Simpler operations"}</span><Check aria-hidden /></div>
        <span className="system-control"><Check aria-hidden />{fr ? "Vous gardez le contrôle" : "You stay in control"}</span>
      </div>
    </article>;
}
