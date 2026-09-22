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
    const cases = await db.caseStudy.findMany({
      orderBy: { decisionYear: "desc" },
    });
    return NextResponse.json({ success: true, count: cases.length, data: cases });
  } catch (error) {
    console.error("Error fetching case studies:", error);
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
    const { title, court, decisionYear, citation, jurisdiction, facts, legalIssue, ruling, impact, status } = body;

    if (!title || !court || !decisionYear || !citation || !jurisdiction || !ruling) {
      return NextResponse.json(
        { success: false, error: "Title, court, decision year, citation, jurisdiction, and ruling are required." },
        { status: 400 }
      );
    }

    let baseSlug = slugify(title);
    const existing = await db.caseStudy.findUnique({ where: { slug: baseSlug } });
    if (existing) {
      baseSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const created = await db.caseStudy.create({
      data: {
        title,
        slug: baseSlug,
        court,
        decisionYear: parseInt(String(decisionYear), 10),
        citation,
        jurisdiction,
        facts: facts || "Facts documented in court record.",
        legalIssue: legalIssue || "Core legal interpretation question.",
        ruling,
        impact: impact || ruling,
        status: status || "Precedent",
        isVerified: true,
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to persist case study to MySQL" },
      { status: 500 }
    );
  }
}
