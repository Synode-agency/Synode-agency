"use client";

import type { Locale } from "@/lib/content";
import { SceneFrame } from "./scene-frame";
import styles from "./hero-illustrations.module.css";
import { ease, phase, useSceneClock } from "./use-scene-clock";

const BLOCKS = [
  { x: 61, y: 47, w: 181, h: 78, title: "Chiffre d’affaires", value: "84 260 €", kind: "bars" },
  { x: 249, y: 47, w: 181, h: 78, title: "Projets en cours", value: "12 projets", kind: "progress" },
  { x: 61, y: 132, w: 87, h: 163, title: "Demandes", value: "28", kind: "donut" },
  { x: 155, y: 132, w: 181, h: 78, title: "Activité", value: "+18 %", kind: "line" },
  { x: 343, y: 132, w: 87, h: 78, title: "Équipe", value: "8", kind: "team" },
  { x: 155, y: 217, w: 87, h: 78, title: "À valider", value: "4", kind: "checks" },
  { x: 249, y: 217, w: 181, h: 78, title: "Dernières activités", value: "Mis à jour", kind: "feed" },
] as const;

export function SoftwareDashboard({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const ref = useSceneClock(8000, 7.25, (scene, time) => {
    const fade = time >= 7.6 ? 1 - (time - 7.6) / .4 : 1;
    const content = scene.querySelector<SVGGElement>("[data-role='software-content']");
    if (content) content.style.opacity = String(Math.max(0, fade));
    const active = time < 1.4 ? -1 : Math.min(6, Math.floor((time - 1.4) / .9));
    BLOCKS.forEach((block, index) => {
      const group = scene.querySelector<SVGGElement>(`[data-role='block-${index}']`);
      const rect = scene.querySelector<SVGRectElement>(`[data-role='block-frame-${index}']`);
      if (group) {
        const enter = ease(phase(time, index * .14, .42));
        const scale = .96 + enter * .04;
        group.style.opacity = String(enter);
        group.setAttribute("transform", `translate(${block.x} ${block.y + (1 - enter) * 6}) scale(${scale})`);
      }
      if (rect) {
        rect.style.stroke = index === active ? "#4E8FF0" : "#1E3352";
        rect.style.filter = index === active ? "url(#software-glow)" : "none";
      }
    });
  });

  return <SceneFrame bare label={fr ? "Tableau de bord logiciel animé en blocs" : "Animated modular software dashboard"}>
    <svg ref={ref} viewBox="0 0 440 340" aria-hidden="true">
      <defs><filter id="software-glow" x="-10%" y="-20%" width="120%" height="140%"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4E8FF0" floodOpacity=".42" /></filter></defs>
      <rect x="2" y="3" width="436" height="334" rx="10" fill="#0B1A2E" stroke="#2A4A78" />
      <g data-role="software-content" transform="translate(9 7) scale(.96)">
        <line x1="2" x2="438" y1="35" y2="35" stroke="#1E3352" />
        <circle cx="17" cy="19" r="4" fill="#F5B454" /><circle cx="30" cy="19" r="4" fill="#4E8FF0" /><circle cx="43" cy="19" r="4" fill="#34D399" />
        <text className={styles.micro} x="59" y="22">{fr ? "Tableau de bord · Atelier Brun" : "Dashboard · Atelier Brun"}</text>
        <circle cx="417" cy="19" r="10" fill="#16335A" stroke="#2F5FA8" />
        <g fill="none" stroke="#8EC1FF" strokeWidth="0.9" strokeLinecap="round">
          <circle cx="417" cy="16.2" r="1.6" fill="#8EC1FF" stroke="none" />
          <path d="M413.8 22c.6-2 1.7-3 3.2-3s2.6 1 3.2 3" />
        </g>
        <rect x="9" y="43" width="40" height="286" rx="8" fill="#102038" stroke="#1A2D4A" />
        {[0, 1, 2, 3].map(i => <g key={i}>
          <rect x="20" y={57 + i * 33} width="18" height="18" rx="5" fill={i === 0 ? "#0A6CF0" : "#13223A"} stroke={i === 0 ? "#4E8FF0" : "#24406A"} />
          <path d={`M${24 + (i % 2)} ${63 + i * 33}h10M${24 + (i % 2)} ${68 + i * 33}h7`} stroke={i === 0 ? "#fff" : "#6F84A3"} strokeWidth="1.3" />
        </g>)}

        {BLOCKS.map((block, index) => <g key={block.title} data-role={`block-${index}`} opacity="0">
          <rect data-role={`block-frame-${index}`} className={styles.softTransition} width={block.w} height={block.h} rx="8" fill="#13223A" stroke="#1E3352" />
          <text className={styles.micro} x="10" y="17">{fr ? block.title : ["Revenue", "Active projects", "Requests", "Activity", "Team", "To approve", "Latest activity"][index]}</text>
          <text fill="#FFFFFF" fontSize={block.w < 100 ? "18" : "16"} fontWeight="600" x="10" y="41">{block.value}</text>
          {block.kind === "bars" && <g transform="translate(102 22)">{[21, 32, 25, 40, 35, 47].map((h, i) => <rect key={i} x={i * 10} y={47 - h} width="5" height={h} rx="2" fill={i === 5 ? "#4E8FF0" : "#24466F"} />)}</g>}
          {block.kind === "progress" && <g><rect x="10" y="57" width="157" height="5" rx="2.5" fill="#1A2D4A" /><rect x="10" y="57" width="112" height="5" rx="2.5" fill="#34D399" /></g>}
          {block.kind === "donut" && <g><circle cx="43.5" cy="91" r="25" fill="none" stroke="#1A2D4A" strokeWidth="7" /><circle cx="43.5" cy="91" r="25" fill="none" stroke="#4E8FF0" strokeWidth="7" strokeDasharray="110 157" transform="rotate(-90 43.5 91)" /><text className={styles.micro} x="43.5" y="130" textAnchor="middle">{fr ? "ce mois" : "this month"}</text></g>}
          {block.kind === "line" && <polyline points="72,60 91,51 109,56 129,40 147,46 169,31" fill="none" stroke="#4E8FF0" strokeWidth="2" />}
          {block.kind === "team" && <g>{[0, 1, 2].map(i => <circle key={i} cx={48 + i * 9} cy="56" r="7" fill="#16335A" stroke="#4E8FF0" />)}</g>}
          {block.kind === "checks" && <g>{[0, 1].map(i => <g key={i}><circle cx="15" cy={56 + i * 16} r="4" fill="#123A2A" stroke="#34D399" /><path d={`M13 ${56 + i * 16}l2 2 3-4`} stroke="#34D399" fill="none" /><line x1="25" x2="73" y1={56 + i * 16} y2={56 + i * 16} stroke="#3D5170" /></g>)}</g>}
          {block.kind === "feed" && <g>{[0, 1].map(i => <g key={i}><circle cx="14" cy={56 + i * 14} r="3" fill={i ? "#34D399" : "#4E8FF0"} /><line x1="24" x2={150 - i * 22} y1={56 + i * 14} y2={56 + i * 14} stroke="#3D5170" /></g>)}</g>}
        </g>)}
      </g>
    </svg>
  </SceneFrame>;
}
