import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Studwise and our mission to help students study abroad.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">About</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
