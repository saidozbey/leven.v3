import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { settings } from '@/config/settings';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `${settings.app.name} - ${settings.app.tagline}`,
  description: 'AI-powered design studio for product visualization and prototyping',
  keywords: ['AI', 'design', 'product design', 'visualization', 'prototyping'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={settings.app.locale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
