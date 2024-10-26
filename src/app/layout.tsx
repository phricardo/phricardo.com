import { type_first, type_second } from "./fonts";
import type { Metadata } from "next";
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
      <body className={`${type_first.variable} ${type_second.variable}`}>
        {children}
      </body>
    </html>
  );
}
