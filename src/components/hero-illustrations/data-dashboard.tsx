"use client";

import type { Locale } from "@/lib/content";
import { SceneFrame } from "./scene-frame";
import styles from "./hero-illustrations.module.css";
import { clamp, setText, useSceneClock } from "./use-scene-clock";

const BASE = [218, 205, 211, 183, 191, 166, 171, 139, 154, 121, 129, 103];
const X0 = 28;
const STEP = 35;

function smoothPath(points: [number, number][]) {
  return points.reduce((d, [x, y], index) => {
    if (!index) return `M${x} ${y}`;
    const [px, py] = points[index - 1];
    return `${d} C${px + STEP * .42} ${py} ${x - STEP * .42} ${y} ${x} ${y}`;
  }, "");
}

export function DataDashboard({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const ref = useSceneClock(6400, 4.7, (scene, time) => {
    const points = BASE.map((y, index) => [X0 + index * STEP, y + Math.sin(time * 1.35 + index * .72) * 6] as [number, number]);
    const curve = smoothPath(points);
    const line = scene.querySelector<SVGPathElement>("[data-role='curve']");
    const area = scene.querySelector<SVGPathElement>("[data-role='area']");
    if (line) line.setAttribute("d", curve);
    if (area) area.setAttribute("d", `${curve} L${points.at(-1)![0]} 250 L${points[0][0]} 250Z`);

    const progress = (time % 6.4) / 6.4;
    const raw = progress * (points.length - 1);
    const index = Math.min(points.length - 2, Math.floor(raw));
    const local = raw - index;
    const x = points[index][0] + (points[index + 1][0] - points[index][0]) * local;
    const y = points[index][1] + (points[index + 1][1] - points[index][1]) * local;
    const cursor = scene.querySelector<SVGGElement>("[data-role='cursor']");
    if (cursor) cursor.setAttribute("transform", `translate(${x} 0)`);
    const dot = scene.querySelector<SVGCircleElement>("[data-role='cursor-dot']");
    if (dot) dot.setAttribute("cy", String(y));
    const tipX = clamp(x, 48, 392);
    const tip = scene.querySelector<SVGGElement>("[data-role='tooltip']");
    if (tip) tip.setAttribute("transform", `translate(${tipX} ${Math.max(76, y - 35)})`);
    const value = Math.round(23600 + (250 - y) * 142 + Math.sin(time * .72) * 370);
    setText(scene, "tooltip-value", `${value.toLocaleString(fr ? "fr-BE" : "en-GB")} €`);
    setText(scene, "revenue", `${Math.round(248600 + Math.sin(time * .62) * 900).toLocaleString(fr ? "fr-BE" : "en-GB")} €`);

    const anomaly = scene.querySelector<SVGCircleElement>("[data-role='anomaly-ring']");
    if (anomaly) {
      const pulse = (time % 1.5) / 1.5;
      anomaly.setAttribute("r", String(4 + pulse * 12));
      anomaly.style.opacity = String(1 - pulse);
    }
    const anomalyY = points[8][1];
    scene.querySelectorAll<SVGElement>("[data-role='anomaly']").forEach(node => node.setAttribute("transform", `translate(0 ${anomalyY - BASE[8]})`));

    [0, 1, 2].forEach(tile => {
      const mini = scene.querySelector<SVGPolylineElement>(`[data-role='mini-${tile}']`);
      if (!mini) return;
      const pts = Array.from({ length: 7 }, (_, i) => `${70 + i * 8},${48 - Math.sin(time * 1.5 + i * .8 + tile) * 5 - i * 1.4}`).join(" ");
      mini.setAttribute("points", pts);
    });
  });

  const tiles = fr
    ? [["Commandes", "382"], ["Panier moyen", "126 €"], ["Conversion", "4,8 %"]]
    : [["Orders", "382"], ["Avg. basket", "€126"], ["Conversion", "4.8%"]];

  return <SceneFrame label={fr ? "Tableau de bord animé sur trente jours" : "Animated thirty-day dashboard"}>
    <svg ref={ref} viewBox="0 0 440 340" aria-hidden="true">
      <defs>
        <linearGradient id="data-area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#4E8FF0" stopOpacity=".35" /><stop offset="1" stopColor="#4E8FF0" stopOpacity="0" /></linearGradient>
      </defs>
      <text className={styles.micro} x="12" y="14">{fr ? "chiffre d’affaires · 30 jours" : "revenue · 30 days"}</text>
      <text data-role="revenue" x="12" y="48" fill="#FFFFFF" fontSize="26" fontWeight="600">248 600 €</text>
      <rect x="166" y="29" width="55" height="22" rx="11" fill="#123A2A" stroke="#1F5C3F" />
      <text className={`${styles.micro} ${styles.greenText}`} x="193.5" y="43.5" textAnchor="middle">+12,4 %</text>
      <g transform="translate(304 18)">
        <rect width="124" height="30" rx="8" fill="#0B1A2E" stroke="#1E3352" />
        <rect x="41" y="3" width="41" height="24" rx="6" fill="#16335A" stroke="#2F5FA8" />
        {[[20, "7 j"], [61.5, "30 j"], [103, "90 j"]].map(([x, label], i) => <text key={label as string} className={i === 1 ? styles.accentText : styles.micro} x={x as number} y="19" textAnchor="middle">{label}</text>)}
      </g>

      {[112, 158, 204].map(y => <line key={y} x1="28" x2="413" y1={y} y2={y} stroke="#24406A" strokeDasharray="3 5" opacity=".65" />)}
      <line x1="28" x2="413" y1="250" y2="250" stroke="#24406A" />
      <path data-role="area" fill="url(#data-area)" />
      <path data-role="curve" fill="none" stroke="#4E8FF0" strokeWidth="2" />

      <g data-role="anomaly" transform="translate(0 0)">
        <circle data-role="anomaly-ring" cx={X0 + STEP * 8} cy={BASE[8]} r="4" fill="none" stroke="#F5B454" />
        <circle cx={X0 + STEP * 8} cy={BASE[8]} r="4" fill="#F5B454" />
        <rect x={X0 + STEP * 8 - 25} y={BASE[8] - 27} width="50" height="17" rx="6" fill="#3A2E17" stroke="#5A4520" />
        <text className={`${styles.micro} ${styles.orangeText}`} x={X0 + STEP * 8} y={BASE[8] - 15.5} textAnchor="middle">{fr ? "stock bas" : "low stock"}</text>
      </g>

      <g data-role="cursor" className={styles.moving}>
        <line x1="0" x2="0" y1="92" y2="250" stroke="#8EC1FF" strokeDasharray="3 4" opacity=".72" />
        <circle data-role="cursor-dot" cx="0" cy="180" r="5" fill="#FFFFFF" stroke="#4E8FF0" strokeWidth="2" />
      </g>
      <g data-role="tooltip" className={styles.moving} transform="translate(48 90)">
        <rect x="-38" y="-15" width="76" height="22" rx="6" fill="#10264A" stroke="#4E8FF0" />
        <text data-role="tooltip-value" className={styles.label} x="0" y="0" textAnchor="middle">25 480 €</text>
      </g>

      {tiles.map(([label, value], tile) => <g key={label} transform={`translate(${12 + tile * 140} 267)`}>
        <rect width="132" height="64" rx="8" fill="#13223A" stroke="#1E3352" />
        <text className={styles.micro} x="10" y="17">{label}</text>
        <text className={styles.label} x="10" y="39">{value}</text>
        <polyline data-role={`mini-${tile}`} points="" fill="none" stroke={tile === 2 ? "#34D399" : "#4E8FF0"} strokeWidth="1.5" />
      </g>)}
    </svg>
  </SceneFrame>;
}
