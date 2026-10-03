import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { PageHero } from "@/components/site/page-hero";
import { TeamHeroPortraits } from "@/components/site/hero-asides";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, path, type Locale } from "@/lib/content";

/** Cofounder copy from the published team page; portraits supplied in public/equipe. */
export function TeamPage({ locale }: { locale: Locale }) {
  const { team, site } = getContent(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;

  return (
    <Shell locale={locale}>
      <PageHero
        className="team-hero"
        title={locale === "fr" ? <>Pourquoi nous construisons <span>Synode</span></> : <>Why we are building <span>Synode</span></>}
        aside={<TeamHeroPortraits locale={locale} />}
      >
        <p>{team.vision}</p>
        <div className="btn-row">
          <Link href="#associes" className="btn btn--primary">{locale === "fr" ? "Rencontrer les associés" : "Meet the partners"}<ArrowRight aria-hidden /></Link>
          <Link href={bookHref} className="btn btn--ghost">{site.ctaShort}</Link>
        </div>
      </PageHero>

      <Band id="associes" tone="white">
        <Lede title={team.peopleTitle} />
        <div className="founder-grid section-gap">
          {team.people.map((p) => <article key={p.first} className="founder-card">
            <div className="founder-photo"><span className="founder-photo-label">Synode / {locale === "fr" ? "L’équipe" : "The team"}</span><Image src={p.photo} alt={p.first} width={1100} height={1100} sizes="(max-width: 760px) 90vw, 45vw" /><span className="founder-photo-name" aria-hidden>{p.first}</span></div>
            <div className="founder-copy"><span className="eyebrow">{p.headline}</span><h3>{p.first}</h3><p className="founder-role">{p.role}</p><p>{p.text}</p></div>
          </article>)}
        </div>

      </Band>

      <Band id="complementarite" tone="base">
        <Lede title={team.complementTitle} text={team.complementText} />
      </Band>

      <Band id="facon" tone="white">
        <Lede title={team.workingTitle} />
        <ul className="checks section-gap">
          {team.working.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      </Band>

      <Band id="conclusion" tone="blue">
        <Lede title={team.cta} align="center" />
        <div className="btn-row cta-actions">
          <Link href={bookHref} className="btn btn--primary">
            {site.cta}
            <ArrowRight aria-hidden />
          </Link>
        </div>
      </Band>
    </Shell>
  );
}
