"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { NavLink } from "./nav-link";
import { brickIcons } from "./solution-visuals";
import { getContent, path, ROUTES, type Locale } from "@/lib/content";

export function SolutionsMenu({ locale, mobile = false, pathname, onNavigate }: { locale: Locale; mobile?: boolean; pathname: string; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = mobile ? "solutions-mobile" : "solutions-desktop";
  const route = path(locale, ROUTES.solutions);
  const current = pathname === route || pathname.startsWith(`${route}/`);
  const close = () => { setOpen(false); onNavigate?.(); };
  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => { if (e.target instanceof Node && !root.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  return <div ref={root} className={`solutions-menu ${mobile ? "solutions-menu--mobile" : ""}`} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false); }} onKeyDown={e => {
    if (e.key === "Escape" && open) { e.stopPropagation(); setOpen(false); trigger.current?.focus(); }
    if (e.key === "ArrowDown" && e.target === trigger.current) { e.preventDefault(); setOpen(true); requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>("a")?.focus()); }
  }}>
    <button type="button" ref={trigger} className={`${mobile ? "site-menu-link" : "site-nav-link"} solutions-trigger${current ? " is-current" : ""}`} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>Solutions<ChevronDown aria-hidden /></button>
    <div id={id} hidden={!open} className="solutions-dropdown">
      <NavLink href={route} locale={locale} onNavigate={close} className="solutions-all" aria-current={pathname === route ? "page" : undefined}>{locale === "fr" ? "Toutes nos solutions" : "All our solutions"}<ArrowRight aria-hidden /></NavLink>
      <ul>{getContent(locale).solutions.bricks.map(f => { const Icon = brickIcons[f.visual]; const href = `${route}/${f.slug}`; return <li key={f.slug}><NavLink href={href} locale={locale} onNavigate={close} aria-current={pathname === href ? "page" : undefined}><Icon aria-hidden /><span><strong>{f.title}</strong><small>{f.benefit}</small></span></NavLink></li>; })}</ul>
    </div>
  </div>;
}
