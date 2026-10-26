"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Icon } from "@/components/shared/PageKit";
import { contactEmail } from "@/data/contact";
import { bookAppointmentHref } from "@/data/whyChooseUs";
import CloudButton from "@/components/ui/CloudButton";

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

/** Numbered label with a tick once the field is done (as in AdvisorForm) */
function FieldLabel({ f, n, label, done }: { f: Field; n: number; label: string; done: boolean }) {
  return (
    <label htmlFor={`contact-${f}`} className="flex items-center gap-2.5 mb-1.5 sm:mb-2.5">
      <span className="text-[11px] tabular-nums tracking-[0.12em] text-slate-400">0{n}</span>
      <span className="flex-1 text-[15px] sm:text-base leading-tight tracking-[-0.01em] text-slate-900">{label}</span>
      <span
        className={`grid place-items-center w-5 h-5 rounded-full bg-emerald-500 text-white transition-all duration-300 ${
          done ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        aria-hidden="true"
      >
        <Icon d={CHECK} className="w-3 h-3" />
      </span>
    </label>
  );
}

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

  // Ticks and the progress meter: a field counts once it is filled in validly
  const check = validate(values);
  const fieldDone = (f: Field) => Boolean(values[f].trim()) && !check[f];
  const doneCount = (["firstName", "lastName", "email", "phone", "message"] as Field[]).filter(fieldDone).length;

  const shell = "relative flex flex-col rounded-[2rem] bg-white ring-1 ring-slate-900/[0.06] text-slate-900";
  const field = (bad: boolean) =>
    `w-full rounded-2xl bg-slate-50 px-4 text-base text-slate-900 outline-none focus-visible:outline-none ring-1 ring-inset transition-[background-color,box-shadow] focus:bg-white focus:ring-2 ${
      bad ? "ring-rose-300 focus:ring-rose-400" : "ring-slate-200 hover:ring-slate-300 focus:ring-[#009cd9]"
    }`;

  if (sent) {
    return (
      <div className={`${shell} h-full items-center justify-center text-center p-8 sm:p-12`} role="status">
        <span className="relative grid place-items-center w-20 h-20 rounded-full bg-emerald-50">
          <span className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40 motion-reduce:animate-none" aria-hidden="true" />
          <span className="relative grid place-items-center w-12 h-12 rounded-full bg-emerald-500 text-white">
            <Icon d={CHECK} className="w-6 h-6" />
          </span>
        </span>
        <h3 className="mt-7 text-[1.9rem] leading-tight tracking-[-0.035em]">Your message is ready, {values.firstName.trim()}.</h3>
        <p className="mt-3 max-w-md body-text text-slate-500">
          {sent === "whatsapp"
            ? "We've opened WhatsApp with your message filled in. Press send there and a Studwise advisor will reply."
            : "We've opened your email app with your message filled in. Press send there and a Studwise advisor will reply."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CloudButton onClick={() => send(sent)} size="sm" className="mt-0 h-11">
            Open {sent === "whatsapp" ? "WhatsApp" : "email"} again
          </CloudButton>
          <button
            type="button"
            onClick={() => setSent(null)}
            className="inline-flex items-center h-11 px-5 rounded-full ring-1 ring-slate-200 text-sm text-slate-700 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
          >
            Edit message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="contact-form-heading" className={`${shell} p-5 sm:p-7 lg:p-8`}>
      {/* On phones the form stays compact: names side by side, shorter fields and message box */}
      {/* ---------------- Header: required note + progress ---------------- */}
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 ring-1 ring-slate-900/5 pl-2.5 pr-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#009cd9]" aria-hidden="true" />
          All fields are required
        </span>
        <span className="flex items-center gap-2.5" aria-label={`${doneCount} of 5 fields completed`}>
          <span className="flex gap-1" aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`h-1 w-5 rounded-full transition-colors duration-500 ${i < doneCount ? "bg-[#009cd9]" : "bg-slate-200"}`} />
            ))}
          </span>
          <span className="text-[11px] tabular-nums text-slate-400" aria-hidden="true">
            {doneCount}/5
          </span>
        </span>
      </div>

      <h2 id="contact-form-heading" className="mt-5 sm:mt-6 text-[1.6rem] sm:text-[2rem] leading-[1.05] tracking-[-0.04em]">
        Send us a message
      </h2>
      <p className="mt-1.5 sm:mt-2 max-sm:text-[15px] max-sm:leading-snug body-text text-slate-500">
        Your message opens in WhatsApp (or your email app) ready to send to the Studwise team.
      </p>

      <div className="my-5 sm:my-6 h-px bg-slate-200" aria-hidden="true" />

      {/* ---------------- Fields ---------------- */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-y-5">
        {FIELDS.map((f, i) => (
          <div key={f.name} className={i < 2 ? "" : "col-span-2 sm:col-span-1"}>
            <FieldLabel f={f.name} n={i + 1} label={f.label} done={fieldDone(f.name)} />
            <input
              id={`contact-${f.name}`}
              name={f.name}
              type={f.type}
              inputMode={f.inputMode}
              autoComplete={f.autoComplete}
              value={values[f.name]}
              onChange={onChange}
              required
              aria-invalid={Boolean(errors[f.name])}
              aria-describedby={errors[f.name] ? `contact-${f.name}-error` : undefined}
              className={`${field(Boolean(errors[f.name]))} h-12 sm:h-14`}
            />
            {errors[f.name] && (
              <p id={`contact-${f.name}-error`} className="mt-1.5 text-[13px] text-rose-600">
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}
        <div className="col-span-2">
          <FieldLabel f="message" n={5} label="Message" done={fieldDone("message")} />
          <textarea
            id="contact-message"
            name="message"
            rows={3}
            value={values.message}
            onChange={onChange}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={`${field(Boolean(errors.message))} py-3 sm:py-4 resize-y min-h-[6.5rem] sm:min-h-[9rem]`}
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1.5 text-[13px] text-rose-600">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* ---------------- Send ---------------- */}
      <div className="mt-5 sm:mt-7 grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-2.5">
        <button
          type="submit"
          className="group flex items-center justify-between w-full h-14 rounded-full bg-[#009cd9] pl-6 pr-2 text-base text-white shadow-[0_14px_28px_-16px_rgba(0,120,180,0.85)] transition-colors duration-300 hover:bg-[#0b2a45] focus-visible:outline-offset-4"
        >
          Get in touch now
          <span className="grid place-items-center w-10 h-10 rounded-full bg-white text-[#009cd9] transition-colors duration-300 group-hover:text-[#0b2a45]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d={WHATSAPP} />
            </svg>
          </span>
        </button>
        <button
          type="button"
          onClick={() => send("email")}
          className="inline-flex items-center justify-center gap-2 h-11 sm:h-14 px-6 rounded-full ring-1 ring-inset ring-slate-200 text-[15px] sm:text-base text-slate-700 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
        >
          <Icon d={MAIL} className="w-[18px] h-[18px]" />
          Send by email instead
        </button>
      </div>
    </form>
  );
}
