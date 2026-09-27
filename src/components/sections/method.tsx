import { renderLines } from "@/lib/lines";
import { SectionHeading } from "@/components/site/section-heading";
import { MethodTrack } from "@/components/site/method-track";
import { getContent, type Locale } from "@/lib/content";

export function Method({ locale }: { locale: Locale }) {
  const { method } = getContent(locale);

  return (
    <section id="methode" className="section-screen relative">
      <div className="method-content">
        {/* Le chapeau affichait `audience.body`, c'est-à-dire « qui nous
            aidons », sous le titre « Comment un système se construit ».
            Deux sujets sous un seul titre. « Qui nous aidons » a repris sa
            propre section, juste après celle-ci.

            L'accent d'un seul mot du titre est parti avec : il portait sur
            « simplifier », qui n'est plus dans le titre depuis le
            repositionnement, donc il ne mettait plus rien en valeur. */}
        <SectionHeading
          title={renderLines(method.title)}
          subtitle={method.body}
          align="left"
          className="method-heading reveal-left"
        />

        <MethodTrack
          steps={method.steps}
          className="mt-[calc(var(--ss)*clamp(2.5rem,2rem+2.5vw,5rem))] w-full"
        />
      </div>
    </section>
  );
}
