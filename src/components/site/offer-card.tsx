import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Gauge,
  Mail,
  Users,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/site/reveal";
import {
  AutomationOutlineIcon,
  BarChartIcon,
  CodeOutlinedIcon,
  ConnectIcon,
  FileIcon,
  PhoneLinearIcon,
  RobotLineIcon,
  WebIcon,
  ZoomIcon,
} from "@/components/site/icons";

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;
import { cn } from "@/lib/utils";

interface OfferCardProps {
  number: string;
  title: string;
  forWho: string;
  includes: readonly string[];
  result: string;
  resultLabel: string;
  ctaPrimary: string;
  ctaSecondary: string;
  contactHref: string;
  delay: number;
  /** Side the card slides in from; omitted it just fades up. */
  enter?: "left" | "right";
  /**
   * `lead` for the two offers the agency is built on, `support` for the one
   * it takes on when a client asks. The support card is a translucent panel
   * laid across the full width rather than a white card.
   */
  emphasis?: "lead" | "support";
  /** Shown on the support card in place of the number. */
  supportLabel?: string;
}

/** One glyph per item inside each offer's list. */
const CHIP_ICONS: Glyph[][] = [
  [AutomationOutlineIcon, RobotLineIcon, FileIcon, Mail],
  [CodeOutlinedIcon, ConnectIcon, BarChartIcon, Users],
  [WebIcon, PhoneLinearIcon, Gauge, ZoomIcon],
];

export function OfferCard({
  number,
  title,
  forWho,
  includes: chips,
  result,
  resultLabel,
  ctaPrimary,
  ctaSecondary,
  contactHref,
  delay,
  enter,
  emphasis = "lead",
  supportLabel,
}: OfferCardProps) {
  const index = Math.max(0, Number(number) - 1);
  const chipIcons = CHIP_ICONS[index] ?? CHIP_ICONS[0];

  if (emphasis === "support") {
    return (
      <Reveal delay={delay} className="offer-support">
        <div className="offer-support-intro">
          <div>
            <span className="offer-eyebrow">{supportLabel}</span>
            <h3 className="offer-support-title">{title}</h3>
            <p className="offer-support-text">
              {forWho} {result}
            </p>
          </div>
        </div>

        <div className="offer-support-side">
          {/* The badges of all three offers are lit by one travelling light,
              so each carries its rank in the whole run rather than its rank
              in its own card. This is the third card: 8, 9, 10, 11. */}
          <ul className="offer-support-chips">
            {chips.map((chip, i) => (
              <li
                key={chip}
                style={{ "--chip-i": index * 4 + i } as React.CSSProperties}
              >
                {chip}
              </li>
            ))}
          </ul>
          <Link href={contactHref} className="offer-cta offer-cta--ghost">
            {ctaPrimary}
            <ArrowRight />
          </Link>
        </div>
      </Reveal>
    );
  }

  return (
    <Reveal
      delay={delay}
      className={cn(
        "offer-paper offer-card",
        enter === "left" ? "reveal-left" : enter === "right" ? "reveal-right" : undefined,
      )}
    >
      <div className="offer-head">
        <div className="min-w-0">
          <div className="offer-head-line">
            <b className="offer-num">{number}</b>
            <h3 className="offer-title">{title}</h3>
          </div>
          <p className="offer-for">{forWho}</p>
        </div>
      </div>

      <ul className="offer-chips">
        {chips.map((chip, i) => {
          const ChipIcon = chipIcons[i % chipIcons.length];
          return (
            <li
              key={chip}
              className="offer-chip"
              style={{ "--chip-i": index * 4 + i } as React.CSSProperties}
            >
              <ChipIcon />
              <span>{chip}</span>
            </li>
          );
        })}
      </ul>

      <div className="offer-result">
        <div>
          <span className="offer-eyebrow">{resultLabel}</span>
          <p className="offer-result-text">{result}</p>
        </div>
      </div>

      <div className="offer-actions">
        <Link href={contactHref} className={cn("offer-cta")}>
          {ctaPrimary}
          <ArrowRight />
        </Link>
        <Link href={contactHref} className="offer-link">
          {ctaSecondary}
          <ChevronRight />
        </Link>
      </div>
    </Reveal>
  );
}
