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

/** Key figures shown beside "Book appointment" (moved from the home hero).
    Client-provided (Studwise fact sheet, October 2026): confirm before launch */
export const whyStats = [
  {
    value: "150+",
    tint: "bg-[#e3f3fc]",
    ink: "text-[#0a7fb3]",
    label: "Universities represented",
    icon: "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
  },
  {
    value: "90%",
    tint: "bg-[#e3f6ec]",
    ink: "text-[#15803d]",
    label: "Visa success rate to date",
    icon: "M9 12l2 2 4-4m5.6-4A12 12 0 0 1 12 2.9 12 12 0 0 1 3.4 6 12 12 0 0 0 3 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3Z",
  },
  {
    value: "250+",
    tint: "bg-[#fdf1df]",
    ink: "text-[#b45309]",
    label: "PG courses",
    icon: "M12 6.5C10.5 5.3 8.4 4.5 6 4.5c-1.1 0-2.1.2-3 .5v14c.9-.3 1.9-.5 3-.5 2.4 0 4.5.8 6 2m0-14c1.5-1.2 3.6-2 6-2 1.1 0 2.1.2 3 .5v14c-.9-.3-1.9-.5-3-.5-2.4 0-4.5.8-6 2m0-14v14",
  },
];
