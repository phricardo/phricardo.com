import { Inter, Poppins, Tiny5 } from "next/font/google";

export const type_first = Poppins({
  weight: ["200", "400", "600", "800"],
  subsets: ["latin"],
  variable: "--type-first-poppins",
  display: "swap",
});

export const type_second = Inter({
  weight: ["200", "300", "400", "600", "800"],
  subsets: ["latin"],
  variable: "--type-second-inter",
  display: "swap",
});

export const type_third = Tiny5({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--type-third-tiny5",
  display: "swap",
});

export const fonts = `${type_first.variable} ${type_second.variable} ${type_third.variable}`;
