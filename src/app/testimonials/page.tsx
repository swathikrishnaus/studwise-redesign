import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What students say about studying abroad with Studwise.",
};

export default function TestimonialsPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">Testimonials</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
