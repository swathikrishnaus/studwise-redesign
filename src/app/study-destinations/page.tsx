import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Destinations",
  description:
    "Explore popular study destinations around the world with Studwise.",
};

export default function StudyDestinationsPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">Study Destinations</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
