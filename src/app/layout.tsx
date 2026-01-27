import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://aneko.pwhs.app"),
  title: {
    default: "ANeko Reborn - Your Cute Desktop Cat Pet on Android",
    template: "%s | ANeko Reborn",
  },
  description:
    "ANeko Reborn is a modern version of the classic ANeko app. A cute cat animation follows your finger on the Android screen. Free, open source, and customizable with 30+ community skins!",
  keywords: [
    "aneko",
    "aneko reborn",
    "cat",
    "pet",
    "android",
    "neko",
    "desktop pet",
    "animation",
    "virtual pet",
    "screen pet",
    "pixel cat",
    "cute cat app",
    "open source android app",
    "material you",
    "finger follower",
  ],
  authors: [{ name: "NQM Innovation Lab", url: "https://github.com/pass-with-high-score" }],
  creator: "NQM Innovation Lab",
  publisher: "NQM Innovation Lab",
  category: "Entertainment",
  applicationName: "ANeko Reborn",
  alternates: {
    canonical: "https://aneko.pwhs.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ANeko Reborn - Your Cute Desktop Cat Pet on Android",
    description:
      "A cute cat animation follows your finger on your Android screen. Free, open source, with 30+ customizable skins!",
    url: "https://aneko.pwhs.app",
    siteName: "ANeko Reborn",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/screenshots/1.png",
        width: 540,
        height: 1080,
        alt: "ANeko Reborn app screenshot showing the cute cat following your finger",
      },
      {
        url: "/aneko/icon.png",
        width: 64,
        height: 64,
        alt: "ANeko cat icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ANeko Reborn - Cute Desktop Cat Pet for Android",
    description:
      "Watch the adorable pixel cat follow your finger! Free, open source, 30+ skins.",
    images: ["/screenshots/1.png"],
    creator: "@nqmgaming",
  },
  icons: {
    icon: "/aneko/icon.png",
    shortcut: "/aneko/icon.png",
    apple: "/aneko/icon.png",
  },
  other: {
    "google-play-app": "app-id=org.nqmgaming.aneko",
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
