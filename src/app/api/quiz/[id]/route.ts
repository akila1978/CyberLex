import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { AudienceLevel, UserRole } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const item = await db.quizQuestion.findUnique({
      where: { id },
      include: { topic: { select: { id: true, name: true, slug: true } } },
    });
    if (!item) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("Failed to fetch quiz question:", error);
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
    const { question, topicId, difficulty, options, correctIndex, explanation, statutoryContext } = body;

    const updated = await db.quizQuestion.update({
      where: { id },
      data: {
        ...(question && { question }),
        ...(topicId && { topicId }),
        ...(difficulty && { difficulty: difficulty as AudienceLevel }),
        ...(Array.isArray(options) && { options }),
        ...(correctIndex !== undefined && { correctIndex: parseInt(String(correctIndex), 10) }),
        ...(explanation !== undefined && { explanation }),
        ...(statutoryContext !== undefined && { statutoryContext }),
      },
      include: { topic: { select: { id: true, name: true, slug: true } } },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Failed to update quiz question:", error);
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
    await db.quizQuestion.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Quiz question deleted from MySQL" });
  } catch (error) {
    console.error("Failed to delete quiz question:", error);
    return NextResponse.json({ success: false, error: "Database delete error" }, { status: 500 });
  }
}
