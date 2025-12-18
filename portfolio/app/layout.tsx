import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import CosmicNebulaBackground from "@/components/cosmic-nebula-background";
// Or import any of the other background components:
// import GeometricConstellationBackground from "@/components/geometric-constellation-background"
// import FlowingWaveBackground from "@/components/flowing-wave-background"
// import DepthParticlesBackground from "@/components/depth-particles-background"
// import DigitalCircuitBackground from "@/components/digital-circuit-background"

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portofolio.almontijourdanm.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Almonti Jourdan Manuputty | Full Stack Developer",
    template: "%s | Almonti Jourdan Manuputty",
  },
  description:
    "Portfolio of Almonti Jourdan Manuputty, a Full Stack Developer specializing in JavaScript, React, Node.js, and modern web technologies. Explore my projects, blog, and professional journey.",
  keywords: [
    "Full Stack Developer",
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Next.js",
    "Web Development",
    "Portfolio",
    "Almonti Jourdan Manuputty",
  ],
  authors: [{ name: "Almonti Jourdan Manuputty" }],
  creator: "Almonti Jourdan Manuputty",
  publisher: "Almonti Jourdan Manuputty",
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon1.png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Almonti Jourdan Manuputty | Full Stack Developer",
    description:
      "Portfolio of Almonti Jourdan Manuputty, a Full Stack Developer specializing in JavaScript, React, Node.js, and modern web technologies.",
    siteName: "Almonti Jourdan Manuputty Portfolio",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Almonti Jourdan Manuputty - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Almonti Jourdan Manuputty | Full Stack Developer",
    description:
      "Portfolio of Almonti Jourdan Manuputty, a Full Stack Developer specializing in JavaScript, React, Node.js, and modern web technologies.",
    images: [`${siteUrl}/og-image.jpg`],
    creator: "@yourtwitter",
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
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Almonti Jourdan Manuputty",
    jobTitle: "Full Stack Developer",
    url:
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://portofolio.almontijourdanm.com",
    sameAs: [
      "https://github.com/almontijourdanm",
      "https://linkedin.com/in/almonti-manuputty",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Your Company or Freelance",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className} style={{ position: "relative" }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Add your chosen background component */}
          <CosmicNebulaBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
