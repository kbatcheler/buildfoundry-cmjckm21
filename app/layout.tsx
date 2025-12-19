import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FINAL TEST v1.0.19',
  description: 'Verified fix: Both .ts and .js updated, no yarn.lock upload',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 ${inter.className}`}>
        <ThemeProvider attribute="class">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}