import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";

  if (!q) {
    return NextResponse.json({ success: true, count: 0, results: [] });
  }

  try {
    const [articles, statutes, cases, glossary] = await Promise.all([
      db.article.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { summary: { contains: q } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          topic: { select: { name: true } },
          country: { select: { name: true } },
        },
        take: 5,
      }),
      db.statute.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { summary: { contains: q } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          instrumentType: true,
          country: { select: { name: true } },
        },
        take: 5,
      }),
      db.caseStudy.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { ruling: { contains: q } },
            { impact: { contains: q } },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          impact: true,
          jurisdiction: true,
        },
        take: 5,
      }),
      db.glossaryTerm.findMany({
        where: {
          OR: [
            { term: { contains: q } },
            { definition: { contains: q } },
          ],
        },
        select: {
          id: true,
          term: true,
          slug: true,
          definition: true,
          category: true,
        },
        take: 5,
      }),
    ]);

    const results = [
      ...articles.map((a) => ({
        type: "ARTICLE",
        title: a.title,
        url: `/articles/${a.slug}`,
        snippet: a.summary,
        meta: `${a.topic?.name || "General"} • ${a.country?.name || "Global"}`,
      })),
      ...statutes.map((s) => ({
        type: "STATUTE",
        title: s.title,
        url: `/countries/${s.country?.name.toLowerCase().replace(/\s+/g, "-") || "statute"}`,
        snippet: s.summary,
        meta: `${s.instrumentType} • ${s.country?.name || "Jurisdiction"}`,
      })),
      ...cases.map((c) => ({
        type: "CASE_LAW",
        title: c.title,
        url: `/cases`,
        snippet: c.impact,
        meta: `Precedent • ${c.jurisdiction}`,
      })),
      ...glossary.map((g) => ({
        type: "GLOSSARY",
        title: g.term,
        url: `/glossary`,
        snippet: g.definition,
        meta: `Glossary • ${g.category}`,
      })),
    ];

    return NextResponse.json({ success: true, count: results.length, results });
  } catch (error) {
    console.warn("Search query failed:", error);
    return NextResponse.json({ success: true, count: 0, results: [] });
  }
}
