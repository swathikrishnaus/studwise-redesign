/* ==========================================================================
   Student Spotlight (components/spotlight/StudentSpotlight)
   ==========================================================================
   Real photographs from public/images/students-abroad. Only the first
   names (from the photo files) are confirmed; the captions describe what
   each photo shows. Add `country`, `course` and `university` once they
   are confirmed — the section shows them automatically, and leaves them
   out until then.
   ========================================================================== */

export type SpotlightStudent = {
  name: string;
  photo: string;
  /** object-position for the crop, keeping the face in frame */
  focus: string;
  alt: string;
  caption: string;
  country?: string;
  course?: string;
  university?: string;
};

const photo = (file: string) => `/images/students-abroad/${encodeURIComponent(file)}`;

export const spotlightIntro = {
  label: "Student spotlight",
  title: "Their World.",
  accent: "Their Next Chapter.",
  text: "Real students, new experiences, and futures taking shape around the world.",
};

export const spotlightStudents: SpotlightStudent[] = [
  {
    name: "Riya",
    photo: photo("Riya 1.jpeg"),
    focus: "50% 28%",
    alt: "Riya in her graduation gown and cap, holding flowers on a sunny campus lawn",
    caption: "Sunlight, flowers and a well-earned smile. The day the hard work turns into a beginning.",
  },
  {
    name: "Shahid",
    photo: photo("Shahidd.png"),
    focus: "50% 40%",
    alt: "Shahid in his graduation gown and cap, arms wide, in a stone-paved square",
    caption: "Scroll in hand and a smile that says it was all worth it.",
  },
  {
    name: "Shameem",
    photo: photo("Shameem.jpeg"),
    focus: "50% 30%",
    alt: "Shameem in his graduation gown and cap in front of a domed building under a clear sky",
    caption: "Under a wide blue sky, one chapter closes and a brighter one begins.",
  },
];
