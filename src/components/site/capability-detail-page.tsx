import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { InnerPage } from "@/components/site/inner-page";
import { getContent, path, type Locale } from "@/lib/content";
import { findCapability, systemOf } from "@/lib/solutions";

/**
 * La page d'une capacité.
 *
 * Le corps est le `description` déjà écrit au catalogue, donc la page dit
 * quelque chose au lieu d'afficher un emplacement réservé. Ce qu'elle ne
 * fait pas, en revanche, c'est se présenter comme une offre : elle se
 * termine sur le système qui l'utilise, et c'est ce lien qui remonte le
 * visiteur d'un étage.
 *
 * C'est tout le repositionnement en une page : la brique existe, elle est
 * documentée, elle est trouvable par un moteur de recherche, et elle mène à
 * ce qui se vend réellement.
 */
export function CapabilityDetailPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const { capabilities, solutions } = getContent(locale);
  const item = findCapability(locale, slug);
  if (!item) return null;
  const system = systemOf(locale, slug);

  return (
    <InnerPage
      locale={locale}
      eyebrow={capabilities.detailEyebrow}
      title={item.title}
      body={item.lead}
      action={
        <Link
          href={path(locale, "/contact")}
          className="group brand-gradient inline-flex w-fit items-center justify-center gap-2 rounded-[var(--r-pill)] px-7 py-4 text-[length:var(--fs-button)] font-medium text-brand-foreground"
        >
          {solutions.ctaLabel}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      }
    >
      <div className="container-page flex flex-col gap-[clamp(2rem,4vw,3rem)] pb-[var(--space-section)]">
        <p className="cap-detail-body">{item.description}</p>

        {/* Le mouvement qui compte : d'une brique vers le système qui s'en
            sert. Sans lui, cette page se lirait encore comme un service
            qu'on achète à l'unité. */}
        {system && (
          <Link
            href={path(locale, `/solutions/${system.slug}`)}
            className="cap-detail-system"
          >
            <span className="cap-detail-system-label">{solutions.detailEyebrow}</span>
            <span className="cap-detail-system-title">{system.title}</span>
            <span className="cap-detail-system-text">{system.promise}</span>
            <ArrowUpRight aria-hidden />
          </Link>
        )}

        <Link
          href={path(locale, "/expertise")}
          className="inline-flex w-fit items-center gap-2 text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-3.5" />
          {capabilities.backLabel}
        </Link>
      </div>
    </InnerPage>
  );
}
