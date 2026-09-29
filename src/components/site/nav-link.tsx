"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { homePath, type Locale } from "@/lib/content";

/**
 * A nav link that handles in-page targets properly.
 *
 * The browser only scrolls to a `#hash` when the hash actually *changes*, so
 * a plain anchor goes dead once you are already at that URL: click Offre,
 * click Accueil, click Offre again, and nothing happens the third time.
 *
 * When we are already on the page the link points at, this takes over: it
 * scrolls to the target itself — which works no matter what the current hash
 * is — and rewrites the address bar to match. Navigating to a different route
 * falls through to the normal `next/link` behaviour.
 */
export function NavLink({
  href,
  locale,
  onNavigate,
  children,
  ...rest
}: {
  href: string;
  locale: Locale;
  onNavigate?: () => void;
  children: React.ReactNode;
} & Omit<React.ComponentProps<typeof Link>, "href" | "onClick" | "children">) {
  const pathname = usePathname();
  const home = homePath(locale);

  const [rawRoute, hash] = href.split("#");
  const route = rawRoute === "" ? home : rawRoute.replace(/\/$/, "") || "/";

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Leave modified clicks alone — new tab, new window, download.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    onNavigate?.();
    // Different route: let Next handle the navigation.
    if (pathname !== route) return;

    event.preventDefault();

    if (!hash) {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      // Drop any leftover hash so the next click on a section link works.
      window.history.replaceState(window.history.state, "", route);
      return;
    }

    document
      .getElementById(hash)
      ?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    window.history.replaceState(window.history.state, "", `${route === "/" ? "" : route}#${hash}`);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
