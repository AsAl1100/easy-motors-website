import { MetadataRoute } from "next";
import { DEMO_CARS } from "@/lib/data";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const carPages = DEMO_CARS.map((car) => ({
    url: `${SITE_URL}/catalog/${car.slug}`,
    lastModified: new Date(car.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/catalog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...carPages,
  ];
}
