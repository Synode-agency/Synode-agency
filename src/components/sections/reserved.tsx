import { SectionHeading } from "@/components/site/section-heading";
import { Placeholder } from "@/components/site/placeholder";
import { renderLines } from "@/lib/lines";

/**
 * Une section de la landing dont la place est prise mais dont la matière
 * n'existe pas encore.
 *
 * Elle porte son vrai en-tête, donc la page a déjà son rythme définitif : le
 * jour où le contenu arrive, il remplace le bloc en pointillés sans rien
 * déplacer.
 */
export function ReservedSection({
  id,
  copy,
}: {
  id: string;
  copy: { eyebrow: string; title: string; text: string; note: string };
}) {
  /* Elle ne s'affiche qu'en développement. Un bloc en pointillés qui annonce
     « à écrire » est une liste de tâches utile pour nous, et un chantier en
     cours pour un visiteur : la place reste réservée dans le code, la page
     publiée n'en montre rien. Le jour où le contenu arrive, on retire cette
     garde et la section prend sa place sans rien déplacer. */
  if (process.env.NODE_ENV === "production") return null;

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
