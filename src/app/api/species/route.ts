import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const speciesDataPath = path.join(process.cwd(), "data", "species.json");

export async function GET() {
  try {
    const data = await fs.readFile(speciesDataPath, "utf-8");
    const species = JSON.parse(data) as string[];
    return NextResponse.json(species, { status: 200 });
  } catch (error) {
    console.error("Failed to read species.json:", error);
    return NextResponse.json([], { status: 200 });
  }
}
