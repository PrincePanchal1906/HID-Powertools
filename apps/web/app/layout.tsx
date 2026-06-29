import React from 'react';
import type { Metadata } from 'next';
import { Inter, Barlow_Condensed } from 'next/font/google';
import '../styles/theme.css';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { MobileSearchOverlay } from '@/components/layout/MobileSearchOverlay';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { getCurrentUser } from '@/lib/auth/helpers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const barlowCondensed = Barlow_Condensed({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow-condensed',
});

export const metadata: Metadata = {
  title: 'HID PowerTools — Professional Power Tools India',
  description: 'Industrial-grade power tools trusted by 50,000+ contractors. Free shipping, 2-year warranty, same-day delivery across India.',
  keywords: 'power tools india, professional tools, contractor tools, drill, grinder, circular saw',
  openGraph: {
    title: 'HID PowerTools',
    description: 'Professional power tools for serious contractors.',
    url: 'https://hidpowertools.com',
    siteName: 'HID PowerTools',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body className="bg-white text-text antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { navigator.serviceWorker.getRegistrations().then(function(r) { r.forEach(function(sw) { sw.unregister() }) }) }`,
          }}
        />
        <ScrollProgress />
        <Navbar user={user} />
        <MobileSearchOverlay />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
