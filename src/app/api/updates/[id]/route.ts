import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { InstrumentType, UserRole } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const update = await db.legalUpdate.findUnique({ where: { id } });
    if (!update) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: update });
  } catch (error) {
    console.error("Failed to fetch legal update:", error);
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
    const { title, datePublished, jurisdiction, instrumentType, summary, fullAnalysis, sourceUrl } = body;

    const updated = await db.legalUpdate.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(datePublished && { datePublished: new Date(datePublished) }),
        ...(jurisdiction && { jurisdiction }),
        ...(instrumentType && { instrumentType: instrumentType as InstrumentType }),
        ...(summary !== undefined && { summary }),
        ...(fullAnalysis !== undefined && { fullAnalysis }),
        ...(sourceUrl !== undefined && { sourceUrl }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Failed to update legal update:", error);
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
    await db.legalUpdate.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Legal update deleted from MySQL" });
  } catch (error) {
    console.error("Failed to delete legal update:", error);
    return NextResponse.json({ success: false, error: "Database delete error" }, { status: 500 });
  }
}
