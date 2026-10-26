"use client";

import { useCallback, useEffect, useRef } from "react";
import AdvisorForm from "@/components/shared/AdvisorForm";
import { getLenis } from "@/components/layout/SmoothScroll";

const OPEN_EVENT = "studwise:advisor-open";

/** Opens the site-wide advisor popup (mounted once in the root layout) */
export function openAdvisorDialog() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/* --------------------------------------------------------------------------
   AdvisorDialog — the consultation form as a popup, mounted once in the
   root layout. It opens from openAdvisorDialog() (the phone tab bar's
   Advisory button, the service pages' buttons) and from any "Book Free
   Advisory" link (#consultation-panel) on a page without an inline form.
   The form inside is the stepped, compact layout, so the popup always
   fits the screen: a sheet at the foot of the screen on phones, centred
   from sm up. Escape, the close button or a click outside closes it.
   -------------------------------------------------------------------------- */
export default function AdvisorDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
  }, []);
  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
    // Bubble phase on document: React's own handlers (e.g. closing the
    // mobile menu) have run, and Lenis' anchor scroll on window never sees it
    const onAnchor = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest('a[href="#consultation-panel"]') : null;
      if (!link || document.getElementById("consultation-panel")) return;
      e.preventDefault();
      e.stopPropagation();
      open();
    };
    dialog.addEventListener("close", onClose);
    document.addEventListener("click", onAnchor);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      dialog.removeEventListener("close", onClose);
      document.removeEventListener("click", onAnchor);
      window.removeEventListener(OPEN_EVENT, open);
      onClose();
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label="Talk to a Studwise advisor"
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="consult-dialog fixed inset-0 m-0 w-full h-full max-w-none max-h-none overflow-y-auto overscroll-contain bg-transparent p-2.5 sm:p-6 text-left backdrop:bg-[#0b2a45]/50 backdrop:backdrop-blur-sm"
    >
      <div
        className="min-h-full flex items-end sm:items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="flex w-full max-w-[30rem] max-h-[calc(100dvh-1.25rem)] sm:max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-[2rem]">
          <AdvisorForm id="advisor-dialog-form" dialog onClose={close} />
        </div>
      </div>
    </dialog>
  );
}
