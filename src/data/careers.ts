/* ==========================================================================
   Careers (app/careers)
   ==========================================================================
   Current vacancies. Removing every opening leaves the page saying there
   are no open roles. Roles with `askExperience` add the overseas-education
   experience and current/last consultancy questions to the application.
   ========================================================================== */

export type Opening = {
  id: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship";
  summary: string;
  responsibilities: string[];
  requirements: string[];
  askExperience?: boolean;
};

/** Options for "Experience in study abroad / overseas education" */
export const experienceLevels = ["Fresher", "Below 1 year", "1 to 1.5 years", "1.5 to 3 years", "3+ years"];

export const openings: Opening[] = [
  {
    id: "student-counsellor",
    title: "Student Counsellor",
    team: "Counselling",
    location: "Valanchery and Manjeri",
    type: "Full-time",
    summary: "Guide students and their families from the first conversation to the right course, university and country.",
    responsibilities: [
      "Hold one-on-one counselling sessions with students and parents",
      "Shortlist courses and universities that match each student's profile and goals",
      "Explain entry requirements, intakes, costs and scholarship options clearly",
      "Follow up with students through their applications",
    ],
    requirements: [
      "Confident speaking with students and parents",
      "A genuine interest in international education",
      "Freshers and experienced counsellors are both welcome",
    ],
    askExperience: true,
  },
  {
    id: "team-leader",
    title: "Team Leader",
    team: "Counselling",
    location: "Valanchery and Manjeri",
    type: "Full-time",
    summary: "Lead a team of counsellors and keep every student's journey on track, from enquiry to visa.",
    responsibilities: [
      "Lead, train and support a team of student counsellors",
      "Set targets and keep track of the team's enquiries and applications",
      "Step in on complex student cases and important family conversations",
      "Work with the applications and visa team to meet every deadline",
    ],
    requirements: [
      "Experience in the study abroad / overseas education field",
      "Confident leading a team and speaking with students and parents",
      "Organised, with an eye for detail",
    ],
    askExperience: true,
  },
];

export const careerReasons = [
  {
    title: "Work that changes lives",
    text: "Help students reach 150+ universities across 14+ countries.",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z",
  },
  {
    title: "A close-knit team",
    text: "Branch heads, counsellors and coordinators working side by side since 2019.",
    icon: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1m20 0v-1a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  },
  {
    title: "Close to home",
    text: "Centres in Manjeri and Valanchery, with Calicut opening soon.",
    icon: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  },
];

export const hiringSteps = [
  { title: "Apply", text: "Send your details and CV for the role." },
  { title: "Conversation", text: "A short call to get to know you." },
  { title: "Meet the team", text: "Visit a centre and meet the people you'd work with." },
  { title: "Offer", text: "We let you know, either way." },
];

