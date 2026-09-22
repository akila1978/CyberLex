import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { InstrumentType, UserRole } from "@prisma/client";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const updates = await db.legalUpdate.findMany({
      orderBy: { datePublished: "desc" },
    });
    return NextResponse.json({ success: true, count: updates.length, data: updates });
  } catch (error) {
    console.error("Failed to fetch legal updates:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentAdminSession();
    if (!session || session.role === UserRole.READER) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, datePublished, jurisdiction, instrumentType, summary, fullAnalysis, sourceUrl } = body;

    if (!title || !jurisdiction || !summary) {
      return NextResponse.json(
        { success: false, error: "Title, jurisdiction, and summary are required." },
        { status: 400 }
      );
    }

    let baseSlug = slugify(title);
    const existing = await db.legalUpdate.findUnique({ where: { slug: baseSlug } });
    if (existing) {
      baseSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const created = await db.legalUpdate.create({
      data: {
        title,
        slug: baseSlug,
        datePublished: datePublished ? new Date(datePublished) : new Date(),
        jurisdiction,
        instrumentType: (instrumentType as InstrumentType) || InstrumentType.LAW,
        summary,
        fullAnalysis: fullAnalysis || null,
        sourceUrl: sourceUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create legal update:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to persist legal update to MySQL" },
      { status: 500 }
    );
  }
}
