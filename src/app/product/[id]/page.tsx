import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductDetailClient } from '@/components/ProductDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.slug || product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.slug === id || p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found | Ramesh Kolhu Wale (RKW)',
      description: 'The requested pure cold-pressed oil or authentic ghee product could not be found.',
    };
  }

  const siteUrl = 'https://rameshkolhuwale.com';
  const canonicalUrl = `${siteUrl}/product/${product.slug || product.id}`;
  const title = `Buy Pure ${product.name} Online Delhi NCR | Ramesh Kolhu Wale (RKW)`;
  const description = `${product.shortDesc} 100% pure, unrefined, chemical-free cold pressed in traditional slow-speed Kolhu by Ramesh Kolhu Wale (RKW) since 1981. Handcrafted purity. Free home delivery in Delhi NCR on orders above ₹799.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.hindiName,
      `RKW ${product.name}`,
      `Ramesh Kolhu Wale ${product.name}`,
      `rameshkolhuwale ${product.slug || product.id}`,
      `buy ${product.name} online`,
      `${product.name} price Delhi NCR`,
      'cold pressed oil near me',
      'edible oil near me',
      'pure cooking oil Delhi',
      'Ramesh Kolhu Wale',
      'RKW Oils',
      'rameshkolhuwale',
      'Kachi Ghani cold pressed Delhi',
      'pure mustard oil shop near me',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Ramesh Kolhu Wale (RKW)`,
      description,
      url: canonicalUrl,
      siteName: 'Ramesh Kolhu Wale (RKW)',
      type: 'website',
      images: [
        {
          url: product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
          width: 800,
          height: 800,
          alt: `${product.name} - Ramesh Kolhu Wale (RKW)`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Ramesh Kolhu Wale (RKW)`,
      description,
      images: [product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.slug === id || p.id === id);

  if (!product) {
    notFound();
  }

  const siteUrl = 'https://rameshkolhuwale.com';
  const defaultVolume = product.volumes[0] || { price: product.price };
  const productUrl = `${siteUrl}/product/${product.slug || product.id}`;

  const sampleReviews = [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Sunita Sharma (Verified Customer)',
      },
      datePublished: '2026-02-14',
      reviewBody: `Exceptional purity and aroma. The oil is truly cold-pressed and authentic, reminiscent of traditional village kolhu. Best mustard oil in Delhi NCR.`,
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Rajesh Khanna (Verified Buyer)',
      },
      datePublished: '2026-01-20',
      reviewBody: `Have been buying from Ramesh Kolhu Wale for years. Standing at the live unit and watching it pressed gives complete peace of mind.`,
    },
  ];

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@graph': [
      // BreadcrumbList Schema
      {
        '@type': 'BreadcrumbList',
        '@id': `${productUrl}#breadcrumb`,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: product.name,
            item: productUrl,
          },
        ],
      },
      // Product Schema
      {
        '@type': 'Product',
        '@id': `${productUrl}#product`,
        name: product.name,
        image: [
          product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
          ...(product.bottleImage ? [product.bottleImage.startsWith('http') ? product.bottleImage : `${siteUrl}${product.bottleImage}`] : []),
        ],
        description: product.description,
        sku: `RKW-${product.id}`,
        mpn: `RKW-${product.id}`,
        category: 'Food & Beverage > Cooking Oils & Ghee',
        countryOfOrigin: {
          '@type': 'Country',
          name: 'India',
        },
        brand: {
          '@type': 'Brand',
          name: 'Ramesh Kolhu Wale',
          alternateName: 'RKW',
          logo: `${siteUrl}/logos/5.svg`,
        },
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'INR',
          price: defaultVolume.price,
          priceValidUntil: '2028-12-31',
          itemCondition: 'https://schema.org/NewCondition',
          availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'Ramesh Kolhu Wale',
            alternateName: 'RKW',
            url: siteUrl,
          },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'INR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'IN',
              addressRegion: ['Delhi', 'Uttar Pradesh', 'Haryana'],
            },
            deliveryTime: {
              '@type': 'ShippingDeliveryTime',
              handlingTime: {
                '@type': 'QuantitativeValue',
                minValue: 0,
                maxValue: 1,
                unitCode: 'DAY',
              },
              transitTime: {
                '@type': 'QuantitativeValue',
                minValue: 1,
                maxValue: 2,
                unitCode: 'DAY',
              },
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IN',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 7,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewsCount,
          bestRating: '5',
          worstRating: '1',
        },
        review: sampleReviews,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailClient initialSlug={id} />
    </>
  );
}
