/* ==========================================================================
   Legal pages (app/privacy-policy, app/terms-and-conditions)
   ==========================================================================
   DRAFT — SAMPLE COPY FOR CLIENT REVIEW. This text has not been approved by
   Studwise or reviewed by a lawyer, and must be confirmed before the site
   launches. Business details come from studwise.in and this project's data
   (data/navigation, data/offices, data/contact). Still to confirm:
   - the legal entity name (studwise.in uses both "Studwise International"
     and "Studwise Pvt Ltd") and any registration details
   - fees, payment terms, cancellations and refunds
   - how enquiry and application data is actually stored, who it is shared
     with, how long it is kept, and who handles privacy requests
   - whether analytics, advertising or other tracking tools will be added
   - the governing law and dispute wording, and the "Last updated" date
   Nothing in this note is shown on the pages.
   ========================================================================== */

import { headerContact } from "@/data/navigation";
import { offices } from "@/data/offices";

export type LegalBlock = string | { list: string[] } | { contact: true } | { link: { href: string; label: string } };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };
export type LegalDoc = {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

const LAST_UPDATED = "26 October 2026";
const hq = offices.find((o) => o.kind === "Head office");

/** The verified contact details shown in each document's Contact section */
export const legalContact = {
  name: "Studwise International",
  address: hq?.address ?? "Manjeri, Kerala, India",
  email: headerContact.email,
  phone: headerContact.phones[0],
};

const services =
  "career counselling, course and university selection, university applications, scholarship guidance, visa application assistance, IELTS, TOEFL and EPT preparation, accommodation assistance, and pre-departure and post-arrival support";

export const privacyPolicy: LegalDoc = {
  eyebrow: "Legal",
  title: "Privacy",
  accent: "Policy",
  intro:
    "How Studwise International collects, uses and protects the personal information you share with us when you use our website or our study-abroad services.",
  updated: LAST_UPDATED,
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      blocks: [
        `Studwise International ("Studwise", "we", "us" or "our") is a study-abroad education consultancy headquartered in Manjeri, Kerala, with a centre in Valanchery and a centre opening in Calicut. We help students with ${services}.`,
        "This Privacy Policy explains what personal information we may collect, why we collect it, how we use and share it, and the choices available to you. It applies to our website and to information you share with us by phone, WhatsApp, email or in person at our centres.",
        "By using our website or services, you acknowledge that you have read this policy. Where the law requires your consent to process your information, we will ask for it.",
      ],
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      blocks: [
        "Depending on how you interact with us, we may collect:",
        {
          list: [
            "Contact details, such as your name, phone or WhatsApp number, email address and city.",
            "Study preferences, such as your preferred countries, courses, study level and intake.",
            "Academic and professional details, such as qualifications, marks, transcripts, test scores (for example IELTS, TOEFL or EPT) and work experience.",
            "Application documents you choose to give us, such as your passport, certificates, statements of purpose, recommendation letters and financial documents needed for an application or visa.",
            "Records of our conversations with you, such as counselling notes and messages.",
            "Technical information that websites commonly receive, such as your IP address, browser type and the pages you visit.",
          ],
        },
        "Please share only the information that is needed for the services you ask us for. If you give us information about another person, such as a parent or guardian, please make sure they are aware that you are doing so.",
      ],
    },
    {
      id: "how-we-use-information",
      title: "How We Use Personal Information",
      blocks: [
        "We may use your personal information to:",
        {
          list: [
            "Respond to your enquiries and arrange counselling sessions.",
            "Understand your goals and suggest suitable countries, courses and universities.",
            "Prepare and submit university, scholarship and accommodation applications on your behalf, when you ask us to.",
            "Help you prepare visa applications and related documents.",
            "Provide language-test preparation and pre-departure and post-arrival support.",
            "Keep you informed about the progress of your applications.",
            "Improve our website and services, and keep them secure.",
            "Meet our legal, regulatory and record-keeping obligations.",
          ],
        },
      ],
    },
    {
      id: "communications",
      title: "Enquiry and Marketing Communications",
      blocks: [
        "When you contact us or fill in an enquiry form, we will use the details you give us to reply, usually by phone, WhatsApp or email.",
        "With your permission, we may also send you information about intakes, scholarships, events and services that may interest you. You can ask us to stop sending these messages at any time by replying to the message or contacting us using the details below. Messages about an application you have asked us to handle are not marketing and may continue while that work is in progress.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing of Information with Universities and Service Providers",
      blocks: [
        "We do not sell your personal information. We share it only where this is needed to provide the services you have asked for, with your authorisation where required, or where the law requires it. This may include:",
        {
          list: [
            "Universities, colleges and other education providers you have chosen to apply to.",
            "Scholarship providers, accommodation providers and test administrators, where relevant to your request.",
            "Visa and immigration authorities, or service centres acting for them, when you ask us to help with a visa application.",
            "Service providers who support our work, such as communication, document storage and IT providers, who may only use the information to provide services to us.",
            "Government bodies, courts or regulators, where we are legally required to share information.",
          ],
        },
        "Each university, authority or provider handles your information under its own privacy policy, which we encourage you to read.",
      ],
    },
    {
      id: "international-transfers",
      title: "International Transfers of Information",
      blocks: [
        "Because we help students study abroad, your information may need to be sent to institutions, authorities or providers in other countries, such as the UK, USA, Canada, Australia, Malta, Singapore, the UAE (Dubai) and Malaysia. These countries may have data-protection laws that differ from those in India.",
        "We transfer information abroad only as needed for your applications or the services you have requested, and in line with any restrictions that apply under Indian law.",
      ],
    },
    {
      id: "security",
      title: "Data Storage and Security",
      blocks: [
        "We take reasonable steps to protect personal information against loss, misuse and unauthorised access, and we limit access to people who need it to help you.",
        "No method of sending or storing information over the internet is completely secure, so we cannot guarantee absolute security. Please take care when sending sensitive documents and use the contact channels listed on this page.",
      ],
    },
    {
      id: "retention",
      title: "Data Retention",
      blocks: [
        "We keep personal information only for as long as it is needed for the purposes described in this policy, including supporting your applications, answering follow-up questions and meeting legal, accounting and record-keeping requirements. When it is no longer needed, we will delete it or keep it in a form that no longer identifies you, unless the law requires us to keep it for longer.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Similar Technologies",
      blocks: [
        "Cookies are small files that a website stores on your device. Our website does not currently use cookies for advertising.",
        "Some pages include content from other services, such as the Google Maps embedded on our Contact page. These services may set their own cookies or collect information under their own privacy policies. You can block or delete cookies in your browser settings, although some embedded content may then not work as intended.",
        "If we start using analytics or similar tools, we will update this policy.",
      ],
    },
    {
      id: "your-rights",
      title: "Privacy Rights, Requests and Consent Withdrawal",
      blocks: [
        "Subject to applicable law in India, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023 and the Digital Personal Data Protection Rules, 2025 as their provisions come into force, you may be able to:",
        {
          list: [
            "Ask what personal information we hold about you and how we use it.",
            "Ask us to correct, complete or update information that is inaccurate or incomplete.",
            "Ask us to erase information we no longer need, unless we must keep it by law.",
            "Withdraw consent you have given us. This will not affect anything we did before you withdrew it, but it may mean we can no longer continue an application or service that depends on that information.",
            "Raise a concern about how we have handled your information.",
          ],
        },
        "To make a request, contact us using the details below. We may need to confirm your identity before acting on a request. If you are not satisfied with our response, you may be able to take your concern to the relevant authority under applicable law.",
      ],
    },
    {
      id: "children",
      title: "Children's Information",
      blocks: [
        "Some students who contact us may be under 18. Where a student is under 18, we will ask for a parent or lawful guardian to be involved, and we will seek their consent wherever the law requires it before processing the student's information.",
        "If you believe a child has given us personal information without the consent their parent or guardian needed to give, please contact us and we will look into it.",
      ],
    },
    {
      id: "third-party-websites",
      title: "Third-Party Websites",
      blocks: [
        "Our website links to other websites and services, including university websites, WhatsApp, Instagram and Google Maps. We are not responsible for the privacy practices of these sites, and we encourage you to read their privacy policies.",
      ],
    },
    {
      id: "changes",
      title: "Changes to the Privacy Policy",
      blocks: [
        "We may update this Privacy Policy from time to time. The latest version will always be on this page, with the date it was last updated shown at the top. Where the changes are significant, we will take reasonable steps to let you know.",
      ],
    },
    {
      id: "contact",
      title: "Contact Information",
      blocks: ["If you have any questions about this Privacy Policy or how we handle your personal information, please contact us:", { contact: true }],
    },
  ],
};

export const termsAndConditions: LegalDoc = {
  eyebrow: "Legal",
  title: "Terms and",
  accent: "Conditions",
  intro:
    "The terms that apply when you use the Studwise website or our study-abroad counselling and application-support services. Please read them carefully.",
  updated: LAST_UPDATED,
  sections: [
    {
      id: "acceptance",
      title: "Introduction and Acceptance of Terms",
      blocks: [
        `These Terms and Conditions ("Terms") apply to your use of the Studwise website and to the services provided by Studwise International ("Studwise", "we", "us" or "our").`,
        "By using our website or services, you agree to these Terms. If you do not agree, please do not use the website or our services. Some services may also be covered by a separate written agreement; if that agreement conflicts with these Terms, the agreement will apply for that service.",
      ],
    },
    {
      id: "about-studwise",
      title: "About Studwise",
      blocks: [
        `Studwise International is a study-abroad education consultancy founded in 2019 and headquartered in Manjeri, Kerala, India, with a centre in Valanchery and a centre opening in Calicut. We offer ${services}, for study destinations including the UK, USA, Canada, Australia, Malta, Singapore, Dubai and Malaysia.`,
      ],
    },
    {
      id: "website-use",
      title: "Website Use",
      blocks: [
        "You may use our website for your personal, non-commercial use to learn about studying abroad and about our services. You agree not to:",
        {
          list: [
            "Use the website in a way that breaks any law or regulation.",
            "Submit false or misleading information, or information about another person without their permission.",
            "Try to gain unauthorised access to the website or the systems behind it, or disrupt how it works.",
            "Copy, scrape or reuse the website's content for commercial purposes without our written permission.",
          ],
        },
      ],
    },
    {
      id: "accuracy",
      title: "Accuracy of Website Information",
      blocks: [
        "We try to keep the information on our website accurate and up to date. However, details such as course availability, entry requirements, tuition fees, scholarships, intakes and visa rules are set by universities and authorities and can change at any time.",
        "The website is for general information only and is not a substitute for personal advice. Please check important details with us, or directly with the relevant institution or authority, before making decisions.",
      ],
    },
    {
      id: "services",
      title: "Counselling and Application Assistance",
      blocks: [
        "Our counsellors give guidance based on the information you provide and on our experience. We help you explore options, prepare and submit applications, and understand the steps involved in studying abroad.",
        "Our advice is guidance only. Decisions about where and what to study, and whether to apply, accept an offer or travel, are yours.",
      ],
    },
    {
      id: "no-guarantee",
      title: "No Guarantee of Admission, Scholarships or Visa Approval",
      blocks: [
        "Admission decisions are made by universities and colleges. Scholarship decisions are made by scholarship providers. Visa decisions are made by the relevant governments and immigration authorities. Processing times are also set by these bodies.",
        "Studwise does not make these decisions and cannot guarantee an admission offer, a scholarship, a visa or a particular processing time. Past results of other students do not guarantee the same outcome for you.",
      ],
    },
    {
      id: "student-responsibilities",
      title: "Student Responsibilities",
      blocks: [
        "To help us support you properly, you agree to:",
        {
          list: [
            "Provide information and documents that are true, complete and genuine, and tell us promptly if anything changes.",
            "Check that you meet the eligibility, language and financial requirements of the courses, scholarships and visas you apply for.",
            "Meet the deadlines set by universities, scholarship providers and authorities, and respond to our requests in good time.",
            "Read and keep copies of offers, agreements and correspondence you receive from institutions and authorities.",
            "Pay any fees owed to universities, authorities and other third parties directly, or as agreed, by their deadlines.",
          ],
        },
        "Providing false or misleading documents may lead to an application or visa being refused, to future applications being affected, and to us stopping our services to you.",
      ],
    },
    {
      id: "fees",
      title: "Service Fees and Payments",
      blocks: [
        "Some of our services, such as initial counselling, may be offered free of charge. Where a service is chargeable, we will tell you the fee and how it is payable before you engage that service, in a separate agreement or in writing.",
        "Fees charged by third parties, such as university application fees, tuition deposits, test fees, visa fees and accommodation costs, are set by those parties and are payable on their terms.",
      ],
    },
    {
      id: "refunds",
      title: "Cancellations and Refunds",
      blocks: [
        "Where you pay Studwise for a service, any cancellation and refund terms will be set out in the agreement or written communication for that service.",
        "Refunds of amounts paid to universities, authorities and other third parties depend on their own policies, and Studwise cannot guarantee them.",
      ],
    },
    {
      id: "third-parties",
      title: "Third-Party Institutions and Services",
      blocks: [
        "We work with universities, colleges and other providers in several countries, but they are independent of Studwise. We are not responsible for their decisions, services, fees, policies or the content of their websites.",
        "Our website may link to third-party websites and services, such as WhatsApp, Instagram and Google Maps. Your use of them is governed by their own terms.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      blocks: [
        "The content on our website, including text, graphics, photographs, logos and the Studwise name, belongs to Studwise or is used with permission. University names and logos belong to their respective owners. You may not copy, republish or use this content for commercial purposes without written permission.",
      ],
    },
    {
      id: "availability",
      title: "Website Availability and Changes",
      blocks: [
        "We aim to keep our website available, but we do not guarantee that it will always be available or free of errors. We may change, suspend or remove any part of the website at any time without notice.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      blocks: [
        "We provide our services with reasonable care and skill. To the extent permitted by law, Studwise is not liable for any loss arising from:",
        {
          list: [
            "Decisions made by universities, scholarship providers, governments or immigration authorities.",
            "Inaccurate, incomplete or late information or documents that you provide.",
            "Changes to courses, fees, entry requirements or visa rules made by third parties.",
            "Your use of, or inability to use, the website, or your reliance on its general information.",
          ],
        },
        "Nothing in these Terms limits or excludes any liability that cannot be limited or excluded under applicable law.",
      ],
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      blocks: [
        "Our Privacy Policy explains how we collect, use and protect your personal information. It forms part of these Terms.",
        { link: { href: "/privacy-policy", label: "Read our Privacy Policy" } },
      ],
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      blocks: [
        "We may update these Terms from time to time. The latest version will always be on this page, with the date it was last updated shown at the top. By continuing to use our website or services after an update, you accept the updated Terms.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Disputes",
      blocks: [
        "These Terms are governed by the laws of India. If a dispute arises, please contact us first so that we can try to resolve it informally. Disputes that cannot be resolved in this way will be subject to the jurisdiction of the competent courts in India.",
      ],
    },
    {
      id: "contact",
      title: "Contact Information",
      blocks: ["If you have any questions about these Terms, please contact us:", { contact: true }],
    },
  ],
};
