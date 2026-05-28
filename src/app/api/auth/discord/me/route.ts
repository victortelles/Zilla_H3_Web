import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/services/session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("zilla_session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const user = decryptSession(sessionCookie);

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    // Build standard Discord Avatar URL
    const defaultAvatarIndex = (parseInt(user.id.slice(-4)) || 0) % 6;
    const avatarUrl = user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : `https://cdn.discordapp.com/embed/avatars/${defaultAvatarIndex}.png`;

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        username: user.username,
        globalName: user.globalName || user.username,
        avatarUrl,
      },
    }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving user session:", error);
    return NextResponse.json({ authenticated: false, error: "Internal server error" }, { status: 500 });
  }
}
