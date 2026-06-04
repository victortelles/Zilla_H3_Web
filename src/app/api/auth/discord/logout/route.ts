import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.nextUrl.host;
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const origin = `${proto}://${host}`;
  const cookieStore = await cookies();

  // Clear the cookie by setting it with maxAge = 0
  cookieStore.set("zilla_session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return NextResponse.redirect(`${origin}/`);
}
