import { ArrowRight, Check, Search, ShieldCheck } from "lucide-react";
import type { Locale } from "@/lib/content";

/**
 * LES HUIT USAGES DE LA PAGE « ASSISTANTS & AGENTS IA », EN CARTES.
 *
 * Une carte par usage : un mini-aperçu illustré en haut, le titre et la
 * description en dessous. Les titres et les descriptions ne sont PAS écrits
 * ici : ils arrivent de `service-pages.ts` par `items`, donc une correction
 * de copie se fait à un seul endroit.
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
function Preview({ kind, c }: { kind: number; c: Copy }) {
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

export function AgentUseCards({ items, locale }: { items: readonly { title: string; text: string; form?: string }[]; locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];
  return (
    <div className="auc">
      {items.map((item, i) => (
        <article className="auc-card" key={item.title}>
          <Preview kind={i} c={c} />
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
