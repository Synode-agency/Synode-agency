"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle } from "lucide-react";
import { ROUTES, path, type Locale } from "@/lib/routes";
import type { ContactFormCopy } from "@/content";
import { isValidEmail } from "@/lib/form-rules";

type FieldName = "name" | "email" | "need";

/**
 * Le formulaire de contact : trois champs, nom, e-mail et message (brief de
 * la refonte, 6.5).
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
 */
/* Vrai une fois la page prise en main par React, faux dans le HTML servi :
   le bouton d'envoi reste désactivé tant que l'envoi par script n'est pas
   prêt (voir plus bas). */
const noSubscribe = () => () => {};

export function ContactForm({ locale, form }: { locale: Locale; form: ContactFormCopy }) {
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);
  const f = form;
  const router = useRouter();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [sending, setSending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldName[]>([]);
  /* Vide ou mal écrite : deux messages différents pour le même champ. */
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  /* `null` tant qu'on ne sait pas : on n'affiche l'avertissement qu'une fois
     la réponse reçue, sinon il clignote au chargement de chaque page. */
  const [configured, setConfigured] = useState<boolean | null>(null);

  const [need, setNeed] = useState("");

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
    setEmailEmpty(!email);
    if (!email || !isValidEmail(email)) local.push("email");
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
    let succeeded = false;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          email,
          need: get("need"),
          hp_ref: get("hp_ref"),
          locale,
        }),
      });

      if (res.ok) {
        /* Le bouton reste verrouillé pendant le chargement de /merci : un
           second clic aurait créé une deuxième demande. */
        succeeded = true;
        router.push(path(locale, ROUTES.thanks));
        return;
      }

      const payload = (await res.json().catch(() => ({}))) as {
        error?: string;
        fields?: FieldName[];
      };
      if (payload.error === "invalid" && payload.fields?.length) {
        const first = payload.fields[0];
        setFieldErrors(payload.fields);
        /* Comme pour les erreurs vues dans le navigateur : le focus part sur
           le premier champ fautif, qui annonce son message (K13). Après le
           rendu, pour que le champ porte déjà son erreur. */
        requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
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
      if (!succeeded) setSending(false);
    }
  }

  return (
    /* `method="post"` et le bouton désactivé tant que React n'a pas pris la
       main : sans ça, un clic avant la fin du chargement, ou sans
       JavaScript, envoyait le formulaire en GET, avec le nom, l'e-mail et
       le message dans l'adresse (historique, journaux de l'hébergeur), et
       rien n'était enregistré. */
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form" method="post">
      <noscript>
        <p className="form-notice">
          {locale === "fr"
            ? "Ce formulaire a besoin de JavaScript. Écrivez-nous à contact@synode-agency.com."
            : "This form needs JavaScript. Write to us at contact@synode-agency.com."}
        </p>
      </noscript>
      {configured === false && (
        <p role="status" className="form-notice">
          <AlertCircle aria-hidden />
          {f.errors.notConfigured}
        </p>
      )}

      <div className="form-grid">
        <Field
          uid={uid}
          name="name"
          autoComplete="name"
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
          autoComplete="email"
          type="email"
          label={f.fields.email.label}
          placeholder={f.fields.email.placeholder}
          required
          invalid={err("email")}
          error={emailEmpty ? f.errors.email : f.errors.emailInvalid}
          maxLength={200}
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

      </div>

      {/* Le pot de miel. Masqué à l'œil ET au lecteur d'écran, hors du flux
          de tabulation : seul un robot le remplit. */}
      <div aria-hidden className="form-trap">
        <label htmlFor={`${uid}-hp-ref`}>{locale === "fr" ? "Laisser vide" : "Leave empty"}</label>
        <input id={`${uid}-hp-ref`} name="hp_ref" type="text" tabIndex={-1} autoComplete="off" />
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
        <button type="submit" className="btn btn--primary" disabled={sending || !ready}>
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
  autoComplete,
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
  autoComplete?: string;
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
        autoComplete={autoComplete}
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
