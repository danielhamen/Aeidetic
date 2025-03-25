import type { Metadata } from "next";
import "./globals.css";
import Layout from "./__layout/__layout";
import Root from "./__layout/__root";

export const metadata: Metadata = {
  title: "Home • Aeidetic.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Root>
      <Layout>{children}</Layout>
    </Root>
  );
}
