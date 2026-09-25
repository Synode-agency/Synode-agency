import Link from "next/link";
import { ArrowRight, ClipboardList, Headset, Mail, Target, UserCheck, BriefcaseBusiness } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { SectionHeading } from "@/components/site/section-heading";
import { ChapterMark } from "@/components/site/chapter-mark";
import { ServiceGrid } from "@/components/site/service-grid";
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
  "emails-demandes": Mail,
  "administration-operations": ClipboardList,
  "agent-email-demandes": Mail,
  "agent-commercial": BriefcaseBusiness,
};

/** Aperçu de six services par domaine sur la page d’accueil. */
export function ServicesBand({ locale }: { locale: Locale }) {
  const { services } = getContent(locale);

  return (
    <section id="services" className="section-screen relative">
      <ChapterMark n={1} side="left" />

      <div className="container-page">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={renderLines(services.title, [services.titleAccent])}
          subtitle={services.body}
          align="left"
          className="reveal-left services-heading"
        />

        <ServiceFamilies locale={locale} />
      </div>
    </section>
  );
}

/** Shared cards: six on the homepage, the full catalogue on Services. */
export function ServiceFamilies({ locale, expanded = false }: { locale: Locale; expanded?: boolean }) {
  const { services } = getContent(locale);
  return (
        <div className={`services-families${expanded ? " services-catalog" : ""}`}>
          {services.families.map((family, f) => {
            const FamilyHeading = expanded ? "h2" : "h3";
            return (
            <Reveal
              key={family.slug}
              delay={80 + f * 120}
              className={`services-family services-family-${family.slug} reveal-up`}
            >
              <div className="services-family-head">
                <span aria-hidden className="services-family-icon">
                  {family.slug === "automatisation" ? <NetworkIcon /> : <RobotLineIcon />}
                </span>

                <div className="services-family-copy">
                  <FamilyHeading
                    id={`famille-${family.slug}`}
                    className="services-family-title"
                  >
                    {family.title}
                  </FamilyHeading>
                  <p className="services-family-lead">{family.lead}</p>
                </div>

              </div>

              <ServiceGrid
                labelledBy={`famille-${family.slug}`}
                collapsible={!expanded}
                locale={locale}
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

                        <div className="service-card-copy">
                          {expanded ? <h3 className="service-card-title">{item.title}</h3> : <b className="service-card-title">{item.title}</b>}
                          <p className="service-card-lead">{expanded ? item.description : item.summary}</p>
                        </div>

                        <span aria-hidden className="service-card-go">
                          <ArrowRight />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ServiceGrid>

            </Reveal>
          ); })}
        </div>
  );
}
