import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Guides and news for students planning to study abroad.",
};

export default function BlogsPage() {
  return (
    <div className="container-page py-16">
      <h1 className="text-2xl font-normal">Blogs</h1>
      <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
        Page under construction.
      </p>
    </div>
  );
}
