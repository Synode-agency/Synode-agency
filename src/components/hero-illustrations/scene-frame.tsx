import type { ReactNode } from "react";
import styles from "./hero-illustrations.module.css";

export function SceneFrame({ children, label, bare = false }: { children: ReactNode; label: string; bare?: boolean }) {
  return (
    <div className={bare ? styles.frameBare : styles.frame} role="img" aria-label={label}>
      <div className={styles.scene}>{children}</div>
    </div>
  );
}
