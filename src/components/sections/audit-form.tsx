"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContent, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

type Field =
  "lastName" | "firstName" | "email" | "phone" | "timeline" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Deliberately loose: international formats vary too much to validate strictly.
const PHONE_RE = /^[+()\d][\d\s().-]{6,}$/;

const control =
  "w-full rounded border border-input bg-surface px-3.5 text-[0.9rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-foreground/15 aria-invalid:border-destructive";
const controlH = "h-12";

/** Native select styled like the inputs, with our own chevron. */
function Select({
  id,
  options,
  placeholderLabel,
}: {
  id: string;
  options: readonly string[];
  placeholderLabel: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        aria-label={placeholderLabel}
        defaultValue={options[0]}
        className={cn(
          control,
          controlH,
          "appearance-none pr-10 [&>option]:bg-surface [&>option]:text-foreground",
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export function AuditForm({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);
  const f = contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function validate(data: Record<Field, string>): Errors {
    const e: Errors = {};
    if (!data.lastName.trim()) e.lastName = f.errLastName;
    if (!data.firstName.trim()) e.firstName = f.errFirstName;
    if (!data.email.trim()) e.email = f.errEmail;
    else if (!EMAIL_RE.test(data.email.trim())) e.email = f.errEmailInvalid;
    if (!PHONE_RE.test(data.phone.trim())) e.phone = f.errPhone;
    if (!data.message.trim() || data.message.trim().length < 10)
      e.message = f.errMessage;
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data: Record<Field, string> = {
      lastName: String(fd.get("lastName") ?? ""),
      firstName: String(fd.get("firstName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = formRef.current?.querySelector<HTMLElement>(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );
      first?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("done");
      toast.success(contact.success);
    } catch {
      setStatus("idle");
      toast.error(contact.error);
    }
  }

  if (status === "done") {
    return (
      <div className="surface-card flex flex-col items-center gap-3 p-9 text-center">
        <CheckCircle2 className="size-8 text-brand" />
        <h3 className="text-lg font-semibold tracking-tight">{f.sentTitle}</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          {contact.success}
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap
          label={f.lastName}
          htmlFor="lastName"
          error={errors.lastName}
          required
        >
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            className={cn(control, controlH)}
          />
        </FieldWrap>
        <FieldWrap
          label={f.firstName}
          htmlFor="firstName"
          error={errors.firstName}
          required
        >
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            className={cn(control, controlH)}
          />
        </FieldWrap>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap
          label={f.email}
          htmlFor="email"
          error={errors.email}
          required
        >
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(control, controlH)}
          />
        </FieldWrap>
        <FieldWrap
          label={f.phone}
          htmlFor="phone"
          error={errors.phone}
          required
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+32 4xx xx xx xx"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(control, controlH)}
          />
        </FieldWrap>
      </div>

      <FieldWrap label={f.timeline} htmlFor="timeline">
        <Select
          id="timeline"
          options={contact.timelines}
          placeholderLabel={f.timeline}
        />
      </FieldWrap>

      <FieldWrap
        label={f.message}
        htmlFor="message"
        error={errors.message}
        required
      >
        <Textarea
          id="message"
          name="message"
          rows={6}
          placeholder={f.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(control, "min-h-44 py-3")}
        />
      </FieldWrap>

      <div className="mt-2 flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-ink group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-[length:var(--fs-button)] font-medium disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {f.sending}
            </>
          ) : (
            <>
              {contact.submit}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <p className="mx-auto max-w-lg text-center text-[0.75rem] leading-relaxed text-muted-foreground/70 sm:whitespace-pre-line">
          {contact.note}
        </p>
      </div>
    </form>
  );
}

function FieldWrap({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="eyebrow text-muted-foreground">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
