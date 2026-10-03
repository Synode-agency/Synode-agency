import { CircleDot, Database, ListOrdered, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * L'orchestration d'une demande, vue comme un système.
 *
 * Six étapes, pas dix, et deux colonnes d'état plutôt que cinq lignes
 * d'intégrations : l'illustration doit tenir la hauteur du bloc de texte à sa
 * gauche. Ce qui reste est ce qui porte le message — un processus métier
 * orchestré, des outils réellement connectés, une validation humaine et une
 * journalisation — et non la longueur de la trace.
 */
const workflows = {
  fr: [
    ["input.received", "Demande reçue"],
    ["context.loaded", "Contexte chargé"],
    ["ai.agent.analyze", "Demande analysée"],
    ["business_rules.validate", "Règles métier vérifiées"],
    ["human.approval", "Validation humaine"],
    ["systems.update", "Outils mis à jour"],
  ],
  en: [
    ["input.received", "Request received"],
    ["context.loaded", "Context loaded"],
    ["ai.agent.analyze", "Request analysed"],
    ["business_rules.validate", "Business rules checked"],
    ["human.approval", "Human approval"],
    ["systems.update", "Systems updated"],
  ],
} as const;

export function UseCaseTerminal({ locale }: { locale: Locale }) {
  const fr = locale === "fr";

  return (
    <figure className="use-case-terminal" aria-label={fr ? "Exemple d’orchestration d’une demande client" : "Example customer request orchestration"}>
      <figcaption className="terminal-bar">
        <span className="terminal-dots" aria-hidden><i /><i /><i /></span>
        <span>customer-request.workflow</span>
        <span className="terminal-state"><CircleDot aria-hidden />{fr ? "Système actif" : "System active"}</span>
      </figcaption>
      <div className="terminal-process">
        <strong><ListOrdered aria-hidden />PROCESS</strong>
        <ol className="terminal-lines">
          {workflows[locale].map(([instruction, meaning], index) => (
            <li key={instruction} className={instruction.includes("human.approval") ? "is-control" : undefined}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <code>{instruction}</code>
              <small>{meaning}</small>
            </li>
          ))}
        </ol>
      </div>
      <div className="terminal-integrations">
        <div>
          <strong><Database aria-hidden />CONNECTED</strong>
          <ul>
            <li><span>CRM</span><i>active</i></li>
            <li><span>ERP</span><i>active</i></li>
            <li><span>Documents</span><i>indexed</i></li>
          </ul>
        </div>
        <div>
          <strong><ShieldCheck aria-hidden />CONTROL</strong>
          <ul>
            <li><span>Monitoring</span><i>active</i></li>
            <li><span>Human approval</span><i>enabled</i></li>
            <li><span>Audit logs</span><i>enabled</i></li>
          </ul>
        </div>
      </div>
    </figure>
  );
}
