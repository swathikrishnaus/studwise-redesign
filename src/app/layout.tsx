import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Footer from "@/components/layout/Footer";

/* --------------------------------------------------------------------------
   Font Configuration
   --------------------------------------------------------------------------
   GoogleSans Variable is used as the primary sans-serif font.
   Geist Mono is retained for monospace/code contexts.
   -------------------------------------------------------------------------- */
const fontSans = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSans-VariableFont_GRAD,opsz,wght.ttf",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Italic-VariableFont_GRAD,opsz,wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

const fontMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/* --------------------------------------------------------------------------
   Metadata
   -------------------------------------------------------------------------- */
export const metadata: Metadata = {
  title: {
    default: "Studwise — Study Abroad Consultants",
    template: "%s | Studwise",
  },
  description:
    "Studwise helps students find the right universities, courses, and study destinations abroad. Expert guidance for your international education journey.",
  metadataBase: new URL("https://studwise.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://studwise.in",
    siteName: "Studwise",
    title: "Studwise — Study Abroad Consultants",
    description:
      "Expert guidance for your international education journey. Find universities, courses, and study destinations abroad.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studwise — Study Abroad Consultants",
    description:
      "Expert guidance for your international education journey.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#009cd9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* --------------------------------------------------------------------------
   Root Layout
   -------------------------------------------------------------------------- */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {/* Header will be added during the redesign phase */}

        <SmoothScroll />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
