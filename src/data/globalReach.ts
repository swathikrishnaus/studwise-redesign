/* ==========================================================================
   Homepage — "Our Students Across The Globe" and "Universities"
   ==========================================================================
   The study destinations on Studwise's own flag graphic, in its order;
   partner university logos are transcribed from the live studwise.in.
   The headline figures are the client-provided fact sheet (October 2026):
   confirm before launch.
   ========================================================================== */

export type Destination = {
  country: string;
  /** ISO 3166 code — matches /public/flags/{code}.svg */
  code: string;
  /** Crop for the round token, where the flag's emblem sits off-centre */
  focus?: string;
};

export const destinations: Destination[] = [
  { country: "UK", code: "gb" },
  { country: "USA", code: "us" },
  { country: "Ireland", code: "ie" },
  { country: "Canada", code: "ca" },
  { country: "France", code: "fr" },
  { country: "Germany", code: "de" },
  { country: "Latvia", code: "lv" },
  { country: "Finland", code: "fi" },
  { country: "Australia", code: "au" },
  { country: "Malta", code: "mt", focus: "12% 50%" },
  { country: "Denmark", code: "dk" },
];

export const reachTotals = { students: 550, countries: "14+" };

export const universitiesIntro =
  "Adding to our reputation, we have partnered with top-notch universities across the globe for delivering high-quality abroad education.";

/** Logos: official marks from each university's Wikipedia/Wikimedia page
    (BPP from bpp.com), trimmed to their artwork — public/logos/universities */
export type PartnerUniversity = {
  name: string;
  logo: string;
  /** Logo is a crest/monogram without the full name, so show it alongside */
  showName?: boolean;
};

export const partnerUniversities: PartnerUniversity[] = [
  { name: "Ravensbourne", logo: "/logos/universities/ravensbourne.png" },
  { name: "University of Roehampton London", logo: "/logos/universities/university-of-roehampton-london.png" },
  { name: "Canterbury Christ Church University", logo: "/logos/universities/canterbury-christ-church-university.png", showName: true },
  { name: "University of Wales Trinity Saint David", logo: "/logos/universities/university-of-wales-trinity-saint-david.png" },
  { name: "University of Central Lancashire", logo: "/logos/universities/university-of-central-lancashire.png" },
  { name: "University of Greenwich", logo: "/logos/universities/university-of-greenwich.png" },
  { name: "University of Northampton", logo: "/logos/universities/university-of-northampton.png", showName: true },
  { name: "University of Chester", logo: "/logos/universities/university-of-chester.png" },
  { name: "University of East London", logo: "/logos/universities/university-of-east-london.png" },
  { name: "BPP University", logo: "/logos/universities/bpp-university.png" },
  { name: "Anglia Ruskin University", logo: "/logos/universities/anglia-ruskin-university.png" },
  { name: "Middlesex University London", logo: "/logos/universities/middlesex-university-london.png" },
  { name: "Sheffield Hallam University", logo: "/logos/universities/sheffield-hallam-university.png" },
  { name: "University of Hertfordshire", logo: "/logos/universities/university-of-hertfordshire.png" },
  { name: "Coventry University", logo: "/logos/universities/coventry-university.png" },
  { name: "University of the West of Scotland", logo: "/logos/universities/university-of-the-west-of-scotland.png" },
  { name: "Edinburgh Napier University", logo: "/logos/universities/edinburgh-napier-university.png" },
];
