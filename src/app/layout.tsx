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
  title: "One8 Electrical Solutions | Professional Power, Solar & Automation Engineering",
  description: "One8 Electrical Solutions provides safety-first electrical engineering, rooftop solar grids, PLC/SCADA industrial automation, custom control panels, and electrical wiring contracts across Rajasthan. Led by Er. Hanuman Yadav.",
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
  openGraph: {
    title: "One8 Electrical Solutions | Power, Solar & Automation Engineering",
    description: "Premium electrical contracting, solar panels, and SCADA automation across Rajasthan. Led by Er. Hanuman Yadav.",
    url: "https://one8electrical.com",
    siteName: "One8 Electrical Solutions",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "One8 Electrical Solutions",
  "image": "https://one8electrical.com/images/hero-bg.jpg",
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
  "url": "https://one8electrical.com",
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
