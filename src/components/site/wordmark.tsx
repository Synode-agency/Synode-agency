import Image from "next/image";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-3", className)}>
      <Image
        src="/synode-logo.png"
        alt={withText ? "" : "Synode"}
        width={112}
        height={112}
        priority
        className="size-12 shrink-0 rounded-[22%]"
      />
      {withText && (
        <Image
          src="/synode-wordmark.png"
          alt="Synode"
          width={822}
          height={232}
          priority
          className="h-[1.9rem] w-auto shrink-0"
        />
      )}
    </span>
  );
}
