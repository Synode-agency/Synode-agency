"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Icon } from "@/components/site/icon";
import {
  ZapIcon,
  type ZapIconHandle,
} from "@/components/site/animated-icons/zap-icon";
import {
  BotIcon,
  type BotIconHandle,
} from "@/components/site/animated-icons/bot-icon";
import {
  CommandLineIcon,
  type CommandLineIconHandle,
} from "@/components/site/animated-icons/command-line-icon";
import {
  ConnectIcon,
  type ConnectIconHandle,
} from "@/components/site/animated-icons/connect-icon";
import { NavLink } from "@/components/site/nav-link";
import { getContent, homePath, type Locale } from "@/lib/content";

interface PillarCardProps {
  icon: string;
  title: string;
  text: string;
  href: string;
  locale: Locale;
  index: number;
}

/** Float timings staggered per card so the four never move in lockstep. */
const FLOAT = [
  { dur: "6.4s", delay: "0s", dist: "8px" },
  { dur: "7.1s", delay: "-1.6s", dist: "6px" },
  { dur: "6.8s", delay: "-3.2s", dist: "9px" },
  { dur: "7.6s", delay: "-4.7s", dist: "7px" },
];

function PillarCard({ icon, title, text, href, locale, index }: PillarCardProps) {
  const zapRef = useRef<ZapIconHandle>(null);
  const botRef = useRef<BotIconHandle>(null);
  const commandLineRef = useRef<CommandLineIconHandle>(null);
  const connectRef = useRef<ConnectIconHandle>(null);

  const handleEnter = () => {
    zapRef.current?.startAnimation();
    botRef.current?.startAnimation();
    commandLineRef.current?.startAnimation();
    connectRef.current?.startAnimation();
  };

  const handleLeave = () => {
    zapRef.current?.stopAnimation();
    botRef.current?.stopAnimation();
    commandLineRef.current?.stopAnimation();
    connectRef.current?.stopAnimation();
  };

  const float = FLOAT[index % FLOAT.length];

  return (
    <NavLink
      href={href}
      locale={locale}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={
        {
          "--float-dur": float.dur,
          "--float-delay": float.delay,
          "--float-dist": float.dist,
        } as React.CSSProperties
      }
      className="card-float group relative flex items-center gap-[clamp(0.7rem,0.6vw+0.5rem,1.1rem)] overflow-hidden rounded-[1.1rem] border border-hairline bg-surface/80 px-[clamp(0.9rem,0.7vw+0.7rem,1.4rem)] py-[clamp(0.85rem,0.6vw+0.7rem,1.25rem)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-brand/45 hover:bg-surface-2/85 hover:shadow-[0_18px_50px_-24px_color-mix(in_oklab,var(--brand)_60%,transparent)]"
    >
      {/* icon tile */}
      <span className="grid size-[clamp(2.25rem,1.1vw+1.9rem,2.9rem)] shrink-0 place-items-center rounded-[0.7rem] border border-brand/25 bg-brand-dim/45 text-brand transition-colors duration-300 group-hover:border-brand/55 group-hover:text-brand-bright">
        {icon === "Zap" ? (
          <ZapIcon ref={zapRef} size={18} />
        ) : icon === "Bot" ? (
          <BotIcon ref={botRef} size={18} />
        ) : icon === "AppWindow" ? (
          <CommandLineIcon ref={commandLineRef} size={18} />
        ) : icon === "ArrowLeftRight" ? (
          <ConnectIcon ref={connectRef} size={18} />
        ) : (
          <Icon name={icon} className="size-[1.1rem]" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-[clamp(0.9rem,0.3vw+0.82rem,1.05rem)] leading-tight font-semibold tracking-tight">
          {title}
        </h3>
        <p className="mt-1 text-[clamp(0.75rem,0.22vw+0.7rem,0.88rem)] leading-[1.4] text-muted-foreground">
          {text}
        </p>
      </div>

      <ChevronRight
        aria-hidden
        className="size-4 shrink-0 self-start text-muted-foreground/50 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-brand"
      />

      {/* accent bar, bottom-left — sweeps a highlight across on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[clamp(0.9rem,0.7vw+0.7rem,1.4rem)] h-[2px] w-[clamp(1.6rem,2vw,2.6rem)] overflow-hidden rounded-full bg-gradient-to-r from-brand to-brand/10"
      >
        <span className="absolute inset-y-0 w-1/2 bg-brand-bright opacity-0 group-hover:opacity-100 group-hover:[animation:bar-sweep_0.9s_ease-out]" />
      </span>
    </NavLink>
  );
}

export function PillarsBand({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section
      aria-label={hero.pillars.map((p) => p.title).join(", ")}
      className="container-page pb-[clamp(1.25rem,1vw+1rem,2.25rem)]"
    >
      <div className="grid gap-[clamp(0.7rem,0.8vw+0.5rem,1.15rem)] sm:grid-cols-2 lg:grid-cols-4">
        {hero.pillars.map((p, i) => (
          <PillarCard
            key={p.title}
            index={i}
            icon={p.icon}
            title={p.title}
            text={p.text}
            locale={locale}
            href={`${homePath(locale)}#offre`}
          />
        ))}
      </div>
    </section>
  );
}
