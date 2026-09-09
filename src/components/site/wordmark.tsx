import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="grid size-8 shrink-0 place-items-center rounded-[9px] border border-hairline bg-surface-2">
        <svg
          width="17"
          height="17"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 26V15a10 10 0 0 1 20 0v11"
            stroke="var(--brand)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M16 26V12"
            stroke="var(--brand-bright)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {withText && (
        <span className="font-heading text-[0.95rem] font-bold tracking-[0.16em] text-foreground">
          99GATES
        </span>
      )}
    </span>
  );
}
