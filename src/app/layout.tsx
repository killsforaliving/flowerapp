import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Template Site',
  description: 'A template site with home, login, and profile pages',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-100 flex flex-col`}>
        <Navbar />
        <main className="container mx-auto flex-grow px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}