import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/products',
        '/products/airis-security',
        '/products/paradigm-shift',
        '/products/entab-d',
        '/products/mindspace',
        '/products/management-systems',
        '/members',
        '/community',
        '/community/ca',
        '/templates',
        '/request-meeting',
        '/social',
        '/blog',
        '/blog/ai-vulnerability-scanner',
        '/blog/flutter-health-tech',
        // '/ventures/nolin',
        '/community/achievements',
      ],
      disallow: [
        '/api/',
        '/_next/static/',
        '/_next/image/',
        '/_next/data/',
        '/static/',
        '/*.json$',
      ],
    },
    sitemap: 'https://eozka.com/sitemap.xml',
  };
}
