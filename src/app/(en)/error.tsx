"use client";

import { ErreurPage } from "@/components/site/erreur-page";

/* La page d'erreur des pages anglaises (voir `ErreurPage`). */
export default function Erreur({ retry }: { error: unknown; retry: () => void }) {
  return <ErreurPage locale="en" retry={retry} />;
}
