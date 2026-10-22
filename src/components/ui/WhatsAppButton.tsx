import type { ReactNode } from "react";
import { bookAppointmentHref } from "@/data/whyChooseUs";

const WHATSAPP =
  "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z";

/** WhatsApp's own button style: brand green with the WhatsApp logo */
export default function WhatsAppButton({
  children = "Chat on WhatsApp",
  href = bookAppointmentHref,
  size = "lg",
  className = "",
}: {
  children?: ReactNode;
  href?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full text-center leading-snug bg-[#25D366] font-medium text-white shadow-[0_12px_28px_-14px_rgba(18,140,126,0.9)] transition-colors hover:bg-[#1EBE5A] focus-visible:outline-offset-4 ${
        size === "lg" ? "min-h-14 py-3 px-7 text-base" : "min-h-12 py-2.5 px-6 text-[15px]"
      } ${className}`}
    >
      <svg className={`shrink-0 ${size === "lg" ? "w-6 h-6" : "w-5 h-5"}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d={WHATSAPP} />
      </svg>
      {children}
    </a>
  );
}
