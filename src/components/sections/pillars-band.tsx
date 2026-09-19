"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
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
  total: number;
}

function PillarCard({
  icon,
  title,
  text,
  href,
  locale,
  index,
  total,
}: PillarCardProps) {
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

  return (
    <NavLink
      href={href}
      locale={locale}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={
        {
          // Drives the fan: rotation and lift are computed from the card's
          // position in the deck, so adding a fifth pillar needs no new CSS.
          "--i": index,
          "--n": total,
        } as React.CSSProperties
      }
      className="pillar-card group"
    >
      <span className="pillar-icon-tile">
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

      <div className="pillar-body">
        <h3 className="pillar-title">{title}</h3>
        <p className="pillar-text">{text}</p>
        <ArrowRight aria-hidden className="pillar-arrow" />
      </div>
    </NavLink>
  );
}

/**
 * The four services. Inside the hero stage they are placed one per corner
 * around the product mock; anywhere else, and below `lg`, they fall back to
 * a plain 2x2 grid.
 */
export function PillarsBand({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section
      aria-label={hero.pillars.map((p) => p.title).join(", ")}
      className="pillar-deck"
    >
      {hero.pillars.map((p, i) => (
        <PillarCard
          key={p.title}
          index={i}
          total={hero.pillars.length}
          icon={p.icon}
          title={p.title}
          text={p.text}
          locale={locale}
          href={`${homePath(locale)}#offre`}
        />
      ))}
    </section>
  );
}
