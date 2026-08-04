import type { Metadata } from 'next';
import ThankYouPageClient from './thank-you-client';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your message has been received by the SynchroTech Race team.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return <ThankYouPageClient />;
}
