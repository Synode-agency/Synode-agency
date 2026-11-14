"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import { jakarta } from "../font";
import { hole } from "../hole";
import styles from "../illustrations.module.css";
import { useFitScale } from "../use-fit-scale";
import { useLoopClock, type LoopClock } from "../use-loop-clock";
import { computeFrame } from "./timeline";

/**
 * L'ILLUSTRATION « TABLEAU DE BORD COORY » (1600 × 900, boucle de 14 s).
 *
 * Reproduction à l'identique de `CLAUDE_DESIGN_TO_CODE_HANDOFF/source/CooryDashboardLight/`.
 * Le tableau de bord plein écran : le curseur ouvre l'assistant IA, une séance
 * et une relance sont créées, une tâche est cochée, un paiement arrive.
 *
 * ⚠ Le JSX ci-dessous est une conversion MÉCANIQUE de `template.original.html`
 * (`{{ x }}` → `v.x`, `sc-for` → `.map`, `sc-if` → condition) : tous
 * les styles restent inline et toutes les valeurs sont celles de l'original.
 * Ne pas y retoucher une valeur à la main : corriger l'original et
 * reconvertir. Les seuls ajouts sont la classe de la racine (le cadre
 * neutre, voir `illustrations.module.css`), le chemin du logo et le
 * cadrage `app` décrit plus bas.
 *
 * Décorative : la racine porte `aria-hidden`, rien n'y est cliquable.
 * `debugT` fige l'animation sur un instant, en secondes.
 *
 * `frame` choisit le cadrage :
 *  - `scene` (par défaut) : la scène d'origine, avec sa marge et son fond
 *    blanc ;
 *  - `app` : l'application seule, posée directement sur la page, comme la
 *    fenêtre de Nexus. On garde la même scène, recadrée sur le rectangle de
 *    l'application (40, 30, 1520 × 840) : la marge et le fond blanc
 *    disparaissent, rien ne change à l'intérieur. Demandé par Antonino le
 *    14/11 pour le hero de la page Coory.
 *
 * ⚠ Le profil en bas du menu affiche « Samuel D. » (initiales SD) : le nom
 * du vrai coach ne doit jamais être publié (décision d'Antonino du 14/11).
 * La correction est faite aussi dans le gabarit d'origine du dossier de
 * passation, pour qu'une reconversion ne le fasse pas revenir.
 */

const W = 1600;
/** Le rectangle de l'application dans la scène, d'après le gabarit d'origine. */
const APP = { left: 40, top: 30, width: 1520, height: 840 };
const CLOCK: LoopClock = { kind: "interval", length: 14, reducedT: 10.5, everyMs: 80, maxDt: 0.2 };

export function CooryDashboardLight({ debugT, frame = "scene" }: { debugT?: number; frame?: "scene" | "app" }) {
  const app = frame === "app";
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scale = useFitScale(rootRef, app ? APP.width : W);
  const t = useLoopClock(rootRef, CLOCK, debugT);
  const v = computeFrame(t, scale);
  const rootClassName = `${styles.root} ${app ? styles.dashboardLightApp : styles.dashboardLight} ${jakarta.variable}`;

  /* Les trois enveloppes du haut : celles du gabarit d'origine, ou leur
     version recadrée sur l'application. */
  const outerStyle: CSSProperties = app
    ? { boxSizing: "border-box", width: "100%" }
    : { boxSizing: "border-box", width: "100%", padding: "32px clamp(12px,3vw,40px)", background: "#FFFFFF" };
  const wrapStyle: CSSProperties = app
    ? { position: "relative", width: "100%", maxWidth: `${APP.width}px`, margin: "0 auto", aspectRatio: `${APP.width} / ${APP.height}`, overflow: "hidden" }
    : { position: "relative", width: "100%", maxWidth: "1600px", margin: "0 auto", aspectRatio: "1600 / 900", overflow: "hidden" };
  const stageTransform = app ? `${v.scaleTf} translate(-${APP.left}px, -${APP.top}px)` : `${v.scaleTf ?? ""}`;

  return (
    <div className={rootClassName} style={outerStyle}>
      <div ref={rootRef} aria-hidden="true" style={wrapStyle}>
        <div style={{ position: "absolute", left: "0", top: "0", width: "1600px", height: "900px", transformOrigin: "0 0", transform: stageTransform, color: "#1C1C28" }}>
          {" "}
          <div style={{ position: "absolute", left: "40px", top: "30px", width: "1520px", height: "840px", boxSizing: "border-box", borderRadius: "26px", background: "#F4F4F8", border: "1px solid #E6E6EE", boxShadow: "0 30px 80px rgba(40,30,90,.10),0 4px 14px rgba(40,30,90,.05)", padding: "16px", display: "grid", gridTemplateColumns: "250px minmax(0,1fr)", gap: "16px", overflow: "hidden" }}>
            {" "}
            <div style={{ boxSizing: "border-box", borderRadius: "20px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "24px 16px 18px", display: "flex", flexDirection: "column" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 6px 0 8px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- copie exacte de l'original */}
                <img src="/illustrations/coory-logo-light.png" alt="Coory" style={{ width: "136px", height: "auto", display: "block" }} />
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A9DAA" strokeWidth="1.7">
                  <rect x="4" y="4" width="16" height="16" rx="3" />
                  <path d="M9 4v16M15 10l-2 2 2 2" />
                </svg>
              </div>
              {" "}
              <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "4px" }}>
                {" "}
                {v.nav1.map((n, i) => (
                  <Fragment key={i}>
                    {" "}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "40px", padding: "0 12px", borderRadius: "11px", fontSize: "14px", whiteSpace: "nowrap", background: `${n.bg ?? ""}`, color: `${n.c ?? ""}` }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d={n.ic} />
                      </svg>
                      {hole(n.t)}
                    </div>
                    {" "}
                  </Fragment>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ height: "1px", background: "#EEEEF3", margin: "16px 6px" }} />
              {" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {" "}
                {v.nav2.map((n, i) => (
                  <Fragment key={i}>
                    {" "}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", height: "40px", padding: "0 12px", borderRadius: "11px", fontSize: "14px", whiteSpace: "nowrap", transition: "background .3s,color .3s", background: `${n.bg ?? ""}`, color: `${n.c ?? ""}` }}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d={n.ic} />
                      </svg>
                      <span style={{ flex: "1" }}>
                        {hole(n.t)}
                      </span>
                      {n.hasBadge ? (
                        <>
                          <span style={{ minWidth: "24px", height: "22px", padding: "0 6px", boxSizing: "border-box", borderRadius: "11px", background: "#F1EEFF", color: "#7C5CFA", fontSize: "11.5px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {hole(n.badge)}
                          </span>
                        </>
                      ) : null}
                    </div>
                    {" "}
                  </Fragment>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "11px", padding: "0 6px" }}>
                {" "}
                <span style={{ position: "relative", flex: "none", width: "40px", height: "40px", borderRadius: "50%", background: "#F1EEFF", border: "2px solid #7C5CFA", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12.5px", fontWeight: "700", color: "#7C5CFA" }}>
                  {"SD"}
                  <span style={{ position: "absolute", right: "-2px", bottom: "-2px", width: "11px", height: "11px", borderRadius: "50%", background: "#22A45D", border: "2px solid #FFFFFF" }} />
                </span>
                {" "}
                <div style={{ minWidth: "0", flex: "1" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {"Samuel D."}
                  </div>
                  <div style={{ fontSize: "12px", color: "#7A7D8A" }}>
                    {"Coach"}
                  </div>
                </div>
                {" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A7D8A" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ minWidth: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
              {" "}
              <div style={{ flex: "none", height: "64px", boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #ECECF2", display: "flex", alignItems: "center", gap: "10px", padding: "0 13px 0 22px" }}>
                {" "}
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#7C5CFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                </svg>
                {" "}
                <span style={{ fontSize: "16.5px", fontWeight: "600", whiteSpace: "nowrap" }}>
                  {"Tableau de bord"}
                </span>
                {" "}
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px", width: "150px", height: "40px", boxSizing: "border-box", justifyContent: "center", borderRadius: "11px", color: "#FFFFFF", fontSize: "13.5px", fontWeight: "600", transition: "transform .15s,background .2s", background: `${v.aiBg ?? ""}`, transform: `${v.aiTf ?? ""}`, boxShadow: `${v.aiSh ?? ""}` }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                    <path d="M12 2l2.2 6.3L20 10l-5.8 1.9L12 18l-2.2-6.1L4 10l5.8-1.7z" />
                  </svg>
                  {"Assistant IA"}
                </span>
                {" "}
                <span style={{ position: "relative", width: "40px", height: "40px", boxSizing: "border-box", borderRadius: "11px", border: "1px solid #ECECF2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A4D5A" strokeWidth="1.8">
                    <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" />
                  </svg>
                  <span style={{ position: "absolute", right: "-6px", top: "-7px", minWidth: "20px", height: "20px", padding: "0 4px", boxSizing: "border-box", borderRadius: "10px", background: "#7C5CFA", border: "2px solid #FFFFFF", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {"15"}
                  </span>
                </span>
                {" "}
                <span style={{ display: "flex", alignItems: "center", gap: "8px", width: "96px", height: "40px", boxSizing: "border-box", justifyContent: "center", borderRadius: "11px", background: "#16161F", color: "#FFFFFF", fontSize: "13.5px", fontWeight: "600" }}>
                  {"+ Créer"}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ flex: "none", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "14px" }}>
                {" "}
                <div style={{ height: "200px", boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1.5px solid #D9D0FF", padding: "20px 22px", display: "flex", flexDirection: "column" }}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11.5px", letterSpacing: "1.3px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                    {"PROCHAINE SÉANCE"}
                    <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "999px", background: "#EAF8EF", color: "#1F8A4C", fontSize: "12px", letterSpacing: "0" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22A45D" }} />
                      {"demain"}
                    </span>
                    <span style={{ letterSpacing: "0", fontSize: "12px" }}>
                      {"1 / 2"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ marginTop: "10px", fontSize: "34px", fontWeight: "600", letterSpacing: "-.8px", color: "#7C5CFA" }}>
                    {"08:30"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "4px", fontSize: "15px", fontWeight: "500" }}>
                    {"Run club du samedi"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "3px", fontSize: "13px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                    {"Collective · 3 inscrits · 90 min · Parc"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 11px", borderRadius: "999px", border: "1px solid #ECECF2", fontSize: "12px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6E7BF2" }} />
                      {"Running"}
                    </span>
                    <span style={{ padding: "4px 11px", borderRadius: "999px", border: "1px solid #ECECF2", fontSize: "12px" }}>
                      {"Collective"}
                    </span>
                    <span style={{ marginLeft: "auto", color: "#4A4D5A", fontSize: "15px" }}>
                      {"↗"}
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ height: "200px", boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "20px 22px", display: "flex", flexDirection: "column" }}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "15px", fontWeight: "600" }}>
                      {"Tâches"}
                    </span>
                    <span style={{ minWidth: "24px", height: "22px", padding: "0 6px", boxSizing: "border-box", borderRadius: "11px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11.5px", fontWeight: "600", transition: "background .3s,color .3s", background: `${v.taskBadgeBg ?? ""}`, color: `${v.taskBadgeC ?? ""}` }}>
                      {hole(v.taskCount)}
                    </span>
                  </div>
                  {" "}
                  <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "14px" }}>
                    {" "}
                    {v.tasks.map((k, i) => (
                      <Fragment key={i}>
                        {" "}
                        <div style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: "12px", alignItems: "start" }}>
                          {" "}
                          <span style={{ marginTop: "1px", width: "22px", height: "22px", boxSizing: "border-box", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s,border-color .3s,transform .2s", background: `${k.cbg ?? ""}`, border: `1.5px solid ${k.cb ?? ""}`, transform: `${k.ctf ?? ""}` }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "opacity .2s", opacity: `${k.op ?? ""}` }}>
                              <path d="M5 12l5 5 9-10" />
                            </svg>
                          </span>
                          {" "}
                          <div style={{ minWidth: "0", transition: "opacity .4s", opacity: `${k.top ?? ""}` }}>
                            <div style={{ fontSize: "13.5px", fontWeight: "500", lineHeight: "1.35", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: `${k.td ?? ""}` }}>
                              <span style={{ color: "#E5384F", display: `${k.ex ?? ""}` }}>
                                {"! "}
                              </span>
                              {hole(k.t)}
                            </div>
                            <div style={{ marginTop: "2px", fontSize: "12px", color: `${k.sc ?? ""}` }}>
                              {hole(k.s)}
                            </div>
                          </div>
                          {" "}
                        </div>
                        {" "}
                      </Fragment>
                    ))}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ height: "200px", boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "20px 22px", display: "flex", flexDirection: "column" }}>
                  {" "}
                  <div style={{ fontSize: "11.5px", letterSpacing: "1.3px", color: "#6B6E7B" }}>
                    {"ENCAISSÉS CETTE SEMAINE"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "12px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px" }}>
                    {" "}
                    <div style={{ minWidth: "0" }}>
                      <div style={{ fontSize: "30px", fontWeight: "600", letterSpacing: "-.8px", whiteSpace: "nowrap" }}>
                        {hole(v.cashTxt)}
                      </div>
                      <div style={{ marginTop: "4px", fontSize: "12.5px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                        {hole(v.cashSub)}
                      </div>
                    </div>
                    {" "}
                    <div style={{ flex: "none", display: "flex", gap: "7px", alignItems: "flex-end" }}>
                      {" "}
                      {v.bars.map((b, i) => (
                        <Fragment key={i}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                            <span style={{ width: "5px", borderRadius: "3px", transition: "height .6s cubic-bezier(.2,.8,.2,1)", height: `${b.h ?? ""}`, background: `${b.c ?? ""}` }} />
                            <span style={{ fontSize: "10.5px", color: `${b.lc ?? ""}`, fontWeight: `${b.fw ?? ""}` }}>
                              {hole(b.d)}
                            </span>
                          </div>
                        </Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ marginTop: "auto", display: "flex", gap: "8px", alignItems: "center" }}>
                    {" "}
                    <span style={{ padding: "5px 11px", borderRadius: "8px", background: "#EAF8EF", color: "#1F8A4C", fontSize: "12px", whiteSpace: "nowrap" }}>
                      {hole(v.cashPlan)}
                    </span>
                    {" "}
                    <span style={{ padding: "5px 11px", borderRadius: "8px", background: "#F1EEFF", color: "#7C5CFA", fontSize: "12px", whiteSpace: "nowrap", transition: "opacity .4s,transform .4s", opacity: `${v.payOp ?? ""}`, transform: `${v.payTf ?? ""}` }}>
                      {"+ 120,00 € · Lucas J."}
                    </span>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div style={{ flex: "1", minHeight: "0", display: "grid", gridTemplateColumns: "minmax(0,2.04fr) minmax(0,1fr)", gap: "14px" }}>
                {" "}
                <div style={{ boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "20px 22px", display: "flex", flexDirection: "column", minHeight: "0" }}>
                  {" "}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "15px", fontWeight: "600" }}>
                      {"Séances à venir"}
                    </span>
                    <span style={{ fontSize: "13px", color: "#7C5CFA" }}>
                      {"Voir tout"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ marginTop: "18px", flex: "1", minHeight: "0", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "26px" }}>
                    {" "}
                    <div>
                      {" "}
                      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                        <span style={{ width: "56px", height: "56px", borderRadius: "13px", background: "#F1EEFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#7C5CFA" }}>
                          <span style={{ fontSize: "11.5px" }}>
                            {"sam."}
                          </span>
                          <span style={{ fontSize: "20px", fontWeight: "600", lineHeight: "1.1" }}>
                            {"14"}
                          </span>
                        </span>
                        <div>
                          <div style={{ fontSize: "15px", fontWeight: "500" }}>
                            {"Samedi 14 novembre"}
                          </div>
                          <div style={{ marginTop: "2px", fontSize: "12.5px", color: "#6B6E7B" }}>
                            {"Demain · 2 séances"}
                          </div>
                        </div>
                      </div>
                      {" "}
                      <div style={{ position: "relative", marginTop: "16px", paddingLeft: "28px" }}>
                        {" "}
                        <span style={{ position: "absolute", left: "6px", top: "4px", bottom: "4px", width: "2px", background: "#7C5CFA", borderRadius: "1px" }} />
                        {" "}
                        <div style={{ position: "relative", padding: "11px 14px", borderRadius: "12px", background: "#F4F1FF" }}>
                          <span style={{ position: "absolute", left: "-27px", top: "20px", width: "10px", height: "10px", borderRadius: "50%", background: "#6E7BF2", border: "2px solid #FFFFFF" }} />
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600" }}>
                              {"08:30"}
                            </span>
                            <span style={{ padding: "2px 9px", borderRadius: "999px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "11.5px" }}>
                              {"Prochaine"}
                            </span>
                            <span style={{ marginLeft: "auto", fontSize: "11.5px", color: "#6E7BF2" }}>
                              {"Running"}
                            </span>
                          </div>
                          <div style={{ marginTop: "3px", fontSize: "12.5px", color: "#4A4D5A", whiteSpace: "nowrap" }}>
                            {"Run club du samedi · Collective · 3 inscrits"}
                          </div>
                        </div>
                        {" "}
                        <div style={{ position: "relative", marginTop: "6px", padding: "11px 14px" }}>
                          <span style={{ position: "absolute", left: "-27px", top: "20px", width: "10px", height: "10px", borderRadius: "50%", background: "#F2B23A", border: "2px solid #FFFFFF" }} />
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600" }}>
                              {"10:00"}
                            </span>
                            <span style={{ marginLeft: "auto", fontSize: "11.5px", color: "#C98A12" }}>
                              {"Hyrox"}
                            </span>
                          </div>
                          <div style={{ marginTop: "3px", fontSize: "12.5px", color: "#4A4D5A", whiteSpace: "nowrap" }}>
                            {"Circuit Hyrox du samedi · Collective · 4 inscrits"}
                          </div>
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div style={{ minWidth: "0" }}>
                      {" "}
                      <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                        <span style={{ width: "56px", height: "56px", borderRadius: "13px", background: "#F4F4F8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#4A4D5A" }}>
                          <span style={{ fontSize: "11.5px" }}>
                            {"lun."}
                          </span>
                          <span style={{ fontSize: "20px", fontWeight: "600", lineHeight: "1.1", color: "#1C1C28" }}>
                            {"16"}
                          </span>
                        </span>
                        <div>
                          <div style={{ fontSize: "15px", fontWeight: "500" }}>
                            {"Lundi 16 novembre"}
                          </div>
                          <div style={{ marginTop: "2px", fontSize: "12.5px", color: "#6B6E7B" }}>
                            {"Dans 3 jours · "}{hole(v.monCount)}{" séances"}
                          </div>
                        </div>
                      </div>
                      {" "}
                      <div style={{ position: "relative", marginTop: "16px", paddingLeft: "28px", height: "310px" }}>
                        {" "}
                        <span style={{ position: "absolute", left: "6px", top: "4px", bottom: "4px", width: "2px", background: "#E3E3EA", borderRadius: "1px" }} />
                        {" "}
                        {v.mon.map((r, i) => (
                          <Fragment key={i}>
                            {" "}
                            <div style={{ position: "absolute", left: "28px", right: "0", height: "56px", boxSizing: "border-box", padding: "9px 14px", borderRadius: "12px", transition: "top .55s cubic-bezier(.2,.8,.2,1),opacity .45s,background .6s,transform .55s cubic-bezier(.2,.8,.2,1)", top: `${r.top ?? ""}`, opacity: `${r.op ?? ""}`, background: `${r.bg ?? ""}`, transform: `${r.tf ?? ""}` }}>
                              {" "}
                              <span style={{ position: "absolute", left: "-27px", top: "18px", width: "10px", height: "10px", borderRadius: "50%", border: "2px solid #FFFFFF", background: `${r.dot ?? ""}` }} />
                              {" "}
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                  {hole(r.h)}
                                </span>
                                {r.isNew ? (
                                  <>
                                    <span style={{ padding: "2px 8px", borderRadius: "999px", background: "#F1EEFF", color: "#7C5CFA", fontSize: "10.5px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                                      <svg width="9" height="9" viewBox="0 0 24 24" fill="#7C5CFA">
                                        <path d="M12 2l2.2 6.3L20 10l-5.8 1.9L12 18l-2.2-6.1L4 10l5.8-1.7z" />
                                      </svg>
                                      {"ajoutée par l’assistant"}
                                    </span>
                                  </>
                                ) : null}
                                <span style={{ marginLeft: "auto", fontSize: "11.5px", color: `${r.tc ?? ""}` }}>
                                  {hole(r.tag)}
                                </span>
                              </div>
                              {" "}
                              <div style={{ marginTop: "3px", fontSize: "12.5px", color: "#4A4D5A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {hole(r.d)}
                              </div>
                              {" "}
                            </div>
                            {" "}
                          </Fragment>
                        ))}
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ minHeight: "0", display: "flex", flexDirection: "column", gap: "14px" }}>
                  {" "}
                  <div style={{ flex: "none", boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "20px 22px" }}>
                    {" "}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "15px", fontWeight: "600" }}>
                        {"Programmes en cours"}
                      </span>
                      <span style={{ fontSize: "13px", color: "#7C5CFA" }}>
                        {"Voir tout"}
                      </span>
                    </div>
                    {" "}
                    <div style={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                      {" "}
                      {v.progs.map((p, i) => (
                        <Fragment key={i}>
                          {" "}
                          <div style={{ display: "grid", gridTemplateColumns: "38px minmax(0,1fr) auto", gap: "12px", alignItems: "center", padding: "11px 0", borderBottom: `${p.bb ?? ""}` }}>
                            {" "}
                            <span style={{ width: "38px", height: "38px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600", background: `${p.abg ?? ""}`, color: `${p.ac ?? ""}` }}>
                              {hole(p.i)}
                            </span>
                            {" "}
                            <div style={{ minWidth: "0" }}>
                              <div style={{ fontSize: "14px", fontWeight: "500", whiteSpace: "nowrap" }}>
                                {hole(p.n)}
                              </div>
                              <div style={{ marginTop: "2px", fontSize: "12px", color: "#6B6E7B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {hole(p.s)}
                              </div>
                            </div>
                            {" "}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "7px" }}>
                              <span style={{ fontSize: "12px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                                {hole(p.w)}
                              </span>
                              <span style={{ position: "relative", width: "84px", height: "4px", borderRadius: "2px", background: "#ECECF2", overflow: "hidden" }}>
                                <span style={{ position: "absolute", left: "0", top: "0", bottom: "0", borderRadius: "2px", background: "#7C5CFA", transition: "width .8s cubic-bezier(.2,.8,.2,1)", width: `${p.pw ?? ""}` }} />
                              </span>
                            </div>
                            {" "}
                          </div>
                          {" "}
                        </Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ flex: "1", minHeight: "0", boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "20px 22px" }}>
                    {" "}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "15px", fontWeight: "600" }}>
                        {"Activité financière"}
                      </span>
                      <span style={{ fontSize: "13px", color: "#7C5CFA" }}>
                        {"Voir tout"}
                      </span>
                    </div>
                    {" "}
                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #EEEEF3" }}>
                      <div style={{ minWidth: "0" }}>
                        <div style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
                          {hole(v.paidN)}{" paiements reçus"}
                        </div>
                        <div style={{ marginTop: "2px", fontSize: "12px", color: "#6B6E7B" }}>
                          {"Ce mois-ci"}
                        </div>
                      </div>
                      <span style={{ fontSize: "14.5px", fontWeight: "500", whiteSpace: "nowrap" }}>
                        {hole(v.paidTxt)}
                      </span>
                    </div>
                    {" "}
                    <div style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ minWidth: "0" }}>
                        <div style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
                          {hole(v.dueN)}{" séances à encaisser"}
                        </div>
                        <div style={{ marginTop: "2px", fontSize: "12px", color: "#E5384F", whiteSpace: "nowrap" }}>
                          {"Dont "}{hole(v.lateN)}{" en retard"}
                        </div>
                      </div>
                      <span style={{ fontSize: "14.5px", fontWeight: "500", color: "#E5384F", whiteSpace: "nowrap" }}>
                        {hole(v.dueTxt)}
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "944px", top: "116px", width: "430px", boxSizing: "border-box", borderRadius: "18px", background: "#FFFFFF", border: "1px solid #E3DDFF", boxShadow: "0 24px 60px rgba(60,40,140,.16),0 3px 10px rgba(60,40,140,.06)", padding: "16px 18px 18px", transformOrigin: "92% 0", transition: "opacity .28s,transform .35s cubic-bezier(.2,.8,.2,1)", opacity: `${v.popOp ?? ""}`, transform: `${v.popTf ?? ""}` }}>
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <span style={{ width: "30px", height: "30px", borderRadius: "9px", background: "#7C5CFA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M12 2l2.2 6.3L20 10l-5.8 1.9L12 18l-2.2-6.1L4 10l5.8-1.7z" />
                </svg>
              </span>
              <span style={{ fontSize: "14.5px", fontWeight: "600" }}>
                {"Assistant IA"}
              </span>
              <span style={{ marginLeft: "auto", fontSize: "11.5px", color: "#9A9DAA" }}>
                {"Coory"}
              </span>
            </div>
            {" "}
            <div style={{ marginTop: "14px", minHeight: "64px", boxSizing: "border-box", borderRadius: "12px", background: "#F7F7FA", border: "1px solid #ECECF2", padding: "11px 13px", fontSize: "13.5px", lineHeight: "1.45", color: "#1C1C28" }}>
              {hole(v.typed)}
              <span style={{ display: "inline-block", width: "2px", height: "15px", marginLeft: "1px", verticalAlign: "-2px", background: "#7C5CFA", opacity: `${v.caretOp ?? ""}` }} />
            </div>
            {" "}
            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {" "}
              {v.thinking ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12.5px", color: "#6B6E7B" }}>
                    <span style={{ display: "flex", gap: "3px" }}>
                      {v.dots.map((d, i) => (
                        <Fragment key={i}>
                          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#7C5CFA", opacity: `${d ?? ""}` }} />
                        </Fragment>
                      ))}
                    </span>
                    {"Je m’en occupe…"}
                  </div>
                </>
              ) : null}
              {" "}
              {v.replies.map((a, i) => (
                <Fragment key={i}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 11px", borderRadius: "11px", background: "#F6F3FF", transition: "opacity .35s,transform .35s", opacity: `${a.op ?? ""}`, transform: `${a.tf ?? ""}` }}>
                    <span style={{ flex: "none", width: "20px", height: "20px", borderRadius: "50%", background: "#22A45D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                    </span>
                    <div style={{ minWidth: "0" }}>
                      <div style={{ fontSize: "13px", fontWeight: "600" }}>
                        {hole(a.t)}
                      </div>
                      <div style={{ marginTop: "1px", fontSize: "12px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                        {hole(a.s)}
                      </div>
                    </div>
                  </div>
                  {" "}
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", width: "0", height: "0", transition: "left 1.05s cubic-bezier(.45,.05,.25,1),top 1.05s cubic-bezier(.45,.05,.25,1),opacity .4s", left: `${v.curX ?? ""}`, top: `${v.curY ?? ""}`, opacity: `${v.curOp ?? ""}` }}>
            {" "}
            <span style={{ position: "absolute", left: "-16px", top: "-16px", width: "32px", height: "32px", borderRadius: "50%", background: "rgba(124,92,250,.22)", transition: "transform .35s,opacity .35s", transform: `${v.ripTf ?? ""}`, opacity: `${v.ripOp ?? ""}` }} />
            {" "}
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ position: "absolute", left: "-3px", top: "-2px", transition: "transform .12s", transform: `${v.curTf ?? ""}`, filter: "drop-shadow(0 2px 3px rgba(0,0,0,.22))" }}>
              <path d="M4 2l16 9.5-7 1.6-3.6 6.4z" fill="#16161F" stroke="#FFFFFF" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
}
