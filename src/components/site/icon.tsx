import {
  Zap,
  Bot,
  AppWindow,
  ArrowLeftRight,
  Workflow,
  Blocks,
  Boxes,
  Code2,
  Database,
  Globe,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Zap,
  Bot,
  AppWindow,
  ArrowLeftRight,
  Workflow,
  Blocks,
  Boxes,
  Code2,
  Database,
  Globe,
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
  return <Cmp className={className} aria-hidden="true" strokeWidth={1.6} />;
}
