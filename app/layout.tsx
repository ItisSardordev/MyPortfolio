import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const mono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Sardor — Designer · Programmer · Founder',
  description:
    'Independent designer, programmer, and founder crafting digital products at the intersection of aesthetics and engineering.',
   icons: {
    icon: './/lib/7dc78259-0ac0-454a-9672-d81f93a53331.png',
    shortcut: './/lib/7dc78259-0ac0-454a-9672-d81f93a53331.png',
    apple: './/lib/7dc78259-0ac0-454a-9672-d81f93a53331.png',
  },
  openGraph: {
    title: 'Sardor — Designer · Programmer · Founder',
    description:
      'Independent designer, programmer, and founder crafting digital products at the intersection of aesthetics and engineering.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${mono.variable} font-sans antialiased bg-ink text-paper selection:bg-paper selection:text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
