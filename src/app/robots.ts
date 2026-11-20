import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://rameshkolhuwale.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/shop',
          '/stores',
          '/shelf',
          '/process',
          '/about',
          '/lab-reports',
          '/contact',
          '/product/',
        ],
        disallow: [
          '/checkout',
          '/admin',
          '/track',
          '/api/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/checkout',
          '/admin',
          '/track',
          '/api/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/checkout',
          '/admin',
          '/track',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
