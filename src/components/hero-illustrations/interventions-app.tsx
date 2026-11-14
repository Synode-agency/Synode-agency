"use client";

import type { Locale } from "@/lib/content";
import { SceneFrame } from "./scene-frame";
import styles from "./hero-illustrations.module.css";
import { ease, phase, setText, useSceneClock } from "./use-scene-clock";

/**
 * LE HERO DE LA PAGE LOGICIELS : un vrai écran de logiciel métier, fictif.
 *
 * Demandé le 14/11/2026, après la relecture du site par un dirigeant de
 * PME : l'ancien visuel était un tableau de bord générique (chiffre
 * d'affaires, projets), qui ne montrait pas ce qu'est un logiciel métier.
 * Celui-ci montre le suivi des interventions d'une société de services,
 * le scénario déjà décrit sur la page (« Les interventions, dans un même
 * espace ») :
 *  1. la journée et ses interventions, chacune avec son technicien et son
 *     statut ;
 *  2. l'intervention en cours se termine ;
 *  3. l'IA prépare le compte rendu à partir des notes du technicien ;
 *  4. le compte rendu est relu, puis envoyé : la validation reste humaine.
 *
 * « Atelier Brun » et ses clients sont fictifs (les mêmes noms que les
 * autres illustrations du site). Une seule horloge, 8 s ; sous
 * `prefers-reduced-motion`, l'état final (t = 7 s).
 */

type Status = "done" | "doing" | "planned";

const PILL: Record<Status, { fill: string; stroke: string; text: string }> = {
  done: { fill: "#123A2A", stroke: "#1F5C3F", text: "#34D399" },
  doing: { fill: "#16335A", stroke: "#2F5FA8", text: "#8EC1FF" },
  planned: { fill: "#13223A", stroke: "#24406A", text: "#8FA0B8" },
};

const COPY = {
  fr: {
    label: "Logiciel métier animé : suivi des interventions d’une société de services",
    window: "Interventions · Atelier Brun",
    title: "Interventions du jour",
    date: "lundi 16 novembre",
    planned: "7 prévues",
    done: (n: number) => `${n} terminées`,
    status: { done: "Terminée", doing: "En cours", planned: "Planifiée" } as Record<Status, string>,
    rows: [
      { time: "08:00", client: "Lumen SA", job: "Dépannage chauffage", tech: "SR", status: "done" },
      { time: "10:30", client: "Verhaegen & Fils", job: "Entretien chaudière", tech: "MK", status: "doing" },
      { time: "13:00", client: "Nova Logistique", job: "Installation pompe à chaleur", tech: "SR", status: "planned" },
      { time: "15:30", client: "Résidence Iris", job: "Contrôle annuel", tech: "LB", status: "planned" },
    ] as { time: string; client: string; job: string; tech: string; status: Status }[],
    ai: "IA",
    report: "Compte rendu préparé · Verhaegen & Fils",
    note: "Brûleur nettoyé, joint de porte à prévoir.",
    review: "Relire",
    sent: "Envoyé ✓",
  },
  en: {
    label: "Animated business software: job tracking for a service company",
    window: "Jobs · Atelier Brun",
    title: "Today’s jobs",
    date: "Monday 16 November",
    planned: "7 planned",
    done: (n: number) => `${n} done`,
    status: { done: "Done", doing: "In progress", planned: "Planned" } as Record<Status, string>,
    rows: [
      { time: "08:00", client: "Lumen SA", job: "Heating repair", tech: "SR", status: "done" },
      { time: "10:30", client: "Verhaegen & Fils", job: "Boiler service", tech: "MK", status: "doing" },
      { time: "13:00", client: "Nova Logistique", job: "Heat pump install", tech: "SR", status: "planned" },
      { time: "15:30", client: "Résidence Iris", job: "Annual inspection", tech: "LB", status: "planned" },
    ] as { time: string; client: string; job: string; tech: string; status: Status }[],
    ai: "AI",
    report: "Report drafted · Verhaegen & Fils",
    note: "Burner cleaned, door seal to be replaced.",
    review: "Review",
    sent: "Sent ✓",
  },
} as const;

/** La ligne qui change d'état : la deuxième. */
const LIVE = 1;
const ROW_Y = [86, 132, 178, 224];

export function InterventionsApp({ locale }: { locale: Locale }) {
  const c = COPY[locale === "fr" ? "fr" : "en"];

  const ref = useSceneClock(8000, 7, (scene, time) => {
    /* Fondu de sortie en fin de boucle, comme les autres scènes. */
    const fade = time >= 7.6 ? 1 - (time - 7.6) / 0.4 : 1;
    const content = scene.querySelector<SVGGElement>("[data-role='app-content']");
    if (content) content.style.opacity = String(Math.max(0, fade));

    /* 1 · Les lignes entrent l'une après l'autre. */
    ROW_Y.forEach((_, i) => {
      const row = scene.querySelector<SVGGElement>(`[data-role='row-${i}']`);
      if (row) row.style.opacity = String(ease(phase(time, 0.1 + i * 0.16, 0.4)));
    });

    /* 2 · L'intervention en cours se termine à 3 s. */
    const finished = time >= 3;
    const st: Status = finished ? "done" : "doing";
    const pill = scene.querySelector<SVGRectElement>("[data-role='live-pill']");
    if (pill) {
      pill.style.fill = PILL[st].fill;
      pill.style.stroke = PILL[st].stroke;
    }
    const pillText = scene.querySelector<SVGTextElement>("[data-role='live-pill-text']");
    if (pillText) pillText.style.fill = PILL[st].text;
    setText(scene, "live-pill-text", c.status[st]);
    setText(scene, "done-count", c.done(finished ? 4 : 3));
    const frame = scene.querySelector<SVGRectElement>("[data-role='live-frame']");
    if (frame) {
      const working = time >= 0.9 && time < 3;
      const pulse = working ? 0.55 + 0.45 * Math.abs(Math.sin(time * 2.4)) : 0;
      frame.style.stroke = working ? `rgba(78, 143, 240, ${pulse.toFixed(2)})` : finished && time < 3.6 ? "#34D399" : "#1E3352";
    }

    /* 3 · L'IA prépare le compte rendu. */
    const card = scene.querySelector<SVGGElement>("[data-role='report']");
    if (card) {
      const k = ease(phase(time, 3.3, 0.45));
      card.style.opacity = String(k);
      card.setAttribute("transform", `translate(0 ${((1 - k) * 8).toFixed(2)})`);
    }
    const n = Math.round(c.note.length * phase(time, 3.7, 1.9));
    setText(scene, "report-note", time < 3.7 ? "" : c.note.slice(0, n));

    /* 4 · Relu, puis envoyé. */
    const sent = time >= 6.2;
    setText(scene, "report-button-text", sent ? c.sent : c.review);
    const button = scene.querySelector<SVGRectElement>("[data-role='report-button']");
    if (button) {
      button.style.fill = sent ? PILL.done.fill : "#0A6CF0";
      button.style.stroke = sent ? PILL.done.stroke : "#4E8FF0";
    }
    const buttonText = scene.querySelector<SVGTextElement>("[data-role='report-button-text']");
    if (buttonText) buttonText.style.fill = sent ? PILL.done.text : "#FFFFFF";
  });

  return <SceneFrame bare label={c.label}>
    <svg ref={ref} viewBox="0 0 440 340" aria-hidden="true">
      <rect x="2" y="3" width="436" height="334" rx="10" fill="#0B1A2E" stroke="#2A4A78" />
      <g data-role="app-content" transform="translate(9 7) scale(.96)">
        {/* La barre de la fenêtre */}
        <line x1="2" x2="438" y1="35" y2="35" stroke="#1E3352" />
        <circle cx="17" cy="19" r="4" fill="#F5B454" /><circle cx="30" cy="19" r="4" fill="#4E8FF0" /><circle cx="43" cy="19" r="4" fill="#34D399" />
        <text className={styles.micro} x="59" y="22">{c.window}</text>
        <circle cx="417" cy="19" r="10" fill="#16335A" stroke="#2F5FA8" />
        <g fill="none" stroke="#8EC1FF" strokeWidth="0.9" strokeLinecap="round">
          <circle cx="417" cy="16.2" r="1.6" fill="#8EC1FF" stroke="none" />
          <path d="M413.8 22c.6-2 1.7-3 3.2-3s2.6 1 3.2 3" />
        </g>

        {/* Le menu latéral */}
        <rect x="9" y="43" width="40" height="286" rx="8" fill="#102038" stroke="#1A2D4A" />
        {[0, 1, 2, 3].map(i => <g key={i}>
          <rect x="20" y={57 + i * 33} width="18" height="18" rx="5" fill={i === 0 ? "#0A6CF0" : "#13223A"} stroke={i === 0 ? "#4E8FF0" : "#24406A"} />
          <path d={`M${24 + (i % 2)} ${63 + i * 33}h10M${24 + (i % 2)} ${68 + i * 33}h7`} stroke={i === 0 ? "#fff" : "#6F84A3"} strokeWidth="1.3" />
        </g>)}

        {/* L'en-tête de la journée */}
        <text className={styles.label} x="61" y="58">{c.title}</text>
        <text className={styles.micro} x="61" y="72">{c.date}</text>
        <rect x="290" y="48" width="66" height="22" rx="11" fill="#13223A" stroke="#24406A" />
        <text className={styles.micro} x="323" y="62.5" textAnchor="middle">{c.planned}</text>
        <rect x="362" y="48" width="68" height="22" rx="11" fill="#123A2A" stroke="#1F5C3F" />
        <text data-role="done-count" className={`${styles.micro} ${styles.greenText}`} x="396" y="62.5" textAnchor="middle">{c.done(3)}</text>

        {/* Les interventions */}
        {c.rows.map((row, i) => {
          const y = ROW_Y[i];
          const live = i === LIVE;
          const tone = PILL[row.status];
          return <g key={row.time} data-role={`row-${i}`} style={{ opacity: 0 }}>
            <rect data-role={live ? "live-frame" : undefined} className={styles.softTransition} x="61" y={y} width="369" height="40" rx="8" fill="#13223A" stroke="#1E3352" />
            <text className={styles.micro} x="73" y={y + 24}>{row.time}</text>
            <text className={styles.label} x="112" y={y + 17}>{row.client}</text>
            <text className={styles.micro} x="112" y={y + 31}>{row.job}</text>
            <circle cx="300" cy={y + 20} r="10" fill="#16335A" stroke="#2F5FA8" />
            <text className={styles.micro} x="300" y={y + 23.5} textAnchor="middle">{row.tech}</text>
            <rect data-role={live ? "live-pill" : undefined} className={styles.softTransition} x="330" y={y + 10} width="88" height="20" rx="10" fill={tone.fill} stroke={tone.stroke} />
            <text data-role={live ? "live-pill-text" : undefined} className={`${styles.micro} ${styles.softTransition}`} x="374" y={y + 23.5} textAnchor="middle" style={{ fill: tone.text }}>{c.status[row.status]}</text>
          </g>;
        })}

        {/* Le compte rendu préparé par l'IA, à relire */}
        <g data-role="report" style={{ opacity: 0 }}>
          <rect x="61" y="272" width="369" height="54" rx="8" fill="#0F2340" stroke="#2F5FA8" />
          <rect x="72" y="282" width="20" height="14" rx="4" fill="#16335A" stroke="#4E8FF0" />
          <text className={`${styles.micro} ${styles.accentText}`} x="82" y="292" textAnchor="middle">{c.ai}</text>
          <text className={`${styles.micro} ${styles.accentText}`} x="100" y="292">{c.report}</text>
          <text data-role="report-note" x="72" y="314"></text>
          <rect data-role="report-button" className={styles.softTransition} x="352" y="301" width="66" height="20" rx="6" fill="#0A6CF0" stroke="#4E8FF0" />
          <text data-role="report-button-text" className={`${styles.micro} ${styles.softTransition}`} x="385" y="314.5" textAnchor="middle" style={{ fill: "#FFFFFF" }}>{c.review}</text>
        </g>
      </g>
    </svg>
  </SceneFrame>;
}
