/* ==========================================================================
   Testimonials page content
   ==========================================================================
   Student reviews from the live studwise.in/testimonials
   page. All 15 student reviews are included, quoted as written. Three
   (Mohammed Nishad, Shaheem, Shibil) name "Edwise" rather than Studwise
   in their text; they are kept verbatim, as on the live page. The live
   page's text-only slider held template filler, not student reviews.
   ========================================================================== */

export type University = {
  /** Short name used for the filter chips */
  short: string;
  name: string;
  country: "UK" | "Germany";
  logo?: string;
};

const UNI = {
  aru: { short: "ARU", name: "Anglia Ruskin University", country: "UK", logo: "/logos/universities/anglia-ruskin-university.png" },
  herts: { short: "Hertfordshire", name: "University of Hertfordshire", country: "UK", logo: "/logos/universities/university-of-hertfordshire.png" },
  uel: { short: "UEL", name: "University of East London", country: "UK", logo: "/logos/universities/university-of-east-london.png" },
  uclan: { short: "UCLan", name: "University of Central Lancashire", country: "UK", logo: "/logos/universities/university-of-central-lancashire.png" },
  roehampton: { short: "Roehampton", name: "University of Roehampton", country: "UK", logo: "/logos/universities/university-of-roehampton-london.png" },
  ljmu: { short: "LJMU", name: "Liverpool John Moores University", country: "UK" },
  northampton: { short: "Northampton", name: "University of Northampton", country: "UK", logo: "/logos/universities/university-of-northampton.png" },
  ue: { short: "UE Germany", name: "University of Europe for Applied Sciences", country: "Germany" },
} satisfies Record<string, University>;

export type Testimonial = {
  slug: string;
  name: string;
  university: University;
  course: string;
  /** "MBA" or "MSc", for filtering */
  level: "MBA" | "MSc";
  quote: string;
  /** Photo in public/images/testimonials/students */
  photo: string;
  /** CSS object-position that keeps the student in frame when cropped */
  focus: string;
  /** Shown in the featured section, as on the original page */
  featured?: boolean;
  /** Exact phrase from the quote to highlight in the featured section */
  highlight?: string;
};

export const testimonials: Testimonial[] = [
  {
    slug: "abdul-basith",
    name: "Abdul Basith",
    university: UNI.aru,
    course: "International Business MSc",
    level: "MSc",
    quote:
      "Studwise has helped me achieve dream of studying abroad in a world class university like Anglia Ruskin University. They are quite professional and are always there to help you out through each and every step of the way. I am pleased with the overall support and attitude of the team. I would recommend Studwise to all the aspiring students out there.",
    photo: "/images/testimonials/students/abdul-basith.webp",
    focus: "50% 45%",
  },
  {
    slug: "ardra-ashok",
    featured: true,
    highlight: "the entire process was hassle free.",
    name: "Ardra Ashok",
    university: UNI.aru,
    course: "MSc Supply Chain Management",
    level: "MSc",
    quote:
      "I will encourage all my friends and those who are reading this review to approach studwise international if you have plans to study abroad. I had really good experience with studwise. I was properly guided and the entire process was hassle free. My sincere gratitude to mahmmod , Aswathy and the entire team for making my dream come true.. Special thanks to aswathy for preparing me for CAS interview. I really appreciate your effort and I'm really thankful for everything.",
    photo: "/images/testimonials/students/ardra-ashok.webp",
    focus: "50% 30%",
  },
  {
    slug: "ajmal",
    name: "Ajmal",
    university: UNI.herts,
    course: "MSc International Business with Advanced Research",
    level: "MSc",
    quote:
      "Im so thankful to Team Studwise for supporting me to achieve my goal. For last few months we made lot of discussion regards to find out the path to move UK. As a mentor to our team, Mahmood kka helped me a lot by giving proper instructions and by encouraging me to move forward and also im thankful to Ashwathi miss for cope up with me throughout. Thank you Team Studwise.",
    photo: "/images/testimonials/students/ajmal.webp",
    focus: "50% 30%",
  },
  {
    slug: "amal-muhammed",
    name: "Amal Muhammed",
    university: UNI.aru,
    course: "MSc International Business",
    level: "MSc",
    quote:
      "I would like to recommend studwise international to all abroad study aspirants since they have very professional staff who treat you well and make the process of applying to UK universities very easy. And all their services are Free of cost. There are so many other consultancies where they ask for fees and dont work well or treat you unprofessionally. Here they treated me well and handled my application very well, with no extra charges.Thank you Studwise for making my dream of abroad studies come true.",
    photo: "/images/testimonials/students/amal-muhammed.webp",
    focus: "55% 40%",
  },
  {
    slug: "fariz",
    name: "Fariz",
    university: UNI.ljmu,
    course: "MSc (240c) International Business and Management",
    level: "MSc",
    quote:
      "Its been a dream for me to study abroad.All thanks to studwise team for helping me to achieve my dreams as an international student.It's been like a family to me.The staffs were so kind and friendly and helping me in every cases even in the credibility interview. Special Thanks to Aswathy maam and heena maam for guiding at every stage and the whole team. Thanks again for making my dream come true.",
    photo: "/images/testimonials/students/fariz.webp",
    focus: "55% 12%",
  },
  {
    slug: "maria",
    featured: true,
    highlight: "Studwise International was a best choice.",
    name: "Maria",
    university: UNI.uel,
    course: "MSc Computer Science",
    level: "MSc",
    quote:
      "In my experience Studwise International was a best choice. They provided me good services for my dream education in the UK. I specially thank Mahmood for the immense support given to me for my student visa and my husband’s dependant visa. I really appreciate your follow up in each and everything for the entire journey. Once again thank you Mahmood and the team Studwise International! 👍🏻",
    photo: "/images/testimonials/students/maria.webp",
    focus: "50% 30%",
  },
  {
    slug: "ameer",
    name: "Ameer",
    university: UNI.herts,
    course: "MSc International Business",
    level: "MSc",
    quote:
      "Thank you Studwise for your service. I do recommend studwise International for those who looking for abroad study. They’re extremely helpful and transparent. I especially want to thank Aswathy for the whole support in the uk student visa process and Mehmood who picks up my calls anytime and who is ready to clear all of my doubts. Thank you team ❤️ keep it up.",
    photo: "/images/testimonials/students/ameer.webp",
    focus: "50% 45%",
  },
  {
    slug: "karishma",
    name: "Karishma",
    university: UNI.herts,
    course: "MSc International Business",
    level: "MSc",
    quote:
      "I am very much satisfied with the service that Studwise gave me during every stages of my visa in a proper way and also guided me very well. I would like to give special thanks to Mahmood sir and my visa filing processing staff Aswathy , they really helped me and updated me everything very well.",
    photo: "/images/testimonials/students/karishma.webp",
    focus: "50% 55%",
  },
  {
    slug: "asnaf-rehman",
    name: "Asnaf Rehman",
    university: UNI.roehampton,
    course: "MBA",
    level: "MBA",
    quote:
      "Thanks to Studwise International and Mahmoode for making my dreams comes true study in UK. On my view Studwise International is one of the genuine and trusted educational consultant in Malappuram district. If You have a drive and desire to study in abroad, Mahmoode and the Studwise International team will do the rest.🖤",
    photo: "/images/testimonials/students/asnaf-rehman.webp",
    focus: "50% 50%",
  },
  {
    slug: "dilshan-afeed",
    name: "Dilshan Afeed",
    university: UNI.uclan,
    course: "MBA",
    level: "MBA",
    quote:
      "I am really happy with the team studwise international. I would like to thank them for their assistance in each and every step of my processing. Fully satisfied with services and assistance from the team. Excellent support for the students. Highly suggesting for the students who planing to an abroad study and all. Very helpful staffs.",
    photo: "/images/testimonials/students/dilshan-afeed.webp",
    focus: "50% 45%",
  },
  {
    slug: "shahaba",
    name: "Shahaba",
    university: UNI.uclan,
    course: "Master of Business Administration with Professional Placement",
    level: "MBA",
    quote:
      "Studwise international is one of the best education consultant that helped me step in my admisssion consulting,choosing the suitable and affordable universities in the UK and assisting me in choosing a suitable Course .Studewise international helped me achieve dream of studying abroad in world class university.they are quit professional and are always there to help you out through each and every step of the way. I am pleased with the overall and attitude of the team at Studwise international.the counsellor assigned for my masters is Ms Razeena,who was very helpful and guided me through every step right from application to the university to the visa process.she is always available to clear my doubts and followed up the entire process.I would recommend Studewise international to all the aspiring students out there.",
    photo: "/images/testimonials/students/shahaba.webp",
    focus: "50% 12%",
  },
  {
    slug: "faris",
    name: "Faris",
    university: UNI.ue,
    course: "MBA",
    level: "MBA",
    quote: "Such a great academic achievement helped me to achieve my dream. I am very happy with their team.",
    photo: "/images/testimonials/students/faris.webp",
    focus: "55% 85%",
  },
  {
    slug: "mohammed-nishad",
    name: "Mohammed Nishad",
    university: UNI.uel,
    course: "MBA",
    level: "MBA",
    quote: "Edwise Global Consultant is such a reliable and trustworthy overseas consultancy, special Thanks to counsellor Darsana for her constant support and optimistic guidance throughout the process starting from the selection of university to visa application process.",
    photo: "/images/testimonials/students/mohammed-nishad.webp",
    focus: "50% 18%",
  },
  {
    slug: "shaheem",
    name: "Shaheem",
    university: UNI.northampton,
    course: "MBA",
    level: "MBA",
    quote: "I had a wonderful involvement in Edwise. They helped me to seek after my dream career through appropriate direction. All the staffs were so agreeable and accommodating. Edwise who was there with me directly from the earliest starting point and helped me to pick the correct university. The confirmation and visa preparing was quick. At last, my dream to seek after higher studies in the UK is getting valid. All gratitude to Edwise worldwide specialist.",
    photo: "/images/testimonials/students/shaheem.webp",
    focus: "50% 55%",
  },
  {
    slug: "shibil",
    name: "Shibil",
    university: UNI.uel,
    course: "MBA",
    level: "MBA",
    quote: "I was lucky enough to have found Edwise Global Consultant.In simple words, the only agency i have known to be straight forwarded and not MONEY ORIENTED. Hats off to the whole team all my regards and best wishes. And thank you very much for your esteemed presence and concern over me and all the rest of your students.I would recommend anyone who wish to study abroad to approach Edwise for any kind of help.",
    photo: "/images/testimonials/students/shibil.webp",
    focus: "50% 14%",
  },
];

/** In the original page's order */
export const featuredTestimonials = ["maria", "ardra-ashok"]
  .map((slug) => testimonials.find((t) => t.slug === slug && t.featured))
  .filter((t): t is Testimonial => Boolean(t));

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  title: "Hear It from Our Students",
  text: "Collecting the trust and commitment of our happy students.",
};
