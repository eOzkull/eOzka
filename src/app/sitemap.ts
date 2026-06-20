import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// Helper function to read the actual modification time of page files
function getPageLastModified(relativeFilePath: string): Date {
  try {
    const absolutePath = path.join(/*turbopackIgnore: true*/ process.cwd(), relativeFilePath);
    const stats = fs.statSync(absolutePath);
    return stats.mtime; // Returns the exact file edit time
  } catch {
    return new Date('2026-05-12T19:00:00Z'); // Secure fallback
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eozka.com';

  return [
    {
      url: `${baseUrl}/`,
      lastModified: getPageLastModified('src/app/page.tsx'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: getPageLastModified('src/app/products/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/mindspace`,
      lastModified: getPageLastModified('src/app/products/mindspace/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/management-systems`,
      lastModified: getPageLastModified('src/app/products/management-systems/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/airis-security`,
      lastModified: getPageLastModified('src/app/products/airis-security/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/paradigm-shift`,
      lastModified: getPageLastModified('src/app/products/paradigm-shift/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    {
      url: `${baseUrl}/products/entab-d`,
      lastModified: getPageLastModified('src/app/products/entab-d/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/members`,
      lastModified: getPageLastModified('src/app/members/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: getPageLastModified('src/app/community/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: getPageLastModified('src/app/templates/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/request-meeting`,
      lastModified: getPageLastModified('src/app/request-meeting/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community/ca`,
      lastModified: getPageLastModified('src/app/community/ca/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/social`,
      lastModified: getPageLastModified('src/app/social/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: getPageLastModified('src/app/blog/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/ai-vulnerability-scanner`,
      lastModified: getPageLastModified('src/app/blog/ai-vulnerability-scanner/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/flutter-health-tech`,
      lastModified: getPageLastModified('src/app/blog/flutter-health-tech/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // {
    //   url: `${baseUrl}/ventures/nolin`,
    //   lastModified: getPageLastModified('src/app/ventures/nolin/page.tsx'),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    {
      url: `${baseUrl}/community/achievements`,
      lastModified: getPageLastModified('src/app/community/achievements/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
