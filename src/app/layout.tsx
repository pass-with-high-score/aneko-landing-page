import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ANeko Reborn - Your Cute Desktop Cat Pet on Android",
  description: "ANeko Reborn is a modern version of the classic ANeko app. A cute cat animation follows your finger on the Android screen. Free, open source, and customizable!",
  keywords: ["aneko", "cat", "pet", "android", "neko", "desktop pet", "animation"],
  authors: [{ name: "NQM Innovation Lab" }],
  openGraph: {
    title: "ANeko Reborn - Your Cute Desktop Cat Pet on Android",
    description: "A cute cat animation follows your finger on your Android screen. Free & Open Source!",
    url: "https://aneko.pwhs.app",
    siteName: "ANeko Reborn",
    type: "website",
    images: [
      {
        url: "/aneko/icon.png",
        width: 64,
        height: 64,
        alt: "ANeko cat icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "ANeko Reborn",
    description: "A cute cat animation follows your finger on your Android screen.",
  },
  icons: {
    icon: "/aneko/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${nunito.variable}`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
