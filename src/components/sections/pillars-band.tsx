"use client";

import { useRef } from "react";
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
import { getContent, type Locale } from "@/lib/content";

interface PillarItemProps {
  icon: string;
  title: string;
  text: string;
}

function PillarItem({ icon, title, text }: PillarItemProps) {
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
    <div
      className="group flex items-center gap-3 px-2 py-5 sm:px-6 lg:py-[calc(var(--hs)*1.25rem)]"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-hairline bg-surface text-brand transition-colors group-hover:border-brand/40">
        {icon === "Zap" ? (
          <ZapIcon ref={zapRef} size={17} />
        ) : icon === "Bot" ? (
          <BotIcon ref={botRef} size={17} />
        ) : icon === "AppWindow" ? (
          <CommandLineIcon ref={commandLineRef} size={17} />
        ) : icon === "ArrowLeftRight" ? (
          <ConnectIcon ref={connectRef} size={17} />
        ) : (
          <Icon name={icon} className="size-[1.05rem]" />
        )}
      </span>
      <div>
        <h3 className="text-[0.85rem] font-semibold tracking-tight">{title}</h3>
        <p className="text-[0.78rem] leading-[1.4] text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  );
}

export function PillarsBand({ locale }: { locale: Locale }) {
  const { hero } = getContent(locale);

  return (
    <section
      aria-label={hero.pillars.map((p) => p.title).join(", ")}
      className="border-y border-hairline bg-surface/60"
    >
      <div className="container-page grid sm:grid-cols-2 sm:divide-x sm:divide-hairline lg:grid-cols-4">
        {hero.pillars.map((p) => (
          <PillarItem key={p.title} icon={p.icon} title={p.title} text={p.text} />
        ))}
      </div>
    </section>
  );
}
