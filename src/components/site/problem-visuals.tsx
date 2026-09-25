import { AlertCircle, Check } from "lucide-react";

/**
 * Les quatre illustrations des cartes du Constat.
 *
 * Volontairement muettes : des barres grises plutôt que des libellés. À la
 * taille où elles s'affichent, un texte réel ne se lirait pas, et un texte
 * qu'on ne lit pas se regarde comme du bruit. Réduites à leur forme, elles
 * disent la même chose d'un coup d'œil — une liste, des outils éparpillés,
 * un suivi en souffrance, un site qui a vieilli.
 *
 * Une seule lumière parcourt les neuf éléments des trois premières, dans
 * l'ordre : les trois lignes de la première, les trois outils de la
 * deuxième, les trois lignes de la troisième, puis elle recommence. Chaque
 * élément porte son rang dans `--pv-i`, ce qui permet à trois dessins
 * séparés de partager une seule séquence sans une seule règle `nth-child`.
 *
 * Tout est décoratif et masqué aux technologies d'assistance : le titre et
 * le texte de la carte disent déjà tout.
 */

/** Une ligne de liste : un repère, puis deux barres. */
function Row({
  rank,
  lead,
}: {
  rank: number;
  lead: React.ReactNode;
}) {
  return (
    <span
      className="pv-row pv-flash"
      style={{ "--pv-i": rank } as React.CSSProperties}
    >
      {lead}
      <span className="pv-row-bars">
        <i />
        <i />
      </span>
    </span>
  );
}

/** 01 — les mêmes gestes, refaits à la main chaque semaine. */
function ManualTasks() {
  return (
    <div className="pv pv--card">
      {[0, 1, 2].map((i) => (
        <Row key={i} rank={i} lead={<span className="pv-dot" />} />
      ))}
    </div>
  );
}

/* Les trois outils, réduits à leur marque. Simplifiés à dessein : à cette
   taille un tracé fidèle tournerait à la bouillie. */
function GmailMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2.2" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <path d="M2.6 6.2 12 13.2l9.4-7" fill="none" stroke="#EA4335" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.6 6.2v3.1M21.4 6.2v3.1" stroke="#C5221F" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function NotionMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#fff" stroke="#111" strokeWidth="1.4" />
      <path d="M8.8 16.2V8.4l6.4 7.4V8.4" fill="none" stroke="#111" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DriveMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      {/* Le triangle coupé en trois depuis son centre, comme la vraie marque. */}
      <path d="M12 3 17 11.5 12 14.3 7 11.5z" fill="#FFBA00" />
      <path d="M7 11.5 12 14.3 12 20 2 20z" fill="#00AC47" />
      <path d="M17 11.5 22 20 12 20 12 14.3z" fill="#0066DA" />
      <path d="M2 20 7 11.5 12 14.3 12 20z" fill="#00AC47" />
    </svg>
  );
}

/** 02 — des outils qui devraient être reliés, et ne le sont pas. */
function ScatteredTools() {
  const tools = [GmailMark, NotionMark, DriveMark];
  return (
    <div className="pv pv--tools">
      {/* Une scène carrée de taille fixe. Sans elle, le triangle de logos est
          placé en pourcentages d'une boîte dont la largeur change avec la
          carte : il s'aplatissait pendant que le cercle, lui, gardait son
          diamètre en rem, et les deux ne coïncidaient plus. */}
      <span className="pv-stage">
        {/* Le cercle pointillé : la liaison qui devrait exister. */}
        <span aria-hidden className="pv-orbit" />

        {tools.map((Mark, i) => (
          <span
            key={i}
            className={`pv-tile pv-flash pv-tile--${i}`}
            style={{ "--pv-i": 3 + i } as React.CSSProperties}
          >
            <Mark />
          </span>
        ))}
      </span>
    </div>
  );
}

/** 03 — une liste de suivi que personne ne déroule. */
function StalledFollowUp() {
  return (
    <div className="pv pv--card">
      <Row
        rank={6}
        lead={
          <span className="pv-mark pv-mark--alert">
            <AlertCircle />
          </span>
        }
      />
      <Row
        rank={7}
        lead={
          <span className="pv-mark pv-mark--done">
            <Check />
          </span>
        }
      />
      <Row rank={8} lead={<span className="pv-mark pv-mark--idle" />} />
    </div>
  );
}

/** 04 — des demandes entrantes que personne n'a encore ouvertes. */
function WaitingRequests() {
  return (
    <div className="pv pv--inbox">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="pv-bubble pv-flash"
          style={{ "--pv-i": 9 + i } as React.CSSProperties}
        >
          <i />
          <i />
        </span>
      ))}
      {/* Le compteur qui ne redescend pas. */}
      <span className="pv-badge">3</span>
    </div>
  );
}

const VISUALS = [ManualTasks, ScatteredTools, StalledFollowUp, WaitingRequests];

export function ProblemVisual({ index }: { index: number }) {
  const Visual = VISUALS[index % VISUALS.length];
  return (
    <div aria-hidden className="problem-visual">
      <Visual />
    </div>
  );
}
