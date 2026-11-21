import type { Metadata } from 'next';
import ContactExperience from '@/components/contact';

const siteUrl = 'https://rameshkolhuwale.com';

export const metadata: Metadata = {
  title: 'Contact Us & Visit Units | Customer Support | Ramesh Kolhu Wale (RKW)',
  description:
    'Contact Ramesh Kolhu Wale (RKW) customer support or visit our 4 live extraction units across Delhi NCR. Call/WhatsApp +91 9217744380 for pure cold-pressed oils & Vedic Bilona Ghee.',
  keywords: [
    'contact Ramesh Kolhu Wale',
    'RKW customer care',
    'rameshkolhuwale phone number',
    'RKW WhatsApp order',
    'cold pressed oil shop contact Delhi',
    'Ramesh Kolhu Wale address',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Ramesh Kolhu Wale (RKW) | Customer Support & Units',
    description: 'Call or WhatsApp +91 9217744380. Open all 7 days 10:00 AM – 8:30 PM across 4 units in Delhi NCR.',
    url: `${siteUrl}/contact`,
    images: [{ url: '/images/hero.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Ramesh Kolhu Wale (RKW)',
    description: 'Customer care and store contact details for Delhi NCR.',
    images: ['/images/hero.jpg'],
  },
};

const contactJsonLd = {
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
          name: 'Contact & Support',
          item: `${siteUrl}/contact`,
        },
      ],
    },
    {
      '@type': 'ContactPage',
      name: 'Contact Ramesh Kolhu Wale (RKW)',
      description: 'Customer service, store locations, and WhatsApp ordering for Ramesh Kolhu Wale.',
      url: `${siteUrl}/contact`,
      mainEntity: {
        '@type': 'Organization',
        name: 'Ramesh Kolhu Wale',
        alternateName: 'RKW',
        telephone: '+91-9217744380',
        email: 'care@rameshkolhuwale.com',
        url: siteUrl,
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactExperience />
    </>
  );
}
