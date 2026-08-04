import type { Metadata } from 'next';
import ProductsPageClient from './products-client';

export const metadata: Metadata = {
  title: 'Racing Hardware Catalog',
  description: 'Browse SynchroTech Race telemetry hardware — Nexus One 4G LTE hub, Joulemeter energy logger, and Display cockpit dashboard. Precision systems for race-day data.',
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Racing Hardware Catalog | SynchroTech Race',
    description: 'Browse SynchroTech Race telemetry hardware — Nexus One 4G LTE hub, Joulemeter energy logger, and Display cockpit dashboard.',
    url: '/products',
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
