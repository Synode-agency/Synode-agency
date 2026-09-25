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
 * Nos services : les deux familles, chacune dans son propre panneau, et
 * leurs douze prestations nommées une par une.
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
            <Reveal
              key={family.slug}
              delay={80 + f * 120}
              className="services-family reveal-up"
            >
              <div className="services-family-head">
                <span aria-hidden className="services-family-num">
                  {String(f + 1).padStart(2, "0")}
                </span>

                <div className="services-family-copy">
                  <h3
                    id={`famille-${family.slug}`}
                    className="services-family-title"
                  >
                    {family.title}
                  </h3>
                  <p className="services-family-lead">{family.lead}</p>
                </div>

                {/* Le compte, au bout d'un filet : il dit d'un coup d'œil
                    combien de portes s'ouvrent sous ce titre. */}
                <span aria-hidden className="services-family-count">
                  <i />
                  {family.items.length} {services.countLabel}
                </span>
              </div>

              <ul
                className="services-grid"
                aria-labelledby={`famille-${family.slug}`}
              >
                {family.items.map((item) => {
                  const Glyph = SERVICE_ICONS[item.slug];
                  return (
                    <li key={item.slug}>
                      <Link
                        href={path(locale, `/services/${item.slug}`)}
                        className="service-card"
                      >
                        <span aria-hidden className="service-card-tile">
                          {Glyph && <Glyph />}
                        </span>

                        <span className="service-card-copy">
                          <b className="service-card-title">{item.title}</b>
                          <i className="service-card-lead">{item.lead}</i>
                        </span>

                        <span aria-hidden className="service-card-go">
                          <ArrowRight />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
