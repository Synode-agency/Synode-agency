"use client";

import { Fragment } from "react";
import { hole } from "../hole";
import { PlancheFrame } from "./planche-frame";

/**
 * ILL-04 · AGENDA SUR TÉLÉPHONE (cadre 560 × 400, boucle de 8 s).
 *
 * Téléphone en thème sombre, coupé en bas : la semaine du 9 au 15 novembre ; le bouton « + » est pressé, un emplacement pointillé apparaît, puis la séance « Thomas P. » s'ajoute le dimanche.
 *
 * Reproduction à l'identique de `COORY_DESIGN_TO_CODE_HANDOFF/components/ILL-04/template.original.html`.
 * ⚠ Le JSX ci-dessous est une conversion MÉCANIQUE du gabarit (`{{ x }}` →
 * `v.x`, `sc-for` → `.map`, chaque trou de texte dans son <span>) : styles
 * inline et valeurs d'origine. Ne pas y retoucher une valeur à la main :
 * corriger le gabarit d'origine et reconvertir. Le cadre, l'échelle et
 * l'horloge sont dans `planche-frame.tsx`, l'état dans `timeline.ts`.
 */
export function CooryAgendaMobile({ debugT }: { debugT?: number }) {
  return (
    <PlancheFrame height={400} loop={8} debugT={debugT}>
      {(v) => (
        <>
          {" "}
          <div style={{ position: "absolute", left: "130px", top: "34px", width: "300px", height: "620px", boxSizing: "border-box", borderRadius: "48px", border: "8px solid #0E0E12", background: "#111114", overflow: "hidden" }}>
            {" "}
            <div style={{ position: "absolute", left: "50%", top: "9px", width: "86px", height: "25px", marginLeft: "-43px", borderRadius: "14px", background: "#000000" }} />
            {" "}
            <div style={{ height: "42px", display: "flex", alignItems: "center", padding: "0 24px", fontSize: "14px", fontWeight: "600", color: "#FFFFFF" }}>
              {"9:41"}
            </div>
            {" "}
            <div style={{ height: "46px", display: "flex", alignItems: "center", gap: "10px", padding: "0 12px" }}>
              {" "}
              <span style={{ width: "36px", height: "36px", boxSizing: "border-box", borderRadius: "11px", border: "1px solid #2A2A31", background: "#1C1C21", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontSize: "15px" }}>
                {"☰"}
              </span>
              {" "}
              <span style={{ fontSize: "16px", fontWeight: "600", color: "#FFFFFF", whiteSpace: "nowrap" }}>
                {"Novembre ⌄"}
              </span>
              {" "}
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px", padding: "3px", borderRadius: "13px", border: "1px solid #2A2A31", background: "#1C1C21" }}>
                <span style={{ width: "30px", height: "30px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#A3A3B0" }}>
                  {"▥"}
                </span>
                <span style={{ width: "30px", height: "30px", boxSizing: "border-box", borderRadius: "9px", border: "1px solid #5B47C9", background: "#2B2350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "#C9BCFF" }}>
                  {"✦"}
                </span>
                <span style={{ position: "relative", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#A3A3B0" }}>
                  {"🔔"}
                  <span style={{ position: "absolute", right: "-2px", top: "-3px", minWidth: "16px", height: "16px", borderRadius: "8px", background: "#7C5CFA", color: "#FFFFFF", fontSize: "9px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {"18"}
                  </span>
                </span>
              </span>
              {" "}
            </div>
            {" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,minmax(0,1fr))", padding: "4px 10px 0", textAlign: "center" }}>
              {" "}
              {v.week.map((w, i) => (
                <Fragment key={i}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                    <span style={{ fontSize: "9.5px", color: "#8A8A96" }}>
                      {hole(w.l)}
                    </span>
                    <span style={{ width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "600", background: `${w.bg ?? ""}`, color: `${w.c ?? ""}` }}>
                      {hole(w.n)}
                    </span>
                  </div>
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
            <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "30px repeat(3,minmax(0,1fr))", height: "28px", borderTop: "1px solid #222228", borderBottom: "1px solid #222228", fontSize: "11.5px", color: "#C9C9D2", alignItems: "center", textAlign: "center" }}>
              <span />
              <span>
                {"Ven "}
                <b style={{ color: "#FFFFFF" }}>
                  {"13"}
                </b>
              </span>
              <span style={{ color: "#B7A6FF" }}>
                {"Sam "}
                <b>
                  {"14"}
                </b>
              </span>
              <span>
                {"Dim "}
                <b style={{ color: "#FFFFFF" }}>
                  {"15"}
                </b>
              </span>
            </div>
            {" "}
            <div style={{ position: "relative", height: "300px" }}>
              {" "}
              {v.hours.map((h, i) => (
                <Fragment key={i}>
                  <div style={{ position: "absolute", left: "0", right: "0", height: "30px", borderTop: "1px solid #1C1C22", fontSize: "9.5px", color: "#6E6E7A", top: `${h.top ?? ""}` }}>
                    <span style={{ position: "absolute", left: "8px", top: "-6px", background: "#111114", padding: "0 2px" }}>
                      {hole(h.t)}
                    </span>
                  </div>
                </Fragment>
              ))}
              {" "}
              <div style={{ position: "absolute", top: "0", bottom: "0", left: "calc(30px + (100% - 30px) / 3)", width: "calc((100% - 30px) / 3)", background: "rgba(124,92,250,.10)", borderLeft: "1px solid #4B3F8F", borderRight: "1px solid #4B3F8F" }} />
              {" "}
              <div style={{ position: "absolute", left: "calc(30px + (100% - 30px) / 3)", width: "calc((100% - 30px) / 3)", top: "66px", height: "1px", background: "#7C5CFA" }}>
                <span style={{ position: "absolute", left: "-3px", top: "-3px", width: "7px", height: "7px", borderRadius: "50%", background: "#7C5CFA" }} />
              </div>
              {" "}
              <div style={{ position: "absolute", boxSizing: "border-box", left: "calc(30px + (100% - 30px) * 2 / 3 + 4px)", width: "calc((100% - 30px) / 3 - 8px)", top: "32px", height: "38px", borderRadius: "8px", border: "1.5px dashed #9F8BFB", background: "rgba(124,92,250,.14)", transition: "opacity .25s", opacity: `${v.i4.slot ?? ""}` }} />
              {" "}
              {v.i4.evs.map((e, i) => (
                <Fragment key={i}>
                  <div style={{ position: "absolute", boxSizing: "border-box", borderRadius: "8px", padding: "4px 6px", overflow: "hidden", transition: "opacity .4s,transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .5s", left: `${e.left ?? ""}`, width: `${e.w ?? ""}`, top: `${e.top ?? ""}`, height: `${e.h ?? ""}`, background: `${e.bg ?? ""}`, color: `${e.c ?? ""}`, opacity: `${e.op ?? ""}`, transform: `${e.tf ?? ""}`, boxShadow: `${e.sh ?? ""}` }}>
                    <div style={{ fontSize: "10.5px", fontWeight: "700", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {hole(e.t)}
                    </div>
                    <div style={{ fontSize: "9.5px", opacity: ".85", whiteSpace: "nowrap" }}>
                      {hole(e.s)}
                    </div>
                  </div>
                </Fragment>
              ))}
              {" "}
            </div>
            {" "}
            <span style={{ position: "absolute", right: "16px", top: "286px", width: "50px", height: "50px", borderRadius: "16px", background: "#F4F4F6", color: "#111114", fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(0,0,0,.4)", transition: "transform .2s", transform: `${v.i4.fab ?? ""}` }}>
              {"+"}
            </span>
            {" "}
          </div>
          {" "}
        </>
      )}
    </PlancheFrame>
  );
}
