import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Engineering Blog | Open-Source Tech & AI Security | eOzka',
  description:
    'Read insights from the eOzka engineering team. We write about building open-source AI scanners, health tech projects, and scaling a venture studio.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'article',
    url: 'https://eozka.com/blog/',
    title: 'Engineering Blog | Open-Source Tech & AI Security | eOzka',
    description:
      'Read insights from the eOzka engineering team. We write about building open-source AI scanners, health tech projects, and scaling a venture studio.',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
