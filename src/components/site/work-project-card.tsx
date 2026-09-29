import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageIcon, Code2 } from "lucide-react";
import { path, ROUTES, type Locale } from "@/lib/content";
import { type WorkItem, work } from "@/lib/work";

export function WorkProjectCard({ item, locale }: { item: WorkItem; locale: Locale }) {
  const fr = locale === "fr";
  return <Link href={`${path(locale, ROUTES.work)}/${item.slug}`} className="project-showcase">
    <div className="project-cover">
      {item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 760px) 90vw, 60vw" /> : <><div className="project-cover-top"><span><Code2 aria-hidden />{work(locale).kinds[item.kind]}</span><span>Synode / 01</span></div><div className="project-cover-placeholder"><ImageIcon aria-hidden /><strong>{fr ? "Un aperçu se prépare." : "An overview is taking shape."}</strong><span>{fr ? "Emplacement de la capture du projet" : "Project screenshot placeholder"}</span></div><div className="project-cover-bottom"><Image src="/synode-mark.png" width={30} height={30} alt="" /><span>{item.title}</span><span className="project-cover-dots" aria-hidden>· · ·</span></div></>}
    </div>
    <div className="project-showcase-copy"><span className="eyebrow">{work(locale).kinds[item.kind]}</span><h2>{item.title}</h2><p>{item.problem}</p><span className="project-state"><i aria-hidden />{item.status}</span><span className="project-showcase-link">{fr ? "Explorer le projet" : "Explore the project"}<ArrowUpRight aria-hidden /></span></div>
  </Link>;
}
