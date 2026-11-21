import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { ShopContent } from '@/components/ShopContent';
import { PRODUCTS } from '@/data/products';

const siteUrl = 'https://rameshkolhuwale.com';

export const metadata: Metadata = {
  title: 'Buy Pure Cold-Pressed Oils & Vedic Bilona Ghee Online Delhi NCR | Ramesh Kolhu Wale (RKW)',
  description:
    'Shop 100% pure, unrefined cold-pressed cooking oils (Yellow Mustard, Black Mustard, Groundnut, Sesame, Coconut, Badam Rogan) and authentic Vedic Bilona Desi Ghee by Ramesh Kolhu Wale (RKW). Chemical-free, batch-tested purity. Free home delivery in Delhi NCR above ₹799.',
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
    'RKW oils online',
    'rameshkolhuwale shop',
  ],
  alternates: {
    canonical: `${siteUrl}/shop`,
  },
  openGraph: {
    title: 'Shop All Pure Oils & Bilona Ghee | Ramesh Kolhu Wale (RKW)',
    description: '100% pure cold-pressed oils & authentic Vedic Bilona Ghee delivered fresh to your doorstep across Delhi NCR.',
    url: `${siteUrl}/shop`,
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Ramesh Kolhu Wale (RKW) Pure Cold-Pressed Oils & Ghee',
    description: 'Free home delivery in Delhi NCR on orders above ₹799.',
    images: ['/images/hero.jpg'],
  },
};

const shopJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Shop All Products',
          item: `${siteUrl}/shop`,
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      name: 'Pure Cold-Pressed Oils & Vedic Bilona Ghee Collection | Ramesh Kolhu Wale (RKW)',
      description:
        'Authentic cold-pressed edible oils and handcrafted Bilona Desi Ghee by Ramesh Kolhu Wale (RKW).',
      url: `${siteUrl}/shop`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'Ramesh Kolhu Wale (RKW)',
        url: siteUrl,
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: PRODUCTS.slice(0, 12).map((p, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${siteUrl}/product/${p.slug || p.id}`,
          name: p.name,
        })),
      },
    },
  ],
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
