import { CardPanel } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { PrimaryButton } from "@/components/site/primary-button";
import { getContent, type Locale } from "@/content";

/**
 * L'APPEL DE FIN DE PAGE, le même sur toutes les pages (brief, 6.1).
 *
 * Un titre, une phrase et le bouton principal, rien d'autre : pas de second
 * bouton, pas de calendrier (il ne vit que sur Contact). Les textes viennent
 * de `site.finalCta`. Une page peut les remplacer, sans changer la forme.
 *
 * C'est la carte sombre du design system (`dark-cta`), l'une des deux seules
 * cartes arrondies d'une page avec le hero. Sur ce fond, le bouton passe au
 * bleu clair tout seul : la carte reteint sa palette.
 */
export function CtaSection({ locale, title, text }: { locale: Locale; title?: string; text?: string }) {
  const { finalCta } = getContent(locale).site;
  return (
    <CardPanel id="conclusion" className="dark-cta cta-final" shellClassName="cta-shell--tall">
      <div className="col card-body cta-panel cta-final-body">
        <Lede align="center" title={title ?? finalCta.title} text={text ?? finalCta.text} />
        {/* Dans une rangée : c'est elle qui reçoit le bleu clair des
            boutons sur fond bleu nuit (fin de `studio.css`). */}
        <div className="btn-row">
          <PrimaryButton locale={locale} />
        </div>
      </div>
    </CardPanel>
  );
}
