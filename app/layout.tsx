import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Nova Shop — Premium Products Online",
  description: "Discover curated premium products at Nova Shop. Fast delivery, easy returns, and an exceptional shopping experience.",
  keywords: "ecommerce, shop, premium products, online store",
  openGraph: {
    title: "Nova Shop",
    description: "Premium products, delivered.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning={true}>
        <head>
          <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%234f46e5'/><text y='72' x='50' text-anchor='middle' font-size='60' font-family='Inter,sans-serif' fill='white' font-weight='bold'>N</text></svg>" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#4f46e5" />
        </head>
        <body
          className={`${inter.variable} antialiased`}
          suppressHydrationWarning={true}
          style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
