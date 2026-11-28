"use client";

import { ErreurPage } from "@/components/site/erreur-page";

/* La page d'erreur des pages françaises (voir `ErreurPage`). Elle ne couvre
   pas le layout racine lui-même : c'est `app/global-error.tsx`. */
export default function Erreur({ retry }: { error: unknown; retry: () => void }) {
  return <ErreurPage locale="fr" retry={retry} />;
}
