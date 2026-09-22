"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface WorksState {
  category: string;
  setCategory: (id: string) => void;
}

const WorksContext = createContext<WorksState | null>(null);

/**
 * Holds which domain the Réalisations page is showing.
 *
 * The three buttons live inside the hero card and the projects they filter
 * live in the section under it, so the state has to sit above both. Server
 * children pass straight through, so everything else on the page stays
 * server-rendered.
 */
export function WorksProvider({
  initial,
  children,
}: {
  initial: string;
  children: ReactNode;
}) {
  const [category, setCategory] = useState(initial);

  return (
    <WorksContext.Provider value={{ category, setCategory }}>
      {children}
    </WorksContext.Provider>
  );
}

export function useWorks() {
  const ctx = useContext(WorksContext);
  if (!ctx) throw new Error("useWorks must be used inside a WorksProvider");
  return ctx;
}
