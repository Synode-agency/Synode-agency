import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Band, Shell } from "@/components/site/shell";
import { Lede } from "@/components/site/lede";
import { PageSysteme } from "@/components/site/page-systeme";
import { renderLines } from "@/lib/lines";
import { bookingHref, ROUTES, getContent, homePath, path, type Locale } from "@/content";
import { LEGAL } from "@/content";

/**
 * La confirmation d'envoi (maquette « B, la suite », choisie par Antonino
 * le 28/11/2026) : le message à gauche, les trois étapes qui suivent à
 * droite, la dernière avec le bouton de l'appel.
 *
 * Elle n'est atteinte qu'APRÈS un enregistrement réussi : le formulaire n'y
 * redirige que sur une réponse `ok` du serveur. Elle dit aussi, explicitement,
 * qu'un message n'est pas un rendez-vous : c'est la confusion la plus
 * fréquente sur ce genre de page.
 *
 * Aucun délai de réponse n'est promis : la référence l'interdit tant qu'il
 * n'est pas tenable.
 */
export function ThanksPage({ locale }: { locale: Locale }) {
  const { thanks } = getContent(locale);
  const derniere = thanks.steps.length - 1;

  return (
    <Shell locale={locale}>
      <PageSysteme variante="deux">
        <h1>{renderLines(thanks.title, thanks.accents, "title-accent")}</h1>
        <p className="page-systeme-texte">{thanks.text}</p>
        <ol className="page-systeme-etapes">
          {thanks.steps.map((etape, i) => (
            <li key={etape.title}>
              <h2>{etape.title}</h2>
              <p>{etape.text}</p>
              {i === derniere ? (
                <div className="btn-row">
                  <Link href={bookingHref(locale)} className="btn btn--primary">
                    <span className="btn-lib">
                      {thanks.bookCta}
                      <ArrowRight aria-hidden />
                    </span>
                  </Link>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="btn-row page-systeme-retour">
          <Link href={homePath(locale)} className="btn btn--ghost">
            <span className="btn-lib">{thanks.homeCta}</span>
          </Link>
        </div>
      </PageSysteme>
    </Shell>
  );
}

/**
 * Les pages légales.
 *
 * Texte validé le 23/11/2026 (cadre Smart : Productions Associées ASBL). Il
 * vit dans `src/content/{fr,en}/legal.ts`, avec le numéro d'activité Smart
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

/* Les marques d'écriture de `src/content/{fr,en}/legal.ts` : gras, adresse e-mail, lien
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

/**
 * La page 404 (maquette « A », choisie par Antonino le 28/11/2026) : le
 * surtitre, le titre, la phrase et le seul bouton de retour, en plein
 * écran, sans autre lien (sa demande).
 *
 * La 404 globale (`global-not-found.tsx`) sert TOUTES les adresses
 * inconnues, celles sous /en comprises, et ne sait pas laquelle a été
 * demandée : elle reste en français, la langue par défaut.
 */
export function NotFoundPage({ locale }: { locale: Locale }) {
  const { notFound } = getContent(locale);

  return (
    <Shell locale={locale}>
      <PageSysteme>
        <p className="page-systeme-surtitre">{notFound.eyebrow}</p>
        <h1>{renderLines(notFound.title, notFound.accents, "title-accent")}</h1>
        <p className="page-systeme-texte">{notFound.text}</p>
        <div className="btn-row page-systeme-actions">
          <Link href={homePath(locale)} className="btn btn--primary">
            <span className="btn-lib">
              {notFound.homeCta}
              <ArrowRight aria-hidden />
            </span>
          </Link>
        </div>
      </PageSysteme>
    </Shell>
  );
}
