import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Studwise for study abroad guidance and consultation.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">Contact</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
