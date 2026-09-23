"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/site/icon";
import {
  AutomationOutlineIcon,
  RobotLineIcon,
  WebPageIcon,
} from "@/components/site/icons";
import {
  CommandLineIcon,
  type CommandLineIconHandle,
} from "@/components/site/animated-icons/command-line-icon";
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
  const commandLineRef = useRef<CommandLineIconHandle>(null);

  const handleEnter = () => commandLineRef.current?.startAnimation();
  const handleLeave = () => commandLineRef.current?.stopAnimation();

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
      {/* Three of the four pillars are drawn icons now. Only "Logiciels sur
          mesure" keeps its animated glyph, which draws itself on hover. */}
      <span className="pillar-icon-tile">
        {icon === "Zap" ? (
          <AutomationOutlineIcon className="size-[1.15rem]" aria-hidden />
        ) : icon === "Bot" ? (
          <RobotLineIcon className="size-[1.15rem]" aria-hidden />
        ) : icon === "AppWindow" ? (
          <CommandLineIcon ref={commandLineRef} size={18} />
        ) : icon === "ArrowLeftRight" ? (
          <WebPageIcon className="size-[1.15rem]" aria-hidden />
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
