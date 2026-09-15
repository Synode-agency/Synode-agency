import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6",
        centered && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "eyebrow inline-flex items-center gap-2.5 text-brand",
          centered ? "justify-center" : "",
        )}
      >
        <span className="h-px w-6 bg-brand/50" aria-hidden />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "max-w-[20ch] text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl lg:text-[length:var(--fs-h2)]",
          centered && "max-w-[24ch]",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "max-w-xl text-[length:var(--fs-body)] leading-[1.7] text-muted-foreground",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
