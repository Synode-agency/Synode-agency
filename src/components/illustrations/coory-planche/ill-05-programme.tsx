"use client";

import { Fragment } from "react";
import { hole } from "../hole";
import { PlancheFrame } from "./planche-frame";

/**
 * ILL-05 · PROGRAMME « PRÉPA MARATHON » (cadre 560 × 480, boucle de 10 s).
 *
 * Fenêtre claire, coupée à gauche : les semaines 1, 2 puis 3 défilent avec leurs quatre séances, puis le programme est publié (« ✓ Publié »).
 *
 * Reproduction à l'identique de `COORY_DESIGN_TO_CODE_HANDOFF/components/ILL-05/template.original.html`.
 * ⚠ Le JSX ci-dessous est une conversion MÉCANIQUE du gabarit (`{{ x }}` →
 * `v.x`, `sc-for` → `.map`, chaque trou de texte dans son <span>) : styles
 * inline et valeurs d'origine. Ne pas y retoucher une valeur à la main :
 * corriger le gabarit d'origine et reconvertir. Le cadre, l'échelle et
 * l'horloge sont dans `planche-frame.tsx`, l'état dans `timeline.ts`.
 */
export function CooryProgramme({ debugT }: { debugT?: number }) {
  return (
    <PlancheFrame height={480} loop={10} debugT={debugT}>
      {(v) => (
        <>
          {" "}
          <div style={{ position: "absolute", left: "-66px", top: "27px", width: "616px", height: "426px", boxSizing: "border-box", borderRadius: "0 24px 24px 0", border: "1px solid #E6E6EE", borderLeft: "0", background: "#F4F4F8", overflow: "hidden", padding: "10px 10px 10px 0", display: "flex", gap: "10px" }}>
            {" "}
            <div style={{ width: "56px", flex: "none", borderRadius: "0 16px 16px 0", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", paddingTop: "16px", color: "#9A9DAA", fontSize: "13px" }}>
              <span>
                {"⌂"}
              </span>
              <span>
                {"▦"}
              </span>
              <span>
                {"☺"}
              </span>
              <span style={{ color: "#7C5CFA" }}>
                {"▤"}
              </span>
            </div>
            {" "}
            <div style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "9px" }}>
              {" "}
              <div style={{ height: "42px", flex: "none", borderRadius: "14px", background: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px", padding: "0 12px", whiteSpace: "nowrap" }}>
                <span style={{ fontSize: "12.5px", color: "#8A8D9A" }}>
                  {"← Programmes ·"}
                </span>
                <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#1C1C28" }}>
                  {"prépa marathon"}
                </span>
                <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: "600", color: "#FFFFFF", background: "#7C5CFA", borderRadius: "8px", padding: "6px 10px" }}>
                  {"✦ Assistant IA"}
                </span>
                <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "8px", padding: "6px 11px", transition: "background .3s", color: "#FFFFFF", background: `${v.i5.pubBg ?? ""}`, transform: `${v.i5.pubTf ?? ""}` }}>
                  {hole(v.i5.pubTx)}
                </span>
              </div>
              {" "}
              <div style={{ height: "54px", flex: "none", borderRadius: "14px", background: "#FFFFFF", display: "flex", alignItems: "center", gap: "10px", padding: "0 12px", whiteSpace: "nowrap" }}>
                <span style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#EEE9FF", color: "#7C5CFA", fontSize: "11px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {"A"}
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: "#1C1C28" }}>
                      {"prépa marathon"}
                    </span>
                    <span style={{ fontSize: "10px", color: "#4A4D5A", background: "#F1F1F6", borderRadius: "999px", padding: "2px 8px" }}>
                      {"● Running"}
                    </span>
                  </span>
                  <span style={{ fontSize: "10.5px", color: "#6B6E7B" }}>
                    {"Anaïs · 1 févr. → 26 avr. · 12 semaines"}
                  </span>
                </span>
              </div>
              {" "}
              <div style={{ flex: "1", minHeight: "0", display: "grid", gridTemplateColumns: "118px minmax(0,1fr)", gap: "9px" }}>
                {" "}
                <div style={{ borderRadius: "14px", background: "#FFFFFF", padding: "10px 8px", display: "flex", flexDirection: "column", gap: "3px" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#1C1C28", padding: "0 6px 2px" }}>
                    {"Semaines "}
                    <span style={{ fontWeight: "400", color: "#8A8D9A" }}>
                      {"12"}
                    </span>
                  </span>
                  <span style={{ fontSize: "9px", letterSpacing: "1px", color: "#8A8D9A", padding: "2px 6px" }}>
                    {"BASE · S1–4"}
                  </span>
                  {v.i5.weeks.map((w, i) => (
                    <Fragment key={i}>
                      <span style={{ borderRadius: "8px", padding: "5px 8px", display: "flex", flexDirection: "column", transition: "background .3s", background: `${w.bg ?? ""}` }}>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: `${w.c ?? ""}` }}>
                          {hole(w.t)}
                        </span>
                        <span style={{ fontSize: "9.5px", color: "#8A8D9A" }}>
                          {hole(w.d)}
                        </span>
                      </span>
                    </Fragment>
                  ))}
                </div>
                {" "}
                <div style={{ borderRadius: "14px", background: "#FFFFFF", padding: "10px", display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
                  {" "}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
                    <span style={{ fontSize: "13px", fontWeight: "700", color: "#1C1C28" }}>
                      {hole(v.i5.wTitle)}
                    </span>
                    <span style={{ fontSize: "10px", color: "#8A8D9A" }}>
                      {hole(v.i5.wSub)}
                    </span>
                    <span style={{ marginLeft: "auto", fontSize: "9.5px", color: "#7C5CFA", background: "#F1EEFF", borderRadius: "6px", padding: "2px 7px" }}>
                      {"Agenda"}
                    </span>
                  </div>
                  {" "}
                  <div style={{ flex: "1", minHeight: "0", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "8px" }}>
                    {" "}
                    {v.i5.days.map((d, i) => (
                      <Fragment key={i}>
                        <div style={{ minWidth: "0", borderRadius: "11px", padding: "10px 10px", display: "flex", flexDirection: "column", gap: "6px", transition: "background .35s,opacity .35s", background: `${d.bg ?? ""}`, opacity: `${d.op ?? ""}` }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" }}>
                            <span style={{ width: "18px", height: "18px", borderRadius: "50%", fontSize: "9.5px", fontWeight: "700", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", background: `${d.c ?? ""}` }}>
                              {hole(d.n)}
                            </span>
                            <span style={{ fontSize: "10.5px", fontWeight: "600", color: `${d.c ?? ""}` }}>
                              {hole(d.day)}
                            </span>
                          </span>
                          <span style={{ fontSize: "12.5px", lineHeight: "15px", fontWeight: "700", color: "#1C1C28" }}>
                            {hole(d.t)}
                          </span>
                          <span style={{ fontSize: "10px", fontWeight: "600", color: `${d.c ?? ""}` }}>
                            {hole(d.disc)}
                          </span>
                          <span style={{ marginTop: "auto", fontSize: "10.5px", lineHeight: "13px", color: "#4A4D5A" }}>
                            {hole(d.det)}
                          </span>
                        </div>
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
          </div>
          {" "}
        </>
      )}
    </PlancheFrame>
  );
}
