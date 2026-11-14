"use client";

import { Fragment } from "react";
import { hole } from "../hole";
import { PlancheFrame } from "./planche-frame";

/**
 * ILL-06 · COMPTABILITÉ SUR TÉLÉPHONE (cadre 560 × 400, boucle de 7 s).
 *
 * Téléphone en thème sombre, coupé en haut : un paiement de 120 € arrive, le résultat du mois et la barre de novembre montent, un message confirme l'enregistrement.
 *
 * Reproduction à l'identique de `COORY_DESIGN_TO_CODE_HANDOFF/components/ILL-06/template.original.html`.
 * ⚠ Le JSX ci-dessous est une conversion MÉCANIQUE du gabarit (`{{ x }}` →
 * `v.x`, `sc-for` → `.map`, chaque trou de texte dans son <span>) : styles
 * inline et valeurs d'origine. Ne pas y retoucher une valeur à la main :
 * corriger le gabarit d'origine et reconvertir. Le cadre, l'échelle et
 * l'horloge sont dans `planche-frame.tsx`, l'état dans `timeline.ts`.
 *
 * Correction voulue (Antonino, 14/11) : la barre d'adresse affichait « coory.app »,
 * qui n'est pas le domaine de Coory ; elle affiche « coory-beta.vercel.app ».
 * Corrigé aussi dans les gabarits d'origine du dossier de passation.
 */
export function CooryComptaMobile({ debugT }: { debugT?: number }) {
  return (
    <PlancheFrame height={400} loop={7} debugT={debugT}>
      {(v) => (
        <>
          {" "}
          <div style={{ position: "absolute", left: "130px", top: "-150px", width: "300px", height: "530px", boxSizing: "border-box", borderRadius: "48px", border: "8px solid #0E0E12", background: "#111114", overflow: "hidden" }}>
            {" "}
            <div style={{ position: "absolute", left: "12px", right: "12px", top: "96px", height: "38px", borderRadius: "12px", background: "#1C1C21", border: "1px solid #2A2A31", display: "grid", gridTemplateColumns: "repeat(3,1fr)", alignItems: "center", textAlign: "center", fontSize: "12px", color: "#8A8A96" }}>
              <span>
                {"Semaine"}
              </span>
              <span style={{ margin: "3px", padding: "7px 0", borderRadius: "9px", background: "#26262D", color: "#FFFFFF", fontWeight: "600" }}>
                {"Mois"}
              </span>
              <span>
                {"Année"}
              </span>
            </div>
            {" "}
            <div style={{ position: "absolute", left: "12px", right: "12px", top: "146px", borderRadius: "18px", background: "#18181D", border: "1px solid #26262D", padding: "14px" }}>
              {" "}
              <div style={{ fontSize: "11.5px", color: "#A3A3B0" }}>
                {"Résultat · Novembre 2026"}
              </div>
              {" "}
              <div style={{ marginTop: "4px", fontSize: "27px", fontWeight: "700", letterSpacing: "-.5px", whiteSpace: "nowrap", transition: "color .4s", color: `${v.i6.resC ?? ""}` }}>
                {hole(v.i6.res)}
              </div>
              {" "}
              <div style={{ fontSize: "11px", color: "#8A8A96" }}>
                {"Gagné – dépensé"}
              </div>
              {" "}
              <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div style={{ borderRadius: "12px", background: "#222228", padding: "9px 10px" }}>
                  <div style={{ fontSize: "10.5px", color: "#A3A3B0", whiteSpace: "nowrap" }}>
                    <span style={{ color: "#8E6CFA" }}>
                      {"●"}
                    </span>
                    {" Gagné"}
                  </div>
                  <div style={{ marginTop: "3px", fontSize: "14px", fontWeight: "700", color: "#FFFFFF", whiteSpace: "nowrap" }}>
                    {hole(v.i6.gagne)}
                  </div>
                </div>
                <div style={{ borderRadius: "12px", background: "#222228", padding: "9px 10px" }}>
                  <div style={{ fontSize: "10.5px", color: "#A3A3B0", whiteSpace: "nowrap" }}>
                    <span style={{ color: "#F2B23A" }}>
                      {"●"}
                    </span>
                    {" Dépensé"}
                  </div>
                  <div style={{ marginTop: "3px", fontSize: "14px", fontWeight: "700", color: "#FFFFFF", whiteSpace: "nowrap" }}>
                    {"605,00 €"}
                  </div>
                </div>
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "12px", right: "12px", top: "318px", height: "118px", boxSizing: "border-box", borderRadius: "18px", background: "#18181D", border: "1px solid #26262D", padding: "12px 14px 8px", display: "flex", flexDirection: "column" }}>
              {" "}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", fontWeight: "600", color: "#FFFFFF", whiteSpace: "nowrap" }}>
                {"Gagné et dépensé"}
                <span style={{ fontSize: "10px", fontWeight: "400", color: "#A3A3B0" }}>
                  <span style={{ color: "#8E6CFA" }}>
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
              <div style={{ flex: "1", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: "14px", paddingRight: "6px" }}>
                {v.i6.bars.map((b, i) => (
                  <Fragment key={i}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "62px" }}>
                        <span style={{ width: "9px", borderRadius: "3px 3px 0 0", transition: "height .6s cubic-bezier(.2,.8,.2,1)", height: `${b.g ?? ""}`, background: `${b.gc ?? ""}` }} />
                        <span style={{ width: "9px", borderRadius: "3px 3px 0 0", height: `${b.d ?? ""}`, background: "#7A5A1E" }} />
                      </div>
                      <span style={{ fontSize: "9px", color: "#8A8A96" }}>
                        {hole(b.m)}
                      </span>
                    </div>
                  </Fragment>
                ))}
              </div>
              {" "}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "50%", top: "446px", marginLeft: "-104px", width: "208px", height: "34px", borderRadius: "17px", background: "rgba(34,166,93,.16)", border: "1px solid #2C7A50", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "11.5px", fontWeight: "600", color: "#6EE0A2", whiteSpace: "nowrap", transition: "opacity .35s,transform .35s", opacity: `${v.i6.toast ?? ""}`, transform: `${v.i6.toastTf ?? ""}` }}>
              {"✓ Paiement enregistré · 120,00 €"}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "18px", height: "30px", borderRadius: "15px", background: "#1C1C21", border: "1px solid #2A2A31", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10.5px", color: "#C9C9D2" }}>
              {"coory-beta.vercel.app"}
            </div>
            {" "}
            <div style={{ position: "absolute", left: "50%", bottom: "6px", width: "100px", height: "4px", marginLeft: "-50px", borderRadius: "2px", background: "#5A5A66" }} />
            {" "}
          </div>
          {" "}
        </>
      )}
    </PlancheFrame>
  );
}
