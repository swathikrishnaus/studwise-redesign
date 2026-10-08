import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <h1 className="text-4xl font-normal">404</h1>
      <p className="text-[var(--color-text-secondary)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block mt-4 px-6 py-2 rounded-lg bg-[var(--color-brand-primary)] text-white text-sm font-normal hover:opacity-90 transition-opacity"
      >
        Back to Home
      </Link>
    </div>
  );
}
