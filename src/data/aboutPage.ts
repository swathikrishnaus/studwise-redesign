/* ==========================================================================
   About page content
   ==========================================================================
   Copy mirrors the live studwise.in/about-us page.
   ========================================================================== */

export const aboutHero = {
  eyebrow: "Education Consulting",
  titleLead: "Where Ambitions Take Off",
  titleRest: "Your Study Abroad Journey Starts Here",
  text: "Paving the path and shredding lights along your way. We lend you the helping hands to finally realize your dream of studying abroad.",
  quote:
    "You won't be the same after escaping your comfort zone and exploring other parts of the world.",
};

export const aboutHighlights = [
  { value: "2019", label: "Founded in Manjeri" },
  { value: "5+", label: "Years of experience" },
  { value: "550+", label: "Students guided abroad" },
  { value: "150+", label: "Universities represented" },
];

/** "Who We Are" — the live page's single paragraph, split for reading */
export const whoWeAre = {
  lead: "Studwise is the best education consultancy in Malappuram founded in 2019 and headquartered in Manjeri, with its centres in Valanchery and Calicut.",
  paragraphs: [
    "With over 5+ years of experience, Studwise has guided 550+ students to study in 14+ countries, including the UK, USA, Canada, Australia, Malta, Singapore, Dubai, and Malaysia. Studwise represents 150+ universities across the globe, with 250+ postgraduate courses spanning 30+ unique research areas.",
    "We provide courses like TOEFL, IELTS, and EPT support with career counselling and proper guidance in course selection. It all involves working together closely with students. For them to comply with the cultural and analytical updates brought about by overseas education.",
    "Studwise's comprehensive support services and experienced team of experts help students find the best courses, scholarship assistance, colleges, and universities that perfectly meet their career expectations, and academic and financial background needs on a global scale. This helps them reach their study abroad dream destination.",
  ],
};

export const centres = [
  { name: "Manjeri", note: "Headquarters" },
  { name: "Valanchery", note: "Centre" },
  { name: "Calicut", note: "Centre" },
];

export const destinations = ["UK", "USA", "Canada", "Australia", "Malta", "Singapore", "Dubai", "Malaysia"];

export type Pillar = { title: string; text: string; icon: string };

export const pillars: Pillar[] = [
  {
    title: "Vision",
    text: "Studwise International is the best study abroad consultant in Kerala, Malappuram which laid the foundation for elevating overseas education through personal, professional, and academic progress. Our vision is to provide a complete solution for all your overseas education. We aim to help our students in choosing appropriate careers based on their academic qualifications.",
    icon: "M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  },
  {
    title: "Mission",
    text: "Our mission is to help students achieve their dream abroad by understanding their dreams during counseling sessions. We develop clear career options for students, ensuring they get approved into their desired university. Our career guidance is unbiased and authentic, ensuring a seamless study abroad experience from registration to departure.",
    icon: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  },
];

export const valuesText =
  "Since the very beginning, Studwise closely collaborated with several groups and renowned global organizations in various countries. Our professional team can proceed to secure admissions to excellent universities. Our Core Values represent our Consultancy.";

export const coreValues = [
  { title: "Excellence", icon: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" },
  { title: "Honesty", icon: "M9 12l2 2 4-4m5.6-4A12 12 0 0 1 12 2.9 12 12 0 0 1 3.4 6 12 12 0 0 0 3 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2-.4-3Z" },
  { title: "Dedication", icon: "M12 20.5s-8-4.6-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.1c0 5.8-8 10.4-8 10.4Z" },
  { title: "Transparency", icon: "M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
  { title: "Services", icon: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1m20 0v-1a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
  { title: "Experience", icon: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.6-1.2L7 21l5-2.5 5 2.5-1.4-7.2" },
];

export const solution = {
  title: "A Comprehensive Solution for Your Dreams",
  text: "Studwise closely collaborates with several groups and renowned global organizations in various countries. Our professional team can proceed secure admissions to excellent universities. We provide each student with a complete focus, and our deliberate strategy guarantees that students have the chance to attain their goals.",
  founder: "Mr. P S Mahmood",
  founderRole: "Founder & CEO",
  ctaHref: "https://www.instagram.com/studwise.in/",
};

export const whyChoose = {
  text: "With 5+ years of experience in our bag, Studwise represents 150+ universities across the globe. With top-notch and experienced counsellors, Studwise makes sure the journey is a hassle-free ride. Career counseling, appropriate course selection, and TOEFL, IELTS, and EPT support are the foundational events of this ride.",
  stats: [
    {
      value: "24/7",
      label: "Customer Support",
      icon: "M4 14v-2a8 8 0 1 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2v1Zm16 0a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2v1Zm-3 2v1a3 3 0 0 1-3 3h-2",
    },
    {
      value: "550+",
      label: "Students Guided",
      icon: "M9 12l2 2 4-4M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z",
    },
    {
      value: "150+",
      label: "Universities Represented Worldwide",
      icon: "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
    },
  ],
};

export const aboutCta = {
  title: "So, are you planning to go for abroad studies!",
  text: "If you've already decided on your study destination, ignore your hesitations and reach out to us.",
  moreInfoHref: "/contact",
  startHref: "https://wa.me/919113650884",
};
