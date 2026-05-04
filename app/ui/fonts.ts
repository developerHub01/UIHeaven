import { Inter, Poppins } from "next/font/google";

export const fontDisplay = Inter({
  subsets: ["latin"],
  variable: "--font-display",
});

export const primaryFont = Poppins({
  weight: ["600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-primary",
});
