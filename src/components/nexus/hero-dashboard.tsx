"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Check, Globe, LayoutDashboard, Loader, Search, Send, ShieldCheck, Target, TriangleAlert, Users,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import {
  AT, KPIS, NEW_ROWS, ROWS, ROW_H, SCROLL_Y, SPLIT, W,
  copyFor, easeInOut, easeOut, easeOutBack, span,
} from "./data";
import styles from "./hero-dashboard.module.css";

/**
 * LE TABLEAU DE BORD NEXUS, DANS LE HERO DE SA PAGE.
 *
 * Une reproduction animée de la vue d'ensemble de l'outil, avec deux cartes
 * flottantes : la fiche du dernier lead trouvé, et l'aperçu du message
 * préparé pour lui.
 *
 * ── Le piège, à ne pas défaire ──────────────────────────────────────────
 * La scène est dessinée sur une base FIXE de 1600 × 900px et tout y est posé
 * au pixel. L'adaptation passe par une MISE À L'ÉCHELLE, jamais par une mise
 * en page qui se replie : la scène garde ses 1600px et porte un
 * `transform: scale(largeur réelle / 1600)`. C'est ce qui garantit qu'à
 * 375px rien n'est coupé, rien ne se réorganise, et qu'il n'y a jamais de
 * défilement horizontal.
 *
 * Tout ce qui bouge à chaque image est écrit DIRECTEMENT dans le DOM par
 * des refs, et aucune transition CSS ne porte sur ces propriétés : la
 * transition et l'horloge se battraient.
 * ────────────────────────────────────────────────────────────────────────
 *
 * ⚠ LE LOGO. `public/demos/logoN.png` ne contient que le SYMBOLE « N », pas
 * le mot. La barre latérale affiche donc le symbole puis le mot « Nexus »
 * écrit à côté. Le jour où un fichier complet arrive, c'est l'image qui
 * remplace les deux, pas l'inverse : ne pas recomposer un logo à la main.
 *
 * Décoratif : le conteneur porte `aria-hidden`. Le contexte du projet et ce
 * que l'outil fait sont écrits en clair dans les sections suivantes.
 */

const MENU_ICONS = [LayoutDashboard, Search, Users, Send, TriangleAlert];
const KPI_ICONS = [Users, Target, Send, Loader];
/** Le périmètre de l'anneau de score : 2π × 16. */
const RING = 100.53;

export function HeroDashboard({ locale }: { locale: Locale }) {
  const c = copyFor(locale);

  const box = useRef<HTMLDivElement | null>(null);
  const [k, setK] = useState(0);
  const [still, setStill] = useState(false);

  /* Les états discrets : une poignée par boucle, pas un par image. */
  const [run, setRun] = useState(false);
  const [leads, setLeads] = useState(0);
  const [lead, setLead] = useState(0);
  const [mail, setMail] = useState(-1);
  const [checks, setChecks] = useState(0);
  const [validated, setValidated] = useState(false);

  const kpis = useRef<(HTMLElement | null)[]>([]);
  const splits = useRef<(HTMLSpanElement | null)[]>([]);
  const splitCount = useRef<HTMLElement | null>(null);
  const discoPct = useRef<HTMLElement | null>(null);
  const discoJobs = useRef<HTMLSpanElement | null>(null);
  const discoBar = useRef<HTMLSpanElement | null>(null);
  const launch = useRef<HTMLSpanElement | null>(null);
  const scroller = useRef<HTMLDivElement | null>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const fresh = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const ring = useRef<SVGCircleElement | null>(null);
  const ringVal = useRef<HTMLElement | null>(null);
  const body = useRef<HTMLSpanElement | null>(null);
  const caret = useRef<HTMLElement | null>(null);
  const ready = useRef<HTMLElement | null>(null);
  const review = useRef<HTMLElement | null>(null);

  /* ---- La mise à l'échelle ----
     L'observateur est posé dès que l'élément existe, et une première mesure
     est prise tout de suite : sans elle, la scène resterait à l'échelle 0
     jusqu'au premier redimensionnement. */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => setK(el.clientWidth / W);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---- L'horloge ---- */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setStill(true));
      return;
    }

    let raf = 0;
    let t0 = 0;
    let running = false;

    const frame = (now: number) => {
      if (!t0) t0 = now;
      const t = (now - t0) % AT.loop;
      paint(t);
      raf = requestAnimationFrame(frame);
    };

    /* Une seule fonction d'image pour toute la scène. */
    const paint = (t: number) => {
      const count = easeOut(span(t, 0, AT.countTo));
      const in1 = easeOut(span(t, AT.lead1, AT.lead1 + AT.leadMs));
      const in2 = easeOut(span(t, AT.lead2, AT.lead2 + AT.leadMs));
      const gone = span(t, AT.exitFrom, AT.exitTo);

      /* Les quatre chiffres clés. « Jobs en cours » suit le lancement. */
      KPIS.forEach((kpi, i) => {
        const node = kpis.current[i];
        if (!node) return;
        let value = Math.round(kpi.value * count);
        if (i === 0) value += Math.round(in1) + Math.round(in2);
        if (i === 1) value += Math.round(in2);
        if (i === 3) value = Math.round(12 * easeOut(span(t, AT.press, AT.jobsTo)) * (1 - span(t, AT.runTo, AT.runTo + 400)));
        const next = String(value);
        if (node.textContent !== next) node.textContent = next;
      });

      /* Les douze statuts, et le total de la carte. */
      let total = 0;
      SPLIT.forEach((base, i) => {
        let value = Math.round(base * count);
        if (i === 0) value += Math.round(in1) + Math.round(in2);
        if (i === 3) value += Math.round(in2);
        total += value;
        const node = splits.current[i];
        if (node && node.textContent !== String(value)) node.textContent = String(value);
      });
      if (splitCount.current) {
        const next = c.splitCount(total);
        if (splitCount.current.textContent !== next) splitCount.current.textContent = next;
      }

      /* La progression Discovery. */
      const pct = 19 + 15 * easeInOut(span(t, AT.discoFrom, AT.discoTo));
      if (discoPct.current) {
        const next = `${pct.toFixed(0)} %`;
        if (discoPct.current.textContent !== next) discoPct.current.textContent = next;
      }
      if (discoJobs.current) {
        const next = c.discoJobs(Math.round((570 * pct) / 100));
        if (discoJobs.current.textContent !== next) discoJobs.current.textContent = next;
      }
      if (discoBar.current) discoBar.current.style.width = `${pct.toFixed(2)}%`;

      /* Le bouton : il pulse, s'enfonce, puis tourne. */
      if (launch.current) {
        const pulse = t >= AT.pulseFrom && t < AT.pulseTo
          ? 3 + 4 * Math.abs(Math.sin(((t - AT.pulseFrom) / 900) * Math.PI * 2))
          : 0;
        launch.current.style.boxShadow = pulse ? `0 0 0 ${pulse.toFixed(1)}px rgb(47 107 255 / 22%)` : "none";
        const press = t >= AT.pressFrom && t < AT.press;
        launch.current.style.transform = press ? "scale(.94)" : "scale(1)";
      }

      /* Le défilement du contenu. */
      if (scroller.current) {
        const down = easeInOut(span(t, AT.scrollDownFrom, AT.scrollDownTo));
        const up = easeInOut(span(t, AT.scrollUpFrom, AT.scrollUpTo));
        scroller.current.style.transform = `translateY(${(-SCROLL_Y * (down - up)).toFixed(1)}px)`;
      }

      /* Les lignes du tableau descendent à chaque nouveau lead. */
      const shift = in1 + in2;
      rows.current.forEach((node, i) => {
        if (node) node.style.transform = `translateY(${((i + shift) * ROW_H).toFixed(1)}px)`;
      });
      if (fresh.current[0]) {
        fresh.current[0].style.transform = `translateY(${(in2 * ROW_H).toFixed(1)}px)`;
        fresh.current[0].style.opacity = in1.toFixed(3);
      }
      if (fresh.current[1]) {
        fresh.current[1].style.transform = "translateY(0px)";
        fresh.current[1].style.opacity = in2.toFixed(3);
      }

      /* Les deux cartes flottantes : entrée, flottement, sortie. */
      [AT.cardLeft, AT.cardRight].forEach((from, i) => {
        const node = cards.current[i];
        if (!node) return;
        const p = easeOutBack(span(t, from, from + 900));
        const fade = span(t, from, from + 450);
        const dx = (i === 0 ? -260 : 260) * (1 - p);
        const dy = (i === 0 ? 120 : 140) * (1 - p) + 60 * gone;
        const rot = (i === 0 ? -9 : 9) * (1 - p) + (i === 0 ? -2 : 2) * gone;
        const float = 4 * Math.sin((t / 10000) * Math.PI * 2 + i * 2);
        const scale = (0.82 + 0.18 * p) * (1 - 0.06 * gone);
        const blur = 10 * (1 - fade) + 6 * gone;
        node.style.transform = `translate(${dx.toFixed(1)}px, ${(dy + float).toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        node.style.opacity = (fade * (1 - gone)).toFixed(3);
        node.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";
      });

      /* L'anneau de score du lead affiché. */
      const which = t >= AT.lead2 ? 1 : 0;
      const shown = which === 0 ? AT.lead1 : AT.lead2;
      const score = which === 0 ? 64 : 78;
      const fill = easeOut(span(t, shown, shown + 1200));
      if (ring.current) ring.current.style.strokeDashoffset = `${(RING * (1 - (score / 100) * fill)).toFixed(2)}`;
      if (ringVal.current) {
        const next = String(Math.round(score * fill));
        if (ringVal.current.textContent !== next) ringVal.current.textContent = next;
      }

      /* Le message : il s'écrit lettre par lettre. */
      const mailFrom = t >= AT.mail2 ? AT.mail2 : AT.mail1;
      const text = c.bodies[t >= AT.mail2 ? 1 : 0];
      const typed = span(t, mailFrom, mailFrom + AT.typeMs);
      if (body.current) {
        const next = t < AT.mail1 ? "" : text.slice(0, Math.round(text.length * typed));
        if (body.current.textContent !== next) body.current.textContent = next;
      }
      if (caret.current) {
        const writing = t >= AT.mail1 && typed < 1;
        caret.current.style.opacity = writing && Math.floor(t / 420) % 2 === 0 ? "1" : "0";
      }
      const done = (t >= AT.mail1 + AT.typeMs ? 1 : 0) + (t >= AT.mail2 + AT.typeMs ? 1 : 0);
      if (ready.current && ready.current.textContent !== String(done)) ready.current.textContent = String(done);
      const inReview = t >= AT.mail1 && typed < 1 ? "1" : "0";
      if (review.current && review.current.textContent !== inReview) review.current.textContent = inReview;

      /* Les états discrets. */
      const isRun = t >= AT.press && t < AT.runTo;
      setRun(prev => (prev === isRun ? prev : isRun));
      const n = t >= AT.lead2 ? 2 : t >= AT.lead1 ? 1 : 0;
      setLeads(prev => (prev === n ? prev : n));
      setLead(prev => (prev === which ? prev : which));
      const state = t < AT.mail1 ? -1 : validatedAt(t) ? 2 : typed < 1 ? 0 : 1;
      setMail(prev => (prev === state ? prev : state));
      const ticks = [300, 800, 1300].filter(d => t >= shown + d).length;
      setChecks(prev => (prev === ticks ? prev : ticks));
      const ok = t >= AT.validated;
      setValidated(prev => (prev === ok ? prev : ok));
    };

    const validatedAt = (t: number) => t >= AT.validated;

    const start = () => { if (running) return; running = true; t0 = 0; raf = requestAnimationFrame(frame); };
    const stop = () => { if (!running) return; running = false; cancelAnimationFrame(raf); };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.15 });
    io.observe(el);
    return () => { io.disconnect(); stop(); };
  }, [c]);

  /* L'état figé : celui de 8,8s, deux cartes visibles et Delta Bâti en fiche. */
  const sLeads = still ? 2 : leads;
  const sLead = still ? 1 : lead;
  const sMail = still ? 1 : mail;
  const sChecks = still ? 3 : checks;
  const sRun = still ? true : run;
  const score = sLead === 0 ? 64 : 78;

  return (
    <div className={styles.wrap} ref={box} aria-hidden>
      <div className={styles.scene} style={{ transform: `scale(${k})` }}>
        <div className={styles.win}>
          {/* ---- La barre latérale ---- */}
          <div className={styles.side}>
            {/* Le symbole du logo Nexus, puis le mot. Le fichier ne contient
                que le « N » : le mot reste donc écrit à côté, dans la
                typographie du site. */}
            <span className={styles.brand}>
              <Image className={styles.mark} src="/demos/logoN.png" alt="Nexus" width={613} height={530} />
              <span className={styles.logo}>Nexus</span>
            </span>
            <span className={styles.by}>{c.brand}</span>
            <span className={styles.workspace}>{c.workspace}</span>
            <div className={styles.menus}>
              {c.menus.map((menu, i) => {
                const Icon = MENU_ICONS[i];
                return (
                  <span key={menu} className={i === 0 ? `${styles.menu} ${styles.menuOn}` : styles.menu}>
                    <Icon aria-hidden />
                    {menu}
                  </span>
                );
              })}
            </div>
            <span className={styles.safe}><ShieldCheck aria-hidden />{c.safe}</span>
            <i className={styles.sideRule} />
            <span className={styles.me}>
              <i>LB</i>
              <span>
                <strong>{c.admin}</strong>
                <em>{c.email}</em>
              </span>
            </span>
          </div>

          {/* ---- La barre du haut ---- */}
          <div className={styles.top}>
            <span className={styles.crumb}>{c.crumb}</span>
            <span className={sRun ? `${styles.launch} ${styles.launchRun}` : styles.launch} ref={launch}>
              {sRun ? <Loader className={styles.spin} aria-hidden /> : <Globe aria-hidden />}
              {sRun ? c.running : c.launch}
            </span>
            <span className={styles.topRight}>
              <em className={styles.test}>● {c.testMode}</em>
              <ShieldCheck className={styles.topShield} aria-hidden />
            </span>
          </div>

          {/* ---- Le contenu ---- */}
          <div className={styles.content}>
            <div className={styles.scroll} ref={scroller}>
              <span className={styles.kicker}>{c.kicker}</span>
              <strong className={styles.h1}>{c.title}</strong>
              <span className={styles.lede}>{c.lede}</span>

              {/* Les quatre chiffres clés */}
              <div className={styles.kpis}>
                {KPIS.map((kpi, i) => {
                  const Icon = KPI_ICONS[i];
                  const hot = i === 3 && sRun;
                  return (
                    <span
                      key={c.kpis[i].title}
                      className={hot ? `${styles.kpi} ${styles.kpiHot}` : styles.kpi}
                      style={{ background: kpi.bg, borderColor: kpi.border }}
                    >
                      <i className={styles.kpiIcon} style={{ color: kpi.icon }}><Icon aria-hidden /></i>
                      <em>{c.kpis[i].title}</em>
                      <strong ref={node => { kpis.current[i] = node; }}>{still ? kpi.value : 0}</strong>
                      <span>{c.kpis[i].sub}</span>
                    </span>
                  );
                })}
              </div>

              {/* La répartition des leads */}
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span>
                    <strong>{c.splitTitle}</strong>
                    <em>{c.splitSub}</em>
                  </span>
                  <i className={styles.cardCount} ref={splitCount}>{c.splitCount(0)}</i>
                </div>
                <div className={styles.splits}>
                  {c.splitLabels.map((label, i) => (
                    <span key={label} className={i === 0 ? `${styles.split} ${styles.splitOn}` : styles.split}>
                      <i className={styles.splitMark} />
                      <em>{label}</em>
                      <span ref={node => { splits.current[i] = node; }}>{still ? SPLIT[i] : 0}</span>
                      <b>↗</b>
                    </span>
                  ))}
                </div>
              </div>

              {/* La progression Discovery */}
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span>
                    <strong>{c.discoTitle}</strong>
                    <em>{c.discoSub}</em>
                  </span>
                  <i className={styles.link}>{c.discoLink}</i>
                </div>
                <div className={styles.disco}>
                  <strong ref={discoPct}>19 %</strong>
                  <span ref={discoJobs}>{c.discoJobs(107)}</span>
                </div>
                <span className={styles.bar}><i ref={discoBar} style={{ width: "19%" }} /></span>
                <span className={styles.fails}>{c.discoFails}</span>
              </div>

              {/* Les derniers leads */}
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <span>
                    <strong>{c.leadsTitle}</strong>
                    <em>{c.leadsSub}</em>
                  </span>
                  <i className={styles.link}>{c.leadsLink}</i>
                </div>
                <div className={styles.cols}>
                  {c.cols.map(col => <em key={col}>{col}</em>)}
                </div>
                <div className={styles.rows}>
                  {NEW_ROWS.map((row, i) => (
                    <div
                      key={row.initials}
                      ref={node => { fresh.current[i] = node; }}
                      className={`${styles.row} ${sLeads > i ? styles.rowNew : ""}`}
                      style={still ? undefined : { opacity: 0 }}
                    >
                      <i className={styles.avatar}>{row.initials}</i>
                      <span className={styles.who}>
                        <strong>{c.newNames[i]}</strong>
                        <em>{c.newSectors[i]}</em>
                        <b>{c.newSites[i]}</b>
                      </span>
                      <span className={styles.icp}>{c.icpOf(row.icp)}</span>
                      <em className={`${styles.pill} ${row.status === 2 ? styles.pillNew : styles.pillQual}`}>
                        {c.statuses[row.status]}
                      </em>
                      <span className={styles.date}>{c.now}</span>
                      <i className={styles.open}>{c.open}</i>
                    </div>
                  ))}
                  {ROWS.map((row, i) => (
                    <div
                      key={row.initials + i}
                      ref={node => { rows.current[i] = node; }}
                      className={styles.row}
                      style={{ transform: `translateY(${(i + (still ? 2 : 0)) * ROW_H}px)` }}
                    >
                      <i className={styles.avatar}>{row.initials}</i>
                      <span className={styles.who}>
                        <strong>{c.names[i]}</strong>
                        <em>{c.sectors[i]}</em>
                        <b>{c.sites[i]}</b>
                      </span>
                      <span className={styles.icp}>{c.icpOf(row.icp)}</span>
                      <em className={`${styles.pill} ${row.status === 0 ? styles.pillPhone : styles.pillLow}`}>
                        {c.statuses[row.status]}
                      </em>
                      <span className={styles.date}>{row.date}</span>
                      <i className={styles.open}>{c.open}</i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- La fiche lead ---- */}
        <div
          className={`${styles.float} ${styles.sheet}`}
          ref={node => { cards.current[0] = node; }}
          style={still ? undefined : { opacity: 0 }}
        >
          <div className={styles.floatHead}>
            <strong>{c.sheetTitle}</strong>
            {sLeads > 0 && <em className={styles.freshTag}>● {c.fresh}</em>}
          </div>
          <div className={styles.sheetWho}>
            <i className={styles.sheetMark}>{NEW_ROWS[sLead].initials}</i>
            <span>
              <strong>{c.newNames[sLead]}</strong>
              <em>{c.newSectors[sLead]}</em>
              <b>{c.newSites[sLead]}</b>
            </span>
          </div>
          <div className={styles.scoreBox}>
            <span className={styles.ring}>
              <svg viewBox="0 0 40 40" aria-hidden>
                <circle className={styles.ringBack} cx={20} cy={20} r={16} />
                <circle
                  className={styles.ringFill}
                  ref={ring}
                  cx={20}
                  cy={20}
                  r={16}
                  strokeDasharray={RING}
                  strokeDashoffset={still ? RING * (1 - score / 100) : RING}
                />
              </svg>
              <strong ref={ringVal}>{still ? score : 0}</strong>
              <em>{c.scoreOf}</em>
            </span>
            <span className={styles.scoreLines}>
              <span>
                <em>{c.statusLabel}</em>
                <i className={`${styles.pill} ${sLead === 0 ? styles.pillNew : styles.pillQual}`}>
                  {c.statuses[sLead === 0 ? 2 : 3]}
                </i>
              </span>
              <span>
                <em>{c.aiLabel}</em>
                <b>{c.ai[sLead]}</b>
              </span>
            </span>
          </div>
          <div className={styles.checks}>
            {c.checks.map((check, i) => (
              <span key={check} className={i < sChecks ? `${styles.check} ${styles.checkOn}` : styles.check}>
                <i>{i < sChecks ? <Check aria-hidden /> : null}</i>
                {check}
              </span>
            ))}
          </div>
          <i className={styles.sheetBtn}>{c.open}</i>
        </div>

        {/* ---- L'aperçu Outreach ---- */}
        <div
          className={`${styles.float} ${styles.out}`}
          ref={node => { cards.current[1] = node; }}
          style={still ? undefined : { opacity: 0 }}
        >
          <div className={styles.floatHead}>
            <strong>{c.outTitle}</strong>
            <em className={styles.link}>{c.outLink}</em>
          </div>
          <div className={styles.counters}>
            <span className={styles.counter}>
              <em>{c.ready}</em>
              <strong ref={ready}>{still ? 1 : 0}</strong>
            </span>
            <span className={styles.counter}>
              <em>{c.review}</em>
              <strong className={styles.pink} ref={review}>0</strong>
            </span>
          </div>
          <div className={styles.mail}>
            <span className={styles.mailHead}>
              <em>{c.to}</em>
              <i className={[
                styles.state,
                sMail === 0 ? styles.stateGen : "",
                sMail === 1 ? styles.stateDraft : "",
                sMail === 2 ? styles.stateReady : "",
              ].filter(Boolean).join(" ")}>
                {sMail === 2 ? c.sendable : sMail === 1 ? c.draft : c.generating}
              </i>
            </span>
            <span className={styles.subject}>{c.subjectLabel} {c.subjects[sLead]}</span>
            <p className={styles.bodyText}>
              <span ref={body}>{still ? c.bodies[sLead] : ""}</span>
              <i className={styles.caret} ref={caret} />
            </p>
          </div>
          <div className={styles.outFoot}>
            <em>{c.humanCheck}</em>
            <i className={validated ? `${styles.send} ${styles.sent}` : styles.send}>
              {validated ? c.validatedLabel : c.validate}
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
