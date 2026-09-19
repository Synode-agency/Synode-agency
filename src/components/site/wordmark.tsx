import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Brand lockup. The variant follows the ground it sits on:
 *
 * - `"plate"` (default) — the full logo, the rounded square with the S on it.
 *   Used on **light** grounds, where the dark plate reads cleanly. That is
 *   the navbar.
 * - `"mark"` — the S cut out of that plate, no square, no background. Used on
 *   **dark** grounds, where the plate would print a darker box on dark. That
 *   is the footer.
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
    <span
      className={cn(
        "inline-flex shrink-0 items-center",
        isMark ? "gap-2.5" : "gap-3",
        className,
      )}
    >
      <Image
        src={isMark ? "/synode-mark.png" : "/synode-logo.png"}
        alt={withText ? "" : "Synode"}
        width={isMark ? 202 : 112}
        height={isMark ? 202 : 112}
        priority
        className={cn(
          "shrink-0",
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
          /* The asset is white lettering. `.wordmark-type` inverts it on a
             light ground and leaves it alone inside an ink panel. */
          className="wordmark-type h-[1.9rem] w-auto shrink-0"
        />
      )}
    </span>
  );
}
