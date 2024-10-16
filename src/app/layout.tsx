import type { Metadata } from "next";
import "./globals.scss";
import Animation from "@/app/_components/Animation";
import Header from "@/app/_components/Header";
import { Instrument_Sans } from 'next/font/google'
import Navigation from "@/app/_components/Navigation";

export const metadata: Metadata = {
  title: "distortions",
};

const instrumentSans = Instrument_Sans({
    subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <Header />

        {children}

        <Navigation />
      </body>
    </html>
  );
}
