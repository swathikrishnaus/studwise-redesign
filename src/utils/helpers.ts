/* ==========================================================================
   Utility Functions
   ==========================================================================
   Small, reusable helper functions.
   ========================================================================== */

/**
 * Conditionally join class names, filtering out falsy values.
 *
 * @example
 * cn("base", isActive && "active", className)
 */
export function cn(...inputs: (string | false | null | undefined)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format a date string into a human-readable format.
 */
export function formatDate(
  date: string | Date,
  locale: string = "en-IN"
): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Generate a URL-safe slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
