"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NavLink } from "./nav-link";
import { ROUTES, path, serviceHref, type Locale } from "@/lib/routes";
import type { HeaderCopy } from "@/content";
import { cx } from "@/lib/cx";

/**
 * LE MENU DÉROULANT « SERVICES » DE LA BARRE (maquette du 24/11/2026).
 *
 * Les trois services, une ligne chacun, vers leur bloc de la page Services,
 * puis un lien vers la page entière. Il s'ouvre au clic (et à la flèche
 * vers le bas au clavier), se ferme par Échap, par un clic ailleurs ou quand
 * le focus en sort. Repris de l'ancien menu « Solutions ».
 */
export function ServicesMenu({
  locale,
  pathname,
  label,
  menu,
}: {
  locale: Locale;
  pathname: string;
  label: string;
  menu: HeaderCopy["site"]["servicesMenu"];
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = "services-menu";
  const route = path(locale, ROUTES.services);
  const current = pathname === route;

  useEffect(() => {
    if (!open) return;
    const outside = (e: PointerEvent) => {
      if (e.target instanceof Node && !root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);

  return (
    <div
      ref={root}
      className="services-menu"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
        if (e.key === "ArrowDown" && e.target === trigger.current) {
          e.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => root.current?.querySelector<HTMLAnchorElement>(".services-menu-panel a")?.focus());
        }
      }}
    >
      <button
        type="button"
        ref={trigger}
        className={cx("site-nav-link services-menu-trigger", current && "is-current")}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown aria-hidden />
      </button>
      <div id={id} hidden={!open} className="services-menu-panel">
        <ul>
          {menu.items.map((item) => (
            <li key={item.key}>
              <NavLink href={serviceHref(locale, item.key)} locale={locale} onNavigate={() => setOpen(false)}>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
              </NavLink>
            </li>
          ))}
        </ul>
        <NavLink href={route} locale={locale} onNavigate={() => setOpen(false)} className="services-menu-all">
          {menu.all}
          <ArrowRight aria-hidden />
        </NavLink>
      </div>
    </div>
  );
}
