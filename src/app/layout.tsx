import type { Metadata } from "next";
import { Merriweather_Sans, Modak } from "next/font/google";
import Layout from "@/components/Layout";
import "./globals.css";
import { Suspense } from "react";

const merriweather_sans = Merriweather_Sans({
  subsets: ["latin"],
  variable: "--font-merriweather",
});
const modak = Modak({
  subsets: ["latin"],
  variable: "--font-modak",
  weight: "400",
});

export const metadata: Metadata = {
  title: "HotPopTime",
  description: "A greate place to explore movies and shows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.jpg" sizes="any" />
        <meta
          name="google-site-verification"
          content="7sZpLysoKU82i6xDWbR8mSoqwViic_1K42lA8Tt9fto"
        />
      </head>
      <body className={`${merriweather_sans.variable} ${modak.variable}`}>
        <Suspense>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
