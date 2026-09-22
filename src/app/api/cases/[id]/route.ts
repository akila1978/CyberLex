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
    const item = await db.caseStudy.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Failed to fetch case study:", error);
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
    const { title, court, decisionYear, citation, jurisdiction, facts, legalIssue, ruling, impact, status } = body;

    const updated = await db.caseStudy.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(court && { court }),
        ...(decisionYear && { decisionYear: parseInt(String(decisionYear), 10) }),
        ...(citation && { citation }),
        ...(jurisdiction && { jurisdiction }),
        ...(facts !== undefined && { facts }),
        ...(legalIssue !== undefined && { legalIssue }),
        ...(ruling && { ruling }),
        ...(impact !== undefined && { impact }),
        ...(status && { status }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Failed to update case study:", error);
    return NextResponse.json({ success: false, error: "Database update error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getCurrentAdminSession();
    if (!session || (session.role !== UserRole.ADMIN && session.role !== UserRole.EDITOR)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await db.caseStudy.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Case study deleted from MySQL" });
  } catch (error) {
    console.error("Failed to delete case study:", error);
    return NextResponse.json({ success: false, error: "Database delete error" }, { status: 500 });
  }
}
