import { renderLines } from "@/lib/lines";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { AuditDiagram } from "@/components/site/audit-diagram";
import { getContent, path, type Locale } from "@/lib/content";

/**
 * Closing CTA. No frame any more: the copy and the button sit on the page
 * ground on the left, and the picture of what the free hour is sits on the
 * right, the same two-column shape as the hero.
 */
export function CtaBand({ locale }: { locale: Locale }) {
  const { ctaBand } = getContent(locale);

  return (
    <section id="conclusion" className="section-screen relative">
      <div className="container-page">
        <div className="cta-composition">
          <Reveal className="reveal-left cta-copy">
            <h2 className="cta-title">
              {/* Les coupes passent par les marqueurs de `renderLines` : le
                  desktop et le téléphone ne coupent pas au même endroit, ce
                  que `pre-line` ne savait pas exprimer. */}
              {renderLines(ctaBand.title, [ctaBand.titleAccent])}
            </h2>
            <p className="cta-body">{ctaBand.body}</p>

            <Link
              href={path(locale, "/contact")}
              className="group brand-gradient inline-flex w-fit items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium text-brand-foreground brand-glow"
            >
              {ctaBand.button}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <p className="cta-note">
              <span aria-hidden className="text-brand">
                *
              </span>{" "}
              {ctaBand.note}
            </p>
          </Reveal>

          <Reveal delay={480} className="reveal-right cta-visual">
            <AuditDiagram copy={ctaBand.diagram} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
