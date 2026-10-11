/* ==========================================================================
   Homepage — "Our Students Across The Globe" and "Universities"
   ==========================================================================
   Offer counts and partner universities are transcribed from the images
   on the live studwise.in homepage.
   ========================================================================== */

export type CountryOffers = {
  country: string;
  /** ISO 3166 code — matches /public/flags/{code}.svg */
  code: string;
  offers: number;
};

export const countryOffers: CountryOffers[] = [
  { country: "UK", code: "gb", offers: 7000 },
  { country: "Canada", code: "ca", offers: 3500 },
  { country: "USA", code: "us", offers: 2000 },
  { country: "Germany", code: "de", offers: 2000 },
  { country: "Ireland", code: "ie", offers: 1000 },
  { country: "Malta", code: "mt", offers: 1000 },
  { country: "India", code: "in", offers: 900 },
  { country: "France", code: "fr", offers: 600 },
  { country: "China", code: "cn", offers: 300 },
  { country: "New Zealand", code: "nz", offers: 300 },
  { country: "Spain", code: "es", offers: 300 },
  { country: "Italy", code: "it", offers: 60 },
  { country: "South Korea", code: "kr", offers: 30 },
  { country: "Switzerland", code: "ch", offers: 20 },
  { country: "Singapore", code: "sg", offers: 20 },
  { country: "Finland", code: "fi", offers: 20 },
  { country: "Belgium", code: "be", offers: 20 },
  { country: "Poland", code: "pl", offers: 10 },
  { country: "Netherlands", code: "nl", offers: 10 },
  { country: "Hong Kong", code: "hk", offers: 10 },
  { country: "Russia", code: "ru", offers: 10 },
];

export const totalOffers = countryOffers.reduce((sum, c) => sum + c.offers, 0);

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
