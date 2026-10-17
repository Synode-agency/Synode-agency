"use client";

import { Fragment, type ReactNode, type RefObject } from "react";
import { Ban, Check, Clock3, Lock, Search, ShieldCheck, User } from "lucide-react";
import styles from "./sections.module.css";

/**
 * LES BLOCS DE TEXTE DES DEUX SECTIONS.
 *
 * Aucun ne porte d'horloge ni de texte en dur : l'état arrive en props, les
 * textes aussi. C'est ce qui permet à la page d'un autre projet de reprendre
 * les mêmes blocs avec son propre contenu.
 */

export function Badge({ children, onWhite }: { children: ReactNode; onWhite?: boolean }) {
  return <span className={onWhite ? `${styles.badge} ${styles.badgeWhite}` : styles.badge}>{children}</span>;
}

/** Le titre, avec sa partie clé peinte en bleu. */
export function Title({ before, accent, after }: { before: string; accent: string; after?: string }) {
  /* Un `\n` dans la première partie coupe le titre, comme ailleurs sur le
     site. La coupe ne vaut qu'à partir de 768px : sur téléphone, une coupe
     calée sur une colonne large produit une ligne orpheline. */
  /* ⚠ L'ESPACE AVANT LA COUPE EST INDISPENSABLE. Le `\n` du texte remplace
     l'espace entre deux mots ; sur téléphone la coupe est masquée, et sans
     cette espace les mots se collaient : « The context ofour », « Le contexte
     denotre », « achievewith », « cherchonsà ». Au bureau, une espace juste
     avant un retour à la ligne ne s'affiche pas : rien n'y change. */
  const lines = before.split("\n");
  return (
    <h2 className={styles.h2}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && <>{" "}<br className="only-desktop" /></>}
          {line}
        </Fragment>
      ))}
      <span className={styles.accent}>{accent}</span>
      {after}
    </h2>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return <h3 className={styles.h3}>{children}</h3>;
}

/* ---------------------------------------------------- Le lecteur d'étapes */

export function StepReader({
  steps,
  active,
  onHover,
}: {
  steps: readonly { name: string; text: string }[];
  active: number;
  onHover: (index: number | null) => void;
}) {
  return (
    <div className={styles.reader}>
      <div className={styles.readerTop}>
        {steps.map((step, i) => (
          <span
            key={step.name}
            className={styles.readerTab}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
          >
            <em className={i <= active ? styles.numOn : undefined}>{String(i + 1).padStart(2, "0")}</em>
            <i className={styles.readerBar}>
              <b style={{ width: i < active ? "100%" : i === active ? undefined : "0%" }} className={i === active ? styles.barRun : undefined} />
            </i>
          </span>
        ))}
      </div>
      <div className={styles.readerBody} key={active}>
        <i className={styles.readerIcon}><Search aria-hidden /></i>
        <span>
          <strong>{steps[active].name}</strong>
          <em>{steps[active].text}</em>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- La liste cochée */

export function CheckList({ items, active }: { items: readonly string[]; active: number }) {
  return (
    <div className={styles.checks}>
      {items.map((item, i) => (
        <span
          key={item}
          className={[
            styles.check,
            i === active ? styles.checkOn : "",
            i < active ? styles.checkDone : "",
          ].filter(Boolean).join(" ")}
        >
          <i><Check aria-hidden /></i>
          {item}
        </span>
      ))}
    </div>
  );
}

/* --------------------------------------------------- L'encadré au bouclier */

export function ShieldNote({ children }: { children: ReactNode }) {
  return (
    <p className={styles.shield}>
      <ShieldCheck aria-hidden />
      {children}
    </p>
  );
}

/* ------------------------------------------------------- Les trois objectifs */

const GOAL_ICONS = [Clock3, Search, Ban];

export function Goals({
  items,
  active,
  label,
  foot,
}: {
  items: readonly string[];
  active: number;
  label: string;
  foot: string;
}) {
  return (
    <div className={styles.goals}>
      {items.map((item, i) => {
        const Icon = GOAL_ICONS[i] ?? Clock3;
        return (
          <span key={item} className={i === active ? `${styles.goal} ${styles.goalOn}` : styles.goal}>
            <i className={styles.goalIcon}><Icon aria-hidden /></i>
            <span className={styles.goalText}>{item}</span>
            <em className={styles.goalTag}>{label}</em>
          </span>
        );
      })}
      <span className={styles.goalsFoot}>{foot}</span>
    </div>
  );
}

/* ----------------------------------------------------------- Les limites */

const LIMIT_ICONS = [Lock, User];

export function Limits({ items }: { items: readonly string[] }) {
  return (
    <div className={styles.limits}>
      {items.map((item, i) => {
        const Icon = LIMIT_ICONS[i] ?? Lock;
        return (
          <span key={item} className={styles.limit}>
            <i className={styles.limitIcon}><Icon aria-hidden /></i>
            {item}
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------- L'enveloppe d'une section */

export function Section({
  tone,
  rootRef,
  left,
  right,
}: {
  tone: "white" | "tint";
  rootRef: RefObject<HTMLElement | null>;
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <section className={tone === "tint" ? `${styles.section} ${styles.sectionTint}` : styles.section} ref={rootRef}>
      <div className={styles.inner}>
        <div className={styles.copy}>{left}</div>
        {/* Décoratif : tout ce que montrent ces écrans est écrit à gauche. */}
        <div className={styles.visual} aria-hidden>{right}</div>
      </div>
    </section>
  );
}
