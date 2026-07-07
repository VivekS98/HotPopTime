import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Layout from "@/components/Layout";
import "./globals.css";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HotPopTime — Discover Movies & TV Shows",
  description:
    "Your premium destination to explore the hottest movies and TV shows. Discover popular, top-rated, now playing, and upcoming titles.",
  keywords: "movies, tv shows, cinema, streaming, popular movies, top rated",
  openGraph: {
    title: "HotPopTime — Discover Movies & TV Shows",
    description: "Your premium destination to explore movies and TV shows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.jpg" sizes="any" />
        <meta
          name="google-site-verification"
          content="7sZpLysoKU82i6xDWbR8mSoqwViic_1K42lA8Tt9fto"
        />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body>
        <Suspense fallback={<Loading />}>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
