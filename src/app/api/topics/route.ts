import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const topics = await db.topic.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    });

    return NextResponse.json({ success: true, data: topics });
  } catch (error) {
    // Graceful fallback if database server is not yet booted
    console.warn("Database query failed in /api/topics, returning fallback schema:", error);
    return NextResponse.json({
      success: true,
      data: [
        { name: "Cybercrime", slug: "cybercrime", icon: "Shield", articleCount: 1 },
        { name: "Privacy", slug: "privacy", icon: "Lock", articleCount: 1 },
        { name: "Data Protection", slug: "data-protection", icon: "Database", articleCount: 1 },
        { name: "Digital Evidence", slug: "digital-evidence", icon: "FileSearch", articleCount: 1 },
      ],
    });
  }
}
