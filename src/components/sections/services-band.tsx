import Link from "next/link";
import { ArrowRight, Headset, Target, UserCheck } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { Reveal } from "@/components/site/reveal";
import { renderLines } from "@/lib/lines";
import {
  BarChartIcon,
  ConnectIcon,
  FileIcon,
  NetworkIcon,
  PhoneLinearIcon,
  RobotLineIcon,
  ScreenIcon,
  TimeLineIcon,
  ZoomIcon,
} from "@/components/site/icons";
import { getContent, path, type Locale } from "@/lib/content";

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Une icône par prestation, choisie pour ce que la prestation fait et non
 * pour la famille à laquelle elle appartient. Dix viennent du jeu dessiné de
 * `public/svg-icons` ; les deux dernières n'y ont pas d'équivalent.
 *
 * La table est ici et non dans `content.ts` : une icône est de la mise en
 * forme, pas du contenu, et la traduction n'a rien à en dire.
 */
const SERVICE_ICONS: Record<string, Glyph> = {
  "workflows-integrations": NetworkIcon,
  "traitement-documents": FileIcon,
  "relances-suivis": TimeLineIcon,
  "tableaux-de-bord": BarChartIcon,
  "portails-outils-internes": ScreenIcon,
  "synchronisation-crm": ConnectIcon,
  "agent-telephonique": PhoneLinearIcon,
  "agent-conversationnel": RobotLineIcon,
  "qualification-prospects": UserCheck,
  "assistant-documentaire": ZoomIcon,
  "support-interne": Headset,
  "agent-prospection": Target,
};

/**
 * Nos services : les deux familles et leurs douze prestations, nommées une
 * par une.
 *
 * Aucune carte. Le titre de la famille tient la colonne de gauche, ses six
 * prestations s'alignent à droite, séparées par un filet. Douze cartes
 * bordées posaient douze surfaces de plus sur une page qui en avait déjà
 * beaucoup, et c'est le nom de la prestation qu'on doit regarder, pas la
 * boîte autour.
 *
 * Il n'existe pas de page qui les rassemble, et c'est délibéré : une page
 * d'index n'aurait rien dit de plus que cette section, et aurait mis une
 * porte de plus entre le visiteur et la prestation qu'il cherche. Chaque
 * carte mène directement à sa page. La famille, elle, ne mène nulle part —
 * elle est un intitulé, pas une destination.
 */
export function ServicesBand({ locale }: { locale: Locale }) {
  const { services } = getContent(locale);

  return (
    <section id="services" className="section-screen relative">
      <ChapterMark n={1} side="right" />

      <div className="container-page">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={renderLines(services.title, [services.titleAccent])}
          subtitle={services.body}
          align="left"
          className="reveal-left"
        />

        <div className="services-families">
          {services.families.map((family, f) => (
            <div key={family.slug} className="services-family">
              <Reveal className="reveal-left services-family-head">
                <span aria-hidden className="services-family-num">
                  {String(f + 1).padStart(2, "0")}
                </span>
                <h3
                  id={`famille-${family.slug}`}
                  className="services-family-title"
                >
                  {family.title}
                </h3>
                <p className="services-family-lead">{family.lead}</p>
                <span aria-hidden className="services-family-count">
                  {family.items.length} {services.countLabel}
                </span>
              </Reveal>

              {/* Une liste, pas une grille de cartes. Douze cartes bordées
                  posaient douze surfaces sur une page qui en avait déjà
                  beaucoup ; un filet entre deux lignes suffit à les séparer,
                  et le nom de la prestation redevient ce qu'on regarde. */}
              <ul
                className="services-list"
                aria-labelledby={`famille-${family.slug}`}
              >
                {family.items.map((item, i) => {
                  const Glyph = SERVICE_ICONS[item.slug];
                  return (
                    <li key={item.slug}>
                      <Reveal delay={40 + i * 40} className="reveal-up">
                        <Link
                          href={path(locale, `/services/${item.slug}`)}
                          className="service-row"
                        >
                          <span aria-hidden className="service-row-icon">
                            {Glyph && <Glyph />}
                          </span>
                          <span className="service-row-copy">
                            <b className="service-row-title">{item.title}</b>
                            <i className="service-row-lead">{item.lead}</i>
                          </span>
                          <ArrowRight aria-hidden className="service-row-go" />
                        </Link>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
