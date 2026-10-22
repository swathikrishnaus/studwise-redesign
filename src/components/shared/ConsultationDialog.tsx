"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import ConsultationCard from "@/components/hero/ConsultationCard";

/* --------------------------------------------------------------------------
   ConsultationDialog — a button that opens the consultation card in a modal
   --------------------------------------------------------------------------
   For pages that don't show the card inline. The header's "Book Free
   Advisory" links (#consultation-panel) open the dialog too, since the card
   they point at only lives in here.
   -------------------------------------------------------------------------- */
export default function ConsultationDialog({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    // Bubble phase on document: React's own handlers (e.g. closing the
    // mobile menu) have run, and Lenis' anchor scroll on window never sees it
    const onAnchor = (e: MouseEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest('a[href="#consultation-panel"]')) return;
      e.preventDefault();
      e.stopPropagation();
      open();
    };
    dialog.addEventListener("close", onClose);
    document.addEventListener("click", onAnchor);
    return () => {
      dialog.removeEventListener("close", onClose);
      document.removeEventListener("click", onAnchor);
      onClose();
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={className}>
        {children}
      </button>
      <dialog
        ref={ref}
        aria-label="Talk to a Studwise advisor"
        data-lenis-prevent
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
        className="consult-dialog fixed inset-0 m-0 w-full h-full max-w-none max-h-none overflow-y-auto overscroll-contain bg-transparent p-3 sm:p-6 text-left backdrop:bg-[#0b2a45]/50 backdrop:backdrop-blur-sm"
      >
        <div
          className="min-h-full flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) ref.current?.close();
          }}
        >
          {/* Close sits above the card on phones and beside it from sm up */}
          <div className="relative w-full max-w-[36rem]">
            <div className="flex justify-end pb-3 sm:pb-0 sm:absolute sm:top-0 sm:-right-14">
              <button
                type="button"
                onClick={() => ref.current?.close()}
                aria-label="Close"
                className="grid place-items-center w-11 h-11 rounded-full bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-white hover:text-[#0a7fb3]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="flex">
              <ConsultationCard />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
