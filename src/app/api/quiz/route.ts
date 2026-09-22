import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentAdminSession } from "@/lib/auth";
import { AudienceLevel, UserRole } from "@prisma/client";

export async function GET() {
  try {
    const questions = await db.quizQuestion.findMany({
      include: {
        topic: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    console.error("Failed to fetch quiz questions:", error);
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
    const { question, topicId, difficulty, options, correctIndex, explanation, statutoryContext } = body;

    if (!question || !topicId || !Array.isArray(options) || options.length < 2 || correctIndex === undefined || !explanation) {
      return NextResponse.json(
        { success: false, error: "Question, topic, at least 2 options, correct answer index, and statutory explanation are required." },
        { status: 400 }
      );
    }

    const created = await db.quizQuestion.create({
      data: {
        question,
        topicId,
        difficulty: (difficulty as AudienceLevel) || AudienceLevel.BEGINNER,
        options,
        correctIndex: parseInt(String(correctIndex), 10),
        explanation,
        statutoryContext: statutoryContext || null,
      },
      include: {
        topic: { select: { id: true, name: true, slug: true } },
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Failed to create quiz question:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to persist quiz question to MySQL" },
      { status: 500 }
    );
  }
}
