import { SectionHeading } from "@/components/site/section-heading";
import { Placeholder } from "@/components/site/placeholder";
import { renderLines } from "@/lib/lines";

/**
 * Une section de la landing dont la place est prise mais dont la matière
 * n'existe pas encore.
 *
 * Elle porte son vrai en-tête, donc la page a déjà son rythme définitif : le
 * jour où le contenu arrive, il remplace le bloc en pointillés sans rien
 * déplacer. C'est délibérément visible : un emplacement vide se confond avec
 * un bug, un emplacement qui dit ce qu'il attend est une tâche posée là où
 * elle ira.
 */
export function ReservedSection({
  id,
  copy,
}: {
  id: string;
  copy: { eyebrow: string; title: string; text: string; note: string };
}) {
  return (
    <section id={id} className="section-screen relative">
      <div className="container-page flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={renderLines(copy.title)}
          align="left"
          className="reveal-left"
        />
        <Placeholder label={copy.eyebrow} text={copy.text} note={copy.note} />
      </div>
    </section>
  );
}
