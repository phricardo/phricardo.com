import { Inter, Poppins } from "next/font/google";

export const type_first = Inter({
  weight: ["200", "300", "400", "600", "800"],
  subsets: ["latin"],
  variable: "--type-first-inter",
  display: "swap",
});

export const type_second = Poppins({
  weight: ["600", "800"],
  subsets: ["latin"],
  variable: "--type-second-poppins",
  display: "swap",
});

