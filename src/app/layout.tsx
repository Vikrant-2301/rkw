import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import { SITE_CONFIG } from "@/config/site";

const siteUrl = "https://www.rameshkolhuwale.com";

export const viewport: Viewport = {
  themeColor: "#0E2A47",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Vedic Bilona Ghee",
    template: "%s | Ramesh Kolhu Wale",
  },
  description:
    "Ramesh Kolhu Wale (RKW) — Est. 1981. 100% pure, unrefined, chemical-free cold-pressed oils (Mustard, Groundnut, Sesame, Coconut, Badam Rogan) extracted live and authentic Bilona Desi Ghee (Cow & Buffalo) in Delhi NCR. Unit hours 10:00 AM - 8:30 PM. Free home delivery in Delhi NCR above ₹799 (₹100 below ₹799).",
  keywords: [
    "Ramesh Kolhu Wale",
    "RKW Oils",
    "Cold Pressed Oil",
    "Cold Pressed Mustard Oil",
    "Kachi Ghani Mustard Oil",
    "Yellow Mustard Oil",
    "Black Mustard Oil",
    "Bilona Ghee",
    "Desi Cow Ghee",
    "Desi Buffalo Ghee",
    "Dahi Bilona Ghee",
    "Pure Badam Rogan Almond Oil",
    "Cold Pressed Coconut Oil",
    "Cold Pressed Sesame Oil",
    "Cold Pressed Groundnut Oil",
    "Pure Cooking Oil Delhi NCR",
    "Unrefined Edible Oil India",
  ],
  authors: [{ name: "Ramesh Kolhu Wale", url: siteUrl }],
  creator: "Ramesh Kolhu Wale",
  publisher: "Ramesh Kolhu Wale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Bilona Desi Ghee",
    description:
      "100% chemical-free cold-pressed oils and pure Bilona Desi Ghee. Fresh, authentic, delivered across Delhi NCR with free home delivery above ₹799.",
    url: siteUrl,
    siteName: "Ramesh Kolhu Wale",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Ramesh Kolhu Wale — Pure Traditional Cold-Pressed Oils and Bilona Ghee",
      },
      {
        url: "/logos/5.svg",
        width: 800,
        height: 350,
        alt: "Ramesh Kolhu Wale Official Brand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Bilona Desi Ghee",
    description:
      "Traditional cold-pressed oils and Bilona Desi Ghee crafted with pride in Delhi NCR since 1981. Unit hours 10:00 AM - 8:30 PM.",
    images: ["/images/hero.jpg"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Ramesh Kolhu Wale",
        "alternateName": ["RKW", "RKW Pure Oils"],
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logos/5.svg`,
          "caption": "Ramesh Kolhu Wale Logo",
        },
        "description": "Manufacturer and retailer of authentic cold-pressed oils and pure Bilona Desi Ghee since 1981.",
        "foundingDate": "1981",
        "sameAs": [
          "https://instagram.com/rameshkolhuwale",
          "https://facebook.com/rameshkolhuwale",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#localbusiness`,
        "name": "Ramesh Kolhu Wale",
        "image": `${siteUrl}/images/hero.jpg`,
        "url": siteUrl,
        "telephone": "+91-9217744380",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B-2, Village Khurreji Khas, West Laxmi Market, Nr. HP Petrol Pump (Opp. Samuday Bhawan)",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110051",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "28.6989",
          "longitude": "77.1384",
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Ramesh Kolhu Wale",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/shop?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full scroll-smooth scroll-pt-28" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F3] text-stone-900 font-sans antialiased selection:bg-amber-300 selection:text-[#0E2A47]">
        <CartProvider>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CartDrawer />
          <WhatsAppOrderButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
