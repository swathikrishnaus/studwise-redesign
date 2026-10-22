/* ==========================================================================
   Homepage — "Our Services" content
   ==========================================================================
   Copy mirrors the live studwise.in homepage.
   ========================================================================== */

export const servicesIntro =
  "As a leading study abroad education consultancy, we ensure our services cover every nook and hiccup.";

/** Card photos (`photo`): Pexels (Pexels licence) and Wikimedia Commons (CC0, visa) */
export type ServiceArtKey =
  | "university"
  | "scholarship"
  | "visa"
  | "tests"
  | "landing"
  | "accommodation";

export type Service = {
  slug: string;
  title: string;
  description: string;
  art: ServiceArtKey;
  /** Card photo in public/images/services (2000 × 1500) */
  photo: string;
  /** The service's detail page */
  href: string;
};

export const services: Service[] = [
  {
    slug: "university-registration",
    href: "/services/university-registration",
    title: "University Registration",
    description:
      "We help you to take the best university in accordance with your academic qualification to secure your career aligned with top universities across the world.",
    art: "university",
    photo: "/images/services/university-hd.jpg",
  },
  {
    slug: "scholarship-assistance",
    href: "/services/scholarship-assistance",
    title: "Scholarship Assistance",
    description:
      "Students will be given proper guidance and reliable information on the scholarships that the Universities provide.",
    art: "scholarship",
    photo: "/images/services/sholorship-img.jpg",
  },
  {
    slug: "visa-processing",
    href: "/services/visa-assistance",
    title: "Visa Processing",
    description:
      "Around 1000+ students received our help with effortlessly obtaining their visas.",
    art: "visa",
    photo: "/images/services/visa-hd.jpg",
  },
  {
    slug: "ielts-toefl-ept-preparation",
    href: "/services/ielts-toefl-ept",
    title: "IELTS/TOEFL/EPT Preparation",
    description:
      "We conducts comprehensive IELTS/TOEFL/EPT classes that will boost your results on these important language tests.",
    art: "tests",
    photo: "/images/services/tests-study.jpg",
  },
  {
    slug: "pre-landing-and-post-landing-services",
    href: "/services/pre-landing-services",
    title: "Pre-Landing and Post-Landing Services",
    description:
      "Specialized services offered by us can smoothen the immigration process as simply and direct as possible.",
    art: "landing",
    photo: "/images/services/landing-hd.jpg",
  },
  {
    slug: "accommodation-assistance",
    href: "/services/accommodation-assistance",
    title: "Accommodation Assistance",
    description:
      "We at Studwise can assist you in locating the best and secured accommodation options under your budget.",
    art: "accommodation",
    photo: "/images/services/accommodation-hd.jpg",
  },
];
