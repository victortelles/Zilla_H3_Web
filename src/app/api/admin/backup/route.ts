import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { decryptSession } from "@/services/session";
import { ensureDataFilesExist } from "@/utils/dataInitializer";

export async function GET() {
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

    await ensureDataFilesExist();

    const configPath = path.join(process.cwd(), "data", "config.json");
    const projectPath = path.join(process.cwd(), "data", "project.json");
    const speciesPath = path.join(process.cwd(), "data", "species.json");
    const tagsPath = path.join(process.cwd(), "data", "tags.json");

    let config = { commissionStatus: "available" };
    try {
      config = JSON.parse(await fs.readFile(configPath, "utf-8"));
    } catch (e) {
      console.warn("Failed to read config.json, using default.", e);
    }

    let projects = [];
    try {
      projects = JSON.parse(await fs.readFile(projectPath, "utf-8"));
    } catch (e) {
      console.warn("Failed to read project.json, using default.", e);
    }

    let species = [];
    try {
      species = JSON.parse(await fs.readFile(speciesPath, "utf-8"));
    } catch (e) {
      console.warn("Failed to read species.json, using default.", e);
    }

    let tags = [];
    try {
      tags = JSON.parse(await fs.readFile(tagsPath, "utf-8"));
    } catch (e) {
      console.warn("Failed to read tags.json, using default.", e);
    }

    const backup = {
      version: 1,
      timestamp: new Date().toISOString(),
      data: {
        config,
        projects,
        species,
        tags,
      },
    };

    return NextResponse.json(backup, { status: 200 });
  } catch (error) {
    console.error("Backup export failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
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

    // 2. Parse body
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid backup file structure" }, { status: 400 });
    }

    if (body.version !== 1) {
      return NextResponse.json({ error: "Unsupported backup version" }, { status: 400 });
    }

    const data = body.data;
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "Missing data in backup file" }, { status: 400 });
    }

    // Validate config
    if (data.config) {
      if (typeof data.config !== "object") {
        return NextResponse.json({ error: "Invalid config object" }, { status: 400 });
      }
      if (data.config.commissionStatus && !["available", "busy", "closed"].includes(data.config.commissionStatus)) {
        return NextResponse.json({ error: "Invalid commission status" }, { status: 400 });
      }
    }

    // Validate projects
    if (data.projects) {
      if (!Array.isArray(data.projects)) {
        return NextResponse.json({ error: "Projects must be an array" }, { status: 400 });
      }
      for (const p of data.projects) {
        if (p && typeof p === "object" && Object.keys(p).length > 0) {
          if (!p.id || !p.name || !p.description || !p.species || !p.creator || !p.polyCount || !Array.isArray(p.tags) || !p.image) {
            return NextResponse.json({ error: `Malformed project entry: ${p.name || p.id || "unknown"}` }, { status: 400 });
          }
        }
      }
    }

    // Validate species
    if (data.species) {
      if (!Array.isArray(data.species)) {
        return NextResponse.json({ error: "Species must be an array" }, { status: 400 });
      }
      if (data.species.some((s: any) => typeof s !== "string")) {
        return NextResponse.json({ error: "Species array must contain only strings" }, { status: 400 });
      }
    }

    // Validate tags
    if (data.tags) {
      if (!Array.isArray(data.tags)) {
        return NextResponse.json({ error: "Tags must be an array" }, { status: 400 });
      }
      if (data.tags.some((t: any) => typeof t !== "string")) {
        return NextResponse.json({ error: "Tags array must contain only strings" }, { status: 400 });
      }
    }

    // 3. Write data files if valid
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    if (data.config) {
      const configPath = path.join(dataDir, "config.json");
      await fs.writeFile(configPath, JSON.stringify(data.config, null, 2), "utf-8");
    }

    if (data.projects) {
      const projectPath = path.join(dataDir, "project.json");
      await fs.writeFile(projectPath, JSON.stringify(data.projects, null, 2), "utf-8");
    }

    if (data.species) {
      const speciesPath = path.join(dataDir, "species.json");
      await fs.writeFile(speciesPath, JSON.stringify(data.species, null, 2), "utf-8");
    }

    if (data.tags) {
      const tagsPath = path.join(dataDir, "tags.json");
      await fs.writeFile(tagsPath, JSON.stringify(data.tags, null, 2), "utf-8");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Backup import failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
