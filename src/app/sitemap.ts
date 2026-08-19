import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.tainhaus.co.uk";
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/shop`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/configurator`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Products
    { url: `${baseUrl}/products/sicilia-6-7x3-8m-log-cabin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/oriental-4-4-7x3-2m-log-cabin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/gloria-h-4-5x2-9m-log-cabin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/dover-combi-6m-x-4m`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/gloria-f-4-5x2-0m-log-cabin`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/products/derby-4-5m-x-3m`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/products/monaco-2-bed-log-cabin`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/outdoor-kitchen-pod-garden-bar-3-0x2-6m`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // Legal
    { url: `${baseUrl}/returns`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/warranty`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/delivery`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
