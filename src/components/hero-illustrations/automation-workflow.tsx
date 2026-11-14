"use client";

import type { Locale } from "@/lib/content";
import { SceneFrame } from "./scene-frame";
import styles from "./hero-illustrations.module.css";
import { ease, phase, setShown, setText, useSceneClock } from "./use-scene-clock";

/**
 * LE HERO DE LA PAGE AUTOMATISATIONS : le parcours d'une demande de devis.
 *
 * Demande reçue, analyse IA, devis préparé puis relu, relance automatique
 * à J+3, devis signé. Un processus qu'un ERP ou un outil comptable ne
 * couvre pas, choisi le 14/11/2026 à la place de l'ancien exemple (une
 * facture fournisseur) : depuis le 1er janvier 2026, les factures entre
 * entreprises belges arrivent déjà structurées par Peppol, et l'exemple
 * laissait croire que l'automatisation se limitait à la comptabilité.
 *
 * « Verhaegen SRL » et le contenu de la demande sont illustratifs.
 */

const PATHS = ["a-link-1", "a-link-2", "a-link-follow", "a-link-signed"];

function WorkflowNode({ x, y, title, note, role, tone = "blue" }: { x: number; y: number; title: string; note: string; role: string; tone?: "blue" | "green" | "orange" }) {
  const color = tone === "green" ? "#34D399" : tone === "orange" ? "#F5B454" : "#4E8FF0";
  const bg = tone === "green" ? "#123A2A" : tone === "orange" ? "#3A2E17" : "#16335A";
  return <g>
    <rect data-role={role} className={styles.softTransition} x={x} y={y} width={x < 200 ? 180 : 172} height="46" rx="8" fill="#13223A" stroke="#1E3352" />
    <rect x={x + 9} y={y + 11} width="24" height="24" rx="6" fill={bg} stroke={color} strokeOpacity=".55" />
    <circle cx={x + 21} cy={y + 23} r="3.5" fill="none" stroke={color} strokeWidth="1.5" />
    <text className={styles.label} x={x + 41} y={y + 20}>{title}</text>
    <text className={styles.micro} data-role={role === "node-request" ? "request-no" : undefined} x={x + 41} y={y + 34}>{note}</text>
    <circle cx={x + (x < 200 ? 163 : 155)} cy={y + 23} r="7" fill={bg} stroke={color} strokeOpacity=".65" />
    <path d={`M${x + (x < 200 ? 160 : 152)} ${y + 23}l2 2 4-5`} fill="none" stroke={color} strokeWidth="1.4" />
  </g>;
}

export function AutomationWorkflow({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const ref = useSceneClock(6400, 5.9, (scene, time, cycle) => {
    setText(scene, "execution", `${fr ? "● actif" : "● active"} · ${cycle + 18} ${fr ? "exécutions" : "runs"}`);
    setText(scene, "request-no", fr ? `formulaire · n° ${42 + cycle}` : `web form · no. ${42 + cycle}`);
    /* Chaque valeur remplace ses tirets d'attente : laissés en dessous, ils
       la barraient. */
    [["client", 1.5], ["need", 1.85], ["deadline", 2.2]].forEach(([role, at]) => {
      setShown(scene, String(role), time >= Number(at));
      setShown(scene, `${role}-wait`, time < Number(at));
    });

    /* Le jeton descend la colonne de gauche, part vers la relance, puis
       descend vers la signature. La relance est en orange, la signature en
       vert : c'est la couleur de leur liaison et de leur cadre. */
    const starts = [0.35, 1.05, 2.45, 4.25];
    const colors = ["#4E8FF0", "#4E8FF0", "#F5B454", "#34D399"];
    PATHS.forEach((id, index) => {
      const path = scene.querySelector<SVGPathElement>(`#${id}`);
      if (!path) return;
      const progress = ease(phase(time, starts[index], index < 2 ? 0.62 : 1.05));
      path.style.strokeDasharray = `${progress * 100} 100`;
      path.style.stroke = progress > 0.02 ? colors[index] : "#1E3352";
    });

    const token = scene.querySelector<SVGGElement>("[data-role='token']");
    if (!token) return;
    let pathIndex = 0;
    if (time >= starts[3]) pathIndex = 3;
    else if (time >= starts[2]) pathIndex = 2;
    else if (time >= starts[1]) pathIndex = 1;
    const path = scene.querySelector<SVGPathElement>(`#${PATHS[pathIndex]}`);
    if (!path) return;
    const progress = ease(phase(time, starts[pathIndex], pathIndex < 2 ? 0.62 : 1.05));
    const point = path.getPointAtLength(path.getTotalLength() * progress);
    token.setAttribute("transform", `translate(${point.x} ${point.y})`);
    token.style.opacity = time > 5.65 ? "0" : "1";

    [["node-request", 0.15, "#4E8FF0"], ["node-ai", 0.9, "#4E8FF0"], ["node-quote", 1.65, "#4E8FF0"], ["node-follow", 3.25, "#F5B454"], ["node-signed", 5.05, "#34D399"]].forEach(([role, at, color]) => {
      const node = scene.querySelector<SVGRectElement>(`[data-role='${role}']`);
      if (node) node.style.stroke = time >= Number(at) ? String(color) : "#1E3352";
    });
  });

  return <SceneFrame label={fr ? "Workflow animé de suivi d’une demande de devis" : "Animated quote request workflow"}>
    <svg ref={ref} viewBox="0 0 440 340" aria-hidden="true">
      <defs>
        <filter id="automation-glow" x="-200%" y="-200%" width="400%" height="400%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <text className={styles.micro} x="8" y="13">{fr ? "workflow · demandes de devis" : "workflow · quote requests"}</text>
      <text data-role="execution" className={`${styles.micro} ${styles.greenText}`} x="432" y="13" textAnchor="end">{fr ? "● actif · 18 exécutions" : "● active · 18 runs"}</text>

      <path id="a-link-1" pathLength="100" d="M100 84V128" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />
      <path id="a-link-2" pathLength="100" d="M100 174V218" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />
      <path id="a-link-follow" pathLength="100" d="M190 241C230 241 220 173 258 173" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />
      <path id="a-link-signed" pathLength="100" d="M344 196V250" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />

      <WorkflowNode x={10} y={38} title={fr ? "Demande de devis" : "Quote request"} note={fr ? "formulaire · n° 42" : "web form · no. 42"} role="node-request" />
      <WorkflowNode x={10} y={128} title={fr ? "Analyse IA" : "AI analysis"} note={fr ? "besoin · délai · budget" : "need · deadline · budget"} role="node-ai" />
      <WorkflowNode x={10} y={218} title={fr ? "Devis préparé" : "Quote drafted"} note={fr ? "relu, puis envoyé" : "reviewed, then sent"} role="node-quote" />

      <g>
        <rect x="258" y="37" width="172" height="94" rx="8" fill="#0B1A2E" stroke="#1E3352" />
        <text className={`${styles.micro} ${styles.accentText}`} x="270" y="53">{fr ? "demande comprise" : "request understood"}</text>
        {[["Client", "Client", "Verhaegen SRL", "Verhaegen SRL", "client", 71], ["Besoin", "Need", "Salle de bain", "Bathroom", "need", 92], ["Délai", "Deadline", "avant le 15/12", "by 15/12", "deadline", 113]].map(([frLabel, enLabel, frValue, enValue, role, y]) => <g key={role as string}>
          <text className={styles.micro} x="270" y={y as number}>{fr ? frLabel : enLabel}</text>
          <text data-role={`${role}-wait`} className={styles.muted} x="419" y={y as number} textAnchor="end">———</text>
          <text data-role={role as string} className={styles.label} x="419" y={y as number} textAnchor="end" style={{ opacity: 0 }}>{fr ? frValue : enValue}</text>
        </g>)}
      </g>
      <WorkflowNode x={258} y={150} title={fr ? "Relance J+3" : "Follow-up D+3"} note={fr ? "pas de réponse" : "no reply"} role="node-follow" tone="orange" />
      <WorkflowNode x={258} y={250} title={fr ? "Devis signé" : "Quote signed"} note={fr ? "CRM mis à jour" : "CRM updated"} role="node-signed" tone="green" />

      <g data-role="token" className={styles.moving} transform="translate(100 84)">
        <circle r="8" fill="#4E8FF0" opacity=".28" filter="url(#automation-glow)" />
        <circle r="3.5" fill="#FFFFFF" stroke="#4E8FF0" strokeWidth="1.5" />
      </g>
    </svg>
  </SceneFrame>;
}
