import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { path, ROUTES, type Locale } from "@/lib/content";
import { type WorkItem, work } from "@/lib/work";
import { ProjectPanelPreview } from "@/components/site/hero-asides";

export function WorkProjectCard({ item, locale }: { item: WorkItem; locale: Locale }) {
  const fr = locale === "fr";
  return <Link href={`${path(locale, ROUTES.work)}/${item.slug}`} className="project-showcase">
    <div className="project-cover">
      {item.image
        ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 760px) 90vw, 60vw" />
        : <>
            <div className="project-cover-top"><span><Code2 aria-hidden />{work(locale).kinds[item.kind]}</span><span>Synode / 01</span></div>
            {/* L'emplacement de capture en pointillés laissait la carte vide.
                L'aperçu en panneau, repris du hero, montre le projet tel
                qu'il est pensé sans prétendre être une capture d'écran. */}
            <ProjectPanelPreview item={item} locale={locale} />
            <div className="project-cover-bottom"><Image src="/synode-mark.png" width={30} height={30} alt="" /><span>{item.title}</span><span className="project-cover-dots" aria-hidden>· · ·</span></div>
          </>}
    </div>
    <div className="project-showcase-copy"><span className="eyebrow">{work(locale).kinds[item.kind]}</span><h2>{item.title}</h2><p>{item.problem}</p><div className="project-journey" aria-label={fr ? "Parcours fonctionnel envisagé" : "Planned functional journey"}>{item.journey.map((step, index) => <span key={step}>{index > 0 && <ArrowRight aria-hidden />}<span>{step}</span></span>)}</div><span className="project-state"><i aria-hidden />{item.status}</span><span className="project-showcase-link">{fr ? "Explorer le projet" : "Explore the project"}<ArrowUpRight aria-hidden /></span></div>
  </Link>;
}
