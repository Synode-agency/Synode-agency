import { AlertTriangle, LayoutGrid, Mail, Radar, Users } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * Les deux aperçus de la section Réalisations.
 *
 * Même châssis de fenêtre pour les deux, et c'est tout le propos : l'un est
 * RENDU, l'autre est un FIL DE FER. La différence entre un projet qui tourne
 * et un démonstrateur qui arrive se lit alors sans qu'aucun texte n'ait à
 * l'expliquer, et sans qu'un emplacement vide ressemble à un oubli.
 *
 * Le rendu reprend la structure réelle de Nexus : rail de navigation,
 * quatre compteurs, l'avancement de Discovery, puis la répartition des
 * leads. Ce n'est pas une capture, c'est du HTML : il reste net à toutes les
 * tailles, il se traduit, et il suit les couleurs du site.
 *
 * ⚠ Les valeurs viennent de la base de prospection interne de Synode, pas
 * d'un client. Elles décrivent notre propre outil et doivent être mises à
 * jour ou neutralisées si elles cessent d'être exactes.
 */

const RAIL = [LayoutGrid, Radar, Users, Mail, AlertTriangle];

export function ProspectMiniApp({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const kpis = [
    { label: fr ? "Total leads" : "Total leads", value: "287" },
    { label: fr ? "Qualifiés" : "Qualified", value: "25" },
    { label: fr ? "Contactés" : "Contacted", value: "26" },
    { label: fr ? "En cours" : "Running", value: "0" },
  ];
  const rows = fr
    ? [
        { label: "Nouveau", value: "168", width: 100 },
        { label: "Faible priorité", value: "31", width: 38 },
        { label: "Contacté", value: "26", width: 31 },
        { label: "Qualifié", value: "25", width: 30 },
      ]
    : [
        { label: "New", value: "168", width: 100 },
        { label: "Low priority", value: "31", width: 38 },
        { label: "Contacted", value: "26", width: 31 },
        { label: "Qualified", value: "25", width: 30 },
      ];

  return (
    <figure className="mini-app" aria-label={fr ? "Aperçu de l’interface de Synode Prospect" : "Preview of the Synode Prospect interface"}>
      <figcaption className="mini-app-bar">
        <span className="terminal-dots" aria-hidden><i /><i /><i /></span>
        <span className="mini-app-name">nexus.synode</span>
        <span className="mini-app-tag">{fr ? "Prospection B2B" : "B2B prospecting"}</span>
      </figcaption>

      <div className="mini-app-body">
        <nav className="mini-app-rail" aria-hidden>
          {RAIL.map((Icon, i) => (
            <span key={i} className={i === 0 ? "is-active" : undefined}><Icon /></span>
          ))}
        </nav>

        <div className="mini-app-main">
          <div className="mini-kpis">
            {kpis.map(({ label, value }) => (
              <div key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>

          <div className="mini-progress">
            <span>Discovery</span>
            <span className="mini-progress-track" aria-hidden><i /></span>
            <b>19 %</b>
          </div>

          <ul className="mini-rows">
            {rows.map(({ label, value, width }) => (
              <li key={label}>
                <span>{label}</span>
                <span className="mini-rows-bar" aria-hidden><i style={{ width: `${width}%` }} /></span>
                <b>{value}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}

/**
 * Le même châssis, à l'état de plan.
 *
 * Aucune donnée, aucun nombre, aucune promesse : les blocs sont vides et le
 * cadre est en pointillés. Un visiteur comprend qu'il regarde un
 * emplacement, pas une interface floutée.
 */
export function WireframeMiniApp({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <figure className="mini-app mini-app--wire" aria-hidden>
      <figcaption className="mini-app-bar">
        <span className="terminal-dots" aria-hidden><i /><i /><i /></span>
        <span className="mini-app-name">demo.pending</span>
        <span className="mini-app-tag">{fr ? "En préparation" : "In preparation"}</span>
      </figcaption>

      <div className="mini-app-body">
        <nav className="mini-app-rail">
          {RAIL.map((_, i) => <span key={i} />)}
        </nav>

        <div className="mini-app-main">
          <div className="mini-kpis">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}>
                <span />
                <b />
              </div>
            ))}
          </div>
          <div className="mini-progress">
            <span />
            <span className="mini-progress-track"><i /></span>
            <b />
          </div>
          <ul className="mini-rows">
            {[0, 1, 2, 3].map((i) => (
              <li key={i}>
                <span />
                <span className="mini-rows-bar"><i /></span>
                <b />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
