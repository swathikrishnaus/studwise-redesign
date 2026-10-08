/* ==========================================================================
   Studwise — Shared Type Definitions
   ==========================================================================
   Central type definitions for data structures used across the application.
   Add domain-specific types here as the project grows.
   ========================================================================== */

/** A study destination country or region. */
export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  featured?: boolean;
}

/** A university listing. */
export interface University {
  id: string;
  name: string;
  slug: string;
  country: string;
  description: string;
  imageUrl?: string;
  website?: string;
}

/** A course or programme. */
export interface Course {
  id: string;
  name: string;
  slug: string;
  universityId: string;
  level: "undergraduate" | "postgraduate" | "doctorate" | "diploma";
  duration: string;
  description: string;
}

/** A service offered by Studwise. */
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconName?: string;
}

/** Shared metadata for SEO pages. */
export interface PageSeo {
  title: string;
  description: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/** Navigation link used in headers, footers, and menus. */
export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
