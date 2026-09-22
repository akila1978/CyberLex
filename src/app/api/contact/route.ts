import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address"),
  category: z.string().default("general"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const rateCheck = await checkRateLimit(`contact_${ip}`, 5, 60 * 1000); // 5 messages per minute max

    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Too many contact submissions. Please wait a minute before retrying." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const errorMsg = result.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { name, email, category, subject, message } = result.data;

    // Log the validated inquiry for editorial dispatch
    console.log(`[CONTACT INQUIRY] From: ${name} <${email}> [Category: ${category}] Subject: ${subject}`);
    console.log(`[MESSAGE CONTENT]: ${message.slice(0, 100)}...`);

    return NextResponse.json({
      success: true,
      message: "Thank you for contacting CyberLex. Your message has been received by our editorial research desk.",
    });
  } catch (error) {
    console.error("Error processing contact message:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
