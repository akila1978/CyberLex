import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { UserRole } from "@prisma/client";

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
    const terms = await db.glossaryTerm.findMany({
      orderBy: { term: "asc" },
      include: { relatedStatute: { select: { title: true } } },
    });
    return NextResponse.json({ success: true, data: terms });
  } catch (error) {
    console.error("Failed to fetch glossary terms:", error);
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
    const { term, category, definition, statutoryContext } = body;

    if (!term || !category || !definition) {
      return NextResponse.json(
        { success: false, error: "Term, category, and definition are required." },
        { status: 400 }
      );
    }

    const slug = slugify(term);

    const created = await db.glossaryTerm.create({
      data: {
        term,
        slug,
        category,
        definition,
        statutoryContext: statutoryContext || null,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create glossary term:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to persist term to MySQL" },
      { status: 500 }
    );
  }
}
