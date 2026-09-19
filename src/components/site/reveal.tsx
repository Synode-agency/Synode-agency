"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const Reveal = forwardRef<
  HTMLElement,
  {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    as?: React.ElementType;
    style?: React.CSSProperties;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    onMouseMove?: React.MouseEventHandler;
  }
>(function Reveal(
  {
    children,
    className,
    delay = 0,
    as: Tag = "div",
    style,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  },
  forwardedRef,
) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useImperativeHandle(forwardedRef, () => ref.current as HTMLElement);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ animationDelay: shown ? `${delay}ms` : undefined, ...style }}
      className={cn("reveal", className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {children}
    </Tag>
  );
});
