/* ==========================================================================
   Consultation form content (components/shared/AdvisorForm)
   ==========================================================================
   The four quick questions every consultation form on the site asks.
   ========================================================================== */
export const destinations = ["UK", "USA", "Canada", "Australia", "Germany", "Ireland", "Other"];
/* How each destination reads in the confirmation sentence */
export const destinationPhrase: Record<string, string> = {
  UK: "the UK",
  USA: "the USA",
  Other: "your chosen country",
};
export const studyLevels = ["Bachelor's", "Master's", "MBA", "Not Sure"];
export const intakes = ["2027 Jan", "2027 Sep", "2028", "Not sure"];

// Dialling codes for the WhatsApp number (India first; then main study and
// Gulf countries where many students' families live)
export const dialCodes = [
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+971", flag: "🇦🇪", country: "UAE" },
  { code: "+966", flag: "🇸🇦", country: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", country: "Qatar" },
  { code: "+965", flag: "🇰🇼", country: "Kuwait" },
  { code: "+968", flag: "🇴🇲", country: "Oman" },
  { code: "+973", flag: "🇧🇭", country: "Bahrain" },
  { code: "+44", flag: "🇬🇧", country: "United Kingdom" },
  { code: "+1", flag: "🇺🇸", country: "USA / Canada" },
  { code: "+61", flag: "🇦🇺", country: "Australia" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
  { code: "+353", flag: "🇮🇪", country: "Ireland" },
];

export const initialData = { destination: "", studyLevel: "", intake: "", dial: "+91", phone: "" };
export type FormData = typeof initialData;
