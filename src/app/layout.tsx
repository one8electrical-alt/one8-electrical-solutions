import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "One8 Electrical Solutions | Electrical, Solar & Automation Services",
  description: "One8 Electrical Solutions provides industrial electrical work, solar installation, automation, and panel fabrication services across Rajasthan. Contact us.",
  keywords: [
    "One8 Electrical Solutions",
    "Hanuman Yadav",
    "Electrical Engineering Tonk",
    "Industrial Automation Rajasthan",
    "Rooftop Solar Installation Newai",
    "PLC SCADA programming India",
    "Electrical Contractor Tonk",
    "Substation Transformer commissioning",
    "Earthing and Lightning Protection Rajasthan",
  ],
  authors: [{ name: "Er. Hanuman Yadav" }],
  alternates: {
    canonical: "https://one8electricalsolutions.com",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    title: "One8 Electrical Solutions | Electrical, Solar & Automation Services",
    description: "One8 Electrical Solutions provides industrial electrical work, solar installation, automation, and panel fabrication services across Rajasthan. Contact us.",
    url: "https://one8electricalsolutions.com",
    siteName: "One8 Electrical Solutions",
    type: "website",
    images: [
      {
        url: "https://one8electricalsolutions.com/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "One8 Electrical Solutions",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "One8 Electrical Solutions",
  "image": "https://one8electricalsolutions.com/images/hero-bg.jpg",
  "telephone": "+919828970722",
  "email": "one8electrical@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Raholi Road, Gunsi, Newai",
    "addressLocality": "Tonk",
    "addressRegion": "Rajasthan",
    "postalCode": "304021",
    "addressCountry": "IN"
  },
  "url": "https://one8electricalsolutions.com",
  "owner": {
    "@type": "Person",
    "name": "Er. Hanuman Yadav",
    "jobTitle": "Electrical Engineer & Founder"
  },
  "priceRange": "$$"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-brand-dark dark:text-white transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
