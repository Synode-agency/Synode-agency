import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { renderLines } from "@/lib/lines";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * L'AI Opportunity Map.
 *
 * La première des cinq offres, et celle qui pose le ton : avant de
 * construire, on cherche où l'IA a de la valeur, et on dit aussi où elle
 * n'en a pas. C'est la phrase qui sépare une société d'ingénierie d'un
 * intégrateur qui pose ce qu'on lui commande.
 *
 * Les six points sont numérotés parce qu'ils s'enchaînent réellement : on
 * ne chiffre pas un ROI avant d'avoir relevé les tâches manuelles. Le
 * livrable est détaché du reste, sur fond bleu : c'est ce qu'on emporte.
 */
export function Opportunity({ locale }: { locale: Locale }) {
  const { opportunity } = getContent(locale);

  return (
    <section id="opportunite" className="section-screen relative">
      <div className="container-page">
        <SectionHeading
          eyebrow={opportunity.eyebrow}
          title={renderLines(opportunity.title)}
          subtitle={opportunity.body}
          align="left"
          className="reveal-left"
        />

        <Reveal delay={110} className="oppo reveal-up">
          <ol className="oppo-steps">
            {opportunity.steps.map((step, i) => (
              <li key={step} className="oppo-step">
                <span aria-hidden className="oppo-step-rank">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <div className="oppo-out">
            <span className="oppo-out-label">{opportunity.deliverableLabel}</span>
            <strong className="oppo-out-title">{opportunity.deliverable}</strong>
            <Link href={path(locale, "/contact")} className="oppo-out-cta">
              {opportunity.cta}
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
