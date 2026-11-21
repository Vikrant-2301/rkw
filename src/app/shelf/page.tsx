import type { Metadata } from 'next';
import { ProductShelf } from '@/components/ui/skincare-product-shelf';

const siteUrl = 'https://rameshkolhuwale.com';

export const metadata: Metadata = {
  title: 'Interactive 3D Virtual Shelf | Ramesh Kolhu Wale (RKW)',
  description:
    'Interactive 3D shelf experience — inspect Ramesh Kolhu Wale (RKW) authentic cold-pressed oils and Vedic Bilona ghee bottles in 360 degrees.',
  keywords: [
    'RKW 3D shelf',
    'Ramesh Kolhu Wale products',
    'virtual oil shelf',
    'pure oils 3D showcase',
  ],
  alternates: {
    canonical: `${siteUrl}/shelf`,
  },
  openGraph: {
    title: 'Interactive 3D Virtual Shelf | Ramesh Kolhu Wale (RKW)',
    description: 'Inspect our authentic cold-pressed oils and Vedic Bilona ghee in 360 degrees.',
    url: `${siteUrl}/shelf`,
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630 }],
  },
};

const shelfJsonLd = {
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
          name: '3D Virtual Shelf',
          item: `${siteUrl}/shelf`,
        },
      ],
    },
  ],
};

export default function ShelfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shelfJsonLd) }}
      />
      <ProductShelf
        title="3D Virtual Shelf"
        subtitle="Interactive 360° collection — drag to rotate bottles, inspect purity stickers, and choose your volume"
      >
        <div className="text-center pb-12 pt-6">
          <p className="text-xs text-[#8A7E6E] font-medium tracking-wide">
            Every drop cold-pressed fresh in traditional cold-press ghanis · Ramesh Kolhu Wale (RKW)
          </p>
        </div>
      </ProductShelf>
    </>
  );
}
