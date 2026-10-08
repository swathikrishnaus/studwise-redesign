/* ==========================================================================
   Homepage — "Head office / Branch office"
   ==========================================================================
   Details come from studwise.in/contact-us. Map queries match the
   embeds on the live homepage.
   ========================================================================== */

export type Office = {
  kind: "Head office" | "Branch office";
  city: string;
  address?: string;
  phones: string[];
  emails: string[];
  /** Google Maps search used for the embed and the directions link */
  mapQuery?: string;
  comingSoon?: boolean;
};

export const offices: Office[] = [
  {
    kind: "Head office",
    city: "Manjeri",
    address: "Rajiv Gandhi Bypass, near Malabar Hospital, Melakkam, Manjeri, Kerala 676121",
    phones: ["+91 91136 50884"],
    emails: ["info@studwise.in", "istudwise@gmail.com"],
    mapQuery: "studwise",
  },
  {
    kind: "Branch office",
    city: "Valanchery",
    address: "Konnakkattil Towers 2nd Floor Calicut road Valanchery Kerala",
    phones: ["+91 75106 50884"],
    emails: ["istudwise@gmail.com"],
    mapQuery: "studwise valanchery",
  },
  {
    kind: "Branch office",
    city: "Calicut",
    phones: ["+91 75919 80298"],
    emails: ["istudwise@gmail.com"],
    comingSoon: true,
  },
];

export const mapEmbedUrl = (query: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=m&z=14&output=embed&iwloc=near`;

export const directionsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
