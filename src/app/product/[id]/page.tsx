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
      title: 'Product Not Found | Ramesh Kolhu Wale',
      description: 'The requested pure cold-pressed oil or ghee product could not be found.',
    };
  }

  const siteUrl = 'https://rameshkolhuwale.com';
  const canonicalUrl = `${siteUrl}/product/${product.slug || product.id}`;
  const title = `Buy Pure ${product.name} Online Delhi NCR | Ramesh Kolhu Wale`;
  const description = `${product.shortDesc} 100% pure, unrefined, chemical-free cold pressed in traditional slow-speed Kolhu since 1981. Handcrafted purity. Free home delivery in Delhi NCR on orders above ₹799.`;

  return {
    title,
    description,
    keywords: [
      product.name,
      product.hindiName,
      `buy ${product.name} online`,
      `${product.name} price Delhi`,
      'cold pressed oil near me',
      'edible oil near me',
      'pure cooking oil Delhi',
      'Ramesh Kolhu Wale',
      'RKW Oils',
      'Kachi Ghani cold pressed',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.name} | Ramesh Kolhu Wale`,
      description,
      url: canonicalUrl,
      siteName: 'Ramesh Kolhu Wale',
      type: 'website',
      images: [
        {
          url: product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Ramesh Kolhu Wale`,
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

  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [product.image.startsWith('http') ? product.image : `${siteUrl}${product.image}`],
    description: product.description,
    sku: `RKW-${product.id}`,
    mpn: `RKW-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'Ramesh Kolhu Wale',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.slug || product.id}`,
      priceCurrency: 'INR',
      price: defaultVolume.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Ramesh Kolhu Wale',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
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
