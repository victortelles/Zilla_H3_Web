import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { decryptSession } from "@/services/session";

const configPath = path.join(process.cwd(), "src", "data", "config.json");

// Read helper
async function readConfig() {
  try {
    const data = await fs.readFile(configPath, "utf-8");
    return JSON.parse(data) as { commissionStatus: string };
  } catch {
    // If it doesn't exist or is invalid, return default
    return { commissionStatus: "available" };
  }
}

export async function GET() {
  const config = await readConfig();
  return NextResponse.json(config, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate session
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("zilla_session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = decryptSession(sessionCookie);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Validate request body
    const body = (await request.json()) as { commissionStatus: string };
    if (!body || !["available", "busy", "closed"].includes(body.commissionStatus)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    // 3. Save config
    const newConfig = { commissionStatus: body.commissionStatus };
    // Ensure parent directories exist
    await fs.mkdir(path.dirname(configPath), { recursive: true });
    await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2), "utf-8");

    return NextResponse.json({ success: true, config: newConfig }, { status: 200 });
  } catch (error) {
    console.error("Failed to update config:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
