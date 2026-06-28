import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Xquisite Car Detailing | Premium Autodetailing Roden",
  description:
    "Waar kwaliteit geen toeval is, maar een keuze. Premium autodetailing, lakcorrectie en keramische coating in Roden voor heel Noord-Nederland.",
  keywords: "autodetailing, lakcorrectie, keramische coating, polijsten, Roden, Groningen, Drenthe, Friesland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${geist.variable}`}>
      <body>
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
