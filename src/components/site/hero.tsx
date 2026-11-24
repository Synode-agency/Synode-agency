import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PrimaryButton } from "@/components/site/primary-button";
import type { Locale } from "@/lib/routes";

/**
 * LE HERO DES PAGES DE LA REFONTE, sur le gabarit existant (`PageHero`).
 *
 * Les props du brief (section 5) : un surtitre facultatif, le titre, une
 * phrase, le bouton principal et un lien texte secondaire. `note` est la
 * mention sous le bouton (« Gratuit, sans engagement. »).
 *
 * Une seule action pleine : le lien secondaire est un lien texte, jamais un
 * second bouton (règle 1). `aside` garde la colonne de droite du gabarit,
 * pour le calendrier de Contact par exemple.
 */
export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  primaryCta = false,
  secondaryLink,
  arrows = true,
  note,
  layout = "inner",
  aside,
  strip,
  className,
  tone,
  children,
}: {
  locale: Locale;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  primaryCta?: boolean;
  secondaryLink?: { href: string; label: string };
  /** Les flèches après les libellés des deux actions. */
  arrows?: boolean;
  note?: string;
  layout?: "feature" | "inner";
  aside?: ReactNode;
  /** Une bande pleine largeur sous les deux colonnes (la bande de preuve). */
  strip?: ReactNode;
  className?: string;
  /** Le ton du fond pour la barre de navigation (voir `PageHero`). */
  tone?: "dark" | "light";
  children?: ReactNode;
}) {
  return (
    <PageHero layout={layout} kicker={eyebrow} title={title} aside={aside} strip={strip} className={className} tone={tone}>
      {subtitle ? <p>{subtitle}</p> : null}
      {primaryCta || secondaryLink ? (
        <div className="btn-row hero-actions">
          {primaryCta ? <PrimaryButton locale={locale} icon={arrows} /> : null}
          {secondaryLink ? (
            <Link className="go" href={secondaryLink.href}>
              {secondaryLink.label}
              {arrows && <ArrowRight aria-hidden />}
            </Link>
          ) : null}
        </div>
      ) : null}
      {note ? <span className="hero-reassurance">{note}</span> : null}
      {children}
    </PageHero>
  );
}
