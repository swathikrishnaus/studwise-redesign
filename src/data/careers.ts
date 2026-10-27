/* ==========================================================================
   Careers (app/careers)
   ==========================================================================
   SAMPLE CONTENT FOR CLIENT REVIEW. The openings below are placeholders
   modelled on the roles on the Team page (data/team): the client has not
   supplied real vacancies yet. Replace them, and confirm the hiring steps
   and where applications should go, before launch. Removing every opening
   leaves the page with its general-application card only.
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
};

export const openings: Opening[] = [
  {
    id: "student-counsellor",
    title: "Student Counsellor",
    team: "Counselling",
    location: "Manjeri",
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
      "Organised, with an eye for detail",
    ],
  },
  {
    id: "visa-application-executive",
    title: "Visa Application Executive",
    team: "Applications & Visas",
    location: "Manjeri",
    type: "Full-time",
    summary: "Prepare and check university and visa applications so every document is right the first time.",
    responsibilities: [
      "Prepare university and student visa applications with students",
      "Check documents carefully against each country's requirements",
      "Keep track of deadlines and application status",
      "Help students prepare for visa interviews",
    ],
    requirements: [
      "Careful and comfortable working with documents and deadlines",
      "Clear written communication",
      "Experience with university or visa applications is a plus",
    ],
  },
  {
    id: "student-coordinator",
    title: "Student Coordinator",
    team: "Student Coordination",
    location: "Valanchery",
    type: "Full-time",
    summary: "Keep each student's journey organised at our centre, from first visit to departure.",
    responsibilities: [
      "Welcome students and book counselling sessions",
      "Coordinate between students, counsellors and the application team",
      "Keep student records up to date",
      "Share pre-departure information with students",
    ],
    requirements: ["Friendly and well organised", "Comfortable with everyday office tools", "Good at keeping several tasks moving"],
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

