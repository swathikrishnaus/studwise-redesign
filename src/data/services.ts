/* ==========================================================================
   Homepage — "Our Services" content
   ==========================================================================
   Copy mirrors the live studwise.in homepage.
   ========================================================================== */

export const servicesIntro =
  "As a leading study abroad education consultancy, we ensure our services cover every nook and hiccup.";

/** Card photo: public/images/services/{key}.jpg — Pexels (Pexels licence) and
    Wikimedia Commons (CC0, visa), 2000 × 1500 */
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
};

export const services: Service[] = [
  {
    slug: "university-registration",
    title: "University Registration",
    description:
      "We help you to take the best university in accordance with your academic qualification to secure your career aligned with top universities across the world.",
    art: "university",
  },
  {
    slug: "scholarship-assistance",
    title: "Scholarship Assistance",
    description:
      "Students will be given proper guidance and reliable information on the scholarships that the Universities provide.",
    art: "scholarship",
  },
  {
    slug: "visa-processing",
    title: "Visa Processing",
    description:
      "Around 1000+ students received our help with effortlessly obtaining their visas.",
    art: "visa",
  },
  {
    slug: "ielts-toefl-ept-preparation",
    title: "IELTS/TOEFL/EPT Preparation",
    description:
      "We conducts comprehensive IELTS/TOEFL/EPT classes that will boost your results on these important language tests.",
    art: "tests",
  },
  {
    slug: "pre-landing-and-post-landing-services",
    title: "Pre-Landing and Post-Landing Services",
    description:
      "Specialized services offered by us can smoothen the immigration process as simply and direct as possible.",
    art: "landing",
  },
  {
    slug: "accommodation-assistance",
    title: "Accommodation Assistance",
    description:
      "We at Studwise can assist you in locating the best and secured accommodation options under your budget.",
    art: "accommodation",
  },
];
