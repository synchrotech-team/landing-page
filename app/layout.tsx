import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'SynchroTech Race - Precision Telemetry',
  description: 'Precision telemetry systems for racers who demand data-driven performance. Capture, analyze, and optimize your performance with real-time data streaming.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${outfit.variable}`}>
      <body className="antialiased" style={{ fontFamily: 'var(--font-outfit), sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
