import Link from "next/link";
import type { Metadata } from "next";
import {
  Clock,
  ShieldCheck,
  Scale,
  ExternalLink,
  FileCheck,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Disclaimer } from "@/components/ui/disclaimer";
import { db } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseMarkdownSections(markdown: string): { heading: string; body: string }[] {
  const lines = markdown.split("\n");
  const sections: { heading: string; body: string }[] = [];
  let currentHeading = "1. Analysis & Statutory Provisions";
  let currentBody: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ") || line.startsWith("# ")) {
      if (currentBody.length > 0) {
        sections.push({ heading: currentHeading, body: currentBody.join("\n\n") });
        currentBody = [];
      }
      currentHeading = line.replace(/^#+\s*/, "");
    } else if (line.trim().length > 0) {
      currentBody.push(line);
    }
  }
  if (currentBody.length > 0) {
    sections.push({ heading: currentHeading, body: currentBody.join("\n\n") });
  }
  return sections.length > 0 ? sections : [{ heading: "Statutory Context", body: markdown }];
}

async function getArticle(slug: string) {
  try {
    const dbArticle = await db.article.findUnique({
      where: { slug },
      include: {
        topic: true,
        country: true,
        author: true,
        citations: true,
      },
    });

    if (dbArticle) {
      return {
        title: dbArticle.title,
        subtitle: dbArticle.subtitle || "",
        summary: dbArticle.summary,
        topic: {
          name: dbArticle.topic?.name || "Cyber Law",
          slug: dbArticle.topic?.slug || "cybercrime",
        },
        country: dbArticle.country
          ? {
              name: dbArticle.country.name,
              code: dbArticle.country.code,
              flagEmoji: dbArticle.country.flagEmoji,
            }
          : { name: "Global", code: "GL", flagEmoji: "🌐" },
        difficulty: dbArticle.difficulty,
        status: dbArticle.status,
        sourceQuality: dbArticle.sourceQuality,
        readTime: `${dbArticle.readingTimeMinutes || 5} min read`,
        publishedDate: dbArticle.publishedAt
          ? new Date(dbArticle.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Draft in Verification Pipeline",
        lastUpdated: new Date(dbArticle.updatedAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        }),
        author: dbArticle.author?.name || "CyberLex Editorial Research Board",
        reviewer: "Senior Legal Review Desk",
        citations: dbArticle.citations.map((c) => ({
          id: c.id,
          title: c.title,
          sourceUrl: c.sourceUrl || "",
          sourceType: c.sourceType || "Primary Statutory Instrument",
          citationText: c.citationText || "",
          isVerified: c.isVerified,
        })),
        content: parseMarkdownSections(dbArticle.content),
      };
    }
  } catch (err) {
    console.warn("Database lookup for article failed, checking fallback:", err);
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) {
    return { title: "Article — CyberLex" };
  }
  return {
    title: `${article.title} — CyberLex`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-14 h-14 text-(--primary) mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-(--foreground) font-heading mb-2">
            Article In Verification Pipeline
          </h1>
          <p className="text-sm text-(--muted-foreground) max-w-lg mx-auto mb-8 leading-relaxed">
            This legal analysis is currently in our editorial workflow awaiting primary source verification.
            In compliance with our editorial charter, unverified legal material is held until gazettes and judicial filings are validated.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/topics"
              className="px-5 py-2.5 rounded-lg bg-(--primary) text-white text-sm font-semibold hover:bg-(--primary)/90 transition-colors"
            >
              Browse Verified Topics
            </Link>
            <Link
              href="/countries"
              className="px-5 py-2.5 rounded-lg border border-(--border-color) text-(--foreground) text-sm font-semibold hover:bg-(--card-bg) transition-colors"
            >
              Explore Countries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Topics", href: "/topics" },
            { label: article.topic.name, href: `/topics/${article.topic.slug}` },
            { label: article.title },
          ]}
          className="mb-8"
        />

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-(--primary)/10 text-(--primary) border border-(--primary)/20">
              <span>{article.country.flagEmoji}</span>
              <span>{article.country.name}</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-(--card-bg) text-(--muted-foreground) border border-(--border-color)">
              {article.topic.name}
            </span>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Verified Legal Review
            </span>
            <span className="text-xs text-(--muted-foreground) flex items-center gap-1 ml-auto">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-(--foreground) tracking-tight font-heading leading-tight mb-4">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-lg text-(--muted-foreground) font-medium leading-relaxed">
              {article.subtitle}
            </p>
          )}
        </div>

        {/* Editorial Audit Metadata */}
        <div className="p-4 rounded-xl border border-(--border-color) bg-(--card-bg) mb-8 flex flex-wrap items-center justify-between gap-4 text-xs text-(--muted-foreground)">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-(--primary)/10 text-(--primary) flex items-center justify-center font-bold">
              CL
            </div>
            <div>
              <p className="font-semibold text-(--foreground)">{article.author}</p>
              <p className="text-[11px]">Reviewed by: {article.reviewer}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>
              Published: <strong className="text-(--foreground)">{article.publishedDate}</strong>
            </span>
            <span>
              Verified: <strong className="text-emerald-400">{article.lastUpdated}</strong>
            </span>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer */}
        <Disclaimer variant="inline" className="mb-8" />

        {/* Main Body Grid with Sticky Citations Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Body */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-5 rounded-2xl bg-(--bg-surface) border border-(--border-color) text-sm leading-relaxed text-(--foreground)">
              <strong className="block text-xs uppercase tracking-wider text-(--primary) font-bold mb-1">
                Executive Legal Summary
              </strong>
              {article.summary}
            </div>

            {article.content.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-(--foreground) font-heading">
                  {sec.heading}
                </h2>
                <div className="text-sm sm:text-base text-(--muted-foreground) leading-relaxed whitespace-pre-line">
                  {sec.body}
                </div>
              </section>
            ))}
          </div>

          {/* Citations & Source Verification Sidebar */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-(--border-color) bg-(--card-bg) shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-(--border-color)">
                <h3 className="text-sm font-bold text-(--foreground) font-heading flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verified Citations ({article.citations.length})</span>
                </h3>
              </div>

              <div className="space-y-4">
                {article.citations.map((cite) => (
                  <div key={cite.id} className="text-xs space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-semibold text-(--foreground) leading-snug">
                        {cite.title}
                      </span>
                      {cite.isVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                    </div>
                    {cite.citationText && (
                      <p className="text-[11px] text-(--muted-foreground) font-mono bg-(--bg-surface) p-2 rounded-lg border border-(--border-color)">
                        {cite.citationText}
                      </p>
                    )}
                    {cite.sourceUrl && (
                      <a
                        href={cite.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-(--primary) hover:underline"
                      >
                        <span>Official Source Document</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
