import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NProgress from '@/components/layout/NProgress';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'MOVIEBASE',
  description: 'Your ultimate destination for movies and TV shows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased text-foreground flex flex-col min-h-screen">
        <Suspense>
          <NProgress />
        </Suspense>
        <Header />
        <main className="flex-grow bg-background/80 backdrop-blur-3xl">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
