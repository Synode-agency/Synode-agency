import Image from "next/image";
import {
  Boxes,
  Folder,
  Grid3x3,
  Home,
  LineChart,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  AutomationOutlineIcon,
  GraphIncreaseIcon,
  LampOutlineIcon,
  RobotLineIcon,
} from "@/components/site/icons";
import { getContent, type Locale } from "@/lib/content";

/** Sidebar rows, in the order the copy lists them. */
const NAV_ICONS: LucideIcon[] = [
  Home,
  Folder,
  Workflow,
  Users,
  Grid3x3,
  Users,
  LineChart,
];

/** The five stages of the flow, left to right. */
const STEP_ICONS = [LampOutlineIcon, AutomationOutlineIcon, RobotLineIcon, Boxes, GraphIncreaseIcon];

/**
 * The product mock at the centre of the hero.
 *
 * Purely decorative: it shows the shape of what the agency builds without
 * claiming to be a running application, so the whole thing is hidden from
 * assistive technology. Nothing here is a link or a control.
 *
 * Every dimension is expressed in `em` against a font size in container
 * query units, so the entire panel scales as one piece with the stage
 * rather than reflowing at each breakpoint.
 */
export function HeroAppMock({ locale }: { locale: Locale }) {
  const { mock } = getContent(locale).hero;

  return (
    <div aria-hidden className="hero-app">
      {/* Sidebar */}
      <aside className="hero-app-side">
        <div className="hero-app-brand">
          <Image src="/synode-mark.png" alt="" width={48} height={48} />
          <span>{mock.appName}</span>
        </div>

        <nav className="hero-app-nav">
          {/* Pointer that walks to Projets and clicks it, opening the loop. */}
          <span className="hero-app-cursor">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 2.5 19.5 11 13 12.4 10.2 19z" />
            </svg>
          </span>

          {mock.nav.map((label, i) => {
            const NavIcon = NAV_ICONS[i] ?? Home;
            return (
              <span
                key={label}
                className={i === 1 ? "hero-app-nav-row is-active" : "hero-app-nav-row"}
              >
                <NavIcon />
                {label}
              </span>
            );
          })}
        </nav>
      </aside>

      {/* Main pane */}
      <div className="hero-app-main">
        <span className="hero-app-status">
          <i />
          {mock.status}
        </span>

        <h3 className="hero-app-title">{mock.title}</h3>

        {/* The flow. Each step carries its rank so the CSS can stagger the
            pulse that runs along the row. */}
        <ol className="hero-app-flow">
          {mock.steps.map((step, i) => {
            const StepIcon = STEP_ICONS[i] ?? LampOutlineIcon;
            return (
              <li
                key={step}
                className="hero-app-step"
                style={{ "--s": i } as React.CSSProperties}
              >
                <span className="hero-app-step-disc">
                  <StepIcon />
                </span>
                <span className="hero-app-step-label">
                  {i + 1}. {step}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="hero-app-bottom">
          <div className="hero-app-case">
            <span className="hero-app-case-label">{mock.caseLabel}</span>
            <p className="hero-app-case-quote">{mock.caseQuote}</p>
            <div className="hero-app-tags">
              {mock.caseTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="hero-app-chart">
            <span className="hero-app-chart-label">{mock.chartLabel}</span>
            <span className="hero-app-chart-value">{mock.chartValue}</span>
            <svg viewBox="0 0 260 96" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hero-app-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0a7ce0" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#0a7ce0" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="hero-app-chart-area"
                d="M0 78 C 34 74 52 62 78 64 C 104 66 118 84 146 66 C 174 48 186 20 214 14 C 232 10 246 8 260 6 L260 96 L0 96 Z"
                fill="url(#hero-app-fill)"
              />
              <path
                className="hero-app-chart-line"
                d="M0 78 C 34 74 52 62 78 64 C 104 66 118 84 146 66 C 174 48 186 20 214 14 C 232 10 246 8 260 6"
                fill="none"
                stroke="#0a7ce0"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
