"use client";

import type { ReactNode } from "react";
import { openAdvisorDialog } from "@/components/shared/AdvisorDialog";

/* --------------------------------------------------------------------------
   ConsultationDialog — a button that opens the site-wide advisor popup
   (components/shared/AdvisorDialog), for pages that don't show the
   consultation form inline.
   -------------------------------------------------------------------------- */
export default function ConsultationDialog({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openAdvisorDialog} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
