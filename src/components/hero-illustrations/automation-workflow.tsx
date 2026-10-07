"use client";

import type { Locale } from "@/lib/content";
import { SceneFrame } from "./scene-frame";
import styles from "./hero-illustrations.module.css";
import { ease, phase, setShown, setText, useSceneClock } from "./use-scene-clock";

const PATHS = ["a-link-1", "a-link-2", "a-link-erp", "a-link-check"];

function WorkflowNode({ x, y, title, note, role, tone = "blue" }: { x: number; y: number; title: string; note: string; role: string; tone?: "blue" | "green" | "orange" }) {
  const color = tone === "green" ? "#34D399" : tone === "orange" ? "#F5B454" : "#4E8FF0";
  const bg = tone === "green" ? "#123A2A" : tone === "orange" ? "#3A2E17" : "#16335A";
  return <g>
    <rect data-role={role} className={styles.softTransition} x={x} y={y} width={x < 200 ? 180 : 172} height="46" rx="8" fill="#13223A" stroke="#1E3352" />
    <rect x={x + 9} y={y + 11} width="24" height="24" rx="6" fill={bg} stroke={color} strokeOpacity=".55" />
    <circle cx={x + 21} cy={y + 23} r="3.5" fill="none" stroke={color} strokeWidth="1.5" />
    <text className={styles.label} x={x + 41} y={y + 20}>{title}</text>
    <text className={styles.micro} data-role={role === "node-mail" ? "file" : undefined} x={x + 41} y={y + 34}>{note}</text>
    <circle cx={x + (x < 200 ? 163 : 155)} cy={y + 23} r="7" fill={bg} stroke={color} strokeOpacity=".65" />
    <path d={`M${x + (x < 200 ? 160 : 152)} ${y + 23}l2 2 4-5`} fill="none" stroke={color} strokeWidth="1.4" />
  </g>;
}

export function AutomationWorkflow({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const ref = useSceneClock(6400, 5.9, (scene, time, cycle) => {
    setText(scene, "execution", `${fr ? "● actif" : "● active"} · ${cycle + 18} ${fr ? "exécutions" : "runs"}`);
    setText(scene, "file", `F-${118 + cycle}.pdf`);
    setShown(scene, "supplier", time >= 1.5);
    setShown(scene, "amount", time >= 1.85);
    setShown(scene, "due", time >= 2.2);

    const starts = [0.35, 1.05, 2.45, 4.25];
    PATHS.forEach((id, index) => {
      const path = scene.querySelector<SVGPathElement>(`#${id}`);
      if (!path) return;
      const progress = ease(phase(time, starts[index], index < 2 ? 0.62 : 1.05));
      path.style.strokeDasharray = `${progress * 100} 100`;
      path.style.stroke = index === 3 && progress > 0.02 ? "#F5B454" : progress > 0.02 ? "#4E8FF0" : "#1E3352";
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

    [["node-mail", 0.15], ["node-ai", 0.9], ["node-check", 1.65], ["node-erp", 3.25], ["node-review", 5.05]].forEach(([role, at]) => {
      const node = scene.querySelector<SVGRectElement>(`[data-role='${role}']`);
      if (node) node.style.stroke = time >= Number(at) ? (role === "node-review" ? "#F5B454" : role === "node-erp" ? "#34D399" : "#4E8FF0") : "#1E3352";
    });
  });

  return <SceneFrame label={fr ? "Workflow animé de traitement de factures" : "Animated invoice workflow"}>
    <svg ref={ref} viewBox="0 0 440 340" aria-hidden="true">
      <defs>
        <filter id="automation-glow" x="-200%" y="-200%" width="400%" height="400%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>
      <text className={styles.micro} x="8" y="13">{fr ? "workflow · factures fournisseurs" : "workflow · supplier invoices"}</text>
      <text data-role="execution" className={`${styles.micro} ${styles.greenText}`} x="432" y="13" textAnchor="end">● actif · 18 exécutions</text>

      <path id="a-link-1" pathLength="100" d="M100 84V128" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />
      <path id="a-link-2" pathLength="100" d="M100 174V218" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />
      <path id="a-link-erp" pathLength="100" d="M190 241C230 241 220 173 258 173" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />
      <path id="a-link-check" pathLength="100" d="M190 255C230 255 220 273 258 273" fill="none" stroke="#1E3352" strokeWidth="2" strokeDasharray="0 100" />

      <WorkflowNode x={10} y={38} title={fr ? "E-mail reçu" : "Email received"} note="F-118.pdf" role="node-mail" />
      <WorkflowNode x={10} y={128} title={fr ? "Extraction IA" : "AI extraction"} note={fr ? "montant · TVA" : "amount · VAT"} role="node-ai" />
      <WorkflowNode x={10} y={218} title={fr ? "Contrôle règles" : "Rule check"} note={fr ? "budget · doublon" : "budget · duplicate"} role="node-check" />

      <g>
        <rect x="258" y="37" width="172" height="94" rx="8" fill="#0B1A2E" stroke="#1E3352" />
        <text className={`${styles.micro} ${styles.accentText}`} x="270" y="53">{fr ? "données extraites" : "extracted data"}</text>
        {[["Fournisseur", "Supplier", "Dumont SRL", "supplier", 71], ["Montant", "Amount", "1 240,00 €", "amount", 92], ["Échéance", "Due date", "30/09/2026", "due", 113]].map(([frLabel, enLabel, value, role, y]) => <g key={role as string}>
          <text className={styles.micro} x="270" y={y as number}>{fr ? frLabel : enLabel}</text>
          <text className={styles.muted} x="419" y={y as number} textAnchor="end">———</text>
          <text data-role={role as string} className={styles.label} x="419" y={y as number} textAnchor="end" style={{ opacity: 0 }}>{value}</text>
        </g>)}
      </g>
      <WorkflowNode x={258} y={150} title={fr ? "Facture dans l’ERP" : "Invoice in ERP"} note={fr ? "compta à jour" : "accounts updated"} role="node-erp" tone="green" />
      <WorkflowNode x={258} y={250} title={fr ? "À vérifier" : "Review needed"} note={fr ? "hors budget" : "over budget"} role="node-review" tone="orange" />

      <g data-role="token" className={styles.moving} transform="translate(100 84)">
        <circle r="8" fill="#4E8FF0" opacity=".28" filter="url(#automation-glow)" />
        <circle r="3.5" fill="#FFFFFF" stroke="#4E8FF0" strokeWidth="1.5" />
      </g>
    </svg>
  </SceneFrame>;
}
