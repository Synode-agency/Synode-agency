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
      <svg
        width="26"
        height="26"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="7" fill="#0B0F14" stroke="#1B242E" />
        <path
          d="M8 25V15a8 8 0 0 1 16 0v10"
          stroke="var(--brand)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M16 25V13"
          stroke="var(--brand-bright)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      {withText && (
        <span className="font-heading text-[1.05rem] font-bold tracking-[0.14em] text-foreground">
          99GATES
        </span>
      )}
    </span>
  );
}
