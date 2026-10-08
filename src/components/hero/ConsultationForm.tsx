"use client";

import { useState } from "react";
import type { FormEvent } from "react";

/* --------------------------------------------------------------------------
   Form option data
   -------------------------------------------------------------------------- */
const destinations = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "Ireland",
  "New Zealand",
  "France",
  "Singapore",
  "Dubai",
];

const studyLevels = [
  "Undergraduate",
  "Postgraduate",
  "Doctorate / PhD",
  "Foundation / Diploma",
  "English Language Course",
];

const intakes = [
  "January 2026",
  "May 2026",
  "September 2026",
  "January 2027",
  "May 2027",
  "September 2027",
];

/* --------------------------------------------------------------------------
   ConsultationForm
   -------------------------------------------------------------------------- */
export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    destination: "",
    studyLevel: "",
    intake: "",
    contact: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only for now — backend integration will be added later
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="hero-form-panel p-6 sm:p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-lg font-normal text-white mb-2">Thank You</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          We&apos;ve received your details. An advisor will reach out to you
          shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="hero-form-panel hero-form p-6 sm:p-8">
      {/* Panel header */}
      <div className="mb-6">
        <h2 className="text-lg font-normal text-white tracking-wide uppercase">
          Start Your Journey
        </h2>
        <p className="mt-2 text-sm text-white/70 leading-relaxed">
          Tell us a little about your plans and we&apos;ll help you take the
          next step.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination */}
        <div>
          <label
            htmlFor="hero-destination"
            className="block text-xs font-normal text-white/80 mb-1.5 uppercase tracking-wide"
          >
            I want to study in
          </label>
          <select
            id="hero-destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select destination
            </option>
            {destinations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Study level */}
        <div>
          <label
            htmlFor="hero-study-level"
            className="block text-xs font-normal text-white/80 mb-1.5 uppercase tracking-wide"
          >
            I want to study
          </label>
          <select
            id="hero-study-level"
            name="studyLevel"
            value={formData.studyLevel}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select study level
            </option>
            {studyLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Intake */}
        <div>
          <label
            htmlFor="hero-intake"
            className="block text-xs font-normal text-white/80 mb-1.5 uppercase tracking-wide"
          >
            When are you planning to study?
          </label>
          <select
            id="hero-intake"
            name="intake"
            value={formData.intake}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select intake / year
            </option>
            {intakes.map((intake) => (
              <option key={intake} value={intake}>
                {intake}
              </option>
            ))}
          </select>
        </div>

        {/* Contact */}
        <div>
          <label
            htmlFor="hero-contact"
            className="block text-xs font-normal text-white/80 mb-1.5 uppercase tracking-wide"
          >
            Your email or phone
          </label>
          <input
            type="text"
            id="hero-contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter your email or phone number"
            required
            autoComplete="email"
          />
        </div>

        {/* CTA */}
        <button type="submit" className="hero-form__cta mt-2">
          Talk to an Advisor
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
    </div>
  );
}
