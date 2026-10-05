"use client";

import { useMemo, useState } from "react";
import { BRIEF_HANDOFF_KEY, type BriefFields } from "@/lib/tools-brief";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { ANCHORS, ROUTES, path, type Locale } from "@/lib/content";

type Brief = {
  problem: string;
  process: string;
  users: string;
  tools: string;
  data: string;
  control: string;
  outcome: string;
};

const EMPTY: Brief = { problem: "", process: "", users: "", tools: "", data: "", control: "", outcome: "" };

const content = {
  fr: {
    title: "Décrivez votre besoin avec vos mots",
    intro: "Le brief se construit dans votre navigateur. Rien n’est envoyé à Synode tant que vous ne choisissez pas de nous contacter.",
    fields: {
      problem: ["Problème rencontré", "Ex. Nous recevons trop de demandes à trier manuellement."],
      process: ["Processus concerné", "Ex. Traitement des demandes clients."],
      users: ["Personnes concernées", "Ex. Équipe commerciale et service client."],
      tools: ["Outils actuels", "Ex. Outlook, HubSpot, Excel et SharePoint."],
      data: ["Données ou documents disponibles", "Ex. Emails, fiches clients et procédures internes."],
      control: ["Décisions à garder sous contrôle humain", "Ex. Validation d’un devis et envoi au client."],
      outcome: ["Résultat attendu", "Ex. Réduire le tri manuel et répondre plus régulièrement."],
    } satisfies Record<keyof Brief, readonly [string, string]>,
    output: "Votre brief de projet",
    empty: "Commencez par décrire le problème et le processus concerné. Une synthèse exploitable apparaîtra ici.",
    labels: ["Problème", "Processus", "Utilisateurs", "Outils", "Données", "Contrôle humain", "Résultat attendu"],
    missing: "À préciser pendant l’échange",
    copy: "Copier le brief",
    copied: "Brief copié",
    contact: "Présenter ce besoin à Synode",
    note: "Ce brief prépare un premier échange. Il ne constitue ni une spécification technique, ni un devis.",
  },
  en: {
    title: "Describe your need in your own words",
    intro: "The brief is built in your browser. Nothing is sent to Synode unless you choose to contact us.",
    fields: {
      problem: ["Problem encountered", "e.g. We receive too many requests to sort manually."],
      process: ["Process concerned", "e.g. Handling customer requests."],
      users: ["People concerned", "e.g. Sales and customer service teams."],
      tools: ["Current tools", "e.g. Outlook, HubSpot, Excel and SharePoint."],
      data: ["Available data or documents", "e.g. Emails, customer records and internal procedures."],
      control: ["Decisions to keep under human control", "e.g. Approving a quote and sending it to the customer."],
      outcome: ["Expected outcome", "e.g. Reduce manual sorting and respond more consistently."],
    } satisfies Record<keyof Brief, readonly [string, string]>,
    output: "Your project brief",
    empty: "Start by describing the problem and the process concerned. A usable summary will appear here.",
    labels: ["Problem", "Process", "Users", "Tools", "Data", "Human control", "Expected outcome"],
    missing: "To clarify during the call",
    copy: "Copy the brief",
    copied: "Brief copied",
    contact: "Present this need to Synode",
    note: "This brief prepares an initial conversation. It is neither a technical specification nor a quote.",
  },
};

export function BriefBuilderPanel({
  locale,
  prefill,
}: {
  locale: Locale;
  prefill: Partial<BriefFields>;
}) {
  const c = content[locale];
  const [edited, setEdited] = useState<Partial<Brief>>({});
  const [copied, setCopied] = useState(false);

  /* Ce que le visiteur a tapé l'emporte TOUJOURS sur ce que les étapes
     précédentes ont rempli, champ par champ. Une fois une case touchée,
     revenir en arrière modifier l'étape 1 ou 2 ne l'écrase plus. C'est le
     seul comportement qui ne fasse jamais perdre de texte. */
  const brief: Brief = useMemo(() => ({ ...EMPTY, ...prefill, ...edited }), [prefill, edited]);
  const ready = brief.problem.trim().length > 0 && brief.process.trim().length > 0;
  const keys = Object.keys(brief) as (keyof Brief)[];

  const summary = useMemo(() => keys.map((key, index) => (
    `${c.labels[index]}\n${brief[key].trim() || c.missing}`
  )).join("\n\n"), [brief, c, keys]);

  const set = (key: keyof Brief, value: string) => setEdited((current) => ({ ...current, [key]: value }));
  /* Le brief voyage par `sessionStorage` jusqu'au formulaire de contact,
     qui le reprend dans son champ de message. Il n'est pas envoyé d'ici :
     l'API exige un nom et une adresse email, que ce panneau ne demande pas
     et n'a pas à redemander puisque le formulaire les collecte déjà, avec
     sa validation et ses messages d'erreur. */
  const handOff = () => {
    try {
      window.sessionStorage.setItem(BRIEF_HANDOFF_KEY, summary);
    } catch {
      /* Navigation privée ou stockage refusé : le lien mène quand même au
         formulaire, le visiteur y collera son brief s'il le souhaite. */
    }
  };

  const copy = async () => {
    if (!ready) return;
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="tool-panel">
      <div className="tool-params">
        <h3 className="tool-params-title">{c.title}</h3>
        <p className="tool-panel-intro">{c.intro}</p>
        {keys.map((key) => (
          <label className="tool-brief-field" key={key}>
            <span>{c.fields[key][0]}</span>
            <textarea value={brief[key]} placeholder={c.fields[key][1]} rows={key === "problem" || key === "process" ? 3 : 2} onChange={(event) => set(key, event.target.value)} />
          </label>
        ))}
      </div>

      <div className="tool-readout" aria-live="polite">
        <span className="tool-readout-label">{c.output}</span>
        {!ready ? (
          <div className="tool-readout-empty"><p>{c.empty}</p></div>
        ) : (
          <>
            <dl className="tool-brief-output">
              {keys.map((key, index) => (
                <div key={key}><dt>{c.labels[index]}</dt><dd>{brief[key].trim() || c.missing}</dd></div>
              ))}
            </dl>
            <div className="tool-brief-actions">
              <button type="button" className="btn btn--ghost" onClick={copy}>
                {copied ? <Check aria-hidden /> : <Copy aria-hidden />}{copied ? c.copied : c.copy}
              </button>
              <Link
                className="btn btn--primary"
                href={`${path(locale, ROUTES.contact)}#${ANCHORS.form}`}
                onClick={handOff}
              >
                {c.contact}<ArrowRight aria-hidden />
              </Link>
            </div>
            <p className="tool-readout-note">{c.note}</p>
          </>
        )}
      </div>
    </div>
  );
}
