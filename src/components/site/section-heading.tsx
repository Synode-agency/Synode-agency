import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="inline-flex w-fit items-center rounded-full border border-border bg-secondary/40 px-4 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-brand">
        {eyebrow}
      </span>
      <h2 className="max-w-2xl text-balance text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
