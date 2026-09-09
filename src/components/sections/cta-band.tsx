import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { Magnetic } from "@/components/site/magnetic";
import { getContent, type Locale } from "@/lib/content";

export function CtaBand({ locale }: { locale: Locale }) {
  const { ctaBand } = getContent(locale);

  return (
    <section className="relative overflow-hidden border-t border-border py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-[-16rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-dim/40 blur-[140px]"
      />
      <div className="container-page">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-balance text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
            {ctaBand.title}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {ctaBand.body}
          </p>
          <Magnetic className="mt-2">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-medium text-brand-foreground transition-colors hover:bg-brand-bright brand-glow"
            >
              {ctaBand.button}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
