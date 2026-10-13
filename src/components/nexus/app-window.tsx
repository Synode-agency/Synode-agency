"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import styles from "./app-window.module.css";

/**
 * LE CHÂSSIS D'UNE FENÊTRE DE L'APPLICATION.
 *
 * La barre latérale, la barre du haut et l'en-tête de page sont les mêmes
 * d'un écran à l'autre : seul le contenu change. Tout est en props, y
 * compris la marque, pour que la page d'un AUTRE projet puisse reprendre ce
 * châssis sans le dupliquer.
 *
 * ⚠ La fenêtre est volontairement plus large que son bloc et se fait couper
 * net par lui : c'est l'effet recherché, pas un débordement accidentel. Ne
 * pas lui ajouter de `max-width`.
 */

export type WindowBrand =
  /** Le logo Nexus, image à l'appui. */
  | { kind: "nexus"; word: string }
  /** Une lettre dans un carré, pour un projet sans logo. */
  | { kind: "letter"; letter: string; word: string };

export function AppWindow({
  brand,
  by,
  menus,
  active,
  crumb,
  badge,
  kicker,
  title,
  lede,
  className,
  style,
  children,
}: {
  brand: WindowBrand;
  by: string;
  menus: readonly string[];
  active: number;
  crumb: string;
  badge: string;
  kicker: string;
  title: string;
  lede: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={className ? `${styles.win} ${className}` : styles.win} style={style}>
      <div className={styles.side}>
        <span className={styles.brand}>
          {brand.kind === "nexus" ? (
            <Image className={styles.mark} src="/demos/logoN.png" alt="" width={613} height={530} />
          ) : (
            <i className={styles.letter}>{brand.letter}</i>
          )}
          <strong>{brand.word}</strong>
        </span>
        <em className={styles.by}>{by}</em>
        <span className={styles.menus}>
          {menus.map((menu, i) => (
            <i key={menu} className={i === active ? `${styles.menu} ${styles.menuOn}` : styles.menu}>{menu}</i>
          ))}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.top}>
          <em>{crumb}</em>
          <i className={styles.badge}>● {badge}</i>
        </div>
        <div className={styles.page}>
          <span className={styles.kicker}>{kicker}</span>
          <strong className={styles.title}>{title}</strong>
          <em className={styles.lede}>{lede}</em>
          {children}
        </div>
      </div>
    </div>
  );
}
