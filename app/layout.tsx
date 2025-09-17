// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Find Rubbish Tips & Recycling Centres Near You | RubbishTips.com.au",
    template: "%s | RubbishTips.com.au"
  },
  description: "Locate rubbish tips, transfer stations, and recycling centres across Australia. Find opening hours, accepted materials, and contact details for waste disposal near you.",
  keywords: ["rubbish tips", "recycling centres", "waste disposal", "transfer stations", "Australia", "landfill", "dump"],
  authors: [{ name: "RubbishTips Australia" }],
  creator: "RubbishTips Australia",
  publisher: "RubbishTips Australia",
  metadataBase: new URL('https://www.rubbishtips.com.au'),
openGraph: {
  type: 'website',
  locale: 'en_AU',
  url: 'https://www.rubbishtips.com.au',
  title: 'Find Rubbish Tips & Recycling Centres Near You | RubbishTips.com.au',
  description: 'Locate rubbish tips, transfer stations, and recycling centres across Australia.',
  siteName: 'RubbishTips.com.au',
  images: [
    {
      url: '/rubbish-tips-logo.png',
      width: 1200,
      height: 630,
      alt: 'RubbishTips.com.au - Find waste disposal facilities across Australia',
    },
  ],
},
  twitter: {
    card: 'summary_large_image',
    title: 'Find Rubbish Tips & Recycling Centres Near You',
    description: 'Locate rubbish tips, transfer stations, and recycling centres across Australia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
    icons: {
    icon: '/rubbish-tips-icon.png',
    shortcut: '/rubbish-tips-icon.png',
    apple: '/rubbish-tips-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://nominatim.openstreetmap.org" />
        
        {/* Favicon */}
<link rel="icon" href="/rubbish-tips-icon.png" sizes="any" />
<link rel="apple-touch-icon" href="/rubbish-tips-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JRBWSZ0NGY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JRBWSZ0NGY');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6736999079825175"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}