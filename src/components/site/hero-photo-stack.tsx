"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { Locale } from "@/lib/content";

export function HeroPhotoStack({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  const label = locale === "fr"
    ? (paused ? "Reprendre l’animation des photos" : "Mettre en pause l’animation des photos")
    : (paused ? "Resume photo animation" : "Pause photo animation");

  return (
    <div className="hero-photo-stack" data-paused={paused}>
      <div className="hero-photo hero-photo-layer">
        <Image
          src="/equipe/herophoto.png"
          alt={locale === "fr" ? "L’équipe Synode travaillant ensemble" : "The Synode team working together"}
          fill
          preload
          sizes="(min-width: 1280px) 42vw, (min-width: 768px) 640px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="hero-photo hero-photo-layer">
        <Image
          src="/equipe/gianlucasouris.png"
          alt={locale === "fr" ? "Gianluca présente un workflow d’automatisation" : "Gianluca presenting an automation workflow"}
          fill
          loading="eager"
          sizes="(min-width: 1280px) 42vw, (min-width: 768px) 640px, 100vw"
          className="object-cover"
        />
      </div>
      <button
        type="button"
        className="hero-photo-toggle grid size-9 place-items-center rounded-full border border-hairline bg-surface text-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        onClick={() => setPaused((value) => !value)}
        aria-label={label}
        title={label}
      >
        {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
      </button>
    </div>
  );
}
