"use client";

import { useSyncExternalStore } from "react";

/**
 * L'année du copyright.
 *
 * Les pages sont générées au build : écrite côté serveur seulement, l'année
 * restait celle du dernier déploiement, et le 1er janvier le pied de page
 * affichait encore l'année passée (K18 de l'audit). Le serveur donne
 * l'année du build, le navigateur la remplace par la sienne après
 * l'hydratation, sans écart signalé par React.
 */
const noop = () => () => {};

export function CurrentYear({ buildYear }: { buildYear: number }) {
  return useSyncExternalStore(noop, () => new Date().getFullYear(), () => buildYear);
}
