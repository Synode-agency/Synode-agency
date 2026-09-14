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

interface PillarCardProps {
  icon: string;
  title: string;
  text: string;
}

export function PillarCard({ icon, title, text }: PillarCardProps) {
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
      className="group flex flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 transition-colors hover:bg-surface-2"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="grid size-9 place-items-center rounded-lg border border-hairline bg-background text-brand transition-colors group-hover:border-brand/40">
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
      <div className="space-y-2">
        <h3 className="text-[0.95rem] font-semibold tracking-tight">
          {title}
        </h3>
        <p className="text-[0.85rem] leading-[1.65] text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  );
}
