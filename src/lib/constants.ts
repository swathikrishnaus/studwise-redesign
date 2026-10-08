/* ==========================================================================
   Site-Wide Constants
   ==========================================================================
   Central place for site configuration values used across the application.
   ========================================================================== */

export const SITE_NAME = "Studwise";
export const SITE_DESCRIPTION =
  "Expert guidance for your international education journey.";
export const SITE_URL = "https://studwise.in";

/** Default metadata values used when page-specific values are not provided. */
export const DEFAULT_METADATA = {
  title: `${SITE_NAME} — Study Abroad Consultants`,
  description: SITE_DESCRIPTION,
  ogImage: "/images/og-default.jpg",
} as const;
