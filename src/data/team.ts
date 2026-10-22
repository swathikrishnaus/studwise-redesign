/* ==========================================================================
   Our Team
   ==========================================================================
   Names, roles and groups as listed on the live studwise.in/testimonials
   page (checked October 2026). Photos are the originals from that page.
   ========================================================================== */

export type TeamMember = { name: string; role: string; photo: string };
export type TeamGroup = { id: string; title: string; members: TeamMember[] };

const photo = (file: string) => `/images/team/${file}.webp`;

export const teamGroups: TeamGroup[] = [
  {
    id: "branch-heads",
    title: "Branch Heads",
    members: [
      { name: "Shana Jasmin", role: "Branch Head, Valanchery", photo: photo("shana") },
      { name: "Mahroof", role: "Branch Head, Manjeri", photo: photo("mahroof") },
    ],
  },
  {
    id: "application-team",
    title: "Application Team",
    members: [
      { name: "Aswathy", role: "Visa Application Head", photo: photo("aswathy") },
      { name: "Hashim", role: "Head of Partnership", photo: photo("hashim") },
    ],
  },
  {
    id: "student-counsellors",
    title: "Student Counsellors",
    members: ["Lubaba", "Sandra", "Badriya", "Aparna", "Jimsy", "Adharsha"].map((name) => ({
      name,
      role: "Student Counsellor",
      photo: photo(name.toLowerCase()),
    })),
  },
  {
    id: "student-coordinators",
    title: "Student Coordinators",
    members: [
      { name: "Faseela", role: "Student Coordinator, Valanchery", photo: photo("faseela") },
      { name: "Jalva", role: "Student Coordinator, Manjeri", photo: photo("jalva") },
    ],
  },
];

export const teamSize = teamGroups.reduce((n, g) => n + g.members.length, 0);
