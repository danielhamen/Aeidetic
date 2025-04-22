import {
  Geist_Mono,
  Baskervville,
  Baskervville_SC,
  Quicksand,
  Monsieur_La_Doulaise,
  Urbanist,
  DM_Sans,
  DM_Mono,
} from "next/font/google";

export const Code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Paragraph = Quicksand({
  variable: "--font-paragraph",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Title = Baskervville({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["400"],
});

export const TitleSmall = Baskervville_SC({
  variable: "--font-title-small",
  subsets: ["latin"],
  weight: ["400"],
});

export const Heading = Baskervville({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

export const Fancy = Monsieur_La_Doulaise({
  variable: "--font-fancy",
  subsets: ["latin"],
  weight: ["400"],
});

/*
 ******************************************************
 ******************************************************
 ******************************************************
 */

export const Serif = Baskervville({
  variable: "--font",
  subsets: ["latin"],
  weight: ["400"],
});

export const SerifSC = Baskervville_SC({
  variable: "--font",
  subsets: ["latin"],
  weight: ["400"],
});

export const Cursive = Monsieur_La_Doulaise({
  variable: "--font",
  subsets: ["latin"],
  weight: ["400"],
});

export const Regular = DM_Sans({
  variable: "--font",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Mono = DM_Mono({
  variable: "--font",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const Caption = Quicksand({
  variable: "--font",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const FontRegistry = {
  serif: Serif,
  serif_sc: SerifSC,
  cursive: Cursive,
  regular: Regular,
  mono: Mono,
  caption: Caption,
} as const;
