import type { ComponentType, SVGProps } from "react";
import { Zap, AppWindow, Blocks, Boxes, Database, ShieldCheck } from "lucide-react";
import {
  AutomationOutlineIcon,
  CodeOutlinedIcon,
  ConnectIcon,
  RobotLineIcon,
  WebIcon,
} from "@/components/site/icons";

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

/* The names are the ones written in `content.ts`. Five of them resolve to a
   drawn icon now: the robot, the two linked gears of an automation, the
   plug of an integration, the code frame and the globe. The rest have no
   equivalent in the drawn set and stay library glyphs. */
const map: Record<string, Glyph> = {
  Zap,
  Bot: RobotLineIcon,
  AppWindow,
  ArrowLeftRight: ConnectIcon,
  Workflow: AutomationOutlineIcon,
  Blocks,
  Boxes,
  Code2: CodeOutlinedIcon,
  Database,
  Globe: WebIcon,
  ShieldCheck,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Boxes;
  return <Cmp className={className} aria-hidden="true" />;
}
