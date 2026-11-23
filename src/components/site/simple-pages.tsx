import { Fragment } from "react";
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
 * Texte validé le 23/11/2026 (cadre Smart : Productions Associées ASBL). Il
 * vit dans `src/lib/legal-content.ts`, avec le numéro d'activité Smart
 * (`SMART_ACTIVITY_NUMBER`), affiché seulement une fois connu.
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
        <Lede as="h1" title={notice ? legal.noticeTitle : legal.privacyTitle} align="center" />
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
          {legal.updated}{locale === "fr" ? "\u00a0: " : ": "}{texts.updated}
        </p>
      </Band>
    </Shell>
  );
}

/* Les marques d'écriture de `legal-content.ts` : gras, adresse e-mail, lien
   externe ou vers l'autre page légale. Un retour à la ligne devient un saut
   de ligne (les adresses). */
const LEGAL_TOKEN = /(\*\*[^*]+\*\*|\{email\}|<<[^|>]+\|[^>]+>>)/g;

function LegalText({ text, locale, email }: { text: string; locale: Locale; email: string }) {
  return (
    <>
      {text.split(LEGAL_TOKEN).map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (part === "{email}") return <a key={i} href={`mailto:${email}`}>{email}</a>;
        if (part.startsWith("<<") && part.endsWith(">>")) {
          const [label, href] = part.slice(2, -2).split("|");
          if (href === "@privacy") return <Link key={i} href={path(locale, ROUTES.privacy)}>{label}</Link>;
          if (href === "@notice") return <Link key={i} href={path(locale, ROUTES.legalNotice)}>{label}</Link>;
          return <a key={i} href={href} rel="noopener noreferrer">{label}</a>;
        }
        return part.split("\n").map((line, j) => (
          <Fragment key={`${i}-${j}`}>{j > 0 ? <br /> : null}{line}</Fragment>
        ));
      })}
    </>
  );
}

/** La page 404. Elle propose une sortie plutôt que de constater l'échec. */
/**
 * La page 404.
 *
 * `withEnglish` : la 404 globale sert TOUTES les adresses inconnues, celles
 * sous /en comprises (une faute de frappe dans une offre, une page qui
 * n'existe pas), et elle ne sait pas quelle adresse a été demandée. Elle
 * reste en français, la langue par défaut, et donne au visiteur
 * anglophone une ligne dans sa langue, avec le chemin du site anglais.
 */
export function NotFoundPage({ locale, withEnglish = false }: { locale: Locale; withEnglish?: boolean }) {
  const { notFound, site } = getContent(locale);

  return (
    <Shell locale={locale}>
      <Band id="top" tone="base">
        <Lede as="h1" title={notFound.title} text={notFound.text} align="center" />
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
        {withEnglish ? (
          <Link href={homePath("en")} hrefLang="en" lang="en" className="go section-gap-sm">
            This page does not exist. Go to the English site
            <ArrowRight aria-hidden />
          </Link>
        ) : null}
      </Band>
    </Shell>
  );
}
