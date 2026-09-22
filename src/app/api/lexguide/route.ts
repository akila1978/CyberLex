import { NextRequest, NextResponse } from "next/server";
import { getLexGuideProvider, LexGuideRequest } from "@/lib/lexguide";

export async function POST(req: NextRequest) {
  try {
    const body: LexGuideRequest = await req.json();

    if (!body.query || typeof body.query !== "string") {
      return NextResponse.json(
        { success: false, error: "Query string is required" },
        { status: 400 }
      );
    }

    const provider = getLexGuideProvider();
    const response = await provider.generateAnswer(body.query, [], body.history || []);

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("LexGuide RAG error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "LexGuide was unable to process the legal query at this moment.",
      },
      { status: 500 }
    );
  }
}
