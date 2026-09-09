import { Reveal } from "@/components/site/reveal";
import { AuditForm } from "./audit-form";
import { getContent, type Locale } from "@/lib/content";

export function Contact({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);

  return (
    <section id="contact" className="border-t border-border py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <Reveal className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center rounded-full border border-border bg-secondary/40 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand">
              {contact.eyebrow}
            </span>
            <h2 className="text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
              {contact.title}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              {contact.body}
            </p>
          </Reveal>

          <Reveal delay={80} className="flex flex-col gap-3">
            {contact.info.map((row) => (
              <div
                key={row.label}
                className="rounded-xl border border-border bg-card px-5 py-4"
              >
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground/70">
                  {row.label}
                </div>
                {row.href ? (
                  <a
                    href={row.href}
                    className="mt-1 block text-[0.95rem] font-medium text-foreground transition-colors hover:text-brand"
                  >
                    {row.value}
                  </a>
                ) : (
                  <div className="mt-1 text-[0.95rem] font-medium text-foreground">
                    {row.value}
                  </div>
                )}
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={80}>
          <AuditForm locale={locale} />
        </Reveal>
      </div>
    </section>
  );
}
