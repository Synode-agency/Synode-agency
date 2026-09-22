import Image from "next/image";
import { BarChart3, CalendarDays, Mic, Phone, PhoneOff, Video } from "lucide-react";

interface DiagramCopy {
  call: string;
  slot: string;
  result: string;
  markAlt: string;
}

/**
 * The picture beside the closing CTA: what the free hour actually is. Two
 * inputs on the left (a call, a slot you pick), the agency in the middle,
 * two outputs on the right (the call itself, the leads you leave with).
 *
 * Everything is placed in percentages inside one fixed-ratio box, and the
 * wires are drawn in a stretched viewBox on top of it, so the whole thing
 * scales as a single image instead of nine elements drifting apart. Below
 * the md breakpoint the wires go and the cards stack.
 */
export function AuditDiagram({ copy }: { copy: DiagramCopy }) {
  return (
    <div className="audit-diagram" aria-hidden>
      {/* First in the DOM, so the rings and the glow sit under the wires
          and under the mark. */}
      <span className="audit-halo" />
      <span className="audit-glow" />

      {/* The viewBox matches the box's own ratio and is not stretched: a
          non-uniform scale makes a browser compute dash lengths against an
          ambiguous path length, which is what turned the wires into dashes
          instead of drawing them. Each path starts at its dot and ends on
          the mark, so running the dash offset to zero grows it inward. */}
      <svg className="audit-wires" viewBox="0 0 880 470" fill="none">
        <path d="M282 136C340 136 352 188 387 207" pathLength={1} />
        <path d="M282 334C340 334 352 282 387 268" pathLength={1} />
        <path d="M598 132C556 132 534 188 493 207" pathLength={1} />
        <path d="M598 338C556 338 534 282 493 268" pathLength={1} />
      </svg>

      {/* Each wire ends on a dot just clear of the card it comes from. */}
      <span className="audit-dot" style={{ left: "32%", top: "29%" }} />
      <span className="audit-dot" style={{ left: "32%", top: "71%" }} />
      <span className="audit-dot" style={{ left: "68%", top: "28%" }} />
      <span className="audit-dot" style={{ left: "68%", top: "72%" }} />

      {/* Left: what you do */}
      <span className="audit-card audit-card--call">
        <span className="audit-glyph">
          <Phone />
        </span>
        <span className="audit-lines">
          <b>{copy.call}</b>
          <i />
          <i />
        </span>
      </span>

      <span className="audit-card audit-card--slot">
        <span className="audit-glyph">
          <CalendarDays />
        </span>
        <span className="audit-lines">
          <b>{copy.slot}</b>
          <i />
          <i />
        </span>
      </span>

      {/* The middle: us */}
      <span className="audit-mark">
        <Image src="/synode-mark.png" alt={copy.markAlt} width={128} height={128} />
      </span>

      {/* Right: what comes out of it */}
      <span className="audit-card audit-card--visio">
        <span className="audit-visio">
          <span className="audit-visio-main" />
          <span className="audit-visio-side">
            <i />
            <i />
          </span>
        </span>
        <span className="audit-visio-bar">
          <b>
            <Mic />
          </b>
          <b>
            <Video />
          </b>
          <b data-hang="true">
            <PhoneOff />
          </b>
        </span>
      </span>

      <span className="audit-card audit-card--result">
        <span className="audit-glyph" data-tone="chart">
          <BarChart3 />
        </span>
        <span className="audit-lines">
          <b>{copy.result}</b>
          <i />
          <i />
        </span>
      </span>
    </div>
  );
}
