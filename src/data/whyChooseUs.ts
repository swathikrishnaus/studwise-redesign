/* ==========================================================================
   Homepage — "Why Choose Us" content
   ==========================================================================
   Copy mirrors the live studwise.in homepage. The paragraph is split into
   segments so the services it names can be highlighted.
   ========================================================================== */

export type WhySegment = { text: string; highlight?: boolean };

export const whySegments: WhySegment[] = [
  {
    text: "Studwise International is one of the leading overseas educational consultants in Kerala that aims to provide each student with a full range of services like",
  },
  { text: "TOEFL, IELTS, and EPT support", highlight: true },
  { text: "other than" },
  { text: "career counseling sessions", highlight: true },
  { text: "and" },
  { text: "course selection", highlight: true },
  { text: "and" },
  { text: "choosing the best university", highlight: true },
  { text: "for students," },
  { text: "facilitating student loans,", highlight: true },
  { text: "and" },
  { text: "successfully processing visas.", highlight: true },
];

export const bookAppointmentHref = "https://wa.me/919113650884";
