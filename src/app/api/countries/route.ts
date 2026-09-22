import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { countries as fallbackCountries } from "@/config/site";

export async function GET() {
  try {
    const countries = await db.country.findMany({
      include: {
        statutes: {
          select: {
            id: true,
            title: true,
            slug: true,
            instrumentType: true,
            status: true,
          },
        },
        _count: {
          select: { articles: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ success: true, data: countries });
  } catch (error) {
    console.warn("Database query failed in /api/countries, returning fallback config:", error);
    return NextResponse.json({ success: true, data: fallbackCountries });
  }
}
