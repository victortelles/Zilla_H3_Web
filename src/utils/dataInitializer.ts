import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const TEMPLATE_DIR = path.join(process.cwd(), "src", "data-template");

const FILES_TO_INITIALIZE = ["config.json", "project.json", "species.json", "tags.json"];

export async function ensureDataFilesExist() {
  try {
    // 1. Ensure the data directory itself exists
    await fs.mkdir(DATA_DIR, { recursive: true });

    // 2. Loop through files and copy from template if missing
    for (const filename of FILES_TO_INITIALIZE) {
      const targetPath = path.join(DATA_DIR, filename);
      const templatePath = path.join(TEMPLATE_DIR, filename);

      try {
        // Check if file exists
        await fs.access(targetPath);
      } catch {
        // File doesn't exist, copy from template
        console.log(`[Data Initializer] ${filename} is missing in volume. Initializing from template...`);
        try {
          const content = await fs.readFile(templatePath, "utf-8");
          await fs.writeFile(targetPath, content, "utf-8");
          console.log(`[Data Initializer] ${filename} successfully initialized.`);
        } catch (copyError) {
          console.error(`[Data Initializer] Failed to initialize ${filename}:`, copyError);
        }
      }
    }

    // 3. Ensure the project uploads directory exists inside the volume
    const volumeUploadsDir = path.join(DATA_DIR, "project");
    await fs.mkdir(volumeUploadsDir, { recursive: true });
  } catch (dirError) {
    console.error("[Data Initializer] Failed to ensure data directory exists:", dirError);
  }
}
