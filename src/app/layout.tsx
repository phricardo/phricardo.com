import type { Metadata } from "next";
import { fonts } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Ricardo - phricardo.com",
  description: "",
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
