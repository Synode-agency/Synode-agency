import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { ANCHORS, ROUTES, getContent, homePath, path, type Locale } from "@/lib/content";
import { LEGAL } from "@/lib/legal-content";

/**
 * La confirmation d'envoi.
 *
 * Elle n'est atteinte qu'APRÈS un enregistrement réussi : le formulaire n'y
 * redirige que sur une réponse `ok` du serveur. Elle dit aussi, explicitement,
 * qu'un message n'est pas un rendez-vous — c'est la confusion la plus
 * fréquente sur ce genre de page.
 *
 * Aucun délai de réponse n'est promis : la référence l'interdit tant qu'il
 * n'est pas tenable.
 */
export function ThanksPage({ locale }: { locale: Locale }) {
  const { thanks } = getContent(locale);
  const bookHref = `${path(locale, ROUTES.contact)}#${ANCHORS.booking}`;

  return (
    <Shell locale={locale}>
      {/* ⚠ La bande est bleu nuit parce qu'elle est la PREMIÈRE section de la
          page, pas à cause de son `tone` : le thème peint par rang. D'où
          `thanks-band`, qui lui donne le bleu clair des mots peints des
          heros — le bleu de marque n'y tiendrait que 2,9:1. */}
      <Band id="top" tone="blue" className="thanks-band">
        <Lede as="h1" title={thanks.title} accents={["message"]} text={thanks.text} align="center" />
        <p className="thanks-note">{thanks.notBooked}</p>
        <div className="btn-row cta-actions">
          <Link href={bookHref} className="btn btn--primary">
            {thanks.bookCta}
            <ArrowRight aria-hidden />
          </Link>
          <Link href={homePath(locale)} className="btn btn--ghost">
            {thanks.homeCta}
          </Link>
        </div>
      </Band>
    </Shell>
  );
}

/**
 * Les pages légales.
 *
 * Elles sont des BROUILLONS, et elles le disent en haut de page. Publier des
 * mentions légales incomplètes sans le signaler est pire que ne pas les
 * publier : un visiteur les lit comme des informations vérifiées.
 *
 * ⚠ Rien ici n'est inventé : ni numéro d'entreprise, ni adresse, ni forme
 * juridique. Le montage passe par Smart et les mentions exactes doivent être
 * confirmées avec eux. Le texte vit dans `src/lib/legal-content.ts` ; ce qui
 * manque est entre crochets, affiché en évidence, et listé dans
 * `LEGAL_TODO.md`.
 */
export function LegalPage({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "notice" | "privacy";
}) {
  const { legal, site } = getContent(locale);
  const texts = LEGAL[locale];
  const notice = kind === "notice";

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" title={notice ? legal.noticeTitle : legal.privacyTitle} />

        <div className="todo section-gap">
          <span className="todo-label">{legal.draftLabel}</span>
          <p>{legal.draftText}</p>
        </div>
      </Band>

      <Band tone="white">
        <div className="legal-body">
          {(notice ? texts.notice : texts.privacy).map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.blocks.map((block, i) =>
                typeof block === "string" ? (
                  <p key={i}>
                    <LegalText text={block} locale={locale} email={site.email} />
                  </p>
                ) : (
                  <ul key={i}>
                    {block.list.map((item) => (
                      <li key={item}>
                        <LegalText text={item} locale={locale} email={site.email} />
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </div>
        <p className="legal-updated section-gap">
          {legal.updated} : {texts.updated}
        </p>
      </Band>
    </Shell>
  );
}

/* Les marques d'écriture de `legal-content.ts` : gras, élément à confirmer,
   adresse e-mail, lien externe ou vers l'autre page légale. */
const LEGAL_TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]|\{email\}|<<[^|>]+\|[^>]+>>)/g;

function LegalText({ text, locale, email }: { text: string; locale: Locale; email: string }) {
  return (
    <>
      {text.split(LEGAL_TOKEN).map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        /* Un manque reste visible, jamais déguisé en information vérifiée. */
        if (part.startsWith("[") && part.endsWith("]")) return <span key={i} className="legal-todo">{part}</span>;
        if (part === "{email}") return <a key={i} href={`mailto:${email}`}>{email}</a>;
        if (part.startsWith("<<") && part.endsWith(">>")) {
          const [label, href] = part.slice(2, -2).split("|");
          if (href === "@privacy") return <Link key={i} href={path(locale, ROUTES.privacy)}>{label}</Link>;
          if (href === "@notice") return <Link key={i} href={path(locale, ROUTES.legalNotice)}>{label}</Link>;
          return <a key={i} href={href} rel="noopener noreferrer">{label}</a>;
        }
        return part;
      })}
    </>
  );
}

/** La page 404. Elle propose une sortie plutôt que de constater l'échec. */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { notFound, site } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" title={notFound.title} text={notFound.text} />
        <ul className="rows section-gap">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={path(locale, item.href)} className="row">
                <span className="row-title">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={homePath(locale)} className="go section-gap-sm">
          {notFound.homeCta}
          <ArrowRight aria-hidden />
        </Link>
      </Band>
    </Shell>
  );
}
