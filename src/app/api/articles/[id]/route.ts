import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { ArticleStatus, AudienceLevel, SourceQuality, UserRole } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const article = await db.article.findUnique({
      where: { id },
      include: {
        topic: true,
        country: true,
        author: { select: { name: true, email: true } },
        citations: true,
      },
    });

    if (!article) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: article });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json({ success: false, error: "Database query failed" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session || session.role === UserRole.READER) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin or Editor privileges required." },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await req.json();
    const {
      title,
      summary,
      content,
      topicId,
      countryId,
      difficulty,
      status,
      sourceQuality,
      citations,
      isFeatured,
      targetAudience,
    } = body;

    const existing = await db.article.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    const wordCount = content ? content.trim().split(/\s+/).length : existing.content.split(/\s+/).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Handle citations update: delete old and insert new if provided
    if (Array.isArray(citations)) {
      await db.citation.deleteMany({ where: { articleId: id } });
    }

    const updated = await db.article.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(summary && { summary }),
        ...(content && { content }),
        ...(topicId && { topicId }),
        countryId: countryId !== undefined ? (countryId || null) : existing.countryId,
        ...(difficulty && { difficulty: difficulty as AudienceLevel }),
        ...(status && {
          status: status as ArticleStatus,
          publishedAt: status === "PUBLISHED" && !existing.publishedAt ? new Date() : existing.publishedAt,
        }),
        ...(sourceQuality && { sourceQuality: sourceQuality as SourceQuality }),
        ...(targetAudience !== undefined && { targetAudience }),
        ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
        readingTimeMinutes,
        lastEditorId: session.id,
        ...(Array.isArray(citations) && {
          citations: {
            create: (citations as Array<{ title: string; sourceUrl?: string; citationText?: string }>).map((c) => ({
              title: c.title,
              sourceUrl: c.sourceUrl || null,
              citationText: c.citationText || null,
              isVerified: true,
            })),
          },
        }),
      },
      include: {
        topic: true,
        country: true,
        citations: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update article in database" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session || (session.role !== UserRole.ADMIN && session.role !== UserRole.EDITOR)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin or Editor privileges required." },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    await db.article.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Article permanently deleted from database" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete article" },
      { status: 500 }
    );
  }
}
