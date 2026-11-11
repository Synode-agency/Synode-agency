import { notFound } from "next/navigation";

/* Toute adresse sous `/en` qui ne correspond à aucune page arrive ici, et
   repart aussitôt vers `../not-found.tsx` : la 404 anglaise, et non la 404
   globale, qui est en français. Les pages existantes passent avant ce
   segment attrape-tout : Next préfère toujours une route plus précise. */
export default function Missing() {
  notFound();
}
