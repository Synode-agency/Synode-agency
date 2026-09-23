import {
  DoneIcon,
  PencilLineIcon,
  PricetagOutlineIcon,
} from "@/components/site/icons";
import { Reveal } from "@/components/site/reveal";

/**
 * The three steps of the launch deal, beside the closing CTA: what you bring,
 * what you get for it, and what we do with it afterwards. One rail, a node
 * per step, the same vocabulary as the Méthode track.
 */
export function PublishFlow({
  steps,
}: {
  steps: readonly { label: string; sub: string }[];
}) {
  const icons = [PencilLineIcon, PricetagOutlineIcon, DoneIcon];

  return (
    <ol className="flow" aria-label="Étapes">
      {steps.map((step, i) => {
        const Glyph = icons[i % icons.length];
        return (
          <Reveal
            key={step.label}
            as="li"
            delay={220 + i * 220}
            className="flow-step reveal-right"
            style={{ "--flow-i": i } as React.CSSProperties}
          >
            <span className="flow-tile" aria-hidden>
              <Glyph />
            </span>
            <span className="flow-copy">
              <b>{step.label}</b>
              <i>{step.sub}</i>
            </span>
          </Reveal>
        );
      })}
    </ol>
  );
}
