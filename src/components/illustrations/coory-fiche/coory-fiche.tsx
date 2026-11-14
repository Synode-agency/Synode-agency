"use client";

import { Fragment, useRef } from "react";
import { jakarta } from "../font";
import { hole } from "../hole";
import styles from "../illustrations.module.css";
import { useFitScale } from "../use-fit-scale";
import { useLoopClock, type LoopClock } from "../use-loop-clock";
import { computeFrame } from "./timeline";

/**
 * ILL-03 · FICHE SPORTIF « LUCAS J. » (cadre 560 × 400, boucle de 12 s).
 *
 * Fenêtre claire, coupée à droite : les onglets Programme, Séances puis
 * Paiements s'allument tour à tour ; la jauge du programme se remplit, les
 * prochaines séances arrivent, le montant encaissé monte jusqu'à 120 €.
 *
 * Deux niveaux, comme dans la planche d'origine :
 *  - le cadre de la planche, 560 × 400, qui coupe l'écran à droite, réduit
 *    d'un bloc à la largeur disponible (`transform: scale(largeur / 560)`) ;
 *  - dedans, posé à (40, 40) sur 610 × 320, le composant ILL-03 lui-même :
 *    une scène de 1220 × 640 réduite à sa largeur (donc à 0,5).
 * L'échelle de la scène se mesure avec `clientWidth`, qui ignore la
 * réduction du cadre : elle reste 0,5, comme dans la planche. (L'original
 * mesure `getBoundingClientRect`, ce qui revient au même dans la planche,
 * où rien ne réduit le cadre, mais compterait la réduction deux fois ici.)
 *
 * Reproduction à l'identique de `COORY_DESIGN_TO_CODE_HANDOFF/components/ILL-03/`.
 * ⚠ Le JSX de la scène est une conversion MÉCANIQUE de `template.original.html` :
 * ne pas y retoucher une valeur à la main, corriger l'original et reconvertir.
 * L'horloge est celle de l'original : un pas toutes les 40 ms, borné à 0,2 s,
 * en pause hors écran, figée à t = 2,5 s sous `prefers-reduced-motion`.
 *
 * Décorative : la racine porte `aria-hidden`. `debugT` fige l'image.
 */

const FRAME_W = 560;
const SCENE_W = 1220;
const CLOCK: LoopClock = { kind: "interval", length: 12, reducedT: 2.5, everyMs: 40, maxDt: 0.2 };

export function CooryFiche({ debugT }: { debugT?: number }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const frameScale = useFitScale(rootRef, FRAME_W);
  const scale = useFitScale(wrapRef, SCENE_W);
  const t = useLoopClock(wrapRef, CLOCK, debugT);
  const v = computeFrame(t, scale);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles.planche} ${jakarta.variable}`}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", aspectRatio: `${FRAME_W} / 400`, overflow: "hidden" }}
    >
      <div style={{ position: "relative", width: `${FRAME_W}px`, height: "400px", overflow: "hidden", transformOrigin: "0 0", transform: `scale(${frameScale})` }}>
        <div style={{ position: "absolute", left: "40px", top: "40px", width: "610px", height: "320px" }}>
          {/* La boîte d'accueil que le moteur d'origine pose autour d'un composant importé (`dc-import`, 610 × 320). */}
          <div style={{ width: "610px", height: "320px" }}>
          <div ref={wrapRef} aria-hidden="true" style={{ position: "relative", width: "100%", aspectRatio: "1220/640", overflow: "hidden", fontFamily: "'Plus Jakarta Sans','Helvetica Neue',Helvetica,Arial,sans-serif", color: "#1C1C28" }}>
            {" "}
            <div style={{ position: "absolute", left: "0", top: "0", width: "1220px", height: "640px", boxSizing: "border-box", borderRadius: "32px 0 0 32px", border: "1px solid #E6E6EE", borderRight: "0", background: "#F4F4F8", overflow: "hidden", transformOrigin: "0 0", transform: `${v.scaleTf ?? ""}` }}>
              {" "}
              <div style={{ position: "absolute", left: "20px", top: "20px", width: "270px", height: "600px", boxSizing: "border-box", borderRadius: "22px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "28px 14px 18px", display: "flex", flexDirection: "column" }}>
                {" "}
                {/* eslint-disable-next-line @next/next/no-img-element -- copie exacte de l'original */}
                <img src="/illustrations/coory-logo-light.png" alt="Coory" style={{ height: "30px", width: "auto", alignSelf: "flex-start", margin: "0 0 26px 12px", display: "block" }} />
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
                    </svg>
                    {"Tableau de bord"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4" />
                    </svg>
                    {"Agenda"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", fontWeight: "500", color: "#1C1C28", background: "#F1EEFF" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C5CFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 11a3 3 0 1 0 0-6M22 20c0-3-2-5-5-5" />
                    </svg>
                    {"Sportifs"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h9l4 4v14H6zM9 12h7M9 16h7" />
                    </svg>
                    {"Programmes"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12v18H6zM9 7h6M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" />
                    </svg>
                    {"Comptabilité"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H3zM21 5h-7a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h7z" />
                    </svg>
                    {"Bibliothèque"}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ height: "1px", background: "#ECECF2", margin: "12px 14px" }} />
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3l2 5.5L19.5 10 14 12l-2 6-2-6-5.5-2L10 8.5z" />
                    </svg>
                    {"Assistant IA"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 6l2 2 3-3M11 7h9M4 13l2 2 3-3M11 14h9M11 20h9" />
                    </svg>
                    {"Tâches"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h6l2 2h10v11H3z" />
                    </svg>
                    {"Documents"}
                  </div>
                  {" "}
                  <div style={{ height: "44px", display: "flex", alignItems: "center", gap: "14px", padding: "0 14px", borderRadius: "12px", fontSize: "19px", color: "#4A4D5A" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" />
                    </svg>
                    {"Notifications"}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "12px", padding: "0 8px" }}>
                  <span style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#F1EEFF", color: "#7C5CFA", fontSize: "15px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {"SD"}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "17px", fontWeight: "600" }}>
                      {"Samuel D."}
                    </span>
                    <span style={{ fontSize: "16px", color: "#6B6E7B" }}>
                      {"Coach"}
                    </span>
                  </span>
                </div>
                {" "}
              </div>
              {" "}
              <div style={{ position: "absolute", left: "306px", top: "20px", width: "894px", height: "76px", boxSizing: "border-box", borderRadius: "22px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "0 22px 0 26px", display: "flex", alignItems: "center", gap: "12px", whiteSpace: "nowrap" }}>
                {" "}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C5CFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21c0-4 3-6 7-6s7 2 7 6M17 11a3 3 0 1 0 0-6M22 20c0-3-2-5-5-5" />
                </svg>
                {" "}
                <span style={{ fontSize: "21px", color: "#6B6E7B" }}>
                  {"← Sportifs"}
                </span>
                <span style={{ fontSize: "21px", color: "#9A9DAA" }}>
                  {"·"}
                </span>
                <span style={{ fontSize: "21px", fontWeight: "600" }}>
                  {"Lucas J."}
                </span>
                {" "}
                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
                  {" "}
                  <span style={{ height: "44px", display: "flex", alignItems: "center", gap: "8px", padding: "0 18px", borderRadius: "12px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "18px", fontWeight: "500" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                      <path d="M12 3l2 5.5L19.5 10 14 12l-2 6-2-6-5.5-2L10 8.5z" />
                    </svg>
                    {"Assistant IA"}
                  </span>
                  {" "}
                  <span style={{ width: "44px", height: "44px", boxSizing: "border-box", borderRadius: "12px", border: "1px solid #ECECF2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A4D5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0" />
                    </svg>
                  </span>
                  {" "}
                  <span style={{ height: "44px", display: "flex", alignItems: "center", gap: "8px", padding: "0 18px", borderRadius: "12px", background: "#16161F", color: "#FFFFFF", fontSize: "18px", fontWeight: "500" }}>
                    {"+ Créer"}
                  </span>
                  {" "}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ position: "absolute", left: "306px", top: "112px", width: "894px", height: "128px", boxSizing: "border-box", borderRadius: "22px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "0 28px", display: "flex", alignItems: "center", gap: "22px" }}>
                {" "}
                <span style={{ flex: "none", width: "76px", height: "76px", borderRadius: "50%", background: "#EEE9FF", color: "#7C5CFA", fontSize: "26px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {"LJ"}
                </span>
                {" "}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", whiteSpace: "nowrap" }}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "34px", fontWeight: "700", letterSpacing: "-.6px", lineHeight: "40px" }}>
                      {"Lucas J."}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", boxSizing: "border-box", padding: "0 14px", borderRadius: "999px", border: "1px solid #ECECF2", fontSize: "17px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6E7BF2" }} />
                      {"Running"}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "34px", boxSizing: "border-box", padding: "0 14px", borderRadius: "999px", border: "1px solid #ECECF2", fontSize: "17px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F2B23A" }} />
                      {"Hyrox"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ fontSize: "19px", color: "#6B6E7B" }}>
                    {"Objectif "}
                    <span style={{ color: "#1C1C28", fontWeight: "500" }}>
                      {"Semi-marathon · 12 semaines"}
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div style={{ position: "absolute", left: "306px", top: "256px", height: "52px", boxSizing: "border-box", padding: "4px", borderRadius: "14px", background: "#EAEAF1", display: "flex", gap: "4px" }}>
                {" "}
                <span style={{ position: "absolute", top: "4px", height: "44px", boxSizing: "border-box", borderRadius: "11px", background: "#FFFFFF", border: "1.5px solid #C9BCFF", boxShadow: "0 2px 6px rgba(28,28,40,.06)", transition: "left .5s cubic-bezier(.2,.8,.2,1),width .5s cubic-bezier(.2,.8,.2,1)", left: `${v.indLeft ?? ""}`, width: `${v.indW ?? ""}` }} />
                {" "}
                <span style={{ position: "relative", width: "92px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", color: "#6B6E7B" }}>
                  {"Profil"}
                </span>
                {" "}
                <span style={{ position: "relative", width: "138px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", transition: "color .4s", color: `${v.c1 ?? ""}`, fontWeight: `${v.w1 ?? ""}` }}>
                  {"Programme"}
                </span>
                {" "}
                <span style={{ position: "relative", width: "118px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", transition: "color .4s", color: `${v.c2 ?? ""}`, fontWeight: `${v.w2 ?? ""}` }}>
                  {"Séances"}
                </span>
                {" "}
                <span style={{ position: "relative", width: "128px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", transition: "color .4s", color: `${v.c3 ?? ""}`, fontWeight: `${v.w3 ?? ""}` }}>
                  {"Paiements"}
                </span>
                {" "}
                <span style={{ position: "relative", width: "136px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "19px", color: "#6B6E7B" }}>
                  {"Documents"}
                </span>
                {" "}
              </div>
              {" "}
              <div style={{ position: "absolute", left: "306px", top: "324px", width: "894px", height: "296px", boxSizing: "border-box", borderRadius: "22px", background: "#FFFFFF", border: "1px solid #ECECF2", overflow: "hidden" }}>
                {" "}
                <div style={{ position: "absolute", left: "58px", top: "28px", width: "560px", transition: "opacity .45s,transform .45s cubic-bezier(.2,.8,.2,1)", opacity: `${v.p1.op ?? ""}`, transform: `${v.p1.tf ?? ""}` }}>
                  {" "}
                  <div style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "1.4px", color: "#6B6E7B" }}>
                    {"PROGRAMME EN COURS"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "8px", fontSize: "30px", fontWeight: "700", letterSpacing: "-.5px", whiteSpace: "nowrap" }}>
                    {"Prépa semi · semaine 4 / 12"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "20px", display: "flex", gap: "6px" }}>
                    {v.segs.map((s, i) => (
                      <Fragment key={i}>
                        <span style={{ flex: "1", height: "12px", borderRadius: "6px", transition: "background .35s", background: `${s ?? ""}` }} />
                      </Fragment>
                    ))}
                  </div>
                  {" "}
                  <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", fontSize: "16px", color: "#9A9DAA" }}>
                    <span>
                      {"S1"}
                    </span>
                    <span>
                      {"S12"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ marginTop: "18px", display: "flex", alignItems: "center", gap: "14px", height: "56px", boxSizing: "border-box", padding: "0 18px", borderRadius: "14px", background: "#F8F7FC", border: "1px solid #EEEEF3", whiteSpace: "nowrap" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#6E7BF2" }} />
                    <span style={{ fontSize: "16px", color: "#6B6E7B" }}>
                      {"Mar. 17"}
                    </span>
                    <span style={{ fontSize: "19px" }}>
                      {"Footing "}
                      <b style={{ fontWeight: "700" }}>
                        {"45 min"}
                      </b>
                      {" · "}
                      <i style={{ color: "#4A4D5A" }}>
                        {"Z2 · 135-150 bpm"}
                      </i>
                    </span>
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ position: "absolute", left: "58px", top: "28px", width: "560px", transition: "opacity .45s,transform .45s cubic-bezier(.2,.8,.2,1)", opacity: `${v.p2.op ?? ""}`, transform: `${v.p2.tf ?? ""}` }}>
                  {" "}
                  <div style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "1.4px", color: "#6B6E7B" }}>
                    {"PROCHAINES SÉANCES"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {" "}
                    {v.rows.map((r, i) => (
                      <Fragment key={i}>
                        {" "}
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", height: "56px", boxSizing: "border-box", padding: "0 16px 0 6px", borderRadius: "14px", border: "1px solid #EEEEF3", whiteSpace: "nowrap", transition: "opacity .4s,transform .4s cubic-bezier(.2,.8,.2,1)", opacity: `${r.op ?? ""}`, transform: `${r.tf ?? ""}` }}>
                          {" "}
                          <span style={{ flex: "none", width: "64px", height: "46px", borderRadius: "10px", background: "#F1EEFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: "1" }}>
                            <span style={{ fontSize: "16px", color: "#7C5CFA" }}>
                              {hole(r.d)}
                            </span>
                            <span style={{ marginTop: "2px", fontSize: "19px", fontWeight: "700", color: "#7C5CFA" }}>
                              {hole(r.n)}
                            </span>
                          </span>
                          {" "}
                          <span style={{ fontSize: "16px", color: "#6B6E7B" }}>
                            {hole(r.h)}
                          </span>
                          {" "}
                          <span style={{ fontSize: "19px" }}>
                            {hole(r.a)}
                            <b style={{ fontWeight: "700" }}>
                              {hole(r.b)}
                            </b>
                          </span>
                          {" "}
                          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "7px", fontSize: "16px", color: `${r.tc ?? ""}` }}>
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: `${r.dc ?? ""}` }} />
                            {hole(r.k)}
                          </span>
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
                <div style={{ position: "absolute", left: "58px", top: "28px", width: "560px", transition: "opacity .45s,transform .45s cubic-bezier(.2,.8,.2,1)", opacity: `${v.p3.op ?? ""}`, transform: `${v.p3.tf ?? ""}` }}>
                  {" "}
                  <div style={{ fontSize: "16px", fontWeight: "600", letterSpacing: "1.4px", color: "#6B6E7B" }}>
                    {"PAIEMENTS · NOVEMBRE"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "16px" }}>
                    {" "}
                    <div style={{ height: "132px", boxSizing: "border-box", borderRadius: "16px", background: "#EAF8EF", border: "1px solid #CDEFD9", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "17px", fontWeight: "500", color: "#1F8A4C" }}>
                        {"Encaissé"}
                      </span>
                      <span style={{ fontSize: "44px", fontWeight: "700", letterSpacing: "-1px", lineHeight: "1", color: "#1F8A4C" }}>
                        {hole(v.paid)}
                      </span>
                      <span style={{ fontSize: "16px", color: "#1F8A4C" }}>
                        {"2 séances"}
                      </span>
                    </div>
                    {" "}
                    <div style={{ height: "132px", boxSizing: "border-box", borderRadius: "16px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "18px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "17px", fontWeight: "500", color: "#6B6E7B" }}>
                        {"À encaisser"}
                      </span>
                      <span style={{ fontSize: "44px", fontWeight: "700", letterSpacing: "-1px", lineHeight: "1" }}>
                        {"60,00 €"}
                      </span>
                      <span style={{ fontSize: "16px", color: "#6B6E7B" }}>
                        {"1 séance"}
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
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
