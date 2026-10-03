import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent, path, ROUTES, type Locale } from "@/lib/content";
import { BrickVisual, brickIcons } from "./solution-visuals";

/* Quatre intitulés sont au pluriel et prennent l'article, deux sont au
   singulier et ne le supportent pas : « Découvrez les Data & Intelligence »
   ne se dit pas. L'anglais n'a pas le problème. */
const NO_ARTICLE = new Set(["data-intelligence", "formation-adoption-ia"]);

/**
 * Les six familles, en deux présentations.
 *
 * L'accueil garde la grille régulière déjà validée : rien n'y change.
 * `overview`, sur la page Solutions, passe en composition bento : un module
 * large qui ouvre la série, deux moyens, puis trois égaux. Les contenus, les
 * liens et les illustrations sont les mêmes des deux côtés ; seule la
 * répartition des surfaces diffère.
 */
export function SolutionFamilies({
  locale,
  overview = false,
  showIndex = true,
}: {
  locale: Locale;
  overview?: boolean;
  showIndex?: boolean;
}) {
  const { solutions } = getContent(locale);
  const fr = locale === "fr";
  return <div className={`family-bento section-gap${overview ? " family-bento--overview" : ""}`}>
    {solutions.bricks.map((family, index) => {
      const Icon = brickIcons[family.visual];
      return <article id={overview ? family.slug : undefined} key={family.slug} className={`technical-card family-card family-card--${index}`}>
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
