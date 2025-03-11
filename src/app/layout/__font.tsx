import { Geist, Geist_Mono, Monsieur_La_Doulaise } from "next/font/google";

export const Code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Paragraph = Geist({
  variable: "--font-paragraph",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Title = Geist({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Heading = Geist({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Fancy = Monsieur_La_Doulaise({
  variable: "--font-fancy",
  subsets: ["latin"],
  weight: ["400"],
});
