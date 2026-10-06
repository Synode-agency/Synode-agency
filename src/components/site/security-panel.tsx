"use client";

import { useEffect, useState } from "react";
import { Activity, Check, Lock, ShieldCheck, UserCheck } from "lucide-react";

/**
 * « Sécurité & contrôle » : quatre réglages, et le panneau d'état qu'ils
 * commandent.
 *
 * Les quatre blocs et la liste de droite sont liés : le bloc actif allume
 * son point dans la liste et son interrupteur passe au bleu. C'est ce lien
 * qui fait la démonstration — chaque mesure correspond à un réglage réel,
 * pas à une promesse générale.
 *
 * ── Deux points à ne pas défaire ────────────────────────────────────────
 * 1. L'index 0 est actif au premier rendu, côté serveur comme côté client.
 *    Tirer le bloc actif au montage provoquerait une différence
 *    d'hydratation.
 * 2. `prefers-reduced-motion` ARRÊTE le défilement, il ne l'allonge pas.
 *    Le bloc 01 reste actif et le survol continue de fonctionner.
 * ────────────────────────────────────────────────────────────────────────
 *
 * L'interrupteur n'est pas un contrôle : il est décoratif, `aria-hidden`,
 * et ne réagit à rien. Le rendre cliquable laisserait croire qu'on règle
 * ici la sécurité de son propre projet.
 */

const CYCLE_MS = 2600;

const ICONS = [ShieldCheck, Lock, UserCheck, Activity];

/** Le point de la liste qu'allume chaque bloc. */
const LINKED = [3, 0, 1, 2];

export function SecurityPanel({
  items,
  panelTitle,
  checks,
  panelNote,
}: {
  items: readonly { title: string; text: string }[];
  panelTitle: string;
  checks: readonly string[];
  panelNote: string;
}) {
  const [auto, setAuto] = useState(0);
  const [held, setHeld] = useState<number | null>(null);
  const active = held ?? auto;

  useEffect(() => {
    if (held !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setAuto((n) => (n + 1) % items.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [held, items.length]);

  const lit = LINKED[active];

  return (
    <div className="sec-layout">
      <div className="sec-grid">
        {items.map((item, i) => {
          const Icon = ICONS[i];
          return (
            <article
              key={item.title}
              className={i === active ? "sec-cell is-on" : "sec-cell"}
              onMouseEnter={() => setHeld(i)}
            >
              <div className="sec-cell-top">
                <span className="sec-cell-icon"><Icon aria-hidden /></span>
                <em aria-hidden>{String(i + 1).padStart(2, "0")}</em>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>

      <aside className="sec-state">
        <strong>{panelTitle}</strong>
        <ul>
          {checks.map((label, i) => (
            <li key={label} className={i === lit ? "is-lit" : undefined}>
              <Check aria-hidden />
              <span>{label}</span>
              <i className="sec-switch" aria-hidden />
            </li>
          ))}
        </ul>
        <p>{panelNote}</p>
      </aside>
    </div>
  );
}
