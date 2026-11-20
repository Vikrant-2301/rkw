import React from 'react';
import type { Metadata } from 'next';
import { StoreLocatorSection } from '@/components/StoreLocatorSection';
import { SITE_CONFIG } from '@/config/site';
import { FiClock, FiTruck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Cold-Pressed Oil & Bilona Ghee Stores Near Me | 4 Units Delhi NCR | Ramesh Kolhu Wale',
  description:
    'Find pure cold-pressed oil and authentic Vedic Bilona Ghee near you in Delhi NCR. Visit Ramesh Kolhu Wale live extraction units in Khureji Khas, New Ashok Nagar, Maujpur & Karawal Nagar. Open all 7 days 10:00 AM – 8:30 PM. Free doorstep delivery above ₹799.',
  keywords: [
    'edible oil near me',
    'cold pressed oil near me',
    'mustard oil shop near me',
    'kachi ghani mustard oil near me',
    'oil mill near me',
    'bilona ghee shop near me',
    'desi cow ghee near me',
    'oil extraction mill Delhi',
    'cold pressed oil East Delhi',
    'mustard oil Khureji Khas',
    'oil shop New Ashok Nagar',
    'cold pressed oil Maujpur',
    'ghee shop Karawal Nagar',
    'mustard oil shop Laxmi Nagar',
    'pure oil store Preet Vihar',
    'cold press oil mill Shahdara',
    'pure mustard oil Delhi NCR',
    'Ramesh Kolhu Wale store locations',
  ],
  alternates: {
    canonical: 'https://rameshkolhuwale.com/stores',
  },
  openGraph: {
    title: 'Find Ramesh Kolhu Wale Stores & Live Oil Extraction Units in Delhi NCR',
    description: 'Visit our 4 live cold-press units in Delhi NCR to watch pure oils extracted fresh before your eyes, or get doorstep delivery.',
    url: 'https://rameshkolhuwale.com/stores',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630 }],
  },
};

const storesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "GroceryStore",
        "name": "Ramesh Kolhu Wale - Khureji Khas Unit",
        "telephone": "+91-9217744381",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B-2, Village Khurreji Khas, West Laxmi Market, Nr. HP Petrol Pump (Opp. Samuday Bhawan)",
          "addressLocality": "East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110051",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6446813,
          "longitude": 77.2800298
        },
        "hasMap": "https://maps.app.goo.gl/y1iW6qWyyDJ5TTU7A",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30"
          }
        ]
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "GroceryStore",
        "name": "Ramesh Kolhu Wale - New Ashok Nagar Unit",
        "telephone": "+91-9217744382",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "A-688, New Ashok Nagar, Near DPA Public School",
          "addressLocality": "East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110096",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.594224,
          "longitude": 77.3112919
        },
        "hasMap": "https://maps.app.goo.gl/R5WSvmgL81Yp3CPB6",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30"
          }
        ]
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "GroceryStore",
        "name": "Ramesh Kolhu Wale - Maujpur Unit",
        "telephone": "+91-9217744380",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Road Maujpur",
          "addressLocality": "North East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110053",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6967,
          "longitude": 77.2763
        },
        "hasMap": "https://maps.google.com/?q=Maujpur+Main+Road+Delhi+110053",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30"
          }
        ]
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "GroceryStore",
        "name": "Ramesh Kolhu Wale - Karawal Nagar Unit",
        "telephone": "+91-9217744380",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Karawal Nagar Road",
          "addressLocality": "North East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110094",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.713226318359375,
          "longitude": 77.26315307617188
        },
        "hasMap": "https://www.google.com/maps?q=28.713226318359375,77.26315307617188",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30"
          }
        ]
      }
    }
  ]
};

export default function StoresPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storesJsonLd) }}
      />
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#FAF8F3] to-[#F2EEE5] py-16 sm:py-20 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3 font-semibold">Store Locator</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal leading-tight">
            Our Experience Stores &amp; Units
          </h1>
          <p className="text-[#5A5248] text-base sm:text-lg mt-4 font-light leading-relaxed">
            Visit our Units to see seeds cold-pressed before your eyes, or have fresh oils &amp; pure Bilona ghee delivered free to your doorstep in Delhi NCR on orders above ₹799.
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-[#0E2A47]">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full border border-[#163A60]/10 shadow-xs">
              <FiClock className="w-3.5 h-3.5 text-[#B8860B]" /> Hours: {SITE_CONFIG.contact.unitHours}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full border border-[#163A60]/10 shadow-xs">
              <FiTruck className="w-3.5 h-3.5 text-[#B8860B]" /> Free Home Delivery Above ₹799 (₹100 under ₹799)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full border border-[#163A60]/10 shadow-xs">
              <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp Order: {SITE_CONFIG.contact.whatsapp}
            </span>
          </div>
        </div>
      </section>

      {/* Main Locator Section */}
      <StoreLocatorSection showTitle={false} />
    </main>
  );
}
