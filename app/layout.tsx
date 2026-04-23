import { Inter } from "next/font/google";

import type { Metadata, Viewport } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = "https://bhalow.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bhalow — Shop fashion, jewelry, beauty & more",
    template: "%s · Bhalow",
  },
  description:
    "Bhalow is your online store for men's, women's, jewelry, perfume, watches, bags, shoes, and beauty. Fast US shipping, easy returns.",
  applicationName: "Bhalow",
  openGraph: {
    type: "website",
    siteName: "Bhalow",
    url: siteUrl,
    title: "Bhalow",
    description:
      "Shop men's, women's, jewelry, perfume, watches, bags, shoes, and beauty.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhalow",
    description:
      "Shop men's, women's, jewelry, perfume, watches, bags, shoes, and beauty.",
  },
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", inter.variable)}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
