import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mosaify — Photo Mosaic Generator",
    template: "%s | Mosaify",
  },
  description:
    "Transform your photos into stunning mosaic art. Choose from 4 unique styles, preview instantly, and download high-res results.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "Mosaify — Photo Mosaic Generator",
    description:
      "Transform your photos into stunning mosaic art. Choose from 4 unique styles, preview instantly, and download high-res results.",
    siteName: "Mosaify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mosaify — Photo Mosaic Generator",
    description:
      "Transform your photos into stunning mosaic art. Choose from 4 unique styles and download in high resolution.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
