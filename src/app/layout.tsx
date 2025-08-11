import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LayoutContainer, MainContent } from '@/components/Layout';
import Sidebar from '@/components/Sidebar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'World Bank Dashboard',
  description: 'World Bank project dashboard with filters and analytics',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <LayoutContainer>
          <Sidebar />
          <MainContent>{children}</MainContent>
        </LayoutContainer>
      </body>
    </html>
  );
}
