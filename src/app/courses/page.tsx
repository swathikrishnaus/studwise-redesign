import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Discover courses offered by top universities for international students.",
};

export default function CoursesPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">Courses</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
