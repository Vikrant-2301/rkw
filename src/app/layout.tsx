import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "RKW - Ramesh Kolhu Wale | Pure Wood-Pressed Oils & Vedic Bilona Ghee",
  description: "Ramesh Kolhu Wale (RKW) brings you 100% pure wood-pressed oils and authentic Vedic A2 Gir Cow Bilona Desi Ghee. Extracted fresh at our Delhi NCR workshops — order online or visit us in person.",
  keywords: [
    "Ramesh Kolhu Wale",
    "RKW",
    "Wood Pressed Oil",
    "Cold Pressed Mustard Oil",
    "Yellow Mustard Oil",
    "Black Mustard Oil",
    "Vedic Bilona Ghee",
    "A2 Gir Cow Ghee",
    "Badam Rogan",
    "Pure Ghani Oil Delhi",
  ],
  authors: [{ name: "Ramesh Kolhu Wale" }],
  openGraph: {
    title: "RKW - Ramesh Kolhu Wale | Pure Wood-Pressed Oils & Vedic Bilona Ghee",
    description: "Extracted live before your eyes. 100% pure wood-pressed oils and Vedic Bilona Desi Ghee from Ramesh Kolhu Wale.",
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
      <body className="min-h-full flex flex-col bg-[#FAF8F3] text-stone-900 font-sans antialiased selection:bg-amber-300 selection:text-emerald-950">
        <CartProvider>
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
