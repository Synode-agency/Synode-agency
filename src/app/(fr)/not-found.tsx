import { NotFoundPage } from "@/components/site/simple-pages";

/* Next ne sert qu'une page 404 par layout racine. Celle-ci est en français,
   la langue par défaut du site ; une URL inconnue sous /en y atterrit aussi. */
export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
