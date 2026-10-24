"use client";

import { useState } from "react";
import { CheckIcon, SendIcon } from "@/src/components/site/Icons";

interface Errors {
  name?: string;
  contact?: string;
  message?: string;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "لطفاً نام خود را وارد کنید.";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.trim());
    const isPhone = /^[0-9+\-\s]{8,}$/.test(contact.trim());
    if (!isEmail && !isPhone) next.contact = "ایمیل یا شماره تماس معتبر وارد کنید.";
    if (message.trim().length < 10) next.message = "متن پیام باید حداقل ۱۰ کاراکتر باشد.";
    return next;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }
    setSent(true);
    setName("");
    setContact("");
    setMessage("");
  }

  const fieldClass =
    "mt-2 w-full rounded-xl border border-ink/15 bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-ink/50";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="text-xs font-medium text-ink/60">
          نام
        </label>
        <input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(errors.name)}
          className={fieldClass}
          placeholder="نام و نام خانوادگی"
        />
        {errors.name && <p className="mt-2 text-xs text-brandred">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-value" className="text-xs font-medium text-ink/60">
          ایمیل یا شماره تماس
        </label>
        <input
          id="contact-value"
          dir="ltr"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          aria-invalid={Boolean(errors.contact)}
          className={`${fieldClass} text-left`}
          placeholder="you@example.com"
        />
        {errors.contact && <p className="mt-2 text-xs text-brandred">{errors.contact}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="text-xs font-medium text-ink/60">
          پیام
        </label>
        <textarea
          id="contact-message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          className={`${fieldClass} resize-none`}
          placeholder="پیام خود را بنویسید…"
        />
        {errors.message && <p className="mt-2 text-xs text-brandred">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-cherry"
      >
        <SendIcon className="h-4 w-4" />
        ارسال پیام
      </button>

      {sent && (
        <p
          role="status"
          className="flex items-start gap-2 rounded-xl bg-emerald-50 p-4 text-xs leading-6 text-emerald-700"
        >
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
          پیام شما ثبت شد. توجه: این فرم در حالت نمایشی است و پیام واقعاً ارسال نمی‌شود.
        </p>
      )}
    </form>
  );
}
