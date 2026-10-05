import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ROUTES, path, type Locale } from "@/lib/content";
import { WireframeMiniApp } from "@/components/site/project-mini-app";
import { work, workItems } from "@/lib/work";

/**
 * Les réalisations de l'accueil : une carte par projet, côte à côte.
 *
 * Les deux cartes partagent le même gabarit — visuel en haut, puis statut,
 * titre, description, libellés et lien — pour que la comparaison porte sur
 * les projets et non sur leur mise en page.
 *
 * Plus de composant client ici : l'ancienne version basculait un aperçu au
 * survol et imposait donc du JavaScript à une section qui ne fait que
 * montrer deux projets. Tout est désormais rendu sur le serveur.
 *
 * Le second projet n'existe pas encore : sa carte ne porte pas de lien et
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
        src: "/demos/nexus-demo-image.png",
        alt: fr
          ? "Nexus, logiciel de prospection B2B : les étapes Discovery, Qualification et Outreach présentées sur des données de démonstration."
          : "Nexus, B2B prospecting software: the Discovery, Qualification and Outreach stages shown on demonstration data.",
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

  return (
    <ul className="work-cards">
      {projects.map((project) => (
        <li key={project.name} className="work-card">
          <div className="work-card-media">
            {project.image ? (
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={1600}
                height={800}
                sizes="(max-width: 900px) 92vw, 46vw"
              />
            ) : (
              <WireframeMiniApp locale={locale} />
            )}
          </div>
          <div className="work-card-body">
            <span className="work-card-state"><i aria-hidden />{project.status}</span>
            <h3>{project.name}</h3>
            <p>{project.text}</p>
            <ul className="work-card-tags">
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            {project.href && (
              <Link className="work-card-go" href={project.href}>
                {fr ? "Découvrir le projet" : "Explore the project"}<ArrowUpRight aria-hidden />
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
