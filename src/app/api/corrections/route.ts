import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { CorrectionStatus, UserRole } from "@prisma/client";

export async function GET() {
  try {
    const session = await getCurrentAdminSession();
    if (!session || session.role === UserRole.READER) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const corrections = await db.correction.findMany({
      include: {
        article: { select: { title: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: corrections });
  } catch (error) {
    console.error("Error fetching corrections:", error);
    return NextResponse.json({ success: false, error: "Failed to load corrections" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { submitterName, submitterEmail, issueType, description, suggestedCorrection, articleId } = body;

    if (!submitterName || !submitterEmail || !issueType || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const correction = await db.correction.create({
      data: {
        submitterName,
        submitterEmail,
        issueType,
        description,
        suggestedCorrection: suggestedCorrection || null,
        articleId: articleId || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Editorial correction logged successfully to MySQL",
        data: correction,
        correctionId: correction.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error logging correction:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getCurrentAdminSession();
    if (!session || session.role === UserRole.READER) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, editorialNotes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status are required" }, { status: 400 });
    }

    const updated = await db.correction.update({
      where: { id },
      data: {
        status: status as CorrectionStatus,
        ...(editorialNotes && { editorialNotes }),
        resolvedAt: status === "APPLIED" || status === "REJECTED" ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating correction status:", error);
    return NextResponse.json({ success: false, error: "Failed to update correction status" }, { status: 500 });
  }
}
