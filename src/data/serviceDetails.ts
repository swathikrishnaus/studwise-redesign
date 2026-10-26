/* ==========================================================================
   Service detail pages
   ==========================================================================
   Built from the live studwise.in service pages: every sentence of each
   page's copy is kept as written, regrouped into the sections of the detail
   template (app/services/[slug]). Section headings, card titles and step
   titles are the template's own labels.
   ========================================================================== */

export type ServiceDetail = {
  slug: string;
  /** Path of the page on the old WordPress site, redirected here */
  legacyPath: string;
  title: string;
  metaDescription: string;
  /** Headline: `heading` in navy, `accent` in brand blue */
  hero: { heading: string; accent: string; lead: string; image: string; alt: string; focus: string };
  /** Opening statement, its second half in brand blue, then supporting copy */
  overview: { heading: string; accent: string; paragraphs: string[] };
  /** Key figures shown under the overview (client-provided: confirm before launch) */
  figures?: { value: string; label: string; icon: string }[];
  /** Fields of study shown under the overview, as an illustrative (not complete) list */
  fields?: { heading: string; items: string[]; note: string };
  benefits: { heading: string; text: string; items: { title: string; text: string; icon: string }[] };
  quote: string;
  process: {
    heading: string;
    paragraphs: string[];
    steps: { title: string; text: string }[];
  };
  /** Slugs of the services featured under "Explore Other Services"; the first is the live page's related post */
  related: string[];
  /** Closing call to action, over a photo */
  cta: { heading: string; text: string; button: string; image: string; focus: string };
};

const ICON = {
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z",
  passport: "M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm6 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-3 3.5h6",
  person: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8.5a7 7 0 0 1 14 0",
  cap: "M12 14l9-5-9-5-9 5 9 5zm0 0v6m-6.5-9.4V16c0 1.1 2.9 3 6.5 3s6.5-1.9 6.5-3v-5.4",
  users: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1m20 0v-1a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  doc: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13l2 2 4-4",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 3-4.3-4.3M8.5 11l1.8 1.8 3.2-3.3",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm-6-3a6 6 0 0 0 12 0m-6 6v3",
  book: "M12 6.5C10.5 5.3 8.4 4.5 6 4.5c-1.1 0-2.1.2-3 .5v14c.9-.3 1.9-.5 3-.5 2.4 0 4.5.8 6 2m0-14c1.5-1.2 3.6-2 6-2 1.1 0 2.1.2 3 .5v14c-.9-.3-1.9-.5-3-.5-2.4 0-4.5.8-6 2m0-14v14",
  plane: "M21.5 15.6v-1.8l-8-5V3.3a1.5 1.5 0 0 0-3 0v5.5l-8 5v1.8l8-2.5v5.5l-2 1.5V22l3.5-1 3.5 1v-1.4l-2-1.5v-5.5l8 2.5Z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5Z",
  wallet: "M4 7h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v3m-1 6h.01",
  bank: "M3 10h18L12 4 3 10Zm2 0v8m4.7-8v8m4.6-8v8M19 10v8M3 20h18",
  briefcase: "M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1m-11 0h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm-1 6h18",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.6-1.2L7 21l5-2.5 5 2.5-1.4-7.2",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18M6 18l2.5-2.5m7-7L18 6",
};

/** The closing call to action, shared by every service page */
const CTA = {
  heading: "Not Sure Where to Begin?",
  text: "Get guidance on your study-abroad options and take the next step towards your academic goals.",
  button: "Book Free Counselling",
  image: "/images/services/service-hero.jpg",
  focus: "50% 25%",
};

export const serviceDetails: ServiceDetail[] = [
  /* ---------------------------------------------------------------- 01 */
  {
    slug: "career-counselling",
    legacyPath: "/study-abroad-career-counselling",
    title: "Career Counselling",
    metaDescription:
      "Free study abroad career counselling from Studwise: find the right course, university and destination with guidance tailored to your academic and career goals.",
    hero: {
      heading: "Career Counselling",
      accent: "for Your Study Abroad Journey",
      lead: "Find the right course, university, and destination with personalised guidance tailored to your academic background, interests, and future goals.",
      image: "/images/services/Career_Counselling.jpg",
      alt: "Two students with a tablet and notebook at a table in front of library bookshelves",
      focus: "50% 40%",
    },
    overview: {
      heading: "Studying abroad is not just about gaining academic knowledge;",
      accent: "it’s also about immersing yourself in a new culture.",
      paragraphs: [
        "By exploring different cultures, you’ll develop a global mindset and enhance your cultural understanding, which is highly valued by employers in today’s interconnected world. One of the most significant benefits of studying abroad is the opportunity to build a global network.",
        "Let’s explore how free study abroad career counseling can unlock your global potential and open doors to a world of opportunities.",
      ],
    },
    figures: [
      { value: "250+", label: "PG courses", icon: ICON.cap },
      { value: "30+", label: "Unique research areas", icon: ICON.search },
    ],
    fields: {
      heading: "Fields our students have explored",
      items: [
        "MBA & Business",
        "Accounting & Finance",
        "Marketing",
        "Human Resource Management",
        "Project Management",
        "Health-related fields",
        "Journalism",
        "Photography",
        "Sports",
      ],
      note: "A few of the fields students have chosen with us. Course availability depends on the university and your profile.",
    },
    benefits: {
      heading: "Make Informed Decisions About Your Future",
      text: "With expert guidance and personalized support, you can make informed decisions that align with your goals, ensuring a successful and rewarding international experience.",
      items: [
        {
          title: "The right destination",
          text: "Free study abroad career counselling can help you choose a destination that aligns with your interests and offers a rich cultural experience.",
          icon: ICON.globe,
        },
        {
          title: "Avoid common pitfalls",
          text: "By leveraging our expertise, you can make informed decisions and avoid common pitfalls.",
          icon: ICON.person,
        },
        {
          title: "Visa, scholarships and settling in",
          text: "We can also guide you through the visa application process, scholarship opportunities, and cultural adaptation.",
          icon: ICON.passport,
        },
      ],
    },
    quote:
      "We help to choose the appropriate career that is crucial since it shapes one’s entire life and defines them as an individual, their way of life, and the people they reach out to.",
    process: {
      heading: "How counselling works",
      paragraphs: [
        "With 5+ years of experience in counseling, Studwise International is the best study-abroad consultant in Kerala, Malappuram, and can guide you toward a brilliant future overseas.",
        "Experts at Studwise have in-depth knowledge of different study destinations, universities, and courses and can offer valuable insights and recommendations tailored to your specific academic and career goals.",
      ],
      steps: [
        { title: "Understand your goals", text: "We assist you in identifying your educational objectives and professional ambitions." },
        {
          title: "Explore your options",
          text: "A study abroad career counselor can help you identify the right destination, select suitable courses, and understand the job market in different countries.",
        },
        {
          title: "Plan your next steps",
          text: "Studwise has experienced and professional counselors who also arm you with the knowledge and abilities you will need to make future career and life choices.",
        },
      ],
    },
    related: ["university-registration", "scholarship-assistance", "visa-assistance"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 02 */
  {
    slug: "university-registration",
    legacyPath: "/university-registration",
    title: "University Registration",
    metaDescription:
      "Our step-by-step guide to university registration for study abroad programs is here to help you navigate the process with ease, with admission support to 150+ universities and colleges.",
    hero: {
      heading: "University",
      accent: "Registration",
      lead: "Our step-by-step guide to university registration for study abroad programs is here to help you navigate the process with ease.",
      image: "/images/services/University.jpg",
      alt: "A historic university tower against a clear blue sky",
      focus: "50% 55%",
    },
    overview: {
      heading: "Are you dreaming of",
      accent: "studying abroad?",
      paragraphs: [
        "From choosing the perfect destination to ensuring a seamless application, we’ve got you covered. Discover the ins and outs of studying abroad, from researching universities and programs to understanding visa requirements and financial considerations.",
        "With our comprehensive guide, you’ll gain the confidence and knowledge to embark on this life-changing experience. So, grab your passport and get ready to make unforgettable memories as we guide you toward your dream study abroad program.",
      ],
    },
    figures: [
      { value: "150+", label: "Universities represented", icon: ICON.cap },
      { value: "14+", label: "Countries", icon: ICON.globe },
    ],
    benefits: {
      heading: "A Smooth and Successful Registration",
      text: "From choosing the right program to understanding the registration requirements and submitting your application, our guide will cover all the essential aspects of studying abroad.",
      items: [
        {
          title: "150+ universities and colleges",
          text: "We can smoothly assist your admission to more than 150+ universities and colleges, across the world based on your ability and preferences.",
          icon: ICON.cap,
        },
        {
          title: "Trusted relationships",
          text: "Thanks to our excellent relationships with reputable overseas program providers, associates, and support officers.",
          icon: ICON.users,
        },
        {
          title: "Error-free applications",
          text: "With a high success rate and error-free applications, Studwise guarantees trouble-free admission procedures to its students.",
          icon: ICON.doc,
        },
      ],
    },
    quote:
      "We help you to take the best university in accordance with your academic qualification to secure your career aligned with top universities across the world.",
    process: {
      heading: "How registration works",
      paragraphs: [
        "By following a step-by-step guide to university registration for study abroad programs, you’ll be well-prepared to navigate the process with confidence.",
      ],
      steps: [
        {
          title: "Review the requirements",
          text: "We at Studwise thoroughly review the university’s website and contact their international admissions office for any clarifications or questions you may have.",
        },
        {
          title: "Fulfil every requirement",
          text: "By understanding and fulfilling these requirements, we will ensure a smooth and successful registration process.",
        },
        { title: "Follow up for you", text: "It also consistently follows up with institutions to ensure quick admissions." },
      ],
    },
    related: ["visa-assistance", "scholarship-assistance", "career-counselling"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 03 */
  {
    slug: "visa-assistance",
    legacyPath: "/visa-application-assistance",
    title: "Visa Assistance",
    metaDescription:
      "With our guidance, you can navigate the visa application process with ease and confidence. Studwise has supported 550+ students with their student visa applications.",
    hero: {
      heading: "Visa",
      accent: "Assistance",
      lead: "With our guidance, you can navigate the visa application process with ease and confidence.",
      image: "/images/services/Visa-Assistance.jpg",
      alt: "Two passports held up in front of a university building",
      focus: "50% 60%",
    },
    overview: {
      heading: "The study abroad visa application process may seem overwhelming at first,",
      accent: "but with the right guidance and preparation, it can be a smooth and successful journey.",
      paragraphs: [
        "A student visa is comparatively difficult because it involves a lot of paperwork. From gathering the right paperwork to understanding the specific requirements of your destination country, let us help you turn your study abroad dreams into a reality.",
        "Applying for a study abroad visa can be a complex and time-consuming process, but understanding the overall structure and requirements can make it much easier.",
      ],
    },
    benefits: {
      heading: "A Reliable Visa-Processing Experience",
      text: "Understanding the visa requirements, gathering the necessary documents, and avoiding common mistakes are key steps to ensuring a successful visa application.",
      items: [
        {
          title: "90% visa success rate",
          text: "Above 90% of the student visa applications we have supported have been approved. Every decision rests with the immigration authorities.",
          icon: ICON.passport,
        },
        {
          title: "Committed experts",
          text: "Our education experts are committed to providing students with a reliable visa-processing experience.",
          icon: ICON.users,
        },
        {
          title: "Careful document checks",
          text: "To avert any delays in the verification procedure, we closely examine your documents.",
          icon: ICON.search,
        },
      ],
    },
    quote: "All our initiatives aim to simplify the visa application process.",
    process: {
      heading: "How visa assistance works",
      paragraphs: [
        "Studwise International has supported 550+ students through the student visa process, from choosing the right visa category to preparing for the interview.",
        "Understanding the timeline of the visa application process is also essential.",
      ],
      steps: [
        {
          title: "Know your visa category",
          text: "Research the specific visa category applicable to your study program and ensure you meet all the eligibility criteria.",
        },
        {
          title: "Build your application",
          text: "The visa application process entails everything from assisting you with the creation of an application to setting up financial records and adhering to the international laws of the selected countries.",
        },
        {
          title: "Prepare for the interview",
          text: "For effective preparation, our education consultants also provide Visa interview preparation and mock exams.",
        },
      ],
    },
    related: ["ielts-toefl-ept", "pre-landing-services", "university-registration"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 04 */
  {
    slug: "ielts-toefl-ept",
    legacyPath: "/ielts-toefl-ept-test-preparation",
    title: "IELTS/TOEFL/EPT Test Preparation",
    metaDescription:
      "Studwise conducts comprehensive IELTS/TOEFL/EPT test preparation classes that will boost your results on these important language tests.",
    hero: {
      heading: "IELTS / TOEFL / EPT",
      accent: "Test Preparation",
      lead: "Studwise conducts comprehensive IELTS/TOEFL/EPT test preparation classes that will boost your results on these important language tests.",
      image: "/images/services/IELTS.jpg",
      alt: "A student in glasses working through papers at her desk",
      focus: "50% 35%",
    },
    overview: {
      heading: "Language proficiency tests like IELTS, TOEFL, and EPT",
      accent: "play a crucial role in assessing your ability to communicate effectively in English.",
      paragraphs: [
        "These tests are not only a requirement for admission to international universities but are also often required by employers to ensure that candidates possess the necessary language skills for the job.",
        "So, whether you’re a student aiming for admission to a prestigious university, a professional seeking career advancement, or an individual looking to enhance your language proficiency, get ready to unlock your full potential and achieve success in your language proficiency test.",
      ],
    },
    benefits: {
      heading: "The Right Test for Your Plans",
      text: "By achieving a high score on these tests, you demonstrate your proficiency in English and increase your chances of success in both academic and professional settings.",
      items: [
        {
          title: "IELTS",
          text: "IELTS is widely accepted in the United Kingdom, Australia, Canada, and New Zealand, while TOEFL is more commonly required by universities in the United States.",
          icon: ICON.globe,
        },
        {
          title: "TOEFL",
          text: "The TOEFL test, the most popular English language test for study, immigration, and jobs, can help you achieve an advantage.",
          icon: ICON.mic,
        },
        {
          title: "EPT",
          text: "EPT, on the other hand, is specifically designed for individuals looking to study or work in English-speaking countries in Europe.",
          icon: ICON.book,
        },
      ],
    },
    quote: "Our comprehensive services aim at molding the student into a master problem solver.",
    process: {
      heading: "How our classes work",
      paragraphs: [
        "From understanding the format and content of the exams to developing your language skills and boosting your confidence, we’ve got you covered.",
      ],
      steps: [
        { title: "Sessions made for you", text: "Every session is customized to match the needs of the students." },
        {
          title: "The latest study materials",
          text: "We employ the latest study materials so that students are equipped to face exams confidently.",
        },
        {
          title: "The right test for your course",
          text: "Students who are enrolled in academic programs should take our IELTS academic test and attend the EPT exam requirements.",
        },
      ],
    },
    related: ["pre-landing-services", "visa-assistance", "university-registration"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 05 */
  {
    slug: "pre-landing-services",
    legacyPath: "/pre-landing-immigration-services",
    title: "Pre-Landing Services",
    metaDescription:
      "Studwise provides pre-landing immigration services to students who wish to study abroad, from flight reservations and airport pickups to documents and pre-departure orientation.",
    hero: {
      heading: "Pre-Landing",
      accent: "Services",
      lead: "Studwise provides pre-landing immigration services to students who wish to study abroad.",
      image: "/images/services/pre-landing.jpg",
      alt: "A smiling student using a laptop in a lounge chair",
      focus: "62% 40%",
    },
    overview: {
      heading: "By assisting with visa applications, pre-landing services ensure that students can start their study abroad journey",
      accent: "without unnecessary delays or complications.",
      paragraphs: [
        "Pre-landing immigration services play a vital role in enhancing the study abroad experience by providing students with the necessary support to navigate the challenges they may face before even setting foot in their dream destination.",
        "This allows students to focus on settling into their new environment and immersing themselves in their studies and cultural experiences.",
      ],
    },
    benefits: {
      heading: "Practical Support Before You Land",
      text: "From visa application assistance to pre-departure orientation sessions, and pre-landing services we offer a wide range of support that significantly enhances the study abroad experience.",
      items: [
        {
          title: "Flight reservations",
          text: "We assist with flight reservations well in advance to provide the greatest departure dates, routes, and rates.",
          icon: ICON.plane,
        },
        {
          title: "Trips and airport pickups",
          text: "We can arrange for regional trips, airport pickups, and other services.",
          icon: ICON.pin,
        },
        {
          title: "Documents in the right format",
          text: "Help them produce documents using the international standard format as requested by the students.",
          icon: ICON.doc,
        },
        {
          title: "Course mentoring",
          text: "And mentor students professionally regarding their intended course of study in their target countries.",
          icon: ICON.cap,
        },
      ],
    },
    quote:
      "By taking care of these logistical aspects, these services allow students to feel supported and welcomed from the moment they arrive in their host country.",
    process: {
      heading: "How we prepare you",
      paragraphs: [
        "Also, pre-landing services offer practical support such as airport pickup, accommodation arrangements, and local transportation guidance.",
        "This support contributes to a positive study abroad experience and minimizes any initial stress or anxiety associated with moving to a new place.",
      ],
      steps: [
        {
          title: "Academic advising",
          text: "Pre-landing services also provide students with the tools and knowledge they need to thrive academically. By offering academic advising, these services help students select courses that align with their interests and academic goals, setting them up for success.",
        },
        {
          title: "Know the education system",
          text: "Additionally, pre-landing services equip students with essential information about the education system in their host country, ensuring a smooth transition and minimizing any potential academic challenges.",
        },
        {
          title: "Cultural orientation",
          text: "Furthermore, pre-landing services foster cultural integration by providing students with cultural orientation and language classes. These initiatives facilitate meaningful interactions with local students, enabling study-abroad students to fully immerse themselves in the local culture and customs. By embracing these experiences, students gain a deeper understanding of global perspectives, enhance their cultural competency, and develop lifelong connections.",
        },
      ],
    },
    related: ["post-landing-services", "visa-assistance", "accommodation-assistance"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 06 */
  {
    slug: "post-landing-services",
    legacyPath: "/post-landing-services",
    title: "Post-Landing Services",
    metaDescription:
      "Post-landing services play a vital role in assisting international students in overcoming the challenges they face after arriving in a new country.",
    hero: {
      heading: "Post-Landing",
      accent: "Services",
      lead: "Studwise provides services and enhances your journey, ensuring that you make the most of this once-in-a-lifetime opportunity.",
      image: "/images/services/Post-Landing.jpg",
      alt: "A student with a suitcase and passport smiling in an airport terminal",
      focus: "55% 40%",
    },
    overview: {
      heading: "Studying abroad helps with",
      accent: "personal and academic growth.",
      paragraphs: [
        "However, to truly maximize this experience, it’s crucial to have the right support system in place. Post-landing services play a vital role in assisting international students in overcoming the challenges they face after arriving in a new country. By providing guidance and resources in various areas, these services ensure a smooth transition and enhance the overall study abroad journey.",
        "These services are designed to provide essential assistance and guidance to international students, helping them navigate the challenges of settling into a new environment.",
      ],
    },
    benefits: {
      heading: "Settle In With the Right Support",
      text: "Whether it’s academic support, cultural integration, housing assistance, or career guidance, post-landing services offer invaluable assistance that can make all the difference in your study abroad experience.",
      items: [
        {
          title: "Accommodation and banking",
          text: "From finding accommodation and opening a bank account to understanding local customs and regulations, post-landing services offer a vital support system that can make all the difference in your study abroad experience.",
          icon: ICON.bank,
        },
        {
          title: "Support tailored to you",
          text: "These services are designed to provide support and guidance tailored to the specific needs of students studying abroad.",
          icon: ICON.person,
        },
        {
          title: "Settle in quickly",
          text: "By offering assistance in various areas, post-landing services ensure that students can settle in quickly and make the most of their study abroad experience.",
          icon: ICON.home,
        },
      ],
    },
    quote:
      "So, make the most of these services, embrace the opportunities, and embark on a transformative journey that will shape your future.",
    process: {
      heading: "How we support you",
      paragraphs: [
        "Post-landing services play a crucial role in helping international students overcome the challenges they face upon arrival.",
      ],
      steps: [
        {
          title: "From application to arrival",
          text: "Immigration starts with the application process and ends with successful taking to the new country.",
        },
        {
          title: "Professional guidance",
          text: "The professional guidance given by Studwise has promisingly supported many students to zone out in another country.",
        },
        {
          title: "A simpler immigration process",
          text: "Specialized services offered by Studwise can smoothen the immigration process for you making it simple and direct as possible.",
        },
      ],
    },
    related: ["internship-services", "accommodation-assistance", "pre-landing-services"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 07 */
  {
    slug: "internship-services",
    legacyPath: "/study-abroad-internship-programs",
    title: "Internship Services",
    metaDescription:
      "Study abroad internship programs offer the best of both worlds. Studwise is partnered with 100+ internship-providing companies to guide students moving abroad via an internship.",
    hero: {
      heading: "Internship",
      accent: "Services",
      lead: "Study abroad internship programs offer the best of both worlds, allowing you to immerse yourself in a new culture while gaining hands-on work experience in your field of interest.",
      image: "/images/services/internship.jpg",
      alt: "Two colleagues sharing a high five at work",
      focus: "50% 40%",
    },
    overview: {
      heading: "Studying abroad is a life-changing experience",
      accent: "that offers countless benefits.",
      paragraphs: [
        "By immersing yourself in a foreign country, you’ll experience firsthand the customs, traditions, and way of life that make it unique.",
        "This exposure to new perspectives will not only enhance your cultural understanding but also develop your adaptability and open-mindedness, qualities highly sought after by employers in today’s globalized world.",
      ],
    },
    benefits: {
      heading: "The Best of Both Worlds",
      text: "We have a dedicated team to assist you in your further search for internship opportunities across the world.",
      items: [
        {
          title: "100+ partner companies",
          text: "Studwise gives proper guidance and financial aid who wish to move abroad via an internship, partnered with 100 + internship-providing companies.",
          icon: ICON.briefcase,
        },
        {
          title: "Skills and communication",
          text: "An internship overseas is a great opportunity, a global perspective can be developed and helps to improve skills and cross-cultural communication.",
          icon: ICON.spark,
        },
        {
          title: "An international network",
          text: "Additionally, combining study abroad and internships allows you to build a strong international network, connecting you with professionals and organizations around the world. This network can prove invaluable when seeking future employment or exploring international career opportunities.",
          icon: ICON.users,
        },
      ],
    },
    quote: "Now imagine the benefits of combining study abroad and internship programs into one transformative experience.",
    process: {
      heading: "How study abroad internships work",
      paragraphs: [],
      steps: [
        {
          title: "Broaden your horizons",
          text: "Firstly, it allows you to broaden your horizons and gain a deeper appreciation for different cultures.",
        },
        {
          title: "Gain work experience",
          text: "Internship programs, on the other hand, provide valuable work experience that complements your academic studies.",
        },
        {
          title: "Apply what you learn",
          text: "These programs typically combine academic coursework with internships at local companies, giving you the opportunity to apply what you’ve learned in the classroom to real-world projects and challenges.",
        },
      ],
    },
    related: ["scholarship-assistance", "post-landing-services", "career-counselling"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 08 */
  {
    slug: "scholarship-assistance",
    legacyPath: "/study-abroad-scholarship-program",
    title: "Scholarship Assistance",
    metaDescription:
      "Students will be given proper guidance and reliable information on the scholarships that the Universities provide. Studwise make sure that they are given support in the right pathway.",
    hero: {
      heading: "Scholarship",
      accent: "Assistance",
      lead: "Students will be given proper guidance and reliable information on the scholarships that the Universities provide.",
      image: "/images/services/scholarship.jpg",
      alt: "Smiling graduates in caps and gowns holding their diplomas",
      focus: "45% 40%",
    },
    overview: {
      heading: "Studying abroad has always been chosen",
      accent: "but the expense of it is still a concern.",
      paragraphs: [
        "Overseas education is becoming more trend in the present- day. However, the cost of tuition, living expenses, and travel can often seem overwhelming. But don’t let that discourage you! With the right approach and preparation, we can unlock the doors to various scholarships and grants that can make your dream a reality.",
        "Securing a study abroad scholarship can be a transformative experience, enabling you to pursue your academic dreams without the burden of financial constraints.",
      ],
    },
    benefits: {
      heading: "More Than Financial Aid",
      text: "When it comes to study abroad scholarships, it’s crucial to understand their importance beyond just financial aid.",
      items: [
        {
          title: "Stand out",
          text: "Scholarships can significantly enhance your resume and make you stand out among other applicants. They showcase your commitment to education, your ability to excel academically, and your eagerness to embrace new cultures and experiences.",
          icon: ICON.award,
        },
        {
          title: "Open doors",
          text: "Additionally, being a scholarship recipient can open doors to networking opportunities, mentorship programs, and other resources that can further enhance your educational journey.",
          icon: ICON.users,
        },
        {
          title: "Scholarships worldwide",
          text: "Scholarships are provided by various countries across the world. Scholarships can be categorized based on various factors, including the sponsoring organization, the destination country, the field of study, and the eligibility criteria.",
          icon: ICON.globe,
        },
      ],
    },
    quote: "We aid in scholarship acquisition for our students, banishing complications.",
    process: {
      heading: "How we help you apply",
      paragraphs: [
        "Studwise make sure that they are given support in the right pathway.",
        "Scholarships can offer significant financial aid for those who wish to study abroad.",
      ],
      steps: [
        {
          title: "Find the right scholarships",
          text: "From researching and applying to showcasing your unique skills and experiences, we will delve into the essential steps you need to take to increase your chances of securing a study abroad scholarship.",
        },
        {
          title: "Apply with confidence",
          text: "By understanding the importance of study abroad scholarships, researching available opportunities, and crafting compelling scholarship applications, you can increase your chances of receiving the financial support you need.",
        },
      ],
    },
    related: ["accommodation-assistance", "university-registration", "visa-assistance"],
    cta: CTA,
  },

  /* ---------------------------------------------------------------- 09 */
  {
    slug: "accommodation-assistance",
    legacyPath: "/study-abroad-accommodation-services",
    title: "Accommodation Assistance",
    metaDescription:
      "We assist you in locating the best accommodation options under your budget with basic infrastructure facilities of the student’s choice, close to the institution.",
    hero: {
      heading: "Accommodation",
      accent: "Assistance",
      lead: "We assist you in locating the best accommodation options under your budget with basic infrastructure facilities of the student’s choice, and share guidance on part-time work while you study.",
      image: "/images/services/accommodation-room.jpg",
      alt: "A bright bedroom in calm blue tones",
      focus: "60% 60%",
    },
    overview: {
      heading: "Remember, your study abroad experience is not just about academics;",
      accent: "it’s also about creating lifelong memories, friendships, and personal growth.",
      paragraphs: [
        "Are you dreaming of studying abroad? One of the most crucial aspects of your international education journey is finding the perfect accommodation.",
        "Choosing the right study-abroad accommodation is a vital decision that can greatly impact your overall experience. By choosing the right accommodation, you can lay the foundation for a truly unforgettable international education journey.",
        "We can also share information about part-time work opportunities while you study, so you understand the options and rules in your destination. Whether and how much you can work depends on the country, your visa and your institution.",
      ],
    },
    benefits: {
      heading: "A Safe, Comfortable Place to Live",
      text: "We understand the importance of finding a safe, comfortable, and convenient place to live while pursuing your education abroad.",
      items: [
        {
          title: "Homestay, residence or apartment",
          text: "Whether you’re looking for a homestay experience, a student residence, or a private apartment, we’ve got you covered.",
          icon: ICON.home,
        },
        {
          title: "Every budget",
          text: "Our services include cater to various budgets, locations, and preferences.",
          icon: ICON.wallet,
        },
        {
          title: "Close to your institution",
          text: "Our dedicated team at Studwise can assist you in locating the best accommodation options under your budget with basic infrastructure facilities, that are close to the institution of the student’s choice.",
          icon: ICON.pin,
        },
      ],
    },
    quote: "We make sure that, regardless of the choice students will not find the process of locating housing to be a traumatic one.",
    process: {
      heading: "How we find your home",
      paragraphs: [
        "Our team of experts has researched and compiled a list of the top study-abroad accommodation services for students.",
        "Join Studwise as we explore the best study-abroad accommodation services that will make your international experience truly unforgettable.",
      ],
      steps: [
        {
          title: "Weigh up the options",
          text: "By considering factors such as location, safety, cost, amenities, and reviews, you can make an informed choice that suits your needs and preferences.",
        },
        {
          title: "Housing made for students",
          text: "Using accommodation services specifically designed for students offers numerous benefits, including expertise and support, cultural immersion, convenience, community, and peace of mind.",
        },
        { title: "Paperwork handled", text: "If necessary, we will complete all documentation processes on behalf of students." },
      ],
    },
    related: ["career-counselling", "post-landing-services", "pre-landing-services"],
    cta: CTA,
  },
];

export const getServiceDetail = (slug: string) => serviceDetails.find((s) => s.slug === slug);
