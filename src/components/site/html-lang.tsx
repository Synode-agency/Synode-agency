"use client";

import { useEffect } from "react";

/**
 * The root layout renders <html lang="fr">. On non-default locale routes this
 * corrects the document language after hydration (single shared root layout).
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [lang]);

  return null;
}
