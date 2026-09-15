import { Wordmark } from "./wordmark";
import { getContent, type Locale } from "@/lib/content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const { site } = getContent(locale);

  return (
    <footer className="border-t border-hairline">
      <div className="container-page py-[clamp(3rem,2.5rem+2.5vw,5.5rem)]">
        <div className="grid gap-[clamp(2rem,1.75rem+2vw,4rem)] md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex max-w-xs flex-col gap-4">
            <Wordmark />
            <p className="text-[length:var(--fs-small)] leading-[1.65] text-muted-foreground">
              {site.tagline}
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            <span className="eyebrow text-label-muted">Navigation</span>
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="w-fit text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="w-fit text-[length:var(--fs-small)] text-brand transition-colors hover:text-brand-bright"
            >
              {site.ctaLabel}
            </a>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="eyebrow text-muted-foreground/50">Contact</span>
            <a
              href={`mailto:${site.email}`}
              className="w-fit text-[length:var(--fs-small)] text-muted-foreground transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
            <span className="text-[length:var(--fs-small)] text-muted-foreground">
              {site.location}
            </span>
            <span className="font-mono text-[length:var(--fs-small)] text-text-mono">
              {site.vat}
            </span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-[0.75rem] text-text-mono sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Synode</span>
          <span>{site.footerNote}</span>
        </div>
      </div>
    </footer>
  );
}
