import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { ArticleStatus, AudienceLevel, SourceQuality, UserRole } from "@prisma/client";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topicSlug = searchParams.get("topic");
  const countrySlug = searchParams.get("country");
  const featured = searchParams.get("featured");
  const all = searchParams.get("all") === "true";
  const statusParam = searchParams.get("status") as ArticleStatus | null;

  try {
    const whereClause: Record<string, unknown> = {};

    if (!all) {
      whereClause.status = statusParam || ArticleStatus.PUBLISHED;
    } else if (statusParam) {
      whereClause.status = statusParam;
    }

    if (topicSlug) {
      whereClause.topic = { slug: topicSlug };
    }
    if (countrySlug) {
      whereClause.country = { slug: countrySlug };
    }
    if (featured === "true") {
      whereClause.isFeatured = true;
    }

    const articles = await db.article.findMany({
      where: whereClause,
      include: {
        topic: { select: { id: true, name: true, slug: true, icon: true } },
        country: { select: { id: true, name: true, code: true, slug: true, flagEmoji: true } },
        author: { select: { name: true, email: true } },
        citations: { select: { id: true, title: true, sourceUrl: true, citationText: true, isVerified: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    console.warn("Database query failed in /api/articles:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch articles from database" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentAdminSession();
    if (!session || session.role === UserRole.READER) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin or Editor privileges required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      summary,
      content,
      topicId,
      countryId,
      difficulty = "INTERMEDIATE",
      status = "DRAFT",
      sourceQuality = "PRIMARY",
      citations = [],
      isFeatured = false,
      targetAudience,
    } = body;

    if (!title || !summary || !content || !topicId) {
      return NextResponse.json(
        { success: false, error: "Title, summary, content, and topic are required fields." },
        { status: 400 }
      );
    }

    let baseSlug = body.slug ? generateSlug(body.slug) : generateSlug(title);
    if (!baseSlug) baseSlug = `article-${Date.now()}`;

    // Ensure unique slug
    let finalSlug = baseSlug;
    const existing = await db.article.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const wordCount = content.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    const article = await db.article.create({
      data: {
        title,
        slug: finalSlug,
        summary,
        content,
        topicId,
        countryId: countryId || null,
        targetAudience: targetAudience || "Legal Counsel, Cybersecurity Professionals, Students",
        difficulty: (difficulty as AudienceLevel) || AudienceLevel.INTERMEDIATE,
        status: (status as ArticleStatus) || ArticleStatus.DRAFT,
        sourceQuality: (sourceQuality as SourceQuality) || SourceQuality.PRIMARY,
        readingTimeMinutes,
        isFeatured: Boolean(isFeatured),
        authorId: session.id,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
        citations: {
          create: (citations as Array<{ title: string; sourceUrl?: string; citationText?: string }>).map((c) => ({
            title: c.title,
            sourceUrl: c.sourceUrl || null,
            citationText: c.citationText || null,
            isVerified: true,
          })),
        },
      },
      include: {
        topic: true,
        country: true,
        citations: true,
      },
    });

    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    console.error("Error creating article in MySQL:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to persist article to database" },
      { status: 500 }
    );
  }
}
