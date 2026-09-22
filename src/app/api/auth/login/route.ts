import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword, signAdminToken, COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    const body = await req.json();
    const { email, password } = body;

    const normalizedEmail = String(email || "").toLowerCase().trim();
    const rateLimitKey = `login_${ip}_${normalizedEmail}`;

    const rateLimit = await checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000); // 5 attempts per 15 min
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Account temporarily locked for security. Please try again in ${rateLimit.retryAfterSeconds} seconds.`,
        },
        { status: 429 }
      );
    }

    if (!normalizedEmail || !password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Valid email and a password of at least 8 characters are required." },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email: String(email).toLowerCase().trim() },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if role is authorized for admin panel
    if (user.role === UserRole.READER) {
      return NextResponse.json(
        { success: false, error: "Access denied. Insufficient permissions for editorial console." },
        { status: 403 }
      );
    }

    const token = await signAdminToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication service error" },
      { status: 500 }
    );
  }
}
