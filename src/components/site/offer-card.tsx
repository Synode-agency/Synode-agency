import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ChevronRight,
  Code2,
  Database,
  FileText,
  Gauge,
  Globe,
  Mail,
  Monitor,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
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
  /**
   * `lead` for the two offers the agency is built on, `support` for the one
   * it takes on when a client asks. The support card is a translucent panel
   * laid across the full width rather than a white card.
   */
  emphasis?: "lead" | "support";
  /** Shown on the support card in place of the number. */
  supportLabel?: string;
}

/** Header glyph, one per offer, in the order the cards read. */
const HEAD_ICONS: LucideIcon[] = [Bot, Monitor, Globe];

/** Glyph beside the outcome line. */
const RESULT_ICONS: LucideIcon[] = [BarChart3, Target, Gauge];

/** One glyph per item inside each offer's list. */
const CHIP_ICONS: LucideIcon[][] = [
  [Settings, Sparkles, FileText, Mail],
  [Code2, Database, BarChart3, Users],
  [Globe, Smartphone, Gauge, Search],
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
  emphasis = "lead",
  supportLabel,
}: OfferCardProps) {
  const index = Math.max(0, Number(number) - 1);
  const HeadIcon = HEAD_ICONS[index] ?? Bot;
  const ResultIcon = RESULT_ICONS[index] ?? Target;
  const chipIcons = CHIP_ICONS[index] ?? CHIP_ICONS[0];

  if (emphasis === "support") {
    return (
      <Reveal delay={delay} className="offer-support">
        <div className="offer-support-intro">
          <span className="offer-icon offer-icon--support">
            <HeadIcon />
          </span>
          <div>
            <span className="offer-eyebrow">{supportLabel}</span>
            <h3 className="offer-support-title">{title}</h3>
            <p className="offer-support-text">
              {forWho} {result}
            </p>
          </div>
        </div>

        <div className="offer-support-side">
          <ul className="offer-support-chips">
            {chips.map((chip) => (
              <li key={chip}>{chip}</li>
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
    <Reveal delay={delay} className="offer-paper offer-card">
      <div className="offer-head">
        <span className="offer-icon">
          <HeadIcon />
        </span>
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
            <li key={chip} className="offer-chip">
              <ChipIcon />
              <span>{chip}</span>
            </li>
          );
        })}
      </ul>

      <div className="offer-result">
        <span className="offer-result-icon">
          <ResultIcon />
        </span>
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
