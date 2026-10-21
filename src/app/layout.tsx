import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ComingSoonOverlay } from "@/components/ComingSoonOverlay";

export const metadata: Metadata = {
  title: "RKW - Ramesh Kolhu Wale | 100% Pure Wood-Pressed Oils & Vedic Bilona Ghee",
  description: "शुद्धता और स्वाद, हर बूँद में विश्वास - Ramesh Kolhu Wale (RKW). 100% Pure Lakdi Ki Ghani Cold-Pressed Mustard Oils, Authentic Vedic A2 Gir Cow Bilona Desi Ghee, Pure Badam Rogan & Seed Oils. Visit our Delhi NCR workshops or order online.",
  keywords: [
    "Ramesh Kolhu Wale",
    "RKW",
    "Lakdi ki Ghani",
    "Cold Pressed Mustard Oil",
    "Yellow Mustard Oil",
    "Black Mustard Oil",
    "Vedic Bilona Ghee",
    "A2 Gir Cow Ghee",
    "Badam Rogan",
    "Pure Wood Pressed Oil Delhi",
    "शुद्धता और स्वाद, हर बूँद में विश्वास"
  ],
  authors: [{ name: "Ramesh Kolhu Wale" }],
  openGraph: {
    title: "RKW - Ramesh Kolhu Wale | 100% Pure Ghani Oils & Desi Ghee",
    description: "Extracted live before your eyes. 100% Pure Lakdi Ki Ghani Oils and Vedic Bilona Desi Ghee.",
    url: "https://www.rameshkolhuwale.com",
    siteName: "Ramesh Kolhu Wale",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth scroll-pt-28">
      <body className="min-h-full flex flex-col bg-[#fcfbf7] text-stone-900 font-sans antialiased selection:bg-amber-300 selection:text-emerald-950">
        <CartProvider>
          <ComingSoonOverlay />
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
