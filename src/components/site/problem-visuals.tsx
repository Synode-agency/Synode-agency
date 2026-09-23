import {
  AlertCircle,
  Check,
  ImageIcon,
  Mail,
  RefreshCw,
  Table2,
  X,
} from "lucide-react";
import {
  BarChartIcon,
  FileIcon,
  PhoneLinearIcon,
} from "@/components/site/icons";

/**
 * The four illustrations above the Constat columns.
 *
 * One light walks all thirteen items of the first three, in order: the four
 * rows of column 01, the five tools of column 02, the four rows of column
 * 03, then round again. Each element carries its rank in that run as
 * `--pv-i`, which is what lets three separate drawings share one sequence
 * without a single nth-child rule.
 *
 * All decorative, all hidden from assistive technology: the column's title,
 * paragraph and figure already say everything they say. They are drawn from
 * plain elements rather than shipped as images, so they stay sharp at any
 * size and cost nothing to download.
 */

/** 01 — the same five things, redone by hand every week. */
function ManualTasks() {
  const tasks = [
    { Icon: FileIcon, name: "Factures", note: "Saisies une par une" },
    { Icon: BarChartIcon, name: "Rapports", note: "Copiés-collés" },
    { Icon: Table2, name: "Tableaux", note: "Mis à jour à la main" },
    { Icon: Mail, name: "Emails", note: "Rédigés un par un" },
  ];
  return (
    <div className="pv pv--manual">
      {tasks.map(({ Icon, name, note }, i) => (
        <span
          key={name}
          className="pv-row pv-flash"
          style={{ "--pv-i": i } as React.CSSProperties}
        >
          <span className="pv-row-icon">
            <Icon />
          </span>
          <span className="pv-row-body">
            <b className="pv-row-name">{name}</b>
            <i>{note}</i>
          </span>
          <span className="pv-row-repeat">
            <RefreshCw />
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * The five tools, as their own marks. Simplified on purpose: at 40px a
 * faithful trace would turn to mud, and these read instantly at that size.
 */
function NotionMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" fill="#fff" stroke="#111" strokeWidth="1.4" />
      <path d="M8.8 16.2V8.4l6.4 7.4V8.4" fill="none" stroke="#111" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OneDriveMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M8.1 19h9.4a3.3 3.3 0 0 0 .5-6.6 5.2 5.2 0 0 0-9.7-1.8A3.9 3.9 0 0 0 8.1 19z"
        fill="#0364B8"
      />
      <path
        d="M8.1 19h9.4a3.3 3.3 0 0 0 3-2.1H8.1a3.9 3.9 0 0 1-3.7-2.7A3.9 3.9 0 0 0 8.1 19z"
        fill="#0078D4"
      />
    </svg>
  );
}

function DriveMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      {/* The triangle split three ways from its centre, as the real mark is. */}
      <path d="M12 3 17 11.5 12 14.3 7 11.5z" fill="#FFBA00" />
      <path d="M7 11.5 12 14.3 12 20 2 20z" fill="#00AC47" />
      <path d="M17 11.5 22 20 12 20 12 14.3z" fill="#0066DA" />
      <path d="M2 20 7 11.5 12 14.3 12 20z" fill="#00AC47" />
    </svg>
  );
}

function ExcelMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="3" fill="#107C41" />
      <path
        d="M8.8 8.4 15.2 15.6M15.2 8.4 8.8 15.6"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GmailMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2.2" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
      <path d="M2.6 6.2 12 13.2l9.4-7" fill="none" stroke="#EA4335" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.6 6.2v3.1M21.4 6.2v3.1" stroke="#C5221F" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

/** 02 — tools that should be wired together, and are not. */
function ScatteredTools() {
  const tools = [NotionMark, OneDriveMark, DriveMark, ExcelMark, GmailMark];
  return (
    <div className="pv pv--tools">
      {/* The ring joins every tool to its neighbours, the spokes run to the
          centre. `non-scaling-stroke` keeps the dashes even, whatever the
          column's proportions do to the viewBox. */}
      <svg
        className="pv-wires"
        viewBox="0 0 100 100"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* The ring: each edge bows outward by a different amount, so the
            five curves never look stamped from the same template. */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M50 17 Q71.5 21.2 82.3 39.8 M82.3 39.8 Q82.8 60.4 70 76.7 M70 76.7 Q50 87.2 30 76.7 M30 76.7 Q16.7 60.5 17.7 39.8 M17.7 39.8 Q28.2 20.8 50 17"
        />
        {/* The spokes: each swings to one side rather than running straight
            to the middle, alternating direction around the circle. */}
        <path
          vectorEffect="non-scaling-stroke"
          d="M50 17 Q44 33.5 50 50 M82.3 39.8 Q68.3 51.6 50 50 M70 76.7 Q64.4 60.1 50 50 M30 76.7 Q34.8 59.5 50 50 M17.7 39.8 Q31.7 51.6 50 50"
        />
      </svg>

      {tools.map((Mark, i) => (
        <span
          key={i}
          className={`pv-tile pv-flash pv-tile--${i}`}
          style={{ "--pv-i": 4 + i } as React.CSSProperties}
        >
          <Mark />
        </span>
      ))}

      <span className="pv-cross">
        <X />
      </span>
    </div>
  );
}

/** 03 — a follow-up list nobody works through. */
function StalledFollowUp() {
  return (
    <div className="pv pv--followup">
      <span className="pv-row pv-flash pv-row--alert" style={{ "--pv-i": 9 } as React.CSSProperties}>
        <span className="pv-row-icon">
          <Mail />
        </span>
        <span className="pv-row-body">
          <b>Relancer le client X</b>
          <i>En retard de 5 jours</i>
        </span>
        <span className="pv-row-flag">
          <AlertCircle />
        </span>
      </span>

      <span className="pv-row pv-flash" style={{ "--pv-i": 10 } as React.CSSProperties}>
        <span className="pv-row-icon">
          <PhoneLinearIcon />
        </span>
        <span className="pv-row-body">
          <b>Suivi proposition</b>
          <i>Non planifié</i>
        </span>
        <span className="pv-row-dot" />
      </span>

      <span className="pv-row pv-flash" style={{ "--pv-i": 11 } as React.CSSProperties}>
        <span className="pv-row-icon pv-row-icon--done">
          <Check />
        </span>
        <span className="pv-row-body">
          <b>Devis à envoyer</b>
        </span>
      </span>

      <span className="pv-row pv-flash pv-row--faded" style={{ "--pv-i": 12 } as React.CSSProperties}>
        <span className="pv-row-dot pv-row-dot--lead" />
        <span className="pv-row-body">
          <b>Rappel RDV</b>
        </span>
      </span>
    </div>
  );
}

/** 04 — a site that has stopped keeping up. */
function AgingSite() {
  return (
    <div className="pv pv--site">
      <span className="pv-window">
        <span className="pv-window-bar">
          <i />
          <i />
          <i />
          <span className="pv-window-url" />
        </span>
        <span className="pv-window-body">
          <span className="pv-window-col">
            <span className="pv-window-pane">
              <ImageIcon />
            </span>
            <span className="pv-window-line pv-window-line--title" />
            <span className="pv-window-line" />
          </span>
          <span className="pv-window-pane pv-window-pane--load">
            <span className="pv-spinner" />
          </span>
        </span>
      </span>
    </div>
  );
}

const VISUALS = [ManualTasks, ScatteredTools, StalledFollowUp, AgingSite];

export function ProblemVisual({ index }: { index: number }) {
  const Visual = VISUALS[index % VISUALS.length];
  return (
    <div aria-hidden className="problem-visual">
      <Visual />
    </div>
  );
}
