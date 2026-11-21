import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Bilona Ghee',
    short_name: 'RKW Oils',
    description:
      'Order 100% pure, unrefined cold-pressed oils extracted live and authentic A2 Vedic Bilona Ghee from Ramesh Kolhu Wale. Delhi NCR delivery & 4 live units.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F3',
    theme_color: '#0E2A47',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    categories: ['shopping', 'food', 'lifestyle'],
    lang: 'en-IN',
  };
}
