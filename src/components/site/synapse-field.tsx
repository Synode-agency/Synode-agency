"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Base node count at ~1280px width; scales with viewport area. */
  density?: number;
  /** Max distance (CSS px) at which two nodes are linked. */
  linkDistance?: number;
  /** Radius (CSS px) of the pointer's influence. */
  pointerRadius?: number;
  /** 0–1 global opacity of the whole field. */
  intensity?: number;
  /** Scroll parallax factor (0 disables). Canvas drifts down as the hero scrolls. */
  parallax?: number;
};

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
};

const MAX_PARALLAX_SHIFT = 24;

export function SynapseField({
  className,
  density = 64,
  linkDistance = 132,
  pointerRadius = 190,
  intensity = 1,
  parallax = 0.05,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallaxOn = () => parallax > 0 && !reduce.matches;

    // Resolve brand colours from the live theme tokens.
    const styles = getComputedStyle(document.documentElement);
    const brand = (styles.getPropertyValue("--brand") || "#00a8f8").trim();
    const brandBright =
      (styles.getPropertyValue("--brand-bright") || "#33beff").trim();

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;

    // Pointer state (canvas/CSS px). `strength` eases in/out on enter/leave.
    const pointer = { x: -9999, y: -9999, strength: 0, target: 0 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function build() {
      const area = width * height;
      const base = (density * area) / (1280 * 720);
      const count = Math.max(14, Math.min(90, Math.round(base)));
      nodes = Array.from({ length: count }, () => {
        const hub = Math.random() < 0.14;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: rand(-0.16, 0.16),
          vy: rand(-0.16, 0.16),
          r: hub ? rand(1.8, 2.6) : rand(0.8, 1.5),
          hub,
        };
      });
    }

    function resize() {
      const rect = host!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (!running) draw(true);
    }

    function draw(staticFrame = false) {
      ctx!.clearRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "lighter";

      if (!staticFrame) {
        pointer.strength += (pointer.target - pointer.strength) * 0.08;
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!staticFrame) {
          n.x += n.vx;
          n.y += n.vy;

          // Pointer repulsion — gentle, clamped.
          if (pointer.strength > 0.001) {
            const dx = n.x - pointer.x;
            const dy = n.y - pointer.y;
            const d = Math.hypot(dx, dy);
            if (d < pointerRadius && d > 0.01) {
              const f = (1 - d / pointerRadius) * pointer.strength * 0.9;
              n.x += (dx / d) * f;
              n.y += (dy / d) * f;
            }
          }

          // Wrap around edges for a seamless field.
          if (n.x < -20) n.x = width + 20;
          else if (n.x > width + 20) n.x = -20;
          if (n.y < -20) n.y = height + 20;
          else if (n.y > height + 20) n.y = -20;
        }

        // Links between nearby nodes.
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDistance) {
            const a = (1 - dist / linkDistance) * 0.5 * intensity;
            ctx!.strokeStyle = withAlpha(brand, a);
            ctx!.lineWidth = 0.6;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(m.x, m.y);
            ctx!.stroke();
          }
        }

        // Links from the pointer to nearby nodes — the "synaptic" reach.
        if (pointer.strength > 0.001) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < pointerRadius) {
            const a =
              (1 - dist / pointerRadius) * 0.6 * pointer.strength * intensity;
            ctx!.strokeStyle = withAlpha(brandBright, a);
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(n.x, n.y);
            ctx!.lineTo(pointer.x, pointer.y);
            ctx!.stroke();
          }
        }

        // Node dot.
        ctx!.fillStyle = withAlpha(n.hub ? brandBright : brand, 0.9 * intensity);
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();

        if (n.hub) {
          ctx!.fillStyle = withAlpha(brandBright, 0.12 * intensity);
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      ctx!.globalCompositeOperation = "source-over";
    }

    function loop() {
      draw(false);
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce.matches) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // --- scroll parallax (transform only, rAF-batched) ---
    let parallaxTick = false;
    function applyParallax() {
      const top = host!.getBoundingClientRect().top;
      const y = Math.max(0, Math.min(MAX_PARALLAX_SHIFT, -top * parallax));
      canvas!.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }
    function onScroll() {
      if (parallaxTick || !parallaxOn()) return;
      parallaxTick = true;
      requestAnimationFrame(() => {
        applyParallax();
        parallaxTick = false;
      });
    }

    // --- pointer --- (bound on window; host has pointer-events:none)
    function onMove(e: PointerEvent) {
      if (e.pointerType === "touch") return;
      const rect = host!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (inside) {
        pointer.x = x;
        pointer.y = y;
        pointer.target = 1;
      } else {
        pointer.target = 0;
      }
    }
    function onLeave() {
      pointer.target = 0;
    }

    // --- visibility / intersection ---
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState === "visible") {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.01 },
    );
    function onVisibility() {
      if (document.visibilityState === "visible") start();
      else stop();
    }

    const ro = new ResizeObserver(resize);

    function syncParallaxState() {
      if (parallaxOn()) {
        canvas!.style.willChange = "transform";
        applyParallax();
      } else {
        canvas!.style.willChange = "";
        canvas!.style.transform = "";
      }
    }

    resize();
    syncParallaxState();
    io.observe(host);
    ro.observe(host);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    const onReduceChange = () => {
      stop();
      syncParallaxState();
      if (reduce.matches) draw(true);
      else start();
    };
    reduce.addEventListener("change", onReduceChange);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onReduceChange);
    };
  }, [density, linkDistance, pointerRadius, intensity, parallax]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
}

/** Accepts #rgb / #rrggbb and returns rgba() with the given alpha. */
function withAlpha(hex: string, alpha: number) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;
}
