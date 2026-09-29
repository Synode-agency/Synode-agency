import { Check, FileText, Mail, Search, Send, Sparkles, UserRound } from "lucide-react";
import type { Locale } from "@/lib/content";

/** Decorative miniatures: illustrative data, never customer results. */
export function UseCaseVisual({ kind, locale }: { kind: number; locale: Locale }) {
  const fr = locale === "fr";
  return (
    <div className={`case-visual case-visual--${kind}`} aria-hidden="true">
      {kind === 0 && <div className="mini-brief">
        <div className="mini-brief-person"><span className="mini-avatar"><UserRound /></span><div><strong>{fr ? "Votre prochain rendez-vous" : "Your next meeting"}</strong><span>{fr ? "Fiche de préparation" : "Meeting brief"}</span></div><span className="mini-spark"><Sparkles /></span></div>
        <div className="mini-brief-lines"><span /><span /><span /></div>
        <div className="mini-brief-tags"><span>{fr ? "Entreprise" : "Company"}</span><span>{fr ? "Besoins identifiés" : "Identified needs"}</span><span><Check />{fr ? "Sources" : "Sources"}</span></div>
      </div>}
      {kind === 1 && <div className="mini-inbox">
        {[[fr ? "Demande de devis" : "Quote request", fr ? "Commercial" : "Sales"], [fr ? "Question sur un dossier" : "Case enquiry", "Support"], [fr ? "Document reçu" : "Document received", fr ? "Administratif" : "Admin"]].map(([subject, label]) => <div key={subject}><Mail /><span>{subject}</span><span className="mini-routing">{label}</span></div>)}
      </div>}
      {kind === 2 && <div className="mini-conversation">
        <div className="mini-question">{fr ? "Comment suivre ma demande ?" : "How can I track my request?"}</div>
        <div className="mini-answer"><Sparkles /><div><span>{fr ? "Brouillon préparé à partir de votre FAQ" : "Draft prepared from your FAQ"}</span><i /><i /></div></div>
        <span className="mini-review"><Check />{fr ? "À valider avant envoi" : "Review before sending"}<Send /></span>
      </div>}
      {kind === 3 && <div className="mini-knowledge">
        <div className="mini-search"><Search /><span>{fr ? "Comment fonctionne notre procédure ?" : "How does our process work?"}</span></div>
        <div className="mini-source"><FileText /><div><strong>{fr ? "Guide interne" : "Internal guide"}</strong><span>{fr ? "Source retrouvée · Section 02" : "Source found · Section 02"}</span></div><span className="mini-reference">[1]</span></div>
        <div className="mini-brief-lines"><span /><span /></div>
      </div>}
    </div>
  );
}
