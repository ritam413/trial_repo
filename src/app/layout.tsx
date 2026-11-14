import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const cormorant = Cormorant_Garamond({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "DECK OF DESTINIES // Sanskaran & Sahotsava",
  description:
    "Every card represents a different destiny, talent, culture and identity. Together, they create an unpredictable world of experiences.",
  openGraph: {
    title: "DECK OF DESTINIES // Sanskaran & Sahotsava",
    description:
      "Interactive 3D Monolith Corridor and Riffle Deck Experience for Sanskaran & Sahotsava.",
    siteName: "Deck of Destinies",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${cormorant.variable} ${spaceGrotesk.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#120E15] text-[#FFF4E0] selection:bg-[#FFAA24] selection:text-[#120E15]">
        {children}
      </body>
    </html>
  );
}
