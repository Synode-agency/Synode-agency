import { ArrowRight, Check, Lock, Search, ShieldCheck, X } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * LES HUIT USAGES D'UNE PAGE SERVICE, EN CARTES.
 *
 * Une carte par usage : un mini-aperçu illustré en haut, le titre, la
 * description et la forme correspondante en bas. Les textes ne sont PAS
 * écrits ici : ils arrivent de `service-pages.ts` par `items`, donc une
 * correction de copie se fait à un seul endroit.
 *
 * ── Un jeu d'aperçus par service ────────────────────────────────────────
 * `set` choisit la série de huit dessins, et il n'y a pas d'aperçu par
 * défaut : un service sans série n'affiche rien plutôt qu'un dessin
 * emprunté à un autre. Les six séries se composent du MÊME vocabulaire de
 * pièces — lignes grises, pastilles, étiquettes, mini-cadres, barres — pour
 * que les six pages restent un seul système et pas six styles.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Ce que ces aperçus ne sont pas ──────────────────────────────────────
 * Ce ne sont pas des captures. « Marie Lambert », « Lumen SA », « Julie »,
 * les horaires, les dates et les noms de fichiers sont illustratifs et ne
 * doivent jamais être repris ailleurs comme des données réelles. Ce sont
 * des dessins faits de blocs et de filets, pas des écrans de produit.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. Aucun composant client ici, aucune horloge : la seule animation est
 *    le survol, et elle est en CSS. Huit aperçus animés dans une même
 *    section se disputeraient l'attention du titre.
 * 2. Les libellés des aperçus ne passent pas à la ligne (`white-space`),
 *    et les aperçus ont une hauteur MINIMALE, jamais fixe : une traduction
 *    plus longue fait grandir la boîte au lieu d'être coupée.
 * ────────────────────────────────────────────────────────────────────────
 */

const COPY = {
  fr: {
    ask: "Quels sont vos horaires ?",
    reply: "Du lundi au vendredi, 8h–18h.",
    source: "source · FAQ.pdf",
    query: "délai de livraison",
    tags: ["Objet : SAV", "Urgence : haute", "→ Julie, support"],
    crm: [["Contact", "Marie Lambert"], ["Société", "Lumen SA"], ["Prochaine étape", "Rappel le 14/10"]],
    checks: ["Tarifs", "Conditions", "Planning"],
    toReview: "à relire",
    inbox: ["Décision", "Résumé", "Info", "Info"],
    summary: "Synthèse",
  },
  en: {
    ask: "What are your opening hours?",
    reply: "Monday to Friday, 8am–6pm.",
    source: "source · FAQ.pdf",
    query: "delivery time",
    tags: ["Subject: support", "Urgency: high", "→ Julie, support"],
    crm: [["Contact", "Marie Lambert"], ["Company", "Lumen SA"], ["Next step", "Call back on 14/10"]],
    checks: ["Pricing", "Terms", "Schedule"],
    toReview: "to review",
    inbox: ["Decision", "Summary", "Info", "Info"],
    summary: "Summary",
  },
} as const;

/* Le type se prend sur l'union des deux langues : le prendre sur le seul
   français en ferait des littéraux, et l'anglais ne rentrerait plus. */
type Copy = (typeof COPY)["fr"] | (typeof COPY)["en"];

/** Un aperçu par usage, dans l'ordre des `items`. */
function Preview({ set, kind, c, sc }: { set: string; kind: number; c: Copy; sc: SetCopy }) {
  if (set !== "assistants-agents-ia") return <SetPreview set={set} kind={kind} c={sc} />;
  switch (kind) {
    /* ---- 1 · Répondre aux demandes courantes ---- */
    case 0:
      return (
        <div className="auc-art auc-chat">
          <span className="auc-bubble auc-bubble--ask">{c.ask}</span>
          <span className="auc-bubble auc-bubble--reply">{c.reply}</span>
          <span className="auc-source">{c.source}</span>
        </div>
      );

    /* ---- 2 · Rechercher dans vos documents ---- */
    case 1:
      return (
        <div className="auc-art auc-search">
          <span className="auc-field">
            <Search aria-hidden />
            {c.query}
          </span>
          <span className="auc-line" style={{ width: "86%" }} />
          <span className="auc-hit" />
          <span className="auc-line" style={{ width: "92%" }} />
          <span className="auc-line" style={{ width: "60%" }} />
        </div>
      );

    /* ---- 3 · Qualifier une demande entrante ---- */
    case 2:
      return (
        <div className="auc-art auc-triage">
          <span className="auc-from">
            <i className="auc-avatar" />
            <i className="auc-line" style={{ width: "62%" }} />
          </span>
          <span className="auc-tags">
            <em className="auc-tag auc-tag--blue">{c.tags[0]}</em>
            <em className="auc-tag auc-tag--warm">{c.tags[1]}</em>
            <em className="auc-tag auc-tag--plain">{c.tags[2]}</em>
          </span>
        </div>
      );

    /* ---- 4 · Mettre à jour votre CRM ---- */
    case 3:
      return (
        <div className="auc-art auc-crm">
          {c.crm.map(([label, value], i) => (
            <span key={label} className={i === c.crm.length - 1 ? "auc-row auc-row--edit" : "auc-row"}>
              <em>{label}</em>
              <b>
                {value}
                {i === c.crm.length - 1 && <i className="auc-caret" aria-hidden />}
              </b>
            </span>
          ))}
        </div>
      );

    /* ---- 5 · Préparer un devis ou un dossier ---- */
    case 4:
      return (
        <div className="auc-art auc-doc">
          <span className="auc-sheet" aria-hidden>
            <i className="auc-sheet-title" />
            <i className="auc-line" style={{ width: "86%" }} />
            <i className="auc-line" style={{ width: "72%" }} />
            <i className="auc-line" style={{ width: "80%" }} />
          </span>
          <span className="auc-checks">
            {c.checks.map(item => (
              <em key={item}><Check aria-hidden />{item}</em>
            ))}
            <b className="auc-pill">{c.toReview}</b>
          </span>
        </div>
      );

    /* ---- 6 · Analyser les emails reçus ---- */
    case 5:
      return (
        <div className="auc-art auc-inbox">
          {c.inbox.map((tag, i) => (
            <span key={i} className="auc-mail">
              <i className="auc-line" style={{ width: `${[72, 64, 80, 58][i]}%` }} />
              <em className={`auc-tag ${["auc-tag--warm", "auc-tag--blue", "auc-tag--grey", "auc-tag--grey"][i]}`}>{tag}</em>
            </span>
          ))}
        </div>
      );

    /* ---- 7 · Produire un compte rendu ---- */
    case 6:
      return (
        <div className="auc-art auc-notes">
          <span className="auc-scraps" aria-hidden>
            {[86, 70, 92, 64, 78].map((w, i) => (
              <i key={i} style={{ width: `${w}%`, transform: `rotate(${i % 2 ? 1 : -1}deg)` }} />
            ))}
          </span>
          <ArrowRight className="auc-arrow" aria-hidden />
          <span className="auc-synth">
            <em>{c.summary}</em>
            <i /><i /><i />
          </span>
        </div>
      );

    /* ---- 8 · Enchaîner plusieurs actions ---- */
    default:
      return (
        <div className="auc-art auc-chain" aria-hidden>
          <span className="auc-step"><Check /></span>
          <i className="auc-link" />
          <span className="auc-step"><Check /></span>
          <i className="auc-link" />
          <span className="auc-step"><Check /></span>
          <i className="auc-link auc-link--dashed" />
          <span className="auc-gate"><ShieldCheck /></span>
        </div>
      );
  }
}


/* ---- Les libellés des cinq autres séries. Mêmes règles que ci-dessus :
   ce sont des éléments de dessin, illustratifs, jamais des données réelles. ---- */
const SETS = {
  fr: {
    inbox: ["Devis", "SAV", "Info"],
    check: "à vérifier",
    approved: "accord",
    generated: "généré",
    due: "J+3",
    notified: "notifié",
    nav: ["Dossiers", "Suivi", "Clients"],
    status: ["planifié", "en cours", "terminé"],
    sides: ["Client", "Interne"],
    ai: "IA",
    activity: "activité",
    boxes: ["Site", "CRM", "ERP", "Portail", "API"],
    confirmed: "confirmée",
    log: ["ok", "ok", "repris"],
    periods: ["N-1", "N"],
    gap: "écart",
    estimate: "estimation",
    agreed: "défini",
    query: "stock produit",
    can: "peut aider",
    cannot: "ne sait pas",
    data: ["interne", "partageable"],
    rules: "règles",
    ready: "pris en main",
    champion: "référent",
  },
  en: {
    inbox: ["Quote", "Support", "Info"],
    check: "to check",
    approved: "approved",
    generated: "generated",
    due: "D+3",
    notified: "notified",
    nav: ["Files", "Tracking", "Clients"],
    status: ["planned", "in progress", "done"],
    sides: ["Client", "Internal"],
    ai: "AI",
    activity: "activity",
    boxes: ["Site", "CRM", "ERP", "Portal", "API"],
    confirmed: "confirmed",
    log: ["ok", "ok", "retried"],
    periods: ["Y-1", "Y"],
    gap: "gap",
    estimate: "estimate",
    agreed: "agreed",
    query: "product stock",
    can: "can help",
    cannot: "cannot",
    data: ["internal", "shareable"],
    rules: "rules",
    ready: "ready",
    champion: "champion",
  },
} as const;

type SetCopy = (typeof SETS)["fr"] | (typeof SETS)["en"];

/** Une rangée de barres. `warm` et `soft` marquent l'écart et l'estimation. */
function Bars({ h, warm, soft }: { h: number[]; warm?: number; soft?: number }) {
  return (
    <span className="auc-bars" aria-hidden>
      {h.map((v, i) => (
        <i key={i} style={{ height: `${v}%` }} className={i === warm ? "is-warm" : soft !== undefined && i >= soft ? "is-soft" : undefined} />
      ))}
    </span>
  );
}
/** Un petit cadre d'application : barre de fenêtre, puis des lignes. */
function Frame({ nav, badge }: { nav?: readonly string[]; badge?: string }) {
  return (
    <span className="auc-app" aria-hidden>
      <i className="auc-app-bar"><b /><b /><b /></i>
      <span className="auc-app-body">
        {nav && <span className="auc-app-nav">{nav.map(n => <em key={n}>{n}</em>)}</span>}
        <span className="auc-app-main">
          <i style={{ width: "88%" }} />
          <i style={{ width: "70%" }} />
          <i style={{ width: "80%" }} />
          {badge && <b className="auc-app-badge">{badge}</b>}
        </span>
      </span>
    </span>
  );
}
/** Une boîte nommée, pour les schémas de connexion. */
function Box({ label }: { label: string }) {
  return <span className="auc-box">{label}</span>;
}

function SetPreview({ set, kind, c }: { set: string; kind: number; c: SetCopy }) {
  /* ---------- AUTOMATISATIONS ---------- */
  if (set === "automatisations-intelligentes") {
    switch (kind) {
      case 0: return (
        <div className="auc-art auc-inbox">
          {c.inbox.map((tag, i) => (
            <span key={tag} className="auc-mail">
              <i className="auc-line" style={{ width: `${[72, 64, 80][i]}%` }} />
              <em className={`auc-tag ${["auc-tag--blue", "auc-tag--warm", "auc-tag--grey"][i]}`}>{tag}</em>
            </span>
          ))}
        </div>
      );
      case 1: return (
        <div className="auc-art auc-doc">
          <span className="auc-sheet" aria-hidden>
            <i className="auc-sheet-title" />
            <i className="auc-line" style={{ width: "86%" }} />
            <i className="auc-line" style={{ width: "72%" }} />
          </span>
          <span className="auc-list">
            <span className="auc-row"><em>{c.boxes[2]}</em><i className="auc-line" style={{ width: "42px" }} /></span>
            <span className="auc-row auc-row--edit"><em>{c.generated}</em><b><Check /></b></span>
          </span>
        </div>
      );
      case 2: return (
        <div className="auc-art auc-list auc-list--mid">
          <span className="auc-row"><i className="auc-line" style={{ width: "58%" }} /><b className="auc-ok"><Check /></b></span>
          <span className="auc-row"><i className="auc-line" style={{ width: "70%" }} /><b className="auc-ok"><Check /></b></span>
          <span className="auc-row"><i className="auc-line" style={{ width: "46%" }} /><em className="auc-tag auc-tag--warm">{c.check}</em></span>
        </div>
      );
      case 3: return (
        <div className="auc-art auc-chain">
          <i className="auc-avatar" />
          <i className="auc-link" />
          <span className="auc-pill">{c.approved}</span>
          <i className="auc-link" />
          <span className="auc-step"><Check /></span>
        </div>
      );
      case 4: return (
        <div className="auc-art auc-doc">
          <span className="auc-sheet" aria-hidden>
            <i className="auc-sheet-title" />
            <i className="auc-line" style={{ width: "88%" }} />
            <i className="auc-line" style={{ width: "66%" }} />
            <i className="auc-line" style={{ width: "78%" }} />
          </span>
          <span className="auc-checks"><b className="auc-pill">{c.generated}</b></span>
        </div>
      );
      case 5: return (
        <div className="auc-art auc-chain">
          <span className="auc-step auc-step--soft" />
          <i className="auc-link auc-link--dashed" />
          <span className="auc-pill">{c.due}</span>
          <i className="auc-link auc-link--dashed" />
          <span className="auc-step"><Check /></span>
        </div>
      );
      case 6: return <div className="auc-art auc-mid"><Bars h={[38, 62, 48, 76, 58, 90]} /></div>;
      default: return (
        <div className="auc-art auc-list auc-list--mid">
          <span className="auc-row"><span className="auc-who"><i className="auc-avatar" /><i className="auc-line" style={{ width: "46px" }} /></span><em className="auc-tag auc-tag--blue">{c.notified}</em></span>
          <span className="auc-row"><span className="auc-who"><i className="auc-avatar" /><i className="auc-line" style={{ width: "38px" }} /></span></span>
        </div>
      );
    }
  }

  /* ---------- LOGICIELS & APPLICATIONS ---------- */
  if (set === "logiciels-applications-ia") {
    switch (kind) {
      case 0: return <div className="auc-art"><Frame nav={c.nav} /></div>;
      case 1: return (
        <div className="auc-art auc-list auc-list--mid">
          {c.status.map((st, i) => (
            <span key={st} className="auc-row">
              <i className="auc-line" style={{ width: `${[60, 72, 52][i]}%` }} />
              <em className={`auc-tag ${["auc-tag--grey", "auc-tag--blue", "auc-tag--plain"][i]}`}>{st}</em>
            </span>
          ))}
        </div>
      );
      case 2: return (
        <div className="auc-art auc-pair">
          <Box label={c.sides[0]} />
          <span className="auc-gate"><Lock /></span>
          <Box label={c.sides[1]} />
        </div>
      );
      case 3: return (
        <div className="auc-art auc-pair">
          <span className="auc-grid" aria-hidden>{Array.from({ length: 9 }).map((_, i) => <i key={i} />)}</span>
          <ArrowRight className="auc-arrow" aria-hidden />
          <Frame />
        </div>
      );
      case 4: return (
        <div className="auc-art auc-mid">
          <span className="auc-phone" aria-hidden>
            <i className="auc-line" style={{ width: "70%" }} />
            <i className="auc-field-line" />
            <i className="auc-field-line" />
            <b />
          </span>
        </div>
      );
      case 5: return <div className="auc-art auc-mid auc-mid--col"><Bars h={[42, 66, 52, 80, 62, 92]} /><span className="auc-note">{c.activity}</span></div>;
      case 6: return (
        <div className="auc-art auc-notes">
          <span className="auc-scraps" aria-hidden>{[86, 70, 92, 64].map((w, i) => <i key={i} style={{ width: `${w}%`, transform: `rotate(${i % 2 ? 1 : -1}deg)` }} />)}</span>
          <ArrowRight className="auc-arrow" aria-hidden />
          <span className="auc-synth"><em>{c.generated}</em><i /><i /></span>
        </div>
      );
      default: return <div className="auc-art"><Frame nav={c.nav} badge={c.ai} /></div>;
    }
  }

  /* ---------- INTÉGRATIONS ---------- */
  if (set === "integrations-systemes-connectes") {
    switch (kind) {
      case 0: return <div className="auc-art auc-pair"><Box label={c.boxes[0]} /><ArrowRight className="auc-arrow" aria-hidden /><Box label={c.boxes[1]} /></div>;
      case 1: return (
        <div className="auc-art auc-pair">
          <span className="auc-card-mini"><i className="auc-avatar" /><i className="auc-line" style={{ width: "70%" }} /></span>
          <span className="auc-sync" aria-hidden><ArrowRight /><ArrowRight className="is-back" /></span>
          <span className="auc-card-mini"><i className="auc-avatar" /><i className="auc-line" style={{ width: "70%" }} /></span>
        </div>
      );
      case 2: return (
        <div className="auc-art auc-pair">
          <Box label={c.boxes[2]} />
          <span className="auc-pill">{c.confirmed}</span>
          <Box label={c.boxes[3]} />
        </div>
      );
      case 3: return (
        <div className="auc-art auc-pair">
          <span className="auc-stack" aria-hidden><i /><i /><i /></span>
          <ArrowRight className="auc-arrow" aria-hidden />
          <Bars h={[44, 70, 56, 86]} />
        </div>
      );
      case 4: return (
        <div className="auc-art auc-pair">
          <Box label={c.boxes[1]} />
          <i className="auc-link auc-link--dashed" />
          <Box label={c.boxes[4]} />
        </div>
      );
      case 5: return (
        <div className="auc-art auc-map">
          {[0, 1, 2].map(i => (
            <span key={i} className="auc-map-row">
              <i className="auc-line" style={{ width: "100%" }} />
              <b />
              <i className="auc-line" style={{ width: "100%" }} />
            </span>
          ))}
        </div>
      );
      case 6: return (
        <div className="auc-art auc-list auc-list--mid">
          <span className="auc-row auc-row--off"><i className="auc-line" style={{ width: "62%" }} /><b className="auc-no"><X /></b></span>
          <span className="auc-row"><i className="auc-line" style={{ width: "62%" }} /><b className="auc-ok"><Check /></b></span>
        </div>
      );
      default: return (
        <div className="auc-art auc-list auc-list--mid">
          {c.log.map((st, i) => (
            <span key={i} className="auc-row">
              <i className="auc-line" style={{ width: `${[70, 58, 64][i]}%` }} />
              <em className={`auc-tag ${i === 2 ? "auc-tag--warm" : "auc-tag--grey"}`}>{st}</em>
            </span>
          ))}
        </div>
      );
    }
  }

  /* ---------- DATA & INTELLIGENCE ---------- */
  if (set === "data-intelligence") {
    switch (kind) {
      case 0: return (
        <div className="auc-art auc-pair">
          <span className="auc-stack" aria-hidden><i /><i /><i /><i /></span>
          <ArrowRight className="auc-arrow" aria-hidden />
          <Box label={c.boxes[1]} />
        </div>
      );
      case 1: return <div className="auc-art auc-mid"><Bars h={[40, 62, 50, 78, 60, 88]} /></div>;
      case 2: return (
        <div className="auc-art auc-pair">
          <span className="auc-group"><Bars h={[46, 68, 54]} /><em>{c.periods[0]}</em></span>
          <span className="auc-group"><Bars h={[58, 80, 70]} /><em>{c.periods[1]}</em></span>
        </div>
      );
      case 3: return <div className="auc-art auc-mid auc-mid--col"><Bars h={[48, 60, 92, 56, 52]} warm={2} /><span className="auc-tag auc-tag--warm">{c.gap}</span></div>;
      case 4: return (
        <div className="auc-art auc-list auc-list--mid">
          {[1, 2, 3].map((n, i) => (
            <span key={n} className="auc-row">
              <span className="auc-who"><b className="auc-rank">{n}</b><i className="auc-line" style={{ width: `${[64, 56, 48][i]}px` }} /></span>
            </span>
          ))}
        </div>
      );
      case 5: return <div className="auc-art auc-mid auc-mid--col"><Bars h={[44, 58, 52, 70, 66, 78]} soft={4} /><span className="auc-tag auc-tag--blue">{c.estimate}</span></div>;
      case 6: return (
        <div className="auc-art auc-search">
          <span className="auc-field"><Search aria-hidden />{c.query}</span>
          <span className="auc-line" style={{ width: "86%" }} />
          <span className="auc-hit" />
          <span className="auc-line" style={{ width: "60%" }} />
        </div>
      );
      default: return (
        <div className="auc-art auc-mid">
          <span className="auc-card-mini auc-card-mini--wide">
            <i className="auc-sheet-title" />
            <span className="auc-row"><em>{c.agreed}</em><b className="auc-ok"><Check /></b></span>
          </span>
        </div>
      );
    }
  }

  /* ---------- FORMATION & ADOPTION ---------- */
  if (set === "formation-adoption-ia") {
    switch (kind) {
      case 0: return (
        <div className="auc-art auc-list auc-list--mid">
          <span className="auc-row"><em className="auc-tag auc-tag--blue">{c.can}</em><b className="auc-ok"><Check /></b></span>
          <span className="auc-row"><em className="auc-tag auc-tag--grey">{c.cannot}</em><b className="auc-no"><X /></b></span>
        </div>
      );
      case 1: return (
        <div className="auc-art auc-list auc-list--mid">
          <span className="auc-row"><i className="auc-line" style={{ width: "58%" }} /><b className="auc-ok"><Check /></b></span>
          <span className="auc-row auc-row--off"><i className="auc-line" style={{ width: "70%" }} /></span>
          <span className="auc-row auc-row--off"><i className="auc-line" style={{ width: "48%" }} /></span>
        </div>
      );
      case 2: return (
        <div className="auc-art auc-search">
          <span className="auc-field"><Search aria-hidden />{c.query}</span>
          <span className="auc-line" style={{ width: "88%" }} />
          <span className="auc-line" style={{ width: "72%" }} />
        </div>
      );
      case 3: return (
        <div className="auc-art auc-search">
          <span className="auc-line" style={{ width: "86%" }} />
          <span className="auc-hit" />
          <span className="auc-line" style={{ width: "64%" }} />
          <span className="auc-tag auc-tag--warm">{c.check}</span>
        </div>
      );
      case 4: return (
        <div className="auc-art auc-pair">
          <span className="auc-gate"><Lock /></span>
          <span className="auc-checks">
            <b className="auc-pill">{c.data[1]}</b>
            <em className="auc-tag auc-tag--grey">{c.data[0]}</em>
          </span>
        </div>
      );
      case 5: return (
        <div className="auc-art auc-doc">
          <span className="auc-sheet" aria-hidden>
            <i className="auc-sheet-title" />
            <i className="auc-line" style={{ width: "84%" }} />
            <i className="auc-line" style={{ width: "70%" }} />
            <i className="auc-line" style={{ width: "78%" }} />
          </span>
          <span className="auc-checks"><b className="auc-pill">{c.rules}</b></span>
        </div>
      );
      case 6: return <div className="auc-art"><Frame badge={c.ready} /></div>;
      default: return (
        <div className="auc-art auc-mid">
          <span className="auc-team" aria-hidden>
            <i className="auc-avatar auc-avatar--on" />
            <i className="auc-avatar" />
            <i className="auc-avatar" />
            <i className="auc-avatar" />
          </span>
          <span className="auc-tag auc-tag--blue">{c.champion}</span>
        </div>
      );
    }
  }

  return null;
}

export function UseCards({ items, set, locale }: { items: readonly { title: string; text: string; form?: string }[]; set: string; locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];
  const sc = SETS[locale === "fr" ? "fr" : "en"];
  return (
    <div className="auc">
      {items.map((item, i) => (
        <article className="auc-card" key={item.title}>
          <Preview set={set} kind={i} c={c} sc={sc} />
          <div className="auc-copy">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {/* La forme d'agent correspondante. C'est elle qui a permis de
                supprimer la section « plusieurs formes possibles » : les deux
                disaient la même chose à deux endroits de la page. */}
            {item.form && <span className="auc-form">{item.form}</span>}
          </div>
        </article>
      ))}
    </div>
  );
}
