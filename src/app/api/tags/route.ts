import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { ensureDataFilesExist } from "@/utils/dataInitializer";

const tagsDataPath = path.join(process.cwd(), "data", "tags.json");

export async function GET() {
  await ensureDataFilesExist();
  try {
    const data = await fs.readFile(tagsDataPath, "utf-8");
    const tags = JSON.parse(data) as string[];
    return NextResponse.json(tags, { status: 200 });
  } catch (error) {
    console.error("Failed to read tags.json:", error);
    return NextResponse.json([], { status: 200 });
  }
}
