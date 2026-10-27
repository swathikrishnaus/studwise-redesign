import type { NavLink } from "@/types";

/* ==========================================================================
   Navigation Data
   ==========================================================================
   Mirrors the menu on the live studwise.in: Home, Services (nine
   services), About Us, Testimonials, Blogs and a Contact Us action, with
   the header phone numbers and email. Services and About Us open mega
   menus; the rest are plain links.
   ========================================================================== */

export type MegaItem = {
  label: string;
  href: string;
  description: string;
  /** SVG path (24 × 24, stroked) */
  icon: string;
  /** Shown as a large card in the mega menu's left column */
  featured?: boolean;
  /** A small tag after the label */
  badge?: string;
  /** Listed in the footer's About column but left out of the About mega menu */
  footerOnly?: boolean;
};

export type MegaGroup = { title: string; items: MegaItem[] };

const ICONS = {
  chat: "M8 9h8M8 13h5m-9 8 3.5-3H19a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v15Z",
  headset: "M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2v1Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2v1Zm-3 2v1a3 3 0 0 1-3 3h-2",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z",
  cap: "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.6-1.2L7 21l5-2.5 5 2.5-1.4-7.2",
  book: "M12 6.5C10.5 5.3 8.4 4.5 6 4.5c-1.1 0-2.1.2-3 .5v14c.9-.3 1.9-.5 3-.5 2.4 0 4.5.8 6 2m0-14c1.5-1.2 3.6-2 6-2 1.1 0 2.1.2 3 .5v14c-.9-.3-1.9-.5-3-.5-2.4 0-4.5.8-6 2m0-14v14",
  passport: "M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-3 3.5h6",
  plane: "M21.5 15.6v-1.8l-8-5V3.3a1.5 1.5 0 0 0-3 0v5.5l-8 5v1.8l8-2.5v5.5l-2 1.5V22l3.5-1 3.5 1v-1.4l-2-1.5v-5.5l8 2.5Z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  briefcase: "M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-11 0h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm-1 6h18",
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z",
  users: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1m20 0v-1a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  building: "M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16m0-11h4a1 1 0 0 1 1 1v10M2 21h20M8 8h3m-3 4h3m-3 4h3",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z",
  person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8.5a7 7 0 0 1 14 0",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z",
};

/** The nine services on studwise.in, grouped by stage of the journey */
export const serviceMenu: MegaGroup[] = [
  {
    title: "Plan & apply",
    items: [
      { label: "Career Counselling", href: "/services/career-counselling", description: "Find the course and career path that fits you", icon: ICONS.compass },
      { label: "University Registration", href: "/services/university-registration", description: "Shortlists and applications to the right universities", icon: ICONS.cap },
      { label: "Scholarship Assistance", href: "/services/scholarship-assistance", description: "Guidance on scholarships universities offer", icon: ICONS.award },
    ],
  },
  {
    title: "Prepare & travel",
    items: [
      { label: "IELTS / TOEFL / EPT Tests", href: "/services/ielts-toefl-ept", description: "Coaching to boost your language test scores", icon: ICONS.book },
      { label: "Visa Assistance", href: "/services/visa-assistance", description: "Visa processing and document support", icon: ICONS.passport },
      { label: "Pre-Landing Services", href: "/services/pre-landing-services", description: "Everything sorted before you fly", icon: ICONS.plane },
    ],
  },
  {
    title: "Settle in abroad",
    items: [
      { label: "Post-Landing Services", href: "/services/post-landing-services", description: "Help on arrival in your new country", icon: ICONS.pin },
      { label: "Accommodation Assistance", href: "/services/accommodation-assistance", description: "Housing within your budget, and part-time work guidance", icon: ICONS.home },
    ],
  },
];

/** The About page's banner first, then each section of the page in order (ids set in
    components/about-page; #our-vision and #our-values open those tabs of
    the Purpose section) */
export const aboutMenu: MegaItem[] = [
  { label: "About Studwise", href: "/about", description: "Start from the top of our story", icon: ICONS.globe, featured: true },
  { label: "Who we are", href: "/about#who-we-are", description: "Headquartered in Manjeri, Malappuram", icon: ICONS.users, featured: true, badge: "Since 2019" },
  { label: "Vision & mission", href: "/about#our-vision", description: "What drives us, every step of the way", icon: ICONS.compass, featured: true },
  { label: "Core values", href: "/about#our-values", description: "Excellence, honesty, dedication and transparency", icon: ICONS.star, footerOnly: true },
  { label: "Our approach", href: "/about#our-approach", description: "Led by founder & CEO Mr. P S Mahmood", icon: ICONS.award },
  { label: "Our team", href: "/about#our-team", description: "The people who guide every student", icon: ICONS.person, featured: true },
  { label: "Why choose us", href: "/about#why-choose-us", description: "7+ years, 150+ universities, 24/7 support", icon: ICONS.cap },
  { label: "Our centres", href: "/about#our-centres", description: "Manjeri, Valanchery and Calicut", icon: ICONS.building, footerOnly: true },
];

/** Beside the About sections in the mega menu: where to see and meet Studwise next */
export const aboutMenuExtras: MegaItem[] = [
  { label: "Student stories", href: "/testimonials", description: "In the words of students we have guided", icon: ICONS.chat },
  { label: "Talk to us", href: "/contact", description: "Call, WhatsApp or visit an advisor", icon: ICONS.headset },
];

export type MainNavItem = NavLink & { mega?: "services" | "about" };

/** The header's links; Contact is its own button beside them (the logo links home) */
export const mainNavLinks: MainNavItem[] = [
  { label: "About Us", href: "/about", mega: "about" },
  { label: "Services", href: "/services", mega: "services" },
  { label: "Our Team", href: "/team" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

/** The phone tab bar's links (components/navigation/MobileTabBar); the
    hamburger menu leaves these out so the two never repeat each other */
export const mobileTabLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Header contact details, as on studwise.in */
export const headerContact = {
  phones: ["+91 91136 50884", "+91 75106 50884"],
  email: "istudwise@gmail.com",
};

export const footerNavLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blogs", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

/** Social profiles linked from studwise.in (Instagram and WhatsApp) */
export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/studwise.in/",
    /** Brand fill behind the white glyph */
    brand: "bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)]",
    icon: "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919113650884",
    brand: "bg-[#25d366]",
    icon: "M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z",
  },
];
