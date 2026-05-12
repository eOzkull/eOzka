import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/members',
        '/social',
        '/blog',
        '/blog/ai-vulnerability-scanner',
        '/blog/flutter-health-tech',
        '/ventures/moce',
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
