import type { Metadata } from "next";
import { fonts } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Ricardo - phricardo.com",
  description: "",
  openGraph: {
    url: "https://www.opengraph.xyz/",
    type: "website",
    title: "OpenGraph - Preview Social Media Share and Generate Metatags",
    description: "OpenGraph is the easiest way to preview and generate open graph meta tags for any website.",
    images: [
      {
        url: "https://www.opengraph.xyz/og-opengraph-v2.png",
        alt: "OpenGraph logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle", // opcional
    title: "OpenGraph - Preview Social Media Share and Generate Metatags",
    description: "OpenGraph is the easiest way to preview and generate open graph meta tags for any website.",
    images: [
      "https://www.opengraph.xyz/og-opengraph-v2.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={fonts}>{children}</body>
    </html>
  );
}
