"use client";

import type { ReactNode } from "react";
import { openAdvisorDialog } from "@/components/shared/AdvisorDialog";

export default function ConsultationDialog({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openAdvisorDialog} aria-haspopup="dialog" className={className}>
      {children}
    </button>
  );
}
