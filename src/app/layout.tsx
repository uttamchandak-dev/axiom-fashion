import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/search/SearchOverlay";
import CookieBanner from "@/components/ui/CookieBanner";
import AnalyticsScripts from "@/components/layout/AnalyticsScripts";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AXIOM — Premium Fashion",
    template: "%s | AXIOM",
  },
  description:
    "Premium fashion crafted with intention. Explore our collections of contemporary menswear, womenswear, and unisex essentials.",
  keywords: [
    "fashion",
    "premium",
    "luxury",
    "clothing",
    "menswear",
    "womenswear",
    "contemporary",
  ],
  openGraph: {
    title: "AXIOM — Premium Fashion",
    description: "Premium fashion crafted with intention.",
    type: "website",
    locale: "en_US",
    siteName: "AXIOM",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  name: 'AXIOM',
                  url: 'https://axiom-fashion.com', // placeholder domain
                  logo: 'https://axiom-fashion.com/images/logo.png',
                },
                {
                  '@type': 'WebSite',
                  name: 'AXIOM',
                  url: 'https://axiom-fashion.com',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: 'https://axiom-fashion.com/search?q={search_term_string}',
                    'query-input': 'required name=search_term_string',
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <MobileNav />
          <CartDrawer />
          <SearchOverlay />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
          <Suspense fallback={null}>
            <AnalyticsScripts />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
