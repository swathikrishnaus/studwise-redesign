"use client";

import { useId, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { destinationPhrase, destinations, dialCodes, initialData, intakes, studyLevels } from "@/data/consultation";
import type { FormData } from "@/data/consultation";
import { bookAppointmentHref } from "@/data/whyChooseUs";
import CloudButton from "@/components/ui/CloudButton";

/** WhatsApp mark as a stroke icon: the round speech bubble with its tail, and the handset inside */
const WHATSAPP_STROKE = [
  "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9",
  "M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1",
];
const PHONE =
  "M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z";
const ARROW_UP_RIGHT = "M7 17 17 7m0 0H9m8 0v8";
const CHECK = "M5 13l4 4L19 7";
const CLOCK = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2";
const ARROW = "M5 12h14m-6-6 6 6-6 6";

function Stroke({ d, className = "w-4 h-4", width = 2 }: { d: string | string[]; className?: string; width?: number }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      {(Array.isArray(d) ? d : [d]).map((p) => (
        <path key={p} strokeLinecap="round" strokeLinejoin="round" strokeWidth={width} d={p} />
      ))}
    </svg>
  );
}

/** One question: a numbered label, a tick once answered, then its options */
function Question({ n, done, title, children }: { n: number; done: boolean; title: string; children: ReactNode }) {
  return (
    // min-w-0: a fieldset otherwise refuses to shrink below its contents (the phone field overflowed narrow phones)
    <fieldset className="min-w-0">
      <legend className="flex w-full items-center gap-2.5 mb-2 sm:mb-2.5 short:mb-2">
        <span className="text-[11px] tabular-nums tracking-[0.12em] text-slate-400">0{n}</span>
        <span className="flex-1 text-[15px] sm:text-base leading-tight tracking-[-0.01em] text-slate-900">{title}</span>
        <span
          className={`grid place-items-center w-5 h-5 rounded-full bg-emerald-500 text-white transition-all duration-300 ${
            done ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          aria-hidden="true"
        >
          <Stroke d={CHECK} className="w-3 h-3" width={3.2} />
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

/** A single-tap answer: selection only changes colour, so rows never re-wrap */
function Option({
  name,
  value,
  checked,
  onChange,
}: {
  name: keyof FormData;
  value: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="relative cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} required className="peer sr-only" />
      <span className="inline-flex items-center justify-center w-full h-8 sm:h-9 px-2.5 sm:px-3 short:px-2 rounded-full bg-white text-[13px] sm:text-sm text-slate-700 whitespace-nowrap ring-1 ring-inset ring-slate-200 transition-[background-color,color,box-shadow] duration-200 hover:ring-slate-400 hover:text-slate-900 peer-checked:bg-[#0b2a45] peer-checked:text-white peer-checked:ring-[#0b2a45] peer-checked:hover:text-white peer-checked:hover:ring-[#0b2a45] peer-focus-visible:ring-2 peer-focus-visible:ring-[#009cd9]">
        {value}
      </span>
    </label>
  );
}

/** The two direct lines as tiles above the questions on desktop pages:
    tall, or lying flat (icon beside the text) on desktop screens under
    960px tall */
function DirectTiles() {
  const tile = "group flex flex-col low:flex-row low:items-center low:gap-3 rounded-2xl p-4 low:p-3 transition-colors duration-300";
  const arrow =
    "low:hidden w-4 h-4 text-slate-400 transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
  const title = "mt-6 low:mt-0 text-base leading-tight text-slate-900 transition-colors group-hover:text-white";
  const sub = "mt-1 low:mt-0.5 text-sm leading-snug text-slate-500 transition-colors group-hover:text-white/85";
  const extra = "mt-3 low:hidden flex items-center gap-1.5 text-xs transition-colors group-hover:text-white";
  return (
    <div className="grid grid-cols-2 gap-2.5">
      <a href={bookAppointmentHref} target="_blank" rel="noopener noreferrer" className={`${tile} bg-[#effaf3] hover:bg-[#25d366]`}>
        <span className="flex items-start justify-between low:shrink-0">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-[#25d366] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#1da851]">
            <Stroke d={WHATSAPP_STROKE} className="w-5 h-5" width={1.8} />
          </span>
          <Stroke d={ARROW_UP_RIGHT} className={arrow} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className={title}>Chat on WhatsApp</span>
          <span className={sub}>Quick replies from a real advisor</span>
        </span>
        <span className={`${extra} text-emerald-700`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
          Advisors online now
        </span>
      </a>

      <a href="tel:+919113650884" className={`${tile} bg-[#eef7fc] hover:bg-[#009cd9]`}>
        <span className="flex items-start justify-between low:shrink-0">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-[#009cd9] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#009cd9]">
            <Stroke d={PHONE} className="w-[18px] h-[18px]" width={1.8} />
          </span>
          <Stroke d={ARROW_UP_RIGHT} className={arrow} />
        </span>
        <span className="flex min-w-0 flex-col">
          <span className={title}>Call an advisor</span>
          <span className={`${sub} tabular-nums whitespace-nowrap`}>+91 91136 50884</span>
        </span>
        <span className={`${extra} text-[#0a7fb3]`}>
          <Stroke d={CLOCK} className="w-3.5 h-3.5" />
          Free 1-on-1 guidance
        </span>
      </a>
    </div>
  );
}

/** The two direct lines as a row of slim buttons under the submit button (compact layout) */
function DirectButtons({ className = "" }: { className?: string }) {
  const btn = "group inline-flex items-center justify-center gap-2 h-11 rounded-full text-sm transition-colors duration-300";
  return (
    <div className={`grid grid-cols-2 gap-2 ${className}`}>
      <a
        href={bookAppointmentHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-[#effaf3] text-slate-800 hover:bg-[#25d366] hover:text-white`}
      >
        <Stroke d={WHATSAPP_STROKE} className="w-[18px] h-[18px] text-[#25d366] transition-colors group-hover:text-white" width={1.8} />
        WhatsApp
      </a>
      <a href="tel:+919113650884" className={`${btn} bg-[#eef7fc] text-slate-800 hover:bg-[#009cd9] hover:text-white`}>
        <Stroke d={PHONE} className="w-4 h-4 text-[#009cd9] transition-colors group-hover:text-white" width={1.8} />
        Call us
      </a>
    </div>
  );
}

export default function AdvisorForm({
  id,
  highlight = false,
  compact = false,
  dialog = false,
  onClose,
}: {
  id?: string;
  highlight?: boolean;
  /** The compact layout on every screen size (not only on phones) */
  compact?: boolean;
  /** Popup layout: compact, with a close button */
  dialog?: boolean;
  onClose?: () => void;
}) {
  // The brand-blue header band: always on phones, and on every screen when highlighted
  const hl = highlight || dialog;
  const tight = compact || dialog;
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const phoneId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "phone" ? value.replace(/[^\d\s]/g, "") : value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 450);
  };

  // India needs exactly 10 digits; other countries vary (7–12). A leading
  // trunk 0 (as in 098765 43210) is allowed and not counted
  const digits = formData.phone.replace(/\D/g, "").replace(/^0/, "").length;
  const phoneDone = formData.dial === "+91" ? digits === 10 : digits >= 7 && digits <= 12;
  const dial = dialCodes.find((d) => d.code === formData.dial) ?? dialCodes[0];
  const answered = [!!formData.destination, !!formData.studyLevel, !!formData.intake, phoneDone];
  const doneCount = answered.filter(Boolean).length;

  const shell = `relative flex-1 min-w-0 h-full flex flex-col rounded-3xl bg-white ring-1 text-slate-900 ${
    hl
      ? "ring-[#009cd9]/30 shadow-[0_30px_70px_-30px_rgba(0,110,180,0.65)]"
      : "ring-slate-900/[0.06] max-lg:ring-[#009cd9]/25 max-lg:shadow-[0_30px_60px_-34px_rgba(0,110,180,0.6)]"
  }`;
  // Fields and the submit button: slim in the compact layout, roomier on desktop pages
  const fieldHeight = tight ? "h-12" : "h-12 lg:h-13 short:h-12";

  const closeButton = onClose && (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close"
      className="grid place-items-center w-9 h-9 -my-1 -mr-1 rounded-full bg-white/15 ring-1 ring-white/25 text-white transition-colors hover:bg-white hover:text-[#0a7fb3]"
    >
      <Stroke d="M6 6l12 12M18 6 6 18" className="w-4 h-4" />
    </button>
  );

  if (submitted) {
    return (
      <div id={id} className={`${shell} items-center justify-center text-center p-8 sm:p-12`}>
        <span className="relative grid place-items-center w-20 h-20 rounded-full bg-emerald-50">
          <span
            className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40 motion-reduce:animate-none"
            aria-hidden="true"
          />
          <span className="relative grid place-items-center w-12 h-12 rounded-full bg-emerald-500 text-white">
            <Stroke d={CHECK} className="w-6 h-6" width={2.6} />
          </span>
        </span>
        <h3 className="mt-7 text-[1.9rem] leading-tight tracking-[-0.035em]">You&apos;re all set!</h3>
        <p className="mt-3 max-w-sm body-text text-slate-500">
          A Studwise advisor will message you on WhatsApp at{" "}
          <span className="text-slate-900 tabular-nums">
            {formData.dial} {formData.phone}
          </span>{" "}
          about your {formData.studyLevel} in {destinationPhrase[formData.destination] ?? formData.destination}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {onClose && (
            <CloudButton onClick={onClose} size="sm" className="mt-0 h-11">
              Done
            </CloudButton>
          )}
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData(initialData);
            }}
            className="inline-flex items-center gap-2 h-11 px-5 rounded-full ring-1 ring-slate-200 text-sm text-slate-700 transition-colors hover:ring-[#009cd9] hover:text-[#0a7fb3]"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className={`${shell} scroll-mt-6 overflow-hidden`}>
      {/* ---------------- Help desk (a brand-blue band on phones) ---------------- */}
      <div
        className={`relative isolate overflow-hidden px-5 pt-5 pb-5 sm:px-7 sm:pt-6 sm:pb-6 ${
          dialog
            ? "bg-[#009cd9] text-white"
            : hl
              ? `lg:px-8 bg-[#009cd9] text-white ${tight ? "" : "lg:pt-7 lg:pb-7 short:pt-5 short:pb-5"}`
              : "lg:px-8 lg:pt-8 lg:pb-0 max-lg:bg-[#009cd9] max-lg:text-white"
        }`}
      >
        {/* Band texture: a light glow top right and a deeper one bottom left */}
        <span className={`pointer-events-none absolute inset-0 -z-10 ${hl ? "" : "lg:hidden"}`} aria-hidden="true">
          <span className="absolute -top-28 -right-20 w-80 h-80 rounded-full bg-white/25 blur-3xl" />
          <span className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-[#0b2a45]/30 blur-3xl" />
        </span>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span
            className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full ring-1 pl-2.5 pr-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
              hl
                ? "bg-white/15 ring-white/25 text-white"
                : "bg-slate-50 ring-slate-900/5 text-slate-600 max-lg:bg-white/15 max-lg:ring-white/25 max-lg:text-white"
            }`}
          >
            <span className="relative w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping motion-reduce:animate-none" />
            </span>
            24/7 help desk
          </span>
          <span className="flex items-center gap-3">
            {/* Progress: one segment per answered question */}
            <span className="flex items-center gap-2.5" aria-label={`${doneCount} of 4 questions answered`}>
              <span className="flex gap-1" aria-hidden="true">
                {answered.map((done, i) => (
                  <span
                    key={i}
                    className={`h-1 w-5 rounded-full transition-colors duration-500 ${
                      hl ? (done ? "bg-white" : "bg-white/30") : done ? "bg-[#009cd9] max-lg:bg-white" : "bg-slate-200 max-lg:bg-white/30"
                    }`}
                  />
                ))}
              </span>
              {/* The popup needs the room for its close button */}
              <span
                className={`text-[11px] tabular-nums ${dialog ? "hidden" : ""} ${hl ? "text-white/80" : "text-slate-400 max-lg:text-white/80"}`}
                aria-hidden="true"
              >
                {doneCount}/4
              </span>
            </span>
            {closeButton}
          </span>
        </div>

        <h3 className={`mt-3 sm:mt-4 text-[1.55rem] sm:text-[2rem] leading-[1.05] tracking-[-0.04em] ${tight ? "" : "lg:mt-5"}`}>
          Not sure where to study?
        </h3>
        {/* Dropped on phones (and, in the compact layout and the homepage hero, on short desktop screens) to keep the card short */}
        <p className={`mt-2 body-text max-sm:hidden ${tight || hl ? "short:hidden" : ""} ${hl ? "text-white/85" : "text-slate-500 max-lg:text-white/85"}`}>
          Talk to a Studwise advisor anytime, free and with no obligation.
        </p>
      </div>

      <div
        className={`relative flex-1 flex flex-col bg-white px-5 pt-4 pb-4 sm:px-7 sm:pt-5 sm:pb-6 ${
          dialog ? "" : tight ? "lg:px-8 lg:pt-5 lg:pb-5" : "lg:px-8 lg:pb-7 lg:pt-0 short:pb-4"
        }`}
      >
        {/* Any spare height (when the card is stretched beside a taller panel) opens up here, under the intro */}
        {!dialog && <div className={`hidden lg:block flex-1 ${tight ? "" : hl ? "min-h-5 short:min-h-3" : "min-h-7"}`} aria-hidden="true" />}

        {/* ---------------- Direct lines as tiles (desktop pages) ---------------- */}
        {!tight && (
          <div className="hidden lg:block">
            <DirectTiles />
            <div className="my-5 short:my-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-400" aria-hidden="true">
              <span className="h-px flex-1 bg-slate-200" />
              or
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </div>
        )}

        {/* ---------------- Four quick questions ---------------- */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4 short:gap-3">
          <Question n={1} done={!!formData.destination} title="Where do you want to study?">
            <div className="flex flex-wrap gap-1.5 xl:gap-1">
              {destinations.map((d) => (
                <Option key={d} name="destination" value={d} checked={formData.destination === d} onChange={handleChange} />
              ))}
            </div>
          </Question>

          <Question n={2} done={!!formData.studyLevel} title="What do you want to study?">
            {/* Two by two on phones, one row where there is room */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:[&>label]:grow">
              {studyLevels.map((l) => (
                <Option key={l} name="studyLevel" value={l} checked={formData.studyLevel === l} onChange={handleChange} />
              ))}
            </div>
          </Question>

          <Question n={3} done={!!formData.intake} title="When do you plan to start?">
            <div className="flex flex-wrap gap-1.5 [&>label]:grow">
              {intakes.map((i) => (
                <Option key={i} name="intake" value={i} checked={formData.intake === i} onChange={handleChange} />
              ))}
            </div>
          </Question>

          <Question n={4} done={phoneDone} title="How can we reach you?">
            <div
              className={`flex items-center ${fieldHeight} rounded-2xl bg-slate-50 ring-1 ring-inset ring-slate-200 transition-[background-color,box-shadow] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#009cd9]`}
            >
              {/* Country code: a native select shown as a compact flag + code */}
              <label className="relative shrink-0 flex items-center h-full pl-4 pr-3 text-base text-slate-800 cursor-pointer">
                <span className="sr-only">Country code</span>
                <span aria-hidden="true" className="mr-2">
                  {dial.flag}
                </span>
                <span aria-hidden="true" className="tabular-nums">
                  {dial.code}
                </span>
                <Stroke d="M19 9l-7 7-7-7" className="ml-1.5 w-3.5 h-3.5 text-slate-400" />
                <select name="dial" value={formData.dial} onChange={handleChange} className="absolute inset-0 opacity-0 cursor-pointer">
                  {dialCodes.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.flag} {d.country} ({d.code})
                    </option>
                  ))}
                </select>
              </label>
              <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
              <label htmlFor={phoneId} className="sr-only">
                WhatsApp number
              </label>
              <input
                type="tel"
                id={phoneId}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="WhatsApp number"
                required
                pattern={formData.dial === "+91" ? "0?\\s?\\d{5}\\s?\\d{5}" : "[\\d\\s]{7,15}"}
                maxLength={15}
                title={formData.dial === "+91" ? "Enter your 10-digit mobile number" : "Enter your phone number"}
                autoComplete="tel-national"
                inputMode="numeric"
                className="flex-1 min-w-0 h-full pl-3 pr-3 bg-transparent text-base tabular-nums text-slate-900 placeholder:text-slate-400 focus:outline-none"
                // The field shows the focus ring (focus-within) instead
                style={{ outline: "none" }}
              />
              <Stroke
                d={WHATSAPP_STROKE}
                className={`w-5 h-5 mr-4 shrink-0 text-[#25d366] transition-all duration-300 ${phoneDone ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                width={1.8}
              />
            </div>
          </Question>

          <div className="pt-0.5 sm:pt-1 short:pt-0">
            <button
              type="submit"
              disabled={loading}
              data-loading={loading || undefined}
              className={`fly-btn group relative isolate overflow-hidden flex items-center w-full ${fieldHeight} rounded-full bg-[#009cd9] pl-6 pr-2 text-base text-white shadow-[0_14px_28px_-16px_rgba(0,120,180,0.85)] transition-colors duration-300 hover:bg-[#0b2a45] disabled:cursor-progress disabled:opacity-90 focus-visible:outline-offset-4`}
            >
              {loading ? "Connecting you…" : "Talk to an advisor"}
              {/* On hover a dashed trail draws in, an arrow glides along it and settles in the end circle, which grows to meet it */}
              <span className="fly-btn__lane" aria-hidden="true">
                <span className="fly-btn__trail" />
                <span className="fly-btn__disc">
                  {loading && (
                    <svg className="w-4 h-4 animate-spin text-[#009cd9]" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  )}
                </span>
                <span className="fly-btn__icon">
                  <Stroke d={ARROW} className="w-full h-full" width={2} />
                </span>
              </span>
            </button>

            {/* ---------------- Direct lines as slim buttons (compact layout, and phones) ---------------- */}
            <DirectButtons className={`mt-2.5 ${tight ? "" : "lg:hidden"}`} />

            <ul className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500">
              {["Free guidance", "No service fees", "Confidential"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Stroke d={CHECK} className="w-3.5 h-3.5 text-emerald-600" width={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
