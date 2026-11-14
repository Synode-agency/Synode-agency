"use client";

import { Fragment } from "react";
import { hole } from "../hole";
import { PlancheFrame } from "./planche-frame";

/**
 * ILL-08 · ASSISTANT IA (cadre 560 × 480, boucle de 9,5 s).
 *
 * Fenêtre claire, coupée à droite : le coach tape sa demande, l'assistant prépare une semaine d'affûtage, le coach la crée d'un clic (« ✓ Programme créé »).
 *
 * Reproduction à l'identique de `COORY_DESIGN_TO_CODE_HANDOFF/components/ILL-08/template.original.html`.
 * ⚠ Le JSX ci-dessous est une conversion MÉCANIQUE du gabarit (`{{ x }}` →
 * `v.x`, `sc-for` → `.map`, chaque trou de texte dans son <span>) : styles
 * inline et valeurs d'origine. Ne pas y retoucher une valeur à la main :
 * corriger le gabarit d'origine et reconvertir. Le cadre, l'échelle et
 * l'horloge sont dans `planche-frame.tsx`, l'état dans `timeline.ts`.
 *
 * Correction voulue (Antonino, 14/11) : dans la carte de l'assistant, les quatre
 * lignes étaient sur deux colonnes de 143 px, trop étroites. « Ergomètres légers ·
 * 3 × 500 m » (170 px) passait sous « Repos actif », et deux pastilles étaient
 * écrasées à 0 px. Les lignes passent sur une colonne : aucun texte ne change, la
 * carte reste dans la fenêtre. Corrigé aussi dans les gabarits d'origine.
 */
export function CooryAssistant({ debugT }: { debugT?: number }) {
  return (
    <PlancheFrame height={480} loop={9.5} debugT={debugT}>
      {(v) => (
        <>
          {" "}
          <div style={{ position: "absolute", left: "24px", top: "27px", width: "600px", height: "426px", boxSizing: "border-box", borderRadius: "24px 0 0 24px", border: "1px solid #E6E6EE", borderRight: "0", background: "#F4F4F8", overflow: "hidden", padding: "10px 0 10px 10px", display: "flex", gap: "10px" }}>
            {" "}
            <div style={{ width: "128px", flex: "none", boxSizing: "border-box", borderRadius: "16px", background: "#FFFFFF", padding: "14px 8px", display: "flex", flexDirection: "column", gap: "2px" }}>
              {" "}
              {/* eslint-disable-next-line @next/next/no-img-element -- copie exacte de l'original */}
              <img src="/illustrations/coory-logo-light.png" alt="Coory" style={{ width: "66px", height: "auto", margin: "0 0 12px 8px", display: "block" }} />
              {" "}
              {v.i8.nav.map((n, i) => (
                <Fragment key={i}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", height: "26px", padding: "0 8px", borderRadius: "8px", fontSize: "11px", whiteSpace: "nowrap", background: `${n.bg ?? ""}`, color: `${n.c ?? ""}`, marginTop: `${n.mt ?? ""}` }}>
                    <span style={{ width: "12px", textAlign: "center", fontSize: "11px" }}>
                      {hole(n.i)}
                    </span>
                    {hole(n.t)}
                  </span>
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
            <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "9px" }}>
              {" "}
              <div style={{ height: "42px", flex: "none", borderRadius: "14px 0 0 14px", background: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px", padding: "0 14px", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#1C1C28" }}>
                  <span style={{ color: "#7C5CFA" }}>
                    {"✦"}
                  </span>
                  {" Assistant IA"}
                </span>
                <span style={{ fontSize: "10.5px", color: "#8A8D9A" }}>
                  {"Je propose, tu décides."}
                </span>
              </div>
              {" "}
              <div style={{ position: "relative", flex: "1", minHeight: "0", borderRadius: "16px 0 0 16px", background: "#FFFFFF", overflow: "hidden" }}>
                {" "}
                <div style={{ position: "absolute", inset: "0", padding: "22px 110px 0 26px", display: "flex", flexDirection: "column", alignItems: "flex-start", transition: "opacity .4s", opacity: `${v.i8.a ?? ""}` }}>
                  {" "}
                  <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#C9B8FF,#7C5CFA 55%,#5A3FD6)", boxShadow: "0 10px 26px rgba(124,92,250,.35)" }} />
                  {" "}
                  <div style={{ marginTop: "12px", fontSize: "19px", lineHeight: "24px", fontWeight: "700", color: "#1C1C28" }}>
                    {"Bonjour Samuel. Comment puis-je t'aider ?"}
                  </div>
                  {" "}
                  <div style={{ marginTop: "16px", width: "100%", boxSizing: "border-box", borderRadius: "14px", border: "1px solid #C9BCFF", background: "#FFFFFF", boxShadow: "0 0 0 3px rgba(124,92,250,.10)", padding: "12px 12px 10px" }}>
                    {" "}
                    <div style={{ minHeight: "20px", fontSize: "12.5px", lineHeight: "17px", color: `${v.i8.txC ?? ""}` }}>
                      {hole(v.i8.typed)}
                      <span style={{ display: "inline-block", width: "1px", height: "13px", marginLeft: "1px", verticalAlign: "-2px", background: "#7C5CFA", opacity: `${v.i8.caret ?? ""}` }} />
                    </div>
                    {" "}
                    <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "10.5px", color: "#4A4D5A", border: "1px solid #ECECF2", borderRadius: "999px", padding: "4px 10px", whiteSpace: "nowrap" }}>
                        {"☺ Sportif"}
                      </span>
                      <span style={{ fontSize: "10.5px", color: "#4A4D5A", border: "1px solid #ECECF2", borderRadius: "999px", padding: "4px 10px", whiteSpace: "nowrap" }}>
                        {"▤ Programme"}
                      </span>
                      <span style={{ marginLeft: "auto", width: "28px", height: "28px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "#FFFFFF", transition: "background .25s,transform .2s", background: `${v.i8.sendBg ?? ""}`, transform: `${v.i8.sendTf ?? ""}` }}>
                        {"↑"}
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div style={{ position: "absolute", inset: "0", padding: "16px 100px 0 22px", display: "flex", flexDirection: "column", gap: "9px", transition: "opacity .4s", opacity: `${v.i8.b ?? ""}` }}>
                  {" "}
                  <div style={{ alignSelf: "flex-end", borderRadius: "14px 14px 4px 14px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "12px", lineHeight: "16px", padding: "8px 12px", whiteSpace: "nowrap" }}>
                    {"Prépare une semaine d'affûtage pour Anaïs"}
                  </div>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#6B6E7B", transition: "opacity .3s", opacity: `${v.i8.think ?? ""}` }}>
                    <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%,#C9B8FF,#7C5CFA 60%)" }} />
                    {"Coory prépare la semaine"}
                    {hole(v.i8.dots)}
                  </div>
                  {" "}
                  <div style={{ borderRadius: "14px", background: "#FAFAFC", border: "1px solid #ECECF2", padding: "12px 14px", transition: "opacity .4s,transform .4s", opacity: `${v.i8.card ?? ""}`, transform: `${v.i8.cardTf ?? ""}` }}>
                    {" "}
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "#1C1C28" }}>
                        {"Semaine d'affûtage · Anaïs"}
                      </span>
                      <span style={{ fontSize: "10.5px", color: "#8A8D9A" }}>
                        {"Prépa HYROX · semaine 12"}
                      </span>
                    </div>
                    {" "}
                    <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "6px 14px" }}>
                      {v.i8.rows.map((r, i) => (
                        <Fragment key={i}>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "11.5px", whiteSpace: "nowrap", transition: "opacity .3s", opacity: `${r.op ?? ""}` }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: `${r.c ?? ""}` }} />
                            <span style={{ color: "#1C1C28", fontWeight: "600" }}>
                              {hole(r.t)}
                            </span>
                            <span style={{ marginLeft: "auto", color: "#6B6E7B" }}>
                              {hole(r.d)}
                            </span>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                    {" "}
                    <div style={{ marginTop: "12px", width: "170px", height: "32px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "600", transition: "background .3s,transform .2s,opacity .3s", opacity: `${v.i8.btnOp ?? ""}`, background: `${v.i8.btnBg ?? ""}`, color: `${v.i8.btnC ?? ""}`, transform: `${v.i8.btnTf ?? ""}` }}>
                      {hole(v.i8.btnTx)}
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
        </>
      )}
    </PlancheFrame>
  );
}
