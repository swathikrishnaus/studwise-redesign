"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import CloudButton from "@/components/ui/CloudButton";

const destinations = [
  { label: "UK", value: "United Kingdom" },
  { label: "USA", value: "United States" },
  { label: "Canada", value: "Canada" },
  { label: "Australia", value: "Australia" },
  { label: "Germany", value: "Germany" },
  { label: "Ireland", value: "Ireland" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Europe", value: "France & Europe" },
  { label: "Asia", value: "Singapore & Asia" },
];

const studyLevels = [
  { label: "Master's", hint: "Postgraduate", value: "Master's / Postgraduate" },
  { label: "Bachelor's", hint: "Undergraduate", value: "Bachelor's / Undergraduate" },
  { label: "MBA", hint: "Business", value: "MBA" },
  { label: "PhD", hint: "Doctorate", value: "Doctorate / PhD" },
];

const initialData = { name: "", phone: "", destination: "", studyLevel: "" };

export default function ConsultationCard() {
  const [formData, setFormData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 450);
  };

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
          Thank you, <span className="font-normal text-slate-900">{formData.name}</span>. A senior
          advisor will reach out on WhatsApp within 2 hours with your{" "}
          {formData.destination} shortlist.
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
      className="relative flex-1 h-full flex flex-col overflow-hidden bg-white rounded-[2rem] shadow-[0_30px_70px_-20px_rgba(0,109,160,0.25)] ring-1 ring-slate-200/70"
    >
      {/* Header band */}
      <div className="relative px-7 sm:px-8 pt-7 pb-6 bg-gradient-to-br from-[#009cd9] via-[#0089c2] to-[#006da0] text-white overflow-hidden">
        <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-white/15 blur-2xl pointer-events-none" aria-hidden="true" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-normal tracking-wider uppercase text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              Free 1-on-1 advisory
            </span>
            <h2 className="mt-2 text-2xl sm:text-[1.65rem] font-normal tracking-tight leading-tight">
              Find your best-fit university
            </h2>
            <p className="mt-1.5 text-white/75 text-xs sm:text-sm leading-relaxed">
              Shortlists, fees and scholarships matched to your profile.
            </p>
          </div>
          <div className="shrink-0 hidden sm:flex w-11 h-11 rounded-2xl bg-white/15 ring-1 ring-white/25 items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Form */}
      {/* Fills the card's height; spare space spreads evenly between steps */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-5 px-7 sm:px-8 pt-6 pb-7">
        {/* Destination chips */}
        <fieldset>
          <legend className="flex items-center gap-2 text-xs font-normal text-slate-800 mb-2.5">
            <span className="w-5 h-5 rounded-full bg-sky-50 text-[#009cd9] text-[10px] font-normal flex items-center justify-center">1</span>
            Where do you want to study?
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {destinations.map((d) => (
              <label key={d.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="destination"
                  value={d.value}
                  checked={formData.destination === d.value}
                  onChange={handleChange}
                  required
                  className="peer sr-only"
                />
                <span className="inline-flex items-center h-8 px-3.5 rounded-full border border-slate-200 bg-white text-xs font-normal text-slate-600 transition-all hover:border-[#009cd9]/50 hover:text-slate-900 peer-checked:border-[#009cd9] peer-checked:bg-[#009cd9] peer-checked:text-white peer-checked:shadow-md peer-checked:shadow-[#009cd9]/25 peer-focus-visible:ring-4 peer-focus-visible:ring-[#009cd9]/20">
                  {d.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Degree level tiles */}
        <fieldset>
          <legend className="flex items-center gap-2 text-xs font-normal text-slate-800 mb-2.5">
            <span className="w-5 h-5 rounded-full bg-sky-50 text-[#009cd9] text-[10px] font-normal flex items-center justify-center">2</span>
            What do you want to study?
          </legend>
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-slate-100/80">
            {studyLevels.map((l) => (
              <label key={l.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="studyLevel"
                  value={l.value}
                  checked={formData.studyLevel === l.value}
                  onChange={handleChange}
                  required
                  className="peer sr-only"
                />
                <span className="flex flex-col items-center justify-center h-12 rounded-xl text-center transition-all text-slate-600 hover:text-slate-900 peer-checked:bg-white peer-checked:text-[#007ab0] peer-checked:shadow-sm peer-checked:ring-1 peer-checked:ring-slate-200 peer-focus-visible:ring-4 peer-focus-visible:ring-[#009cd9]/20">
                  <span className="text-xs sm:text-[13px] font-normal leading-none">{l.label}</span>
                  <span className="mt-1 text-[9px] sm:text-[10px] text-slate-400 leading-none">{l.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Contact details */}
        <fieldset>
          <legend className="flex items-center gap-2 text-xs font-normal text-slate-800 mb-2.5">
            <span className="w-5 h-5 rounded-full bg-sky-50 text-[#009cd9] text-[10px] font-normal flex items-center justify-center">3</span>
            How can we reach you?
          </legend>
          <div className="rounded-2xl border border-slate-200 divide-y divide-slate-200 overflow-hidden focus-within:border-[#009cd9] focus-within:ring-4 focus-within:ring-[#009cd9]/10 transition-all">
            <div className="relative">
              <input
                type="text"
                id="consult-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                required
                autoComplete="name"
                className="peer w-full h-14 px-4 pt-5 bg-white text-slate-900 text-sm focus:outline-none focus:bg-sky-50/40 transition-colors"
              />
              <label
                htmlFor="consult-name"
                className="absolute left-4 top-2 text-[10px] font-normal uppercase tracking-wide text-slate-400 transition-all pointer-events-none peer-placeholder-shown:top-[1.1rem] peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-normal peer-focus:uppercase peer-focus:tracking-wide peer-focus:text-[#009cd9]"
              >
                Full name
              </label>
            </div>
            <div className="relative flex">
              <span className="inline-flex items-center pl-4 pr-3 text-sm font-normal text-slate-600 bg-white select-none">
                🇮🇳 +91
              </span>
              <span className="my-3 w-px bg-slate-200" aria-hidden="true" />
              <div className="relative flex-1">
                <input
                  type="tel"
                  id="consult-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  autoComplete="tel-national"
                  inputMode="tel"
                  className="peer w-full h-14 px-3.5 pt-5 bg-white text-slate-900 text-sm focus:outline-none focus:bg-sky-50/40 transition-colors"
                />
                <label
                  htmlFor="consult-phone"
                  className="absolute left-3.5 top-2 text-[10px] font-normal uppercase tracking-wide text-slate-400 transition-all pointer-events-none peer-placeholder-shown:top-[1.1rem] peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-normal peer-focus:uppercase peer-focus:tracking-wide peer-focus:text-[#009cd9]"
                >
                  WhatsApp number
                </label>
              </div>
            </div>
          </div>
        </fieldset>

        {/* CTA Button */}
        <CloudButton type="submit" size="lg" disabled={loading} icon={!loading} className="w-full">
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Preparing shortlist...
            </span>
          ) : (
            "Get my free shortlist"
          )}
        </CloudButton>

        {/* Trust Points */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 font-normal">
          {["100% free", "Zero service fees", "Confidential"].map((t) => (
            <span key={t} className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}
