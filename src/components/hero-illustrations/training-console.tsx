"use client";

import type { Locale } from "@/lib/content";
import { SceneFrame } from "./scene-frame";
import styles from "./hero-illustrations.module.css";
import { ease, phase, setText, useSceneClock } from "./use-scene-clock";

const TARGETS = [[244, 72], [389, 127], [362, 181], [332, 224]] as const;

export function TrainingConsole({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const advice = fr ? [
    ["Voici votre agent : ce qu’il traite seul,", "et ce qu’il vous transmet."],
    ["Activez la validation humaine", "sur les décisions sensibles."],
    ["Réglez le seuil de confiance selon", "votre niveau d’exigence."],
    ["Suivez chaque semaine les résultats", "et ajustez si besoin."],
    ["Votre équipe sait piloter sa solution", "IA en autonomie."],
  ] : [
    ["Meet your agent: what it handles alone,", "and what it sends to your team."],
    ["Enable human approval", "for sensitive decisions."],
    ["Set the confidence threshold", "to match your requirements."],
    ["Review results every week", "and adjust when needed."],
    ["Your team can now run the AI solution", "independently."],
  ];

  const ref = useSceneClock(9200, 8.55, (scene, time) => {
    const final = time >= 8;
    const lesson = final ? 3 : Math.min(3, Math.floor(time / 2));
    const local = final ? 2 : time - lesson * 2;
    const completed = final ? 4 : lesson + (local >= 1.5 ? 1 : 0);
    const progress = final ? 100 : Math.round(((lesson + Math.min(local / 1.5, 1)) / 4) * 100);
    setText(scene, "autonomy", `${progress} %`);
    const bar = scene.querySelector<SVGRectElement>("[data-role='progress']");
    if (bar) {
      bar.setAttribute("width", String(134 * progress / 100));
      bar.style.fill = progress === 100 ? "#34D399" : "#0A6CF0";
    }

    for (let i = 0; i < 4; i++) {
      const row = scene.querySelector<SVGGElement>(`[data-role='lesson-${i}']`);
      const setting = scene.querySelector<SVGRectElement>(`[data-role='setting-${i}']`);
      const badge = scene.querySelector<SVGCircleElement>(`[data-role='badge-${i}']`);
      const check = scene.querySelector<SVGTextElement>(`[data-role='check-${i}']`);
      if (row) row.style.opacity = i > lesson && !final ? ".55" : "1";
      if (setting) {
        setting.style.stroke = i === lesson && !final ? "#4E8FF0" : i < completed || final ? "#1F5C3F" : "#1E3352";
        setting.style.filter = i === lesson && !final ? "url(#training-glow)" : "none";
        setting.parentElement!.style.opacity = i > lesson && !final ? ".55" : "1";
      }
      if (badge) badge.style.fill = i < completed || final ? "#123A2A" : i === lesson ? "#0A6CF0" : "#13223A";
      if (badge) badge.style.stroke = i < completed || final ? "#34D399" : i === lesson ? "#4E8FF0" : "#5F7393";
      if (check) {
        check.textContent = i < completed || final ? "✓" : String(i + 1);
        check.style.fill = i < completed || final ? "#34D399" : "#E8EEF7";
      }
    }

    const target = TARGETS[lesson];
    const move = ease(phase(local, 0.08, .6));
    const x = 210 + (target[0] - 210) * move;
    const y = 300 + (target[1] - 300) * move;
    const cursor = scene.querySelector<SVGGElement>("[data-role='mouse']");
    if (cursor) {
      cursor.setAttribute("transform", `translate(${x} ${y})`);
      cursor.style.opacity = final ? "0" : local < 1.55 ? "1" : "0";
    }

    const toggle = scene.querySelector<SVGCircleElement>("[data-role='toggle-knob']");
    const toggleBg = scene.querySelector<SVGRectElement>("[data-role='toggle-bg']");
    const toggled = final || lesson > 1 || (lesson === 1 && local >= 1);
    if (toggle) toggle.setAttribute("cx", toggled ? "411" : "399");
    if (toggleBg) toggleBg.style.fill = toggled ? "#123A2A" : "#1A2D4A";

    const slider = scene.querySelector<SVGCircleElement>("[data-role='slider-knob']");
    const sliderValue = final || lesson > 2 ? 85 : lesson === 2 ? 70 + 15 * ease(phase(local, .7, .8)) : 70;
    if (slider) slider.setAttribute("cx", String(287 + sliderValue * 1.23));
    setText(scene, "slider-value", `${Math.round(sliderValue)} %`);

    const lines = advice[final ? 4 : lesson];
    setText(scene, "advice-1", lines[0]);
    setText(scene, "advice-2", lines[1]);
    const all = scene.querySelector<SVGGElement>("[data-role='content']");
    if (all) all.style.opacity = time > 8.8 ? String(1 - (time - 8.8) / .4) : "1";
  });

  const lessons = fr
    ? ["Comprendre votre agent", "Garder le contrôle", "Ajuster les règles", "Suivre les résultats"]
    : ["Understand your agent", "Stay in control", "Adjust the rules", "Track the results"];

  return <div className={styles.captionedScene}>
    <span className={styles.sceneCaption}>{fr ? "Piloter votre solution IA" : "Run your AI solution"}</span>
    <SceneFrame label={fr ? "Programme animé de formation à la solution IA" : "Animated AI solution training programme"}>
    <svg ref={ref} viewBox="0 0 440 340" aria-hidden="true">
      <defs><filter id="training-glow" x="-10%" y="-30%" width="120%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4E8FF0" floodOpacity=".35" /></filter></defs>
      <g data-role="content" className={styles.softTransition}>
        <rect x="3" y="6" width="170" height="328" rx="10" fill="#13223A" stroke="#1E3352" />
        <rect x="184" y="6" width="253" height="328" rx="10" fill="#0B1A2E" stroke="#2A4A78" />

        <rect x="18" y="19" width="28" height="28" rx="7" fill="#0A6CF0" />
        <path d="M23 32l9-5 9 5-9 5-9-5Zm3 3v5m12-5v5" fill="none" stroke="#fff" strokeWidth="1.4" />
        <text className={styles.label} x="54" y="36">Programme Synode</text>

        {lessons.map((label, i) => <g data-role={`lesson-${i}`} key={label} className={styles.softTransition}>
          <rect x="12" y={60 + i * 40} width="152" height="33" rx="7" fill="transparent" stroke="transparent" />
          <circle data-role={`badge-${i}`} className={styles.softTransition} cx="27" cy={76.5 + i * 40} r="9" fill="#13223A" stroke="#5F7393" />
          <text data-role={`check-${i}`} x="27" y={80 + i * 40} textAnchor="middle" fontSize="9.5" fill="#E8EEF7">{i + 1}</text>
          <text x="43" y={80 + i * 40} fill="#E8EEF7" fontSize="10.2">{label}</text>
        </g>)}

        <text x="15" y="270" fill="#8FA0B8" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="8.4">{fr ? "Autonomie de l’équipe" : "Team autonomy"}</text>
        <rect x="15" y="280" width="134" height="6" rx="3" fill="#1A2D4A" />
        <rect data-role="progress" className={styles.softTransition} x="15" y="280" width="0" height="6" rx="3" fill="#0A6CF0" />
        <text data-role="autonomy" className={`${styles.micro} ${styles.greenText}`} x="15" y="303">0 %</text>

        <text className={styles.micro} x="197" y="23">console · solution IA</text>
        <text className={`${styles.micro} ${styles.greenText}`} x="425" y="23" textAnchor="end">● {fr ? "en production" : "live"}</text>

        <g className={styles.softTransition}>
          <rect data-role="setting-0" className={styles.softTransition} x="196" y="34" width="229" height="49" rx="7" fill="#13223A" stroke="#1E3352" />
          <text className={styles.label} x="207" y="53">{fr ? "Agent de réponse client" : "Customer response agent"}</text>
          <text className={styles.micro} x="207" y="69">{fr ? "traite 72 % des demandes entrantes" : "handles 72% of incoming requests"}</text>
        </g>
        <g className={styles.softTransition}>
          <rect data-role="setting-1" className={styles.softTransition} x="196" y="94" width="229" height="44" rx="7" fill="#13223A" stroke="#1E3352" />
          <text className={styles.label} x="207" y="112">{fr ? "Validation humaine" : "Human approval"}</text>
          <text className={styles.micro} x="207" y="127">{fr ? "montants supérieurs à 1 000 €" : "amounts over €1,000"}</text>
          <rect data-role="toggle-bg" className={styles.softTransition} x="391" y="108" width="28" height="16" rx="8" fill="#1A2D4A" stroke="#24406A" />
          <circle data-role="toggle-knob" className={styles.softTransition} cx="399" cy="116" r="5" fill="#FFFFFF" />
        </g>
        <g className={styles.softTransition}>
          <rect data-role="setting-2" className={styles.softTransition} x="196" y="148" width="229" height="43" rx="7" fill="#13223A" stroke="#1E3352" />
          <text className={styles.label} x="207" y="166">{fr ? "Seuil de confiance" : "Confidence threshold"}</text>
          <line x1="287" x2="410" y1="180" y2="180" stroke="#24406A" strokeWidth="4" strokeLinecap="round" />
          <circle data-role="slider-knob" cx="373" cy="180" r="6" fill="#4E8FF0" stroke="#FFFFFF" />
          <text data-role="slider-value" className={`${styles.micro} ${styles.accentText}`} x="410" y="166" textAnchor="end">70 %</text>
        </g>
        <g className={styles.softTransition}>
          <rect data-role="setting-3" className={styles.softTransition} x="196" y="202" width="229" height="39" rx="7" fill="#13223A" stroke="#1E3352" />
          <text className={styles.label} x="207" y="220">{fr ? "Résultats de la semaine" : "Weekly results"}</text>
          <polyline points="329,230 345,225 360,228 376,216 392,220 407,211" fill="none" stroke="#34D399" strokeWidth="1.6" />
          <text className={`${styles.micro} ${styles.greenText}`} x="410" y="230" textAnchor="end">+18 %</text>
        </g>

        <g>
          <rect x="196" y="252" width="229" height="69" rx="8" fill="#16335A" stroke="#2F5FA8" />
          <circle cx="214" cy="270" r="10" fill="#0A6CF0" />
          <text x="214" y="274" fill="#fff" fontSize="10" fontWeight="600" textAnchor="middle">S</text>
          <text className={styles.label} x="231" y="269">Synode · {fr ? "votre formateur" : "your trainer"}</text>
          <text data-role="advice-1" x="207" y="291" fill="#C9D3E2" fontSize="9.7">Voici votre agent : ce qu’il traite seul,</text>
          <text data-role="advice-2" x="207" y="306" fill="#C9D3E2" fontSize="9.7">et ce qu’il vous transmet.</text>
        </g>

        <g data-role="mouse" className={styles.moving} transform="translate(210 300)">
          <path d="M0 0v18l5-5 4 8 4-2-4-8h7L0 0Z" fill="#FFFFFF" stroke="#0B1A2E" strokeWidth="1" />
        </g>
      </g>
    </svg>
    </SceneFrame>
  </div>;
}
