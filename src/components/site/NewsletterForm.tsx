"use client";

import { useState } from "react";
import { CheckIcon, SendIcon } from "@/src/components/site/Icons";

const STORAGE_KEY = "happiness-newsletter";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) {
      setStatus("error");
      setMessage("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!list.includes(value)) list.push(value);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      /* storage unavailable — still show the demo confirmation */
    }

    setStatus("success");
    setMessage("عضویت شما ثبت شد. این یک نسخه نمایشی است و ایمیلی ارسال نمی‌شود.");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3">
      <label htmlFor="newsletter-email" className="sr-only">
        ایمیل
      </label>
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 focus-within:border-gold/60">
        <input
          id="newsletter-email"
          type="email"
          dir="ltr"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-left text-sm text-white outline-none placeholder:text-white/35"
        />
        <button
          type="submit"
          aria-label="عضویت در خبرنامه"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-ink transition-transform hover:scale-105"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </div>

      {status !== "idle" && (
        <p
          role="status"
          className={`flex items-start gap-2 text-xs leading-6 ${
            status === "success" ? "text-gold" : "text-red-300"
          }`}
        >
          {status === "success" && <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />}
          {message}
        </p>
      )}
    </form>
  );
}
