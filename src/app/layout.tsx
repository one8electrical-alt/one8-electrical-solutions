import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { createClient } from "@/lib/supabaseServer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let title = "One8 Electrical Solutions | Professional Power, Solar & Automation Engineering";
  let description = "One8 Electrical Solutions provides safety-first electrical engineering, rooftop solar grids, PLC/SCADA industrial automation, custom control panels, and electrical wiring contracts across Rajasthan. Led by Er. Hanuman Yadav.";
  let ogImage = "https://one8electricalsolutions.com/images/hero-bg.jpg";
  let favicon = "/favicon.ico";

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("settings").select("*");
    if (data && data.length > 0) {
      data.forEach((row) => {
        if (row.key === "seo_title" && row.value) title = row.value;
        if (row.key === "seo_description" && row.value) description = row.value;
        if (row.key === "og_image" && row.value) ogImage = row.value;
        if (row.key === "favicon" && row.value) favicon = row.value;
      });
    }
  } catch (e) {
    // Fail silent on missing connection or DB config
  }

  return {
    title,
    description,
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
    icons: {
      icon: favicon,
    },
    openGraph: {
      title,
      description,
      url: "https://one8electricalsolutions.com",
      siteName: "One8 Electrical Solutions",
      images: [{ url: ogImage }],
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let ownerName = "Er. Hanuman Yadav";
  let companyAddress = "Raholi Road, Gunsi, Newai, Tonk, Rajasthan";
  let companyPhone = "+91 9828970722";
  let companyEmail = "one8electrical@gmail.com";
  let ogImage = "https://one8electricalsolutions.com/images/hero-bg.jpg";

  try {
    const supabase = await createClient();
    const { data } = await supabase.from("settings").select("*");
    if (data && data.length > 0) {
      data.forEach((row) => {
        if (row.key === "owner_name" && row.value) ownerName = row.value;
        if (row.key === "company_address" && row.value) companyAddress = row.value;
        if (row.key === "company_phone" && row.value) companyPhone = row.value;
        if (row.key === "company_email" && row.value) companyEmail = row.value;
        if (row.key === "og_image" && row.value) ogImage = row.value;
      });
    }
  } catch (e) {
    // Fail silent
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "One8 Electrical Solutions",
    "image": ogImage,
    "telephone": companyPhone,
    "email": companyEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyAddress,
      "addressLocality": "Tonk",
      "addressRegion": "Rajasthan",
      "postalCode": "304021",
      "addressCountry": "IN",
    },
    "url": "https://one8electricalsolutions.com",
    "owner": {
      "@type": "Person",
      "name": ownerName,
      "jobTitle": "Electrical Engineer & Founder",
    },
    "priceRange": "$$",
  };

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
