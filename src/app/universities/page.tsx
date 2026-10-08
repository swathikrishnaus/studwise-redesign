import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Universities",
  description:
    "Browse universities worldwide and find the right fit for your study abroad journey.",
};

export default function UniversitiesPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">Universities</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
