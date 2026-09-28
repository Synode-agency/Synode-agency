"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, AlertCircle } from "lucide-react";
import { ROUTES, getContent, path, type Locale } from "@/lib/content";
import { findUseCase } from "@/lib/use-cases";

type FieldName = "name" | "email" | "need" | "website";

/**
 * Le formulaire de contact.
 *
 * Trois choses qu'il ne fait jamais :
 *
 *  1. Afficher un succès sans en avoir la preuve. Le serveur ne répond `ok`
 *     qu'après avoir ENREGISTRÉ la demande ; tant qu'il n'y a pas de dépôt
 *     configuré, le formulaire le dit au lieu de faire semblant.
 *  2. Effacer le texte du visiteur. En cas d'erreur, tout reste dans les
 *     champs : il n'a pas à réécrire son besoin parce qu'un service tiers
 *     était indisponible.
 *  3. Envoyer deux fois. Le bouton se verrouille pendant l'envoi, et un
 *     double clic ne crée pas deux demandes.
 *
 * Le contexte du cas d'usage est prérempli depuis l'URL, et il reste
 * MODIFIABLE : c'est une proposition de départ, pas une case verrouillée.
 */
export function ContactForm({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);
  const f = contact.form;
  const router = useRouter();
  const params = useSearchParams();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [sending, setSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldName[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  /* `null` tant qu'on ne sait pas : on n'affiche l'avertissement qu'une fois
     la réponse reçue, sinon il clignote au chargement de chaque page. */
  const [configured, setConfigured] = useState<boolean | null>(null);

  const caseSlug = params.get("cas") ?? "";
  const matched = caseSlug ? findUseCase(locale, caseSlug) : undefined;
  /* Le préremplissage est l'état INITIAL, calculé une fois au montage. Le
     faire dans un effet reviendrait à écrire dans le champ après l'avoir
     affiché vide, et surtout à risquer d'écraser ce que le visiteur a déjà
     tapé si l'URL changeait. Ici, ce qu'il écrit gagne toujours. */
  const [need, setNeed] = useState(() => (matched ? prefill(matched.title, locale) : ""));

  useEffect(() => {
    let alive = true;
    fetch("/api/contact")
      .then((r) => r.json())
      .then((d: { configured?: boolean }) => alive && setConfigured(Boolean(d.configured)))
      .catch(() => alive && setConfigured(false));
    return () => {
      alive = false;
    };
  }, []);

  const err = (field: FieldName) => fieldErrors.includes(field);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const data = new FormData(event.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    /* Validation côté navigateur, pour le confort. Le serveur refait la
       même, parce que c'est lui qui décide. */
    const local: FieldName[] = [];
    if (!get("name")) local.push("name");
    const email = get("email");
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) local.push("email");
    if (get("need").length < 10) local.push("need");
    if (local.length) {
      setFieldErrors(local);
      setFormError(null);
      /* Le focus part sur le premier champ fautif : sans ça, un lecteur
         d'écran n'apprend jamais qu'il y a une erreur. */
      formRef.current?.querySelector<HTMLElement>(`[name="${local[0]}"]`)?.focus();
      return;
    }

    setFieldErrors([]);
    setFormError(null);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email,
          need: get("need"),
          company: get("company"),
          phone: get("phone"),
          website: get("website"),
          timeline: get("timeline"),
          budget: get("budget"),
          company_url: get("company_url"),
          useCase: caseSlug,
          locale,
        }),
      });

      if (res.ok) {
        router.push(path(locale, ROUTES.thanks));
        return;
      }

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: FieldName[];
      };
      if (payload.error === "invalid" && payload.fields?.length) {
        setFieldErrors(payload.fields);
      } else if (payload.error === "rate_limited") {
        setFormError(f.errors.rateLimited);
      } else if (payload.error === "not_configured") {
        setFormError(f.errors.notConfigured);
      } else {
        setFormError(f.errors.server);
      }
    } catch {
      setFormError(f.errors.server);
    } finally {
      setSending(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form">
      {configured === false && (
        <p role="status" className="form-notice">
          <AlertCircle aria-hidden />
          {f.errors.notConfigured}
        </p>
      )}

      {matched && (
        <p className="form-context">
          {locale === "fr" ? "Depuis le cas d’usage :" : "From the use case:"}{" "}
          <strong>{matched.title}</strong>
        </p>
      )}

      <div className="form-grid">
        <Field
          uid={uid}
          name="name"
          label={f.fields.name.label}
          placeholder={f.fields.name.placeholder}
          required
          invalid={err("name")}
          error={f.errors.name}
          maxLength={120}
        />
        <Field
          uid={uid}
          name="email"
          type="email"
          label={f.fields.email.label}
          placeholder={f.fields.email.placeholder}
          hint={f.fields.email.hint}
          required
          invalid={err("email")}
          error={f.errors.emailInvalid}
          maxLength={200}
        />
        <Field
          uid={uid}
          name="company"
          label={f.fields.company.label}
          placeholder={f.fields.company.placeholder}
          optional={f.fields.company.optional}
          maxLength={160}
        />
        <Field
          uid={uid}
          name="phone"
          type="tel"
          label={f.fields.phone.label}
          placeholder={f.fields.phone.placeholder}
          optional={f.fields.phone.optional}
          maxLength={40}
        />

        <div className="form-field form-field--wide">
          <label htmlFor={`${uid}-need`} className="form-label">
            {f.fields.need.label}
            <span aria-hidden className="form-required">*</span>
          </label>
          <span id={`${uid}-need-hint`} className="form-hint">
            {f.fields.need.hint}
          </span>
          <textarea
            id={`${uid}-need`}
            name="need"
            rows={6}
            maxLength={4000}
            required
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder={f.fields.need.placeholder}
            aria-invalid={err("need") || undefined}
            aria-describedby={`${uid}-need-hint${err("need") ? ` ${uid}-need-err` : ""}`}
            className="form-input form-textarea"
          />
          {err("need") && (
            <span id={`${uid}-need-err`} className="form-error">
              {f.errors.need}
            </span>
          )}
        </div>

        <Field
          uid={uid}
          name="website"
          label={f.fields.website.label}
          placeholder={f.fields.website.placeholder}
          optional={f.fields.website.optional}
          invalid={err("website")}
          error={f.errors.website}
          maxLength={300}
        />
        <Select uid={uid} name="timeline" label={f.fields.timeline.label} optional={f.fields.timeline.optional} options={f.timelineOptions} />
        <Select uid={uid} name="budget" label={f.fields.budget.label} optional={f.fields.budget.optional} options={f.budgetOptions} />
      </div>

      {/* Le pot de miel. Masqué à l'œil ET au lecteur d'écran, hors du flux
          de tabulation : seul un robot le remplit. */}
      <div aria-hidden className="form-trap">
        <label htmlFor={`${uid}-company-url`}>Company URL</label>
        <input id={`${uid}-company-url`} name="company_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* `aria-live` : l'erreur est annoncée sans que le focus bouge. */}
      <div aria-live="polite" className="form-live">
        {formError && (
          <p className="form-notice form-notice--error">
            <AlertCircle aria-hidden />
            {formError}
          </p>
        )}
      </div>

      <div className="form-foot">
        <button type="submit" className="btn btn--primary" disabled={sending}>
          {sending ? f.sending : f.submit}
          {!sending && <ArrowRight aria-hidden />}
        </button>
        <p className="form-privacy">
          {f.privacyNote}{" "}
          <a href={path(locale, ROUTES.privacy)}>{f.privacyLink}</a>
        </p>
      </div>
    </form>
  );
}

/** La phrase de départ, que le visiteur peut réécrire entièrement. */
function prefill(title: string, locale: Locale) {
  return locale === "fr"
    ? `Bonjour, je vous écris au sujet de : ${title.toLowerCase()}.\n\nDans notre cas, `
    : `Hello, I am writing about: ${title.toLowerCase()}.\n\nIn our case, `;
}

function Field({
  uid,
  name,
  label,
  placeholder,
  hint,
  optional,
  required,
  invalid,
  error,
  type = "text",
  maxLength,
}: {
  uid: string;
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  optional?: string;
  required?: boolean;
  invalid?: boolean;
  error?: string;
  type?: string;
  maxLength?: number;
}) {
  const id = `${uid}-${name}`;
  const described = [hint && `${id}-hint`, invalid && `${id}-err`].filter(Boolean).join(" ");

  return (
    <div className="form-field">
      {/* Le libellé est AU-DESSUS du champ et toujours visible. Un
          placeholder qui fait office de libellé disparaît dès qu'on tape. */}
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span aria-hidden className="form-required">*</span>}
        {optional && <span className="form-optional">{optional}</span>}
      </label>
      {hint && (
        <span id={`${id}-hint`} className="form-hint">
          {hint}
        </span>
      )}
      <input
        id={id}
        name={name}
        type={type}
        maxLength={maxLength}
        required={required}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={described || undefined}
        className="form-input"
      />
      {invalid && error && (
        <span id={`${id}-err`} className="form-error">
          {error}
        </span>
      )}
    </div>
  );
}

function Select({
  uid,
  name,
  label,
  optional,
  options,
}: {
  uid: string;
  name: string;
  label: string;
  optional?: string;
  options: readonly string[];
}) {
  const id = `${uid}-${name}`;
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
        {optional && <span className="form-optional">{optional}</span>}
      </label>
      <select id={id} name={name} defaultValue={options[0]} className="form-input">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
