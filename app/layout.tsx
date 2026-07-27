import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'SynchroTech Race — Precision Motorsport Telemetry',
  description: 'Advanced telemetry systems for racers who demand data-driven performance. Real-time streaming, 25Hz GNSS, 24-bit ADC, and 4G LTE integration.',
  icons: {
    icon: '/logogram.png',
    shortcut: '/logogram.png',
    apple: '/logogram.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/logogram.png" type="image/png" />
        <link rel="shortcut icon" href="/logogram.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logogram.png" />
      </head>
      <body className="antialiased bg-background text-white font-sans selection:bg-purple-electric selection:text-white">
        {children}
      </body>
    </html>
  );
}
