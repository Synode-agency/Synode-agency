import Image from "next/image";
import { ArrowRight, CalendarClock, Check, Clock3, Globe2, MessageSquareText, Video } from "lucide-react";
import { getContent, type Locale } from "@/lib/content";
import type { WorkItem } from "@/lib/work";

/**
 * Les illustrations de hero des pages internes.
 *
 * Chacune montre quelque chose qui EXISTE déjà : les deux portraits des
 * associés, les deux portes d'entrée du contact, un projet réellement en
 * cours. Aucune donnée inventée, aucun chiffre, aucun client. Le cadre reste
 * celui des panneaux sombres du site : filet fin, fond #0B192C, libellés en
 * mono.
 */

/**
 * L'aperçu d'un projet, en panneau.
 *
 * Il a d'abord servi dans le hero de Réalisations. Il vit maintenant dans la
 * carte du projet, à la place de l'emplacement de capture vide : un aperçu
 * crédible y dit plus qu'un cadre en pointillés. Le composant prend donc son
 * projet en paramètre au lieu de lire le premier de la liste.
 */
export function ProjectPanelPreview({ item, locale }: { item: WorkItem; locale: Locale }) {
  const fr = locale === "fr";

  return (
    <figure className="hero-panel hero-work-preview" aria-label={fr ? "Aperçu du projet" : "Project preview"}>
      <figcaption className="hero-panel-bar">
        <span className="terminal-dots" aria-hidden><i /><i /><i /></span>
        <span>{item.slug}</span>
      </figcaption>
      <div className="hero-work-preview-body">
        <Image src="/synode-mark.png" width={38} height={38} alt="" />
        <div>
          <span className="badge badge--wip">{item.status}</span>
          <strong>{item.title}</strong>
          <p>{item.problem}</p>
        </div>
      </div>
      <ol className="hero-work-preview-journey" aria-label={fr ? "Parcours fonctionnel envisagé" : "Planned functional journey"}>
        {item.journey.slice(0, 4).map((step) => <li key={step}>{step}</li>)}
      </ol>
      <p className="hero-panel-note">{fr ? "Parcours envisagé · interface en construction." : "Planned journey · interface under construction."}</p>
    </figure>
  );
}

/**
 * Le hero de Réalisations : la fabrication vue depuis la console.
 *
 * L'aperçu de projet est descendu dans sa carte, et la page avait besoin
 * d'autre chose en haut. Ce panneau parle du métier plutôt que d'un projet
 * précis : l'état d'un système en service, puis les étapes de construction,
 * la dernière encore ouverte. Rien ici n'affirme un résultat client.
 */
const BUILD_STEPS = ["architecture", "development", "integrations", "testing"] as const;

export function WorkHeroTerminal({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const state = [
    ["status", "deployed"],
    ["agents", "active"],
    ["integrations", "connected"],
    ["monitoring", "enabled"],
  ] as const;

  return (
    <figure className="hero-panel work-console" aria-label={fr ? "Les étapes de construction d’un système Synode" : "The build stages of a Synode system"}>
      <figcaption className="hero-panel-bar">
        <span className="terminal-dots" aria-hidden><i /><i /><i /></span>
        <span>project.synode</span>
      </figcaption>
      <dl className="work-console-state">
        {state.map(([key, value]) => (
          <div key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="work-console-build">
        <strong>build</strong>
        <ol>
          {BUILD_STEPS.map((step) => (
            <li key={step}><Check aria-hidden />{step}</li>
          ))}
          <li className="is-current"><ArrowRight aria-hidden />production</li>
        </ol>
      </div>
      <p className="hero-panel-note">{fr ? "Composition illustrative du déroulement d’un projet." : "Illustrative view of how a project unfolds."}</p>
    </figure>
  );
}

/** Équipe : les deux portraits réels, sobrement. */
export function TeamHeroPortraits({ locale }: { locale: Locale }) {
  const { team } = getContent(locale);

  return (
    <div className="hero-team-portraits">
      {team.people.map((person) => (
        <figure key={person.first}>
          <Image src={person.photo} alt={person.first} width={560} height={700} sizes="(max-width: 760px) 45vw, 22vw" />
          <figcaption>
            <strong>{person.first}</strong>
            <span>{person.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Contact : les deux portes d'entrée, de même rang, sans disponibilité fictive. */
export function ContactHeroDoors({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const doors = [
    {
      icon: CalendarClock,
      title: fr ? "Réserver un échange de 30 minutes" : "Book a 30-minute conversation",
      text: fr ? "Nous comprenons votre situation et identifions une première piste." : "We understand your situation and identify a first direction.",
      meta: [
        { icon: Clock3, label: fr ? "30 minutes · gratuit" : "30 minutes · free" },
        { icon: Video, label: fr ? "En visioconférence" : "Video call" },
        { icon: Globe2, label: "Europe/Brussels" },
      ],
    },
    {
      icon: MessageSquareText,
      title: fr ? "Décrire votre besoin par écrit" : "Describe your need in writing",
      text: fr ? "Si vous préférez écrire, ou si aucun créneau ne vous convient." : "If you prefer writing, or if no slot suits you.",
      meta: [],
    },
  ];

  return (
    <div className="hero-panel hero-contact-doors">
      <span className="hero-panel-bar hero-panel-bar--plain">{fr ? "Deux façons de commencer" : "Two ways to start"}</span>
      {doors.map(({ icon: Icon, title, text, meta }) => (
        <div key={title} className="hero-contact-door">
          <span className="hero-contact-door-icon"><Icon aria-hidden /></span>
          <div>
            <strong>{title}</strong>
            <p>{text}</p>
            {meta.length > 0 && (
              <ul>
                {meta.map(({ icon: MetaIcon, label }) => <li key={label}><MetaIcon aria-hidden />{label}</li>)}
              </ul>
            )}
          </div>
          <ArrowRight className="hero-contact-door-arrow" aria-hidden />
        </div>
      ))}
      <p className="hero-panel-note">{fr ? "Aucun formulaire à remplir pour accéder au calendrier." : "No form to fill in before reaching the calendar."}</p>
    </div>
  );
}
