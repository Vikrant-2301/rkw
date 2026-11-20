import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopContent } from '@/components/ShopContent';

export const metadata: Metadata = {
  title: 'Buy Pure Cold-Pressed Oils & Vedic Bilona Ghee Online Delhi NCR | Ramesh Kolhu Wale',
  description:
    'Shop 100% pure, unrefined cold-pressed cooking oils (Yellow Mustard, Black Mustard, Groundnut, Sesame, Coconut, Badam Rogan) and authentic Vedic Bilona Desi Ghee. Chemical-free, batch-tested purity. Free home delivery in Delhi NCR above ₹799.',
  keywords: [
    'buy cold pressed oil online Delhi',
    'pure mustard oil online',
    'kachi ghani mustard oil buy online',
    'yellow mustard oil price Delhi',
    'black mustard oil price',
    'bilona cow ghee buy online',
    'desi buffalo ghee online',
    'cold pressed groundnut oil online',
    'cold pressed sesame oil Delhi',
    'cold pressed coconut oil India',
    'edible oil delivery Delhi NCR',
    'Ramesh Kolhu Wale shop',
  ],
  alternates: {
    canonical: 'https://rameshkolhuwale.com/shop',
  },
  openGraph: {
    title: 'Shop All Pure Oils & Bilona Ghee | Ramesh Kolhu Wale',
    description: '100% pure cold-pressed oils & authentic Vedic Bilona Ghee delivered fresh to your doorstep across Delhi NCR.',
    url: 'https://rameshkolhuwale.com/shop',
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630 }],
  },
};

const shopJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Pure Cold-Pressed Oils & Vedic Bilona Ghee Collection',
  description:
    'Authentic cold-pressed edible oils and handcrafted Bilona Desi Ghee by Ramesh Kolhu Wale.',
  url: 'https://rameshkolhuwale.com/shop',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Ramesh Kolhu Wale',
    url: 'https://rameshkolhuwale.com',
  },
};

export default function ShopPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center text-[#8A7E6E]">
            Loading collection...
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </>
  );
}
