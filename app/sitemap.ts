import type { MetadataRoute } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';

const SITE_URL = 'https://synchrotech.site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/downloads`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = Object.keys(PRODUCTS_DATA).map((slug) => ({
    url: `${SITE_URL}/products/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
