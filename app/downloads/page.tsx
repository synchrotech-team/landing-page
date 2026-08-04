import type { Metadata } from 'next';
import DownloadsPageClient from './downloads-client';

export const metadata: Metadata = {
  title: 'Software Downloads',
  description: 'Download the official SynchroTech Race Desktop Telemetry Suite for Windows — live cockpit displays, high-speed logging, and CAN Bus data processing.',
  alternates: {
    canonical: '/downloads',
  },
  openGraph: {
    title: 'Software Downloads | SynchroTech Race',
    description: 'Download the official SynchroTech Race Desktop Telemetry Suite for Windows.',
    url: '/downloads',
  },
};

export default function DownloadsPage() {
  return <DownloadsPageClient />;
}
