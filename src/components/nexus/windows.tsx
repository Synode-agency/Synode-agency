"use client";

import type { RefObject } from "react";
import { Search, ShieldCheck, Sparkles } from "lucide-react";
import { AppWindow, type WindowBrand } from "./app-window";
import type { LeadRow, MailRow } from "./windows-content";
import styles from "./windows.module.css";

/**
 * LES QUATRE ÉCRANS DE L'APPLICATION.
 *
 * Chacun ne décrit que son contenu : le cadre vient d'`AppWindow`, et tout
 * le texte vient des props, jamais d'une constante écrite ici. C'est ce qui
 * permet à la page d'un autre projet de reprendre les mêmes écrans avec ses
 * propres données.
 *
 * ⚠ Aucun de ces composants ne porte d'horloge. Les valeurs qui changent à
 * chaque image arrivent par des `ref`, celles qui changent par étapes
 * arrivent par des props : la section au-dessus tient l'unique horloge.
 */

type Chrome = {
  brand: WindowBrand;
  by: string;
  menus: readonly string[];
  badge: string;
  crumbTemplate: string;
};

/* ---------------------------------------------------------------- Leads */

export function LeadsWindow({
  chrome,
  active,
  w,
  lead,
  tags,
  query,
  synth,
  caret,
  card,
  className,
  style,
}: {
  chrome: Chrome;
  active: number;
  w: {
    kicker: string; title: string; lede: string; results: string;
    cols: readonly string[]; rows: readonly LeadRow[];
    cardTitle: string; synth: readonly string[]; tags: readonly (readonly string[])[];
  };
  lead: number;
  tags: number;
  query: RefObject<HTMLSpanElement | null>;
  synth: RefObject<HTMLSpanElement | null>;
  caret: RefObject<HTMLElement | null>;
  card: RefObject<HTMLDivElement | null>;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <AppWindow
      brand={chrome.brand}
      by={chrome.by}
      menus={chrome.menus}
      active={active}
      crumb={chrome.crumbTemplate.replace("{page}", w.title)}
      badge={chrome.badge}
      kicker={w.kicker}
      title={w.title}
      lede={w.lede}
      className={className}
      style={style}
    >
      <span className={styles.search}>
        <Search aria-hidden />
        <span className={styles.query} ref={query} />
        <i className={styles.caret} />
        <em>{w.results}</em>
      </span>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.head}`}>
          {w.cols.map(col => <em key={col}>{col}</em>)}
        </div>
        {w.rows.map((row, i) => (
          <div key={row.name} className={i === lead ? `${styles.row} ${styles.rowOn}` : styles.row}>
            <span className={styles.who}>
              <i className={styles.avatar}>{row.initials}</i>
              <span>
                <strong>{row.name}</strong>
                <em>{row.where}</em>
              </span>
            </span>
            <span className={i === lead ? `${styles.icp} ${styles.icpOn}` : styles.icp}>{row.icp} /100</span>
            <em className={styles.state}>{row.status}</em>
          </div>
        ))}
      </div>

      {/* La carte flottante : elle suit l'entreprise analysée. */}
      <div className={styles.floatCard} ref={card}>
        <span className={styles.floatHead}>
          <Sparkles aria-hidden />
          {w.cardTitle} · {w.rows[lead].name}
        </span>
        <p className={styles.floatText}>
          <span ref={synth} />
          <i className={styles.caretBlue} ref={caret} />
        </p>
        <span className={styles.tags}>
          {w.tags[lead].map((tag, i) => (
            <i key={tag} className={i < tags ? `${styles.tag} ${styles.tagOn}` : styles.tag}>{tag}</i>
          ))}
        </span>
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------ Discovery */

export function DiscoveryWindow({
  chrome,
  active,
  w,
  running,
  lit,
  jobs,
  pct,
  bar,
  counters,
  button,
  className,
  style,
}: {
  chrome: Chrome;
  active: number;
  w: {
    kicker: string; title: string; lede: string;
    manualTitle: string; manualText: string; launch: string; running: string; rhythm: string;
    queueKicker: string; queueTitle: string; jobs: string;
    counters: readonly string[]; sectorsTitle: string; sectors: readonly string[]; sectorCount: string;
  };
  running: boolean;
  lit: number;
  jobs: RefObject<HTMLSpanElement | null>;
  pct: RefObject<HTMLElement | null>;
  bar: RefObject<HTMLElement | null>;
  counters: RefObject<(HTMLElement | null)[]>;
  button: RefObject<HTMLSpanElement | null>;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <AppWindow
      brand={chrome.brand}
      by={chrome.by}
      menus={chrome.menus}
      active={active}
      crumb={chrome.crumbTemplate.replace("{page}", w.title)}
      badge={chrome.badge}
      kicker={w.kicker}
      title={w.title}
      lede={w.lede}
      className={className}
      style={style}
    >
      <div className={styles.discoGrid}>
        <div className={styles.panel}>
          <strong>{w.manualTitle}</strong>
          <em>{w.manualText}</em>
          <span className={running ? `${styles.run} ${styles.runOn}` : styles.run} ref={button}>
            {running ? w.running : w.launch}
          </span>
          <i className={styles.rhythm}>{w.rhythm}</i>
        </div>
        <div className={styles.panel}>
          <span className={styles.panelKicker}>{w.queueKicker}</span>
          <strong>{w.queueTitle}</strong>
          <span className={styles.queue}>
            <span ref={jobs}>{w.jobs.replace("{n}", "107")}</span>
            <i ref={pct}>19 %</i>
          </span>
          <span className={styles.bar}><i ref={bar} style={{ width: "19%" }} /></span>
          <span className={styles.counters}>
            {w.counters.map((label, i) => (
              <span key={label}>
                <em>{label}</em>
                <b
                  ref={node => { if (counters.current) counters.current[i] = node; }}
                  className={i === 2 ? styles.green : i === 3 ? styles.pink : undefined}
                >
                  0
                </b>
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className={styles.sectors}>
        <strong>{w.sectorsTitle}</strong>
        {w.sectors.map((sector, i) => (
          <span key={sector} className={i === lit ? `${styles.sector} ${styles.sectorOn}` : styles.sector}>
            <em>{sector}</em>
            <i className={styles.toggle} />
            <b>{w.sectorCount}</b>
          </span>
        ))}
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------- Overview */

export function OverviewWindow({
  chrome,
  active,
  w,
  jobs,
  lit,
  className,
  style,
}: {
  chrome: Chrome;
  active: number;
  w: {
    kicker: string; title: string; lede: string; kpis: readonly string[];
    splitTitle: string; splitCount: string; splits: readonly (readonly [string, string])[];
  };
  jobs: number;
  lit: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const values = ["278", "24", "17", String(jobs)];
  const skins = [styles.kpiPlain, styles.kpiBlue, styles.kpiGreen, styles.kpiWarm];
  return (
    <AppWindow
      brand={chrome.brand}
      by={chrome.by}
      menus={chrome.menus}
      active={active}
      crumb={chrome.crumbTemplate.replace("{page}", w.title)}
      badge={chrome.badge}
      kicker={w.kicker}
      title={w.title}
      lede={w.lede}
      className={className}
      style={style}
    >
      <div className={styles.kpis}>
        {w.kpis.map((label, i) => (
          <span key={label} className={`${styles.kpi} ${skins[i]}`}>
            <em>{label}</em>
            <strong>{values[i]}</strong>
          </span>
        ))}
      </div>

      <div className={styles.panel}>
        <span className={styles.panelHead}>
          <strong>{w.splitTitle}</strong>
          <i>{w.splitCount}</i>
        </span>
        <span className={styles.splits}>
          {w.splits.map(([label, value], i) => (
            <span key={label} className={i === lit ? `${styles.split} ${styles.splitOn}` : styles.split}>
              <em>{label}</em>
              <b>{value}</b>
            </span>
          ))}
        </span>
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------- Outreach */

export function OutreachWindow({
  chrome,
  active,
  w,
  row,
  validated,
  card,
  button,
  className,
  style,
}: {
  chrome: Chrome;
  active: number;
  w: {
    kicker: string; title: string; lede: string;
    selected: string; send: string;
    cols: readonly string[]; rows: readonly MailRow[]; states: readonly string[];
    cardTitle: string; waiting: string; doneLabel: string; edit: string; approve: string; approved: string;
  };
  row: number;
  validated: boolean;
  card: RefObject<HTMLDivElement | null>;
  button: RefObject<HTMLElement | null>;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <AppWindow
      brand={chrome.brand}
      by={chrome.by}
      menus={chrome.menus}
      active={active}
      crumb={chrome.crumbTemplate.replace("{page}", w.title)}
      badge={chrome.badge}
      kicker={w.kicker}
      title={w.title}
      lede={w.lede}
      className={className}
      style={style}
    >
      <div className={styles.panel}>
        <span className={styles.panelHead}>
          <strong>{w.selected.replace("{n}", validated ? "1" : "0")}</strong>
          <i className={validated ? `${styles.send} ${styles.sendOn}` : styles.send}>{w.send}</i>
        </span>
        <div className={styles.table}>
          <div className={`${styles.row} ${styles.head} ${styles.mailRow}`}>
            {w.cols.map(col => <em key={col}>{col}</em>)}
          </div>
          {w.rows.map((mail, i) => {
            const state = i < row || (i === row && validated) ? 0 : i === row ? 1 : 2;
            return (
              <div key={mail.name} className={`${styles.row} ${styles.mailRow} ${i === row ? styles.rowOn : ""}`}>
                <span className={styles.who}>
                  <i className={styles.avatar}>{mail.initials}</i>
                  <span>
                    <strong>{mail.name}</strong>
                    <em>{mail.who}</em>
                  </span>
                </span>
                <span className={styles.mail}>
                  <em>{mail.mail}</em>
                  <b>{mail.subject}</b>
                </span>
                <em className={`${styles.state} ${state === 0 ? styles.stateDone : state === 1 ? styles.stateWait : styles.stateDraft}`}>
                  {w.states[state]}
                </em>
              </div>
            );
          })}
        </div>
      </div>

      {/* La carte flottante : la validation humaine, à chaque message. */}
      <div className={`${styles.floatCard} ${styles.floatLow}`} ref={card}>
        <span className={styles.floatHead}>
          <ShieldCheck aria-hidden />
          {w.cardTitle}
          <i className={validated ? styles.okDone : styles.okWait}>{validated ? w.doneLabel : w.waiting}</i>
        </span>
        <span className={styles.floatLine}>{w.rows[row].name} · {w.rows[row].subject}</span>
        <span className={styles.floatBtns}>
          <i className={styles.ghost}>{w.edit}</i>
          <i className={validated ? `${styles.primary} ${styles.primaryDone}` : styles.primary} ref={button}>
            {validated ? w.approved : w.approve}
          </i>
        </span>
      </div>
    </AppWindow>
  );
}
