"use client";

import { useId } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Users } from "lucide-react";
import { GmailLogo, ClaudeLogo, OpenAILogo } from "@/components/site/brand-icons";
import { DraftLineIcon } from "@/components/site/draft-line-icon";
import { LayersIcon } from "@/components/site/animated-icons/layers-icon";
import { cn } from "@/lib/utils";

interface LineNode {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  delay: number;
  float: { x: number; y: number; duration: number; delay: number };
}

// Canvas is 700x100, one horizontal line, Synode dead centre at (350, 50).
const CENTER_Y = 50;

const LEFT_NODES: LineNode[] = [
  {
    id: "user",
    icon: Users,
    x: 30,
    delay: 0.1,
    float: { x: 1.5, y: 2, duration: 3.2, delay: 0 },
  },
  {
    id: "form",
    icon: DraftLineIcon,
    x: 135,
    delay: 0.2,
    float: { x: -2, y: 2.4, duration: 3.6, delay: 0.3 },
  },
  {
    id: "claude",
    icon: ClaudeLogo,
    x: 240,
    delay: 0.3,
    float: { x: 2, y: -2, duration: 3.9, delay: 0.6 },
  },
];

const RIGHT_NODES: LineNode[] = [
  {
    id: "gpt",
    icon: OpenAILogo,
    x: 460,
    delay: 0.3,
    float: { x: -1.5, y: 2, duration: 3.4, delay: 0.2 },
  },
  {
    id: "data",
    icon: LayersIcon,
    x: 565,
    delay: 0.4,
    float: { x: 2, y: -2.5, duration: 3.7, delay: 0.5 },
  },
  {
    id: "gmail",
    icon: GmailLogo,
    x: 670,
    delay: 0.5,
    float: { x: -2, y: -2, duration: 4.1, delay: 0.8 },
  },
];

/**
 * A single flow segment whose glow travels back and forth along its length.
 * The gradient is anchored spatially (not to the moving dash) so the line
 * stays fully blue right up to the Synode end and only fades out toward the
 * outer node — `centerAt` says which end of the `from`→`to` path that is.
 */
function FlowSegment({
  from,
  to,
  id,
  reverse,
  centerAt,
}: {
  from: number;
  to: number;
  id: string;
  reverse?: boolean;
  centerAt: "start" | "end";
}) {
  const length = Math.abs(to - from);
  // Keep the dash fully on the path at both ends of its travel — offsetting
  // by the full length would let it slide half off the end and clip to
  // nothing there instead of fading via the gradient like the other end.
  const dashWidth = length * 0.15;
  const travel = length - dashWidth;
  return (
    <>
      <path
        d={`M ${from} ${CENTER_Y} H ${to}`}
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        className="text-hairline"
      />
      <motion.path
        d={`M ${from} ${CENTER_Y} H ${to}`}
        stroke={`url(#${id})`}
        strokeWidth="2"
        fill="none"
        strokeDasharray={`${dashWidth} ${length * 1.7}`}
        initial={{ strokeDashoffset: reverse ? -travel : 0 }}
        animate={{ strokeDashoffset: reverse ? 0 : -travel }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={from} x2={to} y1={CENTER_Y} y2={CENTER_Y}>
          {centerAt === "end" ? (
            <>
              <stop offset="0%" stopColor="var(--brand)" stopOpacity="1" />
              <stop offset="55%" stopColor="var(--brand)" stopOpacity="1" />
              <stop offset="100%" stopColor="transparent" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="transparent" />
              <stop offset="45%" stopColor="var(--brand)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--brand)" stopOpacity="1" />
            </>
          )}
        </linearGradient>
      </defs>
    </>
  );
}

/**
 * Hero illustration: a single horizontal flow line — User, Formulaire and
 * Claude feeding into Synode on the left, Synode reaching out to GPT, Data
 * and Gmail on the right. Purely decorative — aria-hidden, the hero copy
 * carries the actual message.
 */
export function AgentDiagram({ className }: { className?: string }) {
  const uid = useId();

  return (
    <div
      aria-hidden
      className={cn("relative aspect-[7/1] w-full", className)}
    >
      {/* connectors */}
      <svg
        viewBox="0 0 700 100"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <FlowSegment from={LEFT_NODES[0].x} to={350} id={`${uid}-left`} centerAt="end" />
        <FlowSegment from={350} to={RIGHT_NODES[2].x} id={`${uid}-right`} reverse centerAt="start" />
      </svg>

      {/* centre node — the agent */}
      <div
        style={{ left: "50%", top: "50%" }}
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative grid place-items-center">
          <motion.div
            className="absolute -inset-2 rounded-2xl border-2 border-brand/30 sm:-inset-4"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <Image
            src="/synode-logo.png"
            alt=""
            width={96}
            height={96}
            className="brand-glow size-10 rounded-[22%] sm:size-[clamp(3.5rem,3.6rem+1vw,5.5rem)]"
          />
        </div>
      </div>

      {/* satellite nodes */}
      {[...LEFT_NODES, ...RIGHT_NODES].map((n) => {
        const NodeIcon = n.icon;
        return (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: n.delay }}
            style={{
              left: `${(n.x / 700) * 100}%`,
              top: `${(CENTER_Y / 100) * 100}%`,
            }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="grid size-8 place-items-center rounded-lg border border-hairline bg-background text-foreground sm:size-[clamp(2.75rem,2.9rem+0.7vw,4rem)] sm:rounded-xl">
              <motion.div
                animate={{ x: [0, n.float.x, 0], y: [0, -n.float.y, 0] }}
                transition={{
                  duration: n.float.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: n.float.delay,
                }}
              >
                {n.id === "data" ? (
                  <LayersIcon size={16} />
                ) : (
                  <NodeIcon className="size-4 sm:size-[clamp(1.15rem,1.2rem+0.25vw,1.5rem)]" />
                )}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
