import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { decryptSession } from "@/services/session";
import { ProjectItem } from "@/components/project";
import { ensureDataFilesExist } from "@/utils/dataInitializer";

const projectDataPath = path.join(process.cwd(), "data", "project.json");
const uploadDir = path.join(process.cwd(), "data", "project");

// Read helper
async function readProjects(): Promise<ProjectItem[]> {
  await ensureDataFilesExist();
  try {
    const data = await fs.readFile(projectDataPath, "utf-8");
    return JSON.parse(data) as ProjectItem[];
  } catch {
    return [];
  }
}

export async function GET() {
  const projects = await readProjects();
  // Filter out empty or malformed projects (e.g. manually modified database file)
  const validProjects = projects.filter(
    (p) => p && typeof p === "object" && p.id && p.name && p.description
  );
  return NextResponse.json(validProjects, { status: 200 });
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

    // 2. Parse Multipart Form Data
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const species = formData.get("species") as string;
    const polyCount = formData.get("polyCount") as string;
    const tagsStr = formData.get("tags") as string;
    const externalLink = formData.get("externalLink") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !description || !species || !imageFile) {
      return NextResponse.json(
        { error: "Title, Description, Species, and Image file are required." },
        { status: 400 }
      );
    }

    // 3. Image Validation (png, jpeg, webp, max 10MB)
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(imageFile.type)) {
      return NextResponse.json(
        { error: "Invalid image format. Allowed formats: PNG, JPEG, WEBP." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { error: "Image file exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    // 4. Generate Safe Filename: title + datetime
    const extension = imageFile.name.split(".").pop() || "png";
    const cleanTitle = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-z0-9]+/g, "-") // Replaces spaces/special chars with hyphens
      .replace(/(^-|-$)/g, ""); // Trim leading/trailing hyphens

    const timestamp = new Date()
      .toISOString()
      .replace(/T/, "-")
      .replace(/\..+/, "")
      .replace(/:/g, "")
      .substring(0, 15); // e.g. 2026-05-27-124530 -> safe datetime format

    const filename = `${cleanTitle}-${timestamp}.${extension}`;
    const imagePath = path.join(uploadDir, filename);

    // 5. Save the image file to public/project/
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(imagePath, buffer);

    // 6. Save metadata to projects.json
    const projects = await readProjects();

    const parsedTags = tagsStr
      ? tagsStr
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
      : [];

    const newProject = {
      id: `${cleanTitle}-${Date.now()}`,
      name: title,
      creator: "ZILLA_H3",
      polyCount: polyCount || "Unspecified",
      tags: parsedTags,
      image: `/project/${filename}`,
      description,
      species: species.trim(),
      createdAt: new Date().toISOString(),
      externalLink: externalLink ? externalLink.trim() : undefined,
    };

    // Update species list in species.json if new
    const speciesDataPath = path.join(process.cwd(), "data", "species.json");
    try {
      const speciesData = await fs.readFile(speciesDataPath, "utf-8");
      const speciesList = JSON.parse(speciesData) as string[];
      const trimmedSpecies = species.trim();
      if (trimmedSpecies && !speciesList.some((s) => s.toLowerCase() === trimmedSpecies.toLowerCase())) {
        speciesList.push(trimmedSpecies);
        await fs.writeFile(speciesDataPath, JSON.stringify(speciesList, null, 2), "utf-8");
      }
    } catch (err) {
      console.error("Failed to update species.json on POST:", err);
    }

    // Update tags list in tags.json if new
    const tagsDataPath = path.join(process.cwd(), "data", "tags.json");
    try {
      const tagsData = await fs.readFile(tagsDataPath, "utf-8");
      const tagsList = JSON.parse(tagsData) as string[];
      let updatedTags = false;
      for (const tag of parsedTags) {
        if (!tagsList.some((t) => t.toLowerCase() === tag.toLowerCase())) {
          tagsList.push(tag);
          updatedTags = true;
        }
      }
      if (updatedTags) {
        await fs.writeFile(tagsDataPath, JSON.stringify(tagsList, null, 2), "utf-8");
      }
    } catch (err) {
      console.error("Failed to update tags.json on POST:", err);
    }

    projects.push(newProject);
    await fs.mkdir(path.dirname(projectDataPath), { recursive: true });
    await fs.writeFile(projectDataPath, JSON.stringify(projects, null, 2), "utf-8");

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error("Failed to add project:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
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

    // 2. Retrieve Project ID from query
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing project ID parameter." }, { status: 400 });
    }

    const projects = await readProjects();
    const projectIndex = projects.findIndex((p) => p.id === id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const projectToDelete = projects[projectIndex];

    // 3. Delete image file associated
    const imageRelativePath = projectToDelete.image; // e.g. "/project/name-date.png"
    if (imageRelativePath && imageRelativePath.startsWith("/project/")) {
      const filename = path.basename(imageRelativePath);
      const fullImagePath = path.join(uploadDir, filename);
      try {
        await fs.unlink(fullImagePath);
      } catch (err) {
        console.error(`Failed to delete file at ${fullImagePath}:`, err);
        // Continue even if file delete fails, to keep json clean
      }
    }

    // 4. Remove metadata entry
    projects.splice(projectIndex, 1);
    await fs.writeFile(projectDataPath, JSON.stringify(projects, null, 2), "utf-8");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
