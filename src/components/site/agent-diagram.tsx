"use client";

import { useId } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Users } from "lucide-react";
import { GmailLogo, ClaudeLogo, OpenAILogo } from "@/components/site/brand-icons";
import { DraftLineIcon } from "@/components/site/draft-line-icon";
import { LayersIcon } from "@/components/site/animated-icons/layers-icon";
import { cn } from "@/lib/utils";

interface DiagramNode {
  id: string;
  icon?: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  path: string;
  delay: number;
  float: { x: number; y: number; duration: number; delay: number };
}

// Canvas is 564x410, the hub sits dead centre at (282, 205).
const NODES: DiagramNode[] = [
  {
    id: "clients",
    icon: Users,
    x: 110,
    y: 90,
    path: "M 270 205 V 105 Q 270 90 255 90 H 110",
    delay: 0.1,
    float: { x: 1.5, y: 2.5, duration: 3.1, delay: 0 },
  },
  {
    id: "claude",
    icon: ClaudeLogo,
    x: 360,
    y: 70,
    path: "M 294 205 V 85 Q 294 70 309 70 H 360",
    delay: 0.2,
    float: { x: -2, y: 2, duration: 3.8, delay: 0.5 },
  },
  {
    id: "gmail",
    icon: GmailLogo,
    x: 110,
    y: 320,
    path: "M 270 205 V 305 Q 270 320 255 320 H 110",
    delay: 0.3,
    float: { x: 2, y: -2.5, duration: 4.2, delay: 0.2 },
  },
  {
    id: "chatgpt",
    icon: OpenAILogo,
    x: 360,
    y: 340,
    path: "M 294 205 V 325 Q 294 340 309 340 H 360",
    delay: 0.4,
    float: { x: -1.5, y: -2, duration: 3.4, delay: 0.9 },
  },
  {
    id: "draft",
    icon: DraftLineIcon,
    x: 160,
    y: 205,
    path: "M 250 205 H 160",
    delay: 0.5,
    float: { x: 2, y: 2, duration: 3.6, delay: 0.35 },
  },
  {
    id: "layers",
    x: 480,
    y: 205,
    path: "M 314 205 H 480",
    delay: 0.6,
    float: { x: -2, y: -2.5, duration: 3.9, delay: 0.7 },
  },
];

function AnimatedPath({ d, id }: { d: string; id: string }) {
  return (
    <>
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-hairline"
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="var(--brand)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </>
  );
}

/**
 * Hero illustration: the Synode agent wired to a client and the tools it
 * connects for them (inbox, AI providers). Purely decorative — aria-hidden,
 * the hero copy next to it carries the actual message.
 */
export function AgentDiagram({ className }: { className?: string }) {
  const containerId = useId();

  return (
    <div
      aria-hidden
      className={cn("relative aspect-[564/410] w-full max-w-[36rem]", className)}
    >
      {/* connectors */}
      <svg
        viewBox="0 0 564 410"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {NODES.map((n) => (
          <AnimatedPath key={n.id} d={n.path} id={`${containerId}-${n.id}`} />
        ))}
      </svg>

      {/* centre node — the agent */}
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid place-items-center">
          <motion.div
            className="absolute -inset-4 rounded-2xl border-2 border-brand/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <Image
            src="/synode-logo.png"
            alt=""
            width={96}
            height={96}
            className="brand-glow size-16 rounded-[22%] sm:size-20"
          />
        </div>
      </div>

      {/* satellite nodes — client + connected tools */}
      {NODES.map((n) => {
        const NodeIcon = n.icon;
        return (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: n.delay }}
            style={{
              left: `${(n.x / 564) * 100}%`,
              top: `${(n.y / 410) * 100}%`,
            }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="grid size-12 place-items-center rounded-xl border border-hairline bg-background text-foreground sm:size-14">
              <motion.div
                animate={{ x: [0, n.float.x, 0], y: [0, -n.float.y, 0] }}
                transition={{
                  duration: n.float.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: n.float.delay,
                }}
              >
                {n.id === "layers" ? (
                  <LayersIcon size={20} />
                ) : (
                  NodeIcon && <NodeIcon className="size-5 sm:size-6" />
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
