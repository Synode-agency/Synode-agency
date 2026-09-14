"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContent, type Locale } from "@/lib/content";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "company" | "phone" | "timeline" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const control =
  "w-full rounded-xl border border-hairline bg-white/[0.02] px-3.5 text-[0.9rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus-visible:border-brand/60 focus-visible:ring-4 focus-visible:ring-brand/15 aria-invalid:border-destructive";
const controlH = "h-12";

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
    if (!data.phone.trim()) e.phone = f.errPhone;
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
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-brand/30 bg-brand-dim/20 p-9">
        <CheckCircle2 className="size-8 text-brand" />
        <h3 className="text-lg font-semibold tracking-tight">{f.sentTitle}</h3>
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
      className="flex flex-col gap-5 rounded-2xl border border-hairline bg-surface p-7 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label={f.name} htmlFor="name" error={errors.name} required>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(control, controlH, "dark:bg-white/[0.02]")}
          />
        </FieldWrap>
        <FieldWrap label={f.company} htmlFor="company">
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            className={cn(control, controlH, "dark:bg-white/[0.02]")}
          />
        </FieldWrap>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrap label={f.email} htmlFor="email" error={errors.email} required>
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(control, controlH, "dark:bg-white/[0.02]")}
          />
        </FieldWrap>
        <FieldWrap label={f.phone} htmlFor="phone" error={errors.phone} required>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={cn(control, controlH, "dark:bg-white/[0.02]")}
          />
        </FieldWrap>
      </div>

      <FieldWrap label={f.timeline} htmlFor="timeline">
        <select
          id="timeline"
          name="timeline"
          defaultValue={contact.timelines[0]}
          className={cn(control, controlH, "[&>option]:text-black")}
        >
          {contact.timelines.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
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
          rows={5}
          placeholder={f.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(control, "min-h-36 py-3 dark:bg-white/[0.02]")}
        />
      </FieldWrap>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-[0.95rem] font-medium text-brand-foreground transition-colors hover:bg-brand-bright disabled:opacity-60"
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

      <p className="text-[0.75rem] leading-relaxed text-muted-foreground/70">
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
          className={cn("text-xs font-medium text-destructive")}
        >
          {error}
        </p>
      )}
    </div>
  );
}
