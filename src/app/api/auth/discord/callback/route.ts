import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { configService } from "@/services/configService";
import { encryptSession } from "@/services/session";

export async function GET(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.nextUrl.host;
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const origin = `${proto}://${host}`;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle Discord OAuth authorization cancel or error
  if (error) {
    console.error("Discord OAuth Error:", error, errorDescription);
    return NextResponse.redirect(
      `${origin}/auth/callback?status=error&message=${encodeURIComponent(
        errorDescription || "Authentication cancelled by user."
      )}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/auth/callback?status=error&message=No+authorization+code+provided.`
    );
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    console.error("Missing Discord client credentials in environment variables.");
    return NextResponse.redirect(
      `${origin}/auth/callback?status=error&message=Server+is+misconfigured.+Please+check+environment+variables.`
    );
  }

  try {
    // 1. Swap authorization code for Discord access token
    const tokenParams = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      body: tokenParams,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Failed to retrieve access token from Discord:", errorText);
      return NextResponse.redirect(
        `${origin}/auth/callback?status=error&message=Failed+to+retrieve+access+token+from+Discord.`
      );
    }

    const tokenData = (await tokenResponse.json()) as { access_token: string };
    const accessToken = tokenData.access_token;

    // 2. Fetch the user profile from Discord
    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      console.error("Failed to fetch user profile from Discord");
      return NextResponse.redirect(
        `${origin}/auth/callback?status=error&message=Failed+to+fetch+user+profile.`
      );
    }

    interface DiscordUser {
      id: string;
      username: string;
      global_name?: string;
      avatar: string | null;
    }

    const userData = (await userResponse.json()) as DiscordUser;

    // 3. Verify against the administrator whitelist
    const whitelist = configService.getDiscordWhitelist();
    const isWhitelisted =
      whitelist.includes(userData.id) ||
      whitelist.includes(userData.username) ||
      whitelist.includes(userData.username.toLowerCase());

    if (!isWhitelisted) {
      console.warn(
        `Access denied. Discord User ID: ${userData.id}, Username: ${userData.username} is not whitelisted.`
      );
      return NextResponse.redirect(
        `${origin}/auth/callback?status=error&message=Access+Denied.+You+are+not+on+the+administrator+whitelist.`
      );
    }

    // 4. Create and encrypt session payload
    const sessionToken = encryptSession({
      id: userData.id,
      username: userData.username,
      globalName: userData.global_name,
      avatar: userData.avatar,
    });

    // 5. Store session in HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set("zilla_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 3, // 3 days
      path: "/",
    });

    return NextResponse.redirect(`${origin}/auth/callback?status=success`);
  } catch (err) {
    console.error("Unexpected error in Discord OAuth Callback handler:", err);
    return NextResponse.redirect(
      `${origin}/auth/callback?status=error&message=An+unexpected+error+occurred+during+authentication.`
    );
  }
}
