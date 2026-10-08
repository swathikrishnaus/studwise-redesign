import type { NavLink } from "@/types";

/* ==========================================================================
   Navigation Data
   ==========================================================================
   Centralised navigation links used across the site.
   Update this file to add, remove, or reorder navigation items.
   ========================================================================== */

export const mainNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Study Destinations", href: "/study-destinations" },
  { label: "Universities", href: "/universities" },
  { label: "Courses", href: "/courses" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const footerNavLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Study Destinations", href: "/study-destinations" },
  { label: "Universities", href: "/universities" },
  { label: "Courses", href: "/courses" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];
