import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand lockup.
 *
 * `variant="plate"` (default) uses the full logo — the rounded square plate
 * with the S on it. `variant="mark"` uses the S cut out of that plate, with
 * no square and no background: that is what the navbar shows, so the header
 * stays light while the hero and footer keep the full logo.
 */
export function Wordmark({
  className,
  withText = true,
  variant = "plate",
}: {
  className?: string;
  withText?: boolean;
  variant?: "plate" | "mark";
}) {
  const isMark = variant === "mark";

  return (
    <span className={cn("inline-flex shrink-0 items-center", isMark ? "gap-2.5" : "gap-3", className)}>
      <Image
        src={isMark ? "/synode-mark.png" : "/synode-logo.png"}
        alt={withText ? "" : "Synode"}
        /* These are the rendered size, not the file's own dimensions: Next
           builds its srcset from them. The mark shows at 40px, so 80 covers
           a 2x screen. Passing the source's 1254 would make it ship a
           1920px-wide image for a logo in the navbar. */
        width={isMark ? 80 : 112}
        height={isMark ? 80 : 112}
        priority
        className={cn(
          "wordmark-part shrink-0",
          isMark ? "size-10 object-contain" : "size-12 rounded-[22%]",
        )}
      />
      {withText && (
        <Image
          src="/synode-wordmark.png"
          alt="Synode"
          width={822}
          height={232}
          priority
          className="wordmark-part wordmark-type h-[1.9rem] w-auto shrink-0"
        />
      )}
    </span>
  );
}
