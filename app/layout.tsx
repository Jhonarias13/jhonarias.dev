import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://jhonarias.dev"),
  title: {
    default: "Jhon Freiman Arias - Full-Stack Developer",
    template: "%s | Jhon Freiman Arias",
  },
  description:
    "Full-Stack Developer shaping digital solutions at the crossroads of technology, product, and user needs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://jhonarias.dev/",
    title: "Jhon Freiman Arias - Full-Stack Developer",
    description:
      "Full-Stack Developer shaping digital solutions at the crossroads of technology, product, and user needs.",
    siteName: "jhonarias.dev",
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "Jhon Freiman Arias",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jhon Freiman Arias - Full-Stack Developer",
    description:
      "Full-Stack Developer shaping digital solutions at the crossroads of technology, product, and user needs.",
    images: ["/vercel.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
