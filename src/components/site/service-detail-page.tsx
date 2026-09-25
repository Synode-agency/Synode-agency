import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { InnerPage } from "@/components/site/inner-page";
import { Placeholder } from "@/components/site/placeholder";
import { getContent, homePath, path, type Locale } from "@/lib/content";

/** Retrouve une prestation et sa famille à partir du seul slug. */
export function findService(locale: Locale, slug: string) {
  const { services } = getContent(locale);
  for (const family of services.families) {
    const item = family.items.find((i) => i.slug === slug);
    if (item) return { family, item };
  }
  return null;
}

/**
 * La page d'une prestation.
 *
 * À ce stade elle porte sa coquille et rien d'autre : le corps est un
 * placeholder explicite. Le gabarit du contenu se décide sur une prestation,
 * puis s'applique aux onze autres — écrire douze pages avant de savoir à quoi
 * elles ressemblent reviendrait à les écrire deux fois, en deux langues.
 */
export function ServiceDetailPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const { services } = getContent(locale);
  const found = findService(locale, slug);
  if (!found) return null;
  const { family, item } = found;

  return (
    <InnerPage
      locale={locale}
      eyebrow={family.title}
      title={item.title}
      body={item.lead}
      action={
        <Link
          href={path(locale, "/contact")}
          className="group brand-gradient inline-flex w-fit items-center justify-center gap-2 rounded-[var(--r-pill)] px-7 py-4 text-[length:var(--fs-button)] font-medium text-brand-foreground"
        >
          {services.ctaLabel}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      }
    >
      <div className="container-page flex flex-col gap-[clamp(2rem,4vw,3rem)] pb-[var(--space-section)]">
        <Placeholder
          label={services.detailEyebrow}
          text={services.detailPlaceholder}
        />

        <Link
          href={`${homePath(locale)}#services`}
          className="inline-flex w-fit items-center gap-2 text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          {services.backLabel}
        </Link>
      </div>
    </InnerPage>
  );
}
