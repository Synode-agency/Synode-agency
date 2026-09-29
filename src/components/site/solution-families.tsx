import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getContent, path, ROUTES, type Locale } from "@/lib/content";
import { BrickVisual, brickIcons } from "./solution-visuals";

/** Shared editorial grid: content and illustration stay paired in both languages. */
export function SolutionFamilies({ locale, overview = false }: { locale: Locale; overview?: boolean }) {
  const { solutions } = getContent(locale);
  const fr = locale === "fr";
  return <div className="family-bento section-gap">
    {solutions.bricks.map((family, index) => {
      const Icon = brickIcons[family.visual];
      return <article id={overview ? family.slug : undefined} key={family.slug} className={`technical-card family-card family-card--${index}`}>
        <div className="family-copy">
          <div className="family-card-top"><Icon aria-hidden /><span>{String(index + 1).padStart(2, "0")}</span></div>
          <h3>{family.title}</h3>
          <p>{family.text}</p>
          <strong className="family-benefit">{family.benefit}</strong>
        </div>
        <BrickVisual kind={family.visual} locale={locale} />
        <div className="family-example"><span>{fr ? "Exemple possible" : "Possible example"}</span><p>{family.example}</p></div>
        {<Link className="family-link" href={`${path(locale, ROUTES.solutions)}/${family.slug}`}>{fr ? "Explorer cette famille" : "Explore this family"}<ArrowUpRight aria-hidden /></Link>}
      </article>;
    })}
  </div>;
}
