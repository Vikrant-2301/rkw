import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://rameshkolhuwale.com';

  const publicAllow = [
    '/',
    '/shop',
    '/stores',
    '/shelf',
    '/process',
    '/about',
    '/lab-reports',
    '/contact',
    '/product/',
  ];

  const privateDisallow = [
    '/checkout',
    '/admin',
    '/track',
    '/api/',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: publicAllow,
        disallow: privateDisallow,
      },
      // Google search and Gemini AI Crawlers
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Google-Extended'],
        allow: '/',
        disallow: privateDisallow,
      },
      // Bing / Microsoft Copilot
      {
        userAgent: ['Bingbot', 'msnbot'],
        allow: '/',
        disallow: privateDisallow,
      },
      // OpenAI ChatGPT / SearchGPT Crawlers
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User'],
        allow: '/',
        disallow: privateDisallow,
      },
      // Perplexity AI Search Crawler
      {
        userAgent: ['PerplexityBot'],
        allow: '/',
        disallow: privateDisallow,
      },
      // Anthropic Claude
      {
        userAgent: ['ClaudeBot', 'anthropic-ai'],
        allow: '/',
        disallow: privateDisallow,
      },
      // Apple Intelligence
      {
        userAgent: ['Applebot', 'Applebot-Extended'],
        allow: '/',
        disallow: privateDisallow,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
