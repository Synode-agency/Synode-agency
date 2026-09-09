import { Wordmark } from "./wordmark";
import { getContent, type Locale } from "@/lib/content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);

  return (
    <footer className="border-t border-hairline">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex max-w-xs flex-col gap-4">
            <Wordmark />
            <p className="text-[0.85rem] leading-[1.65] text-muted-foreground">
              {site.tagline}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow text-muted-foreground/50">Navigation</span>
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="w-fit text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="w-fit text-[0.875rem] text-brand transition-colors hover:text-brand-bright"
            >
              {site.ctaLabel}
            </a>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-muted-foreground/50">Contact</span>
            <a
              href={`mailto:${site.email}`}
              className="w-fit text-[0.875rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
            <span className="text-[0.875rem] text-muted-foreground">
              {site.location}
            </span>
            <span className="font-mono text-[0.8rem] text-muted-foreground/70">
              {site.vat}
            </span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-[0.75rem] text-muted-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} 99GATES</span>
          <span>{site.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
