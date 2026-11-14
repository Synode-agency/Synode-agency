"use client";

import { Fragment, useRef } from "react";
import { jakarta } from "../font";
import { hole } from "../hole";
import styles from "../illustrations.module.css";
import { useFitScale } from "../use-fit-scale";
import { useLoopClock, type LoopClock } from "../use-loop-clock";
import { computeFrame } from "./timeline";

/**
 * L'ILLUSTRATION « COORY SUR ORDINATEUR ET TÉLÉPHONE » (800 × 500, boucle de 26 s).
 *
 * Reproduction à l'identique de `CLAUDE_DESIGN_TO_CODE_HANDOFF/source/CooryDesktopMobile/`.
 * À gauche l'application sur ordinateur (agenda puis tâches), devant à droite
 * l'iPhone (comptabilité puis assistant IA) : deux scénarios sur une horloge.
 *
 * ⚠ Le JSX ci-dessous est une conversion MÉCANIQUE de `template.original.html`
 * (`{{ x }}` → `v.x`, `sc-for` → `.map`, `sc-if` → condition) : tous
 * les styles restent inline et toutes les valeurs sont celles de l'original.
 * Ne pas y retoucher une valeur à la main : corriger l'original et
 * reconvertir. Les seuls ajouts sont la classe de la racine (le cadre
 * neutre, voir `illustrations.module.css`) et le chemin du logo.
 *
 * Décorative : la racine porte `aria-hidden`, rien n'y est cliquable.
 * `debugT` fige l'animation sur un instant, en secondes.
 */

const W = 800;
const CLOCK: LoopClock = { kind: "raf", length: 26, reducedT: 21.5, paintMs: 30, maxDt: 0.1 };

export function CooryDesktopMobile({ debugT }: { debugT?: number }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scale = useFitScale(rootRef, W);
  const t = useLoopClock(rootRef, CLOCK, debugT);
  const v = computeFrame(t, scale);
  const rootClassName = `${styles.root} ${styles.desktopMobile} ${jakarta.variable}`;

  return (
    <div className={rootClassName} ref={rootRef} aria-hidden="true" style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", overflow: "hidden", background: "#F2F5F9", backgroundImage: "radial-gradient(#DDE3EB 1px,transparent 1px)", backgroundSize: "22px 22px" }}>
      {" "}
      <div style={{ position: "absolute", left: "0", top: "0", width: "800px", height: "500px", transformOrigin: "0 0", transform: `${v.scaleTf ?? ""}`, fontFamily: "'Plus Jakarta Sans','Helvetica Neue',Helvetica,Arial,sans-serif", color: "#1C1C28" }}>
        {" "}
        <div style={{ position: "absolute", left: "22px", top: "46px", width: "740px", height: "452px", transformOrigin: "0 0", transform: "scale(.82)" }}>
          {" "}
          <div style={{ position: "absolute", inset: "0", boxSizing: "border-box", borderRadius: "14px", background: "#F3F3F7", border: "1px solid #E3E3EC", boxShadow: "0 40px 80px rgba(40,30,90,.16),0 4px 12px rgba(40,30,90,.06)", overflow: "hidden" }}>
            {" "}
            <div style={{ height: "28px", display: "flex", alignItems: "center", gap: "6px", padding: "0 12px", background: "#FFFFFF", borderBottom: "1px solid #ECECF2" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E3E3EA" }} />
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E3E3EA" }} />
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E3E3EA" }} />
              <span style={{ margin: "0 auto", fontSize: "9.5px", color: "#8A8D9A", padding: "3px 40px", borderRadius: "6px", background: "#F4F4F8", whiteSpace: "nowrap" }}>
                {"app.coory.be/coach/"}{hole(v.path)}
              </span>
            </div>
            {" "}
            <div style={{ position: "absolute", left: "8px", top: "36px", bottom: "8px", width: "140px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2" }}>
              {" "}
              <div style={{ height: "50px", display: "flex", alignItems: "center", padding: "0 12px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- copie exacte de l'original */}
                <img src="/illustrations/coory-logo-light.png" alt="Coory" width="63" height="15" style={{ height: "15px", width: "63px", display: "block" }} />
              </div>
              {" "}
              {v.nav.map((n, i) => (
                <Fragment key={i}>
                  <div style={{ margin: "0 6px", height: "25px", boxSizing: "border-box", padding: "0 8px", borderRadius: "7px", display: "flex", alignItems: "center", gap: "8px", fontSize: "10.5px", whiteSpace: "nowrap", transition: "background .3s,color .3s", background: `${n.bg ?? ""}`, color: `${n.c ?? ""}`, marginTop: `${n.mt ?? ""}` }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={n.ic} />
                    </svg>
                    {hole(n.t)}
                  </div>
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "156px", right: "8px", top: "36px", bottom: "8px" }}>
              {" "}
              {v.isDash ? (
                <>
                  {" "}
                  <div style={{ height: "40px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", display: "flex", alignItems: "center", gap: "8px", padding: "0 10px 0 14px", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>
                      {"Tableau de bord"}
                    </span>
                    <span style={{ marginLeft: "auto", height: "24px", padding: "0 10px", borderRadius: "7px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center" }}>
                      {"✦ Assistant IA"}
                    </span>
                    <span style={{ height: "24px", padding: "0 10px", borderRadius: "7px", background: "#16161F", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center" }}>
                      {"+ Créer"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "8px" }}>
                    {" "}
                    <div style={{ height: "112px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #DCD3FE", padding: "10px 12px" }}>
                      <div style={{ fontSize: "8.5px", letterSpacing: "1px", color: "#6B6E7B" }}>
                        {"PROCHAINE SÉANCE"}
                      </div>
                      <div style={{ marginTop: "6px", fontSize: "22px", fontWeight: "700", color: "#7C5CFA" }}>
                        {"08:30"}
                      </div>
                      <div style={{ marginTop: "4px", fontSize: "10.5px" }}>
                        {"Run club du samedi"}
                      </div>
                      <div style={{ marginTop: "2px", fontSize: "9px", color: "#6B6E7B" }}>
                        {"Collective · 3 inscrits · 90 min"}
                      </div>
                    </div>
                    {" "}
                    <div style={{ height: "112px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "10px 12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", fontWeight: "600" }}>
                        {"Tâches"}
                        <span style={{ fontSize: "9px", color: "#7C5CFA", background: "#F1EEFF", borderRadius: "6px", padding: "1px 6px" }}>
                          {"2"}
                        </span>
                      </div>
                      <div style={{ marginTop: "9px", display: "flex", gap: "7px", fontSize: "9.5px", lineHeight: "1.35" }}>
                        <span style={{ flex: "none", width: "11px", height: "11px", borderRadius: "50%", border: "1.5px solid #D5D6DE" }} />
                        <span>
                          {"Préparer le bloc 2 du programme de Lucas"}
                        </span>
                      </div>
                      <div style={{ marginTop: "8px", display: "flex", gap: "7px", fontSize: "9.5px", lineHeight: "1.35" }}>
                        <span style={{ flex: "none", width: "11px", height: "11px", borderRadius: "50%", border: "1.5px solid #D5D6DE" }} />
                        <span>
                          {"Relancer Sophie pour la facture"}
                        </span>
                      </div>
                    </div>
                    {" "}
                    <div style={{ height: "112px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "10px 12px" }}>
                      <div style={{ fontSize: "8.5px", letterSpacing: "1px", color: "#6B6E7B" }}>
                        {"ENCAISSÉS CETTE SEMAINE"}
                      </div>
                      <div style={{ marginTop: "8px", fontSize: "18px", fontWeight: "700", letterSpacing: "-.4px", whiteSpace: "nowrap" }}>
                        {"3 395,00 €"}
                      </div>
                      <div style={{ marginTop: "3px", fontSize: "9px", color: "#6B6E7B" }}>
                        {"6 paiements"}
                      </div>
                      <span style={{ display: "inline-block", marginTop: "10px", fontSize: "9px", padding: "3px 7px", borderRadius: "6px", background: "#EAF8EF", color: "#1F8A4C" }}>
                        {"715,00 € prévus"}
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div style={{ marginTop: "8px", height: "240px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "10px 12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10.5px", fontWeight: "600" }}>
                      {"Séances à venir"}
                      <span style={{ fontWeight: "400", fontSize: "9.5px", color: "#7C5CFA" }}>
                        {"Voir tout"}
                      </span>
                    </div>
                    {" "}
                    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "4px" }}>
                      {v.upcoming.map((u, i) => (
                        <Fragment key={i}>
                          <div style={{ height: "34px", display: "grid", gridTemplateColumns: "8px 40px minmax(0,1fr) auto", gap: "8px", alignItems: "center", fontSize: "9.5px" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: `${u.c ?? ""}` }} />
                            <b style={{ fontWeight: "600" }}>
                              {hole(u.h)}
                            </b>
                            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#4A4D5A" }}>
                              {hole(u.n)}
                            </span>
                            <span style={{ fontSize: "9px", color: `${u.c ?? ""}` }}>
                              {hole(u.tag)}
                            </span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </>
              ) : null}
              {" "}
              {v.isAgenda ? (
                <>
                  {" "}
                  <div style={{ height: "40px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", display: "flex", alignItems: "center", gap: "8px", padding: "0 10px 0 12px", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #ECECF2" }}>
                      {"Aujourd’hui"}
                    </span>
                    <span style={{ fontSize: "11px", color: "#6B6E7B" }}>
                      {"‹ ›"}
                    </span>
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>
                      {"Novembre 2026"}
                    </span>
                    <span style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "6px", border: "1px solid #ECECF2" }}>
                      {"Semaine ⌄"}
                    </span>
                    <span style={{ marginLeft: "auto", height: "24px", padding: "0 10px", borderRadius: "7px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center" }}>
                      {"✦ Assistant IA"}
                    </span>
                    <span style={{ height: "24px", padding: "0 10px", borderRadius: "7px", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center", transition: "background .2s", background: `${v.nsBg ?? ""}` }}>
                      {"+ Nouvelle séance"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ marginTop: "8px", height: "360px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "0 8px 8px", overflow: "hidden", transition: "opacity .35s", opacity: `${v.agOp ?? ""}` }}>
                    {" "}
                    <div style={{ display: "grid", gridTemplateColumns: "28px repeat(7,minmax(0,1fr))", height: "38px", alignItems: "center", textAlign: "center", borderBottom: "1px solid #ECECF2" }}>
                      <span />
                      {v.days.map((d, i) => (
                        <Fragment key={i}>
                          <span style={{ fontSize: "8.5px", lineHeight: "1.2", color: `${d.c ?? ""}` }}>
                            {hole(d.l)}
                            <br />
                            <b style={{ fontSize: "12px", fontWeight: "600" }}>
                              {hole(d.n)}
                            </b>
                          </span>
                        </Fragment>
                      ))}
                    </div>
                    {" "}
                    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "28px repeat(7,minmax(0,1fr))", height: "308px" }}>
                      {" "}
                      <div style={{ position: "relative" }}>
                        {v.hours.map((h, i) => (
                          <Fragment key={i}>
                            <span style={{ position: "absolute", left: "4px", fontSize: "8px", color: "#9A9DAA", top: `${h.top ?? ""}` }}>
                              {hole(h.t)}
                            </span>
                          </Fragment>
                        ))}
                      </div>
                      {" "}
                      {v.cols.map((col, i) => (
                        <Fragment key={i}>
                          <div style={{ position: "relative", borderLeft: "1px solid #F0F0F5", background: `${col.bg ?? ""}` }}>
                            <div style={{ position: "absolute", left: "3px", right: "3px", top: "58px", height: "24px", borderRadius: "5px", border: "1.5px dashed #9F8BFB", background: "#F1EEFF", transition: "opacity .25s", opacity: `${col.slot ?? ""}` }} />
                            {col.ev.map((e, i) => (
                              <Fragment key={i}>
                                <div style={{ position: "absolute", left: "3px", right: "3px", boxSizing: "border-box", borderRadius: "5px", padding: "3px 5px", overflow: "hidden", fontSize: "8.5px", lineHeight: "1.25", transition: "opacity .4s,transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .5s", color: `${e.tc ?? ""}`, background: `${e.c ?? ""}`, top: `${e.top ?? ""}`, height: `${e.h ?? ""}`, opacity: `${e.op ?? ""}`, transform: `${e.tf ?? ""}`, boxShadow: `${e.sh ?? ""}` }}>
                                  <b style={{ display: "block", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                    {hole(e.n)}
                                  </b>
                                  {hole(e.time)}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </Fragment>
                      ))}
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </>
              ) : null}
              {" "}
              {v.isTasks ? (
                <>
                  {" "}
                  <div style={{ height: "40px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", display: "flex", alignItems: "center", gap: "8px", padding: "0 10px 0 14px", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600" }}>
                      {"Tâches"}
                    </span>
                    <span style={{ marginLeft: "auto", height: "24px", padding: "0 10px", borderRadius: "7px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center" }}>
                      {"✦ Assistant IA"}
                    </span>
                    <span style={{ height: "24px", padding: "0 10px", borderRadius: "7px", background: "#16161F", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center" }}>
                      {"+ Nouvelle tâche"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ marginTop: "8px", height: "360px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", display: "grid", gridTemplateColumns: "150px minmax(0,1fr)", overflow: "hidden", transition: "opacity .35s", opacity: `${v.tkOp ?? ""}` }}>
                    {" "}
                    <div style={{ position: "relative", background: "#FAFAFC", borderRight: "1px solid #ECECF2", padding: "8px" }}>
                      {" "}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                        {v.tiles.map((k, i) => (
                          <Fragment key={i}>
                            <div style={{ height: "50px", boxSizing: "border-box", borderRadius: "8px", padding: "6px 7px", transition: "background .3s", background: `${k.bg ?? ""}`, border: `1px solid ${k.b ?? ""}` }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: `${k.ic ?? ""}` }} />
                                <b style={{ fontSize: "13px", fontWeight: "700" }}>
                                  {hole(k.n)}
                                </b>
                              </div>
                              <div style={{ marginTop: "6px", fontSize: "8.5px", whiteSpace: "nowrap" }}>
                                {hole(k.t)}
                              </div>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      {" "}
                      <div style={{ margin: "12px 0 4px 4px", fontSize: "7.5px", letterSpacing: "1px", color: "#8A8D9A" }}>
                        {"MES LISTES"}
                      </div>
                      {" "}
                      {v.lists.map((l, i) => (
                        <Fragment key={i}>
                          <div style={{ height: "24px", borderRadius: "6px", padding: "0 4px", display: "flex", alignItems: "center", gap: "7px", fontSize: "9.5px", transition: "background .4s", background: `${l.bg ?? ""}` }}>
                            <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: `${l.c ?? ""}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: "7px" }}>
                              {"≡"}
                            </span>
                            <span style={{ flex: "1", whiteSpace: "nowrap" }}>
                              {hole(l.t)}
                            </span>
                            <span style={{ color: "#6B6E7B", fontSize: "9px", paddingRight: "6px" }}>
                              {hole(l.n)}
                            </span>
                          </div>
                        </Fragment>
                      ))}
                      {" "}
                      {v.liShow ? (
                        <>
                          <div style={{ height: "24px", marginTop: "2px", boxSizing: "border-box", borderRadius: "6px", padding: "0 4px", display: "flex", alignItems: "center", gap: "7px", fontSize: "9.5px", background: "#FFFFFF", border: "1px solid #C9BCFF" }}>
                            <span style={{ width: "14px", height: "14px", borderRadius: "50%", background: "#DADAE2" }} />
                            <span style={{ whiteSpace: "nowrap", color: `${v.liC ?? ""}` }}>
                              {hole(v.liText)}
                            </span>
                            <span style={{ width: "1px", height: "11px", background: "#7C5CFA", opacity: `${v.liCaret ?? ""}` }} />
                          </div>
                        </>
                      ) : null}
                      {" "}
                      <div style={{ position: "absolute", left: "12px", bottom: "12px", fontSize: "9.5px", fontWeight: "500", color: "#7C5CFA", whiteSpace: "nowrap" }}>
                        {"+ Nouvelle liste"}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div style={{ minWidth: "0" }}>
                      {" "}
                      <div style={{ height: "44px", boxSizing: "border-box", padding: "0 84px 0 14px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #ECECF2" }}>
                        <span style={{ fontSize: "17px", fontWeight: "700" }}>
                          {"Toutes"}
                        </span>
                        <span style={{ fontSize: "9px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                          {hole(v.tCount)}
                        </span>
                      </div>
                      {" "}
                      {v.tasks.map((r, i) => (
                        <Fragment key={i}>
                          <div style={{ height: "48px", boxSizing: "border-box", padding: "0 14px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #ECECF2", transition: "background .5s", background: `${r.bg ?? ""}` }}>
                            <span style={{ flex: "none", width: "13px", height: "13px", borderRadius: "50%", border: "1.5px solid #D5D6DE" }} />
                            <div style={{ minWidth: "0" }}>
                              <div style={{ fontSize: "10.5px", whiteSpace: "nowrap" }}>
                                {hole(r.t)}
                              </div>
                              <div style={{ marginTop: "3px", display: "flex", alignItems: "center", gap: "5px", fontSize: "8.5px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                                <span style={{ fontSize: "6.5px", padding: "1px 3px", borderRadius: "4px", background: "#F1EEFF", color: "#7C5CFA" }}>
                                  {hole(r.i)}
                                </span>
                                {hole(r.p)}
                                <span style={{ marginLeft: "4px", color: `${r.c ?? ""}` }}>
                                  {"●"}
                                </span>
                                <span style={{ color: "#1C1C28" }}>
                                  {hole(r.l)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                      ))}
                      {" "}
                      <div style={{ height: "38px", padding: "0 14px", display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ flex: "none", width: "13px", height: "13px", borderRadius: "50%", border: "1.5px solid #D5D6DE" }} />
                        <span style={{ fontSize: "10.5px", whiteSpace: "nowrap", color: `${v.ntC ?? ""}` }}>
                          {hole(v.ntText)}
                        </span>
                        <span style={{ width: "1px", height: "12px", background: "#7C5CFA", opacity: `${v.ntCaret ?? ""}` }} />
                      </div>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </>
              ) : null}
              {" "}
            </div>
            {" "}
            <div style={{ position: "absolute", inset: "0", background: "#16161F", pointerEvents: "none", transition: "opacity .3s", opacity: `${v.mDim ?? ""}` }} />
            {" "}
            <div style={{ position: "absolute", left: "190px", top: "64px", width: "400px", height: "330px", boxSizing: "border-box", borderRadius: "16px", background: "#FFFFFF", padding: "18px 20px", boxShadow: "0 30px 60px rgba(20,20,40,.25)", transition: "opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1)", opacity: `${v.mOp ?? ""}`, transform: `${v.mTf ?? ""}` }}>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "700" }}>
                    {"Nouvelle séance"}
                  </div>
                  <div style={{ marginTop: "2px", fontSize: "9.5px", color: "#6B6E7B" }}>
                    {"Elle apparaît tout de suite dans l’agenda."}
                  </div>
                </div>
                <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#F1F1F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>
                  {"✕"}
                </span>
              </div>
              {" "}
              <div style={{ marginTop: "12px", fontSize: "9.5px", fontWeight: "600" }}>
                {"Type de séance"}
              </div>
              {" "}
              <div style={{ marginTop: "5px", display: "grid", gridTemplateColumns: "1fr 1fr", padding: "3px", borderRadius: "8px", background: "#F1F1F6", fontSize: "9.5px", textAlign: "center" }}>
                <span style={{ padding: "5px 0", borderRadius: "6px", background: "#FFFFFF", fontWeight: "600" }}>
                  {"Individuelle"}
                </span>
                <span style={{ padding: "5px 0", color: "#6B6E7B" }}>
                  {"Collective"}
                </span>
              </div>
              {" "}
              <div style={{ marginTop: "10px", fontSize: "9.5px", fontWeight: "600" }}>
                {"Titre"}
              </div>
              {" "}
              <div style={{ marginTop: "5px", height: "30px", boxSizing: "border-box", borderRadius: "8px", padding: "0 10px", display: "flex", alignItems: "center", fontSize: "10px", background: "#F4F4F8", transition: "border-color .3s", border: `1px solid ${v.dTitleB ?? ""}`, color: `${v.dTitleC ?? ""}` }}>
                {hole(v.dTitle)}
                <span style={{ display: "inline-block", width: "1px", height: "12px", marginLeft: "1px", background: "#7C5CFA", opacity: `${v.dCaret ?? ""}` }} />
              </div>
              {" "}
              <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "8px" }}>
                {v.mFields.map((f, i) => (
                  <Fragment key={i}>
                    <div>
                      <div style={{ fontSize: "9.5px", fontWeight: "600" }}>
                        {hole(f.l)}
                      </div>
                      <div style={{ marginTop: "5px", height: "30px", boxSizing: "border-box", borderRadius: "8px", padding: "0 10px", display: "flex", alignItems: "center", fontSize: "10px", background: "#F4F4F8", border: "1px solid #ECECF2" }}>
                        {hole(f.v)}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              {" "}
              <div style={{ marginTop: "10px", fontSize: "9.5px", fontWeight: "600" }}>
                {"Sportif"}
              </div>
              {" "}
              <div style={{ marginTop: "5px", height: "30px", boxSizing: "border-box", borderRadius: "8px", padding: "0 10px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "10px", background: "#F4F4F8", border: "1px solid #ECECF2" }}>
                {"Thomas Petit"}
                <span style={{ color: "#8A8D9A" }}>
                  {"⌄"}
                </span>
              </div>
              {" "}
              <div style={{ position: "absolute", right: "20px", bottom: "16px", display: "flex", gap: "8px" }}>
                <span style={{ height: "30px", padding: "0 14px", borderRadius: "8px", border: "1px solid #E3E3EC", fontSize: "10px", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>
                  {"Annuler"}
                </span>
                <span style={{ height: "30px", padding: "0 14px", borderRadius: "8px", whiteSpace: "nowrap", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", transition: "background .2s,transform .2s", background: `${v.dCreateBg ?? ""}`, transform: `${v.dCreateTf ?? ""}` }}>
                  {"Créer la séance"}
                </span>
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "0", top: "0", width: "22px", height: "22px", pointerEvents: "none", transform: `${v.curTf ?? ""}` }}>
              <svg width="18" height="22" viewBox="0 0 18 22" style={{ display: "block", filter: "drop-shadow(0 2px 3px rgba(0,0,0,.25))" }}>
                <path d="M1 1l15 9.5-6.6 1.4 3.9 7.4-2.8 1.5-3.9-7.5L1 18z" fill="#16161F" stroke="#FFFFFF" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div style={{ position: "absolute", left: "566px", top: "42px", width: "210px", height: "432px", boxSizing: "border-box", borderRadius: "34px", border: "7px solid #1C1C28", background: "#F4F4F8", overflow: "hidden", boxShadow: "0 30px 60px rgba(40,30,90,.28),0 0 0 1px rgba(255,255,255,.6)" }}>
          {" "}
          <div style={{ position: "absolute", left: "50%", top: "6px", width: "62px", height: "16px", marginLeft: "-31px", borderRadius: "9px", background: "#1C1C28", zIndex: "9" }} />
          {" "}
          <div style={{ height: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", fontSize: "9.5px", fontWeight: "600" }}>
            <span>
              {"9:41"}
            </span>
            <span style={{ width: "15px", height: "7px", borderRadius: "2px", border: "1.2px solid #1C1C28", boxSizing: "border-box" }} />
          </div>
          {" "}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "2px 9px 0" }}>
            <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", transition: "transform .2s", transform: `${v.burgerTf ?? ""}` }}>
              {"☰"}
            </span>
            <span style={{ fontSize: "11px", fontWeight: "600", whiteSpace: "nowrap" }}>
              {hole(v.pTitle)}
            </span>
            <span style={{ marginLeft: "auto", width: "22px", height: "22px", borderRadius: "6px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {"✦"}
            </span>
          </div>
          {" "}
          <div style={{ position: "absolute", left: "0", right: "0", top: "62px", bottom: "0", padding: "0 9px", transition: "opacity .3s", opacity: `${v.dashOp ?? ""}` }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px" }}>
              {" "}
              <div style={{ height: "92px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #DCD3FE", padding: "8px" }}>
                <div style={{ fontSize: "6.5px", letterSpacing: ".4px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                  {"PROCHAINE SÉANCE"}
                </div>
                <div style={{ marginTop: "3px", fontSize: "17px", fontWeight: "700", color: "#7C5CFA" }}>
                  {"08:30"}
                </div>
                <div style={{ marginTop: "4px", fontSize: "8.5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {"Run club du samedi"}
                </div>
                <div style={{ fontSize: "7.5px", color: "#6B6E7B" }}>
                  {"Collective · 3 inscrits"}
                </div>
              </div>
              {" "}
              <div style={{ height: "92px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "8px" }}>
                <div style={{ fontSize: "9.5px", fontWeight: "600" }}>
                  {"Tâches"}
                </div>
                <div style={{ marginTop: "6px", fontSize: "8px", lineHeight: "1.35" }}>
                  {"○ Préparer le bloc 2…"}
                </div>
                <div style={{ marginTop: "5px", fontSize: "8px", lineHeight: "1.35" }}>
                  {"○ Relancer Sophie…"}
                </div>
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ marginTop: "7px", height: "118px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "8px 10px" }}>
              <div style={{ fontSize: "9.5px", fontWeight: "600" }}>
                {"Séances à venir"}
              </div>
              <div style={{ marginTop: "7px", borderRadius: "7px", background: "#F1EEFF", padding: "6px 8px", fontSize: "8px" }}>
                <b>
                  {"08:30"}
                </b>
                {" · Run club du samedi"}
              </div>
              <div style={{ marginTop: "5px", padding: "6px 8px", fontSize: "8px" }}>
                <b>
                  {"10:00"}
                </b>
                {" · Circuit Hyrox du samedi"}
              </div>
            </div>
            {" "}
            <div style={{ marginTop: "7px", height: "86px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "8px 10px" }}>
              <div style={{ fontSize: "7px", letterSpacing: ".8px", color: "#6B6E7B" }}>
                {"ENCAISSÉS CETTE SEMAINE"}
              </div>
              <div style={{ marginTop: "5px", fontSize: "17px", fontWeight: "700", whiteSpace: "nowrap" }}>
                {"3 395,00 €"}
              </div>
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "0", right: "0", top: "62px", bottom: "0", padding: "0 9px", transition: "opacity .3s", opacity: `${v.comptaOp ?? ""}` }}>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", padding: "3px", borderRadius: "9px", fontSize: "8.5px", textAlign: "center", color: "#6B6E7B" }}>
              <span style={{ padding: "5px 0" }}>
                {"Semaine"}
              </span>
              <span style={{ padding: "5px 0", borderRadius: "7px", background: "#FFFFFF", color: "#1C1C28", fontWeight: "600" }}>
                {"Mois"}
              </span>
              <span style={{ padding: "5px 0" }}>
                {"Année"}
              </span>
            </div>
            {" "}
            <div style={{ marginTop: "6px", boxSizing: "border-box", borderRadius: "11px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "9px 10px" }}>
              {" "}
              <div style={{ fontSize: "8px", color: "#6B6E7B" }}>
                {"Résultat · Novembre 2026"}
              </div>
              {" "}
              <div style={{ marginTop: "2px", fontSize: "19px", fontWeight: "700", letterSpacing: "-.4px", whiteSpace: "nowrap", transition: "color .4s", color: `${v.resC ?? ""}` }}>
                {hole(v.result)}
              </div>
              {" "}
              <div style={{ fontSize: "7.5px", color: "#6B6E7B" }}>
                {"Gagné – dépensé"}
              </div>
              {" "}
              <div style={{ marginTop: "7px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
                {" "}
                <div style={{ borderRadius: "7px", background: "#F6F6FA", padding: "6px 7px" }}>
                  <div style={{ fontSize: "7.5px", color: "#6B6E7B" }}>
                    <span style={{ color: "#7C5CFA" }}>
                      {"●"}
                    </span>
                    {" Gagné"}
                  </div>
                  <div style={{ marginTop: "2px", fontSize: "10.5px", fontWeight: "700", whiteSpace: "nowrap" }}>
                    {hole(v.gained)}
                  </div>
                </div>
                {" "}
                <div style={{ borderRadius: "7px", background: "#F6F6FA", padding: "6px 7px" }}>
                  <div style={{ fontSize: "7.5px", color: "#6B6E7B" }}>
                    <span style={{ color: "#F2B23A" }}>
                      {"●"}
                    </span>
                    {" Dépensé"}
                  </div>
                  <div style={{ marginTop: "2px", fontSize: "10.5px", fontWeight: "700" }}>
                    {"605,00 €"}
                  </div>
                </div>
                {" "}
                <div style={{ gridColumn: "1 / -1", borderRadius: "7px", background: "#F6F6FA", padding: "6px 7px" }}>
                  <div style={{ fontSize: "7.5px", color: "#6B6E7B" }}>
                    <span style={{ color: "#6B6E7B" }}>
                      {"●"}
                    </span>
                    {" Gagné cette semaine"}
                  </div>
                  <div style={{ marginTop: "2px", fontSize: "10.5px", fontWeight: "700", whiteSpace: "nowrap" }}>
                    {hole(v.week)}
                  </div>
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ marginTop: "7px", height: "118px", boxSizing: "border-box", borderRadius: "11px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "8px 10px" }}>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", fontWeight: "600" }}>
                {"Gagné et dépensé"}
                <span style={{ fontWeight: "400", fontSize: "7px", color: "#6B6E7B" }}>
                  <span style={{ color: "#7C5CFA" }}>
                    {"●"}
                  </span>
                  {" Gagné "}
                  <span style={{ color: "#F2B23A" }}>
                    {"●"}
                  </span>
                  {" Dépensé"}
                </span>
              </div>
              {" "}
              <div style={{ marginTop: "8px", height: "72px", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: "7px", borderBottom: "1px solid #ECECF2" }}>
                {v.bars.map((b, i) => (
                  <Fragment key={i}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "100%" }}>
                      <span style={{ width: "6px", borderRadius: "2px 2px 0 0", transition: "height .6s cubic-bezier(.2,.8,.2,1)", background: `${b.c ?? ""}`, height: `${b.h ?? ""}` }} />
                      <span style={{ width: "4px", borderRadius: "2px 2px 0 0", background: "#FCD9A0", height: `${b.d ?? ""}` }} />
                    </div>
                  </Fragment>
                ))}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", right: "11px", bottom: "14px", width: "38px", height: "38px", borderRadius: "11px", background: "#16161F", color: "#FFFFFF", fontSize: "19px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 18px rgba(20,20,40,.3)", transition: "transform .2s", transform: `${v.fabTf ?? ""}` }}>
            {"+"}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "0", right: "0", top: "62px", bottom: "0", boxSizing: "border-box", background: "#FFFFFF", padding: "2px 10px", transition: "opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1)", opacity: `${v.menuOp ?? ""}`, transform: `${v.menuTf ?? ""}` }}>
            {" "}
            <div style={{ fontSize: "7px", letterSpacing: "1px", color: "#8A8D9A", margin: "4px 0 4px 6px" }}>
              {"PRINCIPAL"}
            </div>
            {" "}
            {v.pmenu.map((m, i) => (
              <Fragment key={i}>
                <div style={{ height: "26px", borderRadius: "7px", padding: "0 8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", transition: "background .25s,color .25s", background: `${m.bg ?? ""}`, color: `${m.c ?? ""}` }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={m.ic} />
                  </svg>
                  {hole(m.t)}
                </div>
              </Fragment>
            ))}
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "0", right: "0", top: "62px", bottom: "0", boxSizing: "border-box", background: "#F4F4F8", transition: "opacity .3s,transform .35s cubic-bezier(.2,.8,.2,1)", opacity: `${v.aiOp ?? ""}`, transform: `${v.aiTf ?? ""}` }}>
            {" "}
            <div style={{ position: "absolute", left: "10px", right: "10px", top: "70px", textAlign: "center", transition: "opacity .3s", opacity: `${v.aiEmpty ?? ""}` }}>
              <div style={{ width: "30px", height: "30px", margin: "0 auto", borderRadius: "10px", background: "#7C5CFA", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>
                {"✦"}
              </div>
              <div style={{ marginTop: "8px", fontSize: "11px", fontWeight: "600" }}>
                {"Que veux-tu préparer ?"}
              </div>
              <div style={{ marginTop: "3px", fontSize: "8px", color: "#6B6E7B" }}>
                {"Programmes, séances, relances…"}
              </div>
            </div>
            {" "}
            <div style={{ position: "absolute", right: "10px", top: "8px", width: "160px", height: "44px", boxSizing: "border-box", borderRadius: "10px 10px 3px 10px", background: "#7C5CFA", color: "#FFFFFF", padding: "6px 8px", fontSize: "8px", lineHeight: "1.35", transition: "opacity .3s,transform .3s", opacity: `${v.ubOp ?? ""}`, transform: `${v.ubTf ?? ""}` }}>
              {"Crée un programme running de 12 semaines pour Emma, avec repères, mesures et allures."}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "10px", top: "60px", display: "flex", alignItems: "center", gap: "6px", padding: "7px 9px", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", fontSize: "8px", color: "#6B6E7B", whiteSpace: "nowrap", transition: "opacity .3s", opacity: `${v.thOp ?? ""}` }}>
              <span style={{ color: "#7C5CFA", letterSpacing: "1px" }}>
                {hole(v.dots)}
              </span>
              {"Coory prépare le programme"}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "10px", right: "10px", top: "60px", boxSizing: "border-box", borderRadius: "10px", background: "#FFFFFF", border: "1px solid #ECECF2", padding: "8px", transition: "opacity .35s,transform .35s", opacity: `${v.cardOp ?? ""}`, transform: `${v.cardTf ?? ""}` }}>
              {" "}
              <div style={{ height: "28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: "700", whiteSpace: "nowrap" }}>
                  <span style={{ color: "#7C5CFA" }}>
                    {"✦"}
                  </span>
                  {"Running · 12 semaines"}
                </div>
                <div style={{ marginTop: "2px", fontSize: "7.5px", color: "#6B6E7B", whiteSpace: "nowrap" }}>
                  {"Emma Laurent · objectif 10 km"}
                </div>
              </div>
              {" "}
              {v.blocs.map((b, i) => (
                <Fragment key={i}>
                  <div style={{ height: "20px", marginTop: "4px", borderRadius: "6px", background: "#F6F6FA", display: "flex", alignItems: "center", gap: "6px", padding: "0 5px 0 0", overflow: "hidden", fontSize: "8px", whiteSpace: "nowrap", transition: "opacity .3s,transform .3s", opacity: `${b.op ?? ""}`, transform: `${b.tf ?? ""}` }}>
                    <span style={{ width: "3px", height: "20px", background: `${b.c ?? ""}` }} />
                    <b style={{ fontWeight: "600" }}>
                      {hole(b.s)}
                    </b>
                    <span style={{ color: "#6B6E7B" }}>
                      {hole(b.t)}
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: "7.5px", padding: "1px 5px", borderRadius: "4px", background: "#FFFFFF", border: "1px solid #ECECF2", color: `${b.c ?? ""}` }}>
                      {hole(b.a)}
                    </span>
                  </div>
                </Fragment>
              ))}
              {" "}
              <div style={{ height: "28px", marginTop: "6px", fontSize: "7.5px", lineHeight: "14px", whiteSpace: "nowrap", transition: "opacity .3s", opacity: `${v.infoOp ?? ""}` }}>
                <div>
                  <b style={{ fontWeight: "600" }}>
                    {"Repères"}
                  </b>
                  {" "}
                  <span style={{ color: "#6B6E7B" }}>
                    {"test 5 km · sem. 4, 8 et 12"}
                  </span>
                </div>
                <div>
                  <b style={{ fontWeight: "600" }}>
                    {"Mesures"}
                  </b>
                  {" "}
                  <span style={{ color: "#6B6E7B" }}>
                    {"FC repos · VMA · temps au km"}
                  </span>
                </div>
              </div>
              {" "}
              <div style={{ height: "24px", marginTop: "6px", borderRadius: "7px", color: "#FFFFFF", fontSize: "8.5px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s,opacity .3s,transform .2s", background: `${v.cpBg ?? ""}`, opacity: `${v.infoOp ?? ""}`, transform: `${v.cpTf ?? ""}` }}>
                {hole(v.cpText)}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "10px", right: "10px", bottom: "10px", boxSizing: "border-box", minHeight: "32px", borderRadius: "10px", background: "#FFFFFF", padding: "6px 34px 6px 9px", fontSize: "8px", lineHeight: "1.35", display: "flex", alignItems: "center", transition: "border-color .3s", border: `1px solid ${v.cmpB ?? ""}`, color: `${v.cmpC ?? ""}` }}>
              <span>
                {hole(v.cmpText)}
                <span style={{ display: "inline-block", width: "1px", height: "9px", marginLeft: "1px", verticalAlign: "-1px", background: "#7C5CFA", opacity: `${v.cmpCaret ?? ""}` }} />
              </span>
              <span style={{ position: "absolute", right: "5px", bottom: "4px", width: "22px", height: "22px", borderRadius: "50%", background: "#7C5CFA", color: "#FFFFFF", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {"↑"}
              </span>
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", inset: "0", background: "#16161F", pointerEvents: "none", transition: "opacity .3s", opacity: `${v.pDim ?? ""}` }} />
          {" "}
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "128px", boxSizing: "border-box", borderRadius: "16px 16px 0 0", background: "#FFFFFF", padding: "7px 12px 0", transition: "transform .4s cubic-bezier(.2,.8,.2,1)", transform: `${v.s1Tf ?? ""}` }}>
            {" "}
            <div style={{ width: "26px", height: "3px", borderRadius: "2px", background: "#DADAE2", margin: "0 auto 8px" }} />
            {" "}
            <div style={{ fontSize: "13px", fontWeight: "700" }}>
              {"Ajouter"}
            </div>
            {" "}
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "9px", padding: "6px", borderRadius: "9px", transition: "background .25s", background: `${v.npBg ?? ""}` }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "#EFEAFF", color: "#7C5CFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>
                {"+"}
              </span>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "600" }}>
                  {"Nouveau paiement"}
                </div>
                <div style={{ fontSize: "8px", color: "#6B6E7B" }}>
                  {"Un sportif t’a payé"}
                </div>
              </div>
            </div>
            {" "}
            <div style={{ marginTop: "2px", display: "flex", alignItems: "center", gap: "9px", padding: "6px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "#FFF3D6", color: "#C98A12", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>
                {"−"}
              </span>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "600" }}>
                  {"Nouvelle dépense"}
                </div>
                <div style={{ fontSize: "8px", color: "#6B6E7B" }}>
                  {"Salle, matériel, abonnement…"}
                </div>
              </div>
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "0", right: "0", bottom: "0", height: "318px", boxSizing: "border-box", borderRadius: "16px 16px 0 0", background: "#FFFFFF", padding: "7px 12px 0", transition: "transform .4s cubic-bezier(.2,.8,.2,1)", transform: `${v.s2Tf ?? ""}` }}>
            {" "}
            <div style={{ width: "26px", height: "3px", borderRadius: "2px", background: "#DADAE2", margin: "0 auto 8px" }} />
            {" "}
            <div style={{ fontSize: "13px", fontWeight: "700" }}>
              {"Nouveau paiement"}
            </div>
            {" "}
            <div style={{ marginTop: "1px", fontSize: "8px", color: "#6B6E7B" }}>
              {"L’argent reçu d’un sportif."}
            </div>
            {" "}
            <div style={{ marginTop: "9px", fontSize: "8.5px", fontWeight: "600" }}>
              {"Sportif"}
            </div>
            {" "}
            <div style={{ marginTop: "4px", height: "27px", boxSizing: "border-box", borderRadius: "7px", padding: "0 9px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "9.5px", background: "#F4F4F8", border: "1px solid #ECECF2" }}>
              {"Sophie Lambert"}
              <span style={{ color: "#8A8D9A" }}>
                {"⌄"}
              </span>
            </div>
            {" "}
            <div style={{ marginTop: "8px", fontSize: "8.5px", fontWeight: "600" }}>
              {"Montant reçu"}
            </div>
            {" "}
            <div style={{ marginTop: "4px", height: "27px", boxSizing: "border-box", borderRadius: "7px", padding: "0 9px", display: "flex", alignItems: "center", fontSize: "9.5px", background: "#F4F4F8", transition: "border-color .3s", border: `1px solid ${v.amtB ?? ""}`, color: `${v.amtC ?? ""}` }}>
              {hole(v.amt)}
              <span style={{ display: "inline-block", width: "1px", height: "11px", marginLeft: "1px", background: "#7C5CFA", opacity: `${v.pCaret ?? ""}` }} />
              <span style={{ marginLeft: "auto", color: "#8A8D9A" }}>
                {"€"}
              </span>
            </div>
            {" "}
            <div style={{ marginTop: "4px", fontSize: "7.5px", color: "#6B6E7B" }}>
              {"ⓘ Le montant que tu as reçu, sans TVA."}
            </div>
            {" "}
            <div style={{ marginTop: "8px", fontSize: "8.5px", fontWeight: "600" }}>
              {"Reçu le"}
            </div>
            {" "}
            <div style={{ marginTop: "4px", height: "27px", boxSizing: "border-box", borderRadius: "7px", padding: "0 9px", display: "flex", alignItems: "center", fontSize: "9.5px", background: "#F4F4F8", border: "1px solid #ECECF2" }}>
              {"13/11/2026"}
            </div>
            {" "}
            <div style={{ marginTop: "8px", fontSize: "8.5px", fontWeight: "600" }}>
              {"Libellé "}
              <span style={{ fontWeight: "400", color: "#8A8D9A" }}>
                {"(facultatif)"}
              </span>
            </div>
            {" "}
            <div style={{ marginTop: "4px", height: "27px", boxSizing: "border-box", borderRadius: "7px", padding: "0 9px", display: "flex", alignItems: "center", fontSize: "9.5px", background: "#F4F4F8", border: "1px solid #ECECF2" }}>
              {"Facture d’octobre"}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "12px", right: "12px", bottom: "14px", height: "32px", borderRadius: "9px", color: "#FFFFFF", fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s,transform .2s", background: `${v.saveBg ?? ""}`, transform: `${v.saveTf ?? ""}` }}>
              {"Enregistrer le paiement"}
            </div>
            {" "}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "50%", top: "36px", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "6px", padding: "6px 10px", borderRadius: "9px", background: "#16161F", color: "#FFFFFF", fontSize: "9px", whiteSpace: "nowrap", boxShadow: "0 10px 24px rgba(20,20,40,.25)", transition: "opacity .35s,margin-top .35s", opacity: `${v.toastOp ?? ""}`, marginTop: `${v.toastMt ?? ""}` }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#22A45D", fontSize: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {"✓"}
            </span>
            {"Paiement enregistré"}
          </div>
          {" "}
          <div style={{ position: "absolute", left: "0", top: "0", width: "24px", height: "24px", margin: "-12px 0 0 -12px", borderRadius: "50%", background: "rgba(124,92,250,.28)", border: "2px solid rgba(255,255,255,.9)", boxShadow: "0 2px 8px rgba(40,30,90,.25)", pointerEvents: "none", transition: "opacity .25s", transform: `${v.tapTf ?? ""}`, opacity: `${v.tapOp ?? ""}` }} />
          {" "}
        </div>
        {" "}
      </div>
    </div>
  );
}
