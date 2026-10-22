"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Icon } from "@/components/shared/PageKit";
import { contactEmail } from "@/data/contact";
import { bookAppointmentHref } from "@/data/whyChooseUs";

type Field = "firstName" | "lastName" | "email" | "phone" | "message";
type Values = Record<Field, string>;

const empty: Values = { firstName: "", lastName: "", email: "", phone: "", message: "" };

const FIELDS: { name: Field; label: string; type: string; autoComplete: string; inputMode?: "email" | "tel" }[] = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", inputMode: "tel" },
];

const CHECK = "M5 13l4 4L19 7";
const MAIL = "M3 7l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z";
const WHATSAPP =
  "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z";

function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (!v.firstName.trim()) e.firstName = "Please enter your first name.";
  if (!v.lastName.trim()) e.lastName = "Please enter your last name.";
  if (!v.email.trim()) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "").length;
  if (!v.phone.trim()) e.phone = "Please enter your phone number.";
  else if (digits < 7 || digits > 15) e.phone = "Please enter a valid phone number.";
  if (!v.message.trim()) e.message = "Please tell us how we can help.";
  return e;
}

const compose = (v: Values) =>
  [
    `Hello Studwise, I'd like to get in touch.`,
    ``,
    `Name: ${v.firstName.trim()} ${v.lastName.trim()}`,
    `Email: ${v.email.trim()}`,
    `Phone: ${v.phone.trim()}`,
    ``,
    v.message.trim(),
  ].join("\n");

export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState<null | "whatsapp" | "email">(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: name === "phone" ? value.replace(/[^\d\s+()-]/g, "") : value }));
    if (errors[name as Field]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const send = (via: "whatsapp" | "email") => {
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const text = compose(values);
    const url =
      via === "whatsapp"
        ? `${bookAppointmentHref}?text=${encodeURIComponent(text)}`
        : `mailto:${contactEmail}?subject=${encodeURIComponent(`Enquiry from ${values.firstName.trim()} ${values.lastName.trim()}`)}&body=${encodeURIComponent(text)}`;
    if (via === "whatsapp") window.open(url, "_blank", "noopener,noreferrer");
    else window.location.href = url;
    setSent(via);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send("whatsapp");
  };

  const input = (bad: boolean) =>
    `peer w-full rounded-xl bg-slate-50 px-4 pt-6 pb-2 text-[15px] text-slate-900 outline-none focus-visible:outline-none ring-1 transition placeholder-transparent focus:bg-white focus:ring-2 ${
      bad ? "ring-rose-300 focus:ring-rose-400" : "ring-slate-200 hover:ring-slate-300 focus:ring-[#009cd9]/60"
    }`;
  const floating =
    "pointer-events-none absolute left-4 top-4 text-[15px] text-slate-500 transition-all peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#0a7fb3] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px]";

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center rounded-3xl bg-white p-8 sm:p-10 ring-1 ring-slate-900/5" role="status">
        <span className="grid place-items-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon d={CHECK} className="w-7 h-7" />
        </span>
        <h3 className="mt-6 text-2xl sm:text-3xl tracking-[-0.03em] text-slate-900">
          Your message is ready, {values.firstName.trim()}.
        </h3>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
          {sent === "whatsapp"
            ? "We've opened WhatsApp with your message filled in. Press send there and a Studwise advisor will reply."
            : "We've opened your email app with your message filled in. Press send there and a Studwise advisor will reply."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => send(sent)}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full bg-slate-900 text-sm text-white hover:bg-[#009cd9] transition-colors"
          >
            Open {sent === "whatsapp" ? "WhatsApp" : "email"} again
          </button>
          <button
            type="button"
            onClick={() => setSent(null)}
            className="inline-flex items-center h-11 px-5 rounded-full ring-1 ring-slate-200 text-sm text-slate-700 hover:ring-[#009cd9] hover:text-[#0a7fb3] transition-colors"
          >
            Edit message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-form-heading"
      className="rounded-3xl bg-white p-6 sm:p-8 lg:p-10 ring-1 ring-slate-900/5 shadow-[0_30px_60px_-45px_rgba(15,23,42,0.35)]"
    >
      <h2 id="contact-form-heading" className="text-2xl sm:text-[1.75rem] tracking-[-0.03em] text-slate-900">
        Send us a message
      </h2>
      <p className="mt-2 text-[15px] text-slate-500">All fields are required.</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <div className="relative">
              <input
                id={`contact-${f.name}`}
                name={f.name}
                type={f.type}
                inputMode={f.inputMode}
                autoComplete={f.autoComplete}
                value={values[f.name]}
                onChange={onChange}
                placeholder={f.label}
                required
                aria-invalid={Boolean(errors[f.name])}
                aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
                className={input(Boolean(errors[f.name]))}
              />
              <label htmlFor={`contact-${f.name}`} className={floating}>
                {f.label}
              </label>
            </div>
            {errors[f.name] && (
              <p id={`contact-${f.name}-error`} className="mt-1.5 text-[13px] text-rose-600">
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}
        <div className="sm:col-span-2">
          <div className="relative">
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={values.message}
              onChange={onChange}
              placeholder="Message"
              required
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              className={`${input(Boolean(errors.message))} resize-y min-h-[9rem]`}
            />
            <label htmlFor="contact-message" className={floating}>
              Message
            </label>
          </div>
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-[13px] text-rose-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-full bg-[#009cd9] text-[15px] text-white shadow-[0_12px_24px_-14px_rgba(0,120,180,0.8)] transition-colors hover:bg-[#0b2a45]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d={WHATSAPP} />
          </svg>
          Get in touch now
        </button>
        <button
          type="button"
          onClick={() => send("email")}
          className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full ring-1 ring-slate-200 text-[15px] text-slate-700 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
        >
          <Icon d={MAIL} className="w-[18px] h-[18px]" />
          Send by email instead
        </button>
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
        Your message opens in WhatsApp (or your email app) ready to send to the Studwise team.
      </p>
    </form>
  );
}
