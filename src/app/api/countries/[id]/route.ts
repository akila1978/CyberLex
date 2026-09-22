import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { UserRole } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const country = await db.country.findUnique({
      where: { id },
      include: {
        statutes: true,
        _count: { select: { articles: true } },
      },
    });
    if (!country) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: country });
  } catch (error) {
    console.error("Failed to fetch country:", error);
    return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session || session.role === UserRole.READER) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await req.json();
    const {
      legalSystem,
      summary,
      dpaAuthority,
      dpaUrl,
      certAuthority,
      certUrl,
      cyberStrategyUrl,
    } = body;

    const updated = await db.country.update({
      where: { id },
      data: {
        ...(legalSystem !== undefined && { legalSystem }),
        ...(summary !== undefined && { summary }),
        ...(dpaAuthority !== undefined && { dpaAuthority: dpaAuthority || null }),
        ...(dpaUrl !== undefined && { dpaUrl: dpaUrl || null }),
        ...(certAuthority !== undefined && { certAuthority: certAuthority || null }),
        ...(certUrl !== undefined && { certUrl: certUrl || null }),
        ...(cyberStrategyUrl !== undefined && { cyberStrategyUrl: cyberStrategyUrl || null }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Failed to update country in MySQL:", error);
    return NextResponse.json({ success: false, error: "Database update error" }, { status: 500 });
  }
}
