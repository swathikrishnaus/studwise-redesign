"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import CloudButton from "@/components/ui/CloudButton";
import { bookAppointmentHref } from "@/data/whyChooseUs";

/* --------------------------------------------------------------------------
   ConsultationCard — four quick questions, then "Talk to an Advisor"
   --------------------------------------------------------------------------
   Every answer is a single tap except the WhatsApp number. Each step's badge
   turns into a tick once answered and the bar along the top fills, so the
   student always sees how close they are to done.
   -------------------------------------------------------------------------- */
const destinations = ["UK", "USA", "Canada", "Australia", "Germany", "Ireland", "Other"];
/* How each destination reads in the confirmation sentence */
const destinationPhrase: Record<string, string> = {
  UK: "the UK",
  USA: "the USA",
  Other: "your chosen country",
};
const studyLevels = ["Bachelor's", "Master's", "MBA", "PhD"];
const intakes = ["2027", "2028", "Not sure"];

// Dialling codes for the WhatsApp number (India first; then main study and
// Gulf countries where many students' families live)
const dialCodes = [
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
  { code: "+966", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", country: "Qatar" },
  { code: "+965", flag: "🇰🇼", country: "Kuwait" },
  { code: "+968", flag: "🇴🇲", country: "Oman" },
  { code: "+973", flag: "🇧🇭", country: "Bahrain" },
  { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", country: "USA / Canada" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+353", flag: "🇮🇪", country: "Ireland" },
];

const initialData = { destination: "", studyLevel: "", intake: "", dial: "+91", phone: "" };
type FormData = typeof initialData;

function Step({ n, done, title, children }: { n: number; done: boolean; title: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="flex items-center gap-2.5 text-[13px] sm:text-sm text-slate-800 mb-3">
        <span
          className={`grid place-items-center w-6 h-6 rounded-full text-[11px] transition-all duration-300 ${
            done ? "bg-emerald-500 text-white scale-105" : "bg-sky-50 text-[#009cd9] ring-1 ring-sky-100"
          }`}
          aria-hidden="true"
        >
          {done ? (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            n
          )}
        </span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Chip({
  name,
  value,
  checked,
  onChange,
}: {
  name: keyof FormData;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="group relative cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required
        className="peer sr-only"
      />
      {/* Selection changes colour only — never size — so rows never re-wrap */}
      <span className="flex items-center justify-center w-full h-9 px-2 rounded-xl bg-slate-50 ring-1 ring-inset ring-slate-200/80 text-[13px] text-slate-700 whitespace-nowrap transition-colors duration-200 hover:bg-white hover:ring-slate-300 hover:text-slate-900 peer-checked:bg-[#e8f6fd] peer-checked:ring-2 peer-checked:ring-[#009cd9] peer-checked:text-[#0078ad] peer-checked:hover:bg-[#e8f6fd] peer-focus-visible:ring-4 peer-focus-visible:ring-[#009cd9]/25">
        {value}
      </span>
      <span
        className="absolute -top-1.5 -right-1.5 grid place-items-center w-4 h-4 rounded-full bg-[#009cd9] text-white ring-2 ring-white scale-0 transition-transform duration-200 peer-checked:scale-100"
        aria-hidden="true"
      >
        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </label>
  );
}

export default function ConsultationCard() {
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  // India needs exactly 10 digits; other countries vary (7–12)
  const digits = formData.phone.replace(/\D/g, "").length;
  const phoneDone = formData.dial === "+91" ? digits === 10 : digits >= 7 && digits <= 12;
  const dial = dialCodes.find((d) => d.code === formData.dial) ?? dialCodes[0];
  const doneCount = [formData.destination, formData.studyLevel, formData.intake].filter(Boolean).length + (phoneDone ? 1 : 0);

  if (submitted) {
    return (
      <div className="relative flex-1 h-full flex flex-col justify-center overflow-hidden bg-white rounded-[2rem] p-8 sm:p-10 shadow-[0_30px_70px_-20px_rgba(0,109,160,0.25)] ring-1 ring-slate-200/70 text-center">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#009cd9] via-[#0089c2] to-[#006da0]" />
        <div className="w-16 h-16 bg-gradient-to-br from-[#009cd9] to-[#006da0] text-white rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#009cd9]/30">
          <svg className="w-8 h-8 -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-normal text-slate-900 mb-2">You&apos;re all set!</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          A Studwise advisor will message you on WhatsApp at{" "}
          <span className="text-slate-900">
            {formData.dial} {formData.phone}
          </span> about your {formData.studyLevel} in{" "}
          {destinationPhrase[formData.destination] ?? formData.destination}.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData(initialData);
          }}
          className="text-xs font-normal text-[#009cd9] hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div
      id="consultation-panel"
      className="relative flex-1 h-full flex flex-col overflow-hidden bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_30px_70px_-20px_rgba(0,109,160,0.25)] ring-1 ring-slate-200/70"
    >
      {/* Progress: fills as each question is answered */}
      <div className="absolute inset-x-0 top-0 h-1 bg-slate-100" aria-hidden="true">
        <div
          className="h-full bg-[#009cd9] transition-[width] duration-500 ease-out"
          style={{ width: `${(doneCount / 4) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col p-4 sm:p-6">
        {/* 24/7 help desk — the card's focal point; it grows to take any
            spare height, so the questions below keep even spacing */}
        <div className="relative flex-1 flex flex-col gap-3.5 min-h-0 rounded-3xl bg-[#009cd9] text-white p-4 sm:p-5 overflow-hidden">
          <svg
            className="absolute -right-5 -bottom-7 w-32 h-32 text-white/10 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d="M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2v1Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2v1Zm-3 2v1a3 3 0 0 1-3 3h-2" />
          </svg>
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em]">
              <span className="relative w-2 h-2 rounded-full bg-emerald-300">
                <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping" />
              </span>
              24/7 help desk
            </span>
            <p className="mt-2.5 text-lg sm:text-xl leading-tight tracking-tight">Not sure where to study?</p>
            <p className="mt-1 text-[13px] sm:text-sm text-white/85 leading-snug">
              Talk to a Studwise advisor anytime, free and with no obligation.
            </p>
          </div>
          {/* Contact boxes: icon, title, detail and a status row filling the box */}
          <div className="relative flex-1 grid grid-cols-2 gap-2.5 sm:gap-3 min-h-[128px]">
            <a
              href={bookAppointmentHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group/box flex flex-col rounded-2xl bg-white p-3.5 sm:p-4 text-slate-900 shadow-[0_10px_24px_-14px_rgba(0,40,80,0.6)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#25d366] text-white shadow-[0_8px_18px_-8px_rgba(37,211,102,0.8)]">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
                  </svg>
                </span>
                <span className="grid place-items-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 transition-colors group-hover/box:bg-[#25d366] group-hover/box:text-white">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/box:-rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </span>
              </span>
              <span className="mt-auto pt-2.5">
                <span className="block text-[15px] sm:text-base leading-tight">Chat on WhatsApp</span>
                <span className="block mt-1 text-xs sm:text-[13px] text-slate-500 leading-snug">Quick replies from a real advisor</span>
              </span>
              <span className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-600">
                <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping" />
                </span>
                Advisors online now
              </span>
            </a>
            <a
              href="tel:+919113650884"
              className="group/box flex flex-col rounded-2xl bg-[#0a86bd] ring-1 ring-inset ring-white/25 p-3.5 sm:p-4 text-white transition-colors duration-300 hover:bg-[#0b7cad]"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="grid place-items-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white text-[#009cd9] shadow-[0_8px_18px_-8px_rgba(0,30,60,0.6)]">
                  <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 0 1 2-2h2.3a1 1 0 0 1 1 .7l1.1 3.4a1 1 0 0 1-.3 1.1L7.6 9.6a11 11 0 0 0 6.8 6.8l1.4-1.5a1 1 0 0 1 1.1-.3l3.4 1.1a1 1 0 0 1 .7 1V19a2 2 0 0 1-2 2h-1C9.7 21 3 14.3 3 6V5Z" />
                  </svg>
                </span>
                <span className="grid place-items-center w-8 h-8 rounded-full bg-white/15 text-white transition-colors group-hover/box:bg-white group-hover/box:text-[#009cd9]">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/box:-rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </span>
              </span>
              <span className="mt-auto pt-2.5">
                <span className="block text-[15px] sm:text-base leading-tight">Call an advisor</span>
                <span className="block mt-1 text-xs sm:text-[13px] text-white/80 tabular-nums leading-snug">+91 91136 50884</span>
              </span>
              <span className="mt-2.5 pt-2 border-t border-white/15 flex items-center gap-1.5 text-[11px] sm:text-xs text-white/80">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2" />
                </svg>
                Free 1-on-1 guidance
              </span>
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
          <Step n={1} done={!!formData.destination} title="Where do you want to study?">
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {destinations.map((d) => (
                <Chip key={d} name="destination" value={d} checked={formData.destination === d} onChange={handleChange} />
              ))}
            </div>
          </Step>

          <Step n={2} done={!!formData.studyLevel} title="What do you want to study?">
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {studyLevels.map((l) => (
                <Chip key={l} name="studyLevel" value={l} checked={formData.studyLevel === l} onChange={handleChange} />
              ))}
            </div>
          </Step>

          <Step n={3} done={!!formData.intake} title="When do you plan to start?">
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
              {intakes.map((i) => (
                <Chip key={i} name="intake" value={i} checked={formData.intake === i} onChange={handleChange} />
              ))}
            </div>
          </Step>

          <Step n={4} done={phoneDone} title="How can we reach you?">
            <div className="flex items-center h-11 rounded-full border border-slate-200 bg-white transition-all focus-within:border-[#009cd9] focus-within:ring-4 focus-within:ring-[#009cd9]/10">
              {/* Country code: a native select (accessible, mobile-friendly) shown
                  as a compact flag + code */}
              <label className="relative shrink-0 flex items-center h-full pl-4 pr-2 text-sm text-slate-700 cursor-pointer">
                <span className="sr-only">Country code</span>
                <span aria-hidden="true" className="mr-1.5">{dial.flag}</span>
                <span aria-hidden="true" className="tabular-nums">{dial.code}</span>
                <svg className="ml-1 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <select
                  name="dial"
                  value={formData.dial}
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                >
                  {dialCodes.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.flag} {d.country} ({d.code})
                    </option>
                  ))}
                </select>
              </label>
              <span className="h-6 w-px bg-slate-200" aria-hidden="true" />
              <label htmlFor="consult-phone" className="sr-only">
                WhatsApp number
              </label>
              <input
                type="tel"
                id="consult-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="WhatsApp number"
                required
                pattern={formData.dial === "+91" ? "\\d{5}\\s?\\d{5}" : "[\\d\\s]{7,15}"}
                maxLength={15}
                title={formData.dial === "+91" ? "Enter your 10-digit mobile number" : "Enter your phone number"}
                autoComplete="tel-national"
                inputMode="numeric"
                className="flex-1 min-w-0 h-full pl-3 pr-4 bg-transparent text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none"
                // The pill shows the focus ring (focus-within) instead
                style={{ outline: "none" }}
              />
              <svg
                className={`w-5 h-5 mr-3.5 shrink-0 text-emerald-500 transition-all duration-300 ${phoneDone ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" />
              </svg>
            </div>
          </Step>

          <div>
            <CloudButton type="submit" size="lg" disabled={loading} icon={!loading} className="w-full">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Connecting you...
                </span>
              ) : (
                "Talk to an Advisor"
              )}
            </CloudButton>

            {/* Trust Points */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] sm:text-xs text-slate-500">
              {["Free guidance", "No service fees", "Confidential"].map((t) => (
                <span key={t} className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
