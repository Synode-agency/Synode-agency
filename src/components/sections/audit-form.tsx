"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContent, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "company" | "offer" | "budget" | "timeline" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldClass =
  "h-11 w-full rounded-lg border border-input bg-transparent px-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive md:text-sm";

export function AuditForm({ locale }: { locale: Locale }) {
  const { contact } = getContent(locale);
  const f = contact.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  function validate(data: Record<Field, string>): Errors {
    const e: Errors = {};
    if (!data.name.trim()) e.name = f.errName;
    if (!data.email.trim()) e.email = f.errEmail;
    else if (!EMAIL_RE.test(data.email.trim())) e.email = f.errEmailInvalid;
    if (!data.message.trim() || data.message.trim().length < 10)
      e.message = f.errMessage;
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data: Record<Field, string> = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      offer: String(fd.get("offer") ?? ""),
      budget: String(fd.get("budget") ?? ""),
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
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-brand/30 bg-brand-dim/20 p-8">
        <CheckCircle2 className="size-8 text-brand" />
        <h3 className="text-lg font-semibold">{f.sentTitle}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
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
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label={f.name} htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="h-11"
          />
        </FieldWrap>
        <FieldWrap label={f.company} htmlFor="company">
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            className="h-11"
          />
        </FieldWrap>
      </div>

      <FieldWrap label={f.email} htmlFor="email" error={errors.email} required>
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="h-11"
        />
      </FieldWrap>

      <FieldWrap label={f.offer} htmlFor="offer">
        <select
          id="offer"
          name="offer"
          defaultValue={contact.offers[0]}
          className={fieldClass}
        >
          {contact.offers.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </FieldWrap>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label={f.budget} htmlFor="budget">
          <select
            id="budget"
            name="budget"
            defaultValue={contact.budgets[0]}
            className={fieldClass}
          >
            {contact.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </FieldWrap>
        <FieldWrap label={f.timeline} htmlFor="timeline">
          <select
            id="timeline"
            name="timeline"
            defaultValue={contact.timelines[0]}
            className={fieldClass}
          >
            {contact.timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FieldWrap>
      </div>

      <FieldWrap
        label={f.message}
        htmlFor="message"
        error={errors.message}
        required
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder={f.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-32"
        />
      </FieldWrap>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-brand-foreground transition-colors hover:bg-brand-bright disabled:opacity-60"
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

      <p className="text-xs leading-relaxed text-muted-foreground/70">
        {contact.note}
      </p>
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
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className={cn("text-xs font-medium text-destructive")}
        >
          {error}
        </p>
      )}
    </div>
  );
}
