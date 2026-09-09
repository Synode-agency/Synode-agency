import { Reveal } from "@/components/site/reveal";
import { AuditForm } from "./audit-form";
import { getContent, type Locale } from "@/lib/content";

export function Contact({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);

  return (
    <section id="contact" className="section-y border-t border-hairline">
      <div className="container-page grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="flex flex-col gap-9 lg:sticky lg:top-28 lg:self-start">
          <Reveal className="flex flex-col gap-6">
            <span className="eyebrow flex items-center gap-2.5 text-brand">
              <span className="h-px w-6 bg-brand/50" aria-hidden />
              {contact.eyebrow}
            </span>
            <h2 className="max-w-[16ch] text-balance text-3xl font-semibold leading-[1.08] sm:text-4xl lg:text-[2.9rem]">
              {contact.title}
            </h2>
            <p className="max-w-md text-[0.975rem] leading-[1.7] text-muted-foreground">
              {contact.body}
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="flex flex-col overflow-hidden rounded-2xl border border-hairline bg-surface"
          >
            {contact.info.map((row) => (
              <div
                key={row.label}
                className="border-t border-hairline px-5 py-4 first:border-t-0"
              >
                <div className="eyebrow text-muted-foreground/60">
                  {row.label}
                </div>
                {row.href ? (
                  <a
                    href={row.href}
                    className="mt-1.5 block text-[0.9rem] font-medium text-foreground transition-colors hover:text-brand"
                  >
                    {row.value}
                  </a>
                ) : (
                  <div className="mt-1.5 text-[0.9rem] font-medium text-foreground">
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
