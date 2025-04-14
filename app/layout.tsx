import { ReactNode } from 'react';

export const metadata = {
  title: 'Ecommerce Sanity Website',
  description: 'An ecommerce website built with Next.js and Sanity.io',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}