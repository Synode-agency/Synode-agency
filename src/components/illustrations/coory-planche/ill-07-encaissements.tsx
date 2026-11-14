"use client";

import { Fragment } from "react";
import { hole } from "../hole";
import { PlancheFrame } from "./planche-frame";

/**
 * ILL-07 · NOTIFICATIONS · SÉANCES À ENCAISSER (cadre 560 × 480, boucle de 8 s).
 *
 * Fenêtre claire, coupée à droite : trois séances passent l'une après l'autre en « ✓ Encaissé », les compteurs descendent ; à droite, les tâches du jour.
 *
 * Reproduction à l'identique de `COORY_DESIGN_TO_CODE_HANDOFF/components/ILL-07/template.original.html`.
 * ⚠ Le JSX ci-dessous est une conversion MÉCANIQUE du gabarit (`{{ x }}` →
 * `v.x`, `sc-for` → `.map`, chaque trou de texte dans son <span>) : styles
 * inline et valeurs d'origine. Ne pas y retoucher une valeur à la main :
 * corriger le gabarit d'origine et reconvertir. Le cadre, l'échelle et
 * l'horloge sont dans `planche-frame.tsx`, l'état dans `timeline.ts`.
 *
 * Correction voulue (Antonino, 14/11) : Coory ne fait pas de factures. La tâche
 * « Relancer Sophie pour la facture d'octobre » devient « … pour son paiement
 * d'octobre ». Corrigé aussi dans les gabarits d'origine du dossier de passation.
 */
export function CooryEncaissements({ debugT }: { debugT?: number }) {
  return (
    <PlancheFrame height={480} loop={8} debugT={debugT}>
      {(v) => (
        <>
          {" "}
          <div style={{ position: "absolute", left: "40px", top: "27px", width: "620px", height: "426px", boxSizing: "border-box", borderRadius: "24px 0 0 24px", border: "1px solid #E6E6EE", borderRight: "0", background: "#F4F4F8", overflow: "hidden", padding: "10px 0 10px 10px", display: "flex", flexDirection: "column", gap: "9px" }}>
            {" "}
            <div style={{ height: "42px", flex: "none", borderRadius: "14px 0 0 14px", background: "#FFFFFF", display: "flex", alignItems: "center", gap: "8px", padding: "0 12px", whiteSpace: "nowrap" }}>
              <span style={{ fontSize: "13px", color: "#7C5CFA" }}>
                {"🔔"}
              </span>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#1C1C28", whiteSpace: "nowrap" }}>
                {"Notifications"}
              </span>
              <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#FFFFFF", background: "#7C5CFA", borderRadius: "999px", padding: "2px 7px" }}>
                {hole(v.i7.unread)}
              </span>
              <span style={{ marginLeft: "auto", marginRight: "110px", fontSize: "11px", fontWeight: "600", color: "#FFFFFF", background: "#7C5CFA", borderRadius: "8px", padding: "6px 10px" }}>
                {"✦ Assistant IA"}
              </span>
            </div>
            {" "}
            <div style={{ flex: "1", minHeight: "0", display: "grid", gridTemplateColumns: "330px 260px", gap: "9px" }}>
              {" "}
              <div style={{ borderRadius: "16px", background: "#FFFFFF", padding: "12px 14px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#1C1C28" }}>
                    {"Séances à encaisser"}
                  </span>
                  <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#FFFFFF", background: "#7C5CFA", borderRadius: "999px", padding: "2px 7px" }}>
                    {hole(v.i7.left)}
                  </span>
                  <span style={{ marginLeft: "auto", fontSize: "10.5px", color: "#7C5CFA" }}>
                    {"Comptabilité"}
                  </span>
                </div>
                {" "}
                {v.i7.rows.map((r, i) => (
                  <Fragment key={i}>
                    <div style={{ marginTop: "7px", height: "44px", boxSizing: "border-box", borderRadius: "10px", display: "flex", alignItems: "center", gap: "9px", padding: "0 8px", transition: "background .4s", background: `${r.bg ?? ""}` }}>
                      <span style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#F1F1F6", color: "#4A4D5A", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
                        {hole(r.i)}
                      </span>
                      <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column" }}>
                        <span style={{ fontSize: "11.5px", fontWeight: "600", color: "#1C1C28", whiteSpace: "nowrap" }}>
                          {hole(r.n)}
                        </span>
                        <span style={{ fontSize: "9.5px", color: "#8A8D9A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {hole(r.s)}
                        </span>
                      </span>
                      <span style={{ fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap", transition: "color .4s", color: `${r.ac ?? ""}` }}>
                        {hole(r.a)}
                      </span>
                    </div>
                  </Fragment>
                ))}
                {" "}
              </div>
              {" "}
              <div style={{ borderRadius: "16px 0 0 16px", background: "#FFFFFF", padding: "12px 14px", display: "flex", flexDirection: "column", gap: "8px", overflow: "hidden" }}>
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap" }}>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#1C1C28" }}>
                    {"Tâches du jour"}
                  </span>
                  <span style={{ fontSize: "10.5px", fontWeight: "700", color: "#FFFFFF", background: "#7C5CFA", borderRadius: "999px", padding: "2px 7px" }}>
                    {"2"}
                  </span>
                </div>
                {" "}
                <div style={{ borderRadius: "10px", padding: "8px", background: "#FAFAFC", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#1C1C28", whiteSpace: "nowrap" }}>
                    {"Préparer le bloc 2 du programme de Lucas"}
                  </span>
                  <span style={{ display: "flex", gap: "5px" }}>
                    <span style={{ fontSize: "9px", color: "#B57A12", background: "#FFF4DE", borderRadius: "6px", padding: "2px 6px" }}>
                      {"Haute"}
                    </span>
                    <span style={{ fontSize: "9px", color: "#B57A12", background: "#FFF4DE", borderRadius: "6px", padding: "2px 6px" }}>
                      {"En retard"}
                    </span>
                  </span>
                </div>
                {" "}
                <div style={{ borderRadius: "10px", padding: "8px", background: "#FAFAFC", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <span style={{ fontSize: "11px", fontWeight: "600", color: "#1C1C28", whiteSpace: "nowrap" }}>
                    {"Relancer Sophie pour son paiement d'octobre"}
                  </span>
                  <span style={{ display: "flex", gap: "5px" }}>
                    <span style={{ fontSize: "9px", color: "#B57A12", background: "#FFF4DE", borderRadius: "6px", padding: "2px 6px" }}>
                      {"En retard"}
                    </span>
                  </span>
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
