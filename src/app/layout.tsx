import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
   src: './fonts/GeistVF.woff',
   variable: '--font-geist-sans',
   weight: '100 900',
});
const geistMono = localFont({
   src: './fonts/GeistMonoVF.woff',
   variable: '--font-geist-mono',
   weight: '100 900',
});

export const metadata: Metadata = {
   title: 'Fashionista',
   description: 'このアプリは、季節や気温に合わせたコーディネートを提案します。',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='ja'>
         <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
      </html>
   );
}
