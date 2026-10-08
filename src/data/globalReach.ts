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

export const partnerUniversities = [
  "Ravensbourne",
  "University of Roehampton London",
  "Canterbury Christ Church University",
  "University of Wales Trinity Saint David",
  "University of Central Lancashire",
  "University of Greenwich",
  "University of Northampton",
  "University of Chester",
  "University of East London",
  "BPP University",
  "Anglia Ruskin University",
  "Middlesex University London",
  "Sheffield Hallam University",
  "University of Hertfordshire",
  "Coventry University",
  "University of the West of Scotland",
  "Edinburgh Napier University",
];
