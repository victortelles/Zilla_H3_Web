import crypto from "crypto";
import { SessionUser } from "@/types/services/session.types";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

/**
 * Helper to retrieve a stable 32-byte key derived from the SESSION_SECRET environment variable.
 */
function getSecretKey(): Buffer {
  const secret = process.env.SESSION_SECRET || "default_super_secret_session_key_32_bytes_long";
  return crypto.createHash("sha256").update(secret).digest();
}

/**
 * Encrypt user session details using AES-256-GCM.
 */
export function encryptSession(user: SessionUser): string {
  const key = getSecretKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const payload: SessionUser = {
    ...user,
    createdAt: Date.now(),
  };

  let encrypted = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encrypted += cipher.final("hex");

  const tag = cipher.getAuthTag().toString("hex");

  // Output format: iv:encrypted:tag
  return `${iv.toString("hex")}:${encrypted}:${tag}`;
}

/**
 * Decrypt and parse user session details using AES-256-GCM.
 * Returns null if the token has been tampered with or is invalid.
 */
export function decryptSession(token: string): SessionUser | null {
  try {
    const parts = token.split(":");
    if (parts.length !== 3) return null;

    const [ivHex, encryptedHex, tagHex] = parts;
    const key = getSecretKey();
    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    const user = JSON.parse(decrypted) as SessionUser;

    // Enforce 3-day cryptographic expiration
    if (user.createdAt) {
      const threeDaysMs = 60 * 60 * 24 * 3 * 1000;
      if (Date.now() - user.createdAt > threeDaysMs) {
        console.warn("Session token has cryptographically expired.");
        return null;
      }
    }

    return user;
  } catch (error) {
    console.error("Session decryption failed:", error);
    return null;
  }
}
