"use client";

import type { Locale } from "@/lib/content";
import { SceneFrame } from "./scene-frame";
import styles from "./hero-illustrations.module.css";
import { ease, phase, setText, useSceneClock } from "./use-scene-clock";

const EXAMPLES = [
  { name: "Nora Martin", email: "nora@lumio.be", company: "Lumio SRL", need: "Audit IA" },
  { name: "Alex Dubois", email: "alex@nova.be", company: "Nova Studio", need: "Automatisation" },
  { name: "Lina Claes", email: "lina@orbe.be", company: "Orbe Conseil", need: "Tableau de bord" },
] as const;
const STARTS = [.5, 1.35, 2.2, 3.05, 3.9];
const PATH_IDS = ["i-name", "i-email", "i-company", "i-need", "i-team"];

function DestinationCard({ y, title, role, rows }: { y: number; title: string; role: string; rows: [string, string][] }) {
  return <g>
    <rect data-role={`${role}-card`} className={styles.softTransition} x="258" y={y} width="177" height={role === "team" ? 76 : 82} rx="8" fill="#13223A" stroke="#1E3352" />
    <rect x="268" y={y + 9} width="31" height="17" rx="5" fill="#16335A" stroke="#2F5FA8" />
    <text className={`${styles.micro} ${styles.accentText}`} x="283.5" y={y + 21} textAnchor="middle">{title}</text>
    <g data-role={`${role}-check`} className={styles.softTransition} style={{ opacity: 0 }}><circle cx="420" cy={y + 18} r="7" fill="#123A2A" stroke="#34D399" /><path d={`M417 ${y + 18}l2 2 4-5`} fill="none" stroke="#34D399" /></g>
    {rows.map(([label, valueRole], i) => <g key={valueRole}>
      <text className={styles.micro} x="269" y={y + 44 + i * 21}>{label}</text>
      <text data-role={valueRole} className={styles.label} x="425" y={y + 44 + i * 21} textAnchor="end">—</text>
    </g>)}
  </g>;
}

export function IntegrationSync({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const ref = useSceneClock(7000, 6.35, (scene, time, cycle) => {
    const example = EXAMPLES[cycle % EXAMPLES.length];
    const values = [example.name, example.email, example.company, example.need, fr ? "Nouveau lead" : "New lead"];
    ["source-name", "source-email", "source-company", "source-need"].forEach((role, i) => setText(scene, role, values[i]));
    setText(scene, "lead-count", `${cycle + 24} ${fr ? "leads synchronisés · 0 double saisie" : "leads synced · 0 duplicate entry"}`);

    const destinationValues = [example.name, example.email, example.company, example.need, example.company, "Julie V."];
    const arrivalTimes = [1.2, 2.05, 2.9, 3.75, 4.6, 5.0];
    ["crm-name", "crm-email", "erp-company", "erp-need", "team-lead", "team-owner"].forEach((role, i) => {
      setText(scene, role, time >= arrivalTimes[i] ? destinationValues[i] : "—");
      const node = scene.querySelector<SVGTextElement>(`[data-role='${role}']`);
      if (node) node.style.fill = time >= arrivalTimes[i] ? "#E8EEF7" : "#3D5170";
    });

    const current = STARTS.findIndex((start, i) => time >= start && time < start + .7 && (i === STARTS.length - 1 || time < STARTS[i + 1]));
    PATH_IDS.forEach((id, i) => {
      const path = scene.querySelector<SVGPathElement>(`#${id}`);
      if (path) path.style.stroke = i === current ? "#4E8FF0" : "#1E3352";
    });
    [0, 1, 2, 3].forEach(i => {
      const field = scene.querySelector<SVGRectElement>(`[data-role='source-field-${i}']`);
      if (field) {
        field.style.fill = i === current ? "#16335A" : "#0B1A2E";
        field.style.stroke = i === current ? "#4E8FF0" : "#1E3352";
      }
    });
    const cardArrival = [2.05, 3.75, 5.0];
    ["crm-card", "erp-card", "team-card"].forEach((role, i) => {
      const card = scene.querySelector<SVGRectElement>(`[data-role='${role}']`);
      if (!card) return;
      card.style.stroke = time >= cardArrival[i] ? "#34D399" : (i === (current < 2 ? 0 : current < 4 ? 1 : 2) && current >= 0 ? "#4E8FF0" : "#1E3352");
    });
    ["crm-check", "erp-check", "team-check"].forEach((role, i) => {
      const check = scene.querySelector<SVGGElement>(`[data-role='${role}']`);
      if (check) check.style.opacity = time >= cardArrival[i] ? "1" : "0";
    });

    const token = scene.querySelector<SVGGElement>("[data-role='sync-token']");
    if (token && current >= 0) {
      const path = scene.querySelector<SVGPathElement>(`#${PATH_IDS[current]}`)!;
      const p = ease(phase(time, STARTS[current], .7));
      const point = path.getPointAtLength(path.getTotalLength() * p);
      token.setAttribute("transform", `translate(${point.x} ${point.y})`);
      token.style.opacity = "1";
      setText(scene, "token-label", values[current]);
      const width = Math.min(102, Math.max(54, values[current].length * 5.4 + 16));
      const rect = scene.querySelector<SVGRectElement>("[data-role='token-bg']");
      if (rect) { rect.setAttribute("width", String(width)); rect.setAttribute("x", String(-width / 2)); }
    } else if (token) token.style.opacity = "0";

    const content = scene.querySelector<SVGGElement>("[data-role='integration-content']");
    if (content) content.style.opacity = time > 6.6 ? String(1 - (time - 6.6) / .4) : "1";
  });

  const fields = fr
    ? [["Nom", "source-name"], ["E-mail", "source-email"], ["Société", "source-company"], ["Besoin", "source-need"]]
    : [["Name", "source-name"], ["Email", "source-email"], ["Company", "source-company"], ["Need", "source-need"]];

  return <SceneFrame label={fr ? "Synchronisation animée d’un formulaire vers les systèmes de l’entreprise" : "Animated form synchronisation across business systems"}>
    <svg ref={ref} viewBox="0 0 440 340" aria-hidden="true">
      <g data-role="integration-content">
        <rect x="3" y="3" width="434" height="32" rx="8" fill="#13223A" stroke="#1E3352" />
        <text className={styles.micro} x="14" y="23">{fr ? "règle" : "rule"}</text>
        <text className={styles.label} x="53" y="23">{fr ? "Nouveau lead du site → CRM + ERP + équipe" : "New website lead → CRM + ERP + team"}</text>
        <rect x="394" y="11" width="30" height="16" rx="8" fill="#0A6CF0" /><circle cx="416" cy="19" r="5.5" fill="#FFFFFF" />

        <rect x="3" y="44" width="172" height="267" rx="9" fill="#13223A" stroke="#1E3352" />
        <circle cx="20" cy="62" r="9" fill="#16335A" stroke="#4E8FF0" /><path d="M14 62h12M20 56c3 3 3 9 0 12M20 56c-3 3-3 9 0 12" fill="none" stroke="#8EC1FF" strokeWidth="1" />
        <text className={styles.label} x="35" y="66">{fr ? "Formulaire site web" : "Website form"}</text>
        {fields.map(([label, role], i) => <g key={role}>
          <rect data-role={`source-field-${i}`} className={styles.softTransition} x="13" y={79 + i * 51} width="152" height="42" rx="6" fill="#0B1A2E" stroke="#1E3352" />
          <text className={styles.micro} x="22" y={93 + i * 51}>{label}</text>
          <text data-role={role} x="22" y={109 + i * 51} fill="#E8EEF7" fontSize="10.5">{EXAMPLES[0][["name", "email", "company", "need"][i] as keyof typeof EXAMPLES[0]]}</text>
        </g>)}

        <path id="i-name" d="M165 102C214 102 213 96 269 96" fill="none" stroke="#1E3352" strokeDasharray="4 5" strokeWidth="1.5" />
        <path id="i-email" d="M165 153C216 153 211 117 269 117" fill="none" stroke="#1E3352" strokeDasharray="4 5" strokeWidth="1.5" />
        <path id="i-company" d="M165 204C215 204 213 188 269 188" fill="none" stroke="#1E3352" strokeDasharray="4 5" strokeWidth="1.5" />
        <path id="i-need" d="M165 255C219 255 210 209 269 209" fill="none" stroke="#1E3352" strokeDasharray="4 5" strokeWidth="1.5" />
        <path id="i-team" d="M165 204C218 204 210 280 269 280" fill="none" stroke="#1E3352" strokeDasharray="4 5" strokeWidth="1.5" />

        <DestinationCard y={52} title="CRM" role="crm" rows={[["Contact", "crm-name"], ["E-mail", "crm-email"]]} />
        <DestinationCard y={143} title="ERP" role="erp" rows={[["Client", "erp-company"], [fr ? "Objet" : "Subject", "erp-need"]]} />
        <DestinationCard y={234} title={fr ? "ÉQUIPE" : "TEAM"} role="team" rows={[[fr ? "Nouveau lead" : "New lead", "team-lead"], [fr ? "Assigné à" : "Assigned to", "team-owner"]]} />

        <g data-role="sync-token" className={styles.moving} style={{ opacity: 0 }}>
          <rect data-role="token-bg" x="-36" y="-10" width="72" height="20" rx="6" fill="#0A6CF0" />
          <text data-role="token-label" x="0" y="3.5" fill="#FFFFFF" fontSize="9.5" textAnchor="middle">Nora Martin</text>
        </g>
        <text data-role="lead-count" className={styles.micro} x="5" y="331">24 leads synchronisés · 0 double saisie</text>
      </g>
    </svg>
  </SceneFrame>;
}
