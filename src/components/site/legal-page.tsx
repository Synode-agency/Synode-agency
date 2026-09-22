import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Reveal } from "@/components/site/reveal";
import { getLegalDoc, legalLinks, type LegalSlug } from "@/lib/legal";
import { type Locale } from "@/lib/content";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Long-form legal page — scrollable, with a sibling-page rail on desktop. */
export function LegalPage({ locale, slug }: { locale: Locale; slug: LegalSlug }) {
  const doc = getLegalDoc(locale, slug);
  const links = legalLinks(locale);
  const updatedLabel = locale === "fr" ? "Mise à jour" : "Last updated";

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1 pt-[4.6rem]">
        <section className="section-y">
          <div className="container-page">
            <Reveal className="mx-auto flex max-w-3xl flex-col gap-4">
              <span className="eyebrow inline-flex items-center gap-2.5 text-brand">
                <span className="h-px w-6 bg-brand/50" aria-hidden />
                {updatedLabel} — {doc.updated}
              </span>
              <h1 className="text-[2.1rem] leading-[1.08] font-semibold sm:text-[2.9rem]">
                {doc.title}
              </h1>
              <p className="max-w-2xl text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground">
                {doc.intro}
              </p>
            </Reveal>

            <div className="mx-auto mt-[clamp(2.5rem,2rem+2vw,4rem)] flex max-w-5xl flex-col gap-[clamp(2rem,1.5rem+2vw,3.5rem)] lg:flex-row-reverse lg:items-start">
              {/* Sibling pages */}
              <nav
                aria-label={locale === "fr" ? "Pages légales" : "Legal pages"}
                className="flex shrink-0 flex-col gap-1 rounded-2xl border border-hairline bg-surface p-4 lg:sticky lg:top-28 lg:w-60"
              >
                {links.map((link) => (
                  <Link
                    key={link.slug}
                    href={link.href}
                    aria-current={link.slug === slug ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2 text-[length:var(--fs-small)] transition-colors",
                      link.slug === slug
                        ? "bg-brand-dim/50 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <article className="min-w-0 flex-1 space-y-[clamp(1.75rem,1.5rem+1vw,2.75rem)]">
                {doc.sections.map((section, i) => (
                  <Reveal key={section.heading} delay={i * 40} className="space-y-3">
                    <h2 className="text-[length:var(--fs-h3)] font-semibold tracking-tight">
                      {section.heading}
                    </h2>
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className={cn(
                          "max-w-[68ch] text-[length:var(--fs-small)] leading-[1.75]",
                          // Anything still holding a placeholder is called out
                          // so it cannot quietly ship as final copy.
                          paragraph.includes("TODO")
                            ? "rounded-lg border border-dashed border-destructive/40 bg-destructive/5 px-3.5 py-2.5 text-destructive/90"
                            : "text-muted-foreground",
                        )}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </Reveal>
                ))}
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
