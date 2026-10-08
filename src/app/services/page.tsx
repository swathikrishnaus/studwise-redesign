import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore the services Studwise offers to support your study abroad journey.",
};

export default function ServicesPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">Services</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
