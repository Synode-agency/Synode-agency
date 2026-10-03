"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ROUTES, path, type Locale } from "@/lib/content";
import { WireframeMiniApp } from "@/components/site/project-mini-app";
import { work, workItems } from "@/lib/work";

/**
 * Les réalisations de l'accueil : le sommaire à gauche, l'aperçu à droite.
 *
 * Le sommaire ne donne que le domaine et le nom. Tout ce qui décrit le
 * projet — statut, titre, description, libellés, lien — vit sous la
 * capture, dans la colonne de droite : les lignes gardent ainsi la même
 * hauteur quelle que soit la longueur des textes, et la liste reste lisible
 * d'un coup d'œil.
 *
 * Le panneau suit la ligne survolée ET la ligne qui reçoit le focus. Au
 * survol seul, la section serait muette au clavier, et la ligne atteinte en
 * tabulation mènerait à un projet dont on n'aurait jamais vu l'aperçu. La
 * première ligne est active au chargement.
 *
 * Le second projet n'existe pas encore : sa ligne ne porte pas de lien et
 * son visuel est un fil de fer, pas une interface floutée.
 */
type Project = {
  domain: string;
  name: string;
  href?: string;
  status: string;
  title: string;
  text: string;
  tags: string[];
  image?: { src: string; alt: string };
};

export function HomeWorkCards({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const item = workItems(locale)[0];
  const kinds = work(locale).kinds;
  const [active, setActive] = useState(0);

  const projects: Project[] = [];
  if (item) {
    projects.push({
      domain: kinds[item.kind],
      name: fr ? "Nexus — Logiciel de prospection" : "Nexus — Prospecting software",
      href: `${path(locale, ROUTES.work)}/${item.slug}`,
      status: item.status,
      title: fr ? "La prospection B2B, de la recherche au premier contact" : "B2B prospecting, from research to first contact",
      text: item.problem,
      tags: fr
        ? ["Recherche web", "Analyse IA", "Qualification", "Suivi commercial"]
        : ["Web research", "AI analysis", "Qualification", "Sales follow-up"],
      image: {
        src: "/realisations/nexus-dashboard.webp",
        alt: fr
          ? "Tableau de bord de Nexus : compteurs de leads, répartition par statut et avancement de la recherche."
          : "Nexus dashboard: lead counters, breakdown by status and search progress.",
      },
    });
  }
  projects.push({
    domain: kinds.demo,
    name: fr ? "Démonstrateur IA — en préparation" : "AI demonstrator — in preparation",
    status: fr ? "En préparation" : "In preparation",
    title: fr ? "Une démonstration complète, de bout en bout" : "A complete demonstration, end to end",
    text: fr
      ? "De la demande reçue à l’action validée, sur des données fictives identifiées comme telles. Elle sera publiée ici quand elle fonctionnera réellement."
      : "From the incoming request to the approved action, on fictional data labelled as such. It will be published here once it genuinely runs.",
    tags: fr
      ? ["Agent IA", "Automatisation", "Validation humaine"]
      : ["AI agent", "Automation", "Human approval"],
  });

  const current = projects[active] ?? projects[0];

  return (
    <div className="work-showcase">
      <ol className="work-showcase-list">
        {projects.map((project, index) => {
          const isActive = index === active;
          const select = () => setActive(index);
          const inner = (
            <>
              <span className="work-row-domain">{project.domain}</span>
              <span className="work-row-name">{project.name}</span>
              <span className="work-row-go" aria-hidden><ArrowRight /></span>
            </>
          );
          return (
            <li key={project.name} className={isActive ? "is-active" : undefined}>
              {project.href ? (
                <Link className="work-row" href={project.href} onMouseEnter={select} onFocus={select}>
                  {inner}
                </Link>
              ) : (
                <button
                  type="button"
                  className="work-row"
                  onMouseEnter={select}
                  onFocus={select}
                  onClick={select}
                  aria-pressed={isActive}
                >
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ol>

      <figure className="work-showcase-preview">
        <div className="work-showcase-media">
          {current.image ? (
            <Image
              src={current.image.src}
              alt={current.image.alt}
              width={2200}
              height={1189}
              sizes="(max-width: 900px) 92vw, 56vw"
            />
          ) : (
            <WireframeMiniApp locale={locale} />
          )}
        </div>
        <figcaption>
          <span className="work-showcase-state"><i aria-hidden />{current.status}</span>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
          <ul className="work-tile-tags">
            {current.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
          {current.href && (
            <Link className="go" href={current.href}>
              {fr ? "Découvrir le projet" : "Explore the project"}<ArrowUpRight aria-hidden />
            </Link>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
