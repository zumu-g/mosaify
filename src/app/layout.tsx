import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-body",
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
        className={`${dmSerif.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
