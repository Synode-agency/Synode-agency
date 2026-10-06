import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent, path, ROUTES, type Locale } from "@/lib/content";
import { BrickVisual, brickIcons } from "./solution-visuals";

/* Quatre intitulés sont au pluriel et prennent l'article, deux sont au
   singulier et ne le supportent pas : « Découvrez les Data & Intelligence »
   ne se dit pas. L'anglais n'a pas le problème. */
const NO_ARTICLE = new Set(["data-intelligence", "formation-adoption-ia"]);

/**
 * Les six familles, dans la même grille régulière des deux côtés.
 *
 * La page Solutions a porté un temps une composition bento : un module large
 * ouvrait la série, deux moyens suivaient, trois égaux refermaient. Le
 * premier module y était à la fois plus grand et d'un bleu nuit différent,
 * et c'est précisément ce que la page ne veut plus : les six familles sont
 * proposées au même rang, sans priorité entre elles.
 *
 * `anchors` ne décide donc plus d'une mise en page. Il pose un `id` par
 * famille sur la page Solutions, pour qu'un lien puisse viser une carte
 * précise ; l'accueil n'en a pas besoin, ses cartes y renvoient déjà.
 */
export function SolutionFamilies({
  locale,
  anchors = false,
  showIndex = true,
}: {
  locale: Locale;
  anchors?: boolean;
  showIndex?: boolean;
}) {
  const { solutions } = getContent(locale);
  const fr = locale === "fr";
  return <div className="family-bento section-gap">
    {solutions.bricks.map((family, index) => {
      const Icon = brickIcons[family.visual];
      return <article id={anchors ? family.slug : undefined} key={family.slug} className={`technical-card family-card family-card--${index}`}>
        <div className="family-copy">
          {/* Le numéro n'est affiché que là où l'ordre veut dire quelque
              chose. Sur l'accueil ce sont six services proposés, sans
              priorité entre eux : le numéro y laissait croire à un
              classement. */}
          <div className="family-card-top"><Icon aria-hidden />{showIndex && <span>{String(index + 1).padStart(2, "0")}</span>}</div>
          <h3>{family.title}</h3>
          <p>{family.text}</p>
          <strong className="family-benefit">{family.benefit}</strong>
        </div>
        <BrickVisual kind={family.visual} locale={locale} />
        <div className="family-example"><span>{fr ? "Exemple possible" : "Possible example"}</span><p>{family.example}</p></div>
        {<Link className="family-link" href={`${path(locale, ROUTES.solutions)}/${family.slug}`}>{fr ? `Découvrez ${NO_ARTICLE.has(family.slug) ? "" : "les "}${family.title}` : `Discover ${family.title}`}<ArrowUpRight aria-hidden /></Link>}
      </article>;
    })}
  </div>;
}
