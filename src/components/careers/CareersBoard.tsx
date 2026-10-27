"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import CloudButton from "@/components/ui/CloudButton";
import { Icon } from "@/components/shared/PageKit";
import { getLenis } from "@/components/layout/SmoothScroll";
import { openings } from "@/data/careers";
import type { Opening } from "@/data/careers";
import { headerContact } from "@/data/navigation";

const PLUS = "M12 5v14M5 12h14";
const PIN = "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z";
const CLOCK = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2";
const CHECK = "M5 13l4 4L19 7";
const CLOSE = "M6 6l12 12M18 6 6 18";
const FILE = "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M12 17v-6m-3 3 3-3 3 3";
const ARROW = "M5 12h14m-6-6 6 6-6 6";

/** Where applications are sent: a form service that accepts file uploads
    (e.g. Formspree, Getform, Web3Forms). Until one is set up, the form
    drafts an email instead and asks the applicant to attach their resume. */
const ENDPOINT = process.env.NEXT_PUBLIC_CAREERS_FORM_ENDPOINT;
const MAX_MB = 5;
const ACCEPT = ".pdf,.doc,.docx";

const formatSize = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.round(bytes / 1024)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

/** One opening: a row that expands into its details and an Apply button */
function Role({ job, open, onToggle, onApply }: { job: Opening; open: boolean; onToggle: () => void; onApply: () => void }) {
  const panel = `${job.id}-details`;
  return (
    <li className="rounded-2xl bg-white ring-1 ring-slate-900/[0.06] transition-[box-shadow] hover:ring-[#009cd9]/30">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panel}
        onClick={onToggle}
        className="group flex w-full items-center gap-4 px-5 py-5 sm:px-7 sm:py-6 text-left"
      >
        <span className="flex-1 min-w-0">
          <span className="block text-xl sm:text-2xl tracking-[-0.02em] text-slate-900 group-hover:text-[#0a7fb3]">{job.title}</span>
          <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>{job.team}</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon d={PIN} className="w-4 h-4 text-[#009cd9]" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon d={CLOCK} className="w-4 h-4 text-[#009cd9]" />
              {job.type}
            </span>
          </span>
        </span>
        <span
          className={`grid place-items-center w-10 h-10 shrink-0 rounded-full ring-1 transition-all duration-500 ${
            open ? "rotate-45 bg-[#009cd9] text-white ring-[#009cd9]" : "text-slate-500 ring-slate-200 group-hover:ring-[#009cd9] group-hover:text-[#0a7fb3]"
          }`}
          aria-hidden="true"
        >
          <Icon d={PLUS} className="w-4 h-4" />
        </span>
      </button>

      <div id={panel} role="region" aria-label={job.title} data-open={open} className="purpose-panel">
        <div className="overflow-hidden" inert={!open}>
          <div className="px-5 pb-6 sm:px-7 sm:pb-8 border-t border-slate-100 pt-6">
            <p className="body-text text-slate-700 max-w-3xl">{job.summary}</p>
            <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-10">
              {[
                { title: "What you'll do", items: job.responsibilities },
                { title: "What we're looking for", items: job.requirements },
              ].map((col) => (
                <div key={col.title}>
                  <h4 className="text-[13px] uppercase tracking-[0.16em] text-[#0a7fb3]">{col.title}</h4>
                  <ul className="mt-3 space-y-2.5">
                    {col.items.map((it) => (
                      <li key={it} className="flex gap-3 body-text text-slate-600">
                        <Icon d={CHECK} className="mt-[0.35em] w-4 h-4 shrink-0 text-emerald-600" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <CloudButton onClick={onApply} className="mt-7">
              Apply for this role
            </CloudButton>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function CareersBoard() {
  const [openId, setOpenId] = useState<string | null>(openings[0]?.id ?? null);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "drafted" | "error">("idle");
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  const apply = useCallback((title: string) => {
    setRole(title);
    setStatus("idle");
    setResume(null);
    setFileError("");
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
  }, []);
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFileError("");
    if (f && f.size > MAX_MB * 1024 * 1024) {
      setFileError(`Please choose a file under ${MAX_MB} MB.`);
      e.target.value = "";
      setResume(null);
      return;
    }
    setResume(f);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resume) {
      setFileError("Please attach your resume.");
      fileRef.current?.focus();
      return;
    }
    const data = new FormData(e.currentTarget);
    data.set("role", role);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
        setStatus(res.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = [
      `Role: ${role}`,
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      ...(get("link") ? [`Profile or portfolio: ${get("link")}`] : []),
      "",
      get("note"),
      "",
      `(My resume is attached: ${resume.name})`,
    ].join("\n");
    window.location.href = `mailto:${headerContact.email}?subject=${encodeURIComponent(`Application: ${role}`)}&body=${encodeURIComponent(body)}`;
    setStatus("drafted");
  };

  const field =
    "w-full h-12 rounded-xl bg-slate-50 px-4 text-[15px] text-slate-900 ring-1 ring-inset ring-slate-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-[#009cd9]";

  const done = status === "sent" || status === "drafted";

  return (
    <div>
      {openings.length ? (
        <ul className="space-y-3">
          {openings.map((job) => (
            <Role
              key={job.id}
              job={job}
              open={openId === job.id}
              onToggle={() => setOpenId(openId === job.id ? null : job.id)}
              onApply={() => apply(job.title)}
            />
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl bg-white px-6 py-10 text-center body-text text-slate-500 ring-1 ring-slate-900/[0.06]">
          There are no open roles right now.
        </p>
      )}

      {/* Application form */}
      <dialog
        ref={dialogRef}
        aria-labelledby={`${formId}-title`}
        data-lenis-prevent
        onClick={(e) => e.target === e.currentTarget && close()}
        className="consult-dialog fixed inset-0 m-0 w-full h-full max-w-none max-h-none overflow-y-auto overscroll-contain bg-transparent p-2.5 sm:p-6 backdrop:bg-[#0b2a45]/50 backdrop:backdrop-blur-sm"
      >
        <div className="min-h-full flex items-end sm:items-center justify-center" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 text-slate-900 shadow-[0_30px_70px_-30px_rgba(0,60,100,0.5)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#0a7fb3]">Apply</p>
                <h2 id={`${formId}-title`} className="mt-2 text-2xl sm:text-[1.75rem] leading-tight tracking-[-0.03em]">
                  {role}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="grid place-items-center w-10 h-10 shrink-0 rounded-full bg-slate-100 text-slate-600 hover:bg-[#e3f4fc] hover:text-[#0a7fb3]"
              >
                <Icon d={CLOSE} className="w-4 h-4" />
              </button>
            </div>

            {done ? (
              <div className="mt-6" role="status">
                <p className="body-text text-slate-600">
                  {status === "sent" ? (
                    "Thank you, your application has been sent. We'll be in touch."
                  ) : (
                    <>
                      Your email app has opened with your application filled in. Attach your resume ({resume?.name}) and press send. If it
                      didn&apos;t open, email{" "}
                      <a href={`mailto:${headerContact.email}`} className="text-[#0a7fb3] underline underline-offset-4">
                        {headerContact.email}
                      </a>
                      .
                    </>
                  )}
                </p>
                <CloudButton onClick={close} className="mt-6">
                  Done
                </CloudButton>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-4" encType="multipart/form-data">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-slate-600">Full name</span>
                    <input name="name" required autoComplete="name" className={field} />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm text-slate-600">Phone</span>
                    <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-slate-600">Email</span>
                  <input name="email" type="email" required autoComplete="email" className={field} />
                </label>

                {/* Resume */}
                <div>
                  <span id={`${formId}-resume`} className="mb-1.5 block text-sm text-slate-600">
                    Resume
                  </span>
                  <label
                    className={`flex items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-[#009cd9] ${
                      fileError
                        ? "border-rose-300 bg-rose-50/50"
                        : resume
                          ? "border-[#009cd9]/40 bg-[#eef7fc]"
                          : "border-slate-300 bg-slate-50 hover:border-[#009cd9]/50 hover:bg-[#f6fbfe]"
                    }`}
                  >
                    <span className="grid place-items-center w-10 h-10 shrink-0 rounded-lg bg-white text-[#009cd9] ring-1 ring-slate-900/[0.06]">
                      <Icon d={resume ? CHECK : FILE} className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] text-slate-900">{resume ? resume.name : "Attach your resume"}</span>
                      <span className="block text-[13px] text-slate-500">
                        {resume ? `${formatSize(resume.size)} · tap to change` : `PDF or Word, up to ${MAX_MB} MB`}
                      </span>
                    </span>
                    <input
                      ref={fileRef}
                      type="file"
                      name="resume"
                      accept={ACCEPT}
                      onChange={onFile}
                      aria-labelledby={`${formId}-resume`}
                      aria-invalid={Boolean(fileError)}
                      className="sr-only"
                    />
                  </label>
                  {fileError && <p className="mt-1.5 text-[13px] text-rose-600">{fileError}</p>}
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm text-slate-600">
                    LinkedIn or portfolio <span className="text-slate-400">(optional)</span>
                  </span>
                  <input name="link" type="url" placeholder="https://" className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-slate-600">
                    A few lines about you <span className="text-slate-400">(optional)</span>
                  </span>
                  <textarea name="note" rows={3} className={`${field} h-auto py-3 resize-y`} />
                </label>
                {status === "error" && (
                  <p className="text-[13px] text-rose-600">
                    Something went wrong sending your application. Please try again, or email {headerContact.email}.
                  </p>
                )}
                {/* The same send button as the consultation form: on hover a trail draws in and an arrow glides into the end circle */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-loading={status === "sending" || undefined}
                  className="fly-btn group relative isolate overflow-hidden flex items-center w-full h-13 rounded-full bg-[#009cd9] pl-6 pr-2 text-base text-white shadow-[0_14px_28px_-16px_rgba(0,120,180,0.85)] transition-colors duration-300 hover:bg-[#0b2a45] disabled:cursor-progress disabled:opacity-90 focus-visible:outline-offset-4"
                >
                  {status === "sending" ? "Sending…" : "Submit application"}
                  <span className="fly-btn__lane" aria-hidden="true">
                    <span className="fly-btn__trail" />
                    <span className="fly-btn__disc">
                      {status === "sending" && (
                        <svg className="w-4 h-4 animate-spin text-[#009cd9]" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                    </span>
                    <span className="fly-btn__icon">
                      <Icon d={ARROW} className="w-full h-full" />
                    </span>
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
