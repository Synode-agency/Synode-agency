import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Lede } from "./lede";
import { brickIcons } from "./solution-visuals";
import { ANCHORS, getContent, path, ROUTES, type Locale } from "@/lib/content";

export function SolutionsHero({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const labels = fr ? ["Assistants & Agents", "Automatisations", "Logiciels & Applications", "Systèmes connectés", "Data & Intelligence", "Formation & Adoption"] : ["Assistants & Agents", "Automations", "Software & Applications", "Connected Systems", "Data & Intelligence", "Training & Adoption"];
  return <div className="solutions-hero-grid">
    <div className="solutions-hero-copy"><Lede as="h1" kicker={fr ? "Nos solutions" : "Our solutions"} title={fr ? "Six familles.^Votre solution à composer." : "Six families.^A solution shaped for you."} text={fr ? "Un besoin précis, plusieurs façons d’y répondre. Nous concevons la combinaison d’outils, d’IA et d’accompagnement qui a du sens pour votre activité." : "One specific need, several ways to address it. We design the combination of tools, AI and support that makes sense for your business."} />
      <p className="solutions-hero-note">{fr ? "Chaque famille peut répondre à un besoin ou s’associer aux autres. Le point de départ reste le même : votre façon de travailler." : "Each family can address a need on its own or work alongside the others. The starting point stays the same: how you work."}</p>
      <div className="btn-row"><Link href="#briques" className="btn btn--primary">{fr ? "Explorer les six familles" : "Explore the six families"}<ArrowDown aria-hidden /></Link><Link href={`${path(locale, ROUTES.contact)}#${ANCHORS.form}`} className="go">{fr ? "Parlons de votre besoin" : "Tell us what you need"}<ArrowRight aria-hidden /></Link></div>
      <span className="hero-reassurance">{fr ? "Un premier échange gratuit. Un périmètre clair. Un devis personnalisé." : "A free first conversation. A clear scope. A tailored quote."}</span>
    </div>
    <div className="solutions-composer" aria-label={fr ? "Six familles complémentaires autour de votre activité" : "Six complementary families around your business"}>
      <div className="composer-caption"><span className="status-dot" />{fr ? "LE POINT DE DÉPART : VOTRE ACTIVITÉ" : "THE STARTING POINT: YOUR BUSINESS"}</div>
      <div className="composer-grid">{getContent(locale).solutions.bricks.map((family, i) => { const Icon = brickIcons[family.visual]; return <Link key={family.slug} href={`${path(locale, ROUTES.solutions)}/${family.slug}`} aria-label={family.title}><Icon aria-hidden /><span>{labels[i]}</span><span className="composer-index" aria-hidden>0{i + 1}</span></Link>; })}</div>
      <div className="composer-connector" aria-hidden><span /><span /><span /></div>
      <div className="composer-result"><Image src="/synode-mark.png" width={50} height={50} alt="" /><div><strong>{fr ? "Votre solution, avec Synode." : "Your solution, with Synode."}</strong><span>{fr ? "Conçue autour de votre besoin." : "Designed around your needs."}</span></div></div>
      <p>{fr ? "Des approches complémentaires. Aucun forfait imposé." : "Complementary approaches. No fixed packages."}</p>
    </div>
  </div>;
}
