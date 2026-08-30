import { MetadataRoute } from "next";
import { servicesList } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls = servicesList.map((service) => ({
    url: `https://one8electricalsolutions.com/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://one8electricalsolutions.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://one8electricalsolutions.com/services",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...serviceUrls,
  ];
}
