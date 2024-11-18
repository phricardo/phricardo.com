import { fonts } from "./fonts";
import type { Metadata } from "next";
import metadataJson from "./metadata.json";
import { UmamiTracker } from "@/components/umami";
import "./globals.css";

export const metadata: Metadata = metadataJson;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <UmamiTracker />
      <body className={fonts}>{children}</body>
    </html>
  );
}
