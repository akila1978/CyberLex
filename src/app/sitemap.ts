import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";

const topicSlugs = [
  "cybercrime",
  "privacy",
  "data-protection",
  "digital-evidence",
  "social-media",
  "ethical-hacking",
  "electronic-transactions",
  "ai-law",
  "intellectual-property",
  "cybersecurity-compliance",
  "digital-rights",
  "online-safety",
  "fintech-cybercrime",
  "children-online",
  "workplace-technology",
  "cloud-data",
  "international-cooperation",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url;

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/countries`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/scenarios`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Topics
  const topicRoutes: MetadataRoute.Sitemap = topicSlugs.map((slug) => ({
    url: `${baseUrl}/topics/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic content from database
  try {
    const [articles, countries, cases, updates] = await Promise.all([
      db.article.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      db.country.findMany({
        select: { slug: true, updatedAt: true },
      }),
      db.caseStudy.findMany({
        select: { slug: true, updatedAt: true },
      }),
      db.legalUpdate.findMany({
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = articles.map((item) => ({
      url: `${baseUrl}/articles/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const countryRoutes: MetadataRoute.Sitemap = countries.map((item) => ({
      url: `${baseUrl}/countries/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    const caseRoutes: MetadataRoute.Sitemap = cases.map((item) => ({
      url: `${baseUrl}/cases/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const updateRoutes: MetadataRoute.Sitemap = updates.map((item) => ({
      url: `${baseUrl}/updates/${item.slug}`,
      lastModified: item.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...topicRoutes,
      ...articleRoutes,
      ...countryRoutes,
      ...caseRoutes,
      ...updateRoutes,
    ];
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    return [...staticRoutes, ...topicRoutes];
  }
}
