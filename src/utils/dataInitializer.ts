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

    // 4. Ensure a symlink/junction exists at public/project pointing to the volume directory
    const publicProjectDir = path.join(process.cwd(), "public", "project");
    try {
      const stats = await fs.lstat(publicProjectDir);
      if (!stats.isSymbolicLink()) {
        // If it exists as a normal folder, recreate as a symlink in production or Railway
        if (process.env.NODE_ENV === "production" || process.env.RAILWAY_ENVIRONMENT) {
          console.log(`[Data Initializer] public/project is a physical directory in production. Replacing with symlink...`);
          await fs.rm(publicProjectDir, { recursive: true, force: true });
          await fs.symlink(volumeUploadsDir, publicProjectDir, "junction");
        }
      }
    } catch {
      // Doesn't exist at all, create it as a symlink/junction
      console.log(`[Data Initializer] Creating symlink from ${publicProjectDir} to ${volumeUploadsDir}`);
      try {
        await fs.mkdir(path.dirname(publicProjectDir), { recursive: true });
        const type = process.platform === "win32" ? "junction" : "dir";
        await fs.symlink(volumeUploadsDir, publicProjectDir, type);
      } catch (symlinkError) {
        console.error("[Data Initializer] Failed to create symlink:", symlinkError);
      }
    }
  } catch (dirError) {
    console.error("[Data Initializer] Failed to ensure data directory exists:", dirError);
  }
}
