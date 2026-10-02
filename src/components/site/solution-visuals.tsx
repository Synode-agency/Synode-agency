import Image from "next/image";
import { Database, Mail, FileText, CalendarDays, Headphones, ChartNoAxesColumnIncreasing, Check, ArrowRight, Bot, Workflow, Blocks, LayoutDashboard, Search, FolderOpen, ShieldCheck, GraduationCap, Users } from "lucide-react";
import type { Locale } from "@/lib/content";

/** Illustrative architecture, built with HTML labels and scalable SVG connectors. */
export function EcosystemDiagram({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const tools = [
    { icon: Database, title: "CRM", className: "eco-crm" },
    { icon: Mail, title: "Email", className: "eco-mail" },
    { icon: FileText, title: "Documents", className: "eco-docs" },
    { icon: CalendarDays, title: fr ? "Agenda" : "Calendar", className: "eco-calendar" },
    { icon: Headphones, title: "Support", className: "eco-support" },
  ];
  return <div className="ecosystem" role="img" aria-label={fr ? "Exemple d’architecture : CRM, emails, documents, agenda et support reliés à Synode pour automatiser les processus et centraliser les informations." : "Example architecture: CRM, email, documents, calendar and support connected through Synode to automate processes and centralise information."}>
    <div className="ecosystem-canvas" aria-hidden="true">
      <svg className="eco-wires" viewBox="0 0 600 460" fill="none">
        <path d="M110 108 C110 180 300 118 300 192 M300 108 V192 M490 108 C490 180 300 118 300 192 M74 252 C74 300 170 275 205 275 M526 252 C526 300 430 275 395 275 M300 278 V302 Q300 322 280 322 H184 Q164 322 164 352 M300 302 Q300 322 320 322 H416 Q436 322 436 352" />
        <circle cx="300" cy="144" r="3" /><circle cx="154" cy="276" r="3" /><circle cx="446" cy="276" r="3" /><circle cx="300" cy="303" r="3" />
      </svg>
      {tools.map(({ icon: Icon, title, className }) => <div className={`eco-node ${className}`} key={title}><div><span className="eco-icon"><Icon /></span><strong>{title}</strong></div><span className="eco-status"><i />{fr ? "Connecté" : "Connected"}</span></div>)}
      <div className="eco-hub"><Image src="/synode-mark.png" alt="" width={80} height={80} /><div><strong>Synode</strong><span>{fr ? "Votre solution IA" : "Your AI solution"}</span></div></div>
      <div className="eco-result eco-result--one"><ChartNoAxesColumnIncreasing /><div><strong>{fr ? "Processus automatisés" : "Automated processes"}</strong><span>{fr ? "Des opérations simplifiées" : "Simpler operations"}</span></div><Check /></div>
      <div className="eco-result eco-result--two"><FileText /><div><strong>{fr ? "Informations centralisées" : "Centralised information"}</strong><span>{fr ? "Vos outils, enfin reliés" : "Your tools, connected"}</span></div><Check /></div>
    </div>
  </div>;
}

export const brickIcons = [Bot, Workflow, Blocks, LayoutDashboard, ChartNoAxesColumnIncreasing, GraduationCap];

export function BrickVisual({ kind, locale }: { kind: number; locale: Locale }) {
  const fr = locale === "fr";
  return <div className={`brick-art brick-art--${kind}`} aria-hidden="true">
    {kind === 0 && <><div className="agent-orbit agent-orbit--one" /><div className="agent-orbit agent-orbit--two" /><div className="agent-orbit agent-orbit--three" /><div className="agent-center"><Bot /></div><span className="agent-token agent-token--a"><Search />{fr ? "Rechercher" : "Search"}</span><span className="agent-token agent-token--b"><FileText />{fr ? "Comprendre" : "Understand"}</span><span className="agent-token agent-token--c"><Check />{fr ? "Préparer" : "Prepare"}</span></>}
    {kind === 1 && <div className="automation-art"><span><Mail /></span><i /><span><Workflow /></span><i /><span><Check /></span></div>}
    {kind === 2 && <div className="integration-art"><span>CRM</span><span>API</span><span>ERP</span><span>Email</span><div><Blocks /></div></div>}
    {kind === 3 && <div className="dashboard-art"><div className="dashboard-art-nav"><i /><i /><i /></div><div className="dashboard-art-body"><div><span /><span /><span /></div><i /><i /><i /></div></div>}
    {kind === 5 && <div className="training-art"><div className="training-art-session"><GraduationCap /><span>{fr ? "Comprendre · Pratiquer · Adopter" : "Learn · Practise · Adopt"}</span></div><div className="training-art-team"><Users /><span><Check />{fr ? "À vous de jouer" : "Your turn to try"}</span></div></div>}
    {kind === 4 && <div className="data-art"><div className="data-art-bars">{[35,60,44,74,57,92,80].map((height,i) => <i key={i} style={{height:`${height}%`}} />)}</div><span>{fr ? "Vos données, une vue claire" : "Your data, a clear view"}</span></div>}
  </div>;
}

export function DeliveryPreview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <div className="delivery-preview" aria-hidden="true"><div className="delivery-sheet delivery-sheet--back" /><div className="delivery-sheet"><span className="delivery-sheet-kicker"><FolderOpen />{fr ? "VOTRE PROJET" : "YOUR PROJECT"}</span><Image src="/synode-mark.png" alt="" width={52} height={52} /><strong>{fr ? "Prêt à prendre\nle relais." : "Ready to\ntake over."}</strong><div className="delivery-sheet-lines"><i /><i /><i /></div><div className="delivery-sheet-tags"><span><Check />{fr ? "Testé" : "Tested"}</span><span><Check />{fr ? "Documenté" : "Documented"}</span></div></div><span className="delivery-seal"><ShieldCheck />{fr ? "Une transmission accompagnée" : "A supported handover"}</span></div>;
}

export function ProjectPreview({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <div className="project-preview" aria-hidden="true"><div className="project-preview-top"><Image src="/synode-mark.png" alt="" width={38} height={38} /><span>Synode</span><span className="project-preview-label">{fr ? "VOTRE PROCHAIN PROJET" : "YOUR NEXT PROJECT"}</span></div><div className="project-brief"><span>{fr ? "01 / LE POINT DE DÉPART" : "01 / THE STARTING POINT"}</span><strong>{fr ? "Et si cette tâche\ndevenait plus simple ?" : "What if this task\ncould be simpler?"}</strong><div><i /><i /></div></div><div className="project-preview-path"><span><Search />{fr ? "Votre besoin" : "Your need"}</span><ArrowRight /><span><Blocks />{fr ? "Notre conception" : "Our design"}</span></div><div className="project-preview-result"><Check /><div><strong>{fr ? "Une solution qui vous ressemble." : "A solution that fits your business."}</strong><span>{fr ? "Conçue ensemble, étape par étape." : "Built together, step by step."}</span></div></div></div>;
}
