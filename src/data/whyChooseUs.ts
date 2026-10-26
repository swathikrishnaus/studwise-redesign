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

/** Key figures shown beside "Book appointment" (moved from the home hero) */
export const whyStats = [
  {
    value: "500+",
    tint: "bg-[#e3f3fc]",
    ink: "text-[#0a7fb3]",
    label: "Partner universities",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
  },
  {
    value: "99.2%",
    tint: "bg-[#e3f6ec]",
    ink: "text-[#15803d]",
    label: "Visa success rate",
    icon: "M9 12l2 2 4-4m5.6-4A12 12 0 0 1 12 2.9 12 12 0 0 1 3.4 6 12 12 0 0 0 3 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3Z",
  },
  {
    value: "₹45 Cr+",
    tint: "bg-[#fdf1df]",
    ink: "text-[#b45309]",
    label: "Scholarships won",
    icon: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.6-1.2L7 21l5-2.5 5 2.5-1.4-7.2M12 6.5l1 2 2.2.3-1.6 1.5.4 2.2-2-1-2 1 .4-2.2-1.6-1.5 2.2-.3 1-2Z",
  },
];
