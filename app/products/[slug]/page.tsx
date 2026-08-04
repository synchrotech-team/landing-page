import type { Metadata } from 'next';
import { PRODUCTS_DATA } from '@/lib/products';
import ProductDetailPageClient from './product-detail-client';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(PRODUCTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug];

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const title = `${product.name} — ${product.category}`;
  const description = product.description;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title: `${title} | SynchroTech Race`,
      description,
      url: `/products/${slug}`,
      images: [{ url: product.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | SynchroTech Race`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug];

  const productJsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        category: product.category,
        image: `https://synchrotech.site${product.image}`,
        brand: { '@type': 'Brand', name: 'SynchroTech Race' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: product.price.replace(/[^0-9]/g, ''),
          availability: 'https://schema.org/InStock',
          url: `https://synchrotech.site/products/${slug}`,
        },
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ProductDetailPageClient slug={slug} />
    </>
  );
}
