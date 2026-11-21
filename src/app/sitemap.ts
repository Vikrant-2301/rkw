import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rameshkolhuwale.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      images: [
        `${baseUrl}/images/hero.jpg`,
        `${baseUrl}/logos/5.svg`,
      ],
    },
    {
      url: `${baseUrl}/stores`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.98,
      images: [
        `${baseUrl}/images/hero.jpg`,
      ],
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${baseUrl}/shelf`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/process`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/lab-reports`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: [
        `${baseUrl}/images/hero.jpg`,
      ],
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((product) => {
    const mainImg = product.image.startsWith('http') ? product.image : `${baseUrl}${product.image}`;
    const productImages = [mainImg];
    if (product.bottleImage) {
      productImages.push(product.bottleImage.startsWith('http') ? product.bottleImage : `${baseUrl}${product.bottleImage}`);
    }
    if (product.showcaseImage) {
      productImages.push(product.showcaseImage.startsWith('http') ? product.showcaseImage : `${baseUrl}${product.showcaseImage}`);
    }

    return {
      url: `${baseUrl}/product/${product.slug || product.id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.92,
      images: productImages,
    };
  });

  return [...staticPages, ...productPages];
}
